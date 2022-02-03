import axios from "axios";
import { getClientBuildManifest } from "next/dist/client/route-loader";

import { useState, useEffect } from "react";

import Layout from "../../components/Layout";

export default function oneList() {
  const [itemId, setitemId] = useState("");
  const [validate, setValidate] = useState(false);
  const [listId, setListId] = useState("");

  const getList = async (id) => {
    await axios
      .get("/api/listItem/")
      .then(({ data: { validate, itemId, listId } }) => {
        setValidate(validate);
        setitemId(itemId);
        setListId(listId);
      });
    console.log(itemId);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-gray-300 h-screen w-full">
          <h1 className="text-center p-10 text-2xl"></h1>
        </div>
      </Layout>
    </div>
  );
}

// export async function getStaticProps(context) {
//   const res = await axios.get(`/api/listItem/${id}`);
//   const list = await res.json;
//   return {
//     props: {
//       list,
//     },
//   };
