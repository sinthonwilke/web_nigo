const express = require('express');
const router = express.Router();
const { uploadUserImg } = require('../middleware/storage');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    updateUser,
    findUser,
} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', validateTokenHandler(), logoutUser);
router.get('/', validateTokenHandler(), currentUser);
router.put('/update', validateTokenHandler(), uploadUserImg, updateUser)
router.post('/find', findUser);

module.exports = router;