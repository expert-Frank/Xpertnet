import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface Segment {
  label: string;
  value: string;
  ref: RefObject;
}

export default function SegmentedControl({
  segments,
  callback,
  defaultIndex = 0,
  controlRef,
  className = "",
}: {
  segments: Segment[];
  callback: (value: string, index: number) => void;
  defaultIndex?: number;
  controlRef: RefObject;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    callback(value, index);
  }

  useEffect(() => {
    const activeSegmentRef = segments[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegmentRef.current;
    const { style } = controlRef.current;

    style.setProperty('--highlight-width', `${offsetWidth}px`);
    style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
  }, [activeIndex, callback, segments]);

  return (
    <div className={`flex ${className}`} ref={controlRef}>
      <div className="inline-flex justify-between bg-white dark:bg-neutral-700 shadow-md rounded-md max-w-[500px] p-3 m-auto overflow-hidden relative before:content-[''] before:bg-emerald-600 before:rounded-sm before:w-[var(--highlight-width)] before:absolute before:top-1 before:bottom-1 before:left-0 before:z-0 before:transform-[translateX(var(--highlight-x-pos))] before:transform before:duration-200">
        {segments.map((segment, i) => (
          <div
            key={segment.value}
            className={`min-w-30 relative text-center z-1 ${i === activeIndex ? "" : ""}`}
            ref={segment.ref}
          >
            <input
              type="radio"
              value={segment.value}
              id={segment.value}
              onChange={() => onInputChange(segment.value, i)}
              checked={i === activeIndex}
              className="opacity-0 m-0 top-0 right-0 bottom-0 left-0 absolute w-full cursor-pointer h-full"
            />
            <label
              htmlFor={segment.value}
              className={`cursor-pointer block font-semibold py-1 px-3 relative transition duration-200 ${i === activeIndex ? "text-white": "text-black dark:text-white"}`}
            >
              {segment.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
