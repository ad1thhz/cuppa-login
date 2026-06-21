import { useState } from "react";
import { toast, Toaster } from "sonner";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";
import imgBackground from "@/imports/Login/2b7b6da15a36eb33abce9adea52d9e5dc84c763a.png";
import imgSmartphone from "@/imports/Login/3ecb84d0343d2ba609f8f9f78a8793cb859c1b08.png";
import imgRegistration from "@/imports/Login/335f6ba4827db5eb588695ece978e900dedb3cd7.png";
import imgGoogle from "@/imports/Login/69cbd0f50770940c52c1349962ae8b0364aeec91.png";
import imgFacebook from "@/imports/Login/fc0a21d54f3ad6451d248e7ae9ee8d60ef4c5c24.png";
import imgGithub from "@/imports/Login/cf09301598a32d1399c984d0c9a7218241a945a0.png";
import svgPaths from "@/imports/Login/svg-gvz7ry9bl7";

type Provider = "Google" | "Facebook" | "Github";

const PROVIDERS: Record<Provider, { color: string; bg: string; logo: JSX.Element; hint: string }> = {
  Google: {
    color: "#4285F4",
    bg: "#fff",
    hint: "Use your Google Account",
    logo: (
      <svg viewBox="0 0 48 48" width="32" height="32">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.8 6C12.3 13 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
        <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6z"/>
        <path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.3-7.9 2.3-6.3 0-11.6-3.5-13.6-8.5l-7.8 6C6.6 42.6 14.6 48 24 48z"/>
      </svg>
    ),
  },
  Facebook: {
    color: "#fff",
    bg: "#1877F2",
    hint: "Log in with your Facebook account",
    logo: (
      <svg viewBox="0 0 48 48" width="32" height="32">
        <path fill="#fff" d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24c0 12 8.8 21.9 20.3 23.7V30.9h-6.1V24h6.1v-5.3c0-6 3.6-9.3 9-9.3 2.6 0 5.4.5 5.4.5v5.9h-3c-3 0-3.9 1.9-3.9 3.8V24h6.6l-1.1 6.9h-5.5v16.8C39.2 45.9 48 36 48 24z"/>
      </svg>
    ),
  },
  Github: {
    color: "#fff",
    bg: "#24292e",
    hint: "Sign in with your GitHub account",
    logo: (
      <svg viewBox="0 0 48 48" width="32" height="32">
        <path fill="#fff" d="M24 0C10.7 0 0 10.7 0 24c0 10.6 6.9 19.6 16.4 22.8 1.2.2 1.6-.5 1.6-1.2v-4.2c-6.7 1.5-8.1-3.2-8.1-3.2-1.1-2.8-2.7-3.5-2.7-3.5-2.2-1.5.2-1.5.2-1.5 2.4.2 3.7 2.5 3.7 2.5 2.1 3.7 5.6 2.6 7 2 .2-1.5.8-2.6 1.5-3.2-5.3-.6-10.9-2.7-10.9-11.9 0-2.6.9-4.8 2.5-6.5-.2-.6-1.1-3.1.2-6.4 0 0 2-.6 6.6 2.5a23 23 0 0 1 12 0c4.6-3.1 6.6-2.5 6.6-2.5 1.4 3.3.5 5.8.2 6.4 1.5 1.7 2.5 3.9 2.5 6.5 0 9.3-5.6 11.3-11 11.9.9.7 1.6 2.2 1.6 4.4v6.5c0 .6.4 1.4 1.7 1.2C41.1 43.6 48 34.6 48 24 48 10.7 37.3 0 24 0z"/>
      </svg>
    ),
  },
};

type ModalState = { provider: Provider; step: "form" | "authorizing" | "success" } | null;

