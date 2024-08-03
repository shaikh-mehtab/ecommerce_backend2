const express = require("express");
const { createNotification,
    getUserNotification,
    markNotificationAsRead,
    deleteNotification
} = require("../controller/notification");
const notificationRoter = express.Router();

notificationRoter.post('/create', createNotification);
notificationRoter.get('/get', getUserNotification);
notificationRoter.put('/update/:id', markNotificationAsRead);
notificationRoter.delete('/delete/:id', deleteNotification);


module.exports = notificationRoter;  
