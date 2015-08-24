'use strict';
'use strict';
auction.controller('BidderCtrl', function (localStorage, $interval, $location) {
  var bidder = this;

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
      user: null
    };
    bidders.map(function (el) {
      el.name === bidder ? is = {unique: false, user: el} : is;
    });
    return is;
  };

  // Set user to name url parameter or undefined
  var user = $location.search().name;
  bidder.currentBidder = user;
  // Grab bidders
  bidder.bidders = localStorage.query('bidders');

  if (bidder.currentBidder) {
    bidder.currentBidder = checkBidders(bidder.bidders, bidder.currentBidder).user;
  }

  bidder.auctions = getStartedAuctions(localStorage.query('items'));

  bidder.refresh = function () {
    bidder.auctions = getStartedAuctions(localStorage.query('items'));
    bidder.bidders = bidder.bidders = localStorage.query('bidders');
    bidder.currentBidder = checkBidders(bidder.bidders, bidder.currentBidder.name).user;
  };


  bidder.addBidder = function (user) {
    // Create a fairly crappy not really unique user
    var thisBidder = {
      name: user.name,
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

  bidder.bid = function (item, offer, currentBid) {
    if (offer.bid <= currentBid) {
      alert('Bid must be higher than current bid');
      return false;
    }
    var that = this;
    var auctions = localStorage.update('items', item, {
      highBidder: that.currentBidder.name,
      currentBid: offer.bid
    });

    bidder.auctions.map(function(el, i) {
      if (el.name === item) {
        el.currentBid = offer.bid;
        el.highBidder = that.currentBidder.name;
      }
    });
    offer.bid = '';
  };

});