import axios from 'axios'

//http://localhost:5000/posts/getAllPosts

const url = 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url + '/getAllPosts');
export const createPost = (newPost) => axios.post(url + '/createPost', newPost);
export const updatePost = (id, updatedPost) => axios.patch(url + '/updatePost/' + id, updatedPost);
export const deletePost = (id) => axios.delete(url + '/deletePost/' + id);
export const likePost = (id) => axios.patch(url + '/likePost/' + id);