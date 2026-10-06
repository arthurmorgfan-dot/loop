type IconName =
  | "arrow"
  | "check"
  | "crate"
  | "truck"
  | "return"
  | "leaf"
  | "apple"
  | "grain"
  | "seed"
  | "user"
  | "close";

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  crate: (
    <>
      <path d="M3 8h18l-2 12H5L3 8Zm3 4h12M7 16h10M8 8V4m8 4V4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 5h11v12H3V5Zm11 5h4l3 4v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  return: (
    <>
      <path d="M5 7a8 8 0 1 1-1 9M5 3v5h5" />
      <path d="m9 12 3 3 4-5" />
    </>
  ),
  leaf: (
    <>
      <path d="M19 4C8 3 3 9 6 16c7 4 14-1 13-12ZM5 20 16 9" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7c-7-5-12 4-6 12 2 3 4 1 6 1s4 2 6-1c6-8 1-17-6-12Zm0 0V3m0 2c2-3 4-3 5-3" />
    </>
  ),
  grain: (
    <>
      <path d="M12 21V3m0 7C5 10 5 5 5 5s7 0 7 5Zm0 7c-7 0-7-5-7-5s7 0 7 5Zm0-4c7 0 7-5 7-5s-7 0-7 5Zm0 7c7 0 7-5 7-5s-7 0-7 5Z" />
    </>
  ),
  seed: (
    <>
      <path d="M17 5c7 6-3 17-9 14-7-4 2-17 9-14Z" />
      <path d="M8 16c0-4 3-7 7-8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
};

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
