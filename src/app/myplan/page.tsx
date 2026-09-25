"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Workout {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
}

const MyPlanPage = () => {
    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
    
    // Lazy initialization use kore useEffect and cascading render error fix kora holo
    const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(
                localStorage.getItem("fitlog_today_plan") ||
                localStorage.getItem("fitlog-plan") ||
                "[]"
            );
        }
        return [];
    });

    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
        }
        return [];
    });

    const [completedIds, setCompletedIds] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("fitlog_completed") || "[]");
        }
        return [];
    });

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const removeItem = (id: number, type: "today" | "saved") => {
        if (type === "today") {
            const updated = todayPlan.filter((w) => w.id !== id);
            setTodayPlan(updated);
            localStorage.setItem("fitlog_today_plan", JSON.stringify(updated));
            localStorage.setItem("fitlog-plan", JSON.stringify(updated));
            showToast("Removed from Today's Plan");
        } else {
            const updated = savedWorkouts.filter((w) => w.id !== id);
            setSavedWorkouts(updated);
            localStorage.setItem("fitlog_saved", JSON.stringify(updated));
            showToast("Removed from Saved");
        }
    };

    const markAsDone = (id: number, name: string) => {
        if (!completedIds.includes(id)) {
            const updated = [...completedIds, id];
            setCompletedIds(updated);
            localStorage.setItem("fitlog_completed", JSON.stringify(updated));
            showToast(`Completed: ${name}! 🎉`);
        } else {
            showToast("Workout already marked as done!");
        }
    };

    const totalExercises = todayPlan.length;
    const totalMinutes = todayPlan.reduce(
        (acc, curr) => acc + curr.duration,
        0
    );
    const totalCalories = todayPlan.reduce(
        (acc, curr) => acc + curr.caloriesBurned,
        0
    );

    const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

    return (
        <main className="min-h-screen bg-[#090a0d] px-4 py-10 text-white relative">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-lg transition-all animate-bounce">
                    {toastMessage}
                </div>
            )}

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <h1 className="text-4xl font-black uppercase tracking-wide">
                    My Plan
                </h1>
                <p className="mt-2 text-sm text-white/50">
                    Cap of five lifts for today. Finish them, then load more.
                </p>

                {/* Metrics Summary Row */}
                <div className="mt-8 grid grid-cols-3 gap-4">
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
                        <h2 className="mt-2 text-3xl font-black text-white">
                            {totalMinutes}
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#12141a] p-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                            Calories
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-white">
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
                                : "border border-white/20 text-white/50 hover:text-white"
                        }`}
                    >
                        Today&apos;s Plan ({todayPlan.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition ${
                            activeTab === "saved"
                                ? "bg-[#ccff00] text-black"
                                : "border border-white/20 text-white/50 hover:text-white"
                        }`}
                    >
                        Saved ({savedWorkouts.length})
                    </button>
                </div>

                {/* Content Section */}
                {currentList.length === 0 ? (
                    <div className="mt-12 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12141a]/50 p-8 text-center">
                        <h2 className="text-xl font-black uppercase tracking-wide">
                            Nothing Here Yet
                        </h2>
                        <p className="mt-2 text-sm text-white/40 max-w-sm">
                            {activeTab === "today"
                                ? "Browse the library and add a lift to get today moving."
                                : "You haven't saved any workouts for later yet."}
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
                        {currentList.map((workout) => {
                            const isDone = completedIds.includes(workout.id);
                            return (
                                <div
                                    key={workout.id}
                                    className={`flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border bg-[#12141a] p-5 transition ${
                                        isDone
                                            ? "border-green-500/50 opacity-75"
                                            : "border-white/10"
                                    }`}
                                >
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <img
                                            src={workout.image}
                                            alt={workout.name}
                                            className="h-20 w-20 rounded-xl object-cover shrink-0"
                                        />
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-wide">
                                                {workout.name}
                                            </h3>
                                            <p className="mt-1 text-xs text-white/40">
                                                {workout.equipment}
                                            </p>
                                            <div className="mt-2 flex items-center gap-4 text-xs text-white/60">
                                                <span>
                                                    ⏱ {workout.duration} min
                                                </span>
                                                <span>
                                                    🔥 {workout.caloriesBurned}{" "}
                                                    kcal
                                                </span>
                                                <span>⭐ {workout.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                                        >
                                            View Details
                                        </Link>

                                        {activeTab === "today" && (
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
                                                        : "bg-[#ccff00] text-black hover:opacity-95"
                                                }`}
                                            >
                                                {isDone ? "Done ✓" : "Mark as Done"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                removeItem(workout.id, activeTab)
                                            }
                                            className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
                                            title="Remove workout"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyPlanPage;