OAuth.registerService('canvas',2,null,function(query) {
  var code = getCode(query);
  //TODO: figure out what's going on with the redirect URI
  var accessToken = getAccessToken(code);
  var identity = "steve";
  var serviceData = {
    accessToken: accessToken,
    expiresAt: (+new Date) + 100000
  }

  return {
    serviceData: serviceData,
    options: {profile: {name: identity}}
  };
}); 

var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

var getCode = function(query) {
  //Sends a GET request to the canvas installation for a code. (Step 1 in Canvas OAuth flow)
  var config = Meteor.settings.canvasConfig;
  if(!config) 
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  try {
    responseContent = HTTP.get(config.canvasURL + '/login/oauth2/auth', {
      params: {
        client_id: config.client_id,
        response_type: code,
        redirect_uri: config.redirectUri
      }
    }).content;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Canvas. " + err.message),
                    {response: err.response});
  }
  return responseContent;
};

var getAccessToken = function (query) {
  //Sends a POST request for the OAuth access token for our user. (Step 3)
  var config = Meteor.settings.canvasConfig;
  try {
    responseContent = HTTP.post(config.canvasURL + '/login/oauth/token', {
      params: {
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        client_secret: OAuth.openSecret(config.secret),
        code: query.code
      }
    }).content;
  console.log(responseContent);
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Canvas. " + err.message),
                    {response: err.response});
  }

  if(!isJSON(responseContent)) {
    throw new Error("Failed to complete OAuth handshake, response was of invalid type. " + responseContent);
  }

  return responseContent.accessToken;
}
