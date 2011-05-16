var appBase = Ti.UI.createWindow({ backgroundColor:'#ffffff', });
var navGroup = Ti.UI.iPhone.createNavigationGroup({	 });	
var winHome = Ti.UI.createWindow({
	backgroundColor:'#ffffff',
    id: 'winHome',
    url: 'home/home.js',
    _parent: appBase,
    navGroup : navGroup,
    rootWindow : appBase
});
navGroup.window = winHome;
appBase.add(navGroup);
appBase.open(); 