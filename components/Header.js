import Link from "next/link";
import { CgSun } from "react-icons/cg";
import { GiMountains } from "react-icons/gi";

export default function Header() {
  return (
    <div>
      <div className="bg-secondary text-center m-15 text-2xl w-screen-auto flew flex-row justify-center">
        {" "}
        <Link href="/">
          <a className="ml-15">
            {" "}
            <CgSun size={50} />
          </a>
        </Link>
        <h1 className="p-2"> Checklist de mes Vacances</h1>
        <div className="pl-15 items-center"></div>
      </div>
    </div>
  );
}
