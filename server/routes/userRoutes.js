import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  followUser,
  getUserFollowers,
  getUserFollowing,
  searchUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/:id', getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.post('/:id/follow', protect, followUser);
router.get('/:id/followers', getUserFollowers);
router.get('/:id/following', getUserFollowing);

export default router;
