window.ThetaWebWidgets = (function () {
    var _widgets = {};
    var _latestThetaAccountUpdatedMessage = null;
    var _loggingEnabled = false;
    var _scriptParams = {};

    var SCRIPT_NAME = "ThetaWebWidgets.js";

    //
    //Helpers
    //

    
    function getScriptParams() {
        // Find all script tags

        var scripts = document.getElementsByTagName("script");

        // Look through them trying to find ourselves

        for(var i=0; i<scripts.length; i++) {
            var src = scripts[i].src;

            if(src.indexOf("/" + SCRIPT_NAME) > -1) {
                // Get an array of key=value strings of params
                var pa = scripts[i].src.split("?").pop().split("&");

                // Split each key=value into array, the construct js object
                var p = {};
                for(var j=0; j<pa.length; j++) {
                    var kv = pa[j].split("=");
                    p[kv[0]] = kv[1];
                }

                //ENV
                if(src.indexOf("-beta.") > -1){
                    p["env"] = "beta";
                }
                else if(src.indexOf("-staging.") > -1){
                    p["env"] = "staging";
                }
                else if(src.indexOf("-prod.") > -1){
                    p["env"] = "production";
                }
                else{
                    p["env"] = "production";
                }

                return p;
            }
        }

        // No scripts match
        return {};
    }
    _scriptParams = getScriptParams();

    function __initialize() {
        log("__initialize");

        var callbackName = _scriptParams["callback"];
        var callback = window[callbackName];
        if(callback){
            callback();
        }
    }

    function log(){
        if(_loggingEnabled === true){
            Function.prototype.apply.call(console.log, console, arguments);
        }
    }

    function setUpMessageListener(){
        window.addEventListener("message", function(e){
            var messageData = e.data;
            log("messageData == " );
            log(messageData);
            var eventName = messageData['event'];
            var eventData = messageData['data'];

            if(eventName === "thetaWebWidget::didChangeHeight"){
                var height = eventData['height'];
                var widgetID = eventData['widget-id'];
                var widget = _widgets[widgetID];

                if(widget && height) {
                    widget._setHeight(height);
                }
            }
            else if(eventName != null && eventName.startsWith('theta')){
                if(eventName === "thetaAccountUpdated"){
                    _latestThetaAccountUpdatedMessage = messageData;
                }


                //Pass the theta lib events down to the widgets
                for(var widgetId in _widgets){
                    var widget = _widgets[widgetId];
                    if(widget && widget.widgetElement && widget.widgetElement.contentWindow){
                        widget.widgetElement.contentWindow.postMessage(messageData, '*');
                    }
                }
            }
        });
    }
    setUpMessageListener();

    function generateWidgetID(){
        //https://gist.github.com/gordonbrander/2230317
        return '' + Math.random().toString(36).substr(2, 9);
    }

    function renderWidget(parentElementId, url, onCompletion){
        var parentElement = document.getElementById(parentElementId);

        //Clear old content
        parentElement.innerHTML = '';

        //Create the widget element
        var widgetElement = document.createElement('iframe');
        widgetElement.src = url;
        widgetElement.frameBorder = "0";
        widgetElement.style.width = "100%";
        widgetElement.style.height = "0";
        widgetElement.scrolling = "no";
        widgetElement.onload = function(e){
            if(onCompletion){
                onCompletion(widgetElement);
            }
        };

        //Inject the widget element
        parentElement.appendChild(widgetElement);

        //Return newly created widget
        return widgetElement;
    }

    //
    //OverviewWithTrafficChartWidget
    //

    function OverviewWithTrafficChartWidget() {
        log("In ThetaOverviewWithTrafficChartWidget()");

        this.platformName = null;
        this.showTFuelHelpButton = false;
        this.mainMessage = null;
        this.language = "en";

        this._id = generateWidgetID();
        this._queuedMessages = [];
        this._ENV = (_scriptParams['env'] || "production");

        _widgets[this._id] = this;

        return this;
    }

    OverviewWithTrafficChartWidget.prototype.postMessage = function (eventName, eventData){
        if(this.widgetElementIsLoaded){
            window.postMessage(JSON.stringify({"event" : eventName, "data" : eventData}), '*');
        }
        else{
            //Store so we can call this later...
            this._queuedMessages.push([eventName, eventData]);
        }
    };

    OverviewWithTrafficChartWidget.prototype.setUserAvatarURL = function (userAvatarURL) {
        log("setUserAvatarURL :: userAvatarURL == " + userAvatarURL);
        this.userAvatarURL = userAvatarURL;

        this.postMessage("thetaWebWidget::setUserAvatarURL", {
            "value" : userAvatarURL,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype.setTheme = function (theme) {
        log("setTheme :: theme == " + theme);
        this.theme = theme;

        this.postMessage("thetaWebWidget::setTheme", {
            "value" : theme,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype.setPlatformName = function (platformName) {
        log("setPlatformName :: platformName == " + platformName);
        this.platformName = platformName;

        this.postMessage("thetaWebWidget::setPlatformName", {
            "value" : platformName,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype.setShowGammaHelpButton = function (showHelpButton) {
        //Dispatch for backward compatability
        this.setShowTFuelHelpButton(showHelpButton);
    };

    OverviewWithTrafficChartWidget.prototype.setShowTFuelHelpButton = function (showHelpButton) {
        this.showTFuelHelpButton = showHelpButton;

        this.postMessage("thetaWebWidget::setShowTFuelHelpButton", {
            "value" : showHelpButton,
            "widget-id" : this._id
        });

        //Backward compatability
        this.postMessage("thetaWebWidget::setShowGammaHelpButton", {
            "value" : showHelpButton,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype.setMainMessage = function (message) {
        log("setMainMessage :: message == " + message);
        this.mainMessage = message;

        this.postMessage("thetaWebWidget::setMainMessage", {
            "value" : message,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype.setLanguage = function (language) {
        log("setLanguage :: language == " + language);
        this.language = language;

        this.postMessage("thetaWebWidget::setLanguage", {
            "value" : language,
            "widget-id" : this._id
        });
    };

    OverviewWithTrafficChartWidget.prototype._setWidgetLoaded = function (isLoaded) {
        log("setPlatform :: _setWidgetLoaded == " + isLoaded);
        this.widgetElementIsLoaded = isLoaded;

        if(isLoaded){
            this.postMessage("thetaWebWidget::init", {
                "widget-id" : this._id
            });

            //Post the stored account if we captured one while loading...
            if(_latestThetaAccountUpdatedMessage){
                //Pass the theta lib events down to the widgets
                for(var widgetId in _widgets){
                    var widget = _widgets[widgetId];

                    if(widget){
                        widget.widgetElement.contentWindow.postMessage(_latestThetaAccountUpdatedMessage, '*');
                    }
                }
            }

            //Send messages which were queued
            for (var i = 0; i < this._queuedMessages.length; i++) {
                var queuedMessage = this._queuedMessages[i];
                this.postMessage(queuedMessage[0], queuedMessage[1]);
            }
        }
    };

    OverviewWithTrafficChartWidget.prototype._getWidgetHostName = function () {
        var hostName = null;
        if(this._ENV === 'production'){
            hostName = "https://theta-web-widgets.thetatoken.org";
        }
        else if(this._ENV === 'beta'){
            hostName = "https://theta-web-widgets-beta.thetatoken.org";
        }
        else if(this._ENV === 'staging'){
            hostName = "https://theta-web-widgets-staging.thetatoken.org";
        }
        else if(this._ENV === 'local'){
            hostName = "http://localhost:3499";
        }
        else{
            //Default to PROD
            hostName = "https://theta-web-widgets.thetatoken.org";
        }

        return hostName;
    };

    OverviewWithTrafficChartWidget.prototype._getWidgetURL = function () {
        var host = this._getWidgetHostName();

        var url = host + '/widgets/overview-with-traffic-chart';
        url += '?theme=' + this.theme;
        url += '&widget-id=' + this._id;
        if(this.platformName){
            url += '&platform-name=' + encodeURIComponent(this.platformName);
        }
        if(this.userAvatarURL){
            url += '&user-avatar-url=' + encodeURIComponent(this.userAvatarURL);
        }
        url += '&show-tfuel-help-button=' + this.showTFuelHelpButton;
        if(this.mainMessage){
            url += '&main-message=' + encodeURIComponent(this.mainMessage);
        }
        if(this.language){
            url += '&language=' + this.language;
        }
        //Backward compatability
        url += '&show-gamma-help-button=' + this.showTFuelHelpButton;
        return url;
    };

    OverviewWithTrafficChartWidget.prototype._setHeight = function(newHeight){
        log("OverviewWithTrafficChartWidget.prototype._setHeight :: newHeight == " + newHeight);
        this.widgetElement.style.height = newHeight + 'px';
    };

    OverviewWithTrafficChartWidget.prototype.render = function (parentElementId) {
        var self = this;

        this.widgetElementIsLoaded = false;

        var widgetURL = this._getWidgetURL();
        self.widgetElement = renderWidget(parentElementId, widgetURL, function(widgetElement){
            //Give the app some time to fire up!
            setTimeout(function(){
                self._setWidgetLoaded(true);
            }, 1500);
        });
    };

    OverviewWithTrafficChartWidget.prototype.destroy = function (parentElementId) {
        this.widgetElementIsLoaded = false;

        delete _widgets[this._id];
    };















    //
    //TrafficStatsWidget
    //

    function TrafficStatsWidget() {
        log("In TrafficStatsWidget()");

        this.language = "en";
        this._id = generateWidgetID();
        this._queuedMessages = [];
        this._ENV = (_scriptParams['env'] || "production");

        _widgets[this._id] = this;

        return this;
    }

    TrafficStatsWidget.prototype.postMessage = function (eventName, eventData){
        if(this.widgetElementIsLoaded){
            window.postMessage(JSON.stringify({"event" : eventName, "data" : eventData}), '*');
        }
        else{
            //Store so we can call this later...
            this._queuedMessages.push([eventName, eventData]);
        }
    };

    TrafficStatsWidget.prototype.setTheme = function (theme) {
        log("setTheme :: theme == " + theme);
        this.theme = theme;

        this.postMessage("thetaWebWidget::setTheme", {
            "value" : theme,
            "widget-id" : this._id
        });
    };

    TrafficStatsWidget.prototype.setLanguage = function (language) {
        log("setLanguage :: language == " + language);
        this.language = language;

        this.postMessage("thetaWebWidget::setLanguage", {
            "value" : language,
            "widget-id" : this._id
        });
    };

    TrafficStatsWidget.prototype._setWidgetLoaded = function (isLoaded) {
        log("setPlatform :: _setWidgetLoaded == " + isLoaded);
        this.widgetElementIsLoaded = isLoaded;

        if(isLoaded){
            this.postMessage("thetaWebWidget::init", {
                "widget-id" : this._id
            });

            //Post the stored account if we captured one while loading...
            if(_latestThetaAccountUpdatedMessage){
                //Pass the theta lib events down to the widgets
                for(var widgetId in _widgets){
                    var widget = _widgets[widgetId];

                    if(widget){
                        widget.widgetElement.contentWindow.postMessage(_latestThetaAccountUpdatedMessage, '*');
                    }
                }
            }

            //Send messages which were queued
            for (var i = 0; i < this._queuedMessages.length; i++) {
                var queuedMessage = this._queuedMessages[i];
                this.postMessage(queuedMessage[0], queuedMessage[1]);
            }
        }
    };

    TrafficStatsWidget.prototype._getWidgetHostName = function () {
        var hostName = null;
        if(this._ENV === 'production'){
            hostName = "https://theta-web-widgets.thetatoken.org";
        }
        else if(this._ENV === 'beta'){
            hostName = "https://theta-web-widgets-beta.thetatoken.org";
        }
        else if(this._ENV === 'staging'){
            hostName = "https://theta-web-widgets-staging.thetatoken.org";
        }
        else if(this._ENV === 'local'){
            hostName = "http://localhost:3499";
        }
        else{
            //Default to PROD
            hostName = "https://theta-web-widgets.thetatoken.org";
        }

        return hostName;
    };

    TrafficStatsWidget.prototype._getWidgetURL = function () {
        var host = this._getWidgetHostName();

        var url = host + '/widgets/traffic-stats';
        url += '?theme=' + this.theme;
        url += '&widget-id=' + this._id;
        if(this.language){
            url += '&language=' + this.language;
        }
        return url;
    };

    TrafficStatsWidget.prototype._setHeight = function(newHeight){
        log("TrafficStatsWidget.prototype._setHeight :: newHeight == " + newHeight);
        this.widgetElement.style.height = newHeight + 'px';
    };

    TrafficStatsWidget.prototype.render = function (parentElementId) {
        var self = this;

        this.widgetElementIsLoaded = false;

        var widgetURL = this._getWidgetURL();
        self.widgetElement = renderWidget(parentElementId, widgetURL, function(widgetElement){
            //Give the app some time to fire up!
            setTimeout(function(){
                self._setWidgetLoaded(true);
            }, 1500);
        });
    };

    TrafficStatsWidget.prototype.destroy = function (parentElementId) {
        this.widgetElementIsLoaded = false;

        delete _widgets[this._id];
    };

    return {
        OverviewWithTrafficChartWidget: function () {
            var widget = new OverviewWithTrafficChartWidget();
            return widget;
        },
        TrafficStatsWidget: function() {
            var widget = new TrafficStatsWidget();
            return widget;
        },
        Themes: {Dark : "dark", Light : "light"},
        __initialize : __initialize
    };
}());

if(document.readyState === 'complete'){
    //Document has already loaded
    window.ThetaWebWidgets.__initialize();
}
else{
    //Add a listener for when the body is loaded
    if(window.addEventListener){
        window.addEventListener('load', window.ThetaWebWidgets.__initialize);
    }else{
        window.attachEvent('onload', window.ThetaWebWidgets.__initialize);
    }
}