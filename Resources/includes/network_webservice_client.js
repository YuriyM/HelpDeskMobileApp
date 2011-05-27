Ti.include('../includes/include.js');

function createAuthHeader(serviceLogin, servicePassword)
{
	return "Basic " + Titanium.Utils.base64encode(serviceLogin + ":" + servicePassword);
}

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror) {
	mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, null, null, null);
}

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, requestContent, email, pwd) {
	var loader = Titanium.Network.createHTTPClient();
	
	var APIEndPoint = Ti.App.Properties.getString('mblServiceURL', serviceURL);
	var APICertCheck = Ti.App.Properties.getBool('mblServiceCertificateCheck', validateCertificate);
	var APIOrgInstanceURL = APIEndPoint + serviceOrganization + "/" + serviceInstance + "/";
	
	loader.setTimeout(30000);
	
	if (ondatastream != null)
    	loader.ondatastream = ondatastream;
    	
    if (onload != null)
    	loader.onload = onload;
    
    if (onerror != null)
    	loader.onerror = onerror;
    
    loader.validatesSecureCertificate = APICertCheck;
    loader.open(requestType, APIOrgInstanceURL + requestURL, true);    
    
    if (email == null)
    	email = Ti.App.Properties.getString('mblUserEmail', serviceLogin);
    if (pwd == null)
		pwd = Ti.App.Properties.getString('mblUserPwd', servicePassword);
		
    loader.setRequestHeader("Authorization", createAuthHeader(email, pwd));
    loader.setRequestHeader("Content-Type", "application/rss+xml");
    
    if (requestContent == null)
    	loader.send();
    else
    	loader.send(requestContent);
}