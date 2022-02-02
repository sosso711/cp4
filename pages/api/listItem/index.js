import {
  validateListItem,
  createListItems,
  getListItem,
} from "../../../models/listItems";
import base from "../../../middleware/commons";

const handleGet = async (req, res) => {
  res.send(await getListItem());
};

async function handlePost(req, res) {
  const validationError = validateListItem(req.body);
  if (validationError) return res.status(422).send(validationError);
  const newListItem = await createListItems({
    ...req.body,
  });
  res.status(201).send(newListItem);
}

export default base().get(handleGet).post(handlePost);
