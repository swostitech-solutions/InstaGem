import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  addComment,
  getUserPosts,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);
router.get('/user/:userId', getUserPosts);

export default router;
