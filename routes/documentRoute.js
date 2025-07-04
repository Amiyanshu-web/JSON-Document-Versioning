const express = require('express');
const { createDocument, getDocument, deleteDocument, updateDocument } = require('../controllers/documentController');
const { getVersion, getAllVersions, rollbackVersion, getDiffById, getLatestDiff } = require('../controllers/versionController');
const protect = require('../middleware/auth');
const router = express.Router();

// POST / documents - Create document --done
// PUT / documents /: id - Update(creates new version)
// GET / documents /: id - Get current version --done
// DELETE / documents /: id - Delete document --done
// GET / documents /: id / versions - List versions(paginated)
// GET / documents /: id / versions /: versionId - Get specific version
// GET / documents /: id / versions /: versionId / diff - Show diff from previous version
// POST / documents /: id / rollback - Rollback to version


router.route('/').post(protect,createDocument);
router.route('/:id').get(getDocument).delete(protect, deleteDocument). put(protect, updateDocument);
router.route('/:id/versions/diff').get(getLatestDiff);
router.route('/:id/versions').get(getAllVersions);
router.route('/:id/versions/:versionId').get(getVersion);
router.route('/:id/versions/:version1/diff/:version2').get(getDiffById);
router.route('/:id/rollback/:versionId').post(protect, rollbackVersion);

module.exports = router;