Ti.include('../includes/webserviceclient.js');
Ti.include('../includes/tickettableview.js');
Ti.include('../controls/table_pulldown_iphone.js');
Ti.include('../controls/load_indicator_iphone.js');

var win = Ti.UI.currentWindow;

var search = Titanium.UI.createSearchBar({
	showCancel:true,
	hintText:'Search User'
});

var tvUsers = Titanium.UI.createTableView({  });

if (win.window_type == 0)
	tvUsers.search = search;
else if (win.window_type == 2)
	tvUsers.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;

tvUsers.addEventListener('click', function(e)
{
	var index = e.index;
	var section = e.section;
		
	setTimeout(function()
	{	
		for (var i=0;i<section.rows.length;i++)
			section.rows[i].hasCheck = false;
		section.rows[index].hasCheck = true;
	}, 250);
	
	setTimeout(function()
	{
		win.navGroup.close(win);
		win._parent.fireEvent("event_select_entity", {
			select_type: win.window_type,
			name: section.rows[index].title,
			id : section.rows[index].key
		}); // another way - use Ti.App.fireEvent - global event
	}, 500);
});
win.add(tvUsers);
		
function loadUsers() {
	
	function createGlobalTableView(data)
    {	
    	loadIndicator.hide();
    	Ti.API.info(data);
    	var info = eval('(' + data + ')');
        var users = info.Users;
        var data = [];
		for (var i=0; i < users.length; i++)
		{
			var row = Ti.UI.createTableViewRow();
			var rowTitle = users[i].first_name + ' ' + users[i].last_name;//email
			if (win.select_id == users[i].key)
			{
				row.hasCheck=true;
			}
			row.key = users[i].key;
			row.title = rowTitle;
			row.className = "itemUser";
			data[i] = row;
		}
        tvUsers.data = data;
        tvUsers.show();
    }
    
    function createGlobalTableViewClass(data)
    {	
    	loadIndicator.hide();
    	Ti.API.info(data);
    	var info = eval('(' + data + ')');
        var classes = info.Classes;
        var data = [];
		for (var i=0; i < classes.length; i++)
		{
			var row = Ti.UI.createTableViewRow();
			var rowTitle = classes[i].name + ' ' +classes[i].hierarchy_level;
			if (win.select_id == classes[i].key)
			{
				row.hasCheck=true;
			}
			row.key = classes[i].key;
			row.title = rowTitle;
			row.indentionLevel = classes[i].hierarchy_level;
			row.className = "itemClass";
			//Ti.API.info(data);
			
			data[i] = row;
		}
        tvUsers.data = data;
        tvUsers.show();
    }    
	
    function onload() {
    	if (win.window_type == 1)
    		createGlobalTableViewClass(this.responseText);
    	else
        	createGlobalTableView(this.responseText);
    };
    
    tvUsers.hide();
    loadIndicator.show();
    
    var requestPoint = 'Users.svc';
    if (win.window_type == 1)
    {
    	requestPoint = 'Classes.svc';
    	//createGlobalTableView('{"PageNumber":1,"PageSize":25,"Users":[{"first_name":"Class", "key":"1","last_name":"1"}, {"first_name":"Class", "key":"2","last_name":"2"}, {"first_name":"Class", "key":"3","last_name":"3"}]}');
    }
    
    mbl_dataExchange("GET", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/" + requestPoint,
    	onload,
    	function (e) { loadIndicator.loadingdatastrem(e.progress); },
    	function (e) { loadIndicator.hide();
    		alert(e);
    		var data = '{"Classes":[{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"11951","last_resort_tech":"Andrey Magazinov","last_resort_tech_userid":"82187","level":null,"level_name":null,"name":"AD Replicator","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"7034","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"Another Test Class","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6069","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"BackOffice","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"2508","last_resort_tech":"Jon Vickers","last_resort_tech_userid":"26","level":null,"level_name":null,"name":"bigWebApps","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"This class aggregates all the majr bugs from the production bigWebDesk website.","hierarchy_level":0,"key":"7240","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":4,"level_name":null,"name":"bWD.ErrorTracker","parent_class_id":null,"priority":"Bug \/ Error (No Reasonable Workaround)","priority_id":"1548","routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6436","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"Deployment Logger","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"3","description":"bigWebDesk Issues.","hierarchy_level":0,"key":"29","last_resort_tech":"Jason Moore","last_resort_tech_userid":"27","level":null,"level_name":null,"name":"HelpDesk","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"11765","last_resort_tech":"Alexey Gavrilov","last_resort_tech_userid":"59085","level":null,"level_name":null,"name":"KnowledgeBase","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":false,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6950","last_resort_tech":"Vladimir Gooz","last_resort_tech_userid":"58745","level":null,"level_name":null,"name":"Test Class","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"bigFleetSystem issues","hierarchy_level":0,"key":"4195","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"Transportation","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"6480","last_resort_tech":"Alexey Gavrilov","last_resort_tech_userid":"59085","level":null,"level_name":null,"name":"Warehouse","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":0,"key":"5596","last_resort_tech":"Iryna Vladyka","last_resort_tech_userid":"132174","level":null,"level_name":null,"name":"Website","parent_class_id":null,"priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":null,"hierarchy_level":1,"key":"11828","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"bigWebApps.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":"","hierarchy_level":1,"key":"11826","last_resort_tech":"Patrick Clements","last_resort_tech_userid":"38006","level":null,"level_name":null,"name":"HelpDesk.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"},{"active":true,"class_type":null,"class_type_id":"0","description":null,"hierarchy_level":1,"key":"11827","last_resort_tech":"Dmitriy Chernenko","last_resort_tech_userid":"104171","level":null,"level_name":null,"name":"WareHouse.com","parent_class_id":"5596","priority":null,"priority_id":null,"routing_type":null,"routing_type_id":"1"}],"ClassesNumber":15,"PageNumber":1,"PageSize":25}';
    		createGlobalTableView(data);});
}

loadUsers();