import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

export default function ServiceGallery({ images, title }: { images: StaticImageData[]; title: string }) {
  const t = useTranslations("services");
  if (images.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, i) => (
        <li key={img.src} className="overflow-hidden rounded-xl border border-primary/10 bg-white">
          <Image
            src={img}
            alt={t("galleryAlt", { title, number: i + 1 })}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover object-top"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
