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
var Sentencia_Continue = /** @class */ (function (_super) {
    __extends(Sentencia_Continue, _super);
    function Sentencia_Continue(p_etiqueta) {
        var _this = _super.call(this, 0, 0) || this;
        _this.etiqueta = p_etiqueta;
        return _this;
    }
    Sentencia_Continue.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_inicio) {
        try {
            if (etiqueta_inicio != undefined) {
                Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 9 /* aceptado */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Sentencia Continue realizada correctamente";
                return resultado;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Continue NO realizada: No fue especificada la etiqueta de salida.";
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
            resultado.classValor = "Sentencia Continue NO realizada: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Continue;
}(Instruccion_1.default));
exports.default = Sentencia_Continue;
