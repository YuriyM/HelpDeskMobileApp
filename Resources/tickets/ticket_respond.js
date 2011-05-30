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
	var requestData = {	type: "Message", message: textRespond.value	};
    Ti.App.fireEvent('show_global_indicator',{message: 'Sending...'});
    mbl_dataExchange("POST", "Tickets.svc/" + tid +"/COMMENTS/",
    	function () {
    		Ti.App.fireEvent('hide_global_indicator');
    		Ti.API.info('Respond HTTP Status = ' + this.status);
    		Ti.API.info('Respond HTTP Response = ' + this.responseText);
    		if (this.status === 200)
    		{
        		win.navGroup.close(win);
        		setTimeout( function (){ win._parent.fireEvent("event_ticket_respond", { id : tid }); }, 800 );
			}
			else
				alert('Respond failed. Error code: ' + this.status);
    	},
    	function (e) {  },
    	function (e) { Ti.App.fireEvent('hide_global_indicator'); alert('Respond Connect Error. Details: ' + JSON.stringify(e)); },
    	JSON.stringify(requestData));
});

win.add(textRespond);
win.add(bSend);