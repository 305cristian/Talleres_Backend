const {Router} = require('express');
const router = Router();


const {getTalleresArea, getTalleres_area} = require('../controllers/talleres_controller');

    
router.route('/')
        .get(getTalleresArea);

router.route('/:id')
        .post(getTalleres_area) 



module.exports = router;

