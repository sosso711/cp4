const db = require("../db");
const Joi = require("joi");
import { createListItems } from "../models/listItems";

const validateList = (data, forUpdate = false) => {
  return Joi.object({
    name: Joi.string().presence(forUpdate ? "optional" : "required"),
    createDate: Joi.date().presence(forUpdate ? "optional" : "required"),
    listItemId: Joi.array().items(Joi.number()),
    userId: Joi.number(),
  }).validate(data, { abortEarly: false }).error;
};

const ListToShow = {
  id: true,
  name: true,
  createDate: true,
  userId: true,
};

const getLists = async () => {
  return Promise.all([
    db.lists.findMany({
      select: ListToShow,
    }),
  ]);
};

const getOneList = (id) => {
  return db.lists.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      listItems: {
        where: {
          listId: +id,
        },
        include: {
          items: true,
        },
      },
    },
  });
};

const deleteOneList = async (id) => {
  return db.lists
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

const createList = async ({ name, createDate, listItemId }) => {
  const newList = await db.lists.create({
    data: {
      name,
      createDate: new Date(createDate),
    },
  });
  const newListsItems = listItemId.map((id) => {
    createListItems({
      itemId: id,
      listId: newList.id,
      validate: false,
    });
  });
  const createdItemList = await Promise.all(newListsItems);
  return { ...newList, listItem: newListsItems };
};

const updateList = async (id, data) => {
  return db.lists
    .update({ where: { id: parseInt(id, 10) }, data })
    .catch(() => false);
};

module.exports = {
  validateList,
  createList,
  getLists,
  ListToShow,
  getOneList,
  updateList,
  deleteOneList,
};
