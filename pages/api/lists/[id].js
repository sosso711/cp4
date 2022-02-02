import {
  validateList,
  getOneList,
  deleteOneList,
  updateList,
} from "../../../models/lists";

async function handlePatch({ query: { id }, body }, res) {
  const validationErrors = validateList(body, true);
  if (validationErrors) return res.status(422).send(validationErrors);
  const updated = await updateList(id, body);

  if (updated) res.status(200).send(updated);
  else res.status(404).send();
}

async function handleGetOne({ query: { id } }, res) {
  const list = await getOneList(id);
  if (list) res.send(list);
  else res.status(404).send();
}

async function handleDelete({ query: { id } }, res) {
  if (await deleteOneList(id)) res.status(204).send();
  else res.status(404).send();
}

export default get(handleGetOne).patch(handlePatch).delete(handleDelete);
