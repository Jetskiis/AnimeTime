import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const dynamicParams = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>AnimeTime</title>
      </head>
      <body>
        <div id="root">
          <Navbar/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
