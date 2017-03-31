Meteor.publish("words", function(){
  return Words.find();
});

Meteor.methods({
  'words.create'(val) {
    return Words.insert({
      "value": val,
      "createdAt": new Date()
    });
  },
  'words.update'(id, val) {
    return Words.update({"_id": id}, {$set: {"value": val}});
  },
  'words.delete'(id) {
    Compliments.remove({"value": id});
    return Words.remove({"_id": id});
  }
});
