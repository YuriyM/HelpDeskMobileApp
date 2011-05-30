Ti.include('../includes/network_webservice_client.js');
var win = Titanium.UI.currentWindow;

//
// TICKET WINDOW GLOBAL VARIABLES SECTION
//
var tkt_uid = 0, tkt_cid = 0, tkt_tid = 0, tkt_sbj = false;

//
// CREATE TICKET MAIN WINDOW INITIALIZATION
//
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
	header:'Subject*',
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});

var textSubject = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:10,
	left:10,
	width:250,
	hintText:'Enter Ticket Subject'
});
rowSubject.add(textSubject);
data[3] = rowSubject;

var rowDetails = Ti.UI.createTableViewRow({		
	entityId: 0,	
	height:200,
	header:'Details',
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});

var textDetails = Titanium.UI.createTextArea({
	color:'#336699',
	height:150,
	top:10,
	left:10,
	hintText:'Enter Ticket Details'
});
rowDetails.add(textDetails);
data[4] = rowDetails;

var tableViewOptions = {
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'transparent',
	rowBackgroundColor:'white'
};
var tvCreateTicket = Titanium.UI.createTableView(tableViewOptions);

var winSelect = [null, null, null];

// controls click handler
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

tvCreateTicket.addEventListener('click', function(e)
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
	}
});

win.add(tvCreateTicket);

//
// NAVBAR INITIALIZATION
//
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
	
	var subjectText = textSubject.value;
	if (subjectText.length === 0)
	{
		alert('Please, enter ticket subject');
		return;
	}
	
	var requestData = 
	{
		user_userid: tkt_uid,
		class_id: tkt_cid,
		tech_userid: tkt_tid,
		subject: subjectText,
		note: textDetails.value
	};
	
	var jsonRequestData = JSON.stringify(requestData);
	Ti.API.info('Create jsonRequestData = ' + jsonRequestData);
    
    Ti.App.fireEvent('show_global_indicator',{message: 'Create Ticket'});
    mbl_dataExchange("POST", "Tickets.svc",
    	function () {
    		var responseStatus = this.status;
    		var rawResponse = this.responseText;
    		var responseValue = rawResponse.substring(1, rawResponse.length - 1);
    		Ti.App.fireEvent('hide_global_indicator');
    		Ti.API.info('Create HTTP Status = ' + responseStatus);
    		Ti.API.info('Create HTTP Raw Response = ' + rawResponse);
    		Ti.API.info('Create HTTP Trim Response = ' + responseValue);
    		var intCreatedId = parseInt(responseValue);
    		var isIdValid = false;
    		if (!isNaN(intCreatedId)) 
    			if (intCreatedId.toString() === responseValue)
    				if (intCreatedId > 0)
    					isIdValid = true;
    		Ti.API.info('intCreatedId = ' + intCreatedId);
    		if (responseStatus === 200 && isIdValid)
    		{
        		win.navGroup.close(win);
        		setTimeout( function (){ win._parent.fireEvent("event_ticket_created", { createdId : intCreatedId }); }, 800 );
			}
			else
				alert('Create failed. Error code: ' + responseStatus);
    	},
    	function (e) {  },
    	function (e) { Ti.App.fireEvent('hide_global_indicator'); alert('Create Ticket Connect Error. Details: ' + JSON.stringify(e)); },
    	jsonRequestData);
});
win.setRightNavButton(bNavAdd);

//
// SELECT SOME ENTITY HANDLER
//
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
	tvCreateTicket.updateRow(e.select_type,rowUpdate,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
});