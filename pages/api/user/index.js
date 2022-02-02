import { validateUser, createUser, getUser } from "../../../models/user";
import base from "../../../middleware/commons";

const handleGet = async (req, res) => {
  res.send(await getUser());
};

async function handlePost(req, res) {
  const validationError = validateUser(req.body);
  if (validationError) return res.status(422).send(validationError);
  const newUser = await createUser({
    ...req.body,
  });
  res.status(201).send(newUser);
}

export default base().get(handleGet).post(handlePost);
