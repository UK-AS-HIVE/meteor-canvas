Package.describe({
  name: 'meteor-accounts-canvas',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base',['client','server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.add_files('canvas_server.js','server');
  api.add_files('canvas_client.js','client');
  api.add_files('canvas_lib.js',['client','server']);
});

