"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Tabla_Simbolos/Simbolo"));
var Suma_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Suma"));
var Sentencia_Imprimir_1 = __importDefault(require("./Sentencias/Sentencia_Imprimir"));
var Resta_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Resta"));
var Multiplicacion_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Multiplicacion"));
var Division_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Division"));
var Modulo_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Modulo"));
var Menor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Que"));
var Mayor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Que"));
var Menor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Igual_Que"));
var Mayor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que"));
var Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Igual_Que"));
var Diferente_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Diferente_Que"));
var And_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/And"));
var Or_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/Or"));
var Not_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/Not"));
var AST = /** @class */ (function () {
    function AST(psuperjason) {
        this.superjason = psuperjason;
        this.build_ast();
    }
    AST.prototype.build_ast = function () {
        var instruccion_begin = this.fabrica_instrucciones(this.superjason);
        this.exec_ast(instruccion_begin);
    };
    AST.prototype.exec_ast = function (instruccions) {
        instruccions.ejecutar();
    };
    AST.prototype.fabrica_instrucciones = function (subsuperrjason) {
        if (subsuperrjason['etiqueta'] == "sentencia_imprimir") {
            var expresion = this.fabrica_instrucciones(subsuperrjason['valor']);
            var sentencia_imprimir = new Sentencia_Imprimir_1.default(expresion);
            return sentencia_imprimir;
        }
        else if (subsuperrjason['etiqueta'] == "expresion") {
            console.log("expresion");
            this.fabrica_instrucciones(subsuperrjason['valor']);
        }
        else if (subsuperrjason['etiqueta'] == "expresion_aritmetica") {
            if (subsuperrjason['tipo'] == "+") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_suma = new Suma_1.default(operador1, operador2);
                return nueva_suma;
            }
            else if (subsuperrjason['tipo'] == "-") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_resta = new Resta_1.default(operador1, operador2);
                return nueva_resta;
            }
            else if (subsuperrjason['tipo'] == "*") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion_1.default(operador1, operador2);
                return nueva_multiplicacion;
            }
            else if (subsuperrjason['tipo'] == "/") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_division = new Division_1.default(operador1, operador2);
                return nueva_division;
            }
            else if (subsuperrjason['tipo'] == "%") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_modulo = new Modulo_1.default(operador1, operador2);
                return nuevo_modulo;
            }
        }
        else if (subsuperrjason['etiqueta'] == "expresion_relacional") {
            if (subsuperrjason['tipo'] == "<") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_menor_que = new Menor_Que_1.default(operador1, operador2);
                return nuevo_menor_que;
            }
            else if (subsuperrjason['tipo'] == ">") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que_1.default(operador1, operador2);
                return nuevo_mayor_que;
            }
            else if (subsuperrjason['tipo'] == "<=") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que_1.default(operador1, operador2);
                return nuevo_menor_igual_que;
            }
            else if (subsuperrjason['tipo'] == ">=") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que_1.default(operador1, operador2);
                return nuevo_mayor_igual_que;
            }
            else if (subsuperrjason['tipo'] == "==") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_igual_que = new Igual_Que_1.default(operador1, operador2);
                return nuevo_igual_que;
            }
            else if (subsuperrjason['tipo'] == "!=") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que_1.default(operador1, operador2);
                return nuevo_diferente_que;
            }
        }
        else if (subsuperrjason['etiqueta'] == "expresion_logica") {
            if (subsuperrjason['tipo'] == "&&") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_and = new And_1.default(operador1, operador2);
                return nuevo_and;
            }
            else if (subsuperrjason['tipo'] == "||") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_or = new Or_1.default(operador1, operador2);
                return nuevo_or;
            }
            else if (subsuperrjason['tipo'] == "!") {
                var operador1 = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var nuevo_not = new Not_1.default(operador1);
                return nuevo_not;
            }
        }
        else if (subsuperrjason['etiqueta'] == "expresion_unaria") {
            console.log("expresion_unaria");
            this.fabrica_instrucciones(subsuperrjason['operador1']);
            console.log(subsuperrjason['tipo']);
        }
        else if (subsuperrjason['etiqueta'] == "valor_primitivo") {
            var nuevo_simbolo = new Simbolo_1.default();
            nuevo_simbolo.classAcceso = 0 /* publico */;
            nuevo_simbolo.classRol = 0 /* valor */;
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsuperrjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";
            nuevo_simbolo.classValor = subsuperrjason['valor'];
            return nuevo_simbolo;
        }
        else {
            console.log("etiqueta erronea: " + subsuperrjason['etiqueta']);
        }
    };
    AST.prototype.get_tipo_primitivo = function (p_tipo) {
        if (p_tipo == "booleano") {
            return 1 /* booleano */;
        }
        else if (p_tipo == "entero") {
            return 2 /* entero */;
        }
        else if (p_tipo == "decimal") {
            return 3 /* decimal */;
        }
        else if (p_tipo == "caracter") {
            return 4 /* caracter */;
        }
        else if (p_tipo == "cadena") {
            return 5 /* cadena */;
        }
        else if (p_tipo == "nulo") {
            return 0 /* nulo */;
        }
        else {
            return 6 /* error */;
        }
    };
    return AST;
}());
exports.default = AST;
