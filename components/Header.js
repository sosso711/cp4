import Link from "next/link";
import { CgSun } from "react-icons/cg";

export default function Header() {
  return (
    <div>
      <div className="bg-primary text-center text-2xl w-screen-auto flew flex-row justify-around">
        {" "}
        <Link href="/">
          <a className="">
            {" "}
            <CgSun size={50} />
          </a>
        </Link>
        <h1 className="p-2"> Checklist de mes Vacances</h1>
      </div>
    </div>
  );
}
