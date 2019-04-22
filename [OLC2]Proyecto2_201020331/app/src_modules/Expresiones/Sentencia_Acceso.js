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
var Expresion_1 = __importDefault(require("./Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Acceso = /** @class */ (function (_super) {
    __extends(Sentencia_Acceso, _super);
    function Sentencia_Acceso(operador, p_tipo, p_posicion) {
        var _this = _super.call(this, operador, "acceso") || this;
        _this.identificador = operador.classIdentificador;
        _this.tipo = p_tipo;
        _this.posicion = p_posicion;
        return _this;
    }
    Sentencia_Acceso.prototype.ejecutar = function () {
        try {
            if (this.tipo == 0) {
                if (Tabla_Simbolos_1.default.existe_simbolo(this.identificador)) {
                    var retorno = Tabla_Simbolos_1.default.obtener_simbolo(this.identificador);
                    if (retorno != undefined) {
                        return retorno;
                    }
                    else {
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }
                }
                else {
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }
            }
            else if (this.tipo == 1) {
                if (Tabla_Simbolos_1.default.existe_simbolo(this.identificador)) {
                    var retorno = Tabla_Simbolos_1.default.obtener_simbolo(this.identificador);
                    if (retorno != undefined) {
                        var etiqueta_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        var etiqueta_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        var etiqueta_posicion_length_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        var etiqueta_length_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        var etiqueta_length_total_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + retorno.classPos + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_heap_array + " = Stack[" + etiqueta_posicion_stack_array + "];\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_length_array + " = " + etiqueta_posicion_heap_array + " + 0 ;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_length_array + " = Heap[" + etiqueta_posicion_length_array + "];\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_length_total_array + " = " + etiqueta_posicion_heap_array + " + " + retorno.classTam + ";\n";
                        var etiqueta_pos_especifica_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                        for (var i = 0; i < this.posicion.length; i++) {
                            var tam_dim;
                            if (this.posicion[i] instanceof Expresion_1.default) {
                                tam_dim = this.posicion[i].ejecutar();
                            }
                            else if (this.posicion[i] instanceof Simbolo_1.default) {
                                tam_dim = this.posicion[i];
                            }
                            else {
                                tam_dim = new Simbolo_1.default();
                            }
                            if (i == 0) {
                                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_pos_especifica_array + " = " + tam_dim.classValor + ";\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " * " + etiqueta_length_array + ";\n";
                            }
                            else {
                                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " + tam_dim.classValor + ";\n";
                            }
                        }
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " + etiqueta_length_total_array + ";\n";
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 9 /* aceptado */;
                        resultado.classTipo = retorno.classTipo;
                        resultado.classIdentificador = retorno.classIdentificador;
                        resultado.classValor = "Heap[" + etiqueta_pos_especifica_array + "]";
                        return resultado;
                    }
                    else {
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "El retorno \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }
                }
                else {
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Acceso No realizado correctamente: Funcionalidad No implementada Aun.";
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
            resultado.classValor = "Acceso No realizado correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Acceso;
}(Expresion_1.default));
exports.default = Sentencia_Acceso;
