Meteor.startup ->
  if (Meteor.isServer)
    connect = Npm.require('connect')
    # Hard defined TC key and secret for now. 
    consumer_key = 'key'
    consumer_secret = 'secret'  

Meteor.methods
  removeAll: ->
    # Just an easy way to empty the collection from the client.
    return UserData.remove({})

