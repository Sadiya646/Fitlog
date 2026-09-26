"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import { usePlan } from "@/app/context/PlanContext";
import PlanHeader from "@/app/components/PlanHeader";
import PlanTabs from "@/app/components/PlanTabs";
import SavedCard from "@/app/components/SavedCard";
import TodayPlanCard from "@/app/components/TodayPlanCard";

const MyPlanPage = () => {
    const {
        plan,
        savedWorkouts,
        isLoaded,
        removeFromPlan,
    } = usePlan();

    const [activeTab, setActiveTab] = useState<
        "today" | "saved"
    >("today");

    const [sortBy, setSortBy] = useState<
        "duration" | "calories" | "rating"
    >("duration");

    const [completedIds, setCompletedIds] = useState<number[]>([]);

    // Load completed workouts from localStorage
    useEffect(() => {
        const savedCompleted = localStorage.getItem(
            "fitlog_completed"
        );

        if (savedCompleted) {
            setCompletedIds(JSON.parse(savedCompleted));
        }
    }, []);

    // Mark workout as done
  const markAsDone = (id: number, name: string) => {
    removeFromPlan(id);

    toast.success(
        `"${name}" completed successfully! 🎉`
    );
};

    // Loading
    if (!isLoaded) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

                    <p className="text-sm text-white/50">
                        Loading workouts...
                    </p>
                </div>
            </main>
        );
    }

    const totalExercises = plan.length;

    const totalMinutes = plan.reduce(
        (total, workout) =>
            total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) =>
            total + workout.caloriesBurned,
        0
    );

    // Sort Today's Plan
    const sortedPlan = [...plan].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    return (
        <main className="min-h-screen bg-[#090a0d] px-4 py-10 text-white">
            <div className="mx-auto max-w-7xl">

                <PlanHeader
                    totalExercises={totalExercises}
                    totalMinutes={totalMinutes}
                    totalCalories={totalCalories}
                />


                <PlanTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    planCount={plan.length}
                    savedCount={savedWorkouts.length}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                
                {activeTab === "saved" && (
                    <div className="mt-6">

                        {savedWorkouts.length === 0 ? (
                            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12141a]/50 p-8 text-center">

                                <h2 className="text-xl font-black uppercase tracking-wide">
                                    Nothing Here Yet
                                </h2>

                                <p className="mt-2 max-w-sm text-sm text-white/40">
                                    You haven&apos;t saved any workouts for later yet.
                                </p>

                                <Link
                                    href="/"
                                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:bg-[#b8e600]"
                                >
                                    Go to Workouts
                                </Link>

                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                {savedWorkouts.map((workout) => (
                                    <SavedCard
                                        key={workout.id}
                                        workout={workout}
                                    />
                                ))}

                            </div>
                        )}

                    </div>
                )}


                {activeTab === "today" && (
                    <div className="mt-6">

                        {plan.length === 0 ? (
                            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12141a]/50 p-8 text-center">

                                <h2 className="text-xl font-black uppercase tracking-wide">
                                    Nothing Here Yet
                                </h2>

                                <p className="mt-2 max-w-sm text-sm text-white/40">
                                    Browse the library and add a lift to get today moving.
                                </p>

                                <Link
                                    href="/"
                                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black transition hover:bg-[#b8e600]"
                                >
                                    Go to Workouts
                                </Link>

                            </div>
                        ) : (
                            <div className="space-y-4">

                                {sortedPlan.map((workout) => (
                                    <TodayPlanCard
                                        key={workout.id}
                                        workout={workout}
                                        isDone={completedIds.includes(
                                            workout.id
                                        )}
                                        markAsDone={markAsDone}
                                    />
                                ))}

                            </div>
                        )}

                    </div>
                )}

            </div>
        </main>
    );
};

export default MyPlanPage;