import './friends.html';

Template.friends.onCreated(function() {
  Meteor.subscribe('friends', Meteor.userId());
  Meteor.subscribe('compliments');
});

Template.friends.onRendered(function() {
  $('tbody').css('opacity', 0);
  setTimeout(function() {
    $('table').tablesorter({sortList: [[2,1]]});
    $('tbody').animate({'opacity': 1}, 250);
  }, 500);
});

Template.friends.helpers({
  friends: function() {
    return Meteor.users.find({"_id": {$ne: Meteor.userId()}}).fetch();
  },
  compliments: function() {
    return Compliments.find({'sender': this._id, 'createdAt': {$gte : getRange()}}).count();
  },
  complimented: function() {
    var now = new Date().getTime();
    var then = new Date(now - 3600000);
    return Compliments.find({'sender': Meteor.userId(), 'receiver': this._id, 'createdAt': {$gte : then}}).count();
  },
  visible: function() {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['admin','teacher'])) {
      return true;
    } else {
      return !Roles.userIsInRole(this._id, ['admin','teacher'])
    }
  }
});

Template.friends.events({
  'change select': function() {
    $('tbody').css('opacity', 0);
    setTimeout(function() {
      $('table').trigger('update');
      $('tbody').animate({'opacity': 1}, 250);
    }, 500);
  },
  'click tbody tr': function() {
    window.location = '/friends/' + this._id;
  }
});
