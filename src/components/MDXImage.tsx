import Image from 'next/image';

interface MDXImageProps {
  src: string;
  alt: string;
}

export function MDXImage({ src, alt }: MDXImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg my-8"
    />
  );
} 