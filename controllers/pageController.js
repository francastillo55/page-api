const Page = require("../models/Page");
const PageContent = require("../models/PageContent");
const PageMetadata = require("../models/PageMetadata");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const createPage = async (req, res) => {
  req.body.user = req.user.userId;

  const pageMeta = await PageMetadata.create(req.body);

  const pageCont = await PageContent.create({
    ...req.body,
    pageId: pageMeta._id,
  });

  //res.status(StatusCodes.CREATED).json({ msj: "good" });

  ///////////////////////////
  // req.body.user = req.user.userId;
  // const page = await Page.create(req.body);
  res.status(StatusCodes.CREATED).json({ id: pageMeta._id });
};

const getAllPages = async (req, res) => {
  //console.log(req.user);

  const pagesMeta = await PageMetadata.find({});

  res
    .status(StatusCodes.OK)
    .json({ pages: pagesMeta, count: pagesMeta.length });
};
const getUserPages = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);

  const pagesMeta = await PageMetadata.find({ user: userId });

  res
    .status(StatusCodes.OK)
    .json({ pages: pagesMeta, count: pagesMeta.length });
};

const getSinglePage = async (req, res) => {
  const { id: pagetId } = req.params;

  const pageCont = await PageContent.findOne({ pageId: pagetId });

  if (!pageCont) {
    throw new CustomError.NotFoundError(`No page with id : ${pagetId}`);
  }

  res.status(StatusCodes.OK).json({ page: pageCont.content });
};

const updatePage = async (req, res) => {
  const { id: pageId } = req.params;
  const { userId } = req.user;

  const pageMeta = await PageMetadata.findOneAndUpdate(
    { _id: pageId, user: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const pageCont = await PageContent.findOneAndUpdate(
    { pageId: pageId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!pageCont) {
    throw new CustomError.NotFoundError(`No page with id : ${pageId}`);
  }

  res.status(StatusCodes.OK).json({ pageCont });
};

const deletePage = async (req, res) => {
  const { id: pageId } = req.params;
  const { userId } = req.user;

  const pageMeta = await PageMetadata.findOne({ _id: pageId });
  const pageCont = await PageContent.findOne({ pageId: pageId });

  if (!pageMeta) {
    throw new CustomError.NotFoundError(`No page with id : ${pageId}`);
  }

  if (!pageMeta.user.equals(userId)) {
    throw new CustomError.BadRequestError("Not allowed");
  }

  await pageMeta.remove();
  await pageCont.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};
module.exports = {
  createPage,
  getAllPages,
  getSinglePage,
  updatePage,
  deletePage,
  getUserPages,
};
