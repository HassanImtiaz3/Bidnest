import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import c1 from "../../assets/c1.jpg";
import c2 from "../../assets/c2.jpg";
import c3 from "../../assets/c3.webp";
import Hero from "../../widgets/Hero/Hero";
import Bread from "../../widgets/BackToHomeButton/BreadCrumbs"

function WhyBidnest() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Bread name="Why Bidnest"/>
    
        <Hero
          image={c1}
          heading="Centralized Tendering Platform"
          paragraph="BidNest serves as a one-stop solution for businesses looking to participate in large-scale tenders. Instead of searching through multiple sources, companies can access a wide range of public and private sector tenders on a single platform. This centralization not only saves time but also ensures that vendors do not miss out on potential opportunities. Additionally, the system allows users to filter tenders based on their industry, location, or requirements, making the bidding process more targeted and efficient."
          direction="right"
        />

        <Hero
          image={c2}
          heading="Smart Notifications & Communication"
          paragraph="Keeping track of tender deadlines and bid status can be overwhelming, but BidNest automates this process with real-time notifications. Vendors receive timely alerts on tender openings, submission deadlines, and evaluation results, ensuring they never miss an important update. Moreover, the integrated chat feature enables seamless communication between bidders and procurement entities, allowing for quick clarifications and discussions. This reduces misunderstandings and improves overall efficiency in the tendering process.
"
          direction="left"
        />

        <Hero
          image={c3}
          heading="Transparent & Efficient Bidding"
          paragraph="BidNest promotes a fair and structured bidding process by incorporating both technical and financial evaluations. Every bid undergoes a thorough technical assessment before moving to financial comparison, ensuring only qualified vendors compete for the contract. This structured approach minimizes favoritism and enhances trust in the procurement system. Furthermore, the platform provides real-time bid tracking and evaluation updates, giving vendors full visibility into the selection process and increasing transparency in public and private sector procurement."
          direction="right"
        />

        <div className="flex-grow-1 mt-4"></div>
        <Footer />
      </div>
    </>
  );
}

export default WhyBidnest;
