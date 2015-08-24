'use strict';
(function() {
  var item = function () {
    return {
      restrict: 'E',
      scope   : {
        item : '=',
        end  : '&',
        start: '&'
      },
      templateUrl: '/auction/public/auction/auctioneer/item.html',
      replace    : true
    };
  };

  auction.directive('item', item);
}());
