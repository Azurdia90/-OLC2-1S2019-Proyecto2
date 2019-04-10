"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("../routes/index"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.engine('html', require('ejs').renderFile);
        this.config();
    }
    Server.prototype.config = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use(index_1.default);
        this.app.set('port', 3000);
        this.app.set('view engine', 'ejs');
        this.app.set('views', path_1.default.join('./views'));
    };
    Server.prototype.start = function () {
        var _this = this;
        //run the listener 
        this.app.listen(this.app.get('port'), function () {
            console.log('SERVER RUN IN PORT: ', _this.app.get('port'));
        });
    };
    return Server;
}());
var cass_app = new Server();
cass_app.start();
