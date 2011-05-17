var win = Titanium.UI.currentWindow;

if (Ti.Platform.name == 'android') 
{
	win.backgroundColor = '#4e5c4d';
}
else
{
	//win.backgroundColor = '#aebcad';
}

var data = [];

// User row
var rowUser = Ti.UI.createTableViewRow({
	title:'Yuriy Dzoba',
	entityId: -1,
	hasChild:true,
	test:'selectuser.js',
	header:'User'	
});
data[0] = rowUser;

// Class row
var rowClass = Ti.UI.createTableViewRow({
	title:'',	
	entityId: 0,
	hasChild:true,
	test:'selectclass.js',
	header:'Class*'	
});
data[1] = rowClass;

// Tech row
var rowTech = Ti.UI.createTableViewRow({
	title:'Yuriy Mykytyuk',	
	entityId: -1,
	hasChild:true,
	test:'selecttech.js',
	header:'Technician'	
});
data[2] = rowTech;

var rowSubject = Ti.UI.createTableViewRow({		
	entityId: 0,
	height:55,	
	header:'Subject*'	
});

var textSubject = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:10,
	left:10,
	width:250,
	hintText:'Enter Ticket Subject'//,
	//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
});

rowSubject.add(textSubject);
rowSubject.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;

data[3] = rowSubject;

var rowDetails = Ti.UI.createTableViewRow({		
	entityId: 0,	
	height:200,
	header:'Details'	
});

var textDetails = Titanium.UI.createTextArea({
	color:'#336699',
	height:150,
	top:10,
	left:10,
	//width:250,
	hintText:'Enter Ticket Details'
});

rowDetails.add(textDetails);
rowDetails.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;

data[4] = rowDetails;

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});


// create table view
var tableViewOptions = {
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'transparent',
		rowBackgroundColor:'white'
	};


var tableview = Titanium.UI.createTableView(tableViewOptions);

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
						
			_parent: Titanium.UI.currentWindow,
		    navGroup : Titanium.UI.currentWindow.navGroup,
		    rootWindow : Titanium.UI.currentWindow.rootWindow		
		});
		Titanium.UI.currentWindow.navGroup.open(win,{animated:true});
		//Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
win.add(tableview);
var bNavAdd = Titanium.UI.createButton({ title: 'Create' });
bNavAdd.addEventListener('click', function(e)
{
	
});
win.setRightNavButton(bNavAdd);


