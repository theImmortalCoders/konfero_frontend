export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl px-4 py-4 sm:px-8 sm:py-8 ${className}`}
    >
      {children}
    </main>
  );
}
