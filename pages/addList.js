import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function addList() {
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  const [add, setAdd] = useState([]);

  const router = useRouter();
  useEffect(() => {
    axios.get("/api/items").then((res) => {
      setItems(...res.data);
    });
  }, []);

  const handleClick = (data) => {
    const newItem = items.find((item) => item.id === +data.listItemId);
    setAdd([...add, newItem]);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post("/api/lists", {
        ...data,
        listItemId: add.map((a) => {
          return a.id;
        }),
        userId: 1,
      })
      .then((res) => {
        setList(res.data);
        router.push(`/lists/${res.data.id}`);
      });
  };

  return (
    <div>
      <Layout>
        <div className="bg-gray-300 h-screen w-full ">
          <h1 className="text-center p-10 text-2xl">Ajouter une liste</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-wrap md:justify-around">
              <label className="m-3 md:m-10"> Date du voyage</label>
              <input
                type="date"
                id="date"
                className="h-7 m-3 md:m-10"
                {...register("createDate")}
              ></input>
              <div className="flex-wrap">
                <label className="m-3  md:m-10">Destination</label>
                <input
                  type="text"
                  id="name"
                  className="h-7 m-10 w-1/3 p-3"
                  {...register("name")}
                ></input>
              </div>
            </div>
            <div
              className="flex flex-row justify-center m-4
             "
            >
              <select
                className="h-7 w-1/3 bg-white "
                onChange={(e) => {
                  setAdd(e.target.value);
                  console.log(e.target.value);
                }}
                {...register("listItemId")}
              >
                {items.map((item) => {
                  return (
                    <option id={item?.name} value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  );
                })}{" "}
              </select>

              <button
                type="button"
                className=" bg-white w-2/5 rounded-lg ml-4   "
                onClick={handleSubmit(handleClick)}
              >
                Ajouter
              </button>
            </div>
            <div>
              <ul>
                {add.map(({ id, name }) => {
                  return (
                    <li key={id} className="text-xl text-center m-2">
                      {name}{" "}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="        p-2  m-10 bg-white w-3/5 h-10 rounded-xl mt-80 md:w-1/5"
                >
                  Valider la liste
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
