/*
 *	Custom Global Load Indicator 
 * 	How-To:
 * 		Show
 *		Ti.App.fireEvent('show_global_indicator',{message: 'what load'});
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
	
	var message = null;
	if (Ti.Platform.osname !== 'android')
	{
		indWin.add(actInd);

		// message
		message = Titanium.UI.createLabel({
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
	
	function showIndicator(messageText)
	{
		if (Ti.Platform.osname !== 'android')
		{
			message.text = messageText;
			indWin.open();
		}
		else
			actInd.message = messageText;
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
		showIndicator(e.message);
	});
	Titanium.App.addEventListener('hide_global_indicator', function(e)
	{
		hideIndicator();
	});

})();