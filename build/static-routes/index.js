import { getCollection } from "./mongo";
const { mongoCollection } = require("./vars");

export const getOffers = async (limit = 2 ** 16) => {
  const now = new Date();
  const collection = await getCollection(mongoCollection);
  return collection
    .find({ validThrough: { $gt: now } })
    .limit(limit)
    .toArray();
};
