"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { toast } from "react-toastify";

import PlanHeader from "@/app/components/PlanHeader";
import PlanTabs from "@/app/components/PlanTabs";
import SavedCard from "@/app/components/SavedCard";
import TodayPlanCard from "@/app/components/TodayPlanCard";

const MyPlanPage = () => {
    const {
        plan,
        savedWorkouts,
    } = usePlan();

    const [activeTab, setActiveTab] = useState<
        "today" | "saved"
    >("today");

    const [completedIds, setCompletedIds] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(
                localStorage.getItem("fitlog_completed") || "[]"
            );
        }

        return [];
    });

    // Mark workout as done
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
        (total, workout) =>
            total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) =>
            total + workout.caloriesBurned,
        0
    );

    return (
        <main className="min-h-screen bg-[#090a0d] px-4 py-10 text-white">

            <div className="mx-auto max-w-7xl">

                {/* Header + Metrics */}
                <PlanHeader
                    totalExercises={totalExercises}
                    totalMinutes={totalMinutes}
                    totalCalories={totalCalories}
                />

                {/* Tabs */}
                <PlanTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    planCount={plan.length}
                    savedCount={savedWorkouts.length}
                />

                {/* Saved */}
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
                                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
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

                {/* Today's Plan */}
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
                                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
                                >
                                    Go to Workouts
                                </Link>

                            </div>
                        ) : (
                            <div className="space-y-4">

                                {plan.map((workout) => (
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