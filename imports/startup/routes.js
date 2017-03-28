import '/imports/ui/components/header/header.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/dashboard/dashboard.js';

Router.route('/', function () {
  this.render('home');
});

Router.route('/home/', {name: 'home'});
Router.route('/dashboard/', {name: 'dashboard'});
