import { validateItems, createItems, getItems } from "../../../models/items";
import base from "../../../middleware/commons";

const handleGet = async (req, res) => {
  res.send(await getItems());
};

async function handlePost(req, res) {
  const validationError = validateItems(req.body);
  if (validationError) return res.status(422).send(validationError);
  const newItem = await createItems({
    ...req.body,
  });
  res.status(201).send(newItem);
}

export default base().get(handleGet).post(handlePost);
