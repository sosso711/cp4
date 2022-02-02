import Layout from "../components/Layout";

export default function addList() {
  return (
    <div>
      <Layout>
        <div className="bg-secondary h-screen w-full ">
          <h1 className="text-center p-10 text-2xl">Ajouter une liste</h1>
          <form>
            <div className="flex justify-around">
              <label className="m-10"> Date du voyage</label>
              <input type="date" className="h-7 m-10"></input>
              <label className="m-10">Nom de la destination</label>
              <input type="text" className="h-7 m-10"></input>
            </div>
            <div className="flex justify-center ">
              <label className="m-10">ajouter</label>
              <input type="text" className="h-7 m-10"></input>
              <button type="button" className="m-10 bg-slate-300 w-1/6 h-">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
