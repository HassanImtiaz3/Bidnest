import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import bannerImage from "../../assets/banner1.jpeg";

export default function App() {
  const quotes = [
    "Your best bid starts here.",
    "Win more with every bid.",
    "Where smart bids meet success.",
  ];

  const [text, setText] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    let typingSpeed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentQuote.length) {
        setText(currentQuote.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setText(currentQuote.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setDeleting(!deleting);
        if (!deleting) {
          setTimeout(() => setDeleting(true), 1500); // hold text before deleting
        } else {
          setQuoteIndex((quoteIndex + 1) % quotes.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, quoteIndex, quotes]);

  return (
    <header>
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage}) no-repeat center center / cover`,
          maxHeight: "650px",
          paddingY: { xs: "20%", sm: "12%" },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              color: "white",
              textAlign: { xs: "left", md: "left" },
              width: "100%",
            }}
          >
            {/* Main Heading */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                fontSize: { xs: "1.4rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              Find government bids matching <br /> your business.
            </Typography>

            {/* Animated Quote */}
            <Typography
              variant="h5"
              sx={{
                mt: 4, // Increased margin-top
                pt: 1,
                fontWeight: 600,
                minHeight: "48px",
                fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.8rem" },
                fontFamily: "'Segoe UI', 'Roboto', sans-serif",
                background: "linear-gradient(90deg, #ffffff, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                animation: "blink 0.8s step-end infinite",
              }}
            >
              {text}
            </Typography>
          </Box>
        </Container>
      </Box>
    </header>
  );
}
