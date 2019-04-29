/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x estado_caracter
%x estado_cadena
%%

\s+                   /* skip whitespace */

"int"                 return 'r_entero'
"double"              return 'r_doble'
"char"                return 'r_caracter'
"boolean"             return 'r_booleano'
"String"              return 'r_cadena'

"public"              return 'r_public'
"protected"           return 'r_protected'
"private"             return 'r_private'
"abstract"            return 'r_abstract'
"static"              return 'r_static'
"final"               return 'r_final'

"void"                return 'r_void'
"new"                 return 'r_new'

"if"                  return 'r_if'
"else"                return 'r_else'
"switch"              return 'r_switch'
"case"                return 'r_case'
"default"             return 'r_default'
"do"                  return 'r_do'
"while"               return 'r_while'
"for"                 return 'r_for'
"continue"            return 'r_continue'
"break"               return 'r_break'
"return"              return 'r_return'
"pow"                 return 'r_pow'
"print"               return 'r_imprimir'    
"read_file"           return 'read_file'
"write_file"          return 'write_file'
"graph"               return 'graph'
           
"true"                return 'booleano'
"false"               return 'booleano'

[0-9]+"."[0-9]+       return 'decimal'
[0-9]+                return 'entero'
"'"[^"'"]"'"         	return 'caracter'
"\""[^"\""]*"\""		  return 'cadena'

"nulo"                return 'nulo'

"=="                  return 's_equal'
"="                   return 's_asign'
"++"                  return 's_increment'
"--"                  return 's_decrement'
"+"                   return 's_plus'
"-"                   return 's_minus'
"*"                   return 's_mul'
"/"                   return 's_div'
"%"                   return 's_mod'
"!="                  return 's_not_equal'
"<="                  return 's_less_equal'
">="                  return 's_greather_equal'
"<"                   return 's_less'
">"                   return 's_greather'
"||"                  return 's_or'
"&&"                  return 's_and'
"!"                   return 's_not'
"("                   return 's_par_open'
")"                   return 's_par_close'
"?"                   return 's_ternario'

"{"                   return 's_key_open'
"}"                   return 's_key_close'
"["                   return 's_cor_open'
"]"                   return 's_cor_close'
","                   return 's_coma'
":"                   return 's_doble_dot'
";"                   return 's_dot_coma'

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'


/lex

/* operator associations and precedence */

%rigth s_asign

%right  		identificador
%right      s_ternario

%left s_or
%left s_and
%left s_equal s_not_equal
%left s_greather s_greather_equal s_less s_less_equal
%left s_plus s_minus
%left s_mul s_div s_mod

%left s_not
%left UMINUS
%left s_increment s_decrement

%start BODY_CAAS

%% /* language grammar */

BODY_CAAS
    : LISTA_METODOS EOF
      {return $1;}
    ;

LISTA_MODIFICADORES
    : LISTA_MODIFICADORES MODIFICADOR
    {
      $1.lista_modificadores.push($2);
      $$ = $1;
    }      
    | MODIFICADOR
    {
      $$ = {lista_modificadores: [$1]};
    }
    ;

MODIFICADOR
    : r_public
      {return $1;}
    | r_protected
      {return $1;}
    | r_private
      {return $1;}
    | r_abstract
      {return $1;}
    | r_static
      {return $1;}
    | r_final
      {return $1;}
    ;

TIPO_METODO 
    : r_void
      {$$ = $1;}
    | r_booleano
      {$$ = $1;}
    | r_entero
      {$$ = $1;}
    | r_doble
      {$$ = $1;}  
    | r_caracter
      {$$ = $1;}
    | r_cadena
      { $$ = $1}
    | identificador
      {$$ = $1;}  
    ;    

TIPO_VARIABLE 
    : r_booleano
      {$$ = $1;}
    | r_entero
      {$$ = $1;}
    | r_doble
      {$$ = $1;}  
    | r_caracter
      {$$ = $1;}
    | r_cadena
      { $$ = $1}
    | identificador
      {$$ = $1;}  
    ;

LISTA_IDENTIFICADORES
    : LISTA_IDENTIFICADORES s_coma identificador
      { 
        $1.push($3);
        $$ = $1;
      }
    | identificador
      { $$ = [$1];}
    ;   

/**********************************************METODOS***********************************************************************************************************/

LISTA_METODOS
    : LISTA_METODOS METODO
      {
        $1.lista_metodos.push($2);
        $$ = $1;
      }
    | METODO
      {
        $$ = {lista_metodos: [$1]};
      }
    ;

