Canvas = {};

Canvas.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'canvas'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
    new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();
  //This is the arbitrary piece of state that we pass to Canvas for verification.

  var loginStyle = OAuth._loginStyle('canvas', config, options);

  var loginPath = '_oauth/canvas/?requestTokenAndRedirect=true'
        + '&state=' +OAuth._stateParam(loginStyle,credentialToken);

  if (Meteor.isCordova) {
    loginPath = loginPath + "&cordova=true";
    if(/Android/i.test(navigator.userAgent)) {
      loginPath = loginPath + "&android=true";
    }
  }

  var loginUrl = Meteor.absoluteUrl(loginPath);

  OAuth.launchLogin({
    loginService: "canvas",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken 
  });
};
