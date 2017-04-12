import './friends.html';

Template.friends.onCreated(function() {
  Meteor.subscribe('friends', Meteor.userId());
  Meteor.subscribe('compliments');
});

Template.friends.onRendered(function() {
  setTimeout(function() {
    $('table').tablesorter({ sortList: [[2,1]] });
  }, 1000);
});

Template.friends.helpers({
  friends: function() {
    return Meteor.users.find({"_id": {$ne: Meteor.userId()}}).fetch();
  },
  compliments: function() {
    return Compliments.find({'sender': this._id}).count();
  }
});
