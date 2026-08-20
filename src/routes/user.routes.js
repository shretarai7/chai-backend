import { Router } from "express";

import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    updateAccountDetails,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage); //upload.single("coverImage") is used to upload a single file with the field name "coverImage" and this is a multer middleware that will handle the file upload and store it in the specified destination folder and then we can access the file in the controller using req.file
router.route("/c/:username").get(verifyJWT, getUserChannelProfile); //get user by username and this is also a params
router.route("/watch-history").get(verifyJWT, getWatchHistory); //get user watch history 





export default router;