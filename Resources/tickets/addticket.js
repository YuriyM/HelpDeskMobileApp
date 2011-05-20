Ti.include('../includes/webserviceclient.js');

var win = Titanium.UI.currentWindow;
tkt_uid = 0;
tkt_cid = 0;
tkt_tid = 0;
tkt_sbj = false;

if (Ti.Platform.name == 'android') 
{
	win.backgroundColor = '#4e5c4d';
}
else
{
	//win.backgroundColor = '#aebcad';
}

win.backButtonTitle = 'Back';

var data = [];

// User row
var rowUser = Ti.UI.createTableViewRow({
	title: '',
	hasChild:true,
	winurl:'winselect.js',
	header:'User*'	
});
data[0] = rowUser;

// Class row
var rowClass = Ti.UI.createTableViewRow({
	title:'',
	hasChild:true,
	winurl:'winselect.js',
	header:'Class*'	
});
data[1] = rowClass;

// Tech row
var rowTech = Ti.UI.createTableViewRow({
	title:'',	
	hasChild:true,
	winurl:'winselect.js',
	header:'Technician*'	
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

var winSelect = [null, null, null];

var hdMobile = {};

hdMobile.createSelectWindow = function(e) {
    var winUni = Titanium.UI.createWindow({
				url:e.rowData.winurl,	
				window_type: e.index,						
				_parent: Titanium.UI.currentWindow,
			    navGroup : Titanium.UI.currentWindow.navGroup,
			    rootWindow : Titanium.UI.currentWindow.rootWindow		
			});
    
    return winUni;
};

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.winurl)
	{
		if (winSelect[e.index] == null)
		{
			winUni = hdMobile.createSelectWindow(e);
			winSelect[e.index] = winUni;
		}		
		switch (e.index)
		{
			case 0:
				winSelect[e.index].select_id = tkt_uid;
				winSelect[e.index].title = 'Select User';
			break;
			case 1:
				winSelect[e.index].select_id = tkt_cid;
				winSelect[e.index].title = 'Select Class';
			break;
			case 2:
				winSelect[e.index].select_id = tkt_tid;
				winSelect[e.index].title = 'Select Tech';
			break;
		}
		Titanium.UI.currentWindow.navGroup.open(winSelect[e.index],{animated:true});
		//Titanium.UI.currentTab.open(win,{animated:true});
	}
});
// add table view to the window
win.add(tableview);
var bNavAdd = Titanium.UI.createButton({ title: 'Create' });
bNavAdd.addEventListener('click', function(e)
{
	if (tkt_uid <= 0)
	{
		alert('Please, select user');
		return;
	}
	
	if (tkt_cid <= 0)
	{
		alert('Please, select class');
		return;
	}
	
	if (tkt_tid <= 0)
	{
		alert('Please, select tech');
		return;
	}
	
	if (textSubject.value == '')
	{
		alert('Please, enter ticket subject');
		return;
	}
	
	var requestData = 
	{
		user_id: tkt_uid,
		class_id: tkt_cid,
		tech_id: tkt_tid,
		subject: textSubject.value,
		details: textDetails.value
	};
	
    var jsonRequestData = JSON.stringify(requestData)
    
    Ti.API.info('Before ' + jsonRequestData);
    mbl_dataExchange("POST", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Tickets.svc",
    	function () {
        	Ti.API.info(this.responseText);
        	win.navGroup.close(win);
			win._parent.fireEvent("event_ticket_created", { id : 0 });
    	},
    	function (e) {  },
    	function (e) { alert(e); },
    	jsonRequestData);
});
win.setRightNavButton(bNavAdd);

//win.rightNavButton.enabled = false;

function changeRightNavBtnStatus()
{
	//win.rightNavButton.enabled = true;// 
	//var b = (win.tkt_uid > 0 && win.tkt_cid > 0 && win.tkt_tid > 0 && win.tkt_sbj);
	//alert(b);
}

win.addEventListener('event_select_entity',function(e)
{
	var rowUpdate = null;
	switch (e.select_type)
	{
		case 0:
			rowUpdate = Ti.UI.createTableViewRow({
				title: e.name,
				hasChild:true,
				winurl:'winselect.js',
				header:'User*'
			});
			tkt_uid = e.id;
		break;
		case 1:
			rowUpdate = Ti.UI.createTableViewRow({
				title: e.name,
				hasChild:true,
				winurl:'winselect.js',
				header:'Class*'
			});
			tkt_cid = e.id;
		break;
		case 2:
			rowUpdate = Ti.UI.createTableViewRow({
				title: e.name,
				hasChild:true,
				winurl:'winselect.js',
				header:'Technician*'	
			});
			tkt_tid = e.id;
		break;
	}
	tableview.updateRow(e.select_type,rowUpdate,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
    Titanium.API.info("foo event received = "+JSON.stringify(e));
    changeRightNavBtnStatus();
});

/*textSubject.addEventListener('blur', function(e)
{
	win.tkt_sbj = textSubject.hasText();
	changeRightNavBtnStatus();
});*/