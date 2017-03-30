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
    var sender = Meteor.userId();
    var receiver = Template.instance().data._id;
    Meteor.call('compliments.create', word, sender, receiver, function(err, rec) {
      if (err) {
        console.log(err);
      } else {
        Router.go('friends');
      }
    });
  }
})
