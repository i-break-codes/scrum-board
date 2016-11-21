Handlebars.registerHelper('checkForBlank', function(val, options) {
  return (val !== '') ? val : '-';
});