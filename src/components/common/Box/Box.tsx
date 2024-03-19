export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <main className="items-start h-auto w-[70%] bg-darkblue2blue-gradient z-0 rounded-3xl px-8 py-8 text-close2White">
      {children}
    </main>
  );
}
