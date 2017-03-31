import './words.html';

Template.words.onCreated(function() {
  Meteor.subscribe('words');
  this.creating = new ReactiveVar(false);
  this.editing = new ReactiveVar(false);
});

Template.words.helpers({
  creating: function() {
    return Template.instance().creating.get();
  },
  editing: function() {
    return this._id === Template.instance().editing.get();
  },
  words: function() {
    return Words.find().fetch();
  }
});

Template.words.events({
  'click .addWord': function() {
    Template.instance().editing.set(false);
    Template.instance().creating.set(true);
  },
  'click .edit': function() {
    Template.instance().creating.set(false);
    Template.instance().editing.set(this._id);
  },
  'click .creating .glyphicon-ok': function(e) {
    var val = $(e.target).parents('.creating').find('input').val();
    doneCreating(this, val);
    $(e.target).parents('.creating').find('input').val('');
  },
  'keyup .creating input': function(e) {
    if (e.which === 13) {
      var val = $(e.target).val();
      doneCreating(this, val);
      $(e.target).val('');
    }
  },
  'click .editing .glyphicon-ok': function(e) {
    var val = $(e.target).parents('.editing').find('input').val();
    doneEditing(this, val);
  },
  'keyup .editing input': function(e) {
    if (e.which === 13) {
      var val = $(e.target).val();
      doneEditing(this, val);
    }
  },
  'click .glyphicon-remove': function() {
    var wordId = this._id;
    Meteor.call('compliments.wordCount', wordId, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        var plural = res > 1 ? 's' : '';
        var deleteConfirmed = res ? confirm('Are you sure you want to delete this word and the ' + res + ' compliment' + plural + ' associated with it?') : false;
        if (deleteConfirmed || !res) {
          Meteor.call('words.delete', wordId, function(err, res) {
            if (err) console.log(err);
          });
        }
      }
    });
  }
});

function doneCreating(o, val) {
  if (val.replace(/\s+/g, '') !== '') {
    Meteor.call('words.create',val.toLowerCase(), function(err, res) {
      if (err) console.log(err);
    });
  }
  Template.instance().creating.set(false);
};

function doneEditing(o, val) {
  var id = o._id;
  var oldVal = o.value;
  var newVal = val;
  if (oldVal !== newVal && newVal.replace(/\s+/g, '') !== '') {
    Meteor.call('words.update', o._id, newVal.toLowerCase(), function(err, res) {
      if (err) console.log(err);
    });
  }
  Template.instance().editing.set(false);
};
