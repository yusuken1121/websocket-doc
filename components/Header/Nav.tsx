"use client";

import { links } from "@/config/commonOptions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathName = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, idx) => {
        return (
          <Link
            href={link.path}
            key={idx}
            className={`${
              link.path === pathName &&
              "text-accent text-shadow border-b-2 border-accent"
            } capitalize font-medium hover:text-accent hover:text-shadow transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
