auction.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/auction', {
      templateUrl: '/auction/public/auction/common/home.html'
    })
    .when('/auctioneer', {
      templateUrl: '/auction/public/auction/auctioneer/auctions.html',
      controllerAs: 'auction',
      controller: 'AuctioneerCtrl'
    })
    .when('/bidder', {
      templateUrl: '/auction/public/auction/bidder/bidder.html',
      controllerAs: 'bidder',
      controller: 'BidderCtrl',
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