import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function addList() {
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  const [add, setAdd] = useState([]);

  useEffect(() => {
    axios.get("/api/items").then((res) => {
      setItems(...res.data);
    });
  }, []);

  const validateItems = (e) => {
    setAdd(e.target.value);
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/lists").then((res) => {
      setList(res.data);
    });
  };

  return (
    <div>
      <Layout>
        <div className="bg-secondary h-screen w-full ">
          <h1 className="text-center p-10 text-2xl">Ajouter une liste</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-around">
              <label className="m-10"> Date du voyage</label>
              <input
                type="date"
                id="date"
                className="h-7 m-10"
                {...register("createDate")}
              ></input>
              <label className="m-10">Nom de la destination</label>
              <input
                type="text"
                id="name"
                className="h-7 m-10"
                {...register("name")}
              ></input>
            </div>
            <div className="flex justify-center ">
              <label className="m-10">ajouter</label>
              <select
                className="h-7 m-10 w-1/3 "
                onChange={(e) => {
                  setAdd(e.target.value);
                  console.log(add);
                }}
                {...register("ListItemsId")}
              >
                {items.map((item) => {
                  return (
                    <option id={item?.name} value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  );
                })}{" "}
              </select>
              <ul>
                {add.map((a) => {
                  return <li>{a.name}</li>;
                })}
              </ul>
              {/* <button
                type="button"
                className="m-10 bg-slate-300 w-1/6 rounded-lg"
                onClick={validateItems}
              >
                Ajouter
              </button> */}
            </div>
            <div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  // onClick={onSubmit}
                  className="            m-10 bg-slate-300 w-1/6 h-10 rounded-xl mt-80 "
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
