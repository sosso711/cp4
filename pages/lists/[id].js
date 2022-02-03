import axios from "axios";
import { useState, useEffect } from "react";

import Layout from "../../components/Layout";

export default function oneList(id) {
  const [oneList, setOneList] = useState([]);

  useEffect(() => {
    axios.get(`/api/listItem/1`).then((res) => setOneList(...res.data));
    console.log(oneList);
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-secondary h-screen w-full">
          <h1 className="text-center p-10 text-2xl">{oneList.name}</h1>

          <ul>
            {oneList.map((l) => {
              console.log(l);
              return <li key={l.id}>{l.name}</li>;
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
