import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      <main className="pb-150">{children}</main>
      <Footer />
    </div>
  );
}
