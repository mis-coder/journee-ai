import { Button } from "@/components/ui/button";
import BackgroundScene from "@/public/mountain-view.svg";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row-reverse items-center md:justify-center gap-10 md:gap-1">
      <div className="w-full md:w-1/2">
        <Image
          src={BackgroundScene}
          alt="mountain-river-scene"
          className="w-auto h-auto max-h-[85vh] object-center opacity-75"
        />
      </div>
      <div className="w-full md:w-1/2 md:pr-8 flex flex-col gap-12 md:gap-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold">Journee AI</h1>
          <p className="text-xs md:text-lg font-light">
            Meet Your Travel Assistant!
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-accent mt-4 text-center text-balance text-sm md:text-lg px-2 md:px-0 font-light">
            Tell us where you're going and we’ll build a custom itinerary and
            budget just for you.
          </p>
          <Button className="rounded-2xl px-10 py-5 cursor-pointer font-normal">
            <Link href="/chat">
              Let's Get Started <span>→</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
