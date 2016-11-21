/**
 * logerr
 *
 * @category   scrum-board
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0 Beta
 */


var LocalStorage = function() {
  function set(key, val) {
    localStorage.setItem(key, val);
  }
  
  function get(key) {
    return localStorage.getItem(key);
  }
  
  function remove(key) {
    localStorage.removeItem(key);
  }
  
  return {
    set: set,
    get: get,
    remove: remove
  }
}();