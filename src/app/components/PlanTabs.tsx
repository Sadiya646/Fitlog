"use client";

import React from "react";

interface PlanTabsProps {
    activeTab: "today" | "saved";
    setActiveTab: (tab: "today" | "saved") => void;
    planCount: number;
    savedCount: number;
}

const PlanTabs = ({
    activeTab,
    setActiveTab,
    planCount,
    savedCount,
}: PlanTabsProps) => {
    return (
        <div className="mt-8 flex gap-3">

            <button
                onClick={() => setActiveTab("today")}
                className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
                    activeTab === "today"
                        ? "bg-[#ccff00] text-black"
                        : "border border-white/20 text-white/60 hover:text-white"
                }`}
            >
                Today&apos;s Plan ({planCount})
            </button>

            <button
                onClick={() => setActiveTab("saved")}
                className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
                    activeTab === "saved"
                        ? "bg-[#ccff00] text-black"
                        : "border border-white/20 text-white/60 hover:text-white"
                }`}
            >
                Saved ({savedCount})
            </button>

        </div>
    );
};

export default PlanTabs;