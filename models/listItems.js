const db = require("../db");
const Joi = require("joi");

const validateListItem = (data, forUpdate = false) => {
  return Joi.object({
    listId: Joi.number().presence(forUpdate ? "optional" : "required"),
    itemId: Joi.number().presence(forUpdate ? "optional" : "required"),
    validate: Joi.boolean().default(false),
  }).validate(data, { abortEarly: false }).error;
};

const itemToShow = {
  id: true,
  listId: true,
  itemId: true,
  validate: true,
};

const getListItem = async () => {
  return Promise.all([
    db.listItems.findMany({
      select: itemToShow,
    }),
  ]);
};

const getOneListItem = (id) => {
  return db.listItems.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const deleteOneListItem = async (id) => {
  return db.listItems
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

const createListItems = async ({ listId, itemId, validate }) => {
  return await db.listItems.create({
    data: {
      listId,
      itemId,
      validate,
    },
  });
};
const updateListItem = async (id, data) => {
  return db.listItems
    .update({ where: { id: parseInt(id, 10) }, data })
    .catch(() => false);
};

module.exports = {
  updateListItem,
  createListItems,
  getListItem,
  getOneListItem,
  deleteOneListItem,
  validateListItem,
};
