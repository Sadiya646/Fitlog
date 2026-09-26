"use client";

import React, { useState } from "react";

interface PlanTabsProps {
    activeTab: "today" | "saved";
    setActiveTab: (tab: "today" | "saved") => void;
    planCount: number;
    savedCount: number;
    sortBy: "duration" | "calories" | "rating";
    setSortBy: (
        value: "duration" | "calories" | "rating"
    ) => void;
}

const PlanTabs = ({
    activeTab,
    setActiveTab,
    planCount,
    savedCount,
    sortBy,
    setSortBy,
}: PlanTabsProps) => {
    const [open, setOpen] = useState(false);

    const options = [
        {
            value: "duration" as const,
            label: "Duration",
            icon: "◷",
        },
        {
            value: "calories" as const,
            label: "Calories",
            icon: "🔥",
        },
        {
            value: "rating" as const,
            label: "Rating",
            icon: "★",
        },
    ];

    const selectedOption = options.find(
        (option) => option.value === sortBy
    );

    return (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT - TABS */}
            <div className="flex w-fit gap-2 rounded-full border border-white/10 bg-[#12141a] p-1">
                <button
                    onClick={() => setActiveTab("today")}
                    className={`rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                        activeTab === "today"
                            ? "bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.12)]"
                            : "text-white/45 hover:text-white"
                    }`}
                >
                    Today&apos;s Plan
                    <span
                        className={`ml-1 ${
                            activeTab === "today"
                                ? "text-black/60"
                                : "text-white/25"
                        }`}
                    >
                        ({planCount})
                    </span>
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                        activeTab === "saved"
                            ? "bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.12)]"
                            : "text-white/45 hover:text-white"
                    }`}
                >
                    Saved
                    <span
                        className={`ml-1 ${
                            activeTab === "saved"
                                ? "text-black/60"
                                : "text-white/25"
                        }`}
                    >
                        ({savedCount})
                    </span>
                </button>
            </div>

            {/* RIGHT - SORT DROPDOWN */}
            <div className="relative w-full sm:w-auto">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex w-full items-center justify-between gap-8 rounded-full border border-white/10 bg-[#12141a] px-5 py-4 text-left transition-all duration-200 hover:border-[#ccff00]/40 sm:w-[190px]"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-white/35">
                            Sort By
                        </span>

                        <span className="text-xs font-black uppercase text-white">
                            {selectedOption?.label}
                        </span>
                    </div>

                    <span
                        className={`text-sm text-[#ccff00] transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                        }`}
                    >
                        ⌄
                    </span>
                </button>

                {open && (
                    <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#12141a] p-1.5 shadow-2xl sm:w-[190px]">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setSortBy(option.value);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                                    sortBy === option.value
                                        ? "bg-[#ccff00] text-black"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">
                                        {option.icon}
                                    </span>

                                    <span className="text-xs font-bold uppercase">
                                        {option.label}
                                    </span>
                                </div>

                                {sortBy === option.value && (
                                    <span className="text-xs font-black">
                                        ✓
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanTabs;