//Hack to add our service configuration.
Meteor.startup(function () {
  try {
    ServiceConfiguration.configurations.insert({
      "service": "canvas",
      "url": "https://localhost/",
      "consumerKey": "key",
      "secret": "secret"
    });
  } catch(err) {
    console.log(err.message);
  }
});
