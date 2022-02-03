import { validateList, createList, getLists } from "../../../models/lists";
import base from "../../../middleware/commons";

const handleGet = async (req, res) => {
  res.send(await getLists());
};

async function handlePost(req, res) {
  const validationError = validateList(req.body);
  console.log(validationError);
  if (validationError) return res.status(422).send(validationError);

  const newList = await createList({
    ...req.body,
    userId: { connect: { id: 1 } },
  });
  res.status(201).send(newList);
}

export default base().get(handleGet).post(handlePost);
