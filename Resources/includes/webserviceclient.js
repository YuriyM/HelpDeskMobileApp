Ti.include('../includes/include.js');

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror) {
	mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, null, null, null);
}

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, requestContent, email, pwd) {
	var loader = Titanium.Network.createHTTPClient();
	
	var APIEndPoint = Ti.App.Properties.getString('mblServiceURL', serviceURL);
	var APICertCheck = Ti.App.Properties.getBool('mblServiceCertificateCheck', validateCertificate);
	var APIOrgInstanceURL = APIEndPoint + serviceOrganization + "/" + serviceInstance + "/";
    loader.open(requestType, APIOrgInstanceURL + requestURL, true);
    loader.validatesSecureCertificate = APICertCheck;
        
    if (onload != null)
    	loader.onload = onload;
    	
    if (ondatastream != null)
    	loader.ondatastream = ondatastream;
    
    if (onerror != null)
    	loader.onerror = onerror;
    Ti.API.info('requestContent=' + requestContent);
    loader.setRequestHeader("Content-Type", "application/rss+xml");
    
    Ti.API.info('Web1 email= ' + email + '   pwd=' + pwd);
    if (email == null)
   	{
    	email = Ti.App.Properties.getString('mblUserEmail', serviceLogin);
    }
    if (pwd == null)
	{	
		pwd = Ti.App.Properties.getString('mblUserPwd', servicePassword);
	}
	Ti.API.info('Web2 email= ' + email + '   pwd=' + pwd);
    loader.setRequestHeader("Authorization", createAuthHeader(email, pwd));
    if (requestContent == null)
    	loader.send();
    else
    	loader.send(requestContent);
}