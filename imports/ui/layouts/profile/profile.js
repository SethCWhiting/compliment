import './profile.html';

Template.profile.onCreated(function() {
  Meteor.subscribe('userCompliments', Template.instance().data._id);
  Meteor.subscribe('words');
  this.editing = new ReactiveVar(false);
});

Template.profile.helpers({
  friend: function() {
    return Template.instance().data;
  },
  isMe: function() {
    return Template.instance().data._id === Meteor.userId();
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
  },
  editing: function() {
    return Template.instance().editing.get()
  }
});

Template.profile.events({
  'click .username': function() {
    Template.instance().editing.set(true);
  },
  'click .glyphicon-ok': function() {
    doneEditing();
  },
  'keyup .edit': function(e) {
    if (e.which === 13) {
      doneEditing();
    }
  }
});

function doneEditing() {
  var oldVal = Meteor.user().username;
  var newVal = $('.edit').val();
  if (oldVal !== newVal && newVal.replace(/\s+/g, '') !== '') {
    console.log(oldVal, newVal);
    Meteor.call('users.update', Meteor.userId(), newVal.toLowerCase(), function(err, res) {
      if (err) console.log(err);
    });
  }
  Template.instance().editing.set(false);
};
