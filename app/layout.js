import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../Context/client-provider";
import Navbar from "../Components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Flypass",
    default: "Flypass", // a default is required when creating a template
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main className="flex min-h-screen max-w-screen flex-col justify-between">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
