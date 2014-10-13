Router.configure ->
  Npm.require('connect')

Router.map ->
  #Home Route
  @route 'Home',
    waitOn: ->
      Meteor.subscribe('userData')

  # Router map for handling of POST data. Inserts it into Userdata.
  # Almost certainly need a better way of handling this.
  @route 'lti',
    where: 'server'
    path: '/receive/'
    onBeforeAction: ->
      # Hard-coded values for the consumer key and shared secret right now. 
      consumer_key = 'key'
      consumer_secret = 'secret'
      # Method of request
      requestMethod = @request.method
      # Instantiate a provider object, parse the request to get the body, and then insert the body.
      # Main purpose is to strip the OAuth parameters before publication.
      provider = new Provider consumer_key, consumer_secret
      provider.parse_request(@request)
      UserData.insert(provider.body)
      @response.writeHead(200, {'Content-Type': 'text/html'});
      @response.end();
