"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { usePlan } from "@/app/context/PlanContext";

const Navbar = () => {
    const pathname = usePathname();

    const { plan } = usePlan();

    const workoutActive =
        pathname === "/" || pathname.startsWith("/workout");

    const planActive = pathname === "/myplan";

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090a0d]">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl font-black text-white"
                >
                    <img
                        src={logo.src}
                        alt="FitLog"
                        className="h-6 w-6 object-contain"
                    />

                    FITLOG
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-2">

                    {/* Workout */}
                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-[14px] font-bold uppercase transition ${
                            workoutActive
                                ? "bg-[#ccff00] text-black"
                                : "text-white/50 hover:text-white"
                        }`}
                    >
                        Workout
                    </Link>

                    {/* My Plan */}
                    <Link
                        href="/myplan"
                        className={`rounded-full px-4 py-2 text-[14px] font-bold uppercase transition ${
                            planActive
                                ? "bg-[#ccff00] text-black"
                                : "text-white/50 hover:text-white"
                        }`}
                    >
                        My Plan
                    </Link>

                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Plan Count */}
                    <Link
                        href="/myplan"
                        className="flex items-center gap-1 rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase text-black"
                    >
                        <span>✓</span>

                        <span>Plan</span>

                        <span>
                            ({plan.length})
                        </span>
                    </Link>

                    {/* Saved Count */}
                    <Link
                        href="/myplan"
                        className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-black uppercase text-white"
                    >
                        <span>♡</span>

                        <span>Saved</span>

                        <span>(0)</span>
                    </Link>

                </div>

            </nav>
        </header>
    );
};

export default Navbar;