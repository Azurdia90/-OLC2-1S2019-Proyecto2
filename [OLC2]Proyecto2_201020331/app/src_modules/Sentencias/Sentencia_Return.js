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
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Return = /** @class */ (function (_super) {
    __extends(Sentencia_Return, _super);
    function Sentencia_Return(p_etiqueta, p_retorno) {
        var _this = _super.call(this, 0, 0) || this;
        _this.etiqueta = p_etiqueta;
        _this.retorno = p_retorno;
        return _this;
    }
    Sentencia_Return.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_fin) {
        try {
            if (etiqueta_fin != undefined) {
                if (this.retorno == undefined) {
                    Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
                }
                else {
                    //escribir ceremonia de cambio de ambito al metodo anterior....
                    Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
                }
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 9 /* aceptado */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Sentencia Break realizada correctamente";
                return resultado;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Break NO realizada: No fue especificada la etiqueta de salida.";
                return resultado;
            }
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Break NO realizada: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Return;
}(Instruccion_1.default));
exports.default = Sentencia_Return;
