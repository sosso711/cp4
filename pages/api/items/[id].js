import {
  getOneItem,
  updateItems,
  deleteOneItem,
  validateItems,
} from "../../../models/items";
import base from "../../../middleware/commons";

async function handlePatch({ query: { id }, body }, res) {
  const validationErrors = validateItems(body, true);
  if (validationErrors) return res.status(422).send(validationErrors);
  const updated = await updateItems(id, body);

  if (updated) res.status(200).send(updated);
  else res.status(404).send();
}

async function handleGetOne({ query: { id } }, res) {
  const item = await getOneItem(id);
  if (item) res.send(item);
  else res.status(404).send();
}

async function handleDelete({ query: { id } }, res) {
  if (await deleteOneItem(id)) res.status(204).send();
  else res.status(404).send();
}

export default base().get(handleGetOne).patch(handlePatch).delete(handleDelete);
