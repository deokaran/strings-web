"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace("/register");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      {isLoading ? <Loading /> : null}
    </div>
  );
}
