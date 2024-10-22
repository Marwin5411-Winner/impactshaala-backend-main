import express from "express";
import path from "path";

const modules = express();
const __dirname = path.resolve();

modules.set("view engine", "ejs");
modules.set("views", path.join(__dirname, "/admin-panel/frontend/pages"));

import login from "./admin-panel/backend/login.js";
modules.use("/authentication", login);

import users from "./admin-panel/backend/users.js";
modules.use("/users", users);

import chats from "./admin-panel/backend/chats.js";
modules.use("/chats", chats);

import dashboard from "./admin-panel/backend/dashboard.js";
modules.use("/dashboard", dashboard);

import collaboration from "./admin-panel/backend/collaboration.js";
modules.use("/collabs",collaboration);

import internships from "./admin-panel/backend/internship.js";
modules.use("/internships",internships);

import enquiry from "./admin-panel/backend/enquires.js";
modules.use("/enquiry",enquiry);

import mediaPosts from './admin-panel/backend/media-posts.js';
modules.use("/media-posts", mediaPosts);

import reportedMediaPosts from './admin-panel/backend/reported-media-posts.js'
modules.use("/reported-media-posts", reportedMediaPosts)

import polls from './admin-panel/backend/polls.js';
modules.use("/polls", polls);

import reportedPolls from './admin-panel/backend/reported-polls.js';
modules.use("/reported-polls", reportedPolls)

import accomplishments from './admin-panel/backend/accomplishment.js';
modules.use("/accomplishment", accomplishments)

export default modules;