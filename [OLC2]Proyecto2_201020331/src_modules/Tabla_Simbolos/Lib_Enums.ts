const enum tipo_acceso
{
    publico,
    privado,
    protegido
}

const enum tipo_rol
{
    valor,
    identificador,
    arreglo,
    objeto,
    retorno,
    detener,
    continuar,
    metodo,
    clase,
    aceptado,
    error
}

const enum tipo_dato_primitivo
{
    nulo,
    booleano,
    entero,
    decimal,
    caracter,
    cadena,
    error
}

const enum tipo_operacion
{
    suma_entero,suma_decimal,suma_entero_caracter,suma_caracter_entero,
    suma_decimal_caracter,suma_caracter_decimal,       
    resta_entero,resta_decimal,resta_entero_caracter,resta_caracter_entero,
    resta_decimal_caracter,resta_caracter_decimal,
    multiplicacion_entero,multiplicacion_decimal,
    multiplicacion_entero_caracter,multiplicacion_caracter_entero,
    multiplicacion_decimal_caracter,multiplicacion_caracter_decimal,
    division_decimal,division_decimal_caracter,division_caracter_decimal,        
    modulo_entero,modulo_decimal,modulo_entero_caracter,modulo_caracter_entero,
    modulo_decimal_caracter,modulo_caracter_decimal,
    potencia_entero,potencia_decimal,potencia_entero_caracter,
    potencia_caracter_entero,potencia_entero_booleano,potencia_booleano_entero,
    potencia_decimal_caracter,potencia_caracter_decimal,
    potencia_decimal_booleano,potencia_booleano_decimal,
    concatenacion,
    mayorque_numerico,mayorque_caracter,mayorque_booleano,
    mayorque_numerico_caracter,mayorque_caracter_numerico,
    menorque_numerico,menorque_caracter,menorque_booleano,
    menorque_numerico_caracter,menorque_caracter_numerico,
    mayorigualque_numerico,mayorigualque_caracter,mayorigualque_booleano,
    mayorigualque_numerico_caracter,mayorigualque_caracter_numerico,
    menorigualque_numerico,menorigualque_caracter,menorigualque_booleano,
    menorigualque_numerico_caracter,menorigualque_caracter_numerico,
    diferente_numerico,diferente_caracter,diferente_booleano,
    diferente_numerico_caracter,diferente_caracter_numerico,
    igual_numerico,igual_caracter,igual_booleano,
    igual_numerico_caracter,igual_caracter_numerico,
    not,and,or,
    igual_nulo, diferente_nulo,
    error
}