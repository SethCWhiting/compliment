import './time.html';

const times = [
  {val: 3600000, text: 'hour'},
  {val: 86400000, text: 'day'},
  {val: 604800000, text: 'week'},
  {val: 2592000000, text: 'month'},
  {val: 315360000000000, text: 'year'},
  {val: 0, text: 'forever'}
];

Template.time.helpers({
  times: function() {
    return times;
  },
  selected: function() {
    return this.val === Session.get('time');
  }
});

Template.time.events({
  'change select': function(e) {
    Session.set('time', parseInt(e.currentTarget.value));
  }
});
