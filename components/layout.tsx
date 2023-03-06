import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex flex-col min-h-screen px-0 ">
      <Header />
      <main className="flex-1 top-0 px-1 flex flex-col max-h-[calc(100%-50px)] pt-2 pl-2 pr-2 bg-grey-100  relative">
        {children}
      </main>
    </div>
  );
}