METODO 
    : LISTA_MODIFICADORES TIPO_METODO identificador s_par_open LISTA_PARAMETROS s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta: "metodo", modificadores: $1, tipo: $2, identificador: $3, parametros: $5, sentencias: $8};
      }
    | LISTA_MODIFICADORES TIPO_METODO identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta: "metodo", modificadores: $1, tipo: $2, identificador: $3, sentencias: $7};
      }
    | TIPO_METODO identificador s_par_open LISTA_PARAMETROS s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta: "metodo", tipo: $1, identificador: $2, parametros: $4, sentencias: $7};
      }
    | TIPO_METODO identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta: "metodo", tipo: $1, identificador: $2, sentencias: $6};
      }      
    ;

LISTA_PARAMETROS
    : LISTA_PARAMETROS s_coma DECLARACION_PARAMETRO
      {
        $1.lista_parametros.push($3);
        $$ = $1;
      }
    | DECLARACION_PARAMETRO
      {
        $$ = {lista_parametros: [$1]};
      }
    ;

DECLARACION_PARAMETRO
    : r_final TIPO_VARIABLE PARAMETRO
      {
        $$ = {etiqueta: "parametro", estado: 0, tipo: $1, identificador: $2};
      }
    | TIPO_VARIABLE PARAMETRO
      {
        $$ = {etiqueta: "parametro", estado: 1 , tipo: $1, identificador: $2};
      }
    ;

PARAMETRO 
    : identificador s_cor_open s_cor_close
      {
        $$ = { etiqueta : "identificador", valor: $1};
      }
    | identificador
      {
        $$ = { etiqueta : "identificador", valor: $1};
      }
    ;

LISTA_SENTENCIAS_METODOS
    : LISTA_SENTENCIAS_METODOS SENTENCIAS_METODOS
      {
        $1.sentencias.push($2);
        $$ = $1; 
      }
    | SENTENCIAS_METODOS
      {
        $$ = {sentencias : [$1]};
      }
    ;
    
SENTENCIAS_METODOS
    : SENTENCIA_DECLARACION_INSTANCIA s_dot_coma
      {$$ = $1;}
    | SENTENCIA_ASIGNACION s_dot_coma
      {$$ = $1;}
    | SENTENCIA_IF
      {$$ = $1;}
    | SENTENCIA_SWITCH
      {$$ = $1;}  
    | SENTENCIA_DO_WHILE s_dot_coma
      {$$ = $1;}      
    | SENTENCIA_WHILE
      {$$ = $1;}
    | SENTENCIA_FOR 
      {$$ = $1;}  
    | SENTENCIA_FOR_EACH
      {$$ = $1;}  
    | SENTENCIA_BREAK s_dot_coma
      {$$ = $1;}
    | SENTENCIA_CONTINUE s_dot_coma
      {$$ = $1;}
    | SENTENCIA_RETURN s_dot_coma
      {$$ = $1;}
    | SENTENCIA_INCREMENTO s_dot_coma
      {$$ = $1;}
    | SENTENCIA_DECREMENTO s_dot_coma
      {$$ = $1;}
    | SENTENCIA_LLAMADA s_dot_coma
      {$$ = $1;}
    | SENTENCIA_IMPRIMIR s_dot_coma
      {$$ = $1;}
    ;    

SENTENCIA_DECLARACION_INSTANCIA
    : TIPO_VARIABLE LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        $$ = {etiqueta: "sentencia_declaracion_instancia", tipo: 0, tipo_valor: $1, identificador: $2, valor: $4};
      }
    | TIPO_VARIABLE LISTA_IDENTIFICADORES
      {
        $$ = {etiqueta: "sentencia_declaracion_instancia", tipo: 0, tipo_valor: $1, identificador: $2};
      }
    | TIPO_VARIABLE identificador LISTA_DIMENSIONES_DECLARACION s_asign r_new TIPO_VARIABLE LISTA_DIMENSIONES_ASIGNACION
      {
        $$ = {etiqueta: "sentencia_declaracion_instancia", tipo: 1, tipo_valor: $1, identificador: [$2], posicion: $3.lista_dimensiones.length, tipo_valor2: $6, posicion2: $7};        
      }  
    | TIPO_VARIABLE identificador LISTA_DIMENSIONES_DECLARACION s_asign ARREGLO
      {
        $$ = {etiqueta: "sentencia_declaracion_instancia", tipo: 1, tipo_valor: $1, identificador: [$2], posicion: $3.lista_dimensiones.length, tipo_valor2: "", posicion2: $5};        
      } 
    | TIPO_VARIABLE identificador LISTA_DIMENSIONES_DECLARACION
      {
        $$ = {etiqueta: "sentencia_declaracion_instancia", tipo: 1, tipo_valor: $1, identificador: [$2], posicion: $3.lista_dimensiones.length};        
      }
    ;

