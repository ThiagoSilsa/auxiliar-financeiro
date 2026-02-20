"use client";

// React
import { useState } from "react";

// Next
import Link from "next/link";

// icons
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { IoHomeOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { CiBank } from "react-icons/ci";
import { LuPiggyBank } from "react-icons/lu";

// Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

// Theme
import { useTheme } from "next-themes";

// Útil
import { cn } from "@/lib/utils";

// Links de navegação
const NAV_LINKS = [
  { href: "/home", label: "Home", icon: IoHomeOutline },
  { href: "/extrato", label: "Extrato", icon: RiBillLine },
  { href: "/contas", label: "Contas", icon: CiBank },
  { href: "/caixinhas", label: "Caixinhas", icon: LuPiggyBank },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [actualPage, setActualPage] = useState("/home");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handlePageChange = (href: string) => {
    setActualPage(href);
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between sm:h-12 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Menu Lateral */}

          <Link
            href="/home"
            className="font-bold text-xl tracking-tight text-primary"
          >
            SolarCash
          </Link>
        </div>
        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={
                  actualPage === link.href ? "bg-primary text-white" : ""
                }
                onClick={() => setActualPage(link.href)}
              >
                {link.icon && <link.icon className="size-4 mr-2" />}
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <MoonIcon className="size-5" />
            ) : (
              <SunIcon className="size-5" />
            )}
          </Button>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
          <SheetTrigger className="sm:hidden">
            <MenuIcon className="p-0.5 rounded cursor-pointer hover:bg-primary/80 hover:text-white dark:hover:bg-primary/50 text-chart-5 " />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <Link
                href="/"
                className="font-bold text-xl tracking-tight text-primary w-fit"
              >
                SolarCash
              </Link>
            </SheetHeader>
            <div className="flex flex-col mt-4 w-full items-center">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start mb-2",
                      actualPage === link.href ? "bg-primary text-white" : "",
                    )}
                    onClick={() => handlePageChange(link.href)}
                  >
                    {link.icon && <link.icon className="size-4 mr-2" />}
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="sm:inline-flex"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <MoonIcon className="size-5" />
                ) : (
                  <SunIcon className="size-5" />
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
