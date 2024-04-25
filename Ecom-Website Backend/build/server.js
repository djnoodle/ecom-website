"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _db = _interopRequireDefault(require("./db.js"));
var _seedProducts = _interopRequireDefault(require("./seed/seedProducts.js"));
var _seedUsers = _interopRequireDefault(require("./seed/seedUsers.js"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireWildcard(require("path"));
var _url = require("url");
var _mongodb = require("mongodb");
var _stream = require("stream");
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(r) { var n = this.s["return"]; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, "throw": function _throw(r) { var n = this.s["return"]; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
var _dirname = _path["default"].dirname((0, _url.fileURLToPath)(import.meta.url));
var assetsPath = _path["default"].join(_dirname, "assets");
var bucketName = "images";
var upload = (0, _multer["default"])();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])("*"));
app.use(_express["default"]["static"]("assets"));
app.post("/upload", upload.any(), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var db, bucket, products, _iterator2, _step2, _loop;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _db["default"])();
        case 3:
          db = _context2.sent;
          bucket = new _mongodb.GridFSBucket(db, {
            bucketName: bucketName
          });
          _context2.next = 7;
          return db.collection("products").find().toArray();
        case 7:
          products = _context2.sent;
          _iterator2 = _createForOfIteratorHelper(products);
          _context2.prev = 9;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var product, productId, imagePath, fileStream, uploadStream;
            return _regenerator["default"].wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  product = _step2.value;
                  productId = product.id;
                  imagePath = _path["default"].join(assetsPath, "".concat(productId, ".jpg"));
                  if (!_fs["default"].existsSync(imagePath)) {
                    _context.next = 9;
                    break;
                  }
                  fileStream = _fs["default"].createReadStream(imagePath);
                  uploadStream = bucket.openUploadStream(productId.toString());
                  fileStream.pipe(uploadStream);
                  _context.next = 9;
                  return new Promise(function (resolve, reject) {
                    uploadStream.on("finish", resolve);
                    uploadStream.on("error", reject);
                  });
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          _iterator2.s();
        case 12:
          if ((_step2 = _iterator2.n()).done) {
            _context2.next = 16;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 14);
        case 14:
          _context2.next = 12;
          break;
        case 16:
          _context2.next = 21;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t1 = _context2["catch"](9);
          _iterator2.e(_context2.t1);
        case 21:
          _context2.prev = 21;
          _iterator2.f();
          return _context2.finish(21);
        case 24:
          res.status(200).send("Images mapped to products successfully");
          _context2.next = 30;
          break;
        case 27:
          _context2.prev = 27;
          _context2.t2 = _context2["catch"](0);
          console.error(_context2.t2);
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[0, 27], [9, 18, 21, 24]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get("/api/products", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var db, products, bucket, _iterator3, _step3, product, downloadStream, chunks, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, imageBuffer;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context3.sent;
          _context3.next = 5;
          return db.collection("products").find({}).toArray();
        case 5:
          products = _context3.sent;
          bucket = new _mongodb.GridFSBucket(db, {
            bucketName: bucketName
          });
          _iterator3 = _createForOfIteratorHelper(products);
          _context3.prev = 8;
          _iterator3.s();
        case 10:
          if ((_step3 = _iterator3.n()).done) {
            _context3.next = 46;
            break;
          }
          product = _step3.value;
          downloadStream = bucket.openDownloadStreamByName(product.id.toString());
          chunks = [];
          _iteratorAbruptCompletion = false;
          _didIteratorError = false;
          _context3.prev = 16;
          _iterator = _asyncIterator(downloadStream);
        case 18:
          _context3.next = 20;
          return _iterator.next();
        case 20:
          if (!(_iteratorAbruptCompletion = !(_step = _context3.sent).done)) {
            _context3.next = 26;
            break;
          }
          chunk = _step.value;
          chunks.push(chunk);
        case 23:
          _iteratorAbruptCompletion = false;
          _context3.next = 18;
          break;
        case 26:
          _context3.next = 32;
          break;
        case 28:
          _context3.prev = 28;
          _context3.t0 = _context3["catch"](16);
          _didIteratorError = true;
          _iteratorError = _context3.t0;
        case 32:
          _context3.prev = 32;
          _context3.prev = 33;
          if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
            _context3.next = 37;
            break;
          }
          _context3.next = 37;
          return _iterator["return"]();
        case 37:
          _context3.prev = 37;
          if (!_didIteratorError) {
            _context3.next = 40;
            break;
          }
          throw _iteratorError;
        case 40:
          return _context3.finish(37);
        case 41:
          return _context3.finish(32);
        case 42:
          imageBuffer = Buffer.concat(chunks);
          product.image = imageBuffer.toString("base64");
        case 44:
          _context3.next = 10;
          break;
        case 46:
          _context3.next = 51;
          break;
        case 48:
          _context3.prev = 48;
          _context3.t1 = _context3["catch"](8);
          _iterator3.e(_context3.t1);
        case 51:
          _context3.prev = 51;
          _iterator3.f();
          return _context3.finish(51);
        case 54:
          res.status(200).json(products);
        case 55:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[8, 48, 51, 54], [16, 28, 32, 42], [33,, 37, 41]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/api/users/:userId/cart", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var db, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context4.sent;
          _context4.next = 5;
          return db.collection("users").findOne({
            id: userId
          });
        case 5:
          user = _context4.sent;
          if (user) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json("Could not find user!"));
        case 8:
          _context4.next = 10;
          return db.collection("products").find({}).toArray();
        case 10:
          products = _context4.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/api/products/:productId", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var db, productId, product;
    return _regenerator["default"].wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context5.sent;
          productId = req.params.productId;
          _context5.next = 6;
          return db.collection("products").findOne({
            id: productId
          });
        case 6:
          product = _context5.sent;
          if (product) {
            res.status(200).json(product);
          } else {
            res.status(404).json("Could not find the product!");
          }
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.post("/api/users/:userId/cart", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var db, userId, productId, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context6.sent;
          userId = req.params.userId;
          productId = req.body.productId;
          _context6.next = 7;
          return db.collection("users").updateOne({
            id: userId
          }, {
            $addToSet: {
              cartItems: productId
            }
          });
        case 7:
          _context6.next = 9;
          return db.collection("users").findOne({
            id: userId
          });
        case 9:
          user = _context6.sent;
          _context6.next = 12;
          return db.collection("products").find({}).toArray();
        case 12:
          products = _context6.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app["delete"]("/api/users/:userId/cart/:productId", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var db, _req$params, productId, userId, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _db["default"])();
        case 2:
          db = _context7.sent;
          _req$params = req.params, productId = _req$params.productId, userId = _req$params.userId;
          _context7.next = 6;
          return db.collection("users").updateOne({
            id: userId
          }, {
            $pull: {
              cartItems: productId
            }
          });
        case 6:
          _context7.next = 8;
          return db.collection("users").findOne({
            id: userId
          });
        case 8:
          user = _context7.sent;
          _context7.next = 11;
          return db.collection("products").find({}).toArray();
        case 11:
          products = _context7.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

//Populate database duplicate check
(0, _seedProducts["default"])();
(0, _seedUsers["default"])();
app.listen(process.env.PORT || 8000, function () {
  console.log("Server is listening on port 8000");
});