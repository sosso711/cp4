import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Layout>
        <div className="bg-secondary h-screen w-full">
          <h1 className="text-center p-10 text-2xl">Tableau de bord</h1>
          <div className="md:flex justify-around ">
            <div className="w-2/3 md:w-1/4 bg-white  p-10 m-10">
              {" "}
              <Link href="/addList">
                <a className="text-center">Ajouter une liste</a>
              </Link>
            </div>
            <div className="w-2/3 md:w-1/4 bg-white  p-10 m-10">
              {" "}
              <Link href="/myList">
                <a className="text-center">Ma liste</a>
              </Link>
            </div>
            <div className=" w-2/3 md:w-1/4 bg-white  p-10 m-10">
              {" "}
              <Link href="/myOldList">
                <a className="text-center">Mes listes précédentes</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
