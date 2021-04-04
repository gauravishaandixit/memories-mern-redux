import mongoose from 'mongoose'
import Post from '../models/Post.js'

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        res.status(200).send(posts)
    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
}

export const createPost = async (req, res) => {
    try{
        const newPost = await (new Post(req.body)).save();
        res.status(200).send(newPost)
    } catch(error){
        console.log(error)
        res.status(409).send(error)
    }
}

export const updatePost = async (req, res) => {
    const { id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No Post With The ID.')

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true});
    return res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id : _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No Post With The ID.')

        const deletedPost = await Post.findByIdAndRemove(_id);
        
        return res.send(deletedPost)
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No Post With The ID.')

    const post = await Post.findById(_id);
    const updatedPost = await Post.findByIdAndUpdate(_id, {likeCount : post.likeCount + 1},{new : true});

    return res.send(updatedPost)

}