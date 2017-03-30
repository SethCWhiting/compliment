Meteor.publish("compliment", function(sender, receiver) {
  return Compliments.find({"sender": sender, "receiver": receiver});
});

Meteor.publish("userCompliments", function(id) {
  return Compliments.find({$or: [{"sender": id}, {"receiver": id}]});
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
