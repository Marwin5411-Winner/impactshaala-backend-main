import express from "express";

const modules = express();

import authentication from "./routes/authentication/routes.js";
import profile from "./routes/profile/profile_routes.js";
import chats from "./routes/chats/chats_route.js";
import collabs from "./routes/collabs/collabs_route.js";
import geolocation from "./routes/geolocation/list-states-and-districts.js";
import chatsettings from "./routes/chats_settings/chats_settings_route.js";
import internship from "./routes/internship/internship_routes.js";
import enquiry from "./routes/enquiry/enquries_routes.js";
import manageAdmins from "./routes/manage-admins-routes/manage-admins-routes.js";
import mediaPosts from "./routes/media-posts-routes/media-posts-routes.js";
import polls from "./routes/polls-routes/polls-routes.js";
import accomplishments from './routes/accomplishment/accomplishment_routes.js';
import search_routes from './routes/search/search_routes.js';
import community from './routes/community/community_route.js';
import notification from './routes/notifications/notifications_route.js';
import myAccomplishments from './routes/myAccomplishment/myaccomplishment-route.js'


modules.use("/authentication", authentication);
modules.use("/accomplishment", accomplishments);
modules.use("/profile", profile);
modules.use("/chats", chats);
modules.use("/collabs",collabs);
modules.use("/geolocation",geolocation);
modules.use("/chats-settings",chatsettings);
modules.use("/internship",internship);
modules.use("/enquiry",enquiry);
modules.use("/org-admins",manageAdmins);
modules.use("/media-post",mediaPosts);
modules.use("/polls",polls);
modules.use("/search", search_routes);
modules.use("/community", community);
modules.use("/notifications", notification);
modules.use("/my-accomplishments", myAccomplishments);


export default modules;