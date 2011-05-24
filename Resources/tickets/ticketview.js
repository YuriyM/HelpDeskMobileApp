Ti.include('../includes/webserviceclient.js');
Ti.include('../includes/tickettableview.js');
Ti.include('../controls/load_indicator_iphone.js');

var win = Titanium.UI.currentWindow;
var tid = win.tid;
var tickets = win.tickets;

tkt_lid = 0;
tkt_techid = 0;
tkt_cid = 0;

var previousTicket = Titanium.UI.createButton({ systemButton:103 });

var nextTicket = Titanium.UI.createButton({ systemButton:104 });

var buttonObjects1 = [
	{image:'../images/navbtns/ver_top_hidden.png', width:35, height:27 },
	{image:'../images/navbtns/ver_bottom_normal.png', width:35, height:27}
];

var buttonObjects2 = [
	{image:'../images/navbtns/ver_top_normal.png', width:35, height:27 },
	{image:'../images/navbtns/ver_bottom_normal.png', width:35, height:27}
];

var buttonObjects3 = [
	{image:'../images/navbtns/ver_top_normal.png', width:35, height:27 },
	{image:'../images/navbtns/ver_bottom_hidden.png', width:35, height:27}
];

var buttonObjects4 = [
	{image:'../images/navbtns/ver_top_hidden.png', width:35, height:27 },
	{image:'../images/navbtns/ver_bottom_hidden.png', width:35, height:27}
];

var nav_bar = Titanium.UI.createButtonBar({ style:Titanium.UI.iPhone.SystemButtonStyle.BAR });

function updateNavBar()
{
	if (tickets.length === 1)
		nav_bar.labels = buttonObjects4;
	else if (tid === tickets[0])
		nav_bar.labels = buttonObjects1;
	else if (tid === tickets[tickets.length - 1])
		nav_bar.labels = buttonObjects3;
	else
		nav_bar.labels = buttonObjects2;
}
updateNavBar();
win.setRightNavButton(nav_bar);

nav_bar.addEventListener('click', function(e)
{
	for (var i = 0; i < tickets.length; i++)
		if (tid == tickets[i])
			if (e.index == 0)
			{
				if (i > 0)
				{
					tid = tickets[i-1];
					loadticket(tid);
					break;
				}
			}
			else if (e.index == 1)
			{
				if (i < tickets.length-1)
				{
					tid = tickets[i+1];
					loadticket(tid);
					break;
				}
			}
	// add button bar change
	updateNavBar();
});

var viewTicket = Titanium.UI.createTableView({ id: 'tvTickets', data: []/*, separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE*/ });
viewTicket.hide();
// Load Ticket info
function loadticket(ticket_id)
{   
	viewTicket.hide();
	function renderData(data)
	{
		var info = eval('(' + data + ')');
        var ticket = info;
        Ti.API.info(data);
        createTicketView(viewTicket, ticket);
        loadIndicator.hide();
	}
	
	function onload() {
        renderData(this.responseText);
    };    
    
    loadIndicator.show();
    mbl_dataExchange("GET", "Tickets.svc/" + ticket_id + "/",
    	onload,
    	function (e) { loadIndicator.loadingdatastrem(e.progress); },
    	function (e) { loadIndicator.hide(); 
    		var data = '{"AccountID":"2","AccountLocation":"District Office","AccountLocationID":"218220","AccountName":"Alachua County Schools (FL)","AccountNumber":"1","AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime":"\/Date(1013784420000+0200)\/","ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime":"\/Date(1013587080000+0200)\/","CreatedUserEmail":"helpdesk@sbac.edu","CreatedUserFirstName":"SBAC","CreatedUserID":"34","CreatedUserLastName":"HELPDESK","CreatedUserName":"SBAC HELPDESK","CreationCategory":"Inquiry | General | Other","CreationCategoryID":"3","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"408","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"Merging multiple tickets","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"patrick.clements@bigwebapps.com","TechnicianFirstName":"Patrick","TechnicianID":"38006","TechnicianLastName":"Clements","TechnicianName":"Patrick Clements","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":93,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"helpdesk@sbac.edu","UserFirstName":"SBAC","UserID":"34","UserLastName":"HELPDESK","UserName":"SBAC HELPDESK","Workpad":null,"Comments":null,"TimeLogs":null}';
			renderData(data);
    		alert(e);
    		viewTicket.hide(); });

}

