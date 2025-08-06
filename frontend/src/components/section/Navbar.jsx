import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { BarChart3, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-500 hover:text-foreground transition-colors font-medium'
      : 'hover:text-indigo-500 transition-colors text-muted-foreground hover:text-foreground transition-colors font-medium';

  return (
    <nav className="relative z-50 w-full via-background  dark:from-indigo-950/20 dark:via-background dark:to-violet-950/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">CodeTracker Pro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 text-muted-foreground font-medium">
              {authUser ? (
                <>
                  <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
                  <li><NavLink to="/submission" className={linkClass}>Submission</NavLink></li>
                  <li><NavLink to="/extension" className={linkClass}>Extension</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                  <li><NavLink to="/feature" className={linkClass}>Feature</NavLink></li>
                  <li><NavLink to="/extension" className={linkClass}>Extension</NavLink></li>
                </>
              )}
            </ul>
          </div>

          {/* Desktop Auth */}
          {authUser ? (
            <div className="hidden md:flex items-center">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={authUser.profilepic || "/avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li><NavLink to="/profile" className={linkClass}>Profile</NavLink></li>
                  <li><button  className="" onClick={logout}>Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-border px-5">
              <NavLink to="/signin">
                <Button size="sm" className="w-full justify-start">Login</Button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <ul className="flex flex-col space-y-2 text-muted-foreground font-medium">
              {authUser ? (
                <>
                  <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
                  <li><NavLink to="/submission" className={linkClass}>Submission</NavLink></li>
                  <li><NavLink to="/extension" className={linkClass}>Extension</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                  <li><NavLink to="/feature" className={linkClass}>Feature</NavLink></li>
                  <li><NavLink to="/extension" className={linkClass}>Extension</NavLink></li>
                </>
              )}
            </ul>

            {/* Mobile Logout */}
            {authUser && (
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
