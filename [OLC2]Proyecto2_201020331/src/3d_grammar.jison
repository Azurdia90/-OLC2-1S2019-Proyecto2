/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

[0-9]+("."[0-9]+)?\b  return 'numero'

"%c"                  return 'tipo_impresion'
"%e"                  return 'tipo_impresion'  
"%d"                  return 'tipo_impresion'

"="                   return 's_asign'
"+"                   return 's_plus'
"-"                   return 's_minus'
"*"                   return 's_mul'
"/"                   return 's_div'
"%"                   return 's_mod'
"<"                   return 's_less'
">"                   return 's_greather'
"<="                  return 's_less_equal'
">="                  return 's_greather_equal'
"=="                  return 's_equal'
"!="                  return 's_not_equal'
"("                   return 's_par_open'
")"                   return 's_par_close'
"["                   return 's_cor_open'
"]"                   return 's_cor_close'
"{"                   return 's_key_open'
"}"                   return 's_key_close'

"\""                  return 's_quote'
","                   return 's_coma'
":"                   return 's_doble_dot'
";"                   return 's_dot_coma'

"var"                 return 'r_var'
"if"                  return 'r_if'
"ifFalse"             return 'r_iffalse'
"goto"                return 'r_goto'
"print"               return 'r_print'
"stack"               return 'r_stack'
"heap"                return 'r_heap'
"void"                return 'r_void'
"call"                return 'r_call'
"$$_clean_scope"      return 'r_clean'



"t"[0-9]+             return 'temporal' 
"L"[0-9]+             return 'etiqueta' 

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%right s_asign

%left s_equal s_not_equal
%left s_greather s_greather_equal s_less s_less_equal
%left s_plus s_minus
%left s_mul s_div s_mod

%left UMINUS

%start CUERPO_3D

%% /* language grammar */

CUERPO_3D
    : LISTA_SENTENCIAS EOF
      {return $1;}
    ;

LISTA_SENTENCIAS 
    : LISTA_SENTENCIAS SENTENCIAS 
      {
        $1.sentencias.push($2);
        $$ = $1; 
      }
    | SENTENCIAS
      {
        $$ = {sentencias : [$1]};
      }
    ;

SENTENCIAS
    : SENTENCIA_DECLARACION s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_ASIGNACION s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_SALTO_DESTINO
      {
        $$ = $1;
      }
    | SENTENCIA_SALTO s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_IF s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_IF_FALSE s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_METODO 
      {
        $$ = $1;
      }
    | SENTENCIA_LIMPIAR_METODO s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_LLAMADA_METODO s_dot_coma
      {
        $$ = $1;
      }
    | SENTENCIA_IMPRIMIR s_dot_coma
      {
        $$ = $1;
      }
    ;

SENTENCIA_DECLARACION
    : r_var LISTA_IDENTIFICADORES s_asign EXPRESION_ARITMETICA
      {
        $$ = {etiqueta: "sentencia_declaracion", id: $2, valor: $4};
      } 
      |r_var LISTA_IDENTIFICADORES
      {
        $$ = {etiqueta: "sentencia_declaracion", id: $2};
      } 
      |r_var r_stack s_cor_open s_cor_close
      |r_var r_heap s_cor_open s_cor_close
    ;

LISTA_IDENTIFICADORES
    : LISTA_IDENTIFICADORES s_coma identificador
      { 
        $1.push($3);
        $$ = $1;
      }
    | LISTA_IDENTIFICADORES s_coma temporal
      { 
        $1.push($3);
        $$ = $1;
      }
    | identificador
      { $$ = [$1];}
    | temporal
      { $$ = [$1];}
    ;

SENTENCIA_ASIGNACION
    : temporal s_asign EXPRESION_ARITMETICA
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: "0", id: $1, valor: $3};
      } 
    | identificador s_asign EXPRESION_ARITMETICA
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: "1", id: $1, valor: $3};
      } 
    | r_stack s_cor_open POSICION s_cor_close s_asign EXPRESION_ARITMETICA
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: "2", id: $1, valor: $6, posicion: $3};
      }     
    | r_heap  s_cor_open POSICION s_cor_close s_asign EXPRESION_ARITMETICA
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: "3", id: $1, valor: $6, posicion: $3};
      } 
    ;

