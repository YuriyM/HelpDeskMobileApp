/*
 *	Custom Global Custom Message
 * 	How-To:
 * 		Show
 *		Ti.App.fireEvent('show_complete_message', { labelText: 'Ticket created. Id=' + e.id });
 */
(function()
{
	// window container
	var modalWindow = Titanium.UI.createWindow({
		height:80,
		width:200,
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
})();