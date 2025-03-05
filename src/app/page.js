"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-500 to-slate-100">
      <h1 className="text-4xl font-bold mb-6">AI Notes</h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.push("/login")}
      >
        Login
      </button>
    </div>
  );
}
