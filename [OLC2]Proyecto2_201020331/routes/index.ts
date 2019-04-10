import {Request,Response,Router} from 'express';
import tabla_simbolos_caas from '../src_modules/Tabla_Simbolos/Tabla_Simbolos.js';
import caas_grammar from '../src_modules/caas_grammar.js';
import AST_CAAS from '../src_modules/AST_CAAS.js';
import tabla_simbolos_3d from '../src_3d_modules/Estructuras/Tabla_Simbolos.js';
import d3_grammar from '../src_3d_modules/3d_grammar.js';
import AST_3D from '../src_3d_modules/AST_3D.js';
import tabla_simbolos from '../src_modules/Tabla_Simbolos/Tabla_Simbolos.js';

class Routes
{
   
   router : Router;

   constructor()
   {
      this.router = Router();
      this.config();
   }

   config()
   {
      this.router.get ('/', (req, res) => 
         {
            res.render('index.html');
         }
      );

      this.router.post ('/traducir', (req, res) => 
         {
            var entrada = req.body.varTxtEditor;
            if(entrada != "")
            {
               var resultado =  caas_grammar.parse(entrada);
                                 
               const nuevo_ast = new AST_CAAS(resultado);    
               if(tabla_simbolos_caas.classCodigo_3D != "")
               {
                  res.end(tabla_simbolos_caas.classCodigo_3D);
               }
               else
               {
                  res.end("Compilación NO Realizada");
               }                       
            }
            else
            {
               res.end("Debe ingresar código a compilar");
            }
         }
      );   

      this.router.post ('/ejecutar', (req, res) => 
         {
            var entrada = req.body.varTxtEditor;
            if(entrada != "")
            {
               var resultado =  d3_grammar.parse(entrada);                                 
               const nuevo_ast = new AST_3D(resultado);
               res.end(tabla_simbolos_3d.classConsola);
            }
            else
            {
               res.end("Debe ingresar código a ejecutar");
            }
         }
      );
      
      this.router.get ('/depurar', (req, res) => 
         {
            res.render('index.html');
         }
      );

      this.router.get ('/tabla_simbolos', (req, res) => 
         {
            res.render('tablasimbolos.html');
         }
      );

      this.router.get ('/error', (req, res) => 
         {
            res.render('error.html');
         }
      );

   }
}

const indexroutes = new Routes();
indexroutes.config();

export default indexroutes.router;