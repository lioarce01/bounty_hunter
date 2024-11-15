import { BugIcon, CodeIcon, ShieldIcon, TargetIcon } from "lucide-react";
import React from "react";

const CharacteristicsLanding = () => {
  return (
    <div>
      <section className="py-24 px-6 bg-neutral-950">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-16 text-center">
            Why Choose NexusGuard?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: BugIcon,
                title: "Advanced Bug Tracking",
                description:
                  "State-of-the-art platform for efficient bug reporting and management.",
              },
              {
                icon: ShieldIcon,
                title: "Secure Payouts",
                description:
                  "Swift and secure reward distribution for verified vulnerabilities.",
              },
              {
                icon: CodeIcon,
                title: "Collaborative Environment",
                description:
                  "Connect with top researchers and learn from the best in the field.",
              },
              {
                icon: TargetIcon,
                title: "Diverse Targets",
                description:
                  "Wide range of programs from startups to Fortune 500 companies.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-800 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300"
              >
                <item.icon className="h-12 w-12 mb-6 text-purple-400" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-zinc-400 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharacteristicsLanding;
