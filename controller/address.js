const Address = require('../models/address');

const getAddress = async (req, res) => {
    try {
        const address = await Address.find();

        if (address.length == 0) {
            res.status(404).json({
                status: false,
                message: "Adress not found"
            });
        }

        res.status(200).json({
            status: true,
            address,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            res.status(404).json({
                status: false,
                messaage: "Address not found"
            });
        }

        res.status(200).json({
            status: true,
            address,
        })
    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const createAddress = async (req, res) => {
    try {
        const createdAddres = await Address.create(req.body);

        res.status(200).json({
            status: true,
            message: "Created Successfully",
            createdAddres,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


const updateAddress = async (req, res) => {
    try {

        const updatedAddress = await Address.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });

        if (!updatedAddress) {
            res.status(404).json({
                status: false,
                messaage: "Address not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated Successfully",
            updatedAddress,
        })

    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);

        if (!address) {
            res.status(404).json({
                status: false,
                messaage: "Address not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deleted Successfully"
        });

    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { getAddress, getAddressById, createAddress, updateAddress, deleteAddress }
