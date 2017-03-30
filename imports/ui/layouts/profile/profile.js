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
    return Compliments.find({'sender': Template.instance().data._id}).count();
  },
  received: function() {
    var total = Compliments.find({'receiver': Template.instance().data._id}).count();
    var word = Compliments.find({'value': this._id._str, 'receiver': Template.instance().data._id}).count();
    return Math.round((word / total) * 100);
  },
  words: function() {
    return Words.find().fetch();
  }
});
