"use client"

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter()

    useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated) {
      router.push("/admin-config")
    } else {
      router.push("/sign-in")
    }
  }, [router])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
