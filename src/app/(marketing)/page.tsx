import { Button } from "@/components/ui/button";
import Footer from "./_components/Footer";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-4xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Transform your lab with We Care Pathology software!
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Start Your 5-Day Free Trial of Our Pathology Lab Software Today, Just
          by Entering Your Name and Phone Number Below!
        </p>
        <Button className="w-full text-lg p-6 flex gap-2 max-w-xs">
          Get started for free
          <ArrowRightIcon className="size-4" />
        </Button>

        <Button
          variant="outline"
          className="w-full text-lg p-6 flex gap-2 max-w-xs border-primary text-primary hover:text-primary bg-transparent hover:bg-transparent"
        >
          Book Demo
        </Button>
      </section>
      <Footer />
    </>
  );
}
