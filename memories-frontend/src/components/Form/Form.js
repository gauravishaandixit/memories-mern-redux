import React, { useState, useEffect } from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'



import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId, setCurrentId}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const[post, setPost] = useState({creator : '', title: '', message: '', tags: '', selectedFile: '' })
    const editPost = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    
    useEffect(() => {
        if(editPost)
        setPost(editPost)
    },[editPost])
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(currentId)
            dispatch(updatePost(currentId, post));
        else
            dispatch(createPost(post));

        clear();
    }

    const clear = () => {
        setCurrentId(null)
        setPost({creator : '', title: '', message: '', tags: '', selectedFile: '' })
    }




    return (
        <Paper className = {classes.paper}>
            <form autoComplete = 'off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography variant = 'h6'>{currentId ? "Editing " + editPost.title :"Creating A Memory"}</Typography>
                <TextField 
                    name = 'creator'
                    variant = 'outlined'
                    label = 'Creator'
                    fullWidth
                    value = {post.creator}
                    onChange = {(e) => setPost({...post, creator: e.target.value})}
                    />
                <TextField 
                    name = 'title'
                    variant = 'outlined'
                    label = 'Title'
                    fullWidth
                    value = {post.title}
                    onChange = {(e) => setPost({...post, title: e.target.value})}
                    />
                <TextField 
                    name = 'message'
                    variant = 'outlined'
                    label = 'Message'
                    fullWidth
                    value = {post.message}
                    onChange = {(e) => setPost({...post, message: e.target.value})}
                    />
                <TextField 
                    name = 'tags'
                    variant = 'outlined'
                    label = 'Tags'
                    fullWidth
                    value = {post.tags}
                    onChange = {(e) => setPost({...post, tags: e.target.value.split(",")})}
                    />

                <div className = {classes.fileInput}>
                    <FileBase
                        type = 'file'
                        multiple = {false}
                        onDone = {({base64}) => setPost({...post, selectedFile : base64})}
                    />
                </div>

                <Button className = {classes.buttonSubmit} variant = "contained" color = 'primary' size = 'large' fullWidth type = 'submit' >Submit</Button>
                <Button className = {classes.buttonSubmit} variant = "contained" color = 'secondary' size = 'large' fullWidth onClick = {clear}>Clear</Button>
            </form>
        </Paper>
    );
}
export default Form;