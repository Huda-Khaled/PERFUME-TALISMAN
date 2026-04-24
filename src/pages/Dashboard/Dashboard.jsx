// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { GiPerfumeBottle } from "react-icons/gi";
// import { authApi } from "../../api";
// import toast from "react-hot-toast";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     authApi
//       .checkAuth()
//       .then((r) => {
//         if (r.data.authenticated) navigate("/dashboard/products");
//       })
//       .catch(() => {});
//   }, []);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       toast.error("ادخل اليوزر والباسورد");
//       return;
//     }
//     setLoading(true);
//     try {
//       await authApi.login({ username, password });
//       toast.success("أهلاً بك! 👋");
//       navigate("/dashboard/products");
//     } catch {
//       toast.error("يوزر أو باسورد غلط");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen k flex items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md"
//       >
//         <div className="text-center mb-10">
//           <GiPerfumeBottle className="text-primary text-5xl mx-auto mb-4" />
//           <h1 className="font-serif text-3xl gold-text">Luxe Scents</h1>
//           <p className="text-white/30 text-sm mt-2">لوحة التحكم</p>
//         </div>

//         <div className="glass rounded-3xl p-8 space-y-4">
//           <div className="relative">
//             <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
//             <input
//               type="text"
//               placeholder="اسم المستخدم"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//               className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
//             />
//           </div>

//           <div className="relative">
//             <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="كلمة المرور"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//               className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
//             />
//             <button
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
//             >
//               {showPass ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>

//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="btn-primary w-full justify-center flex items-center gap-2 mt-2"
//           >
//             {loading ? (
//               <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "دخول"
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
