import {Router} from "express";
import Note from "../models/notes.js"


const router =Router();

 
//Obtener todas las notas
//localhost:3000/api/notes/
router.get('/notes', async(req, res)=>{
    const notes= await Note.find();
    res.send(notes)
})

//Agregar una nueva nota
router.post('/notes', async(req,res)=>{
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })
    await note.save()
    res.send(note)
    /*res.status(200).send('Nueva nota insertada')*/
    })
///Actualizar la nota
router.patch('/notes/:id', async(req, res)=>{
    try{
    const note =await Note.findOne({_id: req.params.id})
    if(req.body.title){
        note.title=req.body.title
    } 
    if(req.body.content){
        note.content=req.body.content
    }
    note.save()  
    res.send(note)
    }catch{
        res.send('Nota no existe')
    }
   })

//Eliminar una nota
router.delete('/notes/:id', async(req, res)=>{
try{
    const note =await Note.deleteOne({_id: req.params.id})
    res.send(note)
    }catch{
        res.send('Nota no existe')
    }
   })

//Obtener una nota
router.get('/notes/:id', async(req, res)=>{
    const note =await Note.findOne({_id: req.params.id})
    res.send(note) 
})

export default router;