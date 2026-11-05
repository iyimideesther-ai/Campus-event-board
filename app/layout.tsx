import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/context/EventContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Campus Event Board",
  description: "Discover and save campus events",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <EventProvider>
          <Navbar />
          {children}
        </EventProvider>
      </body>
    </html>
  );
}
