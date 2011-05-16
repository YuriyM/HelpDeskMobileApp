var serviceURL = "https://192.168.0.46/bigWebApps.HelpDesk.WebApi.Server/";

var serviceLogin = "user@example.com";

var servicePassword = "password";

var validateCertificate = false;  

function mbl_dataExchange(requestType, requestURL, onload, ondatastream, onerror) {
	
    var loader = Titanium.Network.createHTTPClient();
    loader.open(requestType, serviceURL + requestURL, true);
    loader.validatesSecureCertificate = validateCertificate;
        
    if (onload != null)
    	loader.onload = onload;
    	
    if (ondatastream != null)
    	loader.ondatastream = ondatastream;
    
    if (onerror != null)
    	loader.onerror = onerror;
    
    loader.setRequestHeader("Content-Type", "application/rss+xml");
    loader.setRequestHeader("Authorization", "Basic " + Titanium.Utils.base64encode(serviceLogin + ":" + servicePassword));
    loader.send();
}