LISTA_DIMENSIONES_DECLARACION
    : LISTA_DIMENSIONES_DECLARACION DIMENSION_DECLARACION
      {
        $1.lista_dimensiones.push($2);
        $$ = $1;
      }
    | DIMENSION_DECLARACION
      {
        $$ = {lista_dimensiones : [$1]};
      }
    ;

DIMENSION_DECLARACION
    : s_cor_open s_cor_close
      {
        $$ = {etiqueta: "posicion"};  
      }
    ;    

LISTA_DIMENSIONES_ASIGNACION
    : LISTA_DIMENSIONES_ASIGNACION DIMENSION_ASIGNACION
      {
        $1.lista_dimensiones.push($2);
        $$ = $1;
      }
    | DIMENSION_ASIGNACION
      {
        $$ = {lista_dimensiones : [$1]};
      }
    ;

DIMENSION_ASIGNACION
    : s_cor_open EXPRESION s_cor_close
      {
        $$ = {etiqueta: "posicion", valor: $2}; 
      }
    ;     

SENTENCIA_ASIGNACION
    : identificador s_asign EXPRESION
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: 0, identificador: $1, valor: $3};
      }
    | identificador s_asign r_new TIPO_VARIABLE LISTA_DIMENSIONES_ASIGNACION      
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: 0, identificador: $1, tipo_valor:$4, valor: $5};
      }
    | identificador s_asign ARREGLO    
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: 0, identificador: $1, tipo_valor:"", valor: $3};
      }      
    | identificador LISTA_DIMENSIONES_ASIGNACION  s_asign EXPRESION
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: 1, identificador: $1, posicion: $2, valor: $4};
      }       
    |  identificador LISTA_DIMENSIONES_ASIGNACION  s_asign ARREGLO
      {
        $$ = {etiqueta: "sentencia_asignacion", tipo: 1, identificador: $1, posicion: $2, valor: $4};
      }      
    ;   

SENTENCIA_IF
    : r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close LISTA_ELSE_IF r_else s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_if", tipo : 0, condicion : $3, sentencias: $6, lista_else_if : $8, sentencias_else: $11 };
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close r_else s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_if", tipo : 0, condicion : $3, sentencias: $6, sentencias_else : $10 };
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close LISTA_ELSE_IF
      {
        $$ = {etiqueta : "sentencia_if", tipo : 0, condicion : $3, sentencias: $6, lista_else_if : $8 };
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_if", tipo : 0, condicion : $3, sentencias: $6 };
      }
    ;

LISTA_ELSE_IF
    : LISTA_ELSE_IF SENTENCIA_ELSE_IF
      {
        $1.sentencias_else_if.push($2);
        $$ = $1;
      }
    | SENTENCIA_ELSE_IF
      {
        $$ = {sentencias_else_if : [$1]};
      }
    ;

SENTENCIA_ELSE_IF
    : r_else r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_if", tipo : 1, condicion : $4, sentencias: $7 };
      }
    ;

SENTENCIA_SWITCH
    : r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS DEFECTO s_key_close
      {
        $$ = {etiqueta : "sentencia_switch", condicion : $3, lista_casos: $6, defecto: $7};
      }
    ;

LISTA_CASOS
    : LISTA_CASOS CASO
      {
        $1.lista_casos.push($2);
        $$ = $1;
      }
    | CASO
      {
        $$ = {lista_casos : [$1]};
      }
    ;

CASO
    : r_case EXPRESION s_doble_dot LISTA_SENTENCIAS_METODOS
      {
        $$ = { etiqueta : "caso", valor : $2, sentencias: $4};
      }
    ;     

DEFECTO
    : r_default s_doble_dot LISTA_SENTENCIAS_METODOS
      {
        $$ = { etiqueta : "defecto", sentencias: $3};
      }
    ;

SENTENCIA_DO_WHILE
    : r_do s_key_open LISTA_SENTENCIAS_METODOS s_key_close r_while s_par_open EXPRESION s_par_close
      {
        $$ = {etiqueta : "sentencia_do_while", sentencias: $3, condicion : $7};
      }
    ;

SENTENCIA_WHILE
    : r_while s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_while", condicion : $3, sentencias: $6 };
      }
    ;

SENTENCIA_FOR
    : r_for s_par_open SENTENCIA_DECLARACION_INSTANCIA s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_for", inicio: $3, condicion: $5, actualizacion: $7, sentencias: $10 };
      }
    |r_for s_par_open SENTENCIA_ASIGNACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_for", inicio: $3, condicion: $5, actualizacion: $7, sentencias: $10 };
      }
    ;

SENTENCIA_FOR_EACH
    : r_for s_par_open SENTENCIA_DECLARACION_INSTANCIA s_doble_dot EXPRESION s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        $$ = {etiqueta : "sentencia_for_each", inicio: $3, valor: $5, sentencias: $8};
      } 
    ;   

