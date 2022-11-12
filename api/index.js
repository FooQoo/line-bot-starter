'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// Import all dependencies, mostly using destructuring for better view.
var bot_sdk_1 = require('@line/bot-sdk');
var express_1 = __importDefault(require('express'));
if ((process.env.NODE_ENV = 'development')) {
  var dotenv = require('dotenv');
  dotenv.config();
}
// Setup all LINE client and Express configurations.
var clientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};
var middlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};
var PORT = process.env.PORT || 3000;
// Create a new LINE SDK client.
var client = new bot_sdk_1.Client(clientConfig);
// Create a new Express application.
var app = (0, express_1.default)();
// Function handler to receive the text.
var textEventHandler = function (event) {
  return __awaiter(void 0, void 0, void 0, function () {
    var replyToken, text, response;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Process all variables here.
          if (event.type !== 'message' || event.message.type !== 'text') {
            return [2 /*return*/];
          }
          replyToken = event.replyToken;
          text = event.message.text;
          response = {
            type: 'text',
            text: text,
          };
          // Reply to the user.
          return [4 /*yield*/, client.replyMessage(replyToken, response)];
        case 1:
          // Reply to the user.
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));
// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get('/', function (_, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        res.status(200).json({
          status: 'success',
          message: 'Connected successfully!',
        }),
      ];
    });
  });
});
// This route is used for the Webhook.
app.post(
  '/webhook',
  (0, bot_sdk_1.middleware)(middlewareConfig),
  function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var events, results;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            events = req.body.events;
            return [
              4 /*yield*/,
              Promise.all(
                events.map(function (event) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var err_1;
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          _a.trys.push([0, 2, , 3]);
                          return [4 /*yield*/, textEventHandler(event)];
                        case 1:
                          _a.sent();
                          return [3 /*break*/, 3];
                        case 2:
                          err_1 = _a.sent();
                          if (err_1 instanceof Error) {
                            console.error(err_1);
                          }
                          // Return an error message.
                          return [
                            2 /*return*/,
                            res.status(500).json({
                              status: 'error',
                            }),
                          ];
                        case 3:
                          return [2 /*return*/];
                      }
                    });
                  });
                })
              ),
            ];
          case 1:
            results = _a.sent();
            // Return a successfull message.
            return [
              2 /*return*/,
              res.status(200).json({
                status: 'success',
                results: results,
              }),
            ];
        }
      });
    });
  }
);
if (process.env.NODE_ENV == 'development') {
  // Create a server and listen to it.
  app.listen(PORT, function () {
    console.log('Application is live and listening on port '.concat(PORT));
  });
}

module.exports = app;
