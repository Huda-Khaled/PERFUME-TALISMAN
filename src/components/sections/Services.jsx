import { useState } from "react";
import { WHATSAPP_URL } from "../../constants/contact";
import {
  MdLocalShipping,
  MdSupportAgent,
  MdVerified,
  MdInventory2,
} from "react-icons/md";
import {
  BsCheckCircleFill,
  BsShieldFillCheck,
  BsArrowReturnLeft,
  BsStarFill,
} from "react-icons/bs";

const GoldDivider = () => (
  <div className="mx-auto mt-3 bg-brand-light w-[100px] h-[3px]" />
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-10 md:mb-16">
    <h2 className="text-2xl md:text-3xl font-bold text-brand mb-2">{title}</h2>
    <GoldDivider />
    {subtitle && (
      <p className="text-sm md:text-lg max-w-xl mx-auto leading-relaxed mt-4 px-2">
        {subtitle}
      </p>
    )}
  </div>
);

const services = [
  {
    icon: <MdLocalShipping size={22} />,
    title: "الشحن السريع والموثوق",
    desc: "نوصل عطرك الفاخر إلى باب منزلك بكل عناية واحترافية، مع تغليف مُحكم يليق بقيمة الهدية.",
  },
  {
    icon: <MdVerified size={22} />,
    title: "عطور أصلية 100٪",
    desc: "كل قطرة أصالة وفخامة — نستورد مباشرة من الدور العالمية الكبرى مع ضمان الأصالة التام.",
  },
  {
    icon: <MdSupportAgent size={22} />,
    title: "خدمة عملاء متميزة",
    desc: "فريقنا المتخصص في خدمتك على مدار الساعة، لأنك تستحق تجربة تسوق استثنائية في كل لحظة.",
  },
  {
    icon: <MdInventory2 size={22} />,
    title: "تغليف فاخر حصري",
    desc: "تُقدَّم عطورنا في صناديق هدايا فاخرة مصمَّمة بأناقة، تجعل كل مناسبة لحظة لا تُنسى.",
  },
];

const ServiceCard = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-5 md:p-8 h-full flex flex-col items-center text-center transition-all duration-500 bg-black text-white overflow-hidden"
    >
      <div
        className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 flex-shrink-0"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(212,172,100,0.22), rgba(180,140,60,0.08))"
            : "linear-gradient(135deg, rgba(212,172,100,0.12), rgba(180,140,60,0.04))",
          border: "1px solid rgba(212,172,100,0.35)",
          color: "#D4AC64",
          boxShadow: hovered ? "0 0 24px rgba(212,172,100,0.25)" : "none",
        }}
      >
        {icon}
      </div>

      <div
        className="h-px mb-3 md:mb-5 transition-all duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AC64, transparent)",
          opacity: hovered ? 1 : 0.45,
          width: hovered ? "3rem" : "2rem",
        }}
      />

      <h3 className="text-white text-sm md:text-xl mb-2 md:mb-3 font-light leading-snug">
        {title}
      </h3>
      <p className="text-white text-xs md:text-sm leading-relaxed font-light">
        {desc}
      </p>

      <div
        className="absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-500"
        style={{
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, transparent, #D4AC64, transparent)",
          width: hovered ? "60%" : "0%",
        }}
      />
    </div>
  );
};

const returnItems = [
  {
    icon: <BsArrowReturnLeft size={18} />,
    title: "سياسة إرجاع مرنة خلال ٣ أيام",
    desc: "نمنحك حرية الإرجاع خلال ثلاثة أيام كاملة من تاريخ الاستلام، لأن رضاك هو أولويتنا القصوى.",
  },
  {
    icon: <BsShieldFillCheck size={18} />,
    title: "عملية إرجاع سهلة وسريعة",
    desc: "تواصل معنا وسنتولى كل التفاصيل نيابةً عنك — خطوات بسيطة وإجراءات شفافة وخالية من التعقيد.",
  },
  {
    icon: <BsStarFill size={18} />,
    title: "ضمان رضا العميل",
    desc: "نؤمن بأن كل عميل يستحق تجربة استثنائية، لذا نلتزم بإيجاد الحل المثالي لك في كل الأحوال.",
  },
];

const ReturnItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 md:gap-5 items-start group">
    <div
      className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center mt-1 transition-all duration-300 group-hover:scale-110"
      style={{
        background: "linear-gradient(135deg, rgba(212,172,100,0.15), rgba(180,140,60,0.06))",
        border: "1px solid rgba(212,172,100,0.3)",
        color: "#D4AC64",
      }}
    >
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-base md:text-lg font-light mb-1">{title}</h4>
      <p className="text-xs md:text-sm leading-relaxed font-light">{desc}</p>
    </div>
  </div>
);

export default function Services() {
  return (
    <div>
      {/* ── SERVICES ── */}
      <section
        id="our-services"
        className="relative py-8 px-4 md:px-12 lg:px-20 md:py-10 scroll-mt-24"
      >
        <div className="relative max-w-7xl mx-auto">
          <SectionHeading
            title="خدماتنا"
            subtitle="في عالم العطور الراقية، كل تفصيلة تُحدث فارقًا — نحن نُقدّم ما هو أبعد من مجرد عطر، بل تجربة متكاملة تُرضي أكثر الأذواق رُقيًّا."
          />

          {/* 2 cols mobile → 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RETURN POLICY ── */}
      <section
        id="return-policy"
        className="relative px-4 md:px-12 lg:px-20 py-10 md:py-10 scroll-mt-24"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(180,140,60,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <SectionHeading
            title="سياسة الإرجاع"
            subtitle="نُقدّر ثقتك الغالية، لذلك وضعنا سياسة إرجاع واضحة وعادلة تضمن لك تجربة شراء مريحة وخالية من أي قلق."
          />

          <div className="flex flex-col md:grid md:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Return items list */}
            <div className="w-full md:col-span-3 space-y-6 md:space-y-8">
              {returnItems.map((item, i) => (
                <ReturnItem key={i} {...item} />
              ))}
            </div>

            {/* Guarantee card */}
            <div className="w-full md:col-span-2 flex justify-center md:justify-end">
              <div
                className="relative rounded-3xl p-7 md:p-10 text-center w-full"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(30,23,12,0.98) 0%, rgba(18,14,8,1) 100%)",
                  border: "1px solid rgba(212,172,100,0.28)",
                  boxShadow:
                    "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,172,100,0.12)",
                  maxWidth: "320px",
                }}
              >
                {[
                  "top-0 left-0 border-t border-l",
                  "top-0 right-0 border-t border-r",
                  "bottom-0 left-0 border-b border-l",
                  "bottom-0 right-0 border-b border-r",
                ].map((cls, i) => (
                  <span
                    key={i}
                    className={`absolute w-5 h-5 md:w-6 md:h-6 ${cls} rounded-sm`}
                    style={{ borderColor: "rgba(212,172,100,0.5)" }}
                  />
                ))}

                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,172,100,0.14), rgba(180,140,60,0.05))",
                    border: "1px solid rgba(212,172,100,0.4)",
                    boxShadow: "0 0 40px rgba(180,140,60,0.15)",
                  }}
                >
                  <BsCheckCircleFill size={34} style={{ color: "#D4AC64" }} />
                </div>

                <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">
                  ضمان مُعتمد
                </p>
                <h3 className="text-white text-3xl font-light mb-1">٣ أيام</h3>
                <p className="text-white text-sm mb-4">سياسة إرجاع مريحة وشاملة</p>

                <p
                  className="text-white text-xs md:text-sm leading-relaxed font-light"
                  style={{ direction: "rtl", lineHeight: "1.9" }}
                >
                  رضاك التام هو معيار نجاحنا الأول والأخير. نعمل بلا كلل لنضمن
                  أن كل تجربة تسوق معنا تُرتسم في ذاكرتك بابتسامة رضا.
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 md:mt-8 w-full py-3 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 inline-block text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,172,100,0.18), rgba(180,140,60,0.08))",
                    border: "1px solid rgba(212,172,100,0.45)",
                    color: "#D4AC64",
                    boxShadow: "0 4px 20px rgba(180,140,60,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(212,172,100,0.28), rgba(180,140,60,0.15))";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(180,140,60,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(212,172,100,0.18), rgba(180,140,60,0.08))";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(180,140,60,0.1)";
                  }}
                >
                  تواصل معنا الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center py-8 border-t"
        style={{ borderColor: "rgba(212,172,100,0.12)" }}
      />
    </div>
  );
}