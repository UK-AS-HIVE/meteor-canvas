OAuth.registerService('canvas',2,null,function(query) {
  var response = getTokenResponse(query);
  console.log(response);
  var serviceData = {
    accessToken: response.access_token,
    expiresAt: (+new Date) + 100000
  }
  _.extend(serviceData,response.user);
  return {
    serviceData: serviceData,
    options: {profile: {name: response.user.name}}
  };
}); 

var getTokenResponse = function (query) {
  //Sends a POST request with the code we received in our GET response on the client.
  var config = ServiceConfiguration.configurations.findOne({service: 'canvas'});
  var postResponse;
  try {
    postResponse = HTTP.post(config.url + '/login/oauth2/token', {
      params: {
        client_id: config.client_id,
        redirect_uri: OAuth._redirectUri('canvas',config),
        client_secret: config.client_secret,
        state: query.state,
        code: query.code
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Canvas - POST " + err.message),
                    {response: err.response});
  }


  return postResponse;
}
