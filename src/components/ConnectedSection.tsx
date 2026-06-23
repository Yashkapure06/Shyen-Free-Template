import { useEffect, useRef, useState } from "react";
const secondVideo = "https://qclay.design/lovable/shyen/second.mp4";
const topGradient = "https://qclay.design/lovable/shyen/top_gradient.png";
const logoBottom = "https://qclay.design/lovable/shyen/logo_bottom.svg";
const bigLine = "https://qclay.design/lovable/shyen/big_line.svg";
const smallLine = "https://qclay.design/lovable/shyen/small_line.svg";
const whoop = "https://qclay.design/lovable/shyen/whoop.svg";
const apple = "https://qclay.design/lovable/shyen/apple.svg";
const dotLogo = "https://qclay.design/lovable/shyen/dot_logo.svg";
const iconClock = "https://qclay.design/lovable/shyen/icon_clock.svg";
const garmin = "https://qclay.design/lovable/shyen/garmin.svg";
const cruasan = "https://qclay.design/lovable/shyen/cruasan.svg";

const HEADING_STAGGER = 0.09;
const HEADING_DURATION = 0.9;
const HEADING_WORDS_TOTAL = 6;
const PARAGRAPH_DELAY =
  HEADING_DURATION + (HEADING_WORDS_TOTAL - 1) * HEADING_STAGGER + 0.1;

const CARD_WIDTH = 308;
const CARD_GAP = 12;

type DotKind = "empty" | "filled" | "outlined";

