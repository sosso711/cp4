const db = require("../db");
const Joi = require("joi");

const validateList = (data, forUpdate = false) => {
  return Joi.object({
    name: Joi.string().presence(forUpdate ? "optional" : "required"),
    createDate: Joi.date().presence(forUpdate ? "optional" : "required"),
    listItemId: Joi.number.presence(forUpdate ? "optional" : "required"),
    userId: Joi.number.presence(forUpdate ? "optional" : "required"),
  }).validate(data, { abortEarly: false }).error;
};

const ListToShow = {
  id: true,
  name: true,
  createDate: true,
  listItemId: true,
  userId: true,
};

const getLists = async ({ name, createDate, userId, listItemId }) => {
  return Promise.all([
    db.lists.findMany({
      select: id,
      name,
      createDate,
      listItemId,
      userId,
    }),
  ]);
};

const getOneList = (id) => {
  return db.lists.findUnique({
    where: { id: parseInt(id, 10) },
    select: ListToShow,
  });
};

const deleteOneList = async (id) => {
  return db.lists
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

const createList = async ({ name, createDate, listItemId }) => {
  return await db.lists.create({
    data: {
      name,
      createDate,
      listItemId,
    },
  });
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
