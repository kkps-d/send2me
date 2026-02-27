import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/testing/signalr")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Signalr test</h1>
    </div>
  );
}
