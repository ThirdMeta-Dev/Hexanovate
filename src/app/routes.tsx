import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ScheduleDemoPage from "./pages/ScheduleDemoPage";
import ContactUsPage from "./pages/ContactUsPage";
import ThankYouPage from "./pages/ThankYouPage";
import AboutUsPage from "./pages/AboutUsPage";
import LeadershipTeamPage from "./pages/LeadershipTeamPage";
import LoginPage from "../admin/pages/LoginPage";
import AdminApp from "../admin/AdminApp";

export const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────────────────────
  { path: "/", Component: HomePage },
  { path: "/about-us", Component: AboutUsPage },
  { path: "/leadership-and-team", Component: LeadershipTeamPage },
  { path: "/schedule-demo", Component: ScheduleDemoPage },
  { path: "/contact-us", Component: ContactUsPage },
  { path: "/thank-you", Component: ThankYouPage },

  // ── Admin routes (not indexed, auth-gated) ────────────────────────────────
  { path: "/admin/login", Component: LoginPage },
  { path: "/admin", Component: AdminApp },
]);
