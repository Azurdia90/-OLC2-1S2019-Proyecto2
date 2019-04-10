"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Tabla_Simbolos_js_1 = __importDefault(require("../src_modules/Tabla_Simbolos/Tabla_Simbolos.js"));
var caas_grammar_js_1 = __importDefault(require("../src_modules/caas_grammar.js"));
var AST_CAAS_js_1 = __importDefault(require("../src_modules/AST_CAAS.js"));
var Tabla_Simbolos_js_2 = __importDefault(require("../src_3d_modules/Estructuras/Tabla_Simbolos.js"));
var _3d_grammar_js_1 = __importDefault(require("../src_3d_modules/3d_grammar.js"));
var AST_3D_js_1 = __importDefault(require("../src_3d_modules/AST_3D.js"));
var Routes = /** @class */ (function () {
    function Routes() {
        this.router = express_1.Router();
        this.config();
    }
    Routes.prototype.config = function () {
        this.router.get('/', function (req, res) {
            res.render('index.html');
        });
        this.router.post('/traducir', function (req, res) {
            var entrada = req.body.varTxtEditor;
            if (entrada != "") {
                var resultado = caas_grammar_js_1.default.parse(entrada);
                var nuevo_ast = new AST_CAAS_js_1.default(resultado);
                if (Tabla_Simbolos_js_1.default.classCodigo_3D != "") {
                    res.end(Tabla_Simbolos_js_1.default.classCodigo_3D);
                }
                else {
                    res.end("Compilación NO Realizada");
                }
            }
            else {
                res.end("Debe ingresar código a compilar");
            }
        });
        this.router.post('/ejecutar', function (req, res) {
            var entrada = req.body.varTxtEditor;
            if (entrada != "") {
                var resultado = _3d_grammar_js_1.default.parse(entrada);
                var nuevo_ast = new AST_3D_js_1.default(resultado);
                res.end(Tabla_Simbolos_js_2.default.classConsola);
            }
            else {
                res.end("Debe ingresar código a ejecutar");
            }
        });
        this.router.get('/depurar', function (req, res) {
            res.render('index.html');
        });
        this.router.get('/tabla_simbolos', function (req, res) {
            res.render('tablasimbolos.html');
        });
        this.router.get('/error', function (req, res) {
            res.render('error.html');
        });
    };
    return Routes;
}());
var indexroutes = new Routes();
indexroutes.config();
exports.default = indexroutes.router;
