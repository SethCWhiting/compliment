import './friends.html';

Template.friends.onCreated(function() {
  Meteor.subscribe('friends', Meteor.userId());
  Meteor.subscribe('compliments');
});

Template.friends.onRendered(function() {
  setTimeout(function() {
    $('table').tablesorter({sortList: [[2,1]]});
  }, 1000);
});

Template.friends.helpers({
  friends: function() {
    return Meteor.users.find({"_id": {$ne: Meteor.userId()}}).fetch();
  },
  compliments: function() {
    // console.log(this.sent.length);
    // return this.sent ? this.sent.length : 0;
    return Compliments.find({'sender': this._id, 'createdAt': {$gte : getRange()}}).count();
  }
});

Template.friends.events({
  'change select': function() {
    setTimeout(function() {
      $('table').tablesorter({sortList: [[2,1]]});
    }, 1000);
  }
});
