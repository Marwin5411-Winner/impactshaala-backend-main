import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import xss from "xss";
import session from "express-session";
import http from 'http';
import { s3_buffer_upload } from "./utils/s3_bucket.js";

import './server-config-import.js'

import "express-async-errors";
import cron from "node-cron";

import path from "path";


import mongooseDriver from "./db/mongoose-connection.js";

const __dirname = path.resolve();



mongooseDriver();


const app = express();
const adminApp = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(xss);
app.use(cors('*'));

// This allows us to pass data from the form
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());

adminApp.use(express.json());
adminApp.use(bodyParser.urlencoded({ extended: true }));
adminApp.use(express.text());


app.use(
  session({
    secret: "something",
    cookie: {
      maxAge: 60000 * 60 * 24 * 30, // 30 day
    },
    resave: true,
    saveUninitialized: true,
  })
);

adminApp.use(
  session({
    secret: "something",
    cookie: {
      maxAge: 60000 * 60 * 24 * 30, // 30 day
    },
    resave: true,
    saveUninitialized: true,
  })
);

const baseUrl = "/api/v1";
const adminUrl = "/admin-panel";

import modules from "./module-routes.js"
app.use(`${baseUrl}`,modules);

// ADMIN ROUTES
adminApp.set("view engine", "ejs");
adminApp.use(
  adminUrl,
  express.static(path.join(__dirname, "/admin-panel/frontend/static"))
);


import adminRoutes from "./admin-routes.js"
import { Server } from "socket.io";
import saveChat from "./socketControllers/chats/save-chat.js";
import { getFriends} from "./controllers/user/get-friends.js";
import { getChats } from "./controllers/chats/get-chats.js";
import { checkBlockedUser } from "./controllers/chats/check-blocked-user.js";
import { updateLastSeen } from "./controllers/user/update-last-seen.js";
import { getLastSeen } from "./controllers/user/get-last-seen.js";
adminApp.use(`${adminUrl}`, adminRoutes);


adminApp.all("*", (req, res, next) => {
  console.log(`API Request: ${req.method} ${req.originalUrl}`);
  if (req.path.startsWith("/admin-panel")) {
      console.log('Test 1');
    if (req.path === "/admin-panel/authentication/login") {
        console.log('Test 2');
      if (req.session.login_status === true) {
          console.log('Test 3');
        return res.redirect("/admin-panel/dashboard/dashboard");
      }
      next();
    } else if (req.session.login_status === true) {
      next();
    } else {
      console.log("Not logged in lalalalal");
      return res.redirect("/admin-panel/authentication/login");
    }
  } else {
    next();
  }
});

const BACKEND_PORT = process.env.BACKEND_PORT || 3001;
const ADMIN_PANEL_PORT = process.env.ADMIN_PANEL_PORT || 3002;

app.get("/", (req, res) => {
  res.send("Welcome to Impactshaala Beta Backend!");
});

adminApp.get('/',(req,res)=>{
  res.redirect('/admin-panel/authentication/login');
})

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "OPTIONS"]
	}
})

const usersList = {}

io.on("connection", (socket) => {
  let id = ""
  socket.on('start-chat', async ({_id}) => {
    id = _id;
    usersList[_id] = socket.id

    try {
      const friends = await getFriends(id)
      socket.emit("friendList", friends)
    } catch(err) {
      socket.emit("friendList")
    }
  })

  socket.on('message', async (data, cb) => {
    const {senderId, receiverId, encryptedContent, createdAt, attachment, attachmentType} = data;
    if(usersList[receiverId]) {
      socket.emit('is-online', "Online")
      io.to(usersList[receiverId]).emit('message', {senderId, receiverId, encryptedContent, createdAt, attachment, attachmentType})
    } else {
      try {
        const {lastSeen} = (await getLastSeen(data.receiverId))
        const time = (new Date(lastSeen?lastSeen:Date.now())).toLocaleTimeString('en-IN', {hour: "numeric", minute: "2-digit"})
        socket.emit('is-online', `Last Seen ${time}`)
      } catch(err) {
        console.log(err)
      }
    }
  })

  socket.on("get-messages", async (data) => {
    const messages = await getChats(data)

    let online = ""
    if(!!usersList[data.receiverId]) online = "Online"
    else {
      const receiver = (await getLastSeen(data.receiverId))
      if(receiver) {
        const { lastSeen } = receiver
        const time = (new Date(lastSeen?lastSeen:Date.now())).toLocaleTimeString('en-IN', {hour: "numeric", minute: "2-digit"})
        online = time
      }
    }

    socket.emit('get-messages', {
      messages,
      online
    })
  })

  socket.on("check-blocked", async (data) => {
    const resp = await checkBlockedUser(data)
    const senderObj = {}
    const receiverObj = {}

    senderObj.success = !!resp;
    
    if(resp) {
      if(data.senderId === resp.senderId.toString()) {
        senderObj.message = "You have blocked the user, unblock to continue chatting"
        receiverObj.message = "You have been blocked by this user"
      }
      if(resp.receiverId.toString() === data.senderId) {
        senderObj.message = "You have been blocked by this user"
        receiverObj.message = "You have blocked the user, unblock to continue chatting"
      }
      senderObj.senderId = resp.senderId
      senderObj.receiverId = resp.receiverId
    }
    socket.emit("check-blocked", senderObj)
  })

  socket.on("disconnect", () => {
    try {
      updateLastSeen(id)
    } catch(err) {
      console.log(err)
    }
    delete usersList[id]
  })
})

// app.listen(BACKEND_PORT, () => console.log(`Impactshaala beta backend server running on port ${BACKEND_PORT}`))

server.listen(BACKEND_PORT, () => {
  console.log(`Impactshaala beta backend server running on port ${BACKEND_PORT}`)
})

adminApp.listen(ADMIN_PANEL_PORT, () => {
  console.log(`Admin Panel Started at ${ADMIN_PANEL_PORT}`);
})