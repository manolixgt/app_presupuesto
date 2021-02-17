const router = require('express').Router()

const ingController = require('../controllers/ingController')

router.get('/', ingController.list)
router.post('/add', ingController.save)
router.get('/backup', ingController.backup)
router.get('/delete/:id', ingController.delete)
router.get('/done/:id', ingController.done)

module.exports = router
