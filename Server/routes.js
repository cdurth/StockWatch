'use strict';

module.exports = function(app) {
  // Insert routes below
  app.use('/api/setup', require('./api/setup'));
  app.use('/api/authenticate', require('./api/authenticate'));

  // All other routes should redirect to the index.html
  app.route('/*')
  .get(function(req, res) {
    res.send('API Running');
  });
};
