// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });*/

chrome.tabs.query({}, function(tabs) {
    //var found = false;
    for (var i=0; i < tabs.length; i++) {
        if (/https?:\/\/www\.youtube\.com/.test(tabs[i].url)) {
            found = true;
            chrome.tabs.update(tabs[i].id, {url: 'https://www.youtube.com/watch?v=uiUAq4aVTjY', active: true});
            break; // you found it, stop searching and update the tab
        	//console.log(tabs[i].url)
        }
    }

    if (!found) chrome.tabs.create({url: 'https://www.youtube.com/watch?v=uiUAq4aVTjY', active: true});
    // you didn't find it, create a new tab with the new url and select it
});

//chrome.webNavigation.onHistoryStateUpdated({'hostEquals' = "youtube"}, function(webNavigation) {
	//console.log("hi")
//});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if(tabURLs[tab.id] != tab.url) {
    //console.log(changeInfo.title)
	alert(changeInfo.title);
    tabURLs[tab.id] = tab.url;
}

});

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   console.log(changeInfo.url);
}); */

/*var player = document.getElementById('movie_player');
player.addEventListener('onStateChange', function(e) {
  if (e.data === 1) {
    // Video started playing.
    // Should work for when the video changes as well.
    // As long as it's within the same element.
    console.log(player.getVideoUrl());
  }
  // Watch for other events?
});*/

/*chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log(tab.url);
  });
}); */
//document.addEventListener('spfdone', function() {
    
//});
/*document.addEventListener("spfdone", process);

function process() {
    if (location.pathname == "youtube.com") {
        console.log("yo youtube")
    }
};*/