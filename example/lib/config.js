//Hack to add our service configuration.
Meteor.startup(function () {
   ServiceConfiguration.configurations.remove({service: "canvas"});
   ServiceConfiguration.configurations.insert({
      service: "canvas",
      url: "https://pot931-4.ad.uky.edu/",
      client_id: "10000000000001",
      client_secret: "X2bnki9KBxClYgz25r5g3i3PqqT8wSsE7D3EwGGbaZeuShLM7tclHaRHcyqoRBYK"
    });
});
