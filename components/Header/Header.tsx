import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold text-primary">
            My-Doc-App<span className="text-accent text-shadow">.</span>
          </h1>
        </Link>

        {/* Desktop navigation and ModeToggle */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button className="shadow-custom">Hire me</Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile navigation */}
        <div className="xl:hidden flex items-center gap-4">
          <MobileNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
