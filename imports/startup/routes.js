import '/imports/ui/components/header/header.js';

import '/imports/ui/layouts/kiwi/kiwi.js';
import '/imports/ui/layouts/profile/profile.js';
import '/imports/ui/layouts/friends/friends.js';
import '/imports/ui/layouts/words/words.js';
import '/imports/ui/layouts/compliment/compliment.js';

Router.route('/', function () {
  if (Meteor.userId()) {
    this.render('profile', {
      data: function () {
        return Meteor.user();
      }
    });
  }
});

Router.route('/kiwi/', {name: 'kiwi'});
Router.route('/profile/', {name: 'profile'});
Router.route('/friends/', {name: 'friends'});
Router.route('/words/', {name: 'words'});
Router.route('/friends/:id', function() {
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
});

Router.onBeforeAction(function () {
  var current_route = Router.current().route.getName() ? Router.current().route.getName() : 'profile';
  if (!Meteor.userId()) {
    current_route = 'kiwi';
    this.render('kiwi');
  } else {
    this.next();
  }
  $('body').removeClass();
  $('body').addClass(current_route);
});
