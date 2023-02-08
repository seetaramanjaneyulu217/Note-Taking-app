import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button} from '@mui/material'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'

const Modal = () => {

    const dispatch = useDispatch()
    const open = useSelector(state => state.addopen)

    const handleOpen = () => {
        dispatch({type:'dialog',payload:true})
    }

    const handleClose = () => {
        dispatch({type:'dialog',payload:false})
    }


    return (
        <>
            <Button onClick={handleOpen} style={{border:'2px solid #1976D2',borderRadius:'10px',backgroundColor:'#1976D2',color:'white',marginTop:'1%'}}><i className="fa fa-thin fa-plus"></i>&nbsp; Add New Note</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{marginTop:'1%'}}><h1>Enter the Note</h1></DialogTitle>
                <DialogContent>
                    <Form/>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Modal