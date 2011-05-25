// web_views - html script - fire events for show/hode custom indicator
/*Ti.App.addEventListener('show_global_indicator',function(e)
{
	Ti.API.info("removeEventListener: a="+e.a);
	Ti.App.removeEventListener('show_indicator',this);
	setTimeout(function()
	{
		Ti.App.fireEvent('hide_global_indicator');
	},1000);
});
Ti.App.fireEvent('show_global_indicator',{'a':1});*/


// APP.js PAUSE/RESUME/ FOCUSED Events
/*Ti.App.addEventListener( 'resume', function(e) {
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

Titanium.addEventListener(Titanium.FOCUSED, function(event) { 
      Titanium.currentlyFocusedWindow = event.target; /// from an old post
});*/


// JS technique
/*// local scope
var myApp = {
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