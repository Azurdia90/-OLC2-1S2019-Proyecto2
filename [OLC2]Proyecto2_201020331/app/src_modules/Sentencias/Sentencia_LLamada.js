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
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Sentencia_LLamada = /** @class */ (function (_super) {
    __extends(Sentencia_LLamada, _super);
    function Sentencia_LLamada(p_identificador, p_lista_parametros, p_lista_metodos) {
        var _this = _super.call(this, new Simbolo_1.default(), "call") || this;
        _this.identificador = p_identificador;
        _this.lista_parametros = p_lista_parametros;
        _this.lista_metodos = p_lista_metodos;
        return _this;
    }
    Sentencia_LLamada.prototype.ejecutar = function (entorno_padre, ptr_entorno) {
        try {
            var pas = false;
            var metodo_encontrado;
            for (var i = 0; i < Tabla_Simbolos_1.default.classLista_parametros.length; i++) {
                pas = this.verificar_metodo(entorno_padre, ptr_entorno, Tabla_Simbolos_1.default.classLista_parametros[i]);
                if (pas) {
                    metodo_encontrado = Tabla_Simbolos_1.default.classLista_parametros[i];
                    break;
                }
            }
            if (pas == true && metodo_encontrado != undefined) {
                var tam_metodo = ptr_entorno[0];
                var temporal_simulado = "t" + Tabla_Simbolos_1.default.classTemporal;
                var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                var temporal_pos_return = "t" + Tabla_Simbolos_1.default.classTemporal;
                var temporal_retorno = "t" + Tabla_Simbolos_1.default.classTemporal;
                Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                for (var i = 0; i < this.lista_parametros.length; i++) {
                    var par = this.lista_parametros[i];
                    var resul;
                    if (par instanceof Expresion_1.default) {
                        resul = par.ejecutar();
                    }
                    else if (par instanceof Simbolo_1.default) {
                        resul = par;
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Sentencia Llamada NO realizada: los parametros no pudieron ser definidos";
                        return resultado;
                    }
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " + " + (i + 2) + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + resul.classValor + ";\n";
                }
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call " + this.identificador + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 0 /* valor */;
                resultado.classTipo = metodo_encontrado.classTipo;
                resultado.classIdentificador = metodo_encontrado.classIdentificador;
                resultado.classValor = temporal_retorno;
                return resultado;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Llamada NO realizada: Metodo no encontrado";
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
            resultado.classValor = "Sentencia Llamada NO realizada: " + Error.Message;
            return resultado;
        }
    };
    Sentencia_LLamada.prototype.verificar_metodo = function (entorno_padre, ptr_entorno, metodo_analizar) {
        if (this.identificador != metodo_analizar.classIdentificador) {
            return false;
        }
        if (this.lista_parametros.length != metodo_analizar.classLista_parametros.length) {
            return false;
        }
        for (var i = 0; i < this.lista_parametros.length; i++) {
            if (this.lista_parametros[i] instanceof Simbolo_1.default) {
                if (this.lista_parametros[i].classTipo != metodo_analizar.classLista_parametros[i].classTipo) {
                    return false;
                }
            }
            else if (this.lista_parametros[i] instanceof Expresion_1.default) {
                var expresion = this.lista_parametros[i].evaluar(entorno_padre, ptr_entorno);
                console.log(expresion.Tipo);
                console.log(metodo_analizar.classLista_parametros[i].classTipo);
                if (expresion.classTipo != metodo_analizar.classLista_parametros[i].classTipo) {
                    if (!((expresion.classTipo == 2 /* entero */ || expresion.classTipo == 3 /* decimal */) && (metodo_analizar.classLista_parametros[i].classTipo == 2 /* entero */ || metodo_analizar.classLista_parametros[i].classTipo == 3 /* decimal */))) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    return Sentencia_LLamada;
}(Expresion_1.default));
exports.default = Sentencia_LLamada;
