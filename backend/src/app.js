import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import router from "./routes/notesRoute.js"
import cors from "cors"
//";
const app=express();

//Configuracion
app.set('PORT', 5000)
mongoose.connect('mongodb+srv://usuario-pruebas:root@cluster0.dhjvqys.mongodb.net/notes')
    .then(()=>{
        console.log("Conexion exitosa")
    })
//MiddLeware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin:['http://localhost:3000']}))

//Rutas
app.use('/api/', router)
//
app.listen(app.get('PORT'), ()=>{
    console.log('Server port '+app.get('PORT'))
})