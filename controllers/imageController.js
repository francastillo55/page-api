const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  const { name } = req.files.image;
  //console.log(req.files);
  //req.body.user = req.user.userId;
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "users/file-upload2",
      public_id: "perfil2",
    }
  );

  const image = await Image.create({
    image: result.secure_url,
    user: req.user.userId,
    name: name,
  });
  //console.log(result);
  //fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image });
};

const getUserImages = async (req, res) => {
  const { userId } = req.user;

  const images = await Image.find({ user: userId });

  res.status(StatusCodes.OK).json({ images: images, count: images.length });
};

const deleteImage = async (req, res) => {
  const { id: pageId } = req.params;
  const { userId } = req.user;

  const image = await Image.findOne({ _id: pageId });

  if (!image) {
    throw new CustomError.NotFoundError(`No image with id : ${pageId}`);
  }

  if (!image.user.equals(userId)) {
    throw new CustomError.BadRequestError("Not allowed");
  }

  await image.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

module.exports = {
  uploadImage,
  getUserImages,
  deleteImage,
};
