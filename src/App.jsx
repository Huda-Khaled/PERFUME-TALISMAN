import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import Pageloader from "./components/Pageloader/Pageloader";

// Lazy load — user pages
const Home = lazy(() => import("./pages/Home/Home"));
const ProductsPage = lazy(() => import("./pages/Products/ProductPage"));
const PackagePage = lazy(() => import("./pages/Packages/PackagePage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout/CheckoutPage"));
const PrivacyPolicyPage = lazy(
  () => import("./pages/Policies/PrivacyPolicyPage"),
);
const ShippingPolicyPage = lazy(
  () => import("./pages/Policies/ShippingPolicyPage"),
);
const RefundPolicyPage = lazy(
  () => import("./pages/Policies/RefundPolicyPage"),
);
const TermsOfServicePage = lazy(
  () => import("./pages/Policies/TermsOfServicePage"),
);

// Lazy load — dashboard pages
const DashboardShell = lazy(() => import("./pages/Dashboard/DashboardShell"));
const DashboardLogin = lazy(() => import("./pages/Dashboard/DashboardLogin"));
const DashboardOverview = lazy(
  () => import("./pages/Dashboard/DashboardOverview"),
);
const DashboardProducts = lazy(
  () => import("./pages/Dashboard/DashboardProducts"),
);
const DashboardOrders = lazy(() => import("./pages/Dashboard/DashboardOrders"));
const DashboardPackages = lazy(
  () => import("./pages/Dashboard/DashboardPackages"),
);

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
        <Suspense fallback={<Pageloader variant="inline" />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="PackagePage" element={<PackagePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="policies/privacy-policy"
                element={<PrivacyPolicyPage />}
              />
              <Route
                path="policies/shipping-policy"
                element={<ShippingPolicyPage />}
              />
              <Route
                path="policies/refund-policy"
                element={<RefundPolicyPage />}
              />
              <Route
                path="policies/terms-of-service"
                element={<TermsOfServicePage />}
              />
            </Route>
            <Route path="/dashboard/login" element={<DashboardLogin />} />
            <Route path="/dashboard" element={<DashboardShell />}>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="packages" element={<DashboardPackages />} />
              <Route path="orders" element={<DashboardOrders />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
