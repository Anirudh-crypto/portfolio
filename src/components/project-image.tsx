import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

/**
 * Project images come from the admin form, so the host is not known ahead of
 * time. Locally-hosted paths go through `next/image` for optimisation; remote
 * URLs render as a plain lazy `<img>` rather than forcing a wildcard entry in
 * `images.remotePatterns`, which would turn the site into an open image proxy.
 */
export const ProjectImage = ({ src, alt, sizes, className }: ProjectImageProps) => {
  const isLocal = src.startsWith("/");

  if (isLocal) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
};
