import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            dbName: process.env.DATABASE_NAME

        });
        console.log('Conectado a la Base de Datos')
    } catch (error) {
        throw new Error('Error de conexión co la Base de Datos')
    }

}


export {
    dbConnection
}