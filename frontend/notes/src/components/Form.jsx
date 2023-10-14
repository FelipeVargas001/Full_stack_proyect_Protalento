import React, { useEffect, useState } from 'react'

export default function Form({oldNote}){
    const [note, setNote]=useState({
        title:'',
        content: ''
    })

    const handleChange=(e)=>{
        let newNote= {
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value
        }
        setNote({...note, ...newNote})
        console.log(note)
    }
    const saveNote =async()=>{
        const API_URL = process.env.REACT_APP_API_URL;
        let URL ='';
        let params ={}
        if (note._id){
            URL=`${API_URL}/api/notes/` + note._id;
                params={
                    method: 'PATCH',
                    body: JSON.stringify(note),
                    headers: {
                    'Content-Type': 'application/json'
                } 
                }
        }else{
            URL=`${API_URL}/api/notes/`
            params={
                method: 'POST',
                body: JSON.stringify(note),
                headers: {
                'Content-Type': 'application/json'
            } 
            }
        }
        await fetch(URL,params)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        saveNote()
        setNote({
            'title':'',
            content: ''

        })
    }
    useEffect(()=>{
        setNote({...note,...oldNote})
        console.log(note)
    },[oldNote])
    return (
       <div className="card">
        <div className="card-header">
            Agregar Nota
        </div>
        <div className="card-body">
            <form action="" onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <input name='title' value={note.title} onChange={handleChange} type="text" placeholder='Titulo' className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <textarea name="content" value={note.content} onChange={handleChange} className='form-control' placeholder='Nota'></textarea>
                </div>
               {note._id
               ? <button type='submit' className='btn btn-outline-success btn-sm btn-block'>Actualizar</button>
                :<button type='submit' className='btn btn-outline-success btn-sm btn-block'>Anotar</button>
            }
                </form>
        </div>
       </div>     
      )
}