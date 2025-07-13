"use client";
import { useEffect, useState } from "react"
import Link from "next/link";
import styles from "./dashboard.module.css"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          window.location.href = "/";
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return <p>Checking authentication...</p>;
  if (!isAuthenticated) return null;

  return (
    <article>
        <section className={styles.dashboardNav}>
            <Link href="/dashboard/statistics">
                Statistics
            </Link>
            <Link href="/dashboard/projects">
                Projects
            </Link>
            <Link href="/dashboard/messages">
                Messages
            </Link>
        </section>
        <div>
        {children}
        </div>
    </article>
  );
}