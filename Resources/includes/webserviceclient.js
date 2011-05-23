Ti.include('../includes/include.js');

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
    loader.setRequestHeader("Authorization", authorizationData);
    if (requestContent == null)
    	loader.send();
    else
    	loader.send(requestContent);
}