const db = require("../db");
const Joi = require("joi");

const validateUser = (data, forUpdate = false) => {
  return Joi.object({
    name: Joi.string().presence(forUpdate ? "optional" : "required"),
    email: Joi.string().presence("optional"),
  }).validate(data, { abortEarly: false }).error;
};

const getUser = async ({ name, email }) => {
  return Promise.all([
    db.user.findMany({
      select: id,
      name,
      email,
    }),
  ]);
};

const deleteOneUser = async (id) => {
  return db.user
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

const createUser = async ({ name, email }) => {
  return await db.user.create({
    data: {
      name,
      email,
    },
  });
};
const updateUser = async (id, data) => {
  return db.User.update({ where: { id: parseInt(id, 10) }, data }).catch(
    () => false
  );
};

module.exports = {
  validateUser,
  createUser,
  getUser,

  updateUser,
  deleteOneUser,
};
