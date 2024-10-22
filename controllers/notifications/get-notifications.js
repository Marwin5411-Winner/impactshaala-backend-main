import Notification from '../../models/notifications/notifications.js'
import User from '../../models/user/user.js';


const getNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ authId: req.user.id})
    console.log(user)
    const notifications = await Notification.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(20);  // Limit to recent 20 notifications

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

export default getNotifications;
