const Notification = require('../models/notification');


const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            user: userId,
            message: message
        });

        await notification.save();

        console.log('Notification created:', notification);

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


const getUserNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

        if (!notifications) {
            return res.status(404).json({
                status: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            status: true,
            message: 'Notification mareked as read',
            notifications
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });

        if (!notification) {
            return res.status(404).json({
                status: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "Notification marked as read",
            notification
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deleteNotification = async (req, res) => {
    try {
        const notification = Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({
                status: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Notification deleted'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { createNotification, getUserNotification, markNotificationAsRead , deleteNotification };