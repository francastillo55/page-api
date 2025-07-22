const PageContent = require("../models/PageContent");
const PageMetadata = require("../models/PageMetadata");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const createFullPage = async (req, res) => {
  req.body.user = req.user.userId;
  const { name, description, user, page } = req.body;
  const pageMeta = await PageMetadata.create(req.body);

  const pageCont = await PageContent.create({
    ...req.body,
    pageId: pageMeta._id,
  });

  res.status(StatusCodes.CREATED).json({ msj: "good" });
};

module.exports = {
  createFullPage,
};
