//  web/src/pages/About.jsx
//  Static About page explaining the purpose and mission of CitySphere

import React from "react";

export default function About() {
  return (
    <section className="bg-white shadow-lg rounded-xl p-8 border border-silver max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-charcoal mb-4 text-center">
        About CitySphere
      </h2>

      <p className="text-gray-700 leading-relaxed text-justify">
        <span className="font-semibold text-primary">CitySphere</span> is your
        go-to local marketplace and city guide — designed to connect people
        with neighborhood vendors, artisans, bakers, and bookstores. 🌍 Whether
        you're looking to support a small bakery or discover a hidden bookstore
        gem, CitySphere brings the best of your community to your fingertips.
      </p>

      <p className="text-gray-700 leading-relaxed mt-4 text-justify">
        Our mission is simple: <span className="font-semibold text-gold">Empower small businesses</span> and strengthen local economies by promoting
        direct engagement between users and vendors. Enjoy features like
        real-time WhatsApp chat, integrated maps, and vendor showcases —
        making it easier than ever to discover, connect, and support.
      </p>
    </section>
  );
}
