import Project from "../../models/project/project.js";
import User from "../../models/user/user.js";

const createProject = async (req, res, next) => {
  const {
    collaborationType,
    projectTitle,
    collaborateWith,
    stakeholders,
    providing,
    receiving,
    language,
    tenure,
    objective,
    description,
    startDate,
    endDate,
    locationType,
    serviceType,
  } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user exists
    const user = await User.findOne({ authId: userId }).lean();
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found!!" });
    if (user.userType1.toLowerCase() === "student")
      return res
        .status(401)
        .json({ success: false, message: "Students cannot create projects" });

    // Check if all the required fields are present
    if (
      !collaborationType ||
      !projectTitle ||
      !collaborateWith ||
      !stakeholders ||
      stakeholders.length === 0 ||
      !providing ||
      providing.length === 0 ||
      !receiving ||
      receiving.length === 0 ||
      !language ||
      language.length === 0 ||
      !tenure ||
      !objective ||
      !description ||
      !startDate ||
      !endDate ||
      !locationType ||
      !serviceType
    )
      return res
        .status(400)
        .json({ success: false, message: "Required fields are not present" });

    // Build the creation object
    const data = {
      collaborationType,
      projectTitle,
      collaborateWith,
      stakeholders,
      providing,
      receiving,
      language,
      tenure,
      objective,
      description,
      startDate,
      endDate,
      locationType,
      serviceType,
    };
    const project = await Project({ userId, ...data });
    const savedData = await project.save();
    if (!savedData)
      return res
        .status(500)
        .json({
          success: false,
          message: "Error while trying to create the project",
        });

    //Notification
    await createNotification(user._id, "You has posted a Project Post, You post is under Review", "OTHER");

    await sendNotificationEmail({
      email: req.user.email,
      userName: user.name,
      notificationType: "New Post",
      notificationMessage: "You has posted a Project Post, You post is under Review",
      actionLink: "https://impactshaala.com/",
    });

    return res.json({
      success: true,
      message: "Successfully created the project",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default createProject;
