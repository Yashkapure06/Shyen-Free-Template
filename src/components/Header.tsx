import { useEffect, useState } from "react";

const headerVideo = "https://qclay.design/lovable/shyen/Header.mp4";
const logoHeader = "https://qclay.design/lovable/shyen/logo-header.svg";
const headerElipse = "https://qclay.design/lovable/shyen/header_elipse.png";
const upRight = "https://qclay.design/lovable/shyen/UpRight.svg";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const navLinks = ["Product", "How it works", "Pricing", "About"];

const headingWords = [
  ["Your", "mind,"],
  ["supported", "24/7."],
];

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fade = (delay: number, y = 30) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.9s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms`,
  });

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", background: "#112115" }}
    >
      {/* Background video */}
      <video
        src={headerVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <img
        src={headerElipse}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-10%",
          width: "120%",
          maxWidth: "1600px",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(17,33,21,0.55) 0%, rgba(17,33,21,0.15) 35%, rgba(17,33,21,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* Nav */}
      <nav
        className="relative mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1240px",
          padding: "28px 24px",
          zIndex: 3,
          ...fade(0, -20),
        }}
      >
        <img src={logoHeader} alt="Shyen" style={{ height: "28px" }} />

        <div className="hidden md:flex items-center" style={{ gap: "36px" }}>
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "rgba(234,241,193,0.78)",
                fontFamily: "Geist, sans-serif",
                fontSize: "16px",
                letterSpacing: "-0.32px",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>

        <button
          className="transition-transform duration-300 hover:scale-[1.03]"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "44px",
            padding: "8px 20px",
            borderRadius: "48px",
            background: "#EAF1C1",
            color: "#091814",
            fontFamily: "Geist, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "-0.32px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get started
          <img src={upRight} alt="" style={{ width: "14px", height: "14px" }} />
        </button>
      </nav>

      {/* Hero content */}
      <div
        className="relative mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: "1000px",
          padding: "0 24px",
          paddingTop: "clamp(120px, 18vh, 180px)",
          zIndex: 3,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "48px",
            border: "1px solid rgba(234,241,193,0.20)",
            background: "rgba(234,241,193,0.06)",
            color: "#EAF1C1",
            fontFamily: "Geist, sans-serif",
            fontSize: "14px",
            letterSpacing: "-0.28px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            ...fade(100),
          }}
        >
          Meet Shyen.AI - your mental wellness companion
        </span>

        <h1
          style={{
            marginTop: "28px",
            color: "#EAF1C1",
            fontFamily: "Halant, serif",
            fontSize: "clamp(44px, 9vw, 84px)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          {headingWords.map((line, li) => (
            <span key={li} style={{ display: "block" }}>
              {line.map((w, wi) => {
                const idx = (li === 0 ? 0 : headingWords[0].length) + wi;
                const delay = 200 + idx * 90;
                return (
                  <span
                    key={wi}
                    style={{
                      display: "inline-block",
                      marginRight: wi === line.length - 1 ? 0 : "0.22em",
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(40px)",
                      transition: `opacity 0.95s ${EASE} ${delay}ms, transform 0.95s ${EASE} ${delay}ms`,
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p
          style={{
            marginTop: "24px",
            maxWidth: "560px",
            color: "#FFF",
            opacity: mounted ? 0.55 : 0,
            fontFamily: "Geist, sans-serif",
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "-0.4px",
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.9s ${EASE} 700ms, transform 0.9s ${EASE} 700ms`,
          }}
        >
          Instant, intelligent support that helps you manage stress, find calm,
          and stay in control - anytime, anywhere.
        </p>

        <div
          className="flex items-center flex-wrap justify-center"
          style={{ marginTop: "36px", gap: "12px", ...fade(820) }}
        >
          <button
            className="transition-transform duration-300 hover:scale-[1.03]"
            style={{
              height: "52px",
              padding: "8px 28px",
              borderRadius: "48px",
              background: "#EAF1C1",
              color: "#091814",
              fontFamily: "Geist, sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              letterSpacing: "-0.34px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Join the waitlist
          </button>
          <button
            className="transition-transform duration-300 hover:scale-[1.03]"
            style={{
              height: "52px",
              padding: "8px 28px",
              borderRadius: "48px",
              background: "rgba(234,241,193,0.08)",
              border: "1px solid rgba(234,241,193,0.22)",
              color: "#EAF1C1",
              fontFamily: "Geist, sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              letterSpacing: "-0.34px",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            Watch demo
          </button>
        </div>
      </div>
    </header>
  );
}
