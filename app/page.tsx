import React from "react";

const HomePage = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "CEO, Company A",
      image: "/images/team-member.png",
      quote:
        "TechSolutions transformed our business with their innovative solutions. Highly recommended!",
    },
    {
      name: "John Smith",
      role: "CTO, Company B",
      image: "/images/team-member.png",
      quote:
        "Their team is professional and highly skilled. We saw immediate improvements in our operations.",
    },
    {
      name: "Emily Johnson",
      role: "COO, Company C",
      image: "/images/team-member.png",
      quote:
        "Their cloud services are top-notch. We have achieved unprecedented scalability and performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="relative text-center mb-20">
          <div className="absolute inset-0 bg-blue-900 opacity-50 rounded-xl"></div>
          <img
            src="/images/service.jpeg"
            alt="Hero Image"
            className="w-full h-96 object-cover rounded-xl shadow-2xl"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-blue-200">TechSolutions</span>
            </h1>
            <p className="mt-6 text-2xl text-blue-100">
              Innovative IT Solutions for Your Business
            </p>
            <button className="mt-8 bg-blue-400 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-300 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Get Started
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-blue-200">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-xl text-blue-100">
            Hear from our satisfied clients who have experienced the benefits of
            our services.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl p-6 transform transition duration-300 hover:scale-105"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-blue-300"
                />
                <p className="mt-6 text-blue-50 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <h3 className="mt-6 text-xl font-bold text-blue-200">
                  {testimonial.name}
                </h3>
                <p className="mt-2 text-blue-300">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
