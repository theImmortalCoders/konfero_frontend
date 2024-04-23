"use client";
import { useRouter } from "next/navigation";

export default function UpdateConference() {
  const router = useRouter();
  router.push("/");
  return null;
}
