import {
  validateListItem,
  getOneListItem,
  deleteOneListItem,
  updateListItem,
} from "../../../models/listItems";
import base from "../../../middleware/commons";

async function handlePatch({ query: { id }, body }, res) {
  const validationErrors = validateListItem(body, true);
  if (validationErrors) return res.status(422).send(validationErrors);
  const updated = await updateListItem(id, body);

  if (updated) res.status(200).send(updated);
  else res.status(404).send();
}

async function handleGetOne({ query: { id } }, res) {
  const listItem = await getOneListItem(id);
  if (listItem) res.send(listItem);
  else res.status(404).send();
}

async function handleDelete({ query: { id } }, res) {
  if (await deleteOneListItem(id)) res.status(204).send();
  else res.status(404).send();
}

export default base().get(handleGetOne).patch(handlePatch).delete(handleDelete);
