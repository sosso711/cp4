const db = require("../db");
const Joi = require("joi");

const validateItems = (data, forUpdate = false) => {
  return Joi.object({
    name: Joi.string().presence(forUpdate ? "optional" : "required"),
    validate: Joi.boolean.presence(forUpdate ? "optional" : "required"),
  }).validate(data, { abortEarly: false }).error;
};

const getItems = async ({ name, validate }) => {
  return Promise.all([
    db.items.findMany({
      select: id,
      name,
      validate,
    }),
  ]);
};

const getOneItem = (id) => {
  return db.Items.findUnique({
    where: { id: parseInt(id, 10) },
    select: id,
    name,
    validate,
  });
};

const deleteOneItem = async (id) => {
  return db.Items.delete({ where: { id: parseInt(id, 10) } }).catch(
    (_) => false
  );
};

const createItems = async ({ name, validate }) => {
  return await db.Items.create({
    data: {
      name,
      validate,
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
