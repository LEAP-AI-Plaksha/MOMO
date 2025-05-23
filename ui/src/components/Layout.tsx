"use client"; // Required for `usePathname()`

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Upload, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./Button";

interface LayoutProps {
  children: ReactNode;
  userData: {
    isLoggedIn: boolean;
    userType?: "climber" | "artisan";
  };
}

function NavBarButtons(isLoggedIn: boolean, pathname: string) {
  if (isLoggedIn) {
    if (pathname.includes("/artisan")) {
      return (
        <>
          <Link href="/artisan/upload">
            <Button variant="primary" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Lecture
            </Button>
          </Link>
          <Link href="/artisan">
            <Button variant="secondary" size="sm">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Link>
        </>
      );
    } else if (pathname.includes("/climber")) {
      return (
        <>
          <Link href="/climber">
            <Button variant="secondary" size="sm">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Link>
        </>
      );
    }
  } else {
    return (
      <>
        <Link href="/signin">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </Link>
      </>
    );
  }
}

export default function Layout({ children, userData }: LayoutProps) {
  const pathname = usePathname();
  let isLoggedIn = false;
  let userType: "climber" | "artisan" | undefined;
  if (userData) {
    isLoggedIn = userData.isLoggedIn;
    userType = userData.userType;
  }
  // Determine the logo link based on user type
  const logoLink = isLoggedIn && userType ? `/${userType}` : "/";
  console.log("user type: ", userType, "logo link: ", logoLink);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={logoLink} className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MOMO</span>
          </Link>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            {NavBarButtons(isLoggedIn, pathname)}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}