SENTENCIA_SALTO_DESTINO
    : etiqueta s_doble_dot
      {
        $$ = {etiqueta: "salto", expresion: $1};
      } 
    ;

SENTENCIA_SALTO
    : r_goto etiqueta
      {
        $$ = {etiqueta: "sentencia_salto", expresion: $2};
      } 
    ;

SENTENCIA_IF
    : r_if s_par_open EXPRESION_RELACIONAL s_par_close r_goto etiqueta
      {
        $$ = {etiqueta: "sentencia_if", expresion: $3, verdadero: $6};
      }    
    ;

SENTENCIA_IF_FALSE
    : r_iffalse s_par_open EXPRESION_RELACIONAL s_par_close r_goto etiqueta
      {
        $$ = {etiqueta: "sentencia_if_false", expresion: $3, falso: $6};
      }
    ;

SENTENCIA_METODO
    : r_void identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$ = {etiqueta : "sentencia_metodo", valor: $2, valor2: $6}; 
      }
    ;

SENTENCIA_LIMPIAR_METODO
    : r_clean s_par_open numero s_coma numero s_par_close
      {
        $$ = {etiqueta : "sentencia_limpiar", valor: $3, valor2: $5}; 
      }
    ;

SENTENCIA_LLAMADA_METODO
    : r_call identificador s_par_open s_par_close
      {
        $$ = {etiqueta : "sentencia_llamada", valor: $2}; 
      }
    ;

SENTENCIA_IMPRIMIR
    : r_print s_par_open s_quote tipo_impresion s_quote s_coma temporal s_par_close
      {
        $$ = {etiqueta : "sentencia_imprimir", tipo: $4 , valor: $7};
      }
      |r_print s_par_open s_quote tipo_impresion s_quote s_coma identificador s_par_close
      {
        $$ = {etiqueta : "sentencia_imprimir", tipo: $4 , valor: $7};
      }
    ;

EXPRESION_ARITMETICA
    : DATO_PRIMITIVO SIGNO_ARITMETICA DATO_PRIMITIVO
      { 
        $$ = {etiqueta : "expresion_aritmetica", operador1: $1, simbolo: $2, operador2: $3}; 
      }
      |DATO_PRIMITIVO
      {
        $$ = $1;
      }
    ;

EXPRESION_RELACIONAL
    : DATO_PRIMITIVO SIGNO_RELACIONAL DATO_PRIMITIVO
      { 
        $$ = {etiqueta : "expresion_relacional", operador1: $1, simbolo: $2, operador2: $3}; 
      }
    ;

SIGNO_ARITMETICA
    : s_plus
      {$$ = $1;}
    | s_minus
      {$$ = $1;}
    | s_mul
      {$$ = $1;}
    | s_div
      {$$ = $1;}
    | s_mod 
      {$$ = $1;}
    ;

SIGNO_RELACIONAL
    : s_greather
      {$$ = $1;} 
    | s_less 
      {$$ = $1;}
    | s_greather_equal
      {$$ = $1;}
    | s_less_equal
      {$$ = $1;} 
    | s_equal 
      {$$ = $1;}
    | s_not_equal
      {$$ = $1;}
    ;

DATO_PRIMITIVO
    : numero
      { 
        $$ = {etiqueta: "valor_primitivo", tipo: 0, valor: $1};
      }
    | temporal
      { 
        $$ = {etiqueta: "valor_primitivo", tipo: 1, valor: $1};
      }
    | identificador
      {
        $$ = {etiqueta: "valor_primitivo", tipo: 2, valor: $1};
      }
    | r_stack s_cor_open POSICION s_cor_close
      {
        $$ = {etiqueta: "valor_primitivo", tipo: 3, valor: $1, pos: $3};
      }
    | r_heap s_cor_open POSICION s_cor_close
      {
        $$ = {etiqueta: "valor_primitivo", tipo: 4, valor: $1, pos: $3};
      }
    ;

POSICION
  : numero
    { 
      $$ = {etiqueta: "valor_primitivo", tipo: "0", valor: $1};
    }
  | temporal
    { 
      $$ = {etiqueta: "valor_primitivo", tipo: "1", valor: $1};
    }
  | identificador
    {
      $$ = { etiqueta : "valor_primitivo", tipo : "2", valor: $1};
    }
  ;   