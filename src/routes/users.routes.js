const { Router } = require('express');
const { requireRole } = require('../utils/requireRole');
const { getAllUsers, getUser } = require('../controllers/users.controllers');

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUser);

router.post('/users');

router.delete('/users', requireRole('superadmin'));

router.put('/users', requireRole('superadmin'));

module.exports = router;