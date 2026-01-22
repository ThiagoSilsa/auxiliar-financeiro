"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useTheme } from "next-themes";

const NAV_LINKS = [
  { href: "/estrato", label: "Estrato" },
  { href: "/contas", label: "Contas" },
  { href: "/caixinhas", label: "Caixinhas" },
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full shadow backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between sm:h-12 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Menu Lateral */}

          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-primary"
          >
            SolarCash
          </Link>
        </div>
        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" size="sm">
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
        <Sheet>
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
                  <Button variant="ghost" size="sm" className="w-xs mb-2">
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
