import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function myList() {
  const [lists, setLists] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/lists").then((res) => {
      setLists(...res.data);
    });
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-gray-300 h-screen w-full">
          <h1 className="text-center p-10 text-2xl">Mes Listes</h1>

          <ul className="flex flex-col ">
            {" "}
            {lists.map(({ id, name }) => {
              return (
                <li key={id} className="text-xl pl-10 flex justify-center">
                  <a href={`lists/${id}`} passHref>
                    {" "}
                    {name} {/* <a>voir</a> */}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
