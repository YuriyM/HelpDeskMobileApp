/*
 * 'mblUserEmail' - Ti.App.Properties string name for user email
 * 'mblUserPwd' - Ti.App.Properties string name for user password
 */
Ti.include('../includes/network_webservice_client.js');
var win = Titanium.UI.currentWindow;

//
// Window controls initialization
//
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

var savedEmail = Ti.App.Properties.getString('mblUserEmail', '');
var textLogin = Titanium.UI.createTextField({
	color:'#336699',
	left:85,
	width:200,
	hintText:'Required',
	value: savedEmail
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

// add created table view to window
win.add(
	Titanium.UI.createTableView({
		data:data,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	})
);
// === complete controls initialization ===

//
// Nav bar controls initialization
//
var bNavAdd = Titanium.UI.createButton({ title: 'Sign In' });
bNavAdd.addEventListener('click', function(e)
{
	var email = textLogin.value;
	if (email.length === 0)
	{
		alert('Please, enter login');
		return;
	}
	
	var pwd = textPassword.value;
	if (pwd.length === 0)
	{
		alert('Please, enter password');
		return;
	}
	
	Ti.App.fireEvent('show_global_indicator',{message: 'Signing In'});
    mbl_dataExchange("GET", "Tickets.svc?pg=1&ps=2",
    	function () {
    		Ti.App.fireEvent('hide_global_indicator');
        	Ti.App.Properties.setString('mblUserEmail', email);
        	Ti.App.Properties.setString('mblUserPwd', pwd);
        	textPassword.value = '';
        	Ti.API.info('Login HTTP Status = ' + this.status);
    		Ti.API.info('Login HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
        		var win = Ti.UI.createWindow( {
		       		title : 'Dashboard',				
			        url: 'home.js',
			        _parent: Titanium.UI.currentWindow,
			        navGroup : Titanium.UI.currentWindow.navGroup,
			        rootWindow : Titanium.UI.currentWindow.rootWindow
			    });		     
			 	Titanium.UI.currentWindow.navGroup.open(win, {animated:true});
			}
			else
				alert('Login failed. Error code: ' + this.status);
    	},
    	function (e) {  },
    	function (e) { Ti.App.fireEvent('hide_global_indicator'); alert('Login Connect Error. Details: ' + JSON.stringify(e)); },
    	null,
    	email,
    	pwd
    	);
});
win.setRightNavButton(bNavAdd);//connected

var navSettings = Ti.UI.createButton({title:'Settings'});
navSettings.addEventListener('click', function(e)
{
	var win = Ti.UI.createWindow( {
	       		title : 'Settings',				
		        url: 'settings.js',
		        _parent: Titanium.UI.currentWindow,
		        navGroup : Titanium.UI.currentWindow.navGroup,
		        rootWindow : Titanium.UI.currentWindow.rootWindow
		    });		     
		 	Titanium.UI.currentWindow.navGroup.open(win, {animated:true});
});
win.leftNavButton = navSettings;
// === complete Nav bar controls initialization ===