'use strict';

// var mocha = require('mocha');
// var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var ConFinder = require('../conFinder');
var test = new ConFinder();
var find = test.find;

describe("Consecutive number finder", function () {
  it("should find runs of 3 consecutive numbers acending", function () {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(find(arr)).to.deep.equal([0, 1, 2, 3, 4, 5, 6]);
  });
  it("should find runs of 3 concsecutive numbers descending", function () {
    var arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    expect(find(arr)).to.deep.equal([0, 1, 2, 3, 4, 5, 6]);
  });
  it("should find both ascending and descending runs of 3 consecutive numbers", function () {
    var arr = [1, 2, 3, 5, 10, 9, 8, 9, 10, 11, 7];

    expect(find(arr)).to.deep.equal([0, 4, 6, 7]);
  });
  it("should return an empty array if no runs of 3 consecutive numbers are found", function () {
    var arr = [1, 5, 6, 8, 9, 8, 6, 15];

    expect(find(arr)).to.deep.equal([]);
  })
});