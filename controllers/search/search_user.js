import User from "../../models/user/user.js"; // Assuming your User model is in the models folder
import mongoose from 'mongoose';

// Search API
export const searchProfile = async (req, res) => {
  try {
    const { search } = req.query; // Get the search query from the request
    let query = {};
    // Construct query for multiple fields: name, accountType, location, and keywords (assuming keywords is an array or reference)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { accountType: { $regex: search, $options: "i" } }, // Case-insensitive search by account type
        { location: { $regex: search, $options: "i" } }, // Case-insensitive search by location
      ];

      // If collabKeywords is an array of ObjectIds (optional)
      if (mongoose.Types.ObjectId.isValid(search)) {
        query.$or.push({ collabKeywords: mongoose.Types.ObjectId(search) });
      }
    }

    // Perform the search
    const userProfile = await User.find(query).select(
      "_id authId name tagline description profilePic accountType location collabKeywords"
    );

    // If no users are found, return a 404 response
    if (userProfile.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found with the provided search criteria.",
      });
    }

    // Return the users that match the search query
    return res.status(200).json({
      success: true,
      users: userProfile,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};

export default searchProfile;
