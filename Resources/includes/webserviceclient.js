//var serviceURL = "https://betaapi.helpdesk.bigwebapps.com/";

var serviceURL = "https://192.168.0.46/bigWebApps.HelpDesk.WebApi.Server/";

var serviceLogin = "use@example.com";

var servicePassword = "password";

var validateCertificate = false;

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror) {
	mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, null);
}

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror, requestContent) {
	var loader = Titanium.Network.createHTTPClient();
    loader.open(requestType, serviceURL + requestURL, true);
    loader.validatesSecureCertificate = validateCertificate;
        
    if (onload != null)
    	loader.onload = onload;
    	
    if (ondatastream != null)
    	loader.ondatastream = ondatastream;
    
    if (onerror != null)
    	loader.onerror = onerror;
    Ti.API.info('requestContent=' + requestContent);
    loader.setRequestHeader("Content-Type", "application/rss+xml");
    loader.setRequestHeader("Authorization", "Basic " + Titanium.Utils.base64encode(serviceLogin + ":" + servicePassword));
    if (requestContent == null)
    	loader.send();
    else
    	loader.send(requestContent);
}