import express from 'express';
const router = express.Router();
import {
  uploadVideo,
  getAllVideos,
  getVideo,
  updateVideo,
  deleteVideo,
  publishVideo,
  unpublishVideo,
  getVideoAnalytics
} from '../controllers/videoController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { upload } from '../controllers/uploadController.js';

// All routes require admin authentication
router.use(adminAuth);

// Video CRUD operations
router.post('/', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), uploadVideo);

router.get('/', getAllVideos);
router.get('/:id', getVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

// Publish/Unpublish
router.patch('/:id/publish', publishVideo);
router.patch('/:id/unpublish', unpublishVideo);

// Analytics
router.get('/:id/analytics', getVideoAnalytics);

export default router;
