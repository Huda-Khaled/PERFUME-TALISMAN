import logo from "../../assets/logo.webp";

export default function Pageloader({ variant = "fullscreen" }) {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center min-h-[40vh] w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <img
          src={logo}
          alt="loading"
          width={80}
          height={63}
          className="animate-pulse"
        />
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
