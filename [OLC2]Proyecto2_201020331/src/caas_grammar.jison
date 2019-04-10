/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x estado_caracter
%x estado_cadena
%%

\s+                   /* skip whitespace */

 
"print"            return 'r_imprimir'    
           
"true"                return 'booleano'
"false"               return 'booleano'

[0-9]+"."[0-9]+       return 'decimal'
[0-9]+                return 'entero'
"'"[^"'"]"'"         	return 'caracter'
"\""[^"\""]*"\""		  return 'cadena'

"nulo"                return 'nulo'

"="                   return 's_asign'
"++"                  return 's_increment'
"--"                  return 's_decrement'
"+"                   return 's_plus'
"-"                   return 's_minus'
"*"                   return 's_mul'
"/"                   return 's_div'
"%"                   return 's_mod'
"=="                  return 's_equal'
"!="                  return 's_not_equal'
"<"                   return 's_less'
">"                   return 's_greather'
"<="                  return 's_less_equal'
">="                  return 's_greather_equal'
"||"                  return 's_or'
"&&"                  return 's_and'
"!"                   return 's_not'
"("                   return 's_par_open'
")"                   return 's_par_close'

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'


/lex

/* operator associations and precedence */

%rigth s_asign

%left s_or
%left s_and
%left s_equal s_not_equal
%left s_greather s_greather_equal s_less s_less_equal
%left s_plus s_minus
%left s_mul s_div s_mod

%left s_not
%left UMINUS
%left s_increment s_decrement

%start SENTENCIA_IMPRIMIR

%% /* language grammar */

SENTENCIA_IMPRIMIR

    : r_imprimir s_par_open EXPRESION s_par_close
        {
          return {etiqueta: "sentencia_imprimir", tipo:"sentencia", valor: $3};
        }
    ;

EXPRESION
    : EXPRESION_ARITMETICA
      {$$ = $1;}
    | EXPRESION_RELACIONAL   
      {$$ = $1;}
    | EXPRESION_LOGICA
      {$$ = $1;}
    | EXPRESION_UNARIA
      {$$ = $1;}
    | s_par_open EXPRESION s_par_close
      {$$ = $2;}
    | DATO_PRIMITIVO
      {$$ = $1;}
    ;

EXPRESION_ARITMETICA
    : EXPRESION s_plus EXPRESION
      {$$ = {etiqueta: "expresion_aritmetica", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_minus EXPRESION
      {$$ = {etiqueta: "expresion_aritmetica", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_mul EXPRESION
      {$$ = {etiqueta: "expresion_aritmetica", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_div EXPRESION
      {$$ = {etiqueta: "expresion_aritmetica", tipo: $2, operador1: $1, operador2: $3};}
    ;

EXPRESION_RELACIONAL
    : EXPRESION s_greather EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_less EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_greather_equal EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESIO s_less_equal EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_equal EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_not_equal EXPRESION
      {$$ = {etiqueta: "expresion_relacional", tipo: $2, operador1: $1, operador2: $3};}
    ;

EXPRESION_LOGICA
    : EXPRESION s_or EXPRESION
      {$$ = {etiqueta: "expresion_logica", tipo: $2, operador1: $1, operador2: $3};}
    | EXPRESION s_and EXPRESION
      {$$ = {etiqueta: "expresion_logica", tipo: $2, operador1: $1, operador2: $3};}
    | s_not EXPRESION
      {$$ = {etiqueta: "expresion_logica", tipo: $1, operador1: $2};}
    ;

EXPRESION_UNARIA
    : s_minus EXPRESION %prec UMINUS
      {$$ = {etiqueta: "expresion_unaria", tipo: $1, operador1: $2};}
    | EXPRESION s_increment %prec s_increment
      {$$ = {etiqueta: "expresion_unaria", tipo: $2, operador1: $1};}
    | EXPRESION s_decrement %prec s_decrement
      {$$ = {etiqueta: "expresion_unaria", tipo: $2, operador1: $1};}
    ;

DATO_PRIMITIVO
    : booleano
      {$$ = {etiqueta: "valor_primitivo", tipo: "booleano", valor: yytext}; }
    | entero
      {$$ = {etiqueta: "valor_primitivo", tipo: "entero", valor: yytext};}
    | decimal
      {$$ = {etiqueta: "valor_primitivo", tipo: "decimal", valor: yytext};}
    | caracter
      {$$ = {etiqueta: "valor_primitivo", tipo: "caracter", valor: yytext};}
    | cadena
      {$$ = {etiqueta: "valor_primitivo", tipo: "cadena", valor: yytext};}
    ;
