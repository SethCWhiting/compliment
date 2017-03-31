Meteor.publish("friends", function(id){
  return Meteor.users.find({"_id": {$ne: id}});
});

Meteor.publish("user", function(id){
  return Meteor.users.find({"_id": id});
});

Meteor.methods({
  'users.getByEmail'(email) {
    return Accounts.findUserByEmail('sethcwhiting@gmail.com');
  }
});
