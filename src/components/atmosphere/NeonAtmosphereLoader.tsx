"use client";

import dynamic from "next/dynamic";

/**
 * Client-side loader that dynamic-imports the canvas atmosphere with
 * ssr:false. Keeps the heavy RAF + Canvas 2D code out of the initial
 * SSR payload and lets it stream in after first paint.
 *
 * The base gradient lives on <html> in globals.css so first paint is
 * never plain black even while this is loading.
 */
const NeonAtmosphere = dynamic(() => import("./NeonAtmosphere"), {
  ssr: false,
});

export default function NeonAtmosphereLoader() {
  return <NeonAtmosphere />;
}
