import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

import MovingNetworkAnimation from "moving-network-animation";
import { Parallax, Background } from "react-parallax";

export default function Hero({
  nodeColor,
  edgeColor,
  speed,
  maxNodes,
  connectionRadius,
  parallax,
}: {
  nodeColor: string;
  edgeColor: string;
  speed: number;
  maxNodes: number;
  connectionRadius: number;
  parallax: number;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = new MovingNetworkAnimation(containerRef.current, {
      nodeColor,
      edgeColor,
      minSpeed: speed,
      speedVariance: 0,
      maxNodes,
      connectionRadius,
    });

    return () => animation.destroy();
  }, []);

  return <div ref={containerRef} className="w-screen h-full" />;
}

const root1 = createRoot(document.getElementById("hero-animation-1"));
const root2 = createRoot(document.getElementById("hero-animation-2"));
const root3 = createRoot(document.getElementById("hero-animation-3"));
const root1m = createRoot(document.getElementById("hero-animation-1-m"));
const root2m = createRoot(document.getElementById("hero-animation-2-m"));

root1.render(
  <Hero
    nodeColor="#5ea500"
    edgeColor="#d8f999"
    speed={0.3}
    maxNodes={50}
    connectionRadius={100}
    parallax={150}
  />,
);
root2.render(
  <Hero
    nodeColor="#009966"
    edgeColor="#5ea500"
    speed={0.2}
    maxNodes={75}
    connectionRadius={150}
    parallax={200}
  />,
);
root3.render(
  <Hero
    nodeColor="#004f3b"
    edgeColor="#009966"
    speed={0.1}
    maxNodes={100}
    connectionRadius={200}
    parallax={300}
  />,
);
root1m.render(
  <Hero
    nodeColor="#5ea500"
    edgeColor="#d8f999"
    speed={0.3}
    maxNodes={20}
    connectionRadius={100}
    parallax={150}
  />,
);
root2m.render(
  <Hero
    nodeColor="#009966"
    edgeColor="#5ea500"
    speed={0.2}
    maxNodes={30}
    connectionRadius={150}
    parallax={200}
  />,
);
