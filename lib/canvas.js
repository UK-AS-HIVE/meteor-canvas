Accounts.oauth.registerService('canvas');

if(Meteor.isClient) {
  Meteor.loginWithCanvas = function (options, callback) {
    //Support a callback without options.
    if(! callback && typeof options === "function") { 
      callback = options;
      options = null;
    }
    var credentialRequestCompleteCallback  = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Canvas.requestCredential(options, credentialRequestCompleteCallback);
  };
}
