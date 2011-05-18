Ti.App.addEventListener( 'resume', function(e) {
    Ti.API.info('Resume: ' + Ti.App.getArguments());
    Ti.API.info(JSON.stringify(Ti.App.getArguments()));

});

Ti.App.addEventListener('resumed',function() {
    Ti.API.info('Resumed: ' + Ti.App.getArguments());
    Ti.API.info(JSON.stringify(Ti.App.getArguments()));
});

Titanium.App.addEventListener('pause',function(e){
	Ti.API.info('Pause');
});
/*Titanium.App.addEventListener('resume', function(e)
    {
     // do something
    });
Titanium.addEventListener(Titanium.FOCUSED, function(event) { 
      Titanium.currentlyFocusedWindow = event.target; /// from an old post
 
  });
*/
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