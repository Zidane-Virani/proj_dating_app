"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function Providers({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastContainer position="bottom-right" hideProgressBar={true} className="z-50" />
      {children}
    </HeroUIProvider>
  );
}