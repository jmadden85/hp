'use strict';
auction.controller('AuctioneerCtrl', function (localStorage, $interval) {
  var auctioneer = this;

  auctioneer.auctions = localStorage.query('items');


  auctioneer.refresh = function () {
    auctioneer.auctions = localStorage.query('items');
  };

  auctioneer.addAuction = function (item, isValid) {
    // Make sure this item doesn't exist
    var checkAuctions = function (items, item) {
      var unique = true;
      items.map(function (el) {
        el.name === item ? unique = false : unique;
      });
      return unique;
    };
    var isUnique = checkAuctions(auctioneer.auctions, item.name);

    // If it's unique and the form is valid add the item
    if (isUnique && isValid) {
      var itemObj = {
        name: item.name,
        reserve: parseFloat(item.reserve, 10),
        currentBid: 0,
        highBidder: null,
        auctionStarted: false,
        auctionFinished: false,
        status: 'pending'
      };

      auctioneer.auctions = localStorage.save('items', itemObj);
      // Clear the form and focus on item name
      itemForm.name.focus();
      item.name = '';
      item.reserve = '';
    } else {
      alert('Item Name already exists please pick a unique name.');
    }
  };

  auctioneer.startAuction = function (item) {
    if (item.auctionStarted) {
      return false;
    }
    auctioneer.auctions = localStorage.update('items', item.name, {
      auctionStarted: true,
      status: 'In progress'
    });
  };

  auctioneer.endAuction = function (item) {
    // Grab the item
    var thisItem = localStorage.get('items', item).obj;
    // Ensure the auction has started
    if (!thisItem.auctionStarted) {
      return false;
    }
    // Determine if auction was a failure or not
    var status = thisItem.reserve < thisItem.currentBid ? 'success' : 'failure';

    auctioneer.auctions = localStorage.update('items', item, {
      status: status,
      auctionFinished: true,
      auctionStarted: false
    });
    this.awardItem(thisItem);
  };

  auctioneer.awardItem = function (item) {
    var bidder = localStorage.get('bidders', item.highBidder).obj;
    var biddersWonItems = bidder.wonItems;

    biddersWonItems.push({
      name: item.name,
      winningBid: item.currentBid
    });

    localStorage.update('bidders', item.highBidder, {
      wonItems: biddersWonItems
    });
  };

});
