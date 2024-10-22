const markNotificationAsRead = async (req, res) => {
    try {
      const { notificationId } = req.params;
  
      const notification = await Notification.findById(notificationId);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      notification.isRead = true;
      await notification.save();
  
      return res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to mark notification as read' });
    }
  };
  
  export default markNotificationAsRead;
  