import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/context/EventContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Campus Hub",
    template: "%s | Campus Hub",
  },
  description: "Discover campus events and book rooms for study sessions, meetings, and collaborative work.",
  keywords: ["campus events", "campus rooms", "student events", "room booking"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <EventProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </EventProvider>
      </body>
    </html>
  );
}
