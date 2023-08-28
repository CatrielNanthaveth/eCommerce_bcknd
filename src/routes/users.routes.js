const { Router } = require('express');
const { requireRole } = require('../utils/requireRole');
const { getAllUsers, getUser, createUser, deleteUser } = require('../controllers/users.controllers');

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', requireRole('superadmin'), deleteUser );

router.put('/users', requireRole('superadmin'));

module.exports = router;