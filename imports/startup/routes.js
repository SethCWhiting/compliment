import '/imports/ui/components/header/header.js';
import '/imports/ui/components/time/time.js';
import '/imports/ui/components/sending/sending.js';

import '/imports/ui/layouts/kiwi/kiwi.js';
import '/imports/ui/layouts/naming/naming.js';
import '/imports/ui/layouts/profile/profile.js';
import '/imports/ui/layouts/friends/friends.js';
import '/imports/ui/layouts/words/words.js';
import '/imports/ui/layouts/compliment/compliment.js';

Router.route('/', function () {
  if (Meteor.user()) {
    if (Meteor.user().profile.firstname) {
      this.render('friends', {
        data: function () {
          return Meteor.user();
        }
      });
    } else {
      this.render('naming');
    }
  }
});

Router.route('/me/', function () {
  this.render('profile', {
    data: function () {
      return Meteor.user();
    }
  });
});

Router.route('/kiwi/', {name: 'kiwi'});
Router.route('/name/', {name: 'naming'});
Router.route('/profile/', {name: 'profile'});
Router.route('/friends/', {name: 'friends'});
Router.route('/words/', {name: 'words'});
Router.route('/friends/:id', function() {
  this.wait(Meteor.subscribe('user', this.params.id));
  this.wait(Meteor.subscribe('compliment', Meteor.userId(), this.params.id));
  if (this.ready()) {
    var data = Meteor.users.findOne({'_id': this.params.id});
    var today = new Date().getTime();
    var yesterday = new Date(today - 3600000);
    var complimented = Compliments.findOne({'sender': Meteor.userId(), 'receiver': this.params.id, 'createdAt': { $gte : yesterday}});
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
  var current_route = Router.current().route.getName() ? Router.current().route.getName() : 'friends';
  if (!Meteor.user()) {
    current_route = 'kiwi';
    this.render('kiwi');
  } else {
    this.next();
  }
  $('body').removeClass();
  $('body').addClass(current_route);
});
