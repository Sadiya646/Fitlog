"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { toast } from "react-toastify";

const MyPlanPage = () => {
    const { plan, removeFromPlan } = usePlan();

    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

    const [completedIds, setCompletedIds] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(
                localStorage.getItem("fitlog_completed") || "[]"
            );
        }

        return [];
    });

    // Remove workout using react-toastify
    const handleRemove = (id: number, name: string) => {
        removeFromPlan(id);
        toast.error(`Removed "${name}" from Today's Plan 🗑️`, {
            position: "bottom-right",
            autoClose: 2500,
        });
    };

    // Mark as done using react-toastify
    const markAsDone = (id: number, name: string) => {
        if (completedIds.includes(id)) {
            toast.info("Workout already marked as done!", {
                position: "bottom-right",
                autoClose: 2500,
            });
            return;
        }

        const updated = [...completedIds, id];

        setCompletedIds(updated);

        localStorage.setItem(
            "fitlog_completed",
            JSON.stringify(updated)
        );

        toast.success(`Completed: ${name}! 🎉`, {
            position: "bottom-right",
            autoClose: 2500,
        });
    };

    // Metrics
    const totalExercises = plan.length;

    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    return (
        <main className="relative min-h-screen bg-[#090a0d] px-4 py-10 text-white">

            <div className="mx-auto max-w-7xl">

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

                {/* Tabs */}
  <div className="mt-8 flex gap-3">

    <button
        onClick={() => setActiveTab("today")}
        className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
            activeTab === "today"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white/60 hover:text-white"
        }`}
    >
        Today&apos;s Plan ({plan.length})
    </button>

    <button
        onClick={() => setActiveTab("saved")}
        className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
            activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-white/60 hover:text-white"
        }`}
    >
        Saved (0)
    </button>

</div>

                {/* Saved Tab */}
                {activeTab === "saved" && (
                    <div className="mt-12 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12141a]/50 p-8 text-center">

                        <h2 className="text-xl font-black uppercase tracking-wide">
                            Nothing Here Yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm text-white/40">
                            You haven&apos;t saved any workouts for later yet.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:opacity-90"
                        >
                            Go to Workouts
                        </Link>

                    </div>
                )}

                {/* Today's Plan */}
                {activeTab === "today" && (
                    <>
                        {plan.length === 0 ? (
                            <div className="mt-12 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12141a]/50 p-8 text-center">

                                <h2 className="text-xl font-black uppercase tracking-wide">
                                    Nothing Here Yet
                                </h2>

                                <p className="mt-2 max-w-sm text-sm text-white/40">
                                    Browse the library and add a workout to get
                                    today moving.
                                </p>

                                <Link
                                    href="/"
                                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:opacity-90"
                                >
                                    Go to Workouts
                                </Link>

                            </div>
                        ) : (
                            <div className="mt-6 space-y-4">

                                {plan.map((workout) => {

                                    const isDone =
                                        completedIds.includes(workout.id);

                                    return (
                                        <div
                                            key={workout.id}
                                            className={`flex flex-col items-center justify-between gap-4 rounded-2xl border bg-[#12141a] p-5 transition md:flex-row ${
                                                isDone
                                                    ? "border-green-500/50 opacity-75"
                                                    : "border-white/10"
                                            }`}
                                        >

                                            {/* Workout Info */}
                                            <div className="flex w-full items-center gap-4 md:w-auto">

                                                <img
                                                    src={workout.image}
                                                    alt={workout.name}
                                                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                                                />

                                                <div>

                                                    <h3 className="text-sm font-black uppercase tracking-wide">
                                                        {workout.name}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-white/40">
                                                        {workout.equipment}
                                                    </p>

                                                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/60">

                                                        <span>
                                                            ⏱ {workout.duration} min
                                                        </span>

                                                        <span>
                                                            🔥 {workout.caloriesBurned} kcal
                                                        </span>

                                                        <span>
                                                            ⭐ {workout.rating}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Buttons */}
                                            <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">

                                                {/* Details */}
                                                <Link
                                                    href={`/workout/${workout.id}`}
                                                    className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                                                >
                                                    View Details
                                                </Link>

                                                {/* Done */}
                                                <button
                                                    onClick={() =>
                                                        markAsDone(
                                                            workout.id,
                                                            workout.name
                                                        )
                                                    }
                                                    className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition ${
                                                        isDone
                                                            ? "bg-green-500 text-black"
                                                            : "bg-[#ccff00] text-black hover:opacity-90"
                                                    }`}
                                                >
                                                    {isDone
                                                        ? "Done ✓"
                                                        : "Mark as Done"}
                                                </button>

                                                {/* Remove */}
                                                <button
                                                    onClick={() =>
                                                        handleRemove(
                                                            workout.id,
                                                            workout.name
                                                        )
                                                    }
                                                    className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
                                                >
                                                    ✕
                                                </button>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>
                        )}
                    </>
                )}

            </div>
        </main>
    );
};

export default MyPlanPage;