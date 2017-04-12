Template.registerHelper('hasName', () => {
  return Meteor.user() && Meteor.user().profile.firstname && Meteor.user().profile.lastname;
});
