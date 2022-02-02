import { validateList, createList, getLists } from "../../../models/lists";

const handleGet = async (req, res) => {
  res.send(await getLists());
};

async function handlePost(req, res) {
  const validationError = validateList(req.body);
  if (validationError) return res.status(422).send(validationError);
  const newList = await createList({
    ...req.body,
  });
  res.status(201).send(newList);
}

export default get(handleGet).post(handlePost);
