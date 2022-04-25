// const path = require('path')
// const multer = require('multer')

// var storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// })


// var upload = multer({
//     storage: storage,
//     // fileFilter: function (req, file, callback) {
//     //     if (
//     //         file.mimetype == "image/png" ||
//     //         file.mimetype == "image/jpg"
//     //     ) {
//     //         callback(null, true)
//     //         //}else{
//     //         console.log("only jpg & png file supported!")
//     //         callback(null, false)
//     //     }
// })
// // limits: {
// //     fileSize: 1024 * 1024 * 2
// // } 

// module.exports = upload; 

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFsStorage({
    url: process.env.DATABASE_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    },
    options: {
        useUnifiedTopology: true,
    }
});

module.exports = multer({ storage });