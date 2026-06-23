const iconSara = "https://qclay.design/lovable/shyen/icon_sara.png";
const iconAnjum = "https://qclay.design/lovable/shyen/icon_anjum.png";
const logoFrame = "https://qclay.design/lovable/shyen/logo_frame.png";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

const cardBg =
  "linear-gradient(87deg, rgba(128, 142, 63, 0.50) -0.37%, rgba(255, 255, 255, 0.00) 109.46%)";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Timeline (ms) - overlapping, conversational
const T = {
  heading: 0, // word stagger 90ms
  paragraph: 500, // lines, 100ms apart
  saraRow: 1000, // Sara avatar + name
  card1: 1150, // first user card
  shyenRow: 1900, // Shyen.AI logo + label
  card2: 2050, // AI response diagonal
  anjumRow: 2900, // user avatar + name
  card3: 3050, // final user card opposite diagonal
};

const headingWords = [
  ["24/7", "support", "to", "care", "for"],
  ["your", "mental", "health."],
];
const paragraphLines = [
  "Instant, intelligent support that helps you manage stress, find",
  "calm, and stay in control anytime, anywhere.",
];

export default function CareSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const [isLg, setIsLg] = useState(true);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fadeUp = (delay: number, y = 15) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="care-section relative w-full overflow-hidden bg-[#112115]"
    >
      <div
        className="relative mx-auto max-w-[1240px] px-6"
        style={{ minHeight: "100vh" }}
      >
        {/* Heading */}
        <div
          style={{ paddingTop: "124px" }}
          className="flex flex-col items-center"
        >
          <h2
            style={{
              color: "#EAF1C1",
              textAlign: "center",
              fontFamily: "Halant, serif",
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 400,
              lineHeight: "clamp(36px, 7vw, 72px)",
              letterSpacing: "-3.6px",
            }}
          >
            {headingWords.map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line.map((w, wi) => {
                  const idx = (li === 0 ? 0 : headingWords[0].length) + wi;
                  const delay = T.heading + idx * 90;
                  return (
                    <span
                      key={wi}
                      style={{
                        display: "inline-block",
                        paddingBottom: "0.15em",
                        paddingTop: "0.1em",
                        marginRight: wi === line.length - 1 ? 0 : "0.22em",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          opacity: inView ? 1 : 0,
                          transform: inView
                            ? "translateY(0)"
                            : "translateY(35px)",
                          transition: `opacity 0.85s ${EASE} ${delay}ms, transform 0.95s ${EASE} ${delay}ms`,
                        }}
                      >
                        {w}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <p
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontFamily: "Geist, sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.4px",
            }}
          >
            {paragraphLines.map((line, i) => {
              const delay = T.paragraph + i * 100;
              return (
                <span
                  key={i}
                  style={{
                    display: "block",
                    color: "#FFF",
                    opacity: inView ? 0.4 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
                  }}
                >
                  {line}
                </span>
              );
            })}
          </p>
        </div>

        {/* Floating cards area */}
        <div
          className="relative mx-auto flex flex-col"
          style={{
            marginTop: "clamp(40px, 6vw, 72px)",
            maxWidth: "860px",
            gap: "clamp(32px, 5vw, 36px)",
            paddingBottom: "clamp(80px, 12vw, 124px)",
          }}
        >
          {/* First card - user, center */}
          <div className="flex flex-col items-end" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "min(446px, 100%)",
                padding: "20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "100px",
                border: "2px solid rgba(255, 255, 255, 0.05)",
                background: cardBg,
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                color: "#FFF",
                fontFamily: "Halant, serif",
                fontSize: "18px",
                lineHeight: "20px",
                letterSpacing: "-0.36px",
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0) scale(1)"
                  : "translateY(20px) scale(0.95)",
                transition: `opacity 0.8s ${EASE} ${T.card1}ms, transform 0.8s ${EASE} ${T.card1}ms`,
              }}
            >
              <span style={{ color: "#EAF1C1" }}>Hey 👋 Shyen.AI!</span>
              <span>could you help me sync full body?</span>
            </div>
            <div style={fadeUp(T.saraRow)}>
              <ProfileRow
                icon={iconSara}
                name="Sara ali"
                borderColor="#EBFF6F"
                align="center"
              />
            </div>
          </div>

          {/* Second card - AI response, left */}
          <div className="flex flex-col items-start" style={{ width: "100%" }}>
            <div
              style={{
                display: "inline-flex",
                width: "min(440px, 100%)",
                padding: "20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "24px",
                border: "2px solid rgba(255, 255, 255, 0.05)",
                background: cardBg,
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                color: "#FFF",
                fontFamily: "Halant, serif",
                fontSize: "18px",
                lineHeight: "20px",
                letterSpacing: "-0.36px",
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translate(0, 0)"
                  : "translate(-35px, 35px)",
                transition: `opacity 0.9s ${EASE} ${T.card2}ms, transform 1s ${EASE} ${T.card2}ms`,
              }}
            >
              <span>
                It seems like things feel overwhelming right now. Would you like
                a quick exercise to help you reset?
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ paddingTop: "16px", ...fadeUp(T.shyenRow) }}
            >
              <img
                src={logoFrame}
                alt=""
                style={{ width: "20.894px", height: "20.89px" }}
              />
              <span
                style={{
                  color: "#EAF1C1",
                  fontFamily: "Halant, serif",
                  fontSize: "20px",
                  lineHeight: "20px",
                  letterSpacing: "-0.4px",
                }}
              >
                Shyen.AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileRow({
  icon,
  name,
  borderColor,
  align,
}: {
  icon: string;
  name: string;
  borderColor: string;
  align: "center" | "end";
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "center" ? "justify-center" : "justify-end"
      }`}
      style={{ paddingTop: "16px" }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "36px",
          border: `1px solid ${borderColor}`,
          backgroundImage: `url(${icon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <span
        style={{
          color: "#EAF1C1",
          fontFamily: "Halant, serif",
          fontSize: "20px",
          lineHeight: "20px",
          letterSpacing: "-0.4px",
        }}
      >
        {name}
      </span>
    </div>
  );
}
