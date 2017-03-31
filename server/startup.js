Meteor.startup(function() {
  Meteor.call('users.getByEmail', 'sethcwhiting@gmail.com', function(err, res) {
    if (err) {
      console.log(err);
    } else {
      if (!Roles.userIsInRole(res._id, ['admin'])) {
        Roles.addUsersToRoles(res, ['admin']);
      }
    }
  });

  if (!Words.find().count()) {
    Words.insert({
      "value": 'smart',
      "createdAt": new Date()
    });
    Words.insert({
      "value": 'funny',
      "createdAt": new Date()
    });
    Words.insert({
      "value": 'kind',
      "createdAt": new Date()
    });
    Words.insert({
      "value": 'creative',
      "createdAt": new Date()
    });
    Words.insert({
      "value": 'fun',
      "createdAt": new Date()
    });
  }
});
