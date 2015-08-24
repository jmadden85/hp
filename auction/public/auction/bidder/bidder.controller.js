'use strict';
(function() {

  // Add bidderctrl to app
  auction.controller('BidderCtrl', BidderCtrl);


  // HELPER FRIENDS
  // Helper to get only started auctions
  var getStartedAuctions = function (auctions) {
    var startedItems = [];

    auctions.map(function (el) {
      if (el.auctionStarted) {
        startedItems.push(el);
      }
    });
    return startedItems;
  };


  // Helper to get existing users
  var checkBidders = function (bidders, bidder) {
    var is = {
      unique: true,
      user  : null
    };

    bidders.map(function (el) {
      el.name === bidder ? is = {unique: false, user: el} : is;
    });

    return is;
  };


  function BidderCtrl (localStorage, $location) {

    // Set user to name url parameter or undefined
    var user = $location.search().name;

    // Assign
    var bidder = this;

    // Set current Bidder
    bidder.currentBidder = user;

    // Set bidders
    bidder.bidders = localStorage.query('bidders');

    // Set auctions
    bidder.auctions = getStartedAuctions(localStorage.query('items'));
    bidder.refresh = refresh;
    bidder.addBidder = addBidder;
    bidder.bid = bid;


    if (bidder.currentBidder) {
      bidder.currentBidder = checkBidders(bidder.bidders, bidder.currentBidder).user;
    }


    // Refresh info
    function refresh () {
      bidder.auctions = getStartedAuctions(localStorage.query('items'));
      bidder.bidders = bidder.bidders = localStorage.query('bidders');
      bidder.currentBidder = checkBidders(bidder.bidders, bidder.currentBidder.name).user;
    };



    // Add a bidder
    function addBidder (user) {
      // Create a fairly crappy not really unique user
      var thisBidder = {
        name    : user.name,
        wonItems: []
      };

      // Make sure use doesn't exist
      var is = checkBidders(bidder.bidders, thisBidder.name);

      $location.search('name', thisBidder.name);
      if (is.unique) {
        // Set the current bidder and save to storage
        bidder.currentBidder = thisBidder;
        localStorage.save('bidders', thisBidder);
      } else {
        bidder.currentBidder = is.user;
      }
    };


    // Bid on an item
    function bid (item, offer) {
      var that = this;
      var currItem = localStorage.get('items', item);

      if (offer.bid <= currItem.obj.currentBid) {
        alert('Bid must be higher than current bid');
      } else {
        currItem = localStorage.update('items', item, {
          highBidder: that.currentBidder.name,
          currentBid: offer.bid
        });
      }

      bidder.auctions.map(function(el) {
        if (el.name === item) {
          el.currentBid = currItem.obj.currentBid;
          el.highBidder = currItem.obj.highBidder;
        }
      });

      // clear input
      offer.bid = '';
    };

  };

}());
