
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
	// window container
	var modalWindow = Titanium.UI.createWindow({
		height:80,
		width:200,
		//modal: true,
		touchEnabled:false,
		
		orientationModes : [
			Titanium.UI.PORTRAIT,
			Titanium.UI.UPSIDE_PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT,
			]
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
		color:'#fff',
		textAlign:'center',
		font:{fontSize:18,fontWeight:'bold'},
		height:'auto',
		width:'auto'
	});
	modalWindow.add(modalMessage);
	
	Ti.App.addEventListener("show_complete_message", function(e)
	{
		modalMessage.text = e.labelText;
		modalWindow.open();

		var animationProperties = {delay: 1500, duration: 3500, opacity: 0.1};
		if (Ti.Platform.osname == "iPhone OS") {
			animationProperties.transform =
				Ti.UI.create2DMatrix().translate(-200,200).scale(0);
		}
		modalWindow.animate(animationProperties, function()
		{
			modalWindow.close();
		});
	});


	//
	//  CUSTOM INDICATOR SECTION
	//
	var indWin = null;
	var actInd = null;

	if (Ti.Platform.osname != 'android')
	{
		// window container
		indWin = Titanium.UI.createWindow({
			height:150,
			width:150,
			touchEnabled:false
		});

		// black view
		var indView = Titanium.UI.createView({
			height:150,
			width:150,
			backgroundColor:'#000',
			borderRadius:10,
			opacity:0.8,
			touchEnabled:false
		});
		indWin.add(indView);
	}

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30,
	});
	
	if (Ti.Platform.osname != 'android')
	{
		indWin.add(actInd);

		// message
		var message = Titanium.UI.createLabel({
			text:'Loading',
			color:'#fff',
			width:'auto',
			height:'auto',
			font:{fontSize:20,fontWeight:'bold'},
			bottom:20
		});
		indWin.add(message);
	}
	else
		actInd.message = "Loading";
	
	function showIndicator()
	{
		if (Ti.Platform.osname != 'android')
			indWin.open();
		actInd.show();
	}

	function hideIndicator()
	{
		actInd.hide();
		if (Ti.Platform.osname != 'android') {
			indWin.close({opacity:0,duration:500});
		}
	};
	
	Titanium.App.addEventListener('show_global_indicator', function(e)
	{
		Ti.API.info("SHOW GLOBAL INDICATOR");
		showIndicator();
	});
	Titanium.App.addEventListener('hide_global_indicator', function(e)
	{
		Ti.API.info("HIDE GLOBAL INDICATOR");
		hideIndicator();
	});

})();