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
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Sentencia_Switch_1 = __importDefault(require("./Sentencia_Switch"));
var Sentencia_For_Each = /** @class */ (function (_super) {
    __extends(Sentencia_For_Each, _super);
    function Sentencia_For_Each(p_declaracion, p_arreglo, p_lista_sentencias) {
        var _this = _super.call(this, 0, 0) || this;
        _this.declaracion = p_declaracion;
        _this.arreglo = p_arreglo;
        _this.lista_sentencias = p_lista_sentencias;
        return _this;
    }
    Sentencia_For_Each.prototype.ejecutar = function (entorno_local, ptr_entorno, etiqueta_retorno) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            var valor_declaracion;
            var valor_arreglo;
            var temporal_inicio = "t" + Tabla_Simbolos_1.default.classTemporal;
            var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
            var temporal_tamaño = "t" + Tabla_Simbolos_1.default.classTemporal;
            var temporal_final = "t" + Tabla_Simbolos_1.default.classTemporal;
            var temporal_pos_var = "t" + Tabla_Simbolos_1.default.classTemporal;
            var etiqueta_inicio = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_verdadero = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_continuar = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_falso = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            valor_declaracion = this.declaracion.ejecutar(this.entorno_local, ptr_entorno);
            if (valor_declaracion.classRol == 10 /* error */) {
                Tabla_Simbolos_1.default.limpiar_3d();
                return valor_declaracion;
            }
            valor_arreglo = this.arreglo.ejecutar();
            if (valor_arreglo.classRol != 2 /* arreglo */) {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia For Each No realizada correctamente: Se deben utilizar Arreglos o ArrayList para esta Sentencia.";
                return resultado;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_inicio + " = " + valor_arreglo.classValor + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_tamaño + " = 1;\n";
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_inicio + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_inicio + " = " + temporal_inicio + " + " + valor_arreglo.classTam + ";\n";
            for (var t = 0; t < valor_arreglo.classTam; t++) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_tamaño + " = " + temporal_tamaño + " * " + "Heap[" + temporal_contador + "];\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_contador + " + 1;\n";
            }
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_final + " = " + temporal_inicio + " + " + temporal_tamaño + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_inicio + ":\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "if(" + temporal_inicio + " < " + temporal_final + ") goto " + etiqueta_verdadero + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_falso + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_verdadero + ":\n";
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_var + " = P + " + valor_declaracion.classPos + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_pos_var + "] = Heap[" + temporal_inicio + "];\n";
            for (var i = 0; i < this.lista_sentencias.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_sentencias[i];
                if (sentencia instanceof Sentencia_Break_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_falso);
                }
                else if (sentencia instanceof Sentencia_Continue_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_continuar);
                }
                else if (sentencia instanceof Sentencia_Return_1.default) //pendiente ceremonia cambio de ambito
                 {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else if (sentencia instanceof Sentencia_If_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_falso, etiqueta_continuar);
                }
                else if (sentencia instanceof Sentencia_Switch_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                if (resultado_sentencia.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_continuar + ":\n";
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_inicio + " = " + temporal_inicio + " + 1;\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_falso + ":\n";
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia For Each realizada correctamente";
            return resultado;
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia For Each No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_For_Each;
}(Instruccion_1.default));
exports.default = Sentencia_For_Each;
