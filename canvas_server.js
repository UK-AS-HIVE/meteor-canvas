OAuth.registerService('canvas',2,null,function(query) {
  //Weird hack to not reject self-signed certs in dev environment.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  console.log(query);
  var code = getCode(query);
  var accessToken = getAccessToken(code);
  var identity = "test";
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
  var config = ServiceConfiguration.configurations.findOne({service: 'canvas'});
  if(!config) 
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  var url = config.url + "login/oauth2/auth";
  try {
    responseContent = HTTP.get("https://localhost/login/oauth2/auth", {
      params: {
        client_id: config.client_id,
        response_type: "code",
        redirect_uri: OAuth._redirectUri('canvas',config)
      }
    }).data;
  console.log(responseContent);
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Canvas - GET" + err.message),
                    {response: err.response});
  }
  return responseContent;
};

var getAccessToken = function (code) {
  //Sends a POST request for the OAuth access token for our user. (Step 3)
  var config = ServiceConfiguration.configurations.findOne({service: 'canvas'});
  var postResponse;
  try {
    postResponse = HTTP.post(config.url + 'login/oauth/token', {
      params: {
        client_id: config.client_id,
        redirect_uri: OAuth._redirectUri('canvas',config),
        client_secret: config.client_secret,
        code: code
      }
    }).data;
  console.log(postResponse);
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Canvas - POST " + err.message),
                    {response: err.response});
  }

  /*if(!isJSON(responseContent)) {
    throw new Error("Failed to complete OAuth handshake, response was of invalid type. " + responseContent);
  }*/

  return responseContent.accessToken;
}
