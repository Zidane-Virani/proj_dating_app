import "./globals.css";
import { Metadata, Viewport } from "next";

import Providers from "../components/Providers";
import TopNav from "../components/navbar/TopNav";


export const metadata: Metadata = {
  title: "Hello World App",
  description: "My Next.js Hello World application",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main className="container mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
