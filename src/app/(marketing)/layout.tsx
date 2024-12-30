import { ReactNode } from "react";
import NavBar from "./_components/NavBar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
