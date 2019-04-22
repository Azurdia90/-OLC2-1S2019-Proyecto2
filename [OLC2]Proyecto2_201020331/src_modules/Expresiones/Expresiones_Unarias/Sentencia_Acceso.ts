import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Acceso extends Expresion
{
    private identificador : String;
    private tipo : number;
    private posicion : any;    

    constructor(operador : Simbolo, p_tipo : number, p_posicion? : Array<any>)
    {        
        super(operador,"acceso");
        this.identificador = operador.classIdentificador;
        this.tipo = p_tipo;
        this.posicion = p_posicion;
    }

    ejecutar()
    {
        try
        {
            if(this.tipo ==0)
            {
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var retorno = tabla_simbolos.obtener_simbolo(this.identificador);
                    if(retorno != undefined)
                    {
                        var temporal_posicion_stack = "t" + tabla_simbolos.classTemporal;
                        var temporal_acceso = "t" + tabla_simbolos.classTemporal;

                        tabla_simbolos.classCodigo_3D = temporal_posicion_stack +  " = P + " + retorno.classPos + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_acceso + " = Stack[" + temporal_posicion_stack + "];\n";

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = retorno.classRol;
                        resultado.classTipo = retorno.classTipo;
                        resultado.classIdentificador = retorno.classIdentificador;
                        resultado.classValor = temporal_acceso;
                        resultado.classPos = retorno.classPos;
                        resultado.classTam = retorno.classTam;
                        return resultado;                        
                    }
                    else
                    {
                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }                    
                }
                else
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }                
            }
            else if(this.tipo == 1)
            {
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var retorno = tabla_simbolos.obtener_simbolo(this.identificador);

                    if(retorno != undefined)
                    {
                        var etiqueta_posicion_stack_array = "t" + tabla_simbolos.classTemporal;                            
                        var etiqueta_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
                        var etiqueta_posicion_length_array = "t" + tabla_simbolos.classTemporal;
                        var etiqueta_length_array = "t" + tabla_simbolos.classTemporal;
                        var etiqueta_length_total_array = "t" + tabla_simbolos.classTemporal;
                        tabla_simbolos.classCodigo_3D = "\n";
                        tabla_simbolos.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + retorno.classPos + ";\n";
                        tabla_simbolos.classCodigo_3D  = etiqueta_posicion_heap_array + " = Stack[" + etiqueta_posicion_stack_array + "];\n";
                        tabla_simbolos.classCodigo_3D = etiqueta_posicion_length_array + " = " + etiqueta_posicion_heap_array + " + 0 ;\n";
                        tabla_simbolos.classCodigo_3D = etiqueta_length_array + " = Heap[" + etiqueta_posicion_length_array + "];\n";
                        tabla_simbolos.classCodigo_3D = etiqueta_length_total_array + " = " + etiqueta_posicion_heap_array + " + " + retorno.classTam + ";\n";

                        var etiqueta_pos_especifica_array = "t" + tabla_simbolos.classTemporal;

                        for(var i = 0; i < this.posicion.length; i++)
                        {
                            var tam_dim :Simbolo;
                            if(this.posicion[i] instanceof Expresion)
                            {
                                tam_dim = this.posicion[i].ejecutar();
                            }
                            else if(this.posicion[i] instanceof Simbolo)
                            {
                                tam_dim = this.posicion[i];
                            }
                            else
                            {
                                tam_dim = new Simbolo();
                            }
                        
                            if(i==0)
                            {
                                tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + tam_dim.classValor + ";\n"; 
                                tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " * " + etiqueta_length_array + ";\n";
                            }
                            else
                            {
                                tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " + tam_dim.classValor + ";\n";                                    
                            }                                                                                                
                        }

                        tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " +  etiqueta_length_total_array + ";\n";

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = retorno.classTipo;
                        resultado.classIdentificador = retorno.classIdentificador;
                        resultado.classValor = "Heap[" + etiqueta_pos_especifica_array + "]";
                        return resultado;
                    }
                    else
                    {
                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "El retorno \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }                    
                }
                else
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }   
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Acceso No realizado correctamente: Funcionalidad No implementada Aun.";
                return resultado;
            }
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Acceso No realizado correctamente: " + Error.Message;
            return resultado;
        }
    }

}

export default Sentencia_Acceso;