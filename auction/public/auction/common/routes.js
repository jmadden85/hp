'use strict';
(function() {
auction.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/auction', {
      templateUrl: '/auction/public/auction/common/home.tpl.html'
    })
    .when('/auctioneer', {
      templateUrl : '/auction/public/auction/auctioneer/auctioneer.tpl.html',
      controllerAs: 'auction',
      controller  : 'AuctioneerCtrl'
    })
    .when('/bidder', {
      templateUrl   : '/auction/public/auction/bidder/bidder.tpl.html',
      controllerAs  : 'bidder',
      controller    : 'BidderCtrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/auction'
    });

    $locationProvider.html5Mode({
      enabled: false
    });

  }
]);
}());
