import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Image
        className="object-cover max-h-screen object-center"
        src="/images/drop_x.png"
        layout="responsive"
        alt="Hannes standing in water. Ripples are forming around him."
        width={1024}
        height={852}
      />
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center">
        <div className="flex gap-4 p-8 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src="/logo.svg" aria-hidden className="w-10" />
          <h1 className="text-5xl text-white font-extralight">Hannes Diem</h1>
          <div className="w-10" />
        </div>
        <input
          type="text"
          placeholder="Search Archive..."
          className="px-3 py-2 rounded-md text-white bg-white bg-opacity-20 placeholder:text-white placeholder:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:bg-black focus:bg-opacity-20"
        />
      </div>
    </main>
  );
}
