import "./globals.css";
import { Josefin_Sans } from "next/font/google";

const font = Josefin_Sans({
  subsets: ["latin"],
  variable: "--main-font",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
