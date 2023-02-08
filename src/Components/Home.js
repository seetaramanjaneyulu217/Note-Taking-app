import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from './Modal'
import DisplayCard from './DisplayCard'

const Home = () => {

  const [notes, setNotes] = useState([])
  const newNote = useSelector(state => state.newNote)

    const getData = async () => {
        await fetch('http://localhost:4000/notes')
        .then(response => response.json())
        .then(notes => {
            setNotes(notes)
        }) 
    }

    useEffect(() => {
        getData()
    },[newNote])

  return (
    <div>
        <div className='container-fluid' style={{display:'flex',alignItems:'end',justifyContent:'right'}}>
          <Modal/>
        </div>

        <div className='container' style={{marginTop:'5%'}}>
           <div className='row'>
              {notes.length === 0 ? <h1 style={{textAlign:'center', marginBottom:'5%'}}>No notes present here. You can add one now.</h1> : <h1 style={{textAlign:'center', marginBottom:'5%'}}>Your Notes</h1>}
              {notes.map(note => {
                return (
                  <DisplayCard note={note} key={note.id}/>
                )
              })}
           </div>
        </div>
    </div>
  )
}

export default Home