"use strict";
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var caas_grammar = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 9], $V1 = [1, 13], $V2 = [1, 11], $V3 = [1, 12], $V4 = [1, 14], $V5 = [1, 15], $V6 = [1, 16], $V7 = [1, 17], $V8 = [1, 18], $V9 = [1, 20], $Va = [1, 21], $Vb = [1, 22], $Vc = [1, 23], $Vd = [1, 24], $Ve = [1, 25], $Vf = [1, 26], $Vg = [1, 27], $Vh = [1, 28], $Vi = [1, 29], $Vj = [1, 30], $Vk = [1, 31], $Vl = [1, 32], $Vm = [7, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 27, 28], $Vn = [7, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25], $Vo = [7, 13, 14, 17, 18, 19, 22, 23, 24, 25], $Vp = [7, 17, 18, 19, 22, 23, 24, 25], $Vq = [7, 22, 23, 24, 25];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "SENTENCIA_IMPRIMIR": 3, "r_imprimir": 4, "s_par_open": 5, "EXPRESION": 6, "s_par_close": 7, "EXPRESION_ARITMETICA": 8, "EXPRESION_RELACIONAL": 9, "EXPRESION_LOGICA": 10, "EXPRESION_UNARIA": 11, "DATO_PRIMITIVO": 12, "s_plus": 13, "s_minus": 14, "s_mul": 15, "s_div": 16, "s_greather": 17, "s_less": 18, "s_greather_equal": 19, "EXPRESIO": 20, "s_less_equal": 21, "s_equal": 22, "s_not_equal": 23, "s_or": 24, "s_and": 25, "s_not": 26, "s_increment": 27, "s_decrement": 28, "booleano": 29, "entero": 30, "decimal": 31, "caracter": 32, "cadena": 33, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "r_imprimir", 5: "s_par_open", 7: "s_par_close", 13: "s_plus", 14: "s_minus", 15: "s_mul", 16: "s_div", 17: "s_greather", 18: "s_less", 19: "s_greather_equal", 20: "EXPRESIO", 21: "s_less_equal", 22: "s_equal", 23: "s_not_equal", 24: "s_or", 25: "s_and", 26: "s_not", 27: "s_increment", 28: "s_decrement", 29: "booleano", 30: "entero", 31: "decimal", 32: "caracter", 33: "cadena" },
        productions_: [0, [3, 4], [6, 1], [6, 1], [6, 1], [6, 1], [6, 3], [6, 1], [8, 3], [8, 3], [8, 3], [8, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [9, 3], [10, 3], [10, 3], [10, 2], [11, 2], [11, 2], [11, 2], [12, 1], [12, 1], [12, 1], [12, 1], [12, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return { etiqueta: "sentencia_imprimir", tipo: "sentencia", valor: $$[$0 - 1] };
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 7:
                    this.$ = $$[$0];
                    break;
                case 6:
                    this.$ = $$[$0 - 1];
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    this.$ = { etiqueta: "expresion_aritmetica", tipo: $$[$0 - 1], operador1: $$[$0 - 2], operador2: $$[$0] };
                    break;
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    this.$ = { etiqueta: "expresion_relacional", tipo: $$[$0 - 1], operador1: $$[$0 - 2], operador2: $$[$0] };
                    break;
                case 18:
                case 19:
                    this.$ = { etiqueta: "expresion_logica", tipo: $$[$0 - 1], operador1: $$[$0 - 2], operador2: $$[$0] };
                    break;
                case 20:
                    this.$ = { etiqueta: "expresion_logica", tipo: $$[$0 - 1], operador1: $$[$0] };
                    break;
                case 21:
                    this.$ = { etiqueta: "expresion_unaria", tipo: $$[$0 - 1], operador1: $$[$0] };
                    break;
                case 22:
                case 23:
                    this.$ = { etiqueta: "expresion_unaria", tipo: $$[$0], operador1: $$[$0 - 1] };
                    break;
                case 24:
                    this.$ = { etiqueta: "valor_primitivo", tipo: "booleano", valor: yytext };
                    break;
                case 25:
                    this.$ = { etiqueta: "valor_primitivo", tipo: "entero", valor: yytext };
                    break;
                case 26:
                    this.$ = { etiqueta: "valor_primitivo", tipo: "decimal", valor: yytext };
                    break;
                case 27:
                    this.$ = { etiqueta: "valor_primitivo", tipo: "caracter", valor: yytext };
                    break;
                case 28:
                    this.$ = { etiqueta: "valor_primitivo", tipo: "cadena", valor: yytext };
                    break;
            }
        },
        table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3] }, { 5: $V0, 6: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 7: [1, 19], 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 22: $Vg, 23: $Vh, 24: $Vi, 25: $Vj, 27: $Vk, 28: $Vl }, o($Vm, [2, 2]), o($Vm, [2, 3]), o($Vm, [2, 4]), o($Vm, [2, 5]), { 5: $V0, 6: 33, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, o($Vm, [2, 7]), { 21: [1, 34] }, { 5: $V0, 6: 35, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 36, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, o($Vm, [2, 24]), o($Vm, [2, 25]), o($Vm, [2, 26]), o($Vm, [2, 27]), o($Vm, [2, 28]), { 1: [2, 1] }, { 5: $V0, 6: 37, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 38, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 39, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 40, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 41, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 42, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 43, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 44, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 45, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 46, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, { 5: $V0, 6: 47, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, o($Vm, [2, 22]), o($Vm, [2, 23]), { 7: [1, 48], 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 22: $Vg, 23: $Vh, 24: $Vi, 25: $Vj, 27: $Vk, 28: $Vl }, { 5: $V0, 6: 49, 8: 5, 9: 6, 10: 7, 11: 8, 12: 10, 14: $V1, 20: $V2, 26: $V3, 29: $V4, 30: $V5, 31: $V6, 32: $V7, 33: $V8 }, o($Vn, [2, 20], { 27: $Vk, 28: $Vl }), o($Vn, [2, 21], { 27: $Vk, 28: $Vl }), o($Vo, [2, 8], { 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl }), o($Vo, [2, 9], { 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl }), o($Vn, [2, 10], { 27: $Vk, 28: $Vl }), o($Vn, [2, 11], { 27: $Vk, 28: $Vl }), o($Vp, [2, 12], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl }), o($Vp, [2, 13], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl }), o($Vp, [2, 14], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl }), o($Vq, [2, 16], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 27: $Vk, 28: $Vl }), o($Vq, [2, 17], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 27: $Vk, 28: $Vl }), o([7, 24], [2, 18], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 22: $Vg, 23: $Vh, 25: $Vj, 27: $Vk, 28: $Vl }), o([7, 24, 25], [2, 19], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 17: $Vd, 18: $Ve, 19: $Vf, 22: $Vg, 23: $Vh, 27: $Vk, 28: $Vl }), o($Vm, [2, 6]), o($Vp, [2, 15], { 13: $V9, 14: $Va, 15: $Vb, 16: $Vc, 27: $Vk, 28: $Vl })],
        defaultActions: { 19: [2, 1] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* skip whitespace */
                        break;
                    case 1:
                        return 4;
                        break;
                    case 2:
                        return 29;
                        break;
                    case 3:
                        return 29;
                        break;
                    case 4:
                        return 31;
                        break;
                    case 5:
                        return 30;
                        break;
                    case 6:
                        return 32;
                        break;
                    case 7:
                        return 33;
                        break;
                    case 8:
                        return 'nulo';
                        break;
                    case 9:
                        return 's_asign';
                        break;
                    case 10:
                        return 27;
                        break;
                    case 11:
                        return 28;
                        break;
                    case 12:
                        return 13;
                        break;
                    case 13:
                        return 14;
                        break;
                    case 14:
                        return 15;
                        break;
                    case 15:
                        return 16;
                        break;
                    case 16:
                        return 's_mod';
                        break;
                    case 17:
                        return 22;
                        break;
                    case 18:
                        return 23;
                        break;
                    case 19:
                        return 18;
                        break;
                    case 20:
                        return 17;
                        break;
                    case 21:
                        return 21;
                        break;
                    case 22:
                        return 19;
                        break;
                    case 23:
                        return 24;
                        break;
                    case 24:
                        return 25;
                        break;
                    case 25:
                        return 26;
                        break;
                    case 26:
                        return 5;
                        break;
                    case 27:
                        return 7;
                        break;
                    case 28:
                        return 'identificador';
                        break;
                    case 29:
                        return 'EOF';
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:print\b)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:[0-9]+\.[0-9]+)/, /^(?:[0-9]+)/, /^(?:'[^"'"]')/, /^(?:"[^"\""]*")/, /^(?:nulo\b)/, /^(?:=)/, /^(?:\+\+)/, /^(?:--)/, /^(?:\+)/, /^(?:-)/, /^(?:\*)/, /^(?:\/)/, /^(?:%)/, /^(?:==)/, /^(?:!=)/, /^(?:<)/, /^(?:>)/, /^(?:<=)/, /^(?:>=)/, /^(?:\|\|)/, /^(?:&&)/, /^(?:!)/, /^(?:\()/, /^(?:\))/, /^(?:([a-zA-ZñÑ]|(_[a-zA-ZñÑ]))([a-zA-ZñÑ]|_|[0-9])*)/, /^(?:$)/],
            conditions: { "estado_cadena": { "rules": [], "inclusive": false }, "estado_caracter": { "rules": [], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = caas_grammar;
    exports.Parser = caas_grammar.Parser;
    exports.parse = function () { return caas_grammar.parse.apply(caas_grammar, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}