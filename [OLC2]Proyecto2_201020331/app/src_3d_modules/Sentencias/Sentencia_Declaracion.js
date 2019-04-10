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
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Simbolo_1 = __importDefault(require("../Estructuras/Simbolo"));
var Sentencia_Declaracion = /** @class */ (function (_super) {
    __extends(Sentencia_Declaracion, _super);
    function Sentencia_Declaracion(p_id, p_expresion) {
        var _this = _super.call(this, 0, 0) || this;
        _this.lista_id = p_id;
        _this.valor = p_expresion;
        return _this;
    }
    Sentencia_Declaracion.prototype.ejecutar = function (entorno_local) {
        try {
            for (var i = 0; i < this.lista_id.length; i++) {
                console.log("se declarara variable: " + this.lista_id[i]);
                if (entorno_local != undefined && !(entorno_local.has(this.lista_id[i]))) {
                    if (this.valor != undefined) {
                        var resultado_valor = this.valor.ejecutar(entorno_local);
                        if (resultado_valor.classTam != -12) {
                            console.log("el valor de la expresion es: " + resultado_valor.classValor);
                            var simbolo_nuevo = new Simbolo_1.default(resultado_valor.classValor, resultado_valor.classTam);
                            entorno_local.set(this.lista_id[i], simbolo_nuevo);
                        }
                        else {
                            new Simbolo_1.default(-33, -12);
                        }
                    }
                    else {
                        var simbolo_nuevo = new Simbolo_1.default(-10, -4);
                        entorno_local.set(this.lista_id[i], simbolo_nuevo);
                    }
                }
                else {
                    console.log("entorno esta muerto en sentencia declaracion");
                    return new Simbolo_1.default(-33, -12);
                }
            }
            return new Simbolo_1.default(-10, -4);
        }
        catch (Error) {
            console.log("Error: " + Error.Message);
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_Declaracion;
}(Instruccion_1.default));
exports.default = Sentencia_Declaracion;
