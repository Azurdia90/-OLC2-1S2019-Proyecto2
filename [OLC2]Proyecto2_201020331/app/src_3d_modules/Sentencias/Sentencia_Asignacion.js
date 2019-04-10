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
var Tabla_Simbolos_1 = __importDefault(require("../Estructuras/Tabla_Simbolos"));
var Sentencia_Asignacion = /** @class */ (function (_super) {
    __extends(Sentencia_Asignacion, _super);
    function Sentencia_Asignacion(p_id, p_tipo, p_expresion, p_pos) {
        var _this = _super.call(this, 0, 0) || this;
        _this.id = p_id;
        _this.tipo = p_tipo;
        _this.valor = p_expresion;
        _this.posicion = p_pos;
        return _this;
    }
    Sentencia_Asignacion.prototype.ejecutar = function (entorno_local) {
        try {
            if (this.tipo == 0 || this.tipo == 1) { //variables etiquetas
                if (entorno_local != undefined && Tabla_Simbolos_1.default.existe_simbolo(this.id)) {
                    var resultado_valor = this.valor.ejecutar(entorno_local);
                    if (resultado_valor.classTam != -12) {
                        var simbolo_nuevo = new Simbolo_1.default(resultado_valor.classValor, 1);
                        var etiq_var = Tabla_Simbolos_1.default.obtener_simbolo(this.id);
                        if (etiq_var != undefined) {
                            etiq_var.classValor = simbolo_nuevo.classValor;
                            etiq_var.classTam = simbolo_nuevo.classTam;
                            return new Simbolo_1.default(-10, -4);
                        }
                        else {
                            return new Simbolo_1.default(-33, -12);
                        }
                    }
                    else {
                        new Simbolo_1.default(-33, -12);
                    }
                    return new Simbolo_1.default(-33, -12);
                }
                else {
                    return new Simbolo_1.default(-33, -12);
                }
            }
            else if (this.tipo == 2) {
                if (this.posicion != undefined) {
                    var resultado_valor = this.valor.ejecutar(entorno_local);
                    var resultado_posicion = this.posicion.ejecutar(entorno_local);
                    if (resultado_valor.classTam != -12 || resultado_posicion.classTam != -12) {
                        var simbolo_nuevo = new Simbolo_1.default(resultado_valor.classValor, resultado_valor.classTam);
                        if (Tabla_Simbolos_1.default.classStack.classTamaño > resultado_posicion.classValor) {
                            var pos_mod = Tabla_Simbolos_1.default.classStack.obtener(resultado_posicion.classValor);
                            console.log("si habia memoria suficiente");
                            pos_mod.classValor = simbolo_nuevo.classValor;
                            pos_mod.classTam = simbolo_nuevo.classTam;
                            return new Simbolo_1.default(-10, -4);
                        }
                        else {
                            var dif = (resultado_posicion.classValor - Tabla_Simbolos_1.default.classStack.classTamaño) + 3;
                            for (var i = Tabla_Simbolos_1.default.classStack.classTamaño; i < dif; i++) {
                                Tabla_Simbolos_1.default.classStack.agregar(new Simbolo_1.default(0, 1));
                            }
                            var pos_mod = Tabla_Simbolos_1.default.classStack.obtener(resultado_posicion.classValor);
                            console.log("no habia memoria suficiente");
                            pos_mod.classValor = simbolo_nuevo.classValor;
                            pos_mod.classTam = simbolo_nuevo.classTam;
                            return new Simbolo_1.default(-10, -4);
                        }
                    }
                    else {
                        new Simbolo_1.default(-33, -12);
                    }
                }
                return new Simbolo_1.default(-33, -12);
            }
            else if (this.tipo == 3) {
                if (this.posicion != undefined) {
                    var resultado_valor = this.valor.ejecutar(entorno_local);
                    var resultado_posicion = this.posicion.ejecutar(entorno_local);
                    if (resultado_valor.classTam != -12 || resultado_posicion.classTam != -12) {
                        var simbolo_nuevo = new Simbolo_1.default(resultado_valor.classValor, resultado_valor.classTam);
                        if (Tabla_Simbolos_1.default.classHeap.classTamaño > resultado_posicion.classValor) {
                            var pos_mod = Tabla_Simbolos_1.default.classHeap.obtener(resultado_posicion.classValor);
                            console.log("si habia memoria suficiente");
                            pos_mod.classValor = simbolo_nuevo.classValor;
                            pos_mod.classTam = simbolo_nuevo.classTam;
                            return new Simbolo_1.default(-10, -4);
                        }
                        else {
                            var dif = (resultado_posicion.classValor - Tabla_Simbolos_1.default.classHeap.classTamaño) + 3;
                            for (var i = Tabla_Simbolos_1.default.classHeap.classTamaño; i < dif; i++) {
                                Tabla_Simbolos_1.default.classHeap.agregar(new Simbolo_1.default(0, 1));
                            }
                            var pos_mod = Tabla_Simbolos_1.default.classHeap.obtener(resultado_posicion.classValor);
                            console.log("no habia memoria suficiente");
                            pos_mod.classValor = simbolo_nuevo.classValor;
                            pos_mod.classTam = simbolo_nuevo.classTam;
                            return new Simbolo_1.default(-10, -4);
                        }
                    }
                    else {
                        new Simbolo_1.default(-33, -12);
                    }
                }
                return new Simbolo_1.default(-33, -12);
            }
            else {
                return new Simbolo_1.default(-33, -12);
            }
        }
        catch (Error) {
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_Asignacion;
}(Instruccion_1.default));
exports.default = Sentencia_Asignacion;
