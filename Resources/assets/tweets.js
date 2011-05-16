// Create variable "win" to refer to current window
var win = Titanium.UI.currentWindow;

var bReload = Titanium.UI.createButton({
    title: 'Load assets'
});

bReload.addEventListener('click', function () {
    loadTickets();
});

function loadTickets()
{    
	var rowData = [];
	var loader = Titanium.Network.createHTTPClient();
	//loader.open("GET", "https://192.168.0.46/bigWebApps.HelpDesk.WebApi.Server/Rest/v1/Assets.svc/GET", true);
	loader.open("PUT", "https://192.168.0.46/bigWebApps.HelpDesk.WebApi.Server/Rest/v1/Assets.svc/PUT", true);
	loader.validatesSecureCertificate = false;	
	loader.onload = function () {
	    /*var tweets = eval('('+this.responseText+')');
	    for (var i = 0; i < tweets.length; i++)
	    {
	        var tweet = tweets[i].text; // The tweet message
	        var user = tweets[i].user.screen_name; // The screen name of the user
	        var avatar = tweets[i].user.profile_image_url; // The profile image
	        // Create a row and set its height to auto
	        var row = Titanium.UI.createTableViewRow({height:'auto'});

	        // Create the view that will contain the text and avatar
	        var post_view = Titanium.UI.createView({
	        height:'auto', 
	        layout:'vertical',
	        top:5,
	        right:5,
	        bottom:5,
	        left:5
	        });
	        // Create image view to hold profile pic
	        var av_image = Titanium.UI.createImageView({
	        url:avatar, // the image for the image view
	        top:0,
	        left:0,
	        height:48,
	        width:48
	        });
	        post_view.add(av_image);
	        // Create the label to hold the screen name
	        var user_lbl = Titanium.UI.createLabel({
	        text:user,
	        left:54,
	        width:120,
	        top:-48,
	        bottom:2,
	        height:16,
	        textAlign:'left',
	        color:'#444444',
	        font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
	        });
	        post_view.add(user_lbl);
	        // Create the label to hold the tweet message
	        var tweet_lbl = Titanium.UI.createLabel({
	        text:tweet,
	        left:54,
	        top:0,
	        bottom:2,
	        height:'auto',
	        width:236,
	        textAlign:'left',
	        font:{fontSize:14}
	        });
	        post_view.add(tweet_lbl);
	        // Add the post view to the row
	        row.add(post_view);
	        // Give each row a class name
	        row.className = "item"+i;
	        // Add row to the rowData array
	        rowData[i] = row;
	    }
	    // Create the table view and set its data source to "rowData" array
	    var tableView = Titanium.UI.createTableView({data:rowData});
	    //Add the table view to the window
	    win.add(View);*/
	    alert(this.responseText);
	};

	loader.onerror = function (e) {	    
	    alert(e);
	};
	
	loader.setRequestHeader("Content-Type", "application/rss+xml");
	loader.setRequestHeader("Authorization", "Basic " + Titanium.Utils.base64encode("department:c18023a0-9b1e-4007-8ce1-7578a925164f"));
	//loader.send();
	loader.send({ title: 'Test PUT' });    
}

//loadTickets();

win.add(bReload);