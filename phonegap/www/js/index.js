var app = {
    self: this,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this._base = 'http://mustb-amirbrb.c9users.io/';
        if (cordova)
            window.open = cordova.InAppBrowser.open;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    },
    navigate: function(path) {
        var url = this._base + path;
        var win = window.open(url, '_blank', 'location=no,zoom=no,toolbar=no');
    }
};
