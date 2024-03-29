export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`items-start h-auto z-0 rounded-3xl px-4 py-4 sm:px-8 sm:py-8 text-close2White ${className}`}
    >
      {children}
    </main>
  );
}
