const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');


const fetchAllFileAndDirectory = async (req, res) => {

    const publicDirectory = path.join(__dirname, '..', 'upload', req.params.directory || "");

    try {
        const stats = await fs.stat(publicDirectory);

        if (!stats.isDirectory()) {
            return res.status(404).json({
                status: false,
                message: "Folder is Empty"
            });
        }

        const items = await fs.readdir(publicDirectory);
        const data = [];

        for (const item of items) {
            const uploadDirectory = path.join(__dirname, "../");
            const absolutePath = path.join(publicDirectory, item);
            const itemPath = absolutePath.substring(uploadDirectory.length);

            const itemStatus = await fs.stat(absolutePath)
            try {

                if (itemStatus.isDirectory()) {
                    data.push({
                        type: 'directory',
                        name: item,
                        path: itemPath
                    });
                }

                if (itemStatus.isFile()) {
                    data.push({
                        type: 'file',
                        name: item,
                        path: itemPath,
                        extension: path.extname(item),
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    message: "Error in Fetching Directory or File",
                    error: error.message
                });
            }
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "Folder is Empty",
                status: false,
            });
        }

        return res.status(200).json({
            message: "Directory Read Successfully",
            status: true,
            data,
        });

    } catch (error) {

        if (error.code === "ENOENT") {
            return res.status(404).json({
                message: "Directory not Found",
                status: false,
            });
        }

        return res.status(500).json({
            message: "Error retrieving files",
            status: false,
            error: error.message
        });
    }
}

const createDirectory = async (req, res) => {

    const publicDirectory = path.join('upload', req.params.directory);

    const folder = req.body.folderName;
    const folderPath = path.join(publicDirectory, folder);

    try {

        const folderCreate = await fs.mkdir(folderPath, { recursive: true });

        if (folderCreate) {
            return res.status(200).json({
                status: true,
                message: "Created succeffully",
                folderCreate,
            });
        } else {
            return res.status(409).json({
                status: false,
                message: "Given directory is already exist"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const uploadFile = async (req, res) => {

    const publicDiirectory = path.join("upload", req.params.directory || "");

    try {

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, publicDiirectory);
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        const upload = multer({ storage: storage }).single('fileName');

        upload(req, res, function (error) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: "Error to upload file",
                    error: error
                })
            }

            return res.status(200).json({
                status: true,
                fileDetails: req.file,
                message: "Successfully uploaded"
            });
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const uploadMultipleFile = async (req, res) => {

    const publicDirectory = path.join('upload', req.params.directory || "");

    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, publicDirectory);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        const upload = multer({ storage: storage }).array('fileName', 10);

        upload(req, res, (error) => {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: "Error uploading file",
                    error: error.message
                });
            }

            const files = req.files;

            if (files) {
                return res.status(200).json({
                    status: true,
                    fileDetails: files,
                    message: "Successfully uploaded"
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "No files uploaded"
                });
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


const deleteFileorDirectory = async (req, res) => {

    const publicDirectory = path.join("upload", req.params.directory || "");

    try {
        const stat = await fs.stat(publicDirectory);

        if (stat.isDirectory()) {
            await fs.rm(publicDirectory, { recursive: true, force: true });
        } else {
            await fs.unlink(publicDirectory);
        }

        return res.status(200).json({
            status: true,
            message: "Deleted Successfully",
        })
    } catch (error) {

        return res.status(500).json({
            status: false,
            error: error.message
        });

    }
}


const deleteMultipleDirectoryOrFile = async (req, res) => {
    const paths = req.body.paths || [];

    if (!Array.isArray(paths) || paths.length === 0) {
        return res.status(400).json({
            status: false,
            message: "Please provide path to delete"
        });
    }

    try {

        for (const relativePath of paths) {
            const publicPath = path.join("upload", relativePath);

            const stat = await fs.stat(publicPath);

            if (stat.isDirectory()) {
                await fs.rm(publicPath, { recursive: true, force: true });
            } else {
                await fs.unlink(publicPath);
            }
        }

        return res.status(200).json({
            status: true,
            message: "Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

module.exports = {
    fetchAllFileAndDirectory,
    createDirectory,
    uploadFile,
    uploadMultipleFile,
    deleteFileorDirectory,
    deleteMultipleDirectoryOrFile
};

