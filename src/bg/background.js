var enabled = false;
chrome.browserAction.setBadgeText({text:"X"});

var matchesBlacklist = function(url){
	if(localStorage.getItem("store.settings.url")){
		var urlList = localStorage.getItem("store.settings.url").replace(/"/g,'');
		if(urlList){
			var urls = urlList.split(";");
			for(var i in urls){
				var keyword = urls[i].trim();
				if(url.indexOf(keyword)>-1){
					return true;
				}
			}
		}
	}
	return false;
};

var requestHandler = function(data){
	if(typeof data){
		console.log(chrome.i18n.getMessage('inHandler'), "onBeforeRequest", data);
		if(!matchesBlacklist(data.url)){
			if(data.url.indexOf("cachebusterTimestamp")==-1){
				var url=""
				if(data.url.indexOf('?')>-1){
					url = data.url.substring(0,data.url.indexOf("?")+1)+"cachebusterTimestamp="+(+ new Date())+"&"+data.url.substring(data.url.indexOf("?")+1,data.url.length);
				}else{
					url = data.url+"?cachebusterTimestamp="+(+ new Date());
				}
				return {"redirectUrl": url};
			}else{
				url = data.url.substring(0,data.url.indexOf("cachebusterTimestamp")+21)+(+ new Date())+data.url.substring(data.url.indexOf("cachebusterTimestamp")+34,data.url.length);
				return {"redirectUrl": url};
			}
		}
	}else
	{
		console.error(chrome.i18n.getMessage('inHandlerError'), e);
	}
};

var enable = function(){
	if(!chrome.webRequest.onBeforeRequest.hasListener(requestHandler)){
	    		console.log('enabling');
				chrome.webRequest.onBeforeRequest.addListener(requestHandler, {"urls":["http://*/*"]}, ["blocking"]);
				enabled = true;
				chrome.browserAction.setBadgeText({text:"OK"});
	    	}
};

var disable = function(){
	if(chrome.webRequest.onBeforeRequest.hasListener(requestHandler)){
		console.log('disabling');
		chrome.webRequest.onBeforeRequest.removeListener(requestHandler);
		enabled = false;
		chrome.browserAction.setBadgeText({text:"X"});
	}
};

chrome.browserAction.onClicked.addListener(function(){
	if(enabled){
		disable();
	}else{
		enable();
	}
});