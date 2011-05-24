Ti.include('../controls/table_pulldown_iphone.js');
var win = Titanium.UI.currentWindow;

var data = [
	//General section
	{title:'Accounts', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Locations', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Tickets', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Projects', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	// Tickets section
	{title:'New Messages', hasChild:true, subWindow:'../tickets/ticket.js', header: 'Ticket Summary', leftImage: '../images/MAIL.PNG'},
	{title:'Open Tickets', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Open as End User', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'On Hold', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Waiting On Parts', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Follow-Up Dates', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Unconfirmed', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	// Queues
	{title:'Future Consideration', hasChild:true, subWindow:'../tickets/ticket.js', header: 'Queues', leftImage: '../images/MAIL.PNG'},
	{title:'MC3 Upgrade', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Pre-Development', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'},
	{title:'Website fixes', hasChild:true, subWindow:'../tickets/ticket.js', leftImage: '../images/MAIL.PNG'}
];

var tableData = [];

function loadDashboard()
{
	for(var i=0,ilen=data.length; i<ilen; i++){
		var thisObj = data[i];		 
		var rowName = Titanium.UI.createLabel({
			text:thisObj.title,
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',		
			left:40,
			height:18
		});
		
		var k = i;
		if (k > 9)
		 k = k - 10;
		
		var rowStatus = Titanium.UI.createLabel({
			text: k + 1,
			backgroundColor: '#999999',
			color:'#ffffff',
			//font:{fontSize:16,fontWeight:'bold'},
			width:14,
			height: 18,
			textAlign:'center',
			right:10
		});
		
		var row = Ti.UI.createTableViewRow({
		    className:"home_row",
		    hasChild:thisObj.hasChild,
		    className: 'home_row',
		    leftImage: thisObj.leftImage
		  });
		 	 
		//row.add(icon);
		row.add(rowName);
		if (i > 3 && i != 9)
			row.add(rowStatus);
		if (thisObj.header)
			row.header = thisObj.header;
		row.subWindow = thisObj.subWindow;
		row.subWindowTitle = thisObj.title;
		//row.title = thisObj.title;
		tableData.push(row);
	}
	//alert(Ti.App.getArguments());
}

loadDashboard();

var tableview = Titanium.UI.createTableView({ data:tableData, style:Titanium.UI.iPhone.TableViewStyle.GROUPED });

// create table view event listener
tableview.addEventListener('click', function(e)
{	
	if (e.rowData.subWindow)
	{
		var win = Ti.UI.createWindow( {
	       		title : e.rowData.subWindowTitle,				
		        url: e.rowData.subWindow,
		        
		        _parent: Titanium.UI.currentWindow,
		        navGroup : Titanium.UI.currentWindow.navGroup,
		        rootWindow : Titanium.UI.currentWindow.rootWindow
		    });		     
		 Titanium.UI.currentWindow.navGroup.open(win, {animated:true});		
	}
});

// Pull dowm section
mbl_addTablePullDownHeader(tableview, function () { tableview.data = []; }, function () { loadDashboard(); tableview.data = tableData; });

win.add(tableview);

var navSignOut = Ti.UI.createButton({title:'Sign Out'});
navSignOut.addEventListener('click', function(e)
{
    Ti.App.Properties.setString('mblUserPwd', '');
    win.navGroup.close(win);
});
win.leftNavButton = navSignOut;