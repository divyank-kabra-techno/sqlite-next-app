"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("authenticated") === "true";
      setIsAuthenticated(auth);
      if (!auth) {
        router.push("/login");
      }
    }
  }, [router]);

  return isAuthenticated ? <>{children}</> : null;
}
