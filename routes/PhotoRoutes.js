const express = require("express")
const router = express.Router()

//controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto} = require("../controllers/PhotoController")

//middlewares
const {photoInsertValidation, photoUpdateValidation} = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation");
const {imageUpload} = require("../middlewares/imageUpload")

//routes
router.post("/", authGuard,imageUpload.single("image"),photoInsertValidation(),validate,insertPhoto);
router.delete("/:id",authGuard, deletePhoto);
router.get("/",authGuard,getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id",authGuard, getPhotoById)
router.put("/:id",authGuard, photoUpdateValidation(), validate ,updatePhoto)

module.exports = router;