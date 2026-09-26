"use client";

import React from "react";

interface PlanHeaderProps {
    totalExercises: number;
    totalMinutes: number;
    totalCalories: number;
}

const PlanHeader = ({
    totalExercises,
    totalMinutes,
    totalCalories,
}: PlanHeaderProps) => {
    return (
        <>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black uppercase tracking-wide">
                    My Plan
                </h1>

                <p className="mt-2 text-sm text-white/50">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Exercises
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-[#ccff00]">
                        {totalExercises} / 5
                    </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Minutes
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        {totalMinutes}
                    </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Calories
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                        {totalCalories}
                    </h2>
                </div>

            </div>
        </>
    );
};

export default PlanHeader;