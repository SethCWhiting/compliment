Template.registerHelper('hasName', () => {
  return Meteor.user() && Meteor.user().profile.firstname && Meteor.user().profile.lastname;
});

getRange = function() {
  var time = Session.get('time');
  var now = new Date().getTime();
  var range = time ? new Date(now - time) : new Date(time);
  return range;
};
