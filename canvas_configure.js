Template.configureLoginServiceDialogForCanvas.helpers({
  siteUrl: function() {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForCanvas.fields = function () {
  return [
    {property: 'client_id', label: 'Tool ID (Number)'},
    {property: 'client_secret', label: 'Tool Secret (Key)'},
    {property: 'url', label: 'Canvas Installation URL'}
  ];
};
