import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.PNG";
import sbcs from "../../assets/sbc.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { PiTiktokLogo } from "react-icons/pi";
import { FaSnapchat } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import visa from "../../assets/visa.svg";
import stcPay from "../../assets/stc.svg";
import creditcard from "../../assets/creditcard.svg";
import { WHATSAPP_URL } from "../../constants/contact";

const handlePrivacy = (e) => {
  e.preventDefault();
  setTimeout(() => {
    document
      .getElementById("privacy-policy")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToHomeSection = (sectionId) => {
    const run = () =>
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(run, 400);
    } else {
      run();
    }
  };

  return (
    <>
      {/* ✅ CLS fix: contain layout + minHeight */}
      <div
        className="bg-brand h-14"
        style={{
          clipPath: "ellipse(55% 100% at 50% 100%)",
          minHeight: "56px",
          contain: "layout",
        }}
      />

      <footer className="bg-brand text-white px-6 pt-12">
        <div className="bg-brand max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="font-bold text-base mb-4">روابط مهمة</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToHomeSection("return-policy")}
                  className="hover:text-white transition-colors text-right w-full"
                >
                  سياسة الاسترجاع والاستبدال
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToHomeSection("our-services")}
                  className="hover:text-white transition-colors text-right w-full"
                >
                  من نحن
                </button>
              </li>
              {/* ✅ link فاضي اتملى */}
              <li>
                <a
                  href="/#privacy-policy"
                  onClick={handlePrivacy}
                  className="hover:text-white transition-colors"
                >
                 
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <img
              src={logo}
              className="mx-auto mb-2 w-28"
              alt="شعار بيرفيوم طلسمان"
            />
            <p className="text-sm text-white leading-relaxed mb-4">
              نمزج بين الأناقة والتميز لتخلق لك تجربة عطرية فريدة، حيث كل نفحة
              تحكي قصة.
            </p>
            <div className="flex justify-center gap-6 text-sm text-white">
              <div>
                <p className="text-white font-bold">السجل التجاري</p>
                <p>1304163</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <img
              src={sbcs}
              className="w-20 mx-auto mb-2"
              alt="منصة الأعمال السعودية"
            />
            <p className="text-sm text-white">موثق لدى منصة الأعمال</p>
          </div>
        </div>

        <div className="border-t-2 border-white/40 border-dotted mt-10 py-6 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-4">
            {/* ✅ aria-label على كل contact link */}
            <a
              href="mailto:info@sadl.sa"
              aria-label="راسلنا على البريد الإلكتروني"
              className="flex items-center gap-2 border border-white text-white text-sm px-5 py-2 hover:bg-white/10 transition"
            >
              <MdOutlineMailOutline aria-hidden="true" />
              البريد الإلكتروني
            </a>
            <a
              href="tel:+966XXXXXXXXX"
              aria-label="اتصل بنا على الجوال"
              className="flex items-center gap-2 border border-white text-white text-sm px-5 py-2 hover:bg-white/10 transition"
            >
              <FaMobileAlt aria-hidden="true" />
              الجوال
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل معنا على واتساب"
              className="flex items-center gap-2 border border-white text-white text-sm px-5 py-2 hover:bg-white/10 transition"
            >
              <FaWhatsapp aria-hidden="true" />
              واتساب
            </a>
          </div>

          {/* ✅ aria-label على Social icons */}
          <div className="flex justify-center gap-4 text-white">
            <a
              href="#"
              aria-label="تابعنا على تيك توك"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
            >
              <PiTiktokLogo aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="تابعنا على سناب شات"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
            >
              <FaSnapchat aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="تابعنا على انستجرام"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
            >
              <FaInstagram aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="border-t-2 border-t-white/40 border-dotted py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-white text-xs">
            الحقوق محفوظة | PERFUME TALISMAN 2026
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            <img src={creditcard} className="h-6" alt="مدى" />
            <img src={visa} className="h-6" alt="Visa" />
            <img src={stcPay} className="h-6" alt="STC Pay" />
          </div>
        </div>
      </footer>
    </>
  );
}
