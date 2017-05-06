Meteor.publish("friends", function(id){
  return Meteor.users.find({"_id": {$ne: id}});
});

Meteor.publish("user", function(id){
  return Meteor.users.find({"_id": id});
});

Meteor.methods({
  'users.getByEmail'(email) {
    return Accounts.findUserByEmail(email);
  },
  'users.name'(id, first, last) {
    return Meteor.users.update({"_id": id}, {"$set": {"profile": {"firstname": first, "lastname": last}}});
  },
  'users.send'(id) {
    return Meteor.users.update({"_id": id}, {"$push": {"sent": new Date()}});
  }
});
