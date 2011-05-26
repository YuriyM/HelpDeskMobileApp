Ti.include('../includes/network_webservice_client.js');
var win = Titanium.UI.currentWindow;

//
// RESPOND WINDOW GLOBAL VARIABLES SECTION
//
var tid = win.tid;

//
// RESPOND MAIN WINDOW INITIALIZATION
//
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
	backgroundGradient:
	{type:'linear', colors:['#8097c8','#3665bf'], startPoint:{x:0,y:0}, endPoint:{x:0,y:40}, backFillStart:false},
	borderWidth:1,
	borderColor:'#666',
	color: '#fff'
});

bSend.addEventListener('click', function(e)
{	
	var requestData = {	details: textRespond.value	};
    Ti.App.fireEvent('show_global_indicator',{message: 'Send Response'});
    mbl_dataExchange("POST", "Tickets.svc/" + tid +"/comments/",
    	function () {
    		Ti.App.fireEvent('hide_global_indicator');
        	win.navGroup.close(win);
			win._parent.fireEvent("event_ticket_respond", { id : tid });
    	},
    	function (e) {  },
    	function (e) { Ti.App.fireEvent('hide_global_indicator'); alert(e); },
    	JSON.stringify(requestData));
});

win.add(textRespond);
win.add(bSend);