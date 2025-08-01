import Navbar from "./components/section/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Outlet} from "react-router-dom";
function Layout() {
  const {authUser} = useAuthStore();
  const  logoText = "CodeTracker Pro"
 const  navLinks = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Submission", href: "/submission" },
    { text: "Extension", href: "/extension" }
    
  ]
  return (
    <div className=" min-h-full overflow-auto flex flex-col bg-[#150b2d] text-white ">
      <Navbar
        logoText={logoText}
        navLinks={navLinks}
        // onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        // isMobileMenuOpen={isMobileMenuOpen}
      />
      <main className="flex-1">
        <Outlet />  
      </main>
    </div>
  );
}   
export default Layout;