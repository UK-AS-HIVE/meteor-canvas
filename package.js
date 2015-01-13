Package.describe({
  name: 'hive:canvas',
  summary: 'A package to implement the Canvas LMS Oauth Flow.',
  version: '0.1.0',
  git: 'https://github.com/UK-AS-HIVE/meteor-canvas'
});

Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http','server');
  api.use('underscore','server');
  api.use('random','client');
  api.use('templating','client');
  api.use('service-configuration',['client','server']);
  api.versionsFrom("0.9.4");
  api.export('Canvas');
  
  api.add_files(
    ['canvas_configure.html', 'canvas_configure.js'],
    'client');

  api.add_files('canvas_server.js','server');
  api.add_files('canvas_client.js','client');
});

