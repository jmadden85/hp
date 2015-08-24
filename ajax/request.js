'use strict';
var Request = function () {
  this.response = null;
  this.request = new XMLHttpRequest();
};

Request.prototype = {
  send: function (url, method) {
    this.request.onreadystatechange = this.stateChangeHandler;
    this.request.open(method, url, true);
    this.request.defer = new Defer();
    this.request.send();
    return this.request.defer.promise;
  },
  stateChangeHandler: function () {
    var stateCode = this.readyState;
    var state;
    var statusCode = this.status;

    switch (stateCode) {
      case 0:
        state = 'uninitialized';
        break;
      case 1:
        state = 'loading';
        break;
      case 2:
        state = 'loaded';
        break;
      case 3:
        state = 'interactive';
        break;
      case 4:
        state = 'complete';
        if (statusCode === 200) {
          this.defer.resolve(this.responseText);
          return this;
        } else {
          this.defer.reject("Something seems to have gone wrong, please try again.");
        }
        break;
      default:
        break;
    }
    return;
  }
};
