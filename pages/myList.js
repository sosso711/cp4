import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../components/Layout";

export default function myList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get("/api/lists").then((res) => {
      setLists(...res.data);
      console.log(...lists);
    });
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-secondary h-screen w-full">
          <h1 className="text-center p-10 text-2xl">Mes listes</h1>

          <ul>
            {" "}
            {lists.map(({ id, name }) => {
              return (
                <Link href="/`${id}`">
                  <a>
                    <li key={id} className="text-xl pl-10 ">
                      {name}
                    </li>
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
