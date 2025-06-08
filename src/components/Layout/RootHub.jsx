import { Outlet } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";
import FooterBlock from "../FooterBlock/FooterBlock";

export default function RootHub() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <FooterBlock />
    </div>
  );
}
