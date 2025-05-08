import {
    QueryListOfPosts,
    QueryPostById,
    QueryCreatePost,
    QueryUpdatePost,
    QueryDeletePost
} from '../service/post.js';

export const getAllPosts = async (req, res) => {
    const posts = await QueryListOfPosts();
    res.send(posts);
}

export const getPostById = async (req, res) => {
    const post = await QueryPostById(req.params.id);
    res.send(post);
}

export const createPost = async (req, res) => {
    const post = await QueryCreatePost(req.body);
    res.send(post);
}

export const updatePost = async (req, res) => {
    const post = await QueryUpdatePost(req.params.id, req.body);
    res.send(post);
}

export const deletePost = async (req, res) => {
    const post = await QueryDeletePost(req.params.id);
    res.send(post);
}