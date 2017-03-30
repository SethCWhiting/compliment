import './friends.html';

Template.friends.onCreated(function() {
  Meteor.subscribe("users");
});

Template.friends.helpers({
  friends: function() {
    return Meteor.users.find().fetch();
  }
});
