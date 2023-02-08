import React from 'react'
import { Button, Card, CardActionArea, CardContent, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DisplayCard = ({ note }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const open = useSelector(state => state.deleteopen)
    const deleteid = useSelector(state => state.deleteid)

    const handleOpen = () => {
        dispatch({ type: 'deletedialog', payload: true})
        dispatch({ type: 'deleteid', payload: note.id})
    }

    const handleClose = () => {
        dispatch({ type: 'deletedialog', payload: false})
    }

    const deleteHandler = async () => {
        await fetch(`http://localhost:4000/notes/${deleteid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })

        dispatch({ type: 'deletedialog', payload: false})
        dispatch({ type: 'newNote'})
    }

  return (
    <div className='col-12 col-md-6 col-lg-4'>
        <Card sx={{ maxWidth: 345 }} style={{borderRadius: '27px', boxShadow: '25px 25px 51px #a4a4a4,-25px -25px 51px #ffffff'}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title: {note.title}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="text.secondary">
                        Description: {note.description}
                    </Typography>

                    <br/><br/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button onClick={() => {navigate(`/notes/${note.id}`)}}><i className="fa fa-thin fa-pen"></i> &nbsp;Edit</Button>
                        <Button style={{color:'red'}} onClick={handleOpen}><i className="fa fa-light fa-trash"></i> &nbsp;Delete</Button>
                    </div>        
                </CardContent>
            </CardActionArea>
        </Card>


        <Dialog open={open} onClose={handleClose} >
            <DialogTitle style={{marginTop:'1%'}}><h3>Are You Sure ?</h3></DialogTitle>
            <DialogContent style={{display:'flex',justifyContent:'space-between'}}>
                <Button onClick={handleClose} style={{border:'2px solid #1976D2',borderRadius:'10px',backgroundColor:'#1976D2',color:'white'}}>No</Button>
                <Button onClick={deleteHandler} style={{border:'2px solid red',borderRadius:'10px',backgroundColor:'red',color:'white'}}>Yes</Button>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DisplayCard