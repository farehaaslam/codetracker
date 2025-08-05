import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Chrome, Target, BarChart3, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/section/Navbar';
import Features from './Features';
// Utility function
const utils = {
  cn: (...classes) => {
    return classes.filter(Boolean).join(' ');
  }
};

// Glow Component
const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Glow = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(glowVariants({ variant }), className)}
      {...props}
    >
      <div
        className={cn(
          "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(239_84%_67%/.5)_10%,_hsl(239_84%_67%/0)_60%)] sm:h-[512px]",
          variant === "center" && "-translate-y-1/2",
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(239_84%_67%/.3)_10%,_hsl(239_84%_67%/0)_60%)] sm:h-[256px]",
          variant === "center" && "-translate-y-1/2",
        )}
      />
    </div>
  )
);
Glow.displayName = "Glow";

// Mockup Components
const mockupVariants = cva(
  "flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15",
  {
    variants: {
      type: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-md",
      },
    },
    defaultVariants: {
      type: "responsive",
    },
  },
);

const Mockup = React.forwardRef(
  ({ className, type, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mockupVariants({ type, className }))}
      {...props}
    />
  ),
);
Mockup.displayName = "Mockup";

const frameVariants = cva(
  "bg-accent/5 flex relative z-10 overflow-hidden rounded-2xl",
  {
    variants: {
      size: {
        small: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

const MockupFrame = React.forwardRef(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(frameVariants({ size, className }))}
      {...props}
    />
  ),
);
MockupFrame.displayName = "MockupFrame";

//   return (
//     <nav className="relative z-50 w-full">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
//               <BarChart3 className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-foreground">{logoText}</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.href}
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium"
//               >
//                 {link.text}
//               </a>
//             ))}
//           </div>

//           {/* Desktop Auth */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to='/signin'> 
//             <Button variant="ghost" size="sm" className="text-white  hover:text-indigo-600" >
//               Login
//             </Button>
//              </Link>
            
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={onMenuToggle}
//             className="md:hidden p-2 text-muted-foreground hover:text-foreground"
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
//             <div className="px-6 py-4 space-y-4">
//               {navLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.href}
//                   className="block text-muted-foreground hover:text-foreground transition-colors font-medium"
//                 >
//                   {link.text}
//                 </a>
//               ))}
//               <div className="pt-4 border-t border-border">
//                 <Link to='/signin'>
//                 <Button variant="ghost" size="sm" className="w-full justify-start" >Login</Button>
//                 </Link>
                
                 
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// Dashboard Mockup Component
const DashboardMockup = () => {
  return (
    <div className="bg-background rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-xs text-muted-foreground">CodeTracker Pro Dashboard</div>
        <div className="w-16"></div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 p-4 rounded-lg border border-indigo-200/20">
            <div className="text-2xl font-bold text-indigo-600">47</div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-lg border border-green-200/20">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 p-4 rounded-lg border border-violet-200/20">
            <div className="text-2xl font-bold text-violet-600">3</div>
            <div className="text-xs text-muted-foreground">Platforms</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-muted/20 p-4 rounded-lg border border-border">
          <div className="text-sm font-medium mb-3">Weekly Progress</div>
          <div className="flex items-end space-x-2 h-20">
            {[40, 65, 30, 80, 55, 90, 70].map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-sm flex-1"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Recent Submissions</div>
          {[
            { platform: "LeetCode", problem: "Two Sum", status: "Accepted" },
            { platform: "Codeforces", problem: "A+B Problem", status: "Accepted" },
            { platform: "LeetCode", problem: "Valid Parentheses", status: "Accepted" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">{item.problem}</div>
                  <div className="text-xs text-muted-foreground">{item.platform}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-200">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Extension Mockup Component
const ExtensionMockup = () => {
  return (
    <div className="bg-background rounded-lg border border-border overflow-hidden shadow-lg max-w-sm">
      {/* Extension Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 text-white">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span className="font-semibold text-sm">CodeTracker Pro</span>
        </div>
      </div>

      {/* Extension Content */}
      <div className="p-4 space-y-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">Problem Solved! 🎉</div>
          <div className="text-sm text-muted-foreground">Two Sum - Easy</div>
        </div>

        <div className="bg-muted/20 p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-2">Today's Progress</div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-xs font-medium">3/5</span>
          </div>
        </div>

        <Button size="sm" className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700">
          View Dashboard
        </Button>
      </div>
    </div>
  );
};

// Main Hero Component
const CodeTrackerHero = ({
  logoText = "CodeTracker Pro",
  navLinks = [
    { text: "Features", href: "#features" },
    { text: "About", href: "#about" },
    { text: "Extension", href: "#extension" },
  ],
  headline = "Stay Consistent. Track Your Coding Journey, Automatically.",
  subheadline = "CodeTracker Pro helps you set daily goals and auto-track submissions from platforms like LeetCode — so you can stay accountable.",
  primaryCtaText = "Get Started ",
  primaryCtaLink = "/signup",
  secondaryCtaText = "Download Extension",
  secondaryCtaLink = "https://chrome.google.com/webstore",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen  overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br  z-0" />
      
      <div className="relative z-10 pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-4 py-2 text-sm border border-indigo-200 dark:border-indigo-800">
              <Target className="mr-2 h-4 w-4 text-indigo-600" />
              <span className="text-indigo-700 dark:text-indigo-300">Goal Tracking & Browser Extension</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {headline}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"> 
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg"
                asChild
              >
                <Link to="/signup">
                  <Play className="mr-2 h-5 w-5" />
                  Getting Started
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50"
                asChild
              >
                <a href={secondaryCtaLink}>
                  <Chrome className="mr-2 h-5 w-5" />
                  {secondaryCtaText}
                </a>
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-white/5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-2">Goal Tracking</h3>
                  <p className="text-sm text-muted-foreground">Set your daily coding goal and get reminded to complete it.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-white/5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Chrome className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-2">Browser Extension</h3>
                  <p className="text-sm text-muted-foreground">Automatically log your submissions using our Chrome extension.</p>
                </div>
              </div>
            </div>

            {/* Mockup Section */}
            <div className="relative">
              <MockupFrame size="large" className="mx-auto max-w-6xl">
                <Mockup type="responsive" className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20">
                    {/* Dashboard takes 2 columns */}
                    <div className="lg:col-span-2">
                      <DashboardMockup />
                    </div>
                    {/* Extension takes 1 column */}
                    <div className="flex justify-center lg:justify-start">
                      <ExtensionMockup />
                    </div>
                  </div>
                </Mockup>
              </MockupFrame>

              {/* Background Glow */}
              {/* <Glow variant="center" className="opacity-60" /> */}
            </div>
          </div>
        </div>
      </div>
      <Features className=" relative z-10"/>
    </div>
  );
};

export default CodeTrackerHero;
