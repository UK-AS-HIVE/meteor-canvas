meteor-canvas
=============
###Overview###
This package implements the OAuth flow for a Canvas LMS. 

###Installation###
For the moment, this package will need to be cloned and added to your project manually.
* mkdir -p packages
* git clone https://github.com/UK-AS-HIVE/meteor-canvas packages/hive:canvas
* meteor add hive:canvas

##Usage##
From the client, call `Canvas.requestCredential` with a `credentialRequestCompleteHandler` to request an access token for a user. 

##License##
MIT.
