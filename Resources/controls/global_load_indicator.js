/*
 *	Custom Global Load Indicator 
 * 	How-To:
 * 		Show
 *		Ti.App.fireEvent('show_global_indicator',{'caution': 'what load'});
 * 
 * 		Hide
 * 		Ti.App.fireEvent('hide_global_indicator');
 */

(function()
{
	var indWin = null;
	var actInd = null;

	if (Ti.Platform.osname !== 'android')
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
	
	if (Ti.Platform.osname !== 'android')
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
		if (Ti.Platform.osname !== 'android')
			indWin.open();
		actInd.show();
	}

	function hideIndicator()
	{
		actInd.hide();
		if (Ti.Platform.osname !== 'android')
			indWin.close({opacity:0,duration:500});
	};
	
	Titanium.App.addEventListener('show_global_indicator', function(e)
	{
		showIndicator();
	});
	Titanium.App.addEventListener('hide_global_indicator', function(e)
	{
		hideIndicator();
	});

})();