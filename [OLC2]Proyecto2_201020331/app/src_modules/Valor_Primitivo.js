"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Expresion_1 = __importDefault(require("./Expresion"));
var Valor_Primitivo = /** @class */ (function (_super) {
    __extends(Valor_Primitivo, _super);
    function Valor_Primitivo() {
        var _this = _super.call(this, "", "primitivo", "") || this;
        _this.simbolo_valor = new Simbolo_1.default();
        return _this;
    }
    Valor_Primitivo.prototype.ejecutar = function () {
        return this.simbolo_valor;
    };
    return Valor_Primitivo;
}(Expresion_1.default));
exports.default = Valor_Primitivo;
