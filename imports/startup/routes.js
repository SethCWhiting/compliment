import '/imports/ui/components/header/header.js';
import '/imports/ui/components/kiwi/kiwi.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/profile/profile.js';
import '/imports/ui/layouts/friends/friends.js';
import '/imports/ui/layouts/friend/friend.js';
import '/imports/ui/layouts/compliment/compliment.js';

Router.route('/', function () {
  this.render('home');
});

Router.route('/home/', {name: 'home'});
Router.route('/profile/', {name: 'profile'});
Router.route('/friends/', {name: 'friends'});
Router.route('/friends/:id', function() {
  this.wait(Meteor.subscribe('user', this.params.id));
  if (this.ready()) {
    this.render('friend', {
      data: function () {
        return Meteor.users.findOne({'_id': this.params.id});
      }
    });
  } else {
    this.render('kiwi');
  }
});
Router.route('/friends/:id/compliment', function() {
  this.wait(Meteor.subscribe('user', this.params.id));
  if (this.ready()) {
    this.render('compliment', {
      data: function () {
        return Meteor.users.findOne({'_id': this.params.id});
      }
    });
  } else {
    this.render('kiwi');
  }
});
