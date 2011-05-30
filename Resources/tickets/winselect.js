/*
 * window type:
 * 0 - user list
 * 1 - class list
 * 2 - tech list
 * 3 - level list
 */

Ti.include('../includes/network_webservice_client.js');
var win = Ti.UI.currentWindow;

var search = Titanium.UI.createSearchBar({
	showCancel:true,
	hintText:'Search User'
});

var tvList = Titanium.UI.createTableView({ });

if (win.window_type == 0)
	tvList.search = search;
else if (win.window_type == 2)
	tvList.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;

tvList.addEventListener('click', function(e)
{
	var index = e.index;
	var section = e.section;
		
	for (var i=0;i<section.rows.length;i++)
		section.rows[i].hasCheck = false;
	section.rows[index].hasCheck = true;
	
	setTimeout(function() {	win.navGroup.close(win); }, 500);
	
	setTimeout(function()
	{
		win._parent.fireEvent("event_select_entity",
		{
			select_type: win.window_type,
			name: section.rows[index].title,
			id : section.rows[index].key
		});
	}, 1300);
});
win.add(tvList);
		
function loadList() {
    
    function createTVList(data)
    {	
    	var info = eval('(' + data + ')');    	
        var receivedData = null;
        switch (win.window_type)
	    {
	    	case 0: receivedData = info.Users;
	    	break;
	    	case 1: receivedData = info.Classes;
	    	break;
	    	case 2: receivedData = info.Users;
	    	break;
	    	case 3: receivedData = info.TicketLevels;
	    	break;
	    }
        var data = [];
		for (var i=0; i < receivedData.length; i++)
		{
			var row = Ti.UI.createTableViewRow();
			var key = null;
			switch (win.window_type)
		    {
		    	case 0:
		    		row.title = receivedData[i].first_name + ' ' + receivedData[i].last_name;
		    		key = receivedData[i].key;
		    	break;
		    	case 1:
		    		row.title = receivedData[i].name;
		    		row.indentionLevel = receivedData[i].hierarchy_level;
		    		key = receivedData[i].key;
		    	break;
		    	case 2:
		    		row.title = receivedData[i].first_name + ' ' + receivedData[i].last_name;
		    		key = receivedData[i].key;
		    	break;
		    	case 3:
		    		row.title = receivedData[i].name;
		    		key = receivedData[i].level;
		    	break;
		    }			
			row.hasCheck = (win.select_id == key);
			row.key = key;
			row.className = "_item_";
			data[i] = row;
		}		
        tvList.setData(data);        
        tvList.show();
    }
    
    var requestPoint = '';
    var loadMessage = '';
    switch (win.window_type)
    {
    	case 0:
    		requestPoint = 'Users.svc';
    		loadMessage = 'Users';
    	break;
    	case 1:
    		requestPoint = 'Classes.svc';
    		loadMessage = 'Classes';
    	break;
    	case 2:
    		requestPoint = 'Users.svc';
    		loadMessage = 'Techs';
    	break;
    	case 3:
    		requestPoint = 'TicketLevels.svc';
    		loadMessage = 'Levels';
    	break;
    }
    
    Ti.App.fireEvent('show_global_indicator',{message: 'Load ' + loadMessage});
    tvList.hide();    
    mbl_dataExchange("GET", requestPoint,
    	function () {
    		Ti.App.fireEvent('hide_global_indicator');        	
        	Ti.API.info('Select HTTP Status = ' + this.status);
    		Ti.API.info('Select HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
        		createTVList(this.responseText);
			}
			else
				alert('Select failed. Error code: ' + this.status);
    	},
    	function (e) {  },
    	function (e) { 
    		Ti.App.fireEvent('hide_global_indicator');
    		alert('Select Connect Error. Details: ' + JSON.stringify(e));
    		var data = '';
    		switch (win.window_type)
		    {
		    	case 0: data = '{"PageNumber":1,"PageSize":25,"Users":[{"email":"acharles@gilmerschools.com","first_name":"Al","global_level_setting":null,"key":"8145","last_name":"Charles","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"jtaylor@fayette.k12.in.us","first_name":"Jeff","global_level_setting":null,"key":"8200","last_name":"Taylor","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"Director or Maintance","user_type":"Standard User","user_type_id":"1"},{"email":"curtisfaulkner@walkerschools.org","first_name":"Curtis","global_level_setting":null,"key":"8207","last_name":"Faulkner","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"706-375-8061","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"jserpi@matsco.co.uk","first_name":"Jim","global_level_setting":null,"key":"8232","last_name":"Serpi","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"+44 (0)870 240 4849","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"apeterson@xpres.net","first_name":"Al","global_level_setting":null,"key":"8243","last_name":"Peterson","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(781) 826-8361","title":"Facility Manager","user_type":"Standard User","user_type_id":"1"},{"email":"samuel.quantz@slc.k12.ut.us","first_name":"Samuel","global_level_setting":null,"key":"8249","last_name":"Quantz","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"801-578-8401","title":"Area Lead","user_type":"Standard User","user_type_id":"1"},{"email":"tardie@norwellschools.org","first_name":"Lou","global_level_setting":null,"key":"8252","last_name":"Tardie","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"781-659-8804","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"pferrall@matsco.co.uk","first_name":"Patrick","global_level_setting":null,"key":"8280","last_name":"Ferrall","location":null,"location_id":null,"mobile_phone":"078 8062 5557","organization":null,"phone":"0870 240 4849","title":"MD","user_type":"Standard User","user_type_id":"1"},{"email":"bowmand@usd450.net","first_name":"David","global_level_setting":null,"key":"8302","last_name":"Bowman","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(785) 379-5970","title":"Curriculum Director","user_type":"Standard User","user_type_id":"1"},{"email":"sullivank@usd450.net","first_name":"Kelli","global_level_setting":null,"key":"8320","last_name":"Sullivan","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"379-5880","title":"librarian","user_type":"Standard User","user_type_id":"1"},{"email":"andersonb@usd450.net","first_name":"Blair","global_level_setting":null,"key":"8327","last_name":"Anderson","location":null,"location_id":null,"mobile_phone":"785-213-6416","organization":null,"phone":"785-379-5970","title":"Technology Director","user_type":"Standard User","user_type_id":"1"},{"email":"dave.falls@beaufort.k12.sc.us","first_name":"Dave","global_level_setting":null,"key":"8771","last_name":"Falls","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-2372","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"tina.purvis@beaufort.k12.sc.us","first_name":"Tina","global_level_setting":null,"key":"8781","last_name":"Purvis","location":null,"location_id":null,"mobile_phone":"","organization":"","phone":"843-322-2315","title":"Technology Support Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"psk0769@beaufort.k12.sc.us","first_name":"Paula","global_level_setting":null,"key":"8791","last_name":"Klauck","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843 322-5547","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"rso302@beaufort.k12.sc.us","first_name":"Rachel","global_level_setting":null,"key":"8826","last_name":"OBrien","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-7721","title":"Media\/Technology Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"schrichten.casey@lebanon.k12.oh.us","first_name":"Casey","global_level_setting":null,"key":"8869","last_name":"Schrichten","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"Sr. Network Administrator","user_type":"Standard User","user_type_id":"1"},{"email":"gosnell.debraha@lebanon.k12.oh.us","first_name":"Debrah","global_level_setting":null,"key":"8870","last_name":"Gosnell","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"kemmer.marybeth@lebanon.k12.oh.us","first_name":"Mary Beth","global_level_setting":null,"key":"9074","last_name":"Kemmer","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"2339","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"megrian@norwellschools.org","first_name":"Nancy","global_level_setting":null,"key":"9234","last_name":"Megrian","location":null,"location_id":null,"mobile_phone":null,"organization":null,"phone":null,"title":null,"user_type":"Standard User","user_type_id":"1"},{"email":"tl_vcassid@k12server.mveca.org","first_name":"Veronica","global_level_setting":null,"key":"9608","last_name":"Cassidy","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"937-845-4485","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"AlbertM@sunnysideud.k12.az.us","first_name":"Albert","global_level_setting":null,"key":"9625","last_name":"Magallanez","location":null,"location_id":null,"mobile_phone":"520-940-2048","organization":null,"phone":"520-545-2055","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"ShannonB@susd12.org","first_name":"Shannon","global_level_setting":null,"key":"9626","last_name":"Black","location":null,"location_id":null,"mobile_phone":"520-940-2064","organization":null,"phone":"520-545-2061","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"michaeli@sunnysideud.k12.az.us","first_name":"Michael","global_level_setting":null,"key":"9627","last_name":"Ingrando","location":null,"location_id":null,"mobile_phone":"520-940-1982","organization":null,"phone":"520-270-2822","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"RobertaC@sunnysideud.k12.az.us","first_name":"Roberta","global_level_setting":null,"key":"9632","last_name":"Cline","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"520-545-2058","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"summeyt@surry.k12.nc.us","first_name":"Ted","global_level_setting":null,"key":"9682","last_name":"Summey","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(336) 386-8211","title":"Director of Instructional Tech","user_type":"Standard User","user_type_id":"1"}],"UsersNumber":1057}';
		    	break;
		    	case 1: data = '{"Classes":[{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"11951","last_resort_tech":"Andrey Magazinov","last_resort_tech_userid":"82187","level":null,"level_name":null,"name":"AD Replicator","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"7034","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"Another Test Class","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6069","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"BackOffice","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"2508","last_resort_tech":"Jon Vickers","last_resort_tech_userid":"26","level":null,"level_name":null,"name":"bigWebApps","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"This class aggregates all the majr bugs from the production bigWebDesk website.","hierarchy_level":0,"key":"7240","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":4,"level_name":null,"name":"bWD.ErrorTracker","parent_class_id":null,"priority":"Bug \/ Error (No Reasonable Workaround)","priority_id":"1548","routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6436","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"Deployment Logger","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"3","description":"bigWebDesk Issues.","hierarchy_level":0,"key":"29","last_resort_tech":"Jason Moore","last_resort_tech_userid":"27","level":null,"level_name":null,"name":"HelpDesk","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"11765","last_resort_tech":"Alexey Gavrilov","last_resort_tech_userid":"59085","level":null,"level_name":null,"name":"KnowledgeBase","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6950","last_resort_tech":"Vladimir Gooz","last_resort_tech_userid":"58745","level":null,"level_name":null,"name":"Test Class","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"bigFleetSystem issues","hierarchy_level":0,"key":"4195","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"Transportation","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6480","last_resort_tech":"Alexey Gavrilov","last_resort_tech_userid":"59085","level":null,"level_name":null,"name":"Warehouse","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"5596","last_resort_tech":"Iryna Vladyka","last_resort_tech_userid":"132174","level":null,"level_name":null,"name":"Website","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":null,"hierarchy_level":1,"key":"11828","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"bigWebApps.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":1,"key":"11826","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"HelpDesk.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":null,"hierarchy_level":1,"key":"11827","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"WareHouse.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"}],"ClassesNumber":15,"PageNumber":1,"PageSize":25}';
		    	break;
		    	case 2: data = '{"PageNumber":1,"PageSize":25,"Users":[{"email":"acharles@gilmerschools.com","first_name":"Al","global_level_setting":null,"key":"8145","last_name":"Charles","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"jtaylor@fayette.k12.in.us","first_name":"Jeff","global_level_setting":null,"key":"8200","last_name":"Taylor","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"","title":"Director or Maintance","user_type":"Standard User","user_type_id":"1"},{"email":"curtisfaulkner@walkerschools.org","first_name":"Curtis","global_level_setting":null,"key":"8207","last_name":"Faulkner","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"706-375-8061","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"jserpi@matsco.co.uk","first_name":"Jim","global_level_setting":null,"key":"8232","last_name":"Serpi","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"+44 (0)870 240 4849","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"apeterson@xpres.net","first_name":"Al","global_level_setting":null,"key":"8243","last_name":"Peterson","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(781) 826-8361","title":"Facility Manager","user_type":"Standard User","user_type_id":"1"},{"email":"samuel.quantz@slc.k12.ut.us","first_name":"Samuel","global_level_setting":null,"key":"8249","last_name":"Quantz","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"801-578-8401","title":"Area Lead","user_type":"Standard User","user_type_id":"1"},{"email":"tardie@norwellschools.org","first_name":"Lou","global_level_setting":null,"key":"8252","last_name":"Tardie","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"781-659-8804","title":"Technician","user_type":"Standard User","user_type_id":"1"},{"email":"pferrall@matsco.co.uk","first_name":"Patrick","global_level_setting":null,"key":"8280","last_name":"Ferrall","location":null,"location_id":null,"mobile_phone":"078 8062 5557","organization":null,"phone":"0870 240 4849","title":"MD","user_type":"Standard User","user_type_id":"1"},{"email":"bowmand@usd450.net","first_name":"David","global_level_setting":null,"key":"8302","last_name":"Bowman","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(785) 379-5970","title":"Curriculum Director","user_type":"Standard User","user_type_id":"1"},{"email":"sullivank@usd450.net","first_name":"Kelli","global_level_setting":null,"key":"8320","last_name":"Sullivan","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"379-5880","title":"librarian","user_type":"Standard User","user_type_id":"1"},{"email":"andersonb@usd450.net","first_name":"Blair","global_level_setting":null,"key":"8327","last_name":"Anderson","location":null,"location_id":null,"mobile_phone":"785-213-6416","organization":null,"phone":"785-379-5970","title":"Technology Director","user_type":"Standard User","user_type_id":"1"},{"email":"dave.falls@beaufort.k12.sc.us","first_name":"Dave","global_level_setting":null,"key":"8771","last_name":"Falls","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-2372","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"tina.purvis@beaufort.k12.sc.us","first_name":"Tina","global_level_setting":null,"key":"8781","last_name":"Purvis","location":null,"location_id":null,"mobile_phone":"","organization":"","phone":"843-322-2315","title":"Technology Support Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"psk0769@beaufort.k12.sc.us","first_name":"Paula","global_level_setting":null,"key":"8791","last_name":"Klauck","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843 322-5547","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"rso302@beaufort.k12.sc.us","first_name":"Rachel","global_level_setting":null,"key":"8826","last_name":"OBrien","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"843-322-7721","title":"Media\/Technology Specialist","user_type":"Standard User","user_type_id":"1"},{"email":"schrichten.casey@lebanon.k12.oh.us","first_name":"Casey","global_level_setting":null,"key":"8869","last_name":"Schrichten","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"Sr. Network Administrator","user_type":"Standard User","user_type_id":"1"},{"email":"gosnell.debraha@lebanon.k12.oh.us","first_name":"Debrah","global_level_setting":null,"key":"8870","last_name":"Gosnell","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"513-934-5133","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"kemmer.marybeth@lebanon.k12.oh.us","first_name":"Mary Beth","global_level_setting":null,"key":"9074","last_name":"Kemmer","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"2339","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"megrian@norwellschools.org","first_name":"Nancy","global_level_setting":null,"key":"9234","last_name":"Megrian","location":null,"location_id":null,"mobile_phone":null,"organization":null,"phone":null,"title":null,"user_type":"Standard User","user_type_id":"1"},{"email":"tl_vcassid@k12server.mveca.org","first_name":"Veronica","global_level_setting":null,"key":"9608","last_name":"Cassidy","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"937-845-4485","title":"Technology Coordinator","user_type":"Standard User","user_type_id":"1"},{"email":"AlbertM@sunnysideud.k12.az.us","first_name":"Albert","global_level_setting":null,"key":"9625","last_name":"Magallanez","location":null,"location_id":null,"mobile_phone":"520-940-2048","organization":null,"phone":"520-545-2055","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"ShannonB@susd12.org","first_name":"Shannon","global_level_setting":null,"key":"9626","last_name":"Black","location":null,"location_id":null,"mobile_phone":"520-940-2064","organization":null,"phone":"520-545-2061","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"michaeli@sunnysideud.k12.az.us","first_name":"Michael","global_level_setting":null,"key":"9627","last_name":"Ingrando","location":null,"location_id":null,"mobile_phone":"520-940-1982","organization":null,"phone":"520-270-2822","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"RobertaC@sunnysideud.k12.az.us","first_name":"Roberta","global_level_setting":null,"key":"9632","last_name":"Cline","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"520-545-2058","title":"","user_type":"Standard User","user_type_id":"1"},{"email":"summeyt@surry.k12.nc.us","first_name":"Ted","global_level_setting":null,"key":"9682","last_name":"Summey","location":null,"location_id":null,"mobile_phone":"","organization":null,"phone":"(336) 386-8211","title":"Director of Instructional Tech","user_type":"Standard User","user_type_id":"1"}],"UsersNumber":1057}';
		    	break;
		    	case 3: data = '{"Classes":[{"key":1,"name":"Level 1"}, {"key":2,"name":"Level 2"}, {"key":3,"name":"Level 3"}]}';
		    	break;
		    }
		    createTVList(data);});
}

loadList();