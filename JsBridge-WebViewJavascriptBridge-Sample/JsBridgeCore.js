function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge(function(bridge) {
    window.MyBridge = {
        native : {
            setMenu:function (button, clickEvent) {
                bridge.callHandler("MyBridge.native.setMenu", button, function (responseData) {
                    console.log("receiver => " + responseData);
                });
            }
        }
    };
    if (onMyBridgeReady) {
        onMyBridgeReady();
    }
});