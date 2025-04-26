export default function Divider() {
  return (
    <div className="flex items-center gap-2 my-4">
      <div className="border-t border-neutral-200 flex-1" />
      <img
        src="/img/pentagon-dark.svg"
        className="transform duration-200 invert-none dark:invert w-4 group-hover:rotate-72"
      />
      <div className="border-t border-neutral-200 flex-1" />
    </div>
  );
}
