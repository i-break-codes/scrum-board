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