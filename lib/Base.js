"use strict";

var assign = require('object-assign');
const Transfer = require('./model/Transfer');

//
// system super class with utils
//

function Base() {
  if (!(this instanceof Base)) {
    return new Base();
  }
}

Base.prototype.hasField = function(obj, field) {
  return (obj && obj.hasOwnProperty(field) && obj[field]);
};

Base.prototype.getProps = function() {
  var tmp = {};
  assign(tmp, this);
  delete tmp.client;
  delete tmp.account;
  return tmp;
};

Base.prototype.dumpJSON = function() {
  return JSON.stringify(this.getProps());
};

Base.prototype.toString = function() {
  return this.dumpJSON();
};

module.exports = Base;
var Transfer = require('./Transfer'), handleError = require('../errorHandler').handleError;
//##CONSTRUCTOR
//
// _args `client`, `data`, and `account` required_
//
//```
// var Buy = require('coinbase').model.Buy;
// var myBuy = new Buy(client, data, account);
//```
// - - -
function Buy(client, data, account) {
  if (!(this instanceof Buy)) {
    return new Buy(client, data, account);
  }
  Transfer.call(this, client, data, account);
}
Buy.prototype = Object.create(Transfer.prototype);
Buy.prototype.commit = function (callback) {

  var opts = {
    'colName': 'buys',
    'ObjFunc': Buy
  };

  this._commit(opts, callback);
};
module.exports = Buy;

