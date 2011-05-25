Ti.include('../includes/network_webservice_client.js');Ti.include('../includes/ticket_tableview.js');Ti.include('../controls/table_pulldown_iphone.js');// Global variablesvar PageNum = 25;var PageCount = 11;var tickets_id = [];// current windowvar win = Titanium.UI.currentWindow;var tvTickets = Titanium.UI.createTableView({ id: 'tvTickets'/*, data: []*/ });// Create Buttonsvar bAddNew = Titanium.UI.createButton({ id: 'bAddNew' });var bNavAdd = Titanium.UI.createButton({ id: 'bNavAdd' });var bNext = Titanium.UI.createButton({ id: 'bNext' });var bPrevious = Titanium.UI.createButton({ id: 'bPrevious' });// ListenersbNext.addEventListener('click', function () {    tvTickets.data = [];    PageNum++;    loadTickets();});bPrevious.addEventListener('click', function () {    tvTickets.data = [];    PageNum--;    loadTickets();});function addNewTicket() {    var win = Titanium.UI.createWindow({			url:"ticket_createquick.js",			title:"Add Ticket",									_parent: Titanium.UI.currentWindow,		    navGroup : Titanium.UI.currentWindow.navGroup,		    rootWindow : Titanium.UI.currentWindow.rootWindow				});		Titanium.UI.currentWindow.navGroup.open(win);		//Titanium.UI.currentTab.open(win,{animated:true});}bNavAdd.addEventListener('click', addNewTicket);  // Ticket view sectiontvTickets.addEventListener('click', function(e){	if (e.rowData.tid)	{		var win = Titanium.UI.createWindow({			url:"ticket_view.js",			title:'Ticket Details',//'#' + e.rowData.number,			tid:e.rowData.tid,			tickets: tickets_id,								    _parent: Titanium.UI.currentWindow,		    navGroup : Titanium.UI.currentWindow.navGroup,		    rootWindow : Titanium.UI.currentWindow.rootWindow		});		Titanium.UI.currentWindow.navGroup.open(win);		//Titanium.UI.currentTab.open(win,{animated:true});	}});//---------------------// Pull dowm sectionmbl_addTablePullDownHeader(tvTickets, function () { tvTickets.data = null;PageNum++; }, loadTickets);// -----------------// Paging functionsfunction setPageNavigation(ticketCount){	if (ticketCount <= PageCount) {    	bPrevious.visible = bNext.visible = false;    }    else if (PageNum == 1) {    	bPrevious.visible = false;        bNext.visible = true;    }    else if (PageNum > 1 && (PageNum * PageCount >= ticketCount)) {    	bPrevious.visible = true;        bNext.visible = false;    }    else    	bPrevious.visible = bNext.visible = true;}//-----------------// main load function    function loadTickets() {	function createGlobalTableView(data)    {	    	Ti.API.info(data);    	var info = eval('(' + data + ')');        var tickets = info.Tickets;        var ticketsNumber = info.TicketsNumber;        		setPageNavigation(ticketsNumber);                var rowData = createTicketTableView(tickets, tickets_id);        tvTickets.data = rowData;                Ti.App.fireEvent('hide_global_indicator');        updateTicketsToolbar(false);                tvTickets.show();    }    	    function onload() {        createGlobalTableView(this.responseText);    };        tvTickets.hide();    Ti.App.fireEvent('show_global_indicator',{'caution': 'Load Tickets'});    updateTicketsToolbar(true);    mbl_dataExchange("GET", "Tickets.svc?pg=" + PageNum + "&ps=" + PageCount,    	onload,    	function (e) {    		infLoadTickets.value = e.progress * 10;			//infLoadTickets.message = 'Downloading ' + (e.progress * 10) + ' of 10';		},    	function (e) {     		alert(e);    		var data = '{"PageNumber":25,"PageSize":11,"Tickets":[{"account_id":"30","account_location_id":"218244","account_location_name":"District Office","account_name":"Chapel Hill-Carrboro City Schools","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1019567760000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Lavern Manzano","created_time":"\/Date(1019560740000+0300)\/","created_userid":"49","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"58314","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":297,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"Creating Tickets","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"lmanzano@chccs.k12.nc.us","user_first_name":"Lavern","user_last_name":"Manzano","user_name":"Lavern Manzano","user_userid":"49","workpad":null},{"account_id":null,"account_location_id":null,"account_location_name":null,"account_name":null,"amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1019629320000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Michael Jennings","created_time":"\/Date(1019623800000+0300)\/","created_userid":"62","creation_category_id":"1","creation_category_name":"User Error","custom_fields":"<?xml version=\"1.0\"?><root><field id=\"3\"><caption>Organization<\/caption><value>Bartow County School System<\/value><\/field><\/root>","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"58466","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":298,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":null,"status":2,"status_name":"Closed","subject":"Lost all of my closed workorders.","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"mjennings@bartow.k12.ga.us","user_first_name":"Michael","user_last_name":"Jennings","user_name":"Michael Jennings","user_userid":"62","workpad":null},{"account_id":null,"account_location_id":null,"account_location_name":null,"account_name":null,"amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1047485940000+0200)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Chris Pereira","created_time":"\/Date(1019662260000+0300)\/","created_userid":"6302","creation_category_id":"6","creation_category_name":"Upgrade | Mod","custom_fields":"","estimated_hours":null,"folder_id":"727","folder_name":"Helpdesk \/ Time and Dates","follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"58849","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":299,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"Time settings","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"cpereira@eduhsd.k12.ca.us","user_first_name":"Chris","user_last_name":"Pereira","user_name":"Chris Pereira","user_userid":"6302","workpad":null},{"account_id":"57","account_location_id":"218257","account_location_name":"Central Office","account_name":"Laurens County Schools","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1021891020000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Paul Hodges","created_time":"\/Date(1019715720000+0300)\/","created_userid":"51","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"58913","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":300,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"quote for next year","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"paulhodges@lcboe.net","user_first_name":"Paul","user_last_name":"Hodges","user_name":"Paul Hodges","user_userid":"51","workpad":null},{"account_id":"86","account_location_id":"218272","account_location_name":"Main Office","account_name":"Gwinnett Technical College","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1047485820000+0200)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Lisa Johnson","created_time":"\/Date(1019734980000+0300)\/","created_userid":"125","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"<?xml version=\"1.0\"?><root><field id=\"3\"><caption>Organization<\/caption><value>Gwinnett Technical College<\/value><\/field><\/root>","estimated_hours":null,"folder_id":"729","folder_name":"bigInventoryManager","follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"59137","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":301,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":null,"status":2,"status_name":"Closed","subject":"Parts\/Inventory","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"ljohnson@gwinnetttech.edu","user_first_name":"Lisa","user_last_name":"Johnson","user_name":"Lisa Johnson","user_userid":"125","workpad":null},{"account_id":null,"account_location_id":null,"account_location_name":null,"account_name":null,"amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1019746020000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Brent Lengacher","created_time":"\/Date(1019744280000+0300)\/","created_userid":"6186","creation_category_id":"1","creation_category_name":"User Error","custom_fields":"<?xml version=\"1.0\"?><root><field id=\"3\"><caption>Organization<\/caption><value>Spencer-Owen Community Schools<\/value><\/field><\/root>","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"59198","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":302,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":null,"status":2,"status_name":"Closed","subject":"unaccessible accounts","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"blengacher@socs.k12.in.us","user_first_name":"Brent","user_last_name":"Lengacher","user_name":"Brent Lengacher","user_userid":"6186","workpad":null},{"account_id":"20","account_location_id":null,"account_location_name":null,"account_name":"bigWebApps","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1035286980000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Jason Moore","created_time":"\/Date(1019803200000+0300)\/","created_userid":"27","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"<?xml version=\"1.0\"?><root><field id=\"3\"><caption>Organization<\/caption><value><\/value><\/field><\/root>","estimated_hours":null,"folder_id":"112","folder_name":"Helpdesk \/ Appearance\/Navigation","follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"61787","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":303,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":null,"status":2,"status_name":"Closed","subject":"Changing heading","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"jason.moore@bigwebapps.com","user_first_name":"Jason","user_last_name":"Moore","user_name":"Jason Moore","user_userid":"27","workpad":null},{"account_id":null,"account_location_id":null,"account_location_name":null,"account_name":null,"amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1019808600000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Brent Lengacher","created_time":"\/Date(1019804160000+0300)\/","created_userid":"6186","creation_category_id":"4","creation_category_name":"Bug | Logic Flaw","custom_fields":"<?xml version=\"1.0\"?><root><field id=\"3\"><caption>Organization<\/caption><value>Spencer-owen community schools<\/value><\/field><\/root>","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"61797","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":304,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":null,"status":2,"status_name":"Closed","subject":"user account not working (because of apostrophe)","submission_category_id":null,"submission_category_name":null,"tech_email":"jon.vickers@micajah.com","tech_first_name":"Jon","tech_last_name":"Vickers","tech_name":"Jon Vickers","tech_userid":"26","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"blengacher@socs.k12.in.us","user_first_name":"Brent","user_last_name":"Lengacher","user_name":"Brent Lengacher","user_userid":"6186","workpad":null},{"account_id":null,"account_location_id":null,"account_location_name":null,"account_name":null,"amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1020751800000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Nathan Barone","created_time":"\/Date(1020062520000+0300)\/","created_userid":"6946","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"62099","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":305,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"Scheduled Maintenance","submission_category_id":null,"submission_category_name":null,"tech_email":"jason.moore@bigwebapps.com","tech_first_name":"Jason","tech_last_name":"Moore","tech_name":"Jason Moore","tech_userid":"27","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"nbarone@colonialsd.org","user_first_name":"Nathan","user_last_name":"Barone","user_name":"Nathan Barone","user_userid":"6946","workpad":null},{"account_id":"67","account_location_id":"218263","account_location_name":"Central Office","account_name":"Sapulpa Public Schools","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1020256620000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Kathy Berryhill","created_time":"\/Date(1020070260000+0300)\/","created_userid":"45","creation_category_id":"3","creation_category_name":"Inquiry | General | Other","custom_fields":"","estimated_hours":null,"folder_id":null,"folder_name":null,"follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"62262","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":306,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"new user wizard.","submission_category_id":null,"submission_category_name":null,"tech_email":"jon.vickers@micajah.com","tech_first_name":"Jon","tech_last_name":"Vickers","tech_name":"Jon Vickers","tech_userid":"26","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"kberryhill@sapulpaps.org","user_first_name":"Kathy","user_last_name":"Berryhill","user_name":"Kathy Berryhill","user_userid":"45","workpad":null},{"account_id":"56","account_location_id":"218256","account_location_name":"Central Office","account_name":"Coweta County Schools","amount_labor":0.0000,"amount_misc":0.0000,"amount_parts":0.0000,"amount_travel":0.0000,"asset_id":null,"asset_identifier":null,"class_id":"29","class_name":"HelpDesk","closed_name":"","closed_note":null,"closed_time":"\/Date(1022062620000+0300)\/","closed_userid":null,"confirmed_name":"","confirmed_note":null,"confirmed_time":null,"confirmed_userid":null,"created_name":"Kathy Payton","created_time":"\/Date(1020154860000+0300)\/","created_userid":"316","creation_category_id":"4","creation_category_name":"Bug | Logic Flaw","custom_fields":"","estimated_hours":null,"folder_id":"726","folder_name":"Helpdesk \/ Printable version","follow_up_note":null,"follow_up_time":null,"id_method":null,"is_confirmed":null,"is_new_tech_message":false,"is_new_user_message":false,"is_preventive":false,"is_resolved":null,"is_via_email_parser":false,"key":"62810","level":1,"level_name":"         1 - Client Fulfillment Rep","location_id":null,"location_name":null,"next_step":null,"next_step_time":null,"note":null,"number":307,"priority_id":"1547","priority_level":1,"priority_name":"         1 - Unassigned Priority","project_id":null,"project_name":null,"remaining_hours":null,"request_completion_note":null,"request_completion_time":null,"resolution_category_id":null,"resolution_category_name":null,"room":"","status":2,"status_name":"Closed","subject":"Custom Fields","submission_category_id":null,"submission_category_name":null,"tech_email":"jon.vickers@micajah.com","tech_first_name":"Jon","tech_last_name":"Vickers","tech_name":"Jon Vickers","tech_userid":"26","total_hours":null,"updated_name":null,"updated_time":null,"updated_userid":null,"user_email":"kathy.payton@cowetaschools.org","user_first_name":"Kathy","user_last_name":"Payton","user_name":"Kathy Payton","user_userid":"316","workpad":null}],"TicketsNumber":6740}';    		createGlobalTableView(data);    		Ti.App.fireEvent('hide_global_indicator');    		updateTicketsToolbar(false);    	});        lblUpdate.text = 'Page ' + PageNum; }win.add(tvTickets);var addNav = Titanium.UI.createButton({	title: 'Add' });addNav.addEventListener('click', addNewTicket);win.setRightNavButton(addNav);win.backButtonTitle = 'Home';// used to evenly distribute items on the toolbarvar flexSpace = Titanium.UI.createButton({	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});// used to create a fixed amount of space between two items on the toolbarvar fixedSpace = Titanium.UI.createButton({	systemButton:Titanium.UI.iPhone.SystemButton.FIXED_SPACE,	width:50});var add = Titanium.UI.createButton({	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE});add.addEventListener('click', addNewTicket);var refresh = Titanium.UI.createButton({	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH});refresh.addEventListener('click', function(){	tvTickets.data = [];    loadTickets();});var previous = Titanium.UI.createButton({	systemButton:107//Titanium.UI.iPhone.SystemButton.REWIND	//backgroundImage:'../images/navbtns/hor_left_normal.png'});previous.addEventListener('click', function () {    tvTickets.data = [];    PageNum--;    loadTickets();});var next = Titanium.UI.createButton({	systemButton:108//Titanium.UI.iPhone.SystemButton.FAST_FORWARD});next.addEventListener('click', function () {    tvTickets.data = [];    PageNum++;    loadTickets();});var lblUpdate = Titanium.UI.createLabel({		text: 'Page ' + PageNum,	color: '#ffffff',	font: {fontSize: 14, fontWeight:'bold'}});var infLoadTickets = Titanium.UI.createProgressBar({	width:80,	min:0,	max:10,	value:0,	color:'#fff',	//message:'Downloading 0 of 10',	font:{fontSize:14, fontWeight:'bold'},	style:Titanium.UI.iPhone.ProgressBarStyle.BAR});function updateTicketsToolbar(showProgressBar){	infLoadTickets.value = 0;	//infLoadTickets.message = 'Downloading 0 of 10';		if (showProgressBar) //win.toolbar	{				infLoadTickets.show();		win.setToolbar([refresh,flexSpace,previous,flexSpace,infLoadTickets,flexSpace,next,flexSpace,add], {animated:true});	}	else	{				win.setToolbar([refresh,flexSpace,previous,flexSpace,lblUpdate,flexSpace,next,flexSpace,add], {animated:true});		infLoadTickets.hide();	}}updateTicketsToolbar(false);win.addEventListener('event_ticket_created',function(e){	Ti.App.fireEvent('show_complete_message', { labelText: 'Ticket created. Id=' + e.id });	// maybe go to this ticket	// refresh ticket info - after ticket add});win.addEventListener('event_ticket_closed',function(e){	// refresh ticket info - after ticket close});loadTickets();/*var kk = 100;setInterval(function () { 	kk++; 	var next1= Titanium.UI.createButton({systemButton:kk});	win.toolbar = [flexSpace, next1,flexSpace];	win.title = kk;}, 1000);*/