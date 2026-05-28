import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import logo from "../../assets/logo.webp";
import useCartStore from "../../store/cartStore";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { POLICY_LINKS } from "../../constants/policyLinks";
import { SITE_NAME } from "../../constants/brand";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { label: "جميع العطور", path: "/Products" },
    { label: "البكجات", path: "/PackagePage" },
    { label: "آراء العملاء", path: "/", sectionId: "testimonials" },
    ...POLICY_LINKS,
  ];

  const handleNavClick = (link) => {
    setMenuOpen(false);

    if (link.sectionId) {
      if (location.pathname === "/") {
        document
          .getElementById(link.sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(link.sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between gap-4 px-3 h-[70px]">
        <div className="flex items-center gap-0">
          {/* ✅ aria-label مضاف */}
          <button
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>

          {/* ✅ width + height مضافين على الـ logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt={`شعار ${SITE_NAME}`}
              className="w-28 h-28 object-contain"
              width="112"
              height="112"
            />
          </Link>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center list-none">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link)}
                className="title-lg px-4 py-2 rounded-lg transition-all duration-200 relative group hover:bg-white"
              >
                {link.label}
                <span className="absolute bottom-1 right-1/2 translate-x-1/2 h-0.5 w-0 bg-black rounded-full transition-all duration-300 group-hover:w-3/5" />
              </button>
            </li>
          ))}
        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* ✅ aria-label مضاف */}
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-200"
            aria-label="بحث"
          >
            <FiSearch size={20} />
          </button>

          {/* ✅ aria-label مضاف */}
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-200"
            aria-label="حسابي"
          >
            <FiUser size={22} />
          </button>

          {/* ✅ aria-label مضاف */}
          <button
            onClick={() => navigate("/cart")}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-200"
            aria-label={`سلة التسوق${totalItems > 0 ? ` - ${totalItems} منتج` : ""}`}
          >
            <BsCart3 size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 icon rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-10/12 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {/* ✅ aria-label مضاف */}
          <button
            className="self-end mb-4"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <FiX size={24} />
          </button>

          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="text-black border-b text-base font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition text-right"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
