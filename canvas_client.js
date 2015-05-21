Canvas = {};

Canvas.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'canvas'});
  if (!config) {
    if(credentialRequestCompleteCallback)
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();
  //This is the arbitrary piece of state that we pass to Canvas for verification.

  var loginStyle = OAuth._loginStyle('canvas', config, options);

  var loginUrl = config.url + '/login/oauth2/auth?' + 
        'client_id=' + config.client_id +
        '&response_type=code' +
        '&redirect_uri=' + OAuth._redirectUri('canvas',config) +
        '&state=' +OAuth._stateParam(loginStyle,credentialToken);

  OAuth.launchLogin({
    loginService: "canvas",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken 
  });
};
