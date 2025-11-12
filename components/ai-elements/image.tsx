import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Experimental_GeneratedImage } from "ai";

export type ImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
};

export const GeneratedImage = ({
  base64,
  mediaType,
  ...props
}: ImageProps) => (
  <Image
    {...props}
    alt={props.alt || ""}
    className={cn(
      "h-auto max-w-full overflow-hidden rounded-md",
      props.className
    )}
    src={`data:${mediaType};base64,${base64}`}
    width={0}
    height={0}
    sizes="100vw"
    style={{ width: '100%', height: 'auto' }}
  />
);
