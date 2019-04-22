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
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Sentencia_Declaracion_Instancia = /** @class */ (function (_super) {
    __extends(Sentencia_Declaracion_Instancia, _super);
    function Sentencia_Declaracion_Instancia(p_tipo, p_tipo_valor, p_id, p_expresion, p_tipo_valor2, p_expresion2) {
        var _this = _super.call(this, 0, 0) || this;
        _this.tipo = p_tipo;
        _this.tipo_id = p_tipo_valor;
        _this.lista_id = p_id;
        _this.valor = p_expresion;
        _this.tipo_id2 = p_tipo_valor2;
        _this.lista_tam_dim = p_expresion2;
        return _this;
    }
    Sentencia_Declaracion_Instancia.prototype.ejecutar = function (entorno_local, ptr_entorno) {
        try {
            if (this.tipo == 0) {
                var expresion_r;
                if (this.valor instanceof Expresion_1.default) {
                    expresion_r = this.valor.ejecutar();
                    if (expresion_r.classRol == 10 /* error */) {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        return expresion_r;
                    }
                }
                else if (this.valor instanceof Simbolo_1.default) {
                    expresion_r = this.valor;
                    if (expresion_r.classRol == 10 /* error */) {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        return expresion_r;
                    }
                }
                else {
                    if (this.tipo_id == "boolean") {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 1 /* booleano */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0;
                    }
                    else if (this.tipo_id == "int") {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 2 /* entero */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0;
                    }
                    else if (this.tipo_id == "double") {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 3 /* decimal */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0.0;
                    }
                    else if (this.tipo_id == "char") {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 4 /* caracter */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 3;
                    }
                    else if (this.tipo_id == "String") {
                        var temporal_pos_heap = "t" + Tabla_Simbolos_1.default.classTemporal;
                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 32;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 3;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 5 /* cadena */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = temporal_pos_heap;
                        expresion_r.classPos = 0;
                        expresion_r.classTam = 0;
                    }
                    else if (this.tipo_id == "null") {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 0 /* valor */;
                        expresion_r.classTipo = 0 /* nulo */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = -77777;
                    }
                    else {
                        expresion_r = new Simbolo_1.default();
                        expresion_r.classAcceso = 0 /* publico */;
                        expresion_r.classRol = 3 /* objeto */;
                        expresion_r.classTipo = 0 /* nulo */;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = -77777;
                    }
                }
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                for (var i = 0; i < this.lista_id.length; i++) {
                    if (!entorno_local.has(this.lista_id[i])) {
                        var pos_stack = "t" + Tabla_Simbolos_1.default.classTemporal;
                        var codigo_3d = pos_stack + " = P + " + ptr_entorno[0] + ";\n";
                        codigo_3d = codigo_3d
                            + "Stack[" + pos_stack + "] = " + expresion_r.classValor + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = codigo_3d;
                        var simbolo_nuevo = new Simbolo_1.default();
                        simbolo_nuevo.classAcceso = 0 /* publico */;
                        simbolo_nuevo.classRol = 1 /* identificador */;
                        simbolo_nuevo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                        simbolo_nuevo.classIdentificador = this.lista_id[i];
                        simbolo_nuevo.classValor = "Stack[" + pos_stack + "]";
                        simbolo_nuevo.classPos = ptr_entorno[0];
                        simbolo_nuevo.classTam = expresion_r.classTam;
                        entorno_local.set(this.lista_id[i], simbolo_nuevo);
                        resultado.classRol = simbolo_nuevo.classRol;
                        resultado.classTipo = simbolo_nuevo.classTipo;
                        resultado.classIdentificador = simbolo_nuevo.classIdentificador;
                        resultado.classValor = simbolo_nuevo.classValor;
                        resultado.classPos = simbolo_nuevo.classPos;
                        resultado.classTam = simbolo_nuevo.classTam;
                        ptr_entorno[0]++;
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: La variable \"" + this.lista_id[i] + "\" ya existe en el entorno actual.";
                        return resultado;
                    }
                }
                return resultado;
            }
            else if (this.tipo == 1) {
                var dimension_r;
                if (this.valor instanceof Simbolo_1.default) {
                    dimension_r = this.valor;
                    if (dimension_r.classRol == 10 /* error */) {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        return dimension_r;
                    }
                }
                else {
                    Tabla_Simbolos_1.default.limpiar_3d();
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Declaracion No realizada correctamente: las dimensiones del arreglo no pudieron ser definido.";
                    return resultado;
                }
                if (this.tipo_id2 != "" && this.lista_tam_dim != undefined) // si se le instanciara con new    
                 {
                    var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_fin_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    if (this.tipo_id == this.tipo_id2) {
                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = 1;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                        for (var i = 0; i < this.lista_tam_dim.length; i++) {
                            var tam_dim;
                            if (this.lista_tam_dim[i] instanceof Expresion_1.default) {
                                tam_dim = this.lista_tam_dim[i].ejecutar();
                            }
                            else if (this.lista_tam_dim[i] instanceof Simbolo_1.default) {
                                tam_dim = this.lista_tam_dim[i];
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
                        if (this.tipo_id == "boolean") {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n";
                        }
                        else if (this.tipo_id == "int") {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n";
                        }
                        else if (this.tipo_id == "double") {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0.0;\n";
                        }
                        else if (this.tipo_id == "char") {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 3;\n";
                        }
                        else if (this.tipo_id == "String") {
                            var temporal_pos_heap = "t" + Tabla_Simbolos_1.default.classTemporal;
                            Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 32;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 3;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] =  " + temporal_pos_heap + ";\n";
                        }
                        else if (this.tipo_id == "null") {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n";
                        }
                        else {
                            Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n";
                        }
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_falsa + ":\n";
                        var nuevo_arreglo = new Simbolo_1.default();
                        nuevo_arreglo.classAcceso = 0 /* publico */;
                        nuevo_arreglo.classRol = 2 /* arreglo */;
                        nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                        nuevo_arreglo.classIdentificador = this.lista_id[0];
                        nuevo_arreglo.classValor = "Stack[" + temporal_posicion_stack_array + "]";
                        nuevo_arreglo.classPos = ptr_entorno[0];
                        nuevo_arreglo.classTam = this.lista_tam_dim.length;
                        ptr_entorno[0]++;
                        if (!entorno_local.has(this.lista_id[0])) {
                            entorno_local.set(this.lista_id[0], nuevo_arreglo);
                        }
                        else {
                            Tabla_Simbolos_1.default.limpiar_3d();
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 10 /* error */;
                            resultado.classTipo = 5 /* cadena */;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] + "\" ya existe en este contexto.";
                            return resultado;
                        }
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 9 /* aceptado */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "10-4";
                        resultado.classValor = "Declaracion realizada correctamente";
                        return resultado;
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + this.tipo_id2 + "\" a un arreglo del tipo: \"" + this.tipo_id + "\".";
                        return resultado;
                    }
                }
                else if (this.tipo_id2 == "" && this.lista_tam_dim != undefined) // si la instruccion se declara con un arreglo
                 {
                    var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = 1;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                    for (var i = 0; i < this.lista_tam_dim.length; i++) {
                        var tam_dim = new Simbolo_1.default();
                        tam_dim.classAcceso = 0 /* publico */;
                        tam_dim.classRol = 9 /* aceptado */;
                        tam_dim.classTipo = 2 /* entero */;
                        tam_dim.classIdentificador = "10-4";
                        tam_dim.classValor = this.lista_tam_dim[i].length;
                        Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                        Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                    }
                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                    for (var x = 0; x < this.lista_tam_dim.length; x++) {
                        var lista_valores = this.lista_tam_dim[x];
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
                            if (this.get_tipo_primitivo(this.tipo_id) == resultado_d.classTipo) {
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
                                resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + resultado_d.classTipo + "\" a un arreglo del tipo: \"" + this.tipo_id + "\".";
                                return resultado;
                            }
                        }
                    }
                    var nuevo_arreglo = new Simbolo_1.default();
                    nuevo_arreglo.classAcceso = 0 /* publico */;
                    nuevo_arreglo.classRol = 2 /* arreglo */;
                    nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                    nuevo_arreglo.classIdentificador = this.lista_id[0];
                    nuevo_arreglo.classValor = "Stack[" + temporal_posicion_stack_array + "]";
                    nuevo_arreglo.classPos = ptr_entorno[0];
                    nuevo_arreglo.classTam = this.lista_tam_dim.length;
                    ptr_entorno[0]++;
                    if (!entorno_local.has(this.lista_id[0])) {
                        entorno_local.set(this.lista_id[0], nuevo_arreglo);
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] + "\" ya existe en este contexto.";
                        return resultado;
                    }
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "Declaracion realizada correctamente";
                    return resultado;
                }
                else //solo se declarara
                 {
                    var etiqueta_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var etiqueta_posicion_stack_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var etiqueta_posicion_heap_array = "t" + Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_contador + " = 1;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_posicion_heap_array + " = H;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + etiqueta_posicion_stack_array + "] = " + etiqueta_posicion_heap_array + ";\n";
                    var nuevo_arreglo = new Simbolo_1.default();
                    nuevo_arreglo.classAcceso = 0 /* publico */;
                    nuevo_arreglo.classRol = 2 /* arreglo */;
                    nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                    nuevo_arreglo.classIdentificador = this.lista_id[0];
                    nuevo_arreglo.classValor = "Stack[" + etiqueta_posicion_stack_array + "]";
                    nuevo_arreglo.classPos = ptr_entorno[0];
                    nuevo_arreglo.classTam = dimension_r.classValor;
                    ptr_entorno[0]++;
                    if (!entorno_local.has(this.lista_id[0])) {
                        entorno_local.set(this.lista_id[0], nuevo_arreglo);
                    }
                    else {
                        Tabla_Simbolos_1.default.limpiar_3d();
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] + "\" ya existe en este contexto.";
                        return resultado;
                    }
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "Declaración realizada correctamente";
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
                resultado.classValor = "Declaracion No realizada correctamente: Tipo de declaracion no valida";
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
            resultado.classValor = "Declaracion No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    Sentencia_Declaracion_Instancia.prototype.get_tipo_primitivo = function (p_tipo) {
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
    return Sentencia_Declaracion_Instancia;
}(Instruccion_1.default));
exports.default = Sentencia_Declaracion_Instancia;
