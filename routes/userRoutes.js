const express = require('express');
const { deleteUser, updatePassword, getUsers, addUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/add-user', authMiddleware, roleMiddleware(['admin']), addUser);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);
router.get('/users', authMiddleware, getUsers);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);
router.put('/update-password', authMiddleware, updatePassword);

module.exports = router;
