import Notification from "../../models/notifications/notifications.js";
import User from "../../models/user/user.js";

// Generic function to create a notification
const createNotification = async (userId, message, type, eventId, eventType) => {
    try {
      const newNotification = new Notification({
        userId: userId,  // The user who will receive the notification
        message: message,  // The notification message
        type: type,  // The type of the notification (e.g., MESSAGE, LIKE, COMMENT)
        eventId: eventId,  // The event triggering the notification (optional)
        eventType: eventType,  // Specifies the model for the event (optional)
      });
  
      // Save the notification to the database
      const savedNotification = await newNotification.save();
  
      console.log('Notification created:', savedNotification);
      return savedNotification;
    } catch (err) {
      console.error('Error creating notification:', err);
      throw err;
    }
  };


export default createNotification;