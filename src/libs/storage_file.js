const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if(ext==='.jpeg' ||ext==='.png' || ext==='.jpg'){
           console.log('-------------------------')
            cb(null, 'src/storage/img');
        }else if(ext==='.mp4' || ext==='.vlc' || ext==='.avi'){
            cb(null, 'src/storage/video');
        }
        
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);    
        cb(null, file.fieldname + '-' + Date.now() + ext);
              
    }
});
const upload = multer({storage: storage});

module.exports = upload;