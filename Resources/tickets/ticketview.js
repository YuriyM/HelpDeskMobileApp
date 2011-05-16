Ti.include('../includes/webserviceclient.js');
Ti.include('../includes/tickettableview.js');
Ti.include('../controls/load_indicator_iphone.js');

var win = Titanium.UI.currentWindow;
var tid = win.tid;

var buttonObjects = [
	{image:'../images/navbtns/ver_top_normal.png', width:35, height:25},
	{image:'../images/navbtns/ver_bottom_normal.png', width:35, height:25}
];

var nav_bar = Titanium.UI.createButtonBar({
	labels:buttonObjects,
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	backgroundColor:'#336699'
});

win.setRightNavButton(nav_bar);

nav_bar.addEventListener('click', function(e)
{
	alert(e);
});

var viewTicket = Titanium.UI.createTableView({ id: 'tvTickets', data: []/*, separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE*/ });

// Load Ticket info
function loadticket(id)
{   
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
    mbl_dataExchange("GET", "43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Ticket.svc/"+id + "/",
    	onload,
    	function (e) { loadIndicator.loadingdatastrem(e.progress); },
    	function (e) { loadIndicator.hide(); 
    		var data = '{"AccountID":"2","AccountLocation":"District Office","AccountLocationID":"218220","AccountName":"Alachua County Schools (FL)","AccountNumber":"1","AssetID":null,"Class":"HelpDesk","ClassID":"29","ClosedTime":"\/Date(1013784420000+0200)\/","ClosedUserEmail":null,"ClosedUserFirstName":null,"ClosedUserID":null,"ClosedUserLastName":null,"ClosedUserName":"","ClosureNote":null,"ConfirmedDateTime":null,"ConfirmedNote":null,"ConfirmedUserEmail":null,"ConfirmedUserFirstName":null,"ConfirmedUserID":null,"ConfirmedUserLastName":null,"ConfirmedUserName":"","CreateTime":"\/Date(1013587080000+0200)\/","CreatedUserEmail":"helpdesk@sbac.edu","CreatedUserFirstName":"SBAC","CreatedUserID":"34","CreatedUserLastName":"HELPDESK","CreatedUserName":"SBAC HELPDESK","CreationCategory":"Inquiry | General | Other","CreationCategoryID":"3","CustomXML":null,"EmailCC":null,"EstimatedTime":null,"Folder":null,"FolderID":null,"FollowUpDateTime":null,"FollowUpNote":null,"ID":"408","IdMethod":null,"IsConfirmed":null,"IsCreatedViaEmailParser":false,"IsHandledByCallCenter":false,"IsPreventive":false,"IsResolved":null,"LaborCost":0.0000,"Location":null,"LocationID":null,"MiscCost":0.0000,"NextStep":null,"Note":null,"PartsCost":0.0000,"Priority":"         1 - Unassigned Priority","PriorityID":"1547","PriorityLevel":1,"Project":null,"ProjectID":null,"RemainingHours":null,"RequestCompletionDateTime":null,"RequestCompletionNote":null,"ResolutionCategoryID":null,"ResolutionCategoryName":null,"SLACompleteDateTime":null,"SLAResponseDateTime":null,"SLAStartDateTime":null,"ScheduledTicketID":null,"Status":"Closed","Subject":"Merging multiple tickets","SubmissionCategoryID":null,"SubmissionCategoryName":null,"TechnicianEmail":"patrick.clements@bigwebapps.com","TechnicianFirstName":"Patrick","TechnicianID":"38006","TechnicianLastName":"Clements","TechnicianName":"Patrick Clements","TicketLevel":"         1 - Client Fulfillment Rep","TicketLevelID":"1","TicketNumber":93,"TicketNumberPrefix":null,"TotalHours":null,"TravelCost":0.0000,"UserEmail":"helpdesk@sbac.edu","UserFirstName":"SBAC","UserID":"34","UserLastName":"HELPDESK","UserName":"SBAC HELPDESK","Workpad":null,"Comments":null,"TimeLogs":null}';
			renderData(data);
    		alert(e); });

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
	//e.index;
});

// Toolbar section
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
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

var close = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.STOP
});

close.addEventListener('click', function()
{
	dialog.show();
});

win.toolbar = [refresh,flexSpace,transfer,flexSpace,close,flexSpace,respond,flexSpace,add];

win.add(loadIndicator);

loadticket(tid);

/*var textRespond = Titanium.UI.createTextArea({
	color:'#336699',
	borderRadius: 5,
	borderWidth: 1,
	borderColor:'#bbb',
	height:200,
	top:10,
	width: 280,
	font:{fontSize:18,fontFamily:'Arial', fontWeight:'nornal'},
	suppressReturn:true,
	hintText:'Enter Response to Ticket'
});

var bSend = Titanium.UI.createButton({
	title:'Send Response',
	height:40,
	width: 280,
	top:220,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
	borderRadius:10, 
	//font:{fontSize:16,fontWeight:'bold'},  // add background image
	backgroundGradient:
	{type:'linear', colors:['#8097c8','#3665bf'], startPoint:{x:0,y:0}, endPoint:{x:0,y:40}, backFillStart:false},
	borderWidth:1,
	borderColor:'#666',
	color: '#fff'
});*/