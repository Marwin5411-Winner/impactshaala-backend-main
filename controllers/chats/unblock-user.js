import BlockedCharts from '../../models/blocked_chats/blocked_chats.js';
import Authentication from '../../models/auth/authenication.js';

async function unblockUser(req, res, next) {
    // Extract userId from isAuthenticated
    const userId = req.user.id;

    try {
        const userProfile = await Authentication.findById(userId);

        if (!userProfile) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const { recipientId } = req.params;

        if (recipientId === userId) {
            return res.status(400).json({
                success: false,
                message: "You can't block or unblock yourself"
            });
        }

        // Find the blocked user
        const unblock = await BlockedCharts.findOneAndDelete({
            senderId: userId,
            receiverId: recipientId
        });

        // If recipientId is not found in the blocked charts
        if (!unblock) {
            return res.status(404).json({
                success: false,
                message: "The user you are trying to unblock was not previously blocked by you."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User unblocked successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export default unblockUser;