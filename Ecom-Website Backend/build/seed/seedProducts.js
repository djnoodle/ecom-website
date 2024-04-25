"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = seedProducts;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../db.js"));
var _productsData = _interopRequireDefault(require("./productsData.js"));
function seedProducts() {
  return _seedProducts.apply(this, arguments);
}
function _seedProducts() {
  _seedProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var db, products, toInsert;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context.sent;
          _context.next = 5;
          return db.collection("products").find({}).toArray();
        case 5:
          products = _context.sent;
          toInsert = _productsData["default"].filter(function (product) {
            return !products.some(function (prod) {
              return prod.id === product.id;
            });
          });
          if (toInsert.length) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return");
        case 9:
          db.collection("products").insertMany(toInsert);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _seedProducts.apply(this, arguments);
}