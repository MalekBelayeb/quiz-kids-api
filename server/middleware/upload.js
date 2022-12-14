// Packages
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

/* -------------------------------------------------------------------------- */
/*                                Disk Storage                                */
/* -------------------------------------------------------------------------- */

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '../../uploads/'))) {
            execSync(`mkdir "${path.join(__dirname, '../../uploads/')}"`);
        }
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        var filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        req.body.image = filename;
        cb(
            null,
            filename,
        );
    },
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    },
});

/* ---------------------------------- CONST --------------------------------- */
const upload = multer({ storage: storage });
const fileUpload = upload.fields([
    { name: 'image', maxCount: 1 }
]);

// Multer config
module.exports = { fileUpload };