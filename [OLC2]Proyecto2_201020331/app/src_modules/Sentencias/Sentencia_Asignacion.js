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
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Asignacion = /** @class */ (function (_super) {
    __extends(Sentencia_Asignacion, _super);
    function Sentencia_Asignacion(p_id, p_tipo, p_tipo_valor, p_valor, p_pos) {
        var _this = _super.call(this, 0, 0) || this;
        _this.tipo = p_tipo;
        _this.identificador = p_id;
        _this.tipo_valor = p_tipo_valor;
        _this.valor = p_valor;
        _this.posicion = p_pos;
        return _this;
    }
    Sentencia_Asignacion.prototype.ejecutar = function (entorno_local, ptr_entorno) {
        try {
            if (this.tipo == 0) {
                if (Tabla_Simbolos_1.default.existe_simbolo(this.identificador)) {
                    var simbolo_asignar = Tabla_Simbolos_1.default.obtener_simbolo(this.identificador);
                    if (simbolo_asignar != undefined) {
                        if (this.tipo_valor != "" && this.valor instanceof Array) //se quiere instanciar con new Array
                         {
                            if (simbolo_asignar.classRol == 2 /* arreglo */) {
                                if (simbolo_asignar.classTipo == this.get_tipo_primitivo(this.tipo_valor)) {
                                    var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                                    var temporal_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                                    var temporal_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                                    var temporal_fin_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = 1;\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                    for (var i = 0; i < this.valor.length; i++) {
                                        var tam_dim;
                                        if (this.valor[i] instanceof Expresion_1.default) {
                                            tam_dim = this.valor[i].ejecutar();
                                        }
                                        else if (this.valor[i] instanceof Simbolo_1.default) {
                                            tam_dim = this.valor[i];
                                        }
                                        else {
                                            tam_dim = new Simbolo_1.default();
                                        }
                                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                    }
                                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_fin_posicion_heap_array + " = H;\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                    //vamos a asignar valores por defecto a los espacios que vengan
                                    var etiqueta_inicio = "L" + Tabla_Simbolos_1.default.classEtiqueta;
                                    var etiqueta_verdadera = "L" + Tabla_Simbolos_1.default.classEtiqueta;
                                    var etiqueta_falsa = "L" + Tabla_Simbolos_1.default.classEtiqueta;
                                    temporal_posicion_stack_array;
                                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_inicio + ":\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "if(" + temporal_posicion_heap_array + " < " + temporal_fin_posicion_heap_array + ") goto " + etiqueta_verdadera + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_verdadera + ":\n";
                                    if (this.tipo_valor == "boolean") {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n";
                                    }
                                    else if (this.tipo_valor == "int") {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n";
                                    }
                                    else if (this.tipo_valor == "double") {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0.0;\n";
                                    }
                                    else if (this.tipo_valor == "char") {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 3;\n";
                                    }
                                    else if (this.tipo_valor == "String") {
                                        var temporal_pos_heap = "t" + Tabla_Simbolos_1.default.classTemporal;
                                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 32;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 3;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] =  " + temporal_pos_heap + ";\n";
                                    }
                                    else if (this.tipo_valor == "null") {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n";
                                    }
                                    else {
                                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n";
                                    }
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_falsa + ":\n";
                                    var resultado = new Simbolo_1.default();
                                    resultado.classAcceso = 0 /* publico */;
                                    resultado.classRol = 9 /* aceptado */;
                                    resultado.classTipo = 5 /* cadena */;
                                    resultado.classIdentificador = "10-4";
                                    resultado.classValor = "Asignacion realizada correctamente.";
                                    return resultado;
                                }
                                else {
                                    Tabla_Simbolos_1.default.limpiar_3d();
                                    var resultado = new Simbolo_1.default();
                                    resultado.classAcceso = 0 /* publico */;
                                    resultado.classRol = 10 /* error */;
                                    resultado.classTipo = 5 /* cadena */;
                                    resultado.classIdentificador = "33-12";
                                    resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
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
                                resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
                                return resultado;
                            }
                        }
                        else if (this.tipo_valor == "" && this.valor instanceof Array) //se asignara un arrego {{},{}}
                         {
                            if (simbolo_asignar.classRol == 2 /* arreglo */) {
                                var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                                var temporal_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                                var temporal_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                                Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = 1;\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                for (var i = 0; i < this.valor.length; i++) {
                                    var tam_dim = new Simbolo_1.default();
                                    tam_dim.classAcceso = 0 /* publico */;
                                    tam_dim.classRol = 9 /* aceptado */;
                                    tam_dim.classTipo = 2 /* entero */;
                                    tam_dim.classIdentificador = "10-4";
                                    tam_dim.classValor = this.valor[0].length;
                                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                                }
                                Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                Tabla_Simbolos_1.default.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                                for (var x = 0; x < this.valor.length; x++) {
                                    var lista_valores = this.valor[x];
                                    for (var y = 0; y < lista_valores.length; y++) {
                                        var resultado_d;
                                        if (lista_valores[y] instanceof Simbolo_1.default) {
                                            resultado_d = lista_valores[y];
                                        }
                                        else if (lista_valores[y] instanceof Expresion_1.default) {
                                            resultado_d = lista_valores[y].ejecutar();
                                        }
                                        else {
                                            Tabla_Simbolos_1.default.limpiar_3d();
                                            var resultado = new Simbolo_1.default();
                                            resultado.classAcceso = 0 /* publico */;
                                            resultado.classRol = 10 /* error */;
                                            resultado.classTipo = 5 /* cadena */;
                                            resultado.classIdentificador = "33-12";
                                            resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor.";
                                            return resultado;
                                        }
                                        if (resultado_d.classTipo == simbolo_asignar.classTipo) {
                                            Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + resultado_d.classValor + ";\n";
                                            Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                        }
                                        else {
                                            Tabla_Simbolos_1.default.limpiar_3d();
                                            var resultado = new Simbolo_1.default();
                                            resultado.classAcceso = 0 /* publico */;
                                            resultado.classRol = 10 /* error */;
                                            resultado.classTipo = 5 /* cadena */;
                                            resultado.classIdentificador = "33-12";
                                            resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + resultado_d.classTipo + "\" a un arreglo del tipo: \"" + simbolo_asignar.classTipo + "\".";
                                            return resultado;
                                        }
                                    }
                                }
                                var resultado = new Simbolo_1.default();
                                resultado.classAcceso = 0 /* publico */;
                                resultado.classRol = 9 /* aceptado */;
                                resultado.classTipo = 5 /* cadena */;
                                resultado.classIdentificador = "10-4";
                                resultado.classValor = "Asignacion realizada correctamente.";
                                return resultado;
                            }
                            else {
                                Tabla_Simbolos_1.default.limpiar_3d();
                                var resultado = new Simbolo_1.default();
                                resultado.classAcceso = 0 /* publico */;
                                resultado.classRol = 10 /* error */;
                                resultado.classTipo = 5 /* cadena */;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
                                return resultado;
                            }
                        }
                        else {
                            var valor_f;
                            if (this.valor instanceof Expresion_1.default) {
                                valor_f = this.valor.ejecutar();
                            }
                            else if (this.valor instanceof Simbolo_1.default) {
                                valor_f = this.valor;
                            }
                            else {
                                Tabla_Simbolos_1.default.limpiar_3d();
                                var resultado = new Simbolo_1.default();
                                resultado.classAcceso = 0 /* publico */;
                                resultado.classRol = 10 /* error */;
                                resultado.classTipo = 5 /* cadena */;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: No existe un valor definido.";
                                return resultado;
                            }
                            console.log("acceder a: " + simbolo_asignar.classTipo);
                            console.log("valor asignar: " + valor_f.classTipo);
                            if (simbolo_asignar.classTipo == valor_f.classTipo) {
                                Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                                var temporal_pos_stak = "t" + Tabla_Simbolos_1.default.classTemporal;
                                Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_stak + " = P + " + simbolo_asignar.classValor;
                                Tabla_Simbolos_1.default.classCodigo_3D = simbolo_asignar.classValor + " = Stack[" + temporal_pos_stak + "];\n";
                                var resultado = new Simbolo_1.default();
                                resultado.classAcceso = 0 /* publico */;
                                resultado.classRol = 9 /* aceptado */;
                                resultado.classTipo = 5 /* cadena */;
                                resultado.classIdentificador = "10-4";
                                resultado.classValor = "Asignacion realizada correctamente.";
                                return resultado;
                            }
                            else {
                                Tabla_Simbolos_1.default.limpiar_3d();
                                var resultado = new Simbolo_1.default();
                                resultado.classAcceso = 0 /* publico */;
                                resultado.classRol = 10 /* error */;
                                resultado.classTipo = 5 /* cadena */;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: No es posible realizar asignacion de una variable \"" + simbolo_asignar.classTipo + "\" a auna variable \"" + valor_f.classTipo;
                                return resultado;
                            }
                        }
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + this.identificador + "\" no existe:";
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
                    resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + this.identificador + "\" no existe:";
                    return resultado;
                }
            }
            else if (this.tipo == 1) {
                if (Tabla_Simbolos_1.default.existe_simbolo(this.identificador)) {
                    var simbolo_asignar = Tabla_Simbolos_1.default.obtener_simbolo(this.identificador);
                    if (simbolo_asignar != undefined) {
                        var valor_f;
                        if (this.valor instanceof Expresion_1.default) {
                            valor_f = this.valor.ejecutar();
                        }
                        else if (this.valor instanceof Simbolo_1.default) {
                            valor_f = this.valor;
                        }
                        else {
                            Tabla_Simbolos_1.default.limpiar_3d();
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 10 /* error */;
                            resultado.classTipo = 5 /* cadena */;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Asignacion No realizada correctamente: No existe un valor definido.";
                            return resultado;
                        }
                        console.log("acceder a: " + simbolo_asignar.classIdentificador);
                        console.log("valor asignar: " + valor_f.classValor);
                        if (simbolo_asignar.classTipo == valor_f.classTipo) {
                            var etiqueta_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                            var etiqueta_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                            var etiqueta_posicion_length_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                            var etiqueta_length_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                            var etiqueta_length_total_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                            Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_heap_array + " = Stack[" + etiqueta_posicion_stack_array + "];\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_length_array + " = " + etiqueta_posicion_heap_array + " +  0 ;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_length_array + " = Heap[" + etiqueta_posicion_length_array + "];\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_length_total_array + " = " + etiqueta_posicion_heap_array + " + " + simbolo_asignar.classTam + ";\n";
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
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + etiqueta_pos_especifica_array + "] = " + valor_f.classValor + ";\n";
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 9 /* aceptado */;
                            resultado.classTipo = 5 /* cadena */;
                            resultado.classIdentificador = "10-4";
                            resultado.classValor = "Asignacion realizada correctamente.";
                            return resultado;
                        }
                        else {
                            Tabla_Simbolos_1.default.limpiar_3d();
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 10 /* error */;
                            resultado.classTipo = 5 /* cadena */;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Asignacion No realizada correctamente: No es posible realizar asignacion de una variable \"" + simbolo_asignar.classTipo + "\" a auna variable \"" + valor_f.classTipo;
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
                        resultado.classValor = "Asignacion No realizada correctamente: El arreglo \"" + this.identificador + "\" no existe.";
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
                    resultado.classValor = "Asignacion No realizada correctamente: El arreglo \"" + this.identificador + "\" no existe.";
                    return resultado;
                }
            }
            else {
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Impresión NO realizada correctamente: Tipo de Asignación no realizada.";
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
            resultado.classValor = "Asignacion No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    Sentencia_Asignacion.prototype.get_tipo_primitivo = function (p_tipo) {
        if (p_tipo == "boolean") {
            return 1 /* booleano */;
        }
        else if (p_tipo == "int") {
            return 2 /* entero */;
        }
        else if (p_tipo == "double") {
            return 3 /* decimal */;
        }
        else if (p_tipo == "char") {
            return 4 /* caracter */;
        }
        else if (p_tipo == "String") {
            return 5 /* cadena */;
        }
        else if (p_tipo == "null") {
            return 0 /* nulo */;
        }
        else {
            return 6 /* error */;
        }
    };
    return Sentencia_Asignacion;
}(Instruccion_1.default));
exports.default = Sentencia_Asignacion;
