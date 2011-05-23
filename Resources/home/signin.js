Ti.include('../controls/table_pulldown_iphone.js');
var win = Titanium.UI.currentWindow;

var data = [];

var rowLogin = Ti.UI.createTableViewRow({
	height:55,
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});

var lblLogin = Titanium.UI.createLabel({
    text:'Email',
    height:'auto',
    width:70,
    left: 10,    
    font:{fontWeight:'bold'}
});
var textLogin = Titanium.UI.createTextField({
	color:'#336699',
	//height:35,
	//top:10,
	left:85,
	width:200,
	hintText:'Required'
});
rowLogin.add(lblLogin);
rowLogin.add(textLogin);
data[0] = rowLogin;

var rowPassword = Ti.UI.createTableViewRow({
	height:55,
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});
var lblPassword = Titanium.UI.createLabel({
    text:'Password',
    height:'auto',
    width:70,
    left: 10,    
    font:{fontWeight:'bold'}
});
var textPassword = Titanium.UI.createTextField({
	color:'#336699',
	left:85,
	width:200,
	hintText:'Required',
	passwordMask:true
});
rowPassword.add(lblPassword);
rowPassword.add(textPassword);
data[1] = rowPassword;

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
win.add(tableview);

var bNavAdd = Titanium.UI.createButton({ title: 'Sign In' });
bNavAdd.addEventListener('click', function(e)
{	
	if (textLogin.value == '')
	{
		alert('Please, enter login');
		return;
	}
	
	var requestData = 
	{
		login: textLogin.value,
		password: textPassword.value
	};
	
    var jsonRequestData = JSON.stringify(requestData)
    
    Ti.API.info('Before ' + jsonRequestData);
    /*mbl_dataExchange("POST", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Tickets.svc",
    	function () {
        	Ti.API.info(this.responseText);
        	win.navGroup.close(win);
			win._parent.fireEvent("event_ticket_created", { id : 0 });
    	},
    	function (e) {  },
    	function (e) { alert(e); },
    	jsonRequestData);*/
});
win.setRightNavButton(bNavAdd);