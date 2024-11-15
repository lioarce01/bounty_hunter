import React from "react";

const TestimonialsLanding = () => {
  return (
    <div>
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold mb-16 text-center">
            What Our Hunters Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Alex Chen",
                role: "Senior Security Researcher",
                quote:
                  "NexusGuard has revolutionized the way I approach bug hunting. The platform's tools and community are unmatched.",
              },
              {
                name: "Samantha Lee",
                role: "Ethical Hacker",
                quote:
                  "The diversity of programs on NexusGuard keeps me challenged and constantly learning. It's a game-changer for my career.",
              },
              {
                name: "Marcus Johnson",
                role: "Cybersecurity Consultant",
                quote:
                  "I've never seen payouts this fast and secure. NexusGuard truly values and respects its bug hunting community.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-zinc-800 p-8 rounded-lg">
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsLanding;
