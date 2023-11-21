const { register, login, SetAvatar, getAllUsers } = require('../controllers/usersController');

const router = require('express').Router();

//Jo bhi frontend me routes taiyar hote hai unki functionality yaha aake likhi jaati hai.

router.post('/register',register)
router.post('/login',login)
router.post('/SetAvatar/:id',SetAvatar)
router.get('/allUsers/:id',getAllUsers)

module.exports = router;