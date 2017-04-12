Meteor.startup(function() {
  Meteor.call('users.getByEmail', Meteor.settings.private.admin_email, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      if (!res) {
        var admin = Accounts.createUser({
          'email': Meteor.settings.private.admin_email,
          'password': Meteor.settings.private.admin_password,
          'profile': {
            'firstname': Meteor.settings.private.admin_firstname,
            'lastname': Meteor.settings.private.admin_lastname
          }
        });
        if (admin) Roles.addUsersToRoles(admin, ['admin']);
      } else {
        if (!Roles.userIsInRole(res._id, ['admin'])) {
          Roles.addUsersToRoles(res, ['admin']);
        }
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
