import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Preloader from "./components/Preloader";

const GamePage = lazy(() => import("./pages/GamePage"));
const RulePage = lazy(() => import("./features/rule/pages/RulePage"));
const RuleDetailPage = lazy(
  () => import("./features/rule/pages/RuleDetailPage"),
);
const EventDetailPage = lazy(
  () => import("./features/event/pages/EventDetailPage"),
);
const CombatPage = lazy(() => import("./pages/CombatPage"));
const CodewordsPage = lazy(() => import("./pages/CodewordsPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const MapPage = lazy(() => import("./pages/MapPage"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <GamePage /> },
      { path: "/rule", element: <RulePage /> },
      { path: "/rule/:tag", element: <RuleDetailPage /> },
      { path: "/event/:tag", element: <EventDetailPage /> },
      { path: "/combat", element: <CombatPage /> },
      { path: "/codewords", element: <CodewordsPage /> },
      { path: "/history", element: <HistoryPage /> },
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
