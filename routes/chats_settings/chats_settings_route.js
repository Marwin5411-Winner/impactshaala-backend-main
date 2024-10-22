import express from 'express';
const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

import chatSettingConfigOptions from "../../controllers/chats_settings/chat-setting-config-options.js";
import updateMyChatSettings from "../../controllers/chats_settings/update-my-chat-settings.js";
import listMyChatSettings from "../../controllers/chats_settings/list-my-chat-settings.js";

router.get('/chat-setting-config-options',isUserAuthenticated,chatSettingConfigOptions);
router.put('/update-my-chat-settings',isUserAuthenticated,updateMyChatSettings);
router.get('/list-my-chat-settings',isUserAuthenticated,listMyChatSettings);

export default router;