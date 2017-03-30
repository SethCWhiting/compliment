Meteor.publish("friends", function(id){
  return Meteor.users.find({"_id": {$ne: id}});
});

Meteor.publish("user", function(id){
  return Meteor.users.find({"_id": id});
});
