var loadIndicator = Titanium.UI.createActivityIndicator({
        //location: Titanium.UI.ActivityIndicator.DIALOG,
        //type: Titanium.UI.ActivityIndicator.DETERMINANT,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
        message: 'Downloading...',
        min: 0,
        max: 10,
        value: 0,
        top:150, 
		height:50,
		width:10,
		zIndex: 150,
		loadingdatastrem: function (e)
		{this.setValue(e*10);}    	
});
    