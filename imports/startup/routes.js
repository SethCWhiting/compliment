import '/imports/ui/layouts/dashboard/dashboard.js';

Router.route('/', function () {
  this.render('dashboard');
});

Router.route('/dashboard/', {name: 'dashboard'});
