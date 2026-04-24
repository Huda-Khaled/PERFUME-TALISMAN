import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { adminAuthApi } from "../../api/adminApi";
import DashboardLayout from "./DashboardLayout";
import Pageloader from "../../components/Pageloader/Pageloader";

export default function DashboardShell() {
  const { data: authenticated, isLoading } = useQuery({
    queryKey: ["adminAuth"],
    queryFn: async () => {
      const { data } = await adminAuthApi.checkAuth();
      return Boolean(data.authenticated);
    },
    staleTime: 1000 * 60,
    retry: false,
  });

  if (isLoading) {
    return <Pageloader variant="fullscreen" />;
  }

  if (!authenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
