/**
 * logerr
 *
 * @category   scrum-board
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0 Beta
 */


// TODO: Clearup this mess later and find a better way to handle blank fields

var Helper = function() {
  function init() {
    checkIfEmptyRemoteURL();
    checkForEmptyAssign();
  }
  
  function checkIfEmptyRemoteURL() {
    Handlebars.registerHelper('checkIfEmptyRemoteURL', function(val, options) {
      if(val) {
        return '<a href="' + val + '" target="_blank">' + val + '</a>';
      } else {
        return '-';
      }
    });
  }
  
  function checkForEmptyAssign() {
    Handlebars.registerHelper('checkIfEmptyAssigned', function(val, options) {
      if(val) {
        return val;
      } else {
        return '-';
      }
    });
  }
  
  return {
    init: init
  }
}();

Helper.init();