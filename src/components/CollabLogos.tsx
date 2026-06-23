const logoDevelopHealth = "https://qclay.design/lovable/shyen/logo_develop_health.png";
const logoHealthAI = "https://qclay.design/lovable/shyen/logo_health_ai.png";
const logoAIInHealth = "https://qclay.design/lovable/shyen/logo_ai_in_health.png";
const logoQuantum = "https://qclay.design/lovable/shyen/logo_quantum.png";
const logoAIMedical = "https://qclay.design/lovable/shyen/logo_ai_medical.png";

const logos = [
  { src: logoDevelopHealth, alt: "Develop Health" },
  { src: logoHealthAI, alt: "Health AI" },
  { src: logoAIInHealth, alt: "AI in Health Research Network" },
  { src: logoQuantum, alt: "Quantum Health AI" },
  { src: logoAIMedical, alt: "AI Medical Technology" },
];

export default function CollabLogos() {
  const track = [...logos, ...logos];
  return (
    <section className="collab-section w-full" style={{ background: "#112115" }}>
      <div className="mx-auto max-w-[1240px] px-6" style={{ paddingTop: "56px", paddingBottom: "96px" }}>
        <h3
          style={{
            color: "#EAF1C1",
            fontFamily: "Geist, sans-serif",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "-0.48px",
            textAlign: "left",
            opacity: 0.5,
          }}
        >
          Shyen AI Collaborations with
        </h3>

        <div
          style={{
            marginTop: "40px",
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "96px",
              width: "max-content",
              animation: "collabMarquee 40s linear infinite",
              willChange: "transform",
            }}
          >
            {track.map((l, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={l.src}
                  alt={l.alt}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes collabMarquee {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </section>
  );
}
