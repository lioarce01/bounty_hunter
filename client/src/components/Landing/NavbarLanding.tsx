import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NavbarLanding = () => {
  return (
    <>
      <header className="border-b border-neutral-800">
        <nav className="fixed z-20 backdrop-blur-sm w-full mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold tracking-tighter">
            NexusGuard
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-lg hover:text-neutral-300 transition-colors"
            >
              Bounties
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-neutral-300 transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-neutral-300 transition-colors"
            >
              About
            </Link>
          </div>
          <Button className="bg-neutral-100 text-black hover:bg-neutral-200 px-6 py-2 text-lg font-semibold">
            Login
          </Button>
        </nav>
      </header>
    </>
  );
};

export default NavbarLanding;
