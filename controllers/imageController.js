const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const { name, size, mimetype, tempFilePath } = req.files.media;

  const maxVideoSize = 100 * 1024 * 1024; // 100 MB
  const maxImageSize = 2 * 1024 * 1024; // 2 MB
  //const file = req.files.media; // usa el mismo campo para ambos
  //const tempPath = file.tempFilePath;

  const isVideo = mimetype.startsWith("video/");
  const isImage = mimetype.startsWith("image/");

  if (!isImage && !isVideo) {
    return res.status(400).json({ error: "Archivo no soportado." });
  }

  if ((isImage && size > maxImageSize) || (isVideo && size > maxVideoSize)) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 2MB or a video smaller than 100MB"
    );
  }

  const publicId = `${name}_${Date.now()}`;
  const result = await cloudinary.uploader.upload(tempFilePath, {
    resource_type: isVideo ? "video" : "image",
    //use_filename: true,
    folder: `users/${req.user.userId}`,
    public_id: publicId,
  });

  const image = await Image.create({
    image: result.secure_url,
    user: req.user.userId,
    name: name,
    type: mimetype,
    size: size,
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