// 5 rows x 7 cols
const DOTS: DotKind[][] = [
  [null as any, "empty", "empty", "empty", "empty", "filled", "empty"],
  ["empty", "empty", "filled", "empty", "filled", "filled", "empty"],
  ["empty", "empty", "filled", "empty", "empty", "empty", "empty"],
  ["filled", "filled", "empty", "empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "outlined", "outlined", "outlined", "outlined"],
];

export default function ConnectedSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const [isLg, setIsLg] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(576);

  useEffect(() => {
    if (!inView) return;
    autoPlayRef.current = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [inView]);

  const handleCardClick = (idx: number) => {
    setActiveCard(idx);
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / vh));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const update = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const lines = [
    ["Connected", "to", "the"],
    ["way", "you", "live."],
  ];

  const shift = progress * -80;
  const blockTranslate = (1 - progress) * 80;
  const blockOpacity = Math.min(1, 0.15 + progress * 1.4);

  // slider math
  const stride = CARD_WIDTH + CARD_GAP;
  const trackOffset = -activeCard * stride;
  const thumbW = Math.min(360, trackWidth * (360 / 576));
  const thumbMax = trackWidth - thumbW;
  const thumbX = activeCard * thumbMax;

  return (
    <section
      ref={ref}
      className="connected-section relative w-full overflow-hidden"
      style={{ background: "#FBFFE6", minHeight: "160vh" }}
    >
      <img
        src={topGradient}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />

      <div
        className="relative mx-auto max-w-[1240px] px-6"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            paddingTop: "clamp(60px, 30vh, 415px)",
            paddingBottom: "0px",
            transform: `translateY(${shift}px)`,
            transition: "transform 0.2s linear",
            willChange: "transform",
          }}
        >
          <h2
            style={{
              color: "#122216",
              textAlign: "center",
              fontFamily: "Halant, serif",
              fontSize: "72px",
              fontWeight: 400,
              lineHeight: "72px",
              letterSpacing: "-3.6px",
              margin: 0,
            }}
          >
            {lines.map((words, li) => {
              const offset = li === 0 ? 0 : lines[0].length;
              return (
                <span key={li} style={{ display: "block", paddingBottom: "0.15em", paddingTop: "0.1em" }}>
                  {words.map((w, wi) => {
                    const idx = offset + wi;
                    return (
                      <span
                        key={wi}
                        style={{
                          display: "inline-block",
                          opacity: inView ? 1 : 0,
                          transform: inView
                            ? "translateY(0)"
                            : "translateY(40px)",
                          transition: `opacity ${HEADING_DURATION}s cubic-bezier(0.22,1,0.36,1) ${idx * HEADING_STAGGER}s, transform ${HEADING_DURATION}s cubic-bezier(0.22,1,0.36,1) ${idx * HEADING_STAGGER}s`,
                          willChange: "transform, opacity",
                        }}
                      >
                        {w}
                        {wi < words.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h2>

          <p
            style={{
              marginTop: "24px",
              marginBottom: 0,
              color: "#122215",
              textAlign: "center",
              fontFamily: "Geist, sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.4px",
              opacity: inView ? 0.5 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${PARAGRAPH_DELAY}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${PARAGRAPH_DELAY}s`,
              willChange: "transform, opacity",
            }}
          >
            Sync wearables to bring heart rate, sleep, and movement
            <br />
            into your wellness picture.
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            position: "relative",
            height: "clamp(420px, 60vw, 460px)",
            width: "100%",
            borderRadius: "32px",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.32)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            transform: `translateY(${blockTranslate}px)`,
            opacity: blockOpacity,
            transition: "transform 0.25s linear, opacity 0.25s linear",
            willChange: "transform, opacity",
          }}
        >
          <video
            src={secondVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* overlay above video, below content */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(129deg, rgba(0,0,0,0.70) 0%, rgba(102,102,102,0.00) 47.85%)",
              pointerEvents: "none",
            }}
          />

          {/* Content row: text left, slider right */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: isLg ? "48px" : "24px",
              display: "flex",
              flexDirection: isLg ? "row" : "column",
              gap: isLg ? "48px" : "24px",
              zIndex: 2,
            }}
          >
            {/* Left column */}
            <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: 0,
              }}
            >
              <h3
                style={{
                  color: "#FFF",
                  fontFamily: "Halant, serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 400,
                  lineHeight: "clamp(32px, 4vw, 45px)",
                  letterSpacing: "-2.4px",
                  margin: 0,
                }}
              >
                Connect Shyen to
                <br />
                wearables or calendars for
                <br />
                realtime suggestions.
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "max-content max-content",
                  gap: "8px",
                  width: "max-content",
                }}
              >
                <Tag>Heart variability</Tag>
                <Tag>Daily movement</Tag>
                <Tag>Stress signals</Tag>
              </div>
            </div>

            {/* Right column: slider */}
            <div
              style={{
                flex: "0 0 auto",
                width: "min(628px, 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: `${CARD_GAP}px`,
                    transform: `translateX(${trackOffset}px)`,
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                    willChange: "transform",
                  }}
                >
                  <SliderCard active={activeCard === 0} onClick={() => handleCardClick(0)}>
                    <CalendarCard animate={activeCard === 0} />
                  </SliderCard>
                  <SliderCard active={activeCard >= 0} onClick={() => handleCardClick(1)}>
                    <OrbitCard />
                  </SliderCard>
                  <SliderCard active={activeCard === 1} onClick={() => handleCardClick(1)} padding="0px 22px 22px 22px">
                    <ChatCard animate={activeCard === 1} />
                  </SliderCard>
                </div>
              </div>

              {/* progress bar */}
              <div
                ref={trackRef}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={activeCard}
                tabIndex={0}
                onClick={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  handleCardClick(x < rect.width / 2 ? 0 : 1);
                }}
                style={{
                  width: "100%",
                  maxWidth: "576px",
                  height: "13px",
                  borderRadius: "56px",
                  background: "rgba(234,241,193,0.31)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${(360 / 576) * 100}%`,
                    height: "13px",
                    borderRadius: "56px",
                    background: "#EAF1C1",
                    transform: `translateX(${thumbX}px)`,
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "flex",
        height: "40px",
        padding: "8px 18px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "48px",
        background: "rgba(0,0,0,0.20)",
        color: "#FFF",
        fontFamily: "Geist, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        letterSpacing: "-0.32px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function SliderCard({
  children,
  active,
  onClick,
  padding,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
  padding?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: "0 0 auto",
        width: `${CARD_WIDTH}px`,
        maxHeight: "293px",
        display: "flex",
        padding: padding ?? "22px 21px 51px 22px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        borderRadius: "32px",
        border: "2px solid rgba(255,255,255,0.32)",
        background: "#EAF1C1",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        opacity: active ? 1 : 0.92,
        transition: "opacity 0.6s ease",
        cursor: onClick ? "pointer" : "default",
      }}
    >

      {children}
    </div>
  );
}

function CalendarCard({ animate }: { animate: boolean }) {
  return (
    <>
      <div
        style={{
          color: "#000",
          fontFamily: "Halant, serif",
          fontSize: "32px",
          fontWeight: 400,
          lineHeight: "45px",
          letterSpacing: "-0.96px",
        }}
      >
        April 2026
      </div>
      <div
        style={{
          marginTop: "0px",
          display: "grid",
          gridTemplateColumns: "repeat(7, 19px)",
          gridAutoRows: "19px",
          gap: "14px",
        }}
      >
        {DOTS.flatMap((row, ri) =>
          row.map((kind, ci) => {
            const delay = (ri * 7 + ci) * 0.05;
            const common: React.CSSProperties = {
              width: "19px",
              height: "19px",
              borderRadius: "50%",
              transform: animate ? "scale(1)" : "scale(0)",
              opacity: animate ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.5s ease ${delay}s`,
            };
            if (kind === null) {
              return <div key={`${ri}-${ci}`} style={{ width: "19px", height: "19px" }} />;
            }
            if (kind === "filled") {
              return (
                <div
                  key={`${ri}-${ci}`}
                  style={{ ...common, background: "#B5C468" }}
                />
              );
            }
            if (kind === "outlined") {
              return (
                <div
                  key={`${ri}-${ci}`}
                  style={{
                    ...common,
                    background: "transparent",
                    border: "2px solid #B5C468",
                  }}
                />
              );
            }
            return (
              <div
                key={`${ri}-${ci}`}
                style={{ ...common, background: "rgba(0,0,0,0.08)" }}
              />
            );
          }),
        )}
      </div>
    </>
  );
}

function OrbitCard() {
  const outerLogos = [whoop, apple, dotLogo, iconClock, garmin];
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <img
        src={bigLine}
        alt=""
        style={{
          position: "absolute",
          width: "196px",
          height: "196px",
        }}
      />
      {/* Inner ring */}
      <img
        src={smallLine}
        alt=""
        style={{
          position: "absolute",
          width: "132px",
          height: "132px",
        }}
      />

      {/* Center logo */}
      <img
        src={logoBottom}
        alt=""
        style={{
          position: "relative",
          width: "32.894px",
          height: "32.887px",
          opacity: 0.4,
          zIndex: 3,
        }}
      />

      {/* Outer orbit container */}
      <div
        style={{
          position: "absolute",
          width: "calc(98px * 2)",
          height: "calc(98px * 2)",
          animation: "spin 24s linear infinite",
        }}
      >
        {outerLogos.map((src, i) => {
          const angle = (i / outerLogos.length) * 360;
          return (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "33px",
                height: "33px",
                transform: `rotate(${angle}deg) translate(98px) rotate(-${angle}deg) translate(-16.5px, -16.5px)`,
              }}
            />
          );
        })}
      </div>

      {/* Inner orbit */}
      <div
        style={{
          position: "absolute",
          width: "132px",
          height: "132px",
          animation: "spinReverse 18s linear infinite",
        }}
      >
        <img
          src={cruasan}
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "27px",
            height: "27px",
            transform: "translate(-50%, -50%) translateY(-66px)",
          }}
        />
      </div>

      <style>{`
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}

function ChatCard({ animate }: { animate: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "266px",
        height: "305px",
        padding: "0px 16px 16px 16px",
        borderRadius: "32px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderTop: "none",
        borderRight: "3px solid #112115",
        borderLeft: "3px solid #112115",
        borderBottom: "3px solid #112115",
        background:
          "linear-gradient(0deg, #B5C468 -4.1%, rgba(181,196,104,0.00) 89.34%)",
        marginLeft: "-1px",
        overflow: "hidden",
      }}
    >
      {/* Message 1 */}
      <div
        style={{
          position: "absolute",
          top: animate ? "5px" : "calc(5px + 14px + 90px)",
          left: "16px",
          right: "16px",
          opacity: animate ? 1 : 0,
          transition:
            "top 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s, opacity 0.5s ease 0.1s",
        }}
      >
        <ChatBubble>
          I&rsquo;ve noticed your heart rate is higher
          <br />
          than usual while you&rsquo;re at rest.
          <br />
          This can sometimes indicate stress
          <br />
          how are you feeling right now?
        </ChatBubble>
      </div>

      {/* Message 2 */}
      <div
        style={{
          position: "absolute",
          top: "calc(5px + 90px + 14px)",
          left: "16px",
          right: "16px",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(10px)",
          transition:
            "opacity 0.6s ease 1.4s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 1.4s",
        }}
      >
        <ChatBubble>
          It looks like your heart rate is a bit
          <br />
          elevated while you&rsquo;re sitting.
          <br />
          That can happen when your body is
          <br />
          on alert &mdash; how are you feeling this
          <br />
          afternoon?
        </ChatBubble>
      </div>

      {/* loader + logo */}
      <div
        style={{
          position: "absolute",
          left: "24px",
          bottom: "17.63px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: animate ? 1 : 0,
          transition: "opacity 0.4s ease 2s",
        }}
      >
        <img
          src={logoBottom}
          alt=""
          style={{
            width: "20px",
            height: "20px",
            opacity: 0.5,
            animation: "spin 12s linear infinite",
            filter: "invert(1)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[10, 8, 6].map((s, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: `${s}px`,
                height: `${s}px`,
                borderRadius: "999px",
                background: "#112115",
                animation: "loaderPulse 1.8s ease-in-out infinite",
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        width: "234px",
        padding: "14px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "16px",
        background: "#A6B16E",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        color: "#FFF",
        fontFamily: "Geist, sans-serif",
        fontSize: "13px",
        lineHeight: "15px",
        letterSpacing: "-0.26px",
        textAlign: "center",
      }}
    >
      <div>{children}</div>
    </div>
  );
}
