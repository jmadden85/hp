'use strict';

var ConFinder = function () {

};

ConFinder.prototype.find = function (array) {
  var runIndex = [];

  var findRuns = function (a, index, arr) {
    var length = arr.length;

    // Next 2 values in the array
    var b = arr[index + 1];
    var c = arr[index + 2];

    // Check for a ascending run
    var ascRun = a + 1 === b && b + 1 === c;

    // Check for a descending run
    var descRun = a - 1 === b && b - 1 === c;

    // If either desc or asc is true there is a run
    var run = ascRun || descRun;

    // ensure we aren't within 2 iterations of the end of the array and that there is a run
    if (length - 2 > index && run) {
      runIndex.push(index);
    }
  };

  array.map(findRuns);

  return runIndex;
};

module.exports = ConFinder;
