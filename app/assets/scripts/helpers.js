Handlebars.registerHelper('checkIfEmpty', function(val, options) {
  return (val === '') ? options.fn(this) : options.inverse(this);
});