Ti.include('../includes/network_webservice_client.js');
Ti.include('../includes/ticket_tableview.js');
var win = Titanium.UI.currentWindow;

//
// TICKET WINDOW GLOBAL VARIABLES SECTION
//
var tid = win.tid;
var tickets = win.tickets;
var tkt_lid = 0, tkt_techid = 0, tkt_cid = 0;
var tkt_updated = false;

//
// TICKETS MAIN WINDOW INITIALIZATION
//
var webblobView = Ti.UI.createWebView({});	
win.add(webblobView);
	
//
// TOOLBAR INITIALIZATION
//
var flexSpace = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE });

// refresh
var refresh = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.REFRESH });
refresh.addEventListener('click', loadTicket);

// transfer section
var transfer = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.ACTION });

var optionsTransferDialogOpts = {
	options:['Change Level', 'Transfer to Technician', 'Transfer to Class', 'Cancel'],
	cancel:3
};
var dialogTransfer = Titanium.UI.createOptionDialog(optionsTransferDialogOpts);

var winSelect = [null, null, null];
dialogTransfer.addEventListener('click',function(e)
{
	if (e.index !== 3)
	{
		if (winSelect[e.index] === null)
		{
			var win_type = 3 - e.index;
			var winUni = Titanium.UI.createWindow({
				url:'winselect.js',	
				window_type: win_type,				
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
	}
});

win.addEventListener('event_select_entity',function(e)
{
	switch (e.select_type)
		{
			case 3:
				var requestData = 
				{
					level: e.id
				}
			break;
			case 2:
				var requestData = 
				{
					tech_userid: e.id
				}
			break;
			case 1:
				var requestData = 
				{
					class_id: e.id
				}
			break;
		}
    var jsonRequestData = JSON.stringify(requestData);
    Ti.API.info('requestData = ' + jsonRequestData);
   	Ti.App.fireEvent('show_global_indicator',{message: 'Transfer Ticket'});
    mbl_dataExchange("POST", "Tickets.svc/" + tid + "/TRANSFER/",
    	function () {
        	Ti.App.fireEvent('hide_global_indicator');        	
        	Ti.API.info('Transfer HTTP Status = ' + this.status);
    		Ti.API.info('Transfer HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
    			tkt_updated = true;
    			win.showCompleteMessage = 'Ticket Successfully Transffered';
        		loadTicket();
			}
			else
				alert('Transfer failed. Error code: ' + this.status);
    	},
    	function (e) {  },
    	function (e) { 
    		Ti.App.fireEvent('hide_global_indicator');
    		alert('Transfer Connect Error. Details: ' + JSON.stringify(e));
    		loadTicket(); },
    	jsonRequestData);
});

transfer.addEventListener('click', function()
{
	dialogTransfer.show();
});

// close section
var close = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.STOP });

var optionsDialogOpts = {
	options:['Close Ticket', 'Cancel'],
	destructive:0,
	cancel:1
};
var dialogClose = Titanium.UI.createOptionDialog(optionsDialogOpts);

dialogClose.addEventListener('click',function(e)
{
	if (e.index == 0)
	{
		var requestData = {	status: "2" };
		Ti.App.fireEvent('show_global_indicator',{message: 'Close Ticket'});
		mbl_dataExchange("PUT", "Tickets.svc/" + tid + "/",
    	function () {
			Ti.App.fireEvent('hide_global_indicator');
        	Ti.API.info('Close HTTP Status = ' + this.status);
    		Ti.API.info('Close HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
    			tkt_updated = true;
    			win.showCompleteMessage = 'Ticket Successfully Closed';
        		loadTicket();
			}
			else
				alert('Close failed. Error code: ' + this.status);
    	},
    	function (e) {  },
    	function (e) { Ti.App.fireEvent('hide_global_indicator'); alert('Close Connect Error. Details: ' + JSON.stringify(e)); },
    	JSON.stringify(requestData));
	}
});

close.addEventListener('click', function()
{
	dialogClose.show();
});

// respond section
var respond = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.REPLY });

respond.addEventListener('click', function()
{
		var win = Titanium.UI.createWindow({
			url:"ticket_respond.js",
			title:"Write Ticket Response",
			backButtonTitle: "Back",
			tid: tid,
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win);
});

win.addEventListener('event_ticket_respond',function(e)
{
	win.showCompleteMessage = 'Response Sent';
	loadTicket();
});

// add section
var add = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE });

