import { useInView } from "@/hooks/use-in-view";
const googlePlay = "https://qclay.design/lovable/shyen/google_play.svg";
const appleMarket = "https://qclay.design/lovable/shyen/apple_market.svg";
const instagram = "https://qclay.design/lovable/shyen/instagram.svg";
const linkedin = "https://qclay.design/lovable/shyen/linkedin.svg";
const youtube = "https://qclay.design/lovable/shyen/youtube.svg";
const logoFooter = "https://qclay.design/lovable/shyen/logo_footer.svg";

const ease = "cubic-bezier(0.22,1,0.36,1)";

const iconBtn: React.CSSProperties = {
  display: "flex",
  width: 46,
  height: 46,
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: 56,
  background: "rgba(234, 241, 193, 0.10)",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(234, 241, 193, 0.70)",
  fontFamily: "Geist, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "16px",
  textDecoration: "none",
};

const titleStyle: React.CSSProperties = {
  color: "rgba(234, 241, 193, 0.70)",
  fontFamily: "Halant, serif",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: "0.45px",
  textTransform: "uppercase",
  opacity: 0.5,
  margin: 0,
};

function fadeUp(
  inView: boolean,
  delay: number,
  distance = 20,
): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity 700ms ${ease} ${delay}ms, transform 700ms ${ease} ${delay}ms`,
  };
}

function fadeRight(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-20px)",
    transition: `opacity 700ms ${ease} ${delay}ms, transform 700ms ${ease} ${delay}ms`,
  };
}

const col1Links = ["About", "Careers", "Press", "Contact"];
const col2Links = ["Blog", "Help center", "Privacy", "Terms"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Cookies"];
const socials = [
  { src: instagram, label: "Instagram" },
  { src: linkedin, label: "LinkedIn" },
];

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  // Timing
  const d = {
    description: 0,
    appRow: 200, // first item starts
    appStep: 120,
    logo: 700,
    col1Title: 800,
    col1Step: 100,
    col2Title: 1300,
    col2Step: 100,
    legal: 2000,
    legalStep: 120,
  };

  return (
    <footer
      ref={ref}
      style={{
        background: "#122115",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "clamp(32px, 6vw, 80px)",
          flexWrap: "wrap",
          marginTop: "clamp(48px, 10vw, 110px)",
        }}
      >
        {/* LEFT */}
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              margin: 0,
              color: "#EAF1C1",
              fontFamily: "Halant, serif",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "-0.56px",
              ...fadeUp(inView, d.description, 30),
            }}
          >
            <span style={{ display: "block" }}>
              Shyen is 24/7 support for your mind. Created by
            </span>
            <span style={{ display: "block" }}>
              renowned clinicians, it gives you the support you
            </span>
            <span style={{ display: "block" }}>
              need, right when you need it.
            </span>
          </p>

          {/* App download row */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href="#"
                style={{ ...iconBtn, ...fadeUp(inView, d.appRow) }}
                aria-label="Google Play"
              >
                <img
                  src={googlePlay}
                  alt=""
                  style={{ width: 18, height: 20 }}
                />
              </a>
              <a
                href="#"
                style={{ ...iconBtn, ...fadeUp(inView, d.appRow + d.appStep) }}
                aria-label="App Store"
              >
                <img
                  src={appleMarket}
                  alt=""
                  style={{ width: 18, height: 20 }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT - link columns */}
        <div
          style={{
            display: "flex",
            gap: "clamp(32px, 6vw, 96px)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ ...titleStyle, ...fadeRight(inView, d.col1Title) }}>
              Company
            </p>
            {col1Links.map((label, i) => (
              <a
                key={label}
                href="#"
                style={{
                  ...linkStyle,
                  ...fadeRight(inView, d.col1Title + (i + 1) * d.col1Step),
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ ...titleStyle, ...fadeRight(inView, d.col2Title) }}>
              Resources
            </p>
            {col2Links.map((label, i) => (
              <a
                key={label}
                href="#"
                style={{
                  ...linkStyle,
                  ...fadeRight(inView, d.col2Title + (i + 1) * d.col2Step),
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark */}
      <div
        style={{
          marginTop: 96,
          display: "flex",
          justifyContent: "center",
          ...fadeUp(inView, d.logo, 40),
        }}
      >
        <img
          src={logoFooter}
          alt="Shyen"
          style={{
            width: "100%",
            maxWidth: 1240,
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Legal / social row */}
      <div
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid rgba(234,241,193,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            ...linkStyle,
            opacity: 0.5,
            ...fadeUp(inView, d.legal),
          }}
        >
          © {new Date().getFullYear()} Shyen. All rights reserved.
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {legalLinks.map((label, i) => (
            <a
              key={label}
              href="#"
              style={{
                ...linkStyle,
                ...fadeUp(inView, d.legal + (i + 1) * d.legalStep),
              }}
            >
              {label}
            </a>
          ))}

          <div style={{ display: "flex", gap: 8 }}>
            {socials.map((s, i) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{
                  ...iconBtn,
                  ...fadeUp(
                    inView,
                    d.legal + (legalLinks.length + i + 1) * d.legalStep,
                  ),
                }}
              >
                <img src={s.src} alt="" style={{ width: 18, height: 18 }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
