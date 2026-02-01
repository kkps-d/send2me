import { createFileRoute } from "@tanstack/react-router";
import { Login } from "../pages/login/Login";
import { AuthProvider } from "../contexts/AuthProvider";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
