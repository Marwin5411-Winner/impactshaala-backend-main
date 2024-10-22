import User from "../../models/user/user.js";

export const getAllAccomplishments = async (req, res) => {
  try {
    const authId = req.params.id;

    const user = await User.findOne({ authId }).select("accomplishments");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, accomplishments: user.accomplishments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
