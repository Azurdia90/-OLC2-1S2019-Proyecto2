import lib_express from 'express';
import lib_path from 'path';
import lib_body_parser from 'body-parser';

import indexroutes from '../routes/index';

class Server
{
    //variables globales
    private app : lib_express.Application;

    constructor()
    {
        this.app = lib_express();        
        this.app.engine('html', require('ejs').renderFile);        
        this.config();    
            
    }

    config()
    {
        this.app.use(lib_body_parser.urlencoded({ extended: false }));
        this.app.use(lib_body_parser.json());
        this.app.use(indexroutes);        

        this.app.set('port', 3000);
        this.app.set('view engine', 'ejs');
        this.app.set('views', lib_path.join('./views'));        
    } 

    start()
    {
        //run the listener 
        this.app.listen (this.app.get('port'),() => {
                console.log('SERVER RUN IN PORT: ', this.app.get('port'));
            }
        );
    }

}

const cass_app = new Server();
cass_app.start();
