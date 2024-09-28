
import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes/users.routes.js";

export class Aplication {
  constructor() {
    dotenv.config();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users';
    this.app = express();
    this.middlewares();
    this.defineRouters();
  }
  middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('src/public'));
        
       
        };

  defineRouters() {
    this.app.use(this.usuariosPath, router);
    
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación de servidor en URL: http://localhost:${this.port}`);
    });
  }
}