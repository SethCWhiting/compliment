import './naming.html';

Template.naming.events({
  'click button': function() {
    addName();
  },
  'keyup #firstname, keyup #lastname': function(e) {
    if (e.which === 13) {
      addName();
    }
  }
});

function addName() {
  var id = Meteor.userId();
  var first = $('#firstname').val();
  var last = $('#lastname').val();
  if (first.replace(/\s/g, '').length && last.replace(/\s/g, '').length) {
    Meteor.call('users.name', id, first, last, function(err) {
      if (err) console.log(err);
    });
  }
};
