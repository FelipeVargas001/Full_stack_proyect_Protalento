import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ListGroup from '../components/ListGroup';
import Form from '../components/Form';
import Notes from '../components/Notes';

export default function Index(){

    const [notes, setNotes]=useState([])
    const [oldNote, setOldNote]=useState({})
    const getNotes= async()=>{
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/notes`)
        const result= await response.json()
        setNotes (result)
    }
    useEffect(()=>{
        getNotes();
    },[notes])

    const deleteNote= async(id)=>{
        await fetch(`${process.env.REACT_APP_API_URL}/api/notes/`+id,{
            method: 'DELETE',
            mode: 'cors'
        })
    }
    const getNote= async(id)=>{
        const note= await fetch(`${process.env.REACT_APP_API_URL}/api/notes/`+id,)
        const result= await note.json()
        setOldNote(result)
    }
    return (
      <div className='content-app'>
      <div className='row'>
<div className='col-sm-12 col-md-4'>
        <Form oldNote={oldNote}/>
</div>
<div className='col-sm-12 col-md-8'>
    <ListGroup>
        {notes.map((note, index)=>(
            <Notes key={index} deleteNote={deleteNote} getNote={getNote} id={note._id} title={note.title} content={note.content}/>
        ))}
     
    </ListGroup>
</div>
      </div>
      </div>
      
      )
}