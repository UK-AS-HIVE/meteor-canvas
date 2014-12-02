Package.describe({
  name: 'hive:accounts-canvas',
  summary: 'A package to implement Canvas authentication via OAuth',
  version: '1.0.0',
  git: 'https://github.com/UK-AS-HIVE/meteor-accounts-canvas'
});

Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http','server');
  api.use('underscore','server');
  api.use('random','client');
  api.use('service-configuration',['client','server']);

  api.export('Canvas');

  api.add_files('canvas_server.js','server');
  api.add_files('canvas_client.js','client');
});

