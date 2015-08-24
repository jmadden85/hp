'use strict';
var Promise = function () {
  this.callbacks = {
    success: [],
    failure: []
  };
};

var Defer = function () {
  this.promise = new Promise();
};

Promise.prototype.status = 'uninitialized';
Promise.prototype.error = null;

Promise.prototype.then = function (success, failure) {
  var defer = new Defer();

  this.callbacks.success.push({
    cb: success,
    defer: defer
  });

  if (failure) {
    this.callbacks.failure.push({
      cb: failure,
      defer: defer
    });
  }

  if (this.status === 'resolved') {
    this.fireCallback({
      cb: success,
      defer: defer
    }, this.data);
  } else if (this.status === 'rejected') {
    this.fireCallback({
      cb: success,
      defer: defer
    }, this.data);
  }

  return defer.promise;
};

Promise.prototype.fireCallback = function (cbInfo, data) {
  window.setTimeout(function () {
    var response = cbInfo.cb(data);

    if (response instanceof Promise) {
      cbInfo.defer.bind(response);
    } else {
      cbInfo.defer.resolve(response);
    }
  }, 0);
};

Defer.prototype.resolve = function (data) {
  var promise = this.promise;
  promise.data = data;
  promise.status = 'resolved';
  promise.callbacks.success.forEach(function (cbInfo) {
    promise.fireCallback(cbInfo, data);
  });
};

Defer.prototype.reject = function (error) {
  var promise = this.promise;
  promise.error = error;
  promise.status = 'rejected';
  promise.callbacks.failure.forEach(function (cbInfo) {
    promise.fireCallback(cbInfo, error);
  });
};

Defer.prototype.bind = function (promise) {
  var that = this;
  promise.then(function (res) {
    that.resolve(res);
  }, function (err) {
    that.reject(err);
  });
};
