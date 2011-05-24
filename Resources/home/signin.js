Ti.include('../includes/webserviceclient.js');
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
var savedEmail = Ti.App.Properties.getString('mblUserEmail', '');
Ti.API.info(savedEmail);
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

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
win.add(tableview);

var bNavAdd = Titanium.UI.createButton({ title: 'Sign In' });
bNavAdd.addEventListener('click', function(e)
{
	var email = textLogin.value;
	if (email == '')
	{
		alert('Please, enter login');
		return;
	}
	
	var pwd = textPassword.value;
	if (pwd == '')
	{
		alert('Please, enter password');
		return;
	}	
	
    Ti.API.info('email= ' + email + '   pwd=' + pwd);
    mbl_dataExchange("GET", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Tickets.svc?pg=1&ps=2",
    	function () {
    		Ti.API.info(this.status);
        	//Ti.API.info(this.responseText);
        	Ti.App.Properties.setString('mblUserEmail', email);
        	Ti.App.Properties.setString('mblUserPwd', pwd);
        	textPassword.value = '';
        	
        	var win = Ti.UI.createWindow( {
	       		title : 'HelpDesk',				
		        url: 'home.js',	
		        //backButtonTitle: 'Sign Out',
		        _parent: Titanium.UI.currentWindow,
		        navGroup : Titanium.UI.currentWindow.navGroup,
		        rootWindow : Titanium.UI.currentWindow.rootWindow
		    });		     
		 	Titanium.UI.currentWindow.navGroup.open(win, {animated:true});
    	},
    	function (e) {  },
    	function (e) { alert('Credentials are invalid. Edit and try again.'); },
    	null,
    	email,
    	pwd
    	);
});
win.setRightNavButton(bNavAdd);

var navSettings = Ti.UI.createButton({title:'Settings'});
navSettings.addEventListener('click', function(e)
{
	var win = Ti.UI.createWindow( {
	       		title : 'Settings',				
		        url: 'settings.js',	
		        backButtonTitle: 'Back',
		        _parent: Titanium.UI.currentWindow,
		        navGroup : Titanium.UI.currentWindow.navGroup,
		        rootWindow : Titanium.UI.currentWindow.rootWindow
		    });		     
		 	Titanium.UI.currentWindow.navGroup.open(win, {animated:true});
});
win.leftNavButton = navSettings;