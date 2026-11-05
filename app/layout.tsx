import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/context/EventContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Campus Event Board",
    template: "%s | Campus Event Board",
  },
  description: "Discover, explore, and save campus events.",
  keywords: ["campus events", "student events", "tech", "sports", "faith", "social"],
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
