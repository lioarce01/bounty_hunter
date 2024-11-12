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
              className="text-lg hover:text-zinc-300 transition-colors"
            >
              Platform
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-zinc-300 transition-colors"
            >
              Bounties
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-zinc-300 transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-zinc-300 transition-colors"
            >
              About
            </Link>
          </div>
          <Button className="bg-zinc-100 text-black hover:bg-zinc-200 px-6 py-2 text-lg font-semibold">
            Get Started
          </Button>
        </nav>
      </header>
    </>
  );
};

export default NavbarLanding;
