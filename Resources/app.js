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
// local scope
/*var myApp = {
    someFunction: function() {
        //do stuff
    },
    someVariable: true
};

myApp.ui = {}; //create a UI namespace within your app
 
myApp.ui.createHeaderView = function(_args) {
    var v = Ti.UI.createView({
        backgroundColor:_args.bgColor||'red',
        height:80
    });
    v.add(Ti.UI.createLabel({
        text:_args.title||'My Cool App'
    }));
    //external API function
    v.blink = function() {
    	v.animate({opacity:0,duration:1000},    		
    		function() {
		        v.animate({opacity:1,duration:1000});
		        //now, fire an event on yourself to let any
		        //interested parties know this animation is complete
		        v.fireEvent('blinkComplete');
	    	});
	};
    
    return v;
};

var h = myApp.ui.createHeaderView();
h.addEventListener('blinkComplete', function() {
    Ti.API.info('blink complete');
});
h.blink(); // will cause the view to fade out, then in*/
//------------



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