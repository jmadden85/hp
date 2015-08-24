'use strict';
(function() {
  var button = document.querySelector('#call');
  var info = document.querySelector('#info');
  var str = '';

  var makeCalls = function () {
    var origin = 'http://httpbin.org';
    var paths = [origin + '/delay/5', origin + '/ip', origin + '/user-agent'];
    var request = new Request().send(paths[0], 'GET');

    request.then(function () {
      var request2 = new Request().send(paths[1], 'GET');
      var request3 = new Request().send(paths[2], 'GET');

      request2.then(log, log);
      request3.then(log, log);
    });
  };

  var log = function (data) {
    var obj = JSON.parse(data);

    obj.hasOwnProperty('origin') ? str = 'IP = ' + obj.origin + str : str+= '<br />UA = ' + obj['user-agent'];

    if (str.indexOf('IP =') !== -1 && str.indexOf('UA =') !== -1) {
      info.innerHTML = str;
      str = '';
    }
  };

  button.addEventListener('click', function (event) {
    makeCalls();
  });

}());