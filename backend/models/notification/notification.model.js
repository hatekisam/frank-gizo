const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
        action: {
                type: String,
                required: true,
        },
        doer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
        },
        recipients:{
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'User',
        },
}, {
        timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
