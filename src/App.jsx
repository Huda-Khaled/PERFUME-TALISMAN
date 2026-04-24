import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import DashboardShell from "./pages/Dashboard/DashboardShell";
import DashboardLogin from "./pages/Dashboard/DashboardLogin";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import DashboardProducts from "./pages/Dashboard/DashboardProducts";
import DashboardOrders from "./pages/Dashboard/DashboardOrders";
import DashboardPackages from "./pages/Dashboard/DashboardPackages";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ToastContainer from "./components/ToastContainer/ToastContainer"; 
// Lazy load pages (Suspense lives in Layout around Outlet)
const Home = lazy(() => import("./pages/Home/Home"));
const ProductsPage = lazy(() => import("./pages/Products/ProductPage"));
const PackagePage = lazy(() => import("./pages/Packages/PackagePage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="PackagePage" element={<PackagePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/dashboard/login" element={<DashboardLogin />} />
          <Route path="/dashboard" element={<DashboardShell />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="packages" element={<DashboardPackages />} />
            <Route path="orders" element={<DashboardOrders />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
