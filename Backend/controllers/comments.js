import {
    QueryListOfComments,
    QueryCommentById,
    QueryCreateComment,
    QueryUpdateComment,
    QueryDeleteComment
} from '../service/comments.js';

export const getAllComments = async (req, res) => {
    const Comments = await QueryListOfComments();
    res.send(Comments);
}

export const getCommentById = async (req, res) => {
    const comment = await QueryCommentById(req.params.id);
    // res.send(comment);
    res.status(200).json(comment);

}

export const createComment = async (req, res) => {
    const comment = await QueryCreateComment(req.body);
    res.send(comment);
}

export const updateComment = async (req, res) => {
    const comment = await QueryUpdateComment(req.params.id, req.body);
    res.send(comment);
}

export const deleteComment = async (req, res) => {
    const comment = await QueryDeleteComment(req.params.id);
    res.send(comment);
}