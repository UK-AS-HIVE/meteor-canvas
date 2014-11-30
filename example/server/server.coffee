Meteor.methods
  removeAll: ->
    # Just an easy way to empty the collection from the client.
    return UserData.remove({})

