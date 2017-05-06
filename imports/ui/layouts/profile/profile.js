import './profile.html';

Template.profile.onCreated(function() {
  Meteor.subscribe('userCompliments', Template.instance().data._id);
  Meteor.subscribe('words');
});

Template.profile.helpers({
  friend: function() {
    return Template.instance().data;
  },
  sent: function() {
    return Compliments.find({'sender': Template.instance().data._id, 'createdAt': {$gte : getRange()}}).count();
  },
  received: function() {
    var total = Compliments.find({'receiver': Template.instance().data._id, 'createdAt': {$gte : getRange()}}).count();
    var word = Compliments.find({'value': this._id, 'receiver': Template.instance().data._id, 'createdAt': {$gte : getRange()}}).count();
    return Math.round((word / total) * 100);
  },
  words: function() {
    return Words.find().fetch();
  }
});
