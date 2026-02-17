"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navbar component for Aaron Kirman Group.
 * Features:
 * - Transparent background initially, solid black on scroll.
 * - Centered logo (switches based on scroll/theme).
 * - Left-aligned navigation links with dropdowns.
 * - Right-aligned Contact and Search buttons.
 * - Mobile-responsive hamburger menu.
 */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "About",
      children: [
        { label: "Aaron Kirman", href: "/about" },
        { label: "Aaron Kirman Group", href: "/team" },
        {
          label: "Christie’s International Real Estate | Southern California",
          href: "/about/christies-international-real-estate-so-cal",
        },
        { label: "Our Partners", href: "/about/partners/" },
        { label: "Crypto Real Estate", href: "/crypto-real-estate" },
      ],
    },
    {
      label: "Listings",
      children: [
        { label: "Exclusive Listings", href: "/exclusive-listings" },
        { label: "Sold Listings", href: "/sold-listings" },
        { label: "Exclusive Lease Listings", href: "/exclusive-lease-listings/" },
        { label: "Pre-Market Listings", href: "/pre-market/" },
        { label: "Communities", href: "/neighborhoods" },
        { label: "International Listings", href: "/international-listings" },
      ],
    },
    {
      label: "Media",
      children: [
        { label: "Print Media", href: "/media/print-media/" },
        { label: "Listing Impossible", href: "/media/listing-impossible/" },
        { label: "TV / Video", href: "/media/tv-video/" },
      ],
    },
  ];

  const rightNavItems = [
    { label: "Contact", href: "#contact" },
    { label: "Search", href: "/search", icon: true },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-[6%] py-6",
          isScrolled ? "bg-black py-4 shadow-xl" : "bg-transparent"
        )}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Left Navigation (Desktop) */}
          <ul className="hidden lg:flex items-center gap-10 flex-1">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    "text-[15px] font-body tracking-wider uppercase transition-colors duration-300",
                    isScrolled ? "text-white hover:text-accent" : "text-white hover:text-accent"
                  )}
                >
                  {item.label}
                </button>

                {/* Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 pt-6 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                    "min-w-[280px]"
                  )}
                >
                  <ul className="bg-black border border-white/10 py-6 px-8 flex flex-col gap-4 shadow-2xl">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          className="text-[13px] text-white/70 hover:text-white font-body tracking-wide transition-colors whitespace-nowrap block"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Centered Logo */}
          <div className="flex-shrink-0 px-8">
            <a href="/" className="block">
              {/* Using the light logo (white text) by default for both states since it's on dark/transparent-on-video background */}
              <Image
                src="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=1280/https://media-production.lp-cdn.com/media/54898a0b-3ff6-46f8-a545-5031b5fe9c5b"
                alt="Aaron Kirman Group Logo"
                width={180}
                height={40}
                priority
                className="h-auto w-[140px] md:w-[180px] object-contain"
              />
            </a>
          </div>

          {/* Right Navigation (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
            <ul className="flex items-center gap-10">
              {rightNavItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "text-[15px] font-body tracking-wider uppercase flex items-center gap-2 transition-colors duration-300",
                      isScrolled ? "text-white hover:text-accent" : "text-white hover:text-accent"
                    )}
                  >
                    {item.label}
                    {item.icon && <Search className="w-4 h-4" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black transition-transform duration-500 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <X className="w-10 h-10 stroke-1" />
            </button>
          </div>

          <div className="flex flex-col gap-8 overflow-y-auto pb-12">
            {[...navItems, ...rightNavItems].map((item) => (
              <div key={item.label} className="flex flex-col">
                {('children' in item) ? (
                  <>
                    <span className="text-accent text-[12px] font-bold uppercase tracking-[0.2em] mb-4">
                      {item.label}
                    </span>
                    <ul className="flex flex-col gap-4 pl-0">
                      {(item.children as any[]).map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="text-white text-2xl font-serif hover:text-accent transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="text-white text-4xl font-serif hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Contact</p>
              <p className="text-white text-lg">Aaron Kirman | CA DRE #01296524</p>
              <a href="tel:4242497162" className="text-white text-lg hover:text-accent transition-colors">
                (424) 249-7162
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Office</p>
                <p className="text-white text-lg leading-relaxed">
                    433 N Camden Dr #600<br />
                    Beverly Hills, CA 90210
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;