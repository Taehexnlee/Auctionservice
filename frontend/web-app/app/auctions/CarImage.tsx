"use client";
import Image from "next/image";
import { use, useState } from "react";

type Props = {
    imageUrl: string
}
export default function CarImage({ imageUrl }: Props) {
    const [loading, setLoading] = useState(true);
    return (
        <Image
            src={imageUrl}
            alt="Image"
            fill
            className=
            {
                `
                object-cover duration-700 ease-in-out
                ${loading ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
                `
            }
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onLoad={() => setLoading(false)}
        />
    )
}