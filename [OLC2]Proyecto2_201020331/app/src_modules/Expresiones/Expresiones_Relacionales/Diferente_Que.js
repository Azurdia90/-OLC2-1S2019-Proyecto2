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
var Expresion_1 = __importDefault(require("../Expresion"));
var Simbolo_1 = __importDefault(require("../../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../../Tabla_Simbolos/Tabla_Simbolos"));
var Diferente_Que = /** @class */ (function (_super) {
    __extends(Diferente_Que, _super);
    function Diferente_Que(p_operador1, p_operador2) {
        var _this = _super.call(this, p_operador1, "!=", p_operador2) || this;
        _this.tabla_diferente_que = [
            /*nulo*/ [72 /* diferente_nulo */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [72 /* diferente_nulo */, 60 /* diferente_booleano */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*entero*/ [72 /* diferente_nulo */, 73 /* error */, 58 /* diferente_numerico */, 58 /* diferente_numerico */, 61 /* diferente_numerico_caracter */, 61 /* diferente_numerico_caracter */, 73 /* error */, 73 /* error */],
            /*decimal*/ [72 /* diferente_nulo */, 73 /* error */, 58 /* diferente_numerico */, 58 /* diferente_numerico */, 61 /* diferente_numerico_caracter */, 61 /* diferente_numerico_caracter */, 73 /* error */, 73 /* error */],
            /*caracter*/ [72 /* diferente_nulo */, 73 /* error */, 62 /* diferente_caracter_numerico */, 62 /* diferente_caracter_numerico */, 59 /* diferente_caracter */, 59 /* diferente_caracter */, 73 /* error */, 73 /* error */],
            /*cadena*/ [72 /* diferente_nulo */, 73 /* error */, 62 /* diferente_caracter_numerico */, 62 /* diferente_caracter_numerico */, 59 /* diferente_caracter */, 59 /* diferente_caracter */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */]
        ];
        return _this;
    }
    Diferente_Que.prototype.ejecutar = function () {
        var tipo_diferente_que;
        var valor1;
        var valor2;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion_1.default) {
                valor1 = this.operador1.ejecutar();
            }
            else {
                valor1 = this.operador1;
            }
            if (this.operador2 instanceof Expresion_1.default) {
                valor2 = this.operador2.ejecutar();
            }
            else {
                valor2 = this.operador2;
            }
            if (valor1.classRol == 10 /* error */) {
                return valor1;
            }
            if (valor2.classRol == 10 /* error */) {
                return valor2;
            }
            tipo_diferente_que = this.tabla_diferente_que[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_diferente_que) {
                case 63 /* igual_numerico */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classIdentificador = "10-4";
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 64 /* igual_caracter */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 65 /* igual_booleano */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 66 /* igual_numerico_caracter */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 67 /* igual_caracter_numerico */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 71 /* igual_nulo */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 1 /* booleano */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " != " + valor2.classValor + "\n";
                    return resultado;
                case 73 /* error */:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible relacionar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    return resultado;
                default:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible realizar diferente que, verifique los valores.";
                    return resultado;
            }
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            resultado = new Simbolo_1.default();
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 6 /* error */;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor = "Error: " + Error.message;
            return resultado;
        }
    };
    return Diferente_Que;
}(Expresion_1.default));
exports.default = Diferente_Que;