function OAuthModal({
  modal,
  onClose,
  onAuthorize,
}: {
  modal: ModalState;
  onClose: () => void;
  onAuthorize: (provider: Provider) => void;
}) {
  if (!modal) return null;
  const cfg = PROVIDERS[modal.provider];

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="w-full rounded-t-[28px] overflow-hidden"
        style={{ background: modal.step === "success" ? "#1a2e1a" : "#f5f5f5", maxHeight: "70%" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-black/20" />
        </div>

        {modal.step === "form" && (
          <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: cfg.bg }}
            >
              {cfg.logo}
            </div>
            <div className="text-center">
              <p className="font-semibold text-[17px] text-[#111]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Sign in with {modal.provider}
              </p>
              <p className="text-[13px] text-[#666] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {cfg.hint}
              </p>
            </div>
            <div className="w-full rounded-2xl bg-white border border-black/10 px-4 py-3 flex items-center gap-3 shadow-sm">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: cfg.color === "#fff" ? cfg.bg : cfg.color, fontFamily: "'Poppins', sans-serif" }}
              >
                C
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-[#111] truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Cuppa User
                </span>
                <span className="text-[11px] text-[#888] truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                  cuppauser@{modal.provider.toLowerCase()}.com
                </span>
              </div>
              <div className="ml-auto w-4 h-4 rounded-full border-2 border-[#4285F4] flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
              </div>
            </div>
            <p className="text-[11px] text-[#999] text-center leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              By continuing, Cuppa will receive your name and profile photo. See Cuppa's Privacy Policy.
            </p>
            <button
              onClick={() => onAuthorize(modal.provider)}
              className="w-full h-12 rounded-full font-semibold text-[15px] text-white transition-all active:scale-[0.98] hover:brightness-110"
              style={{ background: cfg.color === "#fff" ? cfg.bg : cfg.color, fontFamily: "'Poppins', sans-serif" }}
            >
              Continue as Cuppa User
            </button>
            <button
              onClick={onClose}
              className="text-[13px] text-[#888] hover:text-[#444] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Use a different account
            </button>
          </div>
        )}

        {modal.step === "authorizing" && (
          <div className="px-6 pb-10 pt-4 flex flex-col items-center gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: cfg.bg }}
            >
              {cfg.logo}
            </div>
            <p className="font-semibold text-[16px] text-[#111]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Connecting to {modal.provider}…
            </p>
            <div className="relative w-10 h-10">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{ borderTopColor: cfg.color === "#fff" ? cfg.bg : cfg.color }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              />
            </div>
            <p className="text-[12px] text-[#999]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Authorizing your account…
            </p>
          </div>
        )}

        {modal.step === "success" && (
          <div className="px-6 pb-10 pt-4 flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 14, stiffness: 280 }}
              className="w-16 h-16 rounded-full bg-[#22c55e] flex items-center justify-center shadow-lg"
            >
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <p className="font-semibold text-[17px] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Signed in!
            </p>
            <p className="text-[13px] text-[#aaa] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Welcome to Cuppa via {modal.provider}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);

  function handleLogin() {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (phone.trim().length < 10) { toast.error("Phone number must be exactly 10 digits"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success(`Welcome to Cuppa, ${name}!`); }, 1200);
  }

  function handleSocial(provider: Provider) {
    setModal({ provider, step: "form" });
  }

  function handleAuthorize(provider: Provider) {
    setModal({ provider, step: "authorizing" });
    setTimeout(() => {
      setModal({ provider, step: "success" });
      setTimeout(() => setModal(null), 1600);
    }, 1800);
  }

  function handleRegister() {
    toast.info("Registration coming soon!");
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <Toaster position="top-center" />
      <div
        className="relative overflow-hidden"
        style={{ width: 390, height: 844, borderRadius: 40, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
      >
        <div className="absolute" style={{ left: -5, top: -10, width: 399, height: 862, filter: "blur(2.5px)" }}>
          <img alt="" src={imgBackground} className="absolute inset-0 size-full object-cover pointer-events-none" />
        </div>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <p className="absolute not-italic leading-normal text-[#a06830]"
          style={{ fontFamily: "'Bemdayni Demo', cursive", fontSize: 85, left: "calc(50% - 91.5px)", top: 282, width: 182, height: 99 }}>
          Cuppa
        </p>
        <p className="absolute not-italic text-black"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20, left: "calc(50% - 50.5px)", top: 431 }}>
          Login with
        </p>
        <button onClick={() => handleSocial("Google")}
          className="absolute cursor-pointer hover:opacity-80 active:scale-95 transition-all bg-transparent border-none p-0"
          style={{ left: 110, top: 465, width: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 30, height: 30, position: "relative", overflow: "hidden" }}>
            <img alt="Google" src={imgGoogle}
              style={{ position: "absolute", height: "153.85%", left: "-26.56%", top: "-27.69%", width: "156.25%", maxWidth: "none" }} />
          </div>
          <span className="not-italic text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 12 }}>Google</span>
        </button>
        <button onClick={() => handleSocial("Facebook")}
          className="absolute cursor-pointer hover:opacity-80 active:scale-95 transition-all bg-transparent border-none p-0"
          style={{ left: 174, top: 465, width: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 30, height: 30, position: "relative" }}>
            <img alt="Facebook" src={imgFacebook} className="absolute inset-0 size-full object-cover" />
          </div>
          <span className="not-italic text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 12 }}>Facebook</span>
        </button>
        <button onClick={() => handleSocial("Github")}
          className="absolute cursor-pointer hover:opacity-80 active:scale-95 transition-all bg-transparent border-none p-0"
          style={{ left: 247, top: 465, width: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 30, height: 29, position: "relative", overflow: "hidden" }}>
            <img alt="Github" src={imgGithub}
              style={{ position: "absolute", height: "135.14%", left: "-15.79%", top: "-17.57%", width: "131.58%", maxWidth: "none" }} />
          </div>
          <span className="not-italic text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 12 }}>Github</span>
        </button>
        <p className="absolute not-italic text-black"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20, left: "calc(50% - 10.5px)", top: 528 }}>
          or
        </p>
        <div className="absolute" style={{ left: 60, top: 556, width: 272, height: 168.704 }}>
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 272 168.704">
            <path d={svgPaths.p6284780} fill="#ECECEC" fillOpacity="0.28" />
          </svg>
        </div>
        <p className="absolute not-italic text-black"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, left: 85.9, top: 566.39 }}>
          Name
        </p>
        <div className="absolute rounded-[50px] border border-[#888] border-solid"
          style={{ background: "#423200", height: 38, left: 82, top: 591, width: 227 }} />
        <div className="absolute" style={{ left: 283, top: 600, width: 18, height: 18 }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" src={imgRegistration} className="absolute max-w-none size-full" style={{ left: "2.27%", top: "2.04%" }} />
          </div>
        </div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="absolute bg-transparent outline-none border-none text-white placeholder-white/70"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, left: 95, top: 591, width: 186, height: 38, padding: "0 8px" }} />
        <p className="absolute not-italic text-[#0a0a0a]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, left: 84.9, top: 633.39 }}>
          Phone Number
        </p>
        <div className="absolute rounded-[50px] border border-[#9a9a9a] border-solid"
          style={{ background: "#423200", height: 38, left: 82, top: 658, width: 227 }} />
        <div className="absolute" style={{ left: 283, top: 668, width: 18, height: 18 }}>
          <img alt="" src={imgSmartphone} className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" />
        </div>
        <input type="tel" value={phone}
          onChange={(e) => { const digits = e.target.value.replace(/\D/g, "").slice(0, 10); setPhone(digits); }}
          placeholder="Enter your phone number" minLength={10} maxLength={10} inputMode="numeric"
          className="absolute bg-transparent outline-none border-none text-white placeholder-white/70"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, left: 95, top: 658, width: 186, height: 38, padding: "0 8px" }} />
        <button onClick={handleLogin} disabled={loading}
          className="absolute rounded-[50px] border border-[#f80] border-solid cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
          style={{ background: "#612f05", height: 34, left: 73.9, top: 711.39, width: 244 }}>
          <span className="not-italic text-[#eee]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 20 }}>
            {loading ? "Logging in…" : "Login"}
          </span>
        </button>
        <p className="absolute not-italic text-white cursor-pointer"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 12, left: 82, top: 757 }}>
          <span>{"Don't have an account ? "}</span>
          <span onClick={handleRegister}
            className="text-[#fffc71] underline decoration-solid hover:text-yellow-300 transition-colors"
            style={{ textDecorationSkipInk: "none", textUnderlinePosition: "from-font" }}>
            register now
          </span>
        </p>
        <AnimatePresence>
          {modal && (
            <OAuthModal modal={modal} onClose={() => setModal(null)} onAuthorize={handleAuthorize} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
