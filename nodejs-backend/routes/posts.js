import express from 'express'
import {getPosts, createPost, updatePost, deletePost, likePost} from '../contollers/posts.js'
const router = express.Router();

router.get('/getAllPosts', getPosts);
router.post('/createPost', createPost);
router.patch('/updatePost/:id', updatePost);
router.delete('/deletePost/:id', deletePost);
router.patch('/likePost/:id', likePost)

export default router;