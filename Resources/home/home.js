Ti.include('../controls/control_table_pulldown.js');
var win = Titanium.UI.currentWindow;

//
// Create main Table View
//
var tvDashboard = Titanium.UI.createTableView({ style:Titanium.UI.iPhone.TableViewStyle.GROUPED });

tvDashboard.addEventListener('click', function(e)
{	
	if (e.rowData.subWindowURL) // just to exlude imcomplete windows
	{
		var win = Ti.UI.createWindow( {
	       	title : e.rowData.subWindowTitle,				
		    url: e.rowData.subWindowURL,
		    _parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow
		});		     
		Titanium.UI.currentWindow.navGroup.open(win, {animated:true});		
	}
});

// Pull down section init
mbl_addTablePullDownHeader(tvDashboard, function () { tvDashboard.data = [ ]; }, loadDashboard );

win.add(tvDashboard);

//
// Nav Bar Init
//
var navSignOut = Ti.UI.createButton({title:'Sign Out'});
navSignOut.addEventListener('click', function(e)
{
    Ti.App.Properties.setString('mblUserPwd', '');
    win.navGroup.close(win);
});
win.leftNavButton = navSignOut;

//
// Fill Main Dashboard TableView
//
var data = [
	//General section
	{title:'Accounts', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Locations', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Tickets', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Projects', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	// Active link
	{title:'Tickets', hasChild:true, subWindow:'../tickets/ticket_list.js', subWindowURL:'../tickets/ticket_list.js', header: 'Test Tickets', leftImage: '../images/MAIL.PNG'},
	// Tickets section
	{title:'New Messages', hasChild:true, subWindow:'../tickets/ticket_list.js', header: 'Ticket Summary', leftImage: '../images/MAIL.PNG'},
	{title:'Open Tickets', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Open as End User', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'On Hold', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Waiting On Parts', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Follow-Up Dates', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Unconfirmed', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	// Queues
	{title:'Future Consideration', hasChild:true, subWindow:'../tickets/ticket.js', header: 'Queues', leftImage: '../images/MAIL.PNG'},
	{title:'MC3 Upgrade', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Pre-Development', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'},
	{title:'Website fixes', hasChild:true, subWindow:'../tickets/ticket_list.js', leftImage: '../images/MAIL.PNG'}
];

var tableData = [];

function loadDashboard()
{
	for(var i=0,ilen=data.length; i<ilen; i++)
	{
		var thisObj = data[i];
		
		var row = Ti.UI.createTableViewRow({
		    className: 'home_row',
		    leftImage: thisObj.leftImage,
		    hasChild: thisObj.hasChild
		  });
		
		var rowName = Titanium.UI.createLabel({
			text:thisObj.title,
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',		
			left:40,
			height:18
		});
		if (!thisObj.subWindowURL)
			rowName.color = '#999999';
		row.add(rowName);
			
		var k = i;
		if (k > 10)
			k = k - 11;
		
		var rowStatus = Titanium.UI.createLabel({
			text: k + 1,
			backgroundColor: '#999999',
			color:'#ffffff',
			width:14,
			height: 18,
			textAlign:'center',
			right:10
		});
		if (i > 4 && i !== 9)
			row.add(rowStatus);
			
		if (thisObj.header)
			row.header = thisObj.header;
			
		row.subWindow = thisObj.subWindow;
		row.subWindowURL = thisObj.subWindowURL;
		row.subWindowTitle = thisObj.title;
		
		tableData.push(row);
	}
	tvDashboard.setData(tableData);
}

loadDashboard();