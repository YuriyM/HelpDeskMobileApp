Ti.include('../includes/webserviceclient.js');

var win = Titanium.UI.currentWindow;
var tid = win.tid;

if (Ti.Platform.name == 'android') 
{
	win.backgroundColor = '#4e5c4d';
}
else
{
	//win.backgroundColor = '#aebcad';
}

win.backButtonTitle = 'Back';


var textRespond = Titanium.UI.createTextArea({
	color:'#336699',
	borderRadius: 5,
	borderWidth: 1,
	borderColor:'#bbb',
	height:300,
	top:10,
	width: 295,
	font:{fontSize:20,fontFamily:'Arial', fontWeight:'nornal'},
	suppressReturn:true,
	hintText:'Enter Response to Ticket'
});

var bSend = Titanium.UI.createButton({
	title:'Send Response',
	height:40,
	width: 280,
	top:320,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
	borderRadius:10, 
	//font:{fontSize:16,fontWeight:'bold'},  // add background image
	backgroundGradient:
	{type:'linear', colors:['#8097c8','#3665bf'], startPoint:{x:0,y:0}, endPoint:{x:0,y:40}, backFillStart:false},
	borderWidth:1,
	borderColor:'#666',
	color: '#fff'
});

// create table view event listener
bSend.addEventListener('click', function(e)
{	
	var requestData = {	details: textRespond.value	};
    
    Ti.API.info('Before ' + JSON.stringify(requestData));
    mbl_dataExchange("POST", "4BFEF6D5-D4C6-446F-AAD4-407BFDE6614F/43BAA28E-177C-4BA7-84A0-6C1CFD521DEF/Tickets.svc/" + tid +"/comments/",
    	function () {
        	Ti.API.info(this.responseText);
        	win.navGroup.close(win);
			win._parent.fireEvent("event_ticket_respond", { id : tid });
    	},
    	function (e) {  },
    	function (e) { alert(e); },
    	JSON.stringify(requestData));
});

win.add(textRespond);
win.add(bSend);
