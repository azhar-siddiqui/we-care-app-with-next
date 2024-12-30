"use client";
import * as React from "react";

import { BrandLogo } from "@/components/common/BrandLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const headerElement = headerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => {
      if (headerElement) {
        observer.unobserve(headerElement);
      }
    };
  }, []);

  return (
    <>
      <nav className="w-full py-3 bg-primary flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-center text-primary-foreground text-xs md:text-sm px-4 font-medium">
          Start Your 5-Day Free Trial of Flabs Pathology Software Now!
        </p>
        <Button className="uppercase bg-primary-foreground text-primary text-xs h-8 hover:bg-none hover:text-primary-foreground hover:border">
          Start Now <ArrowRight className="size-4" />
        </Button>
      </nav>
      <div ref={headerRef} className="h-0"></div>
      <header
        className={`py-4 shadow-xl w-full z-10 bg-background/95 transition-all ${
          isSticky ? "fixed top-0" : "relative"
        }`}
      >
        <nav className="flex items-center gap-10 container font-semibold">
          <Link href="/" className="mr-auto">
            <BrandLogo />
          </Link>
          <div></div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="uppercase text-xs font-semibold leading-tight hover:bg-transparent"
            >
              Login
            </Button>
            <Button className="uppercase px-6 text-xs font-semibold">
              Start Free Trial
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
