import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";

export default function oneList() {
  const [item, setItem] = useState([]);
  const [validate, setValidate] = useState(false);
  const [listName, setListName] = useState("");

  const getList = async () => {
   
    await axios.get(`/api/lists/${id}`).then((res) => {
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
          <h1 className="text-center p-10 text-2xl">{listName}</h1>
          <ul>
            {" "}
            {item.map((i) => {
              return (
                <li key={i.id} className="ml-10">
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
