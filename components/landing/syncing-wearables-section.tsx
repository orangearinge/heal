import Image from "next/image";

export default function SyncWearablesSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto  flex flex-col items-center gap-16 px-6">
        {/* Top content: title & description side by side */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <h2 className="text-4xl font-normal lg:text-3xl max-w-xl">
            Menyinkronkan perangkat wearable, {" "}
            <span className="text-muted-foreground">kami membantu Anda membuat keputusan kesehatan yang lebih cerdas.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Data kesehatan Anda dari Apple Watch, Garmin, Oura Ring, dan Whoop kini terhubung dalam satu tempat. Heal menyatukannya untuk memberi Anda gambaran lengkap tentang tubuh dan kesejahteraan, sehingga setiap keputusan kesehatan bisa diambil dengan lebih mudah dan tepat.
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
