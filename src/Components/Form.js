import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    const dispatch = useDispatch()
    const title = useSelector(state => state.title)
    const description = useSelector(state => state.description)
    const titleerror = useSelector(state => state.titleerror)
    const descriptionerror = useSelector(state => state.descriptionerror)

    const handleClose = () => {
        dispatch({ type: 'dialog', payload: false })
        dispatch({ type: 'title', payload: '' })
        dispatch({ type: 'description', payload: '' })
    }


    const handleAdd = async (e) => {
        e.preventDefault()

        if (title === '') {
            dispatch({ type: 'titleerror', payload: true })
        }

        else if (title.length < 10 && description === '') {
            dispatch({ type: 'titleerror', payload: false })
            dispatch({ type: 'descriptionerror', payload: true })
        }

        else {

            let duplicate = false

            await fetch('http://localhost:4000/notes')
            .then(response => response.json())
            .then(notes => {
                notes.forEach(note => {
                    if(note.title === title) {
                        duplicate = true
                    }  
                })
            })


            if(duplicate === false) {
                dispatch({ type: 'titleerror', payload: false })
                dispatch({ type: 'descriptionerror', payload: false })
                dispatch({ type: 'dialog', payload: false})

                const note = {
                    id: Math.floor((Math.random()*100000000000)+1),
                    title: title,
                    description: description
                }

                await fetch("http://localhost:4000/notes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(note)
                })
                
                dispatch({ type: 'newNote'})
                dispatch({ type: 'title', payload: '' })
                dispatch({ type: 'description', payload: '' })
            }

            else {
                toast.error('Title already exists for another notes. Try using another title',{
                    position: 'top-center',
                })
            }
            
        }
    }


    return (
        <>
            <form>
                <div className="form-floating mb-3" style={{ marginTop: '2%' }}>
                    <input type="text" className="form-control" id="floatingInput" placeholder="Note Title" onChange={(e) => dispatch({ type: 'title', payload: e.target.value })} />
                    <label htmlFor="floatingInput">Note Title</label>
                    {titleerror && <p style={{ color: 'red' }}>This field is required.</p>}
                </div>
                <br />
                <div className="form-floating" style={{ marginTop: '1%' }}>
                    <input type="text" className="form-control" id="floatingDescription" placeholder="Description" onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} />
                    <label htmlFor="floatingDescription">Description</label>
                    {descriptionerror && <p style={{ color: 'red' }}>This field is required.</p>}
                </div>
                <br />
                <div>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit' onClick={handleAdd}>Add</Button>
                </div>
            </form>

            <ToastContainer/>
        </>
    )
}

export default Form