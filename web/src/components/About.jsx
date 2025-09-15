import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-white shadow p-6 rounded border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About CitySphere</h2>
      <p className="text-gray-700 leading-relaxed">
        CitySphere is a local marketplace and city guide designed to connect 
        people with local vendors, artisans, bakers, and bookstores in their 
        community. 🌍 
      </p>
      <p className="text-gray-700 leading-relaxed mt-2">
        Our goal is to promote small businesses and make it easier for you 
        to discover unique shops, order directly, and support local talent. 
        With features like maps, WhatsApp chat, and vendor reviews, 
        CitySphere helps strengthen the connection between communities 
        and local entrepreneurs.
      </p>
    </section>
  );
}
