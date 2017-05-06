import './compliment.html';

Template.compliment.onCreated(function() {
  Meteor.subscribe("words");
  this.selected = new ReactiveVar( false );
});

Template.compliment.helpers({
  friend: function() {
    return Template.instance().data;
  },
  words: function() {
    return Words.find().fetch();
  },
  selected: function() {
    return Template.instance().selected.get();
  }
});

Template.compliment.events({
  'change #word': function(e) {
    if (e.target.value) {
      Template.instance().selected.set(true);
    } else {
      Template.instance().selected.set(false);
    }
  },
  'click button': function() {
    var word = $('#word').val();
    var sender = Meteor.userId();
    var receiver = Template.instance().data._id;
    if (word !== 'blank') {
      Meteor.call('compliments.create', word, sender, receiver, function(err, rec) {
        if (err) {
          console.log(err);
        }
      });
    }
  }
})
