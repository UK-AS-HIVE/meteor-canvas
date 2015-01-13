meteor-canvas
=============
###Overview###
This package implements the OAuth flow for a Canvas LMS. 

###Installation###
This package is published on Atmosphere. To add to your app, run `meteor add hive:canvas`.

##Usage##
From the client, call `Canvas.requestCredential` with a `credentialRequestCompleteHandler` to request an access token for a user. 

##TODO##
This implements the OAuth flow from an App to Canvas, but still needs a route to receive POST data from Canvas and send a grade passback. 

##License##
MIT.

