const express = require("express")
const router = express.Router()

//controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto } = require("../controllers/PhotoController")

//middlewares
const { photoInsertValidation, photoUpdateValidation, commentValidation } = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload")

//routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", getUserPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/",authGuard,imageUpload.single("image"),photoUpdateValidation(),validate,updatePhoto);
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)

module.exports = router;