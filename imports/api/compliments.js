Meteor.publish("compliment", function(sender, receiver) {
  return Compliments.find({"sender": sender, "receiver": receiver});
});

Meteor.publish("compliments", function() {
  return Words.find();
});

Meteor.methods({
  'compliments.create'(word, sender, receiver) {
    return Compliments.insert({
      "value": word,
      "sender": sender,
      "receiver": receiver,
      "createdAt": new Date()
    });
  }
});
