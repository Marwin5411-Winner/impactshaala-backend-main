import express from "express";


import createAccomplishment from "../../controllers/my-accomplishments/createMyAccomplishment.js";
import { getAllAccomplishments } from "../../controllers/my-accomplishments/getAllMyAccomplishment.js";
import deleteAccomplishment from "../../admin-panel/backend/accomplishment-middleware/delete-accomplishment.js";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

const router = express.Router();

// Create a new accomplishment
router.post("/", isUserAuthenticated, createAccomplishment);

// Get all accomplishments for the logged-in user
router.get("/:id", isUserAuthenticated, getAllAccomplishments);

// Delete an accomplishment
router.delete("/:accomplishmentId", isUserAuthenticated, deleteAccomplishment);

export default router;
