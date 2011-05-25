/*
 * 'mblServiceURL' - Ti.App.Properties string name for actual API End Point
 * 'mblServiceCertificateCheck' - Ti.App.Properties bool indicator for checking ssl certificates
 */
Ti.include('../includes/network_webservice_client.js');
var win = Titanium.UI.currentWindow;

//
// Window controls initialization
//
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
var switchCheckCert = Titanium.UI.createSwitch({
	value:savedServiceURL,
	right: 10
});
rowCheckCert.add(lblCert);
rowCheckCert.add(switchCheckCert);
data[1] = rowCheckCert;

// add created table view to window
win.add(
	Titanium.UI.createTableView({
		data:data,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	})
);
// === complete controls initialization ===

//
// Nav bar controls initialization
//
var bNavSave = Titanium.UI.createButton({ title: 'Save' });
bNavSave.addEventListener('click', function(e)
{	
	var APIEndPoint = textServiceURL.value;
	if (APIEndPoint.length === 0)
	{
		alert('Please, enter API End Point');
		return;
	}
    Ti.App.Properties.setString('mblServiceURL', APIEndPoint);
    Ti.App.Properties.setBool('mblServiceCertificateCheck', switchCheckCert.value);
    win.navGroup.close(win);
});
win.setRightNavButton(bNavSave);

var bNavCancel = Ti.UI.createButton({title:'Cancel'});
bNavCancel.addEventListener('click', function(e)
{
	win.navGroup.close(win);
});
win.leftNavButton = bNavCancel;
// === complete Nav bar controls initialization ===