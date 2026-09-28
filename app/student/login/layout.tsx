import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Login",
};

export default function StudentLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
