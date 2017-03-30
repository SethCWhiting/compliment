Meteor.publish("compliments", function(){
  return Words.find();
});

Meteor.methods({
  'compliments.create'(word, sender, receiver) {
    return Compliments.insert({"value": word, "sender": sender, "receiver": receiver});
  }
});
