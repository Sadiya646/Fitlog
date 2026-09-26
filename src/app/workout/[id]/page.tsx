"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";
import SavedButton from "@/app/components/SavesButton";
import { toast } from "react-toastify";

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

export default function WorkoutDetailPage() {
    const params = useParams();
    const id = params?.id;

    const [workout, setWorkout] =
        useState<Workout | null>(null);

    const [loading, setLoading] =
        useState(true);

    const { plan, addToPlan } = usePlan();

    useEffect(() => {
        if (!id) return;

        fetch(
            "https://api.abcz.workers.dev/api/fitlog"
        )
            .then((res) => res.json())
            .then((data: Workout[]) => {
                const found = data.find(
                    (item) =>
                        item.id.toString() === id
                );

                setWorkout(found || null);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);

                toast.error(
                    "Failed to load workout details."
                );
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
                Loading details...
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
                Workout not found.
            </div>
        );
    }

    const isInPlan = plan.some(
        (item) => item.id === workout.id
    );

    const handleAddToPlan = () => {
        if (isInPlan) return;

        const added = addToPlan(workout);

        if (added) {
            toast.success(
                `${workout.name} added to Today's Plan! 🚀`
            );
        } else {
            toast.warning(
                "Today's Plan is full! Maximum 5 workouts allowed. ⚠️"
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#090a0d] px-4 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-start gap-8 rounded-3xl border border-white/10 bg-[#12141a] p-6 md:p-10 lg:flex-row">

                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-2xl bg-white/5 lg:w-1/2">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="min-h-[350px] w-full object-cover lg:min-h-[500px]"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex w-full flex-col justify-between lg:w-1/2">

                        <div>
                            {/* Muscle Groups */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                {workout.muscleGroups.map(
                                    (muscle) => (
                                        <span
                                            key={muscle}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
                                        >
                                            {muscle}
                                        </span>
                                    )
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-black uppercase tracking-wide md:text-4xl">
                                {workout.name}
                            </h1>

                            {/* Equipment */}
                            <p className="mt-2 text-sm text-white/50">
                                {workout.equipment}
                            </p>

                            {/* Stats */}
                            <div className="mt-6 rounded-2xl border border-white/10 bg-[#090a0d] p-5">

                                <div className="grid grid-cols-3">

                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                            Duration
                                        </p>

                                        <p className="mt-2 text-sm font-black md:text-base">
                                            ⏱{" "}
                                            {workout.duration}{" "}
                                            min
                                        </p>
                                    </div>

                                    <div className="border-x border-white/10 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                            Calories
                                        </p>

                                        <p className="mt-2 text-sm font-black md:text-base">
                                            🔥{" "}
                                            {
                                                workout.caloriesBurned
                                            }{" "}
                                            kcal
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                            Rating
                                        </p>

                                        <p className="mt-2 text-sm font-black md:text-base">
                                            ⭐{" "}
                                            {workout.rating}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-8">
                                <h3 className="text-lg font-black uppercase">
                                    Description
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {workout.description}
                                </p>
                            </div>

                            {/* Instructions */}
                            <div className="mt-8">
                                <h3 className="text-lg font-black uppercase">
                                    Instructions
                                </h3>

                                <ul className="mt-3 space-y-2">
                                    {workout.instructions.map(
                                        (
                                            step,
                                            index
                                        ) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 text-sm text-white/70"
                                            >
                                                <span className="font-black text-[#ccff00]">
                                                    {index +
                                                        1}
                                                    .
                                                </span>

                                                <span>
                                                    {step}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-4">

                            {/* Add to Plan */}
                            <button
                                onClick={
                                    handleAddToPlan
                                }
                                disabled={isInPlan}
                                className={`flex-1 rounded-full px-6 py-3.5 text-xs font-black uppercase transition ${
                                    isInPlan
                                        ? "cursor-not-allowed bg-white/10 text-white/40"
                                        : "bg-[#ccff00] text-black hover:opacity-95"
                                }`}
                            >
                                {isInPlan
                                    ? "Added to Plan ✓"
                                    : "+ Add to Plan"}
                            </button>

                            {/* Save */}
                            <SavedButton
                                workout={workout}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}