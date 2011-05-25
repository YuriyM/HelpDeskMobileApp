Ti.include('controls/global_custom_message.js');
Ti.include('controls/global_load_indicator.js');

var appBase = Ti.UI.createWindow({ backgroundColor:'#ffffff', });
var navGroup = Ti.UI.iPhone.createNavigationGroup({	 });	
var winHome = Ti.UI.createWindow({
	backgroundColor:'#ffffff',
    id: 'winHome',
    url: 'home/signin.js',
    title: 'HelpDesk',
    _parent: appBase,
    navGroup : navGroup,
    rootWindow : appBase
});
navGroup.window = winHome;
appBase.add(navGroup);
appBase.open();