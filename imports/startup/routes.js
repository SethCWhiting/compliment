import '/imports/ui/components/header/header.js';
import '/imports/ui/components/kiwi/kiwi.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/profile/profile.js';
import '/imports/ui/layouts/friends/friends.js';
import '/imports/ui/layouts/compliment/compliment.js';

Router.route('/', function () {
  this.render('home');
});

Router.route('/home/', {name: 'home'});
Router.route('/profile/', {name: 'profile'});
Router.route('/friends/', {name: 'friends'});
Router.route('/friends/:id', function() {
  if (this.params.id === Meteor.userId()) {
    this.render('profile', {
      data: function () {
        return Meteor.user();
      }
    });
  } else {
    this.wait(Meteor.subscribe('user', this.params.id));
    this.wait(Meteor.subscribe('compliment', Meteor.userId(), this.params.id));
    if (this.ready()) {
      var data = Meteor.users.findOne({'_id': this.params.id});
      var complimented = Compliments.findOne({'sender': Meteor.userId(), 'receiver': this.params.id});
      var template = complimented ? 'profile' : 'compliment';
      this.render(template, {
        data: function () {
          return data;
        }
      });
    } else {
      this.render('kiwi');
    }
  }
});
