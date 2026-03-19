import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ScheduleDemoPage from "./pages/ScheduleDemoPage";
import ContactUsPage from "./pages/ContactUsPage";
import ThankYouPage from "./pages/ThankYouPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/schedule-demo", Component: ScheduleDemoPage },
  { path: "/contact-us", Component: ContactUsPage },
  { path: "/thank-you", Component: ThankYouPage },
]);
