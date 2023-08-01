import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Pokedex",
  description: "React pokedex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} text-black bg-slate-800 py-4 pb-8`}
      >
        {children}
      </body>
    </html>
  );
}
