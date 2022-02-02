const db = require("../db");
const Joi = require("joi");

const validateItems = (data, forUpdate = false) => {
  return Joi.object({
    name: Joi.string().presence(forUpdate ? "optional" : "required"),
  }).validate(data, { abortEarly: false }).error;
};

const itemToShow = {
  id: true,
  name: true,
};

const getItems = async () => {
  return Promise.all([
    db.Items.findMany({
      select: itemToShow,
    }),
  ]);
};

const getOneItem = (id) => {
  return db.Items.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const deleteOneItem = async (id) => {
  return db.Items.delete({ where: { id: parseInt(id, 10) } }).catch(
    (_) => false
  );
};

const createItems = async ({ name }) => {
  return await db.Items.create({
    data: {
      name,
    },
  });
};
const updateItems = async (id, data) => {
  return db.Items.update({ where: { id: parseInt(id, 10) }, data }).catch(
    () => false
  );
};

module.exports = {
  validateItems,
  createItems,
  getItems,
  getOneItem,
  updateItems,
  deleteOneItem,
};
