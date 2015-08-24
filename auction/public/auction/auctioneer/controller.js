'use strict';
(function() {

  var AuctioneerCtrl = function (localStorage) {

    var auctioneer = this;
    var refresh;
    var addAuction;
    var startAuction;
    var endAuction;
    var awardItem;

    auctioneer.refresh = refresh;
    auctioneer.addAuction = addAuction;
    auctioneer.startAuction = startAuction;
    auctioneer.endAuction = endAuction;
    auctioneer.awardItem = awardItem;
    auctioneer.auctions = localStorage.query('items');

    refresh = function () {
      auctioneer.auctions = localStorage.query('items');
    };

    addAuction = function (item, isValid) {
      var itemObj = {
        name           : item.name,
        reserve        : parseFloat(item.reserve, 10),
        currentBid     : 0,
        highBidder     : null,
        auctionStarted : false,
        auctionFinished: false,
        status         : 'pending'
      };

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
        auctioneer.auctions = localStorage.save('items', itemObj);

        // Clear the form
        item.name = '';
        item.reserve = '';
      } else {
        alert('Item Name already exists please pick a unique name.');
      }

      // Focus on the name field
      itemForm.name.focus();
    };

    startAuction = function (item) {
      if (item.auctionStarted) {
        return false;
      }
      auctioneer.auctions = localStorage.update('items', item.name, {
        auctionStarted: true,
        status        : 'In progress'
      });
    };

    endAuction = function (item) {
      // Grab the item
      var thisItem = localStorage.get('items', item).obj;

      // Determine if auction was a failure or not
      var status = thisItem.reserve < thisItem.currentBid ? 'success' : 'failure';

      // Ensure the auction has started
      if (!thisItem.auctionStarted) {
        return false;
      }

      auctioneer.auctions = localStorage.update('items', item, {
        status         : status,
        auctionFinished: true,
        auctionStarted : false
      });

      this.awardItem(thisItem);
    };

    awardItem = function (item) {
      var bidder = localStorage.get('bidders', item.highBidder).obj;
      var biddersWonItems = bidder.wonItems;

      biddersWonItems.push({
        name      : item.name,
        winningBid: item.currentBid
      });

      localStorage.update('bidders', item.highBidder, {
        wonItems: biddersWonItems
      });
    };

  };

  auction.controller('AuctioneerCtrl', AuctioneerCtrl);

}());
