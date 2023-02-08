import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const EditPage = () => {
    
    const { noteid } = useParams()
    const [note, setNote] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [notesArray, setNotesArray] = useState([])
    const titleerror = useSelector(state => state.titleerror)
    const descriptionerror = useSelector(state => state.descriptionerror)

    const getTheNote = async () => {

        await fetch('http://localhost:4000/notes')
        .then(response => response.json())
        .then(notes => {
            notes.forEach(note => {
                if(note.id !== +noteid) {
                    setNotesArray(prev => [...prev, note])
                }
                
                if(note.id === +noteid) {
                        setNote(note)
                        setTitle(note.title)
                        setDescription(note.description)
                }  
            })
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()

        if (title === '') {
            dispatch({ type: 'titleerror', payload: true })
        }

        else if(title.length < 10 && description === '') {
            dispatch({ type: 'titleerror', payload: false })
            dispatch({ type: 'descriptionerror', payload: true })
        }

        else {

            let duplicate = false

            notesArray.map(note => {
                if(note.title === title) {
                    duplicate = true
                }
            })

            if(duplicate === false) {
                const notes = {
                    id: noteid,
                    title: title,
                    description: description
                }

                setNote(notes)
                
                fetch(`http://localhost:4000/notes/${noteid}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(notes)
                })

                toast.success('Edit SuccessFul',{
                    position:'top-center'
                })
            }

            else {
                toast.error('Title already exists for another notes. Try using another title',{
                    position: 'top-center',
                })
            }
            
        }
    }

    useEffect(() => {
        getTheNote()
    },[])

  return (
    <div>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1%',marginRight:'1%'}}> 
            <Button onClick={() => navigate('/')} style={{border:'2px solid #1976D2', borderRadius:'10px',backgroundColor:'#1976D2',color:'white'}}>Go to Home</Button>
        </div>
        <div style={{display:'flex',alignContent:'center',justifyContent:'flex-end',marginTop:'5%'}}>
            <h1 style={{textAlign:'center', flexGrow: 1}}>Edit your notes here</h1>
        </div>

        <Card sx={{ maxWidth: 345 }} key={noteid} style={{margin:'6% auto',borderRadius: '27px', boxShadow: '25px 25px 51px #a4a4a4, -25px -25px 51px #ffffff'}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title: {note.title}
                    </Typography>
                    <br/><br/>
                    <Typography variant="body2" color="text.secondary">
                        Description: {note.description}
                    </Typography>       
                </CardContent>
            </CardActionArea>
        </Card>

        <div style={{width:'50%',margin:'0 auto'}}>
            <form>
                <div className="form-floating mb-3" style={{ marginTop: '2%' }}>
                    <input type="text" className="form-control" id="floatingInput" placeholder="Note Title" defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="floatingInput">Note Title</label>
                    {titleerror && <p style={{ color: 'red' }}>This field is required.</p>}
                </div>
                <br />
                <div className="form-floating" style={{ marginTop: '1%' }}>
                    <input type="text" className="form-control" id="floatingDescription" placeholder="Description" defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
                    <label htmlFor="floatingDescription">Description</label>
                    {descriptionerror && <p style={{ color: 'red' }}>This field is required.</p>}
                </div>
                <br/>

                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Button type='submit' onClick={handleEdit} style={{border:'2px solid #1976D2',borderRadius:'10px',backgroundColor:'#1976D2',color:'white'}}>Edit</Button>
                </div>
            </form>
        </div>

        <ToastContainer/>
    </div>
  )
}

export default EditPage