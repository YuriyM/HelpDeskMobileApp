Ti.include('../includes/network_webservice_client.js');
var win = Titanium.UI.currentWindow;

var data = [];

var rowServiceURL = Ti.UI.createTableViewRow({
	height:75,
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});

var lblServiceURL = Titanium.UI.createLabel({
    text:'API End Point',
    height:'auto',
    width:'auto',
    top: 10,
    left: 10,
    font:{fontWeight:'bold'}
});
var savedServiceURL = Ti.App.Properties.getString('mblServiceURL', serviceURL);
Ti.API.info(savedServiceURL);
var textServiceURL = Titanium.UI.createTextField({
	color:'#336699',
	left:10,
	top:30,
	width:270,
	hintText:'Enter actual URL',
	value: savedServiceURL
});
rowServiceURL.add(lblServiceURL);
rowServiceURL.add(textServiceURL);
data[0] = rowServiceURL;

var rowCheckCert = Ti.UI.createTableViewRow({		
	selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});
var lblCert = Titanium.UI.createLabel({
    text:'SSL Certificate Validation',
    left: 10,    
    font:{fontWeight:'bold'}
});
var savedServiceURL = Ti.App.Properties.getBool('mblServiceCertificateCheck', validateCertificate);
Ti.API.info(savedServiceURL);
var switchCheckCert = Titanium.UI.createSwitch({
	value:savedServiceURL,
	right: 10
});
rowCheckCert.add(lblCert);
rowCheckCert.add(switchCheckCert);
data[1] = rowCheckCert;

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
win.add(tableview);

var bNavAdd = Titanium.UI.createButton({ title: 'Save' });
bNavAdd.addEventListener('click', function(e)
{	
	var APIEndPoint = textServiceURL.value;
	if (APIEndPoint == '')
	{
		alert('Please, enter API End Point');
		return;
	}
    Ti.API.info('APIEndPoint= ' + APIEndPoint);
    Ti.App.Properties.setString('mblServiceURL', APIEndPoint);
    Ti.App.Properties.setBool('mblServiceCertificateCheck', switchCheckCert.value);
    win.navGroup.close(win);
});
win.setRightNavButton(bNavAdd);

var navSettings = Ti.UI.createButton({title:'Cancel'});
navSettings.addEventListener('click', function(e)
{
	win.navGroup.close(win);
});
win.leftNavButton = navSettings;