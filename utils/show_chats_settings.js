import {chatsSettingsEnum} from "../consts/userenums.js";

export const showAllChatSettings = [
    {
        "chat_settings":"Chat is open to the user with mutual collaboration keywords only",
        "enum":chatsSettingsEnum.settings[0]
    },
    {
        "chat_settings":"Chat open to accepted collaboration request only",
        "enum":chatsSettingsEnum.settings[1]
    },
    {
        "chat_settings":"Chat open to everyone",
        "enum":chatsSettingsEnum.settings[2]
    }
]