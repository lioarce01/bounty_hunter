import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewsletterLanding = () => {
  return (
    <div>
      <section className="py-24 px-6 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold mb-8">
            Join the Elite Bug Hunting Community
          </h2>
          <p className="text-zinc-400 mb-12 text-xl">
            Get exclusive access to high-reward bounties and collaborate with
            top security professionals.
          </p>
          <form className="flex flex-col md:flex-row max-w-2xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-neutral-900 border-neutral-800 text-zinc-100 placeholder-zinc-500 focus:ring-neutral-700 focus:border-neutral-700 text-lg py-6 mb-4 md:mb-0 md:mr-4"
            />
            <Button
              type="submit"
              className="bg-neutral-950 border border-neutral-800 text-white px-10 py-6 text-lg font-semibold"
            >
              Get Early Access
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewsletterLanding;
