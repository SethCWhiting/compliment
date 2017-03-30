import './friend.html';

Template.friend.helpers({
  friend: function() {
    return Template.instance().data;
  }
});
