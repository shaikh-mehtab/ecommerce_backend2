const express = require('express');

const { fetchAllFileAndDirectory,
    createDirectory,
    uploadMultipleFile,
    deleteFileorDirectory,
    deleteMultipleDirectoryOrFile,
    uploadFile
} = require('../controller/filemanager');

const Filerouter = express.Router();


Filerouter.get('/get-directory/:directory(*)', fetchAllFileAndDirectory);
Filerouter.post('/create-folder/:directory(*)', createDirectory);
Filerouter.post('/upload/:directory(*)',uploadFile );
Filerouter.post('/upload-multiple-file/:directory(*)', uploadMultipleFile);
Filerouter.delete('/delete/:directory(*)',deleteFileorDirectory);
Filerouter.delete('/delete-multiple/:directory(*)',deleteMultipleDirectoryOrFile);



module.exports = Filerouter