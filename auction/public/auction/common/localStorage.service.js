'use strict';
(function() {

  auction.factory('localStorage', localStorage);

  // HELPER FRIENDS
  // Helper to find objects in the local storage arrays
  var findObj = function (array, objName) {
    var response = [undefined];

    array.map(function (el, i, arr) {
      if (el.name === objName) {
        // Return the index of the object as well as the object
        response = {
          index: i,
          obj  : el
        };
      }
    });
    return response;
  };



  function localStorage () {
    var service = {
      ls    : window.localStorage,
      save  : save,
      get   : get,
      query : query,
      update: update,
      remove: remove
    };

    return service;

    // query returns the entire array
    function query (key) {
      return this.ls.getItem(key) ? JSON.parse(this.ls.getItem(key)) : [];
    };

    // Save something to local storage
    function save (key, value) {
      // get the requested arr
      var arr = this.query(key);

      // push new obj into the array
      arr.push(value);

      // set local storage to new items string
      this.ls.setItem(key, JSON.stringify(arr));

      return arr;
    };

    function get (key, value) {
      var arr = this.query(key);
      var thisObj = findObj(arr, value);

      return thisObj;
    };

    function remove (key, value) {
      // Get the pertinent array
      var arr = this.query(key);

      // Get the specific object
      var fetched = this.get(key, value);

      if (fetched) {
        // Splice out this object
        arr.splice(fetched.index, 1);

        this.ls.setItem(key, JSON.stringify(arr));
        return arr;
      }
    };

    function update (key, value, changes) {
      // Get the pertinent array
      var arr = this.query(key);
      var response;

      // Get the specific object
      var fetched = this.get(key, value);
      var thisObj;

      if (fetched) {
        // Store the object we want to update
        thisObj = arr[fetched.index];

        // Loop through the changes object and make the changes
        for (var change in changes) {
          thisObj[change] = changes[change];
        }
        this.ls.setItem(key, JSON.stringify(arr));
        response = {
          arr: arr,
          obj: thisObj
        };
        return response;
      }
    };

    return service;
  };

}());
