import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.webp";
import sbcs from "../../assets/sbc.webp";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { PiTiktokLogo } from "react-icons/pi";
import { FaSnapchat } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import visa from "../../assets/visa.svg";
import stcPay from "../../assets/stc.svg";
import creditcard from "../../assets/creditcard.svg";
import {
  MAILTO_URL,
  PHONE_TEL_URL,
  WHATSAPP_URL,
} from "../../constants/contact";
import { POLICY_LINKS } from "../../constants/policyLinks";
import { SITE_NAME } from "../../constants/brand";

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
              {POLICY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-brand-light transition-colors text-right block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToHomeSection("our-services")}
                  className="hover:text-brand-light transition-colors text-right w-full"
                >
                  من نحن
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center">
            {/* ✅ width + height مضافين */}
            <img
              src={logo}
              className="mx-auto mb-2 w-28"
              alt={`شعار ${SITE_NAME}`}
              width="112"
              height="112"
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
            {/* ✅ width + height مضافين */}
            <img
              src={sbcs}
              className="w-20 mx-auto mb-2"
              alt="منصة الأعمال السعودية"
              width="80"
              height="80"
            />
            <p className="text-sm text-white">موثق لدى منصة الأعمال</p>
          </div>
        </div>

        <div className="border-t-2 border-white/40 border-dotted mt-10 py-6 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-4">
            <a
              href={MAILTO_URL}
              aria-label="راسلنا على البريد الإلكتروني"
              className="flex items-center gap-2 border border-white text-white text-sm px-5 py-2 hover:bg-white/10 transition"
            >
              <MdOutlineMailOutline aria-hidden="true" />
              البريد الإلكتروني
            </a>
            <a
              href={PHONE_TEL_URL}
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
            الحقوق محفوظة | {SITE_NAME} 2026
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            {/* ✅ width + height مضافين على الـ icons */}
            <img
              src={creditcard}
              className="h-6"
              alt="مدى"
              width="24"
              height="24"
            />
            <img src={visa} className="h-6" alt="Visa" width="24" height="24" />
            <img
              src={stcPay}
              className="h-6"
              alt="STC Pay"
              width="24"
              height="24"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
