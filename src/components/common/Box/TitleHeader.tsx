export default function TitleHeader({ title }: { title: string }) {
  return (
    <h1 className="w-full flex justify-center text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
      {title}:
    </h1>
  );
}
