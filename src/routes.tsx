import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Preloader from "./components/Preloader";

const GamePage = lazy(() => import("./pages/GamePage"));
const RulePage = lazy(() => import("./features/rule/pages/RulePage"));
const RuleDetailPage = lazy(
  () => import("./features/rule/pages/RuleDetailPage"),
);
const EventPage = lazy(() => import("./features/event/pages/EventPage"));
const EventDetailPage = lazy(
  () => import("./features/event/pages/EventDetailPage"),
);
const CodewordsPage = lazy(() => import("./pages/CodewordsPage"));
const MapPage = lazy(() => import("./pages/MapPage"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <GamePage /> },
      { path: "/rule", element: <RulePage /> },
      { path: "/rule/:tag", element: <RuleDetailPage /> },
      { path: "/event", element: <EventPage /> },
      { path: "/event/:tag", element: <EventDetailPage /> },
      { path: "/codewords", element: <CodewordsPage /> },
      { path: "/map", element: <MapPage /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<Preloader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
