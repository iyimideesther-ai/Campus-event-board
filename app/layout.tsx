import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/context/EventContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Campus Room Booking",
    template: "%s | Campus Room Booking",
  },
  description: "Find and book campus rooms for study sessions, team meetings, and collaborative work.",
  keywords: ["campus rooms", "study room booking", "room reservations", "meeting spaces"],
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
