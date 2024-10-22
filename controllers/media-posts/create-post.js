import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";
import {s3_buffer_upload,imageExtension} from "../../utils/s3_bucket.js";
import getBase64Size from "../../utils/check-image-size.js"
import createNotification from "../../utils/notification/sendGeneralNotification.js";
import sendNotificationEmail from "../../utils/helper/emailNotification.js";


async function createPost(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try {
        let user = await User.findOne({ authId: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let { images, description } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload images to create a new post" });
        }

        if(description.length>500){
            return res.status(400).json({success: false, message: "Please provide description within 500 characters"});
        }

        console.log(`Description : ${description.length}`);

        const savePosts = [];

        const uploadPost = await MediaPosts.create({
            userId: user._id,
            description: description,
        });

        if (images.length > 5) {
            return res.status(400).json({ success: false, message: "You can upload max 5 images." });
        }


        for (let i = 0; i < images.length; i++) {
            let image = images[i];
            // uploading user profile pic
            // Check the size of the base64 image
            const checkSize = getBase64Size(image);
            if (checkSize > 500) {
                return res.status(400).json({ success: false, message: "Image exceeds 500 KB image limit." });
            }

            image = image.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(image, "base64");
            const extension = imageExtension(buffer);
            const uploadImage = await s3_buffer_upload(buffer, `impactshaala`, `${uploadPost._id}_${i}.${extension}`);

            // Assuming MediaPosts is a Mongoose model
            const savePost =uploadImage;
            savePosts.push(savePost);
        }

            uploadPost.image = savePosts;
            await uploadPost.save();

            //Notification
            await createNotification(user._id, "You has posted a Media Post", "OTHER");

            await sendNotificationEmail({
              email: req.user.email,
              userName: user.name,
              notificationType: "New Post",
              notificationMessage: "You has posted a Media Post",
              actionLink: "https://impactshaala.com"
            });
            




        return res.status(200).json({ success: true, message: "Created Post Successfully", data: uploadPost });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default createPost;