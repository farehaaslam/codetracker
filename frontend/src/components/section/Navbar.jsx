
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { BarChart3 } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
const Navbar = ({ logoText, navLinks, onMenuToggle, isMobileMenuOpen }) => {
    const{authUser,logout}=useAuthStore()
  
  return (
    <nav className="relative z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">{logoText}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
          
            <Button variant="ghost" size="sm" className="text-white  hover:text-indigo-600" onClick={logout}>
              Logout
            </Button>
             
            
          </div>

          {/* Mobile Menu Button */}
          {/* <button
            onClick={onMenuToggle}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </div>

        {/* Mobile Menu */}
        
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.text}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <Link to='/signin'>
                <Button variant="ghost" size="sm" className="w-full justify-start" >Login</Button>
                </Link>
                
                 
              </div>
            </div>
          </div>
        
      </div>
    </nav>
  );
};
export default Navbar;
