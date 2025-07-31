import NavBar from "./components/section/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Outlet} from "react-router-dom";
function Layout() {
  const {authUser} = useAuthStore();
  return (
    <div className=" min-h-full overflow-auto flex flex-col bg-[#150b2d] text-white ">
      <NavBar />
      <main className="flex-1">
        <Outlet />  
      </main>
    </div>
  );
}   
export default Layout;