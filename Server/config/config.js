var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
    secret: 'jwtsecret',
    database: 'mongodb://admin:admin@apollo.modulusmongo.net:27017/Mywyv3uj'
  },

  test: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
  }
};

module.exports = config[env];
