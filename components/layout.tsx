import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import styles from "../pages/index.module.css";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen   px-0 bg-slate-800">
      <Header />
      <main
        className={`flex-1 top-0 px-1 flex flex-col pl-0 pr-0   relative  ${styles.dailies} `}
      >
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}
