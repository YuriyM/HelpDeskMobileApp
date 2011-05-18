Ti.include('../includes/webserviceclient.js');
Ti.include('../includes/tickettableview.js');
Ti.include('../controls/table_pulldown_iphone.js');
Ti.include('../controls/load_indicator_iphone.js');
var win = Ti.UI.currentWindow;

var search = Titanium.UI.createSearchBar({
	//barColor:'#000',
	showCancel:true,
	/*height:43,
	top:0,*/
	hintText:'Search User'
});

search.addEventListener('change', function(e)
{
Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
});
search.addEventListener('return', function(e)
{
search.blur();
});
search.addEventListener('cancel', function(e)
{
search.blur();
});

//win.add(search);



function loadUsers() {
	function createGlobalTableView(data)
    {	
    	loadIndicator.hide();
    	Ti.API.info(data);
    	var info = eval('(' + data + ')');
        var users = info.Users;
        var data = [];
		//Ti.API.info(users);
		for (var i=0; i < users.length; i++)
		{
			var row = Ti.UI.createTableViewRow();
			var rowTitle = users[i].first_name + ' ' + users[i].last_name;//email
			if (i==2)
			{
				row.hasCheck=true;
			}
			/*var l = Ti.UI.createLabel({
				left:5,
				font:{fontSize:20, fontWeight:'bold'},
				color:'#000',
				text:rowTitle
			});
			row.add(l);*/
			//row.uid = users[i].key;
			row.title = rowTitle;
			row.className = "itemUser";
			data[i] = row;
		}   
				// create table view
		var tableview = Titanium.UI.createTableView({
			search:search,
			//searchHidden:false,
			data: data
			//style: Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		
		// create table view event listener
		tableview.addEventListener('click', function(e)
		{
			// event data
			var index = e.index;
			var section = e.section;
		
			setTimeout(function()
			{
				// reset checks
				for (var i=0;i<section.rows.length;i++)
				{
					section.rows[i].hasCheck = false;
					//section.rows[i].children[0].color = '#000';
				}
				// set current check
				section.rows[index].hasCheck = true;
				//section.rows[index].children[0].color = '#336699';
				
			},250);
			
			setTimeout(function()
			{
				//win.navGroup.close(win._parent);
				win.navGroup.close(win);
			},
			500);
			
			
		});
		win.add(tableview);    
        /*tableview.data = data;
        tableview.show();*/
    }    
	
    function onload() {
        createGlobalTableView(this.responseText);
    };
    
    //tableview.hide();
    loadIndicator.show();
    mbl_dataExchange("GET", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Users.svc",
    	onload,
    	function (e) { loadIndicator.loadingdatastrem(e.progress); },
    	function (e) { loadIndicator.hide();
    		alert(e);
    		//var data = '{"PageNumber":1,"PageSize":25,"Users":[{"email":"acharles@gilmerschools.com","first_name":"Al","global_level_setting":null,"key":"8145","last_name":"Charles","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"jtaylor@fayette.k12.in.us","first_name":"Jeff","global_level_setting":null,"key":"8200","last_name":"Taylor","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"Director or Maintance","user_type":"Standard User","user_type_id":"1"},{"email":"curtisfaulkner@walkerschools.org","first_name":"Curtis","global_level_setting":null,"key":"8207","last_name":"Faulkner","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"706-375-8061","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"jserpi@matsco.co.uk","first_name":"Jim","global_level_setting":null,"key":"8232","last_name":"Serpi","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"+44 (0)870 240 4849","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"apeterson@xpres.net","first_name":"Al","global_level_setting":null,"key":"8243","last_name":"Peterson","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(781) 826-8361","title":"Facility Manager","user_type":"Standard User","user_type_id":"1"},{"email":"samuel.quantz@slc.k12.ut.us","first_name":"Samuel","global_level_setting":null,"key":"8249","last_name":"Quantz","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"801-578-8401","title":"Area Lead","user_type":"Standard User","user_type_id":"1"},{"email":"tardie@norwellschools.org","first_name":"Lou","global_level_setting":null,"key":"8252","last_name":"Tardie","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"781-659-8804","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"pferrall@matsco.co.uk","first_name":"Patrick","global_level_setting":null,"key":"8280","last_name":"Ferrall","location":null,"location_id":null,"mobile_phone":"078 8062 5557","organization":null,"phone":"0870 240 4849","title":"MD","user_type":"Standard User","user_type_id":"1"},{"email":"bowmand@usd450.net","first_name":"David","global_level_setting":null,"key":"8302","last_name":"Bowman","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(785) 379-5970","title":"Curriculum Director","user_type":"Standard User","user_type_id":"1"},{"email":"sullivank@usd450.net","first_name":"Kelli","global_level_setting":null,"key":"8320","last_name":"Sullivan","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"379-5880","title":"librarian","user_type":"Standard User","user_type_id":"1"},{"email":"andersonb@usd450.net","first_name":"Blair","global_level_setting":null,"key":"8327","last_name":"Anderson","location":null,"location_id":null,"mobile_phone":"785-213-6416","organization":null,"phone":"785-379-5970","title":"Technology Director","user_type":"Standard User","user_type_id":"1"},{"email":"dave.falls@beaufort.k12.sc.us","first_name":"Dave","global_level_setting":null,"key":"8771","last_name":"Falls","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-2372","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"tina.purvis@beaufort.k12.sc.us","first_name":"Tina","global_level_setting":null,"key":"8781","last_name":"Purvis","location":null,"location_id":null,"mobile_phone":"","organization":"","phone":"843-322-2315","title":"Technology Support Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"psk0769@beaufort.k12.sc.us","first_name":"Paula","global_level_setting":null,"key":"8791","last_name":"Klauck","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843 322-5547","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"rso302@beaufort.k12.sc.us","first_name":"Rachel","global_level_setting":null,"key":"8826","last_name":"O''Brien","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-7721","title":"Media\/Technology Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"schrichten.casey@lebanon.k12.oh.us","first_name":"Casey","global_level_setting":null,"key":"8869","last_name":"Schrichten","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"Sr. Network Administrator","user_type":"Standard User","user_type_id":"1"},{"email":"gosnell.debraha@lebanon.k12.oh.us","first_name":"Debrah","global_level_setting":null,"key":"8870","last_name":"Gosnell","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"kemmer.marybeth@lebanon.k12.oh.us","first_name":"Mary Beth","global_level_setting":null,"key":"9074","last_name":"Kemmer","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"2339","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"megrian@norwellschools.org","first_name":"Nancy","global_level_setting":null,"key":"9234","last_name":"Megrian","location":null,"location_id":null,"mobile_phone":null,"organization":null,"phone":null,"title":null,"user_type":"Standard User","user_type_id":"1"},{"email":"tl_vcassid@k12server.mveca.org","first_name":"Veronica","global_level_setting":null,"key":"9608","last_name":"Cassidy","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"937-845-4485","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"AlbertM@sunnysideud.k12.az.us","first_name":"Albert","global_level_setting":null,"key":"9625","last_name":"Magallanez","location":null,"location_id":null,"mobile_phone":"520-940-2048","organization":null,"phone":"520-545-2055","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"ShannonB@susd12.org","first_name":"Shannon","global_level_setting":null,"key":"9626","last_name":"Black","location":null,"location_id":null,"mobile_phone":"520-940-2064","organization":null,"phone":"520-545-2061","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"michaeli@sunnysideud.k12.az.us","first_name":"Michael","global_level_setting":null,"key":"9627","last_name":"Ingrando","location":null,"location_id":null,"mobile_phone":"520-940-1982","organization":null,"phone":"520-270-2822","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"RobertaC@sunnysideud.k12.az.us","first_name":"Roberta","global_level_setting":null,"key":"9632","last_name":"Cline","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"520-545-2058","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"summeyt@surry.k12.nc.us","first_name":"Ted","global_level_setting":null,"key":"9682","last_name":"Summey","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(336) 386-8211","title":"Director of Instructional Tech","user_type":"Standard User","user_type_id":"1"}],"UsersNumber":1057}';
			createGlobalTableView(data);});
}
loadUsers();