add.addEventListener('click', function()
{
	var win = Titanium.UI.createWindow({
			url:"ticket_createquick.js",
			title:"Add Ticket",
			backButtonTitle: "Back",
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win);
});

win.addEventListener('event_ticket_created',function(e)
{
	win.showCompleteMessage = 'Ticket Successfully Created';
	Ti.API.info('View: TktCreated Event Handler. Id = ' + e.createdId);
	tid = e.createdId;
	tickets = [e.createdId];	
	Ti.API.info('View: TktCreated Event Handler. tickets = ' + tickets);
	updateNavBar();
	loadTicket();
});

win.toolbar = [refresh,flexSpace,transfer,flexSpace,close,flexSpace,respond,flexSpace,add];

//
// NAVBAR INITIALIZATION
//
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
					loadTicket();
					break;
				}
			}
			else if (e.index == 1)
			{
				if (i < tickets.length-1)
				{
					tid = tickets[i+1];
					loadTicket();
					break;
				}
			}
	// add button bar change
	updateNavBar();
});

// back event handler to refresh main ticket list
win.addEventListener('close', function(e)
{
	if (tkt_updated)
		win._parent.fireEvent("event_refresh_ticket_list");
});
//
// DEFINE MAIN FUNCTION
//
function loadTicket()
{
	function fillTicketTableView(data)
	{
		var ticket = eval('({"htmlTicket": ' + data + '})');		
        webblobView.html = ticket.htmlTicket;
	}
	//webblobView.html = '';
	//webblobView.repaint();
	Ti.App.fireEvent('show_global_indicator',{message: 'Load Ticket'});
    mbl_dataExchange("GET", "Tickets.svc/" + tid + "/HTML/",
    	function () {
    		Ti.App.fireEvent('hide_global_indicator');        	
        	Ti.API.info('Ticket HTML HTTP Status = ' + this.status);
    		Ti.API.info('Ticket HTML HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
        		fillTicketTableView(this.responseText);
        		if ((win.showCompleteMessage !== null) && (typeof win.showCompleteMessage !== "undefined"))
        			if (win.showCompleteMessage.length > 0)        			
        				Ti.App.fireEvent('show_complete_message', { labelText: win.showCompleteMessage });
			}
			else
				alert('Ticket HTML failed. Error code: ' + this.status);				 
   		},
    	function (e) {  },
    	function (e) {
    		var data = '<html><body>This test ticket details for exceptions.<table cellpadding=4 cellspacing=0><tbody><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Ticket #</td><td style="border-bottom:solid 1px #555555;text-align:left"><b><a href="http://login.bigwebapps.com/?TicketId=4410191&amp;login=yuriy.mykytyuk@micajah.com&amp;DeptId=7&amp;DeptName=bigWebApps+Support" target="_blank">11620</a> </b></td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Subject</td><td style="border-bottom:solid 1px #555555;text-align:left">Mobile UI Adjustmetns </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Department</td><td style="border-bottom:solid 1px #555555;text-align:left">bigWebApps Support </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Account/Location</td><td style="border-bottom:solid 1px #555555;text-align:left">bigWebApps Support (Internal) / Atlanta </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Technician</td><td style="border-bottom:solid 1px #555555;text-align:left">Yuriy Mykytyuk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">User</td><td style="border-bottom:solid 1px #555555;text-align:left">Jon Vickers<br><a href="mailto:jon.vickers@micajah.com">jon.vickers@micajah.com</a></td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Level</td><td style="border-bottom:solid 1px #555555;text-align:left">3 - Active Plate </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Priority</td><td style="border-bottom:solid 1px #555555;text-align:left">4 - Upgrade/New Feature </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Expect Response By</td><td style="border-bottom:solid 1px #555555;text-align:left">5/5/2011 17:34 </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Class</td><td style="border-bottom:solid 1px #555555;text-align:left">HelpDesk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Project</td><td style="border-bottom:solid 1px #555555;text-align:left">HelpDesk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Logged Time</td><td style="border-bottom:solid 1px #555555;text-align:left">0 hours </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Remaining Time</td><td style="border-bottom:solid 1px #555555;text-align:left">0 hours </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Total Time</td><td style="border-bottom:solid 1px #555555;text-align:left">No budget </td></tr></tbody></table>' +
				  	   '<br><table border=0 cellpadding=3 cellspacing=0><tbody><tr bgcolor="#3d3d8d"><td colspan=2 align=center><font color="#ffffff" size=2><b>Initial Post</b></font></td></tr><tr bgcolor="#cccccc"><td>Vickers, Jon</td><td align=right>5/5/2011 15:34</td></tr><tr><td colspan=2>https://bigwebapps.basecamphq.com/projects /6951513/posts/45369530/comments<br><br>Hey Yuriy, here is official ticket to make worklist UI adjustments.  Pat and I are giving conflicting opinions.  Take these suggestions and do what you think is best solution.<br><br>We can refine the UI additional later as one main project to clean all screens once we get the data working properly.<br><br>Following files were  uploaded: Ticket list style adjust.png, Ticket list style adjust2.png.</td></tr></tbody></table></html></body>';
			webblobView.html = data;
        	webblobView.repaint();
        	Ti.App.fireEvent('hide_global_indicator');
    		alert('Ticket HTML Connect Error. Details: ' + JSON.stringify(e));
    	});
}

loadTicket();