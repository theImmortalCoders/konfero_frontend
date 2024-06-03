import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function Verified({ showtext }: { showtext: boolean }) {
  return (
    <div className="flex items-center justify-center gap-x-1">
      <RiVerifiedBadgeFill />
      {showtext ? <p>Zweryfikowana</p> : null}
    </div>
  );
}
