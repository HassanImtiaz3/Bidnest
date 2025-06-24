import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaUsers, FaGavel, FaAward, FaBuilding } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, number: 150, label: "Happy Clients" },
  { icon: <FaGavel />, number: 120, label: "Bids Posted" },
  { icon: <FaAward />, number: 3, label: "Awards" },
  { icon: <FaBuilding />, number: 5, label: "Dealer Branches" },
];

const StatsCounter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.3, // 30% visible to start animation
  });

  return (
    <div
      ref={ref}
      style={{
        width: "90%",
        maxWidth: "1200px",
        margin: "0 auto 100px",
        backgroundColor: "#673de6",
        color: "#ffffff",
        padding: "60px 20px",
        borderRadius: "20px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      {stats.map((stat, index) => (
        <div key={index} style={{ margin: "20px", minWidth: "150px" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>
            {stat.icon}
          </div>
          <h2
            style={{
              fontSize: "36px",
              margin: "0",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            {inView ? <CountUp end={stat.number} duration={2} suffix="+" /> : "0+"}
          </h2>
          <p
            style={{
              marginTop: "8px",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
