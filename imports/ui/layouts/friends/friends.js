import './friends.html';

Template.friends.onCreated(function() {
  Meteor.subscribe("friends", Meteor.userId());
});

Template.friends.helpers({
  friends: function() {
    return Meteor.users.find({"_id": {$ne: Meteor.userId()}}).fetch();
  }
});
