import Image from "next/image";

export default function FeatureBlockSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto  flex flex-col items-center gap-16 px-6">
        {/* Top content: title & description side by side */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <h2 className="text-4xl font-medium lg:text-5xl max-w-xl">
            Syncing wearables, we empower smarter health decisions
          </h2>
          <p className="text-muted-foreground max-w-md">
            Your health data lives everywhere: on your smartwatch, fitness tracker,
            heart rate monitor, and beyond. We bring it all together in one seamless
            experience, syncing across leading wearables to give you a complete
            picture of your well-being. No more juggling apps—just clear, connected
            insights you can act on.
          </p>
        </div>

        {/* Bottom content: logo grid */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-start w-full">
          {[
            { src: "/AppleWatchLogoFull.svg", alt: "Apple Watch" },
            { src: "/GarminLogoFull.svg", alt: "Garmin" },
            { src: "/OuraLogoFull.svg", alt: "Oura Ring" },
            { src: "/WhoopLogoFull.svg", alt: "Whoop" },
          ].map((logo, index) => (
            <div key={index} className="p-10 rounded-lg items-center flex justify-center bg-muted ">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
