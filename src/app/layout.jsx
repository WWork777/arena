import Header from "@/components/Header/Header";
import "./globals.css";
import Contacts from "@/components/Contacts/Contacts";
import Reviews from "@/components/Reviews/Reviews";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-32x32.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Reviews />
        {/* <Contacts /> */}
        <Footer />
      </body>
    </html>
  );
}