//win.add(viewTicket);

// Option Dialog
var optionsDialogOpts = {
	options:['Close Ticket', 'Cancel'],
	destructive:0,
	cancel:1//,
	//title:'Are you sure?'
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

dialog.addEventListener('click',function(e)
{
	if (e.index == 0)
	{
		mbl_dataExchange("DELETE", "Tickets.svc/" + tid + "/",
    	function () {
        	Ti.API.info(this.responseText);
        	win.navGroup.close(win);
			win._parent.fireEvent("event_ticket_closed", { id : tid });
    	},
    	function (e) {  },
    	function (e) { alert(e); });
	}
});

// Option Dialog
var optionsTransferDialogOpts = {
	options:['Change Level', 'Transfer to Technician', 'Transfer to Class', 'Cancel'],
	//destructive:0,
	cancel:3//,
	//title:'Are you sure?'
};

var dialogTransfer = Titanium.UI.createOptionDialog(optionsTransferDialogOpts);

var winSelect = [null, null, null];

// create table view event listener
dialogTransfer.addEventListener('click',function(e)
{
		if (winSelect[e.index] == null)
		{
			var win_type = 3 - e.index;
			var winUni = Titanium.UI.createWindow({
				url:'winselect.js',	
				window_type: win_type,
				title: 'Details',						
				_parent: Titanium.UI.currentWindow,
			    navGroup : Titanium.UI.currentWindow.navGroup,
			    rootWindow : Titanium.UI.currentWindow.rootWindow		
			});
			winSelect[e.index] = winUni;
		}		
		switch (e.index)
		{
			case 0:
				winSelect[e.index].select_id = tkt_lid;
				winSelect[e.index].title = 'Select Level';
			break;
			case 1:
				winSelect[e.index].select_id = tkt_techid;
				winSelect[e.index].title = 'Select Tech';
			break;
			case 2:
				winSelect[e.index].select_id = tkt_cid;
				winSelect[e.index].title = 'Select Class';
			break;
		}
		Titanium.UI.currentWindow.navGroup.open(winSelect[e.index],{animated:true});
});

win.addEventListener('event_select_entity',function(e)
{
	Titanium.API.info("callback event received = "+JSON.stringify(e));
	//e.id
	switch (e.select_type)
		{
			case 0:
				var requestData = 
				{
					ticket_id: tid,
					level_id: e.id
				}
			break;
			case 1:
				var requestData = 
				{
					ticket_id: tid,
					tech_id: e.id
				}
			break;
			case 2:
				var requestData = 
				{
					ticket_id: tid,
					class_id: e.id
				}
			break;
		}
    var jsonRequestData = JSON.stringify(requestData)
    
    Ti.API.info('Before ' + jsonRequestData);
    mbl_dataExchange("POST", "Tickets.svc/" + tid + "/transfer",
    	function () {
        	loadticket(tid);
			//win._parent.fireEvent("event_ticket_created", { id : 0 });
    	},
    	function (e) {  },
    	function (e) { alert(e); loadticket(tid); },
    	jsonRequestData);
});

// Toolbar section
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});

add.addEventListener('click', function()
{
	var win = Titanium.UI.createWindow({
			url:"addticket.js",
			title:"Add Ticket",
						
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win);
});

win.addEventListener('event_ticket_created',function(e)
{
	// refresh ticket info - show created ticket
});

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

var transfer = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ACTION
});

var respond = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REPLY
});

respond.addEventListener('click', function()
{
		var win = Titanium.UI.createWindow({
			url:"ticketrespond.js",
			title:"Write Ticket Response",
			tid: tid,
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win);
});

var close = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.STOP
});

transfer.addEventListener('click', function()
{
	dialogTransfer.show();
});

close.addEventListener('click', function()
{
	dialog.show();
});

refresh.addEventListener('click', function()
{
	loadticket(tid);
});

win.toolbar = [refresh,flexSpace,transfer,flexSpace,close,flexSpace,respond,flexSpace,add];

win.add(loadIndicator);

win.addEventListener('event_ticket_respond',function(e)
{
	// refresh ticket info - after ticket respond
});

loadticket(tid);