import './compliment.html';

Template.compliment.onCreated(function() {
  Meteor.subscribe("words");
});

Template.compliment.helpers({
  friend: function() {
    return Template.instance().data;
  },
  words: function() {
    return Words.find().fetch();
  }
});

Template.compliment.events({
  'click button': function() {
    var word = $('#word').val();
    console.log(word);
  }
})
