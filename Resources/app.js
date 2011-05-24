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
    url: 'home/signin.js',
    title: 'HelpDesk',
    _parent: appBase,
    navGroup : navGroup,
    rootWindow : appBase
});
navGroup.window = winHome;
appBase.add(navGroup);
appBase.open(); 

(function()
{ 
	Ti.App.addEventListener("show_complete_message", function(e) {
		// window container
		var modalWindow = Titanium.UI.createWindow({
			height:80,
			width:200,
			touchEnabled:false
		});

		// black view
		var modalView = Titanium.UI.createView({
			height:80,
			width:200,
			backgroundColor:'#000',
			borderRadius:10,
			opacity:0.8,
			touchEnabled:false
		});
		modalWindow.add(modalView);

		// message
		var modalMessage = Titanium.UI.createLabel({
			text: e.labelText,
			color:'#fff',
			textAlign:'center',
			font:{fontSize:18,fontWeight:'bold'},
			height:'auto',
			width:'auto'
		});
		modalWindow.add(modalMessage);
		

		modalWindow.open();

		var animationProperties = {delay: 1500, duration: 5000, opacity: 0.1};
		if (Ti.Platform.osname == "iPhone OS") {
			animationProperties.transform =
				Ti.UI.create2DMatrix().translate(-200,200).scale(0);
		}
		modalWindow.animate(animationProperties, function()
		{
			modalWindow.close();
		});
	});
})();

/*// Global Event Indicator
var messageWin = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:70,
	borderRadius:10,
	touchEnabled:false,

	orientationModes : [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
	]
});
var messageView = Titanium.UI.createView({
	id:'messageview',
	height:30,
	width:250,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});

var messageLabel = Titanium.UI.createLabel({
	id:'messagelabel',
	text:'',
	color:'#fff',
	width:250,
	height:'auto',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:13
	},
	textAlign:'center'
});
messageWin.add(messageView);
messageWin.add(messageLabel);*/