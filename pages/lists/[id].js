import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";

export default function oneList() {
  const [item, setItem] = useState([]);

  const [listName, setListName] = useState("");

  const getList = async (id) => {
    await axios.get(`/api/lists/18`).then((res) => {
      const listItem = res.data.listItems.flatMap((l) => {
        return l.items;
      });
      setListName(res.data.name);
      setItem(listItem);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-gray-300 h-screen w-full">
          <h1 className="text-center p-10 text-3xl">{listName}</h1>
          <ul className="">
            {" "}
            {item.map((i) => {
              return (
                <li key={i.id} className="m-3 flex justify-center">
                  {i.name}
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
