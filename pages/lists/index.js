import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../../components/Layout";

export default function myList() {
  const [lists, setLists] = useState([]);
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    axios.get("/api/items").then((res) => {
      setLists(...res.data);
      console.log(...lists);
    });
  }, []);

  const validateItem = async (id) => {
    await axios.patch(`/api/items/${id}`).then((res) => {
      setValidate("validate" === true);
    });
  };

  return (
    <div>
      <Layout>
        <div className="bg-gray-300 h-screen w-full">
          <h1 className="text-center p-10 text-2xl">Ma liste</h1>

          <ul>
            {" "}
            {lists.map(({ id, name }) => {
              return (
                <div className="flex flex-row ">
                  <li key={id} className="text-xl pl-10 ">
                    {name}
                  </li>
                  <div className="flex flex-wrap">
                    <input type="checkbox" className="w-15 mt-2 ml-10"></input>
                  </div>
                </div>
              );
            })}
          </ul>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-white mt-20 p-3 rounded-2xl w-1/3 "
              onClick={validateItem}
            >
              {" "}
              Valider
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
