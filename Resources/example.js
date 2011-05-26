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

//----------------------
// OLD APP.JS - TABGROUP IMPLEMENTATION + JSS FILE
//----------------------
/*// set bg color of master view
Titanium.UI.setBackgroundColor('#000');

// Create general tabgroup

var tabGroupHome = Titanium.UI.createTabGroup({ id: 'tgHome' });

// Create window for Home tab
var winHome = Titanium.UI.createWindow({ id: 'winHome',  url: 'home/home.js' });

var tabHome = Titanium.UI.createTab({    
    id: 'tabHome',
	window: winHome   
});

// Window for Tickets
var winTickets = Titanium.UI.createWindow({ id: 'winTickets',  url: 'tickets/ticket_list.js'});

var tabTickets = Titanium.UI.createTab({
	id: 'tabTickets',
    window: winTickets
});

// Window for Assets 
var winAssets = Titanium.UI.createWindow({ id: 'winAssets', url: 'assets/tweets.js' });

var tabAssets = Titanium.UI.createTab({
    id: 'tabAssets',
    window: winAssets
});


// add tabs
tabGroupHome.addTab(tabHome);
tabGroupHome.addTab(tabTickets);
tabGroupHome.addTab(tabAssets);

tabGroupHome.addEventListener('open', function () {// set background color back to white after tab group transition
    Titanium.UI.setBackgroundColor('#fff');
});


tabGroupHome.setActiveTab(0);

tabGroupHome.open();*/
/*
#tabHome {
    icon: 'images/KS_nav_ui.png';
    title: "Home";    
}

#winHome {    
    title: "bigWebApps HelpDesk";    
}

#winTickets {    
    title: 'Tickets';
}

#tabTickets {
    icon: 'images/KS_nav_views.png';    
    title: "Tickets";
    height: 16;    
}

#winAssets {    
    title: 'Assets';
}

#tabAssets {
    icon: 'images/KS_nav_ui.png';   
    title: "Assets";    
}*/


//----------------------
// CODE FIND SYSTEM BUTTONS NUMBER CODES
//----------------------
/*var kk = 100;
setInterval(function () { 
	kk++; 
	var next1= Titanium.UI.createButton({systemButton:kk});
	win.toolbar = [flexSpace, next1,flexSpace];
	win.title = kk;
}, 1000);*/

//----------------------
// FIXED SPACE FOR WINDOW TOOLBAR
//----------------------
/*// used to create a fixed amount of space between two items on the toolbar
var fixedSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FIXED_SPACE,
	width:50
});*/
