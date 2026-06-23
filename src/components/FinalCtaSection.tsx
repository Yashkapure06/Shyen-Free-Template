import { useInView } from "@/hooks/use-in-view";
const bottomGradient = "https://qclay.design/lovable/shyen/bottom_gradient.png";

export default function FinalCtaSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 });

  const line1 = ["Experience", "smarter", "mental"];
  const line2 = ["wellness", "with", "Shyen"];
  const allWords = [...line1, ...line2];
  const ease = "cubic-bezier(0.22,1,0.36,1)";

  const paragraphDelay = allWords.length * 90 + 100;
  const formDelay = allWords.length * 90 + 300;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#122115",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Top gradient image - edge to edge, absolutely positioned */}
      <img
        src={bottomGradient}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "100%",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translateX(-50%) scaleX(1.4)",
        }}
        draggable={false}
      />

      {/* Content area */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          marginTop: "clamp(48px, 20vh, 360px)",
        }}
      >
        <div
          className="mx-auto max-w-[1440px]"
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#EAF1C1",
              fontFamily: "Halant, serif",
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              textAlign: "center",
            }}
          >
            {[line1, line2].map((line, lineIdx) => {
              const startIdx = lineIdx === 0 ? 0 : line1.length;
              return (
                <span
                  key={lineIdx}
                  style={{ display: "block", overflow: "hidden" }}
                >
                  {line.map((w, i) => {
                    const globalIdx = startIdx + i;
                    return (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          marginRight: i < line.length - 1 ? "0.28em" : 0,
                          opacity: inView ? 1 : 0,
                          transform: inView
                            ? "translateY(0)"
                            : "translateY(40px)",
                          transition: `opacity 800ms ${ease} ${globalIdx * 90}ms, transform 800ms ${ease} ${globalIdx * 90}ms`,
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h2>

          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              color: "#FBFFE3",
              fontFamily: "Geist, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.4px",
              opacity: inView ? 0.5 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 800ms ${ease} ${paragraphDelay}ms, transform 800ms ${ease} ${paragraphDelay}ms`,
            }}
          >
            <span style={{ display: "block" }}>
              Personalized guidance designed to help you
            </span>
            <span style={{ display: "block" }}>
              relax, focus, and feel better every day.
            </span>
          </p>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 800ms ${ease} ${formDelay}ms, transform 800ms ${ease} ${formDelay}ms`,
            }}
          >
            <form
              className="flex items-center justify-between"
              style={{
                width: "583px",
                maxWidth: "100%",
                padding: "7px 8px 7px 7px",
                borderRadius: "58px",
                background: "rgba(0, 0, 0, 0.16)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent border-0 outline-none px-5 text-white placeholder:text-white/40"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "18px",
                  lineHeight: "20px",
                  letterSpacing: "-0.18px",
                }}
              />
              <button
                type="submit"
                className="transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  borderRadius: "48px",
                  background: "#FFF",
                  color: "#091814",
                  fontFamily: "Geist, sans-serif",
                  fontSize: "17px",
                  fontWeight: 500,
                  letterSpacing: "-0.34px",
                }}
              >
                Join waitlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
