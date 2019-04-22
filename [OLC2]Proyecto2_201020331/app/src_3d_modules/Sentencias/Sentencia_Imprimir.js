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
var Tabla_Simbolos_1 = __importDefault(require("../Estructuras/Tabla_Simbolos"));
var Simbolo_1 = __importDefault(require("../Estructuras/Simbolo"));
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Sentencia_Imprimir = /** @class */ (function (_super) {
    __extends(Sentencia_Imprimir, _super);
    function Sentencia_Imprimir(p_tipo_dato, p_id) {
        var _this = _super.call(this, 0, 0) || this;
        _this.id = p_id;
        _this.pos_stack = 0;
        _this.tipo_dato = p_tipo_dato;
        return _this;
    }
    Sentencia_Imprimir.prototype.ejecutar = function (entorno_local) {
        try {
            if (entorno_local != undefined && (Tabla_Simbolos_1.default.existe_simbolo(this.id))) {
                var resultado = Tabla_Simbolos_1.default.obtener_simbolo(this.id);
                if (resultado != undefined) {
                    if (this.tipo_dato == "%e") {
                        Tabla_Simbolos_1.default.classConsola = (resultado.classValor).toFixed(0);
                    }
                    else if (this.tipo_dato == "%d") {
                        Tabla_Simbolos_1.default.classConsola = (resultado.classValor).toFixed(2);
                    }
                    else if (this.tipo_dato == "%c") {
                        Tabla_Simbolos_1.default.classConsola = String.fromCharCode(resultado.classValor);
                    }
                    else {
                        console.log("Error Tipo Dato no reconocido");
                    }
                }
                else {
                    console.log("nulo");
                }
                return new Simbolo_1.default(-10, -4);
            }
            console.log("entorno esta muerto en sentencia imprimir");
            return new Simbolo_1.default(-33, -12);
        }
        catch (Error) {
            console.log("Hubo un error al imprimir: " + Error.Message);
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_Imprimir;
}(Instruccion_1.default));
exports.default = Sentencia_Imprimir;
