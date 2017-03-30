import './profile.html';

Template.profile.helpers({
  friend: function() {
    return Template.instance().data;
  }
});