SENTENCIA_BREAK
    : r_break
      {
        $$ = {etiqueta : "sentencia_break"};
      }
    ;

SENTENCIA_CONTINUE
    : r_continue
      {
        $$ = {etiqueta : "sentencia_continue"};
      }
    ;

SENTENCIA_RETURN
    : r_return
      {
        $$ = {etiqueta : "sentencia_return"};
      }
    | r_return EXPRESION
      {
        $$ = {etiqueta : "sentencia_return", valor : $2};
      }
    ;        

SENTENCIA_LLAMADA
    : identificador s_par_open LISTA_EXPRESIONES s_par_close
      {
        $$ = {etiqueta : "sentencia_llamada", identificador: $1, lista_parametros: $3};
      }
    | identificador s_par_open s_par_close
      {
        $$ = {etiqueta : "sentencia_llamada", identificador: $1};
      }
    ;

SENTENCIA_IMPRIMIR
    : r_imprimir s_par_open EXPRESION s_par_close
      {
        $$ = {etiqueta: "sentencia_imprimir", tipo:"sentencia", valor: $3};
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES EXPRESIONES*********************************************************************************************************/
LISTA_EXPRESIONES 
    : LISTA_EXPRESIONES s_coma EXPRESION
      {
        $1.expresiones.push($3);
        $$ = $1;
      }
    | EXPRESION
      {
        $$ = {expresiones: [$1]};
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
    | OPERADOR_TERNARIO
      {$$ = $1;}  
    | OPERADOR_POW
      {$$ = $1;}  
    | s_par_open EXPRESION s_par_close
      {$$ = $2;}
    | SENTENCIA_INCREMENTO
      {$$ = $1;}
    | SENTENCIA_DECREMENTO  
      {$$ = $1;}
    | SENTENCIA_ACCESO
      {$$ = $1;}
    | SENTENCIA_LLAMADA
      {$$ = $1;}       
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
    ;

OPERADOR_TERNARIO 
    : EXPRESION s_ternario EXPRESION s_doble_dot EXPRESION
    {
      $$ = {etiqueta: "operador_ternario", comparacion: $1, valor1: $3, valor2: $5};
    }
    ;

OPERADOR_POW
    : r_pow s_par_open EXPRESION s_coma EXPRESION s_par_close
    {
      $$ = {etiqueta: "operador_pow", base: $3, potencia: $5};
    }
    ;

SENTENCIA_INCREMENTO
    : identificador s_increment
      {
        $$ = {etiqueta: "sentencia_incremento", tipo: 0, identificador: $1};
      }
    ;    

SENTENCIA_DECREMENTO
    : identificador s_decrement
      {
        $$ = {etiqueta: "sentencia_decremento", tipo: 0, identificador: $1};
      }
    ; 

SENTENCIA_ACCESO
    : identificador
      {
        $$ = {etiqueta: "sentencia_acceso", tipo: 0, identificador: $1};
      } 
      |identificador LISTA_DIMENSIONES_ASIGNACION
      {
        $$ = {etiqueta: "sentencia_acceso", tipo: 1, identificador: $1, posicion: $2};
      }    
    ;

DATO_PRIMITIVO
    : booleano
      {$$ = {etiqueta: "valor_primitivo", tipo: "booleano", valor: yytext}; }
    | entero
      {$$ = {etiqueta: "valor_primitivo", tipo: "entero", valor: yytext};}
    | decimal
      {$$ = {etiqueta: "valor_primitivo", tipo: "decimal", valor: yytext};}
    | caracter
      {$$ = {etiqueta: "valor_primitivo", tipo: "caracter", valor: yytext.substring(1,yytext.length-1)};}
    | cadena
      {$$ = {etiqueta: "valor_primitivo", tipo: "cadena", valor: yytext.substring(1,yytext.length-1)};}  
    ;


/********************************************************************************ARREGLOS********************************************************************************************************************************/
ARREGLO 
    : s_key_open LISTA_DIMENSIONES s_key_close
    {
      $$ = {etiqueta: "arreglo", valor:$2, dimensiones: $2.lista_dimensiones.length};
    }
    ;

LISTA_DIMENSIONES
    : LISTA_DIMENSIONES s_coma DIMENSION
    {
      $1.lista_dimensiones.push($3);
      $$ = $1;
    }
    | DIMENSION
    {
      $$ = {lista_dimensiones: [$1]};
    }
    ;    

DIMENSION
    : s_key_open LISTA_EXPRESIONES s_key_close
    {
      $$ = {etiqueta: "dimension", valor: $2};
    }
    ;    