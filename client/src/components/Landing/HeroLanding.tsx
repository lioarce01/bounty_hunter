import React from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

const HeroLanding = () => {
  return (
    <div>
      <section className="h-screen py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-6xl font-bold mb-8 leading-tight">
                Secure the Future, One Bug at a Time
              </h1>
              <p className="text-2xl mb-12 text-zinc-400">
                Join the elite force of cybersecurity experts and shape the
                digital landscape.
              </p>
              <div className="flex space-x-6">
                <Button className="bg-zinc-100 text-black hover:bg-zinc-200 px-8 py-4 text-xl font-semibold">
                  Start Hunting
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-100 bg-black px-8 py-4 text-xl font-semibold border-neutral-800 transitiona-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r hidden md:block from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-30"></div>
                <img
                  src="/illustration1.png"
                  alt="Cybersecurity Illustration"
                  className="relative z-10 mx-auto hidden md:block"
                  width={350}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroLanding;
