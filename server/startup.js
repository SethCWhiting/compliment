Meteor.startup(function() {

  if (Meteor.settings.public.test_mode) {
    // GENERATE FAKE USERS -----------------------------------------------------
    if (Meteor.users.find().count() < 100) {
      console.log(Meteor.users.find().count());
      Accounts.createUser({
        'username': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': 'password',
        'profile': {
          'firstname': faker.name.firstName(),
          'lastname': faker.name.lastName()
        }
      });
    }
    // GENERATE FAKE COMPLIMENTS -----------------------------------------------
    if (Compliments.find().count() < 500) {
      var randSender = Math.floor(Meteor.users.find().count() * Math.random());
      var randReceiver = Math.floor(Meteor.users.find().count() * Math.random());
      var randWord = Math.floor(Words.find().count() * Math.random());
      if (randSender !== randReceiver) {
        var word = Words.find({}, {limit: 1, skip: randWord}).fetch()[0]._id;
        var sender = Meteor.users.find({}, {limit: 1, skip: randSender}).fetch()[0]._id;
        var receiver = Meteor.users.find({}, {limit: 1, skip: randReceiver}).fetch()[0]._id;
        Meteor.call('compliments.create', word, sender, receiver);
      }
    }
    // END FAKE DATA -----------------------------------------------------------
  }

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
    Words.insert({
      "value": 'helpful',
      "createdAt": new Date()
    });
  }
});
