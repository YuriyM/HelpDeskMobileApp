Ti.include('../includes/webserviceclient.js');
Ti.include('../includes/tickettableview.js');
Ti.include('../controls/table_pulldown_iphone.js');
Ti.include('../controls/load_indicator_iphone.js');

// Global variables
var PageNum = 25;
var PageCount = 11;

// current window
var win = Titanium.UI.currentWindow;

var tvTickets = Titanium.UI.createTableView({ id: 'tvTickets', data: [] });

// Create Buttons
var bAddNew = Titanium.UI.createButton({ id: 'bAddNew' });

var bNavAdd = Titanium.UI.createButton({ id: 'bNavAdd' });

var bNext = Titanium.UI.createButton({ id: 'bNext' });

var bPrevious = Titanium.UI.createButton({ id: 'bPrevious' });


// Listeners
bNext.addEventListener('click', function () {
    tvTickets.data = [];
    PageNum++;
    loadTickets();
});

bPrevious.addEventListener('click', function () {
    tvTickets.data = [];
    PageNum--;
    loadTickets();
});

function addNewTicket() {
    var win = Titanium.UI.createWindow({
			url:"addticket.js",
			title:"Add Ticket",
						
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win);
		//Titanium.UI.currentTab.open(win,{animated:true});
}

bNavAdd.addEventListener('click', addNewTicket);  

// Ticket view section
tvTickets.addEventListener('click', function(e)
{
	if (e.rowData.tid)
	{
		var win = Titanium.UI.createWindow({
			url:"ticketview.js",
			title:'Ticket Details',//'#' + e.rowData.number,
			tid:e.rowData.tid,
						
		    _parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow
		});
		Titanium.UI.currentWindow.navGroup.open(win);
		//Titanium.UI.currentTab.open(win,{animated:true});
	}
});
//---------------------

// Pull dowm section
mbl_addTablePullDownHeader(tvTickets, function () { tvTickets.data = null;PageNum++; }, loadTickets);
// -----------------

// Paging functions
function setPageNavigation(ticketCount)
{
	if (ticketCount <= PageCount) {
    	bPrevious.visible = bNext.visible = false;
    }
    else if (PageNum == 1) {
    	bPrevious.visible = false;
        bNext.visible = true;
    }
    else if (PageNum > 1 && (PageNum * PageCount >= ticketCount)) {
    	bPrevious.visible = true;
        bNext.visible = false;
    }
    else
    	bPrevious.visible = bNext.visible = true;
}
//-----------------

// main load function    
function loadTickets() {
	function createGlobalTableView(data)
    {	
    	loadIndicator.hide();
    	Ti.API.info(data);
    	var info = eval('(' + data + ')');
        var tickets = info.Tickets;
        var ticketsNumber = info.TicketsNumber;        
		setPageNavigation(ticketsNumber);        
        var rowData = createTicketTableView(tickets);
        tvTickets.data = rowData;
        tvTickets.show();
    }    
	
    function onload() {
        createGlobalTableView(this.responseText);
    };
    
    tvTickets.hide();
    loadIndicator.show();
    mbl_dataExchange("GET", "43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Ticket.svc?pg=" + PageNum + "&ps=" + PageCount,
    	onload,
    	function (e) { loadIndicator.loadingdatastrem(e.progress); },
    	function (e) { loadIndicator.hide();
    		alert(e);
    		var data = '{"PageNumber":25,"PageSize":4,"Tickets":[{"AccountID":"20","AccountLocation":null,"AccountLocationID":null,"AccountName":"HelpDesk","AccountNumber":"25","AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime":null,"ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime": null,"CreatedUserEmail":null,"CreatedUserFirstName":null,"CreatedUserID":null,"CreatedUserLastName":null,"CreatedUserName":"","CreationCategory":"Bug | Logic Flaw","CreationCategoryID":"4","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"377","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"Misspelling of Articles","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"jon.vickers@micajah.com","TechnicianFirstName":"Jon","TechnicianID":"26","TechnicianLastName":"Vickers","TechnicianName":"Jon Vickers","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":90,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"patrick.clements@bigwebapps.com","UserFirstName":"Patrick","UserID":"38006","UserLastName":"Clements","UserName":"Patrick Clements","Workpad":null},{"AccountID":null,"AccountLocation":null,"AccountLocationID":null,"AccountName":null,"AccountNumber":null,"AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime": null,"ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime": null,"CreatedUserEmail":"tranard@socs.k12.in.us","CreatedUserFirstName":"Tamra","CreatedUserID":"286","CreatedUserLastName":"Ranard","CreatedUserName":"Tamra Ranard","CreationCategory":"Inquiry | General | Other","CreationCategoryID":"3","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"379","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"User List","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"jason.moore@bigwebapps.com","TechnicianFirstName":"Jason","TechnicianID":"27","TechnicianLastName":"Moore","TechnicianName":"Jason Moore","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":91,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"tranard@socs.k12.in.us","UserFirstName":"Tamra","UserID":"286","UserLastName":"Ranard","UserName":"Tamra Ranard","Workpad":null},{"AccountID":"2","AccountLocation":"District Office","AccountLocationID":"218220","AccountName":"Alachua County Schools (FL)","AccountNumber":"1","AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime": null,"ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime": null,"CreatedUserEmail":"helpdesk@sbac.edu","CreatedUserFirstName":"SBAC","CreatedUserID":"34","CreatedUserLastName":"HELPDESK","CreatedUserName":"SBAC HELPDESK","CreationCategory":"Inquiry | General | Other","CreationCategoryID":"3","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"408","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"Merging multiple tickets","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"patrick.clements@bigwebapps.com","TechnicianFirstName":"Patrick","TechnicianID":"38006","TechnicianLastName":"Clements","TechnicianName":"Patrick Clements","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":93,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"helpdesk@sbac.edu","UserFirstName":"SBAC","UserID":"34","UserLastName":"HELPDESK","UserName":"SBAC HELPDESK","Workpad":null},{"AccountID":null,"AccountLocation":null,"AccountLocationID":null,"AccountName":null,"AccountNumber":null,"AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime": null,"ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime": null,"CreatedUserEmail":"jason.moore@bigwebapps.com","CreatedUserFirstName":"Jason","CreatedUserID":"27","CreatedUserLastName":"Moore","CreatedUserName":"Jason Moore","CreationCategory":"Inquiry | General | Other","CreationCategoryID":"3","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"420","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"Send free copy of web help desk to Cohesia","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"jason.moore@bigwebapps.com","TechnicianFirstName":"Jason","TechnicianID":"27","TechnicianLastName":"Moore","TechnicianName":"Jason Moore","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":94,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"aackroyd@cohesia.com","UserFirstName":"Alan","UserID":"309","UserLastName":"Ackroyd","UserName":"Alan Ackroyd","Workpad":null}],"TicketsNumber":6740}';
			createGlobalTableView(data);});
    
    lblUpdate.text = 'Page ' + PageNum; 
}

win.add(tvTickets);

//win.add(bPrevious);
//win.add(bAddNew);
//win.add(bNext);
var addNav = Titanium.UI.createButton({
	title: 'Add'
});
addNav.addEventListener('click', addNewTicket);
win.setRightNavButton(addNav);
win.backButtonTitle = 'Home';
//win.setRightNavButton(bNavAdd);



// used to evenly distribute items on the toolbar
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

// used to create a fixed amount of space between two items on the toolbar
var fixedSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FIXED_SPACE,
	width:50
});

var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});
add.addEventListener('click', addNewTicket);

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
refresh.addEventListener('click', function()
{
	tvTickets.data = [];
    loadTickets();
});

var previous = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REWIND
	//backgroundImage:'../images/navbtns/hor_left_normal.png'
});
previous.addEventListener('click', function () {
    tvTickets.data = [];
    PageNum--;
    loadTickets();
});

var next = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FAST_FORWARD
});
next.addEventListener('click', function () {
    tvTickets.data = [];
    PageNum++;
    loadTickets();
});

var lblUpdate = Titanium.UI.createLabel({
	text: 'Page ' + PageNum,
	color: '#ffffff',
	font: {fontSize: 14, fontWeight:'bold'}
});

win.toolbar = [refresh,flexSpace,previous,flexSpace,lblUpdate,flexSpace,next,flexSpace,add];

win.add(loadIndicator);

loadTickets();