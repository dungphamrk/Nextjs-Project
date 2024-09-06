import Image from "next/image";
import SideNavbar from "./components/SideNavbar";
import BottomNavBar from "./components/BottomNavbar";
import TopNavBar from "./components/TopNavBar";

export default function Home() {
  return (
  <>
  <SideNavbar/>
  <BottomNavBar/>
  <TopNavBar/>
  </>
  );
}
