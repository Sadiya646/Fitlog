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

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    const { plan ,addToPlan } = usePlan();

    useEffect(() => {
        if (!id) return;

        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => res.json())
            .then((data: Workout[]) => {
                const found = data.find(
                    (item) => item.id.toString() === id
                );

                setWorkout(found || null);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                toast.error("Failed to load workout details.");
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#090a0d] flex items-center justify-center text-white">
                Loading details...
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="min-h-screen bg-[#090a0d] flex items-center justify-center text-white">
                Workout not found.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#090a0d] px-4 py-12 text-white">

            <div className="mx-auto max-w-6xl">

                <div className="flex flex-col lg:flex-row gap-8 items-start rounded-3xl border border-white/10 bg-[#12141a] p-6 md:p-10">

                    {/* Left Side - Image */}
                    <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl bg-white/5">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full w-full object-cover min-h-[350px] lg:min-h-[500px]"
                        />
                    </div>

                    {/* Right Side - Details */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">

                        <div>

                            {/* Muscle Groups */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {workout.muscleGroups.map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
                                {workout.name}
                            </h1>

                            <p className="mt-2 text-sm text-white/50">
                                {workout.equipment}
                            </p>

                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-[#090a0d] p-4 text-center">

                                <div>
                                    <p className="text-[10px] uppercase text-white/40 font-bold">
                                        Duration
                                    </p>

                                    <p className="text-sm md:text-lg font-black mt-1">
                                        ⏱ {workout.duration} min
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase text-white/40 font-bold">
                                        Calories
                                    </p>

                                    <p className="text-sm md:text-lg font-black mt-1">
                                        🔥 {workout.caloriesBurned} kcal
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase text-white/40 font-bold">
                                        Rating
                                    </p>

                                    <p className="text-sm md:text-lg font-black mt-1">
                                        ⭐ {workout.rating}
                                    </p>
                                </div>

                            </div>

                            {/* Description */}
                            <div className="mt-8">

                                <h3 className="text-lg font-black uppercase">
                                    Description
                                </h3>

                                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                                    {workout.description}
                                </p>

                            </div>

                            {/* Instructions */}
                            <div className="mt-8">

                                <h3 className="text-lg font-black uppercase">
                                    Instructions
                                </h3>

                                <ul className="mt-3 space-y-2">

                                    {workout.instructions.map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-sm text-white/70"
                                        >
                                            <span className="font-black text-[#ccff00]">
                                                {index + 1}.
                                            </span>

                                            {step}
                                        </li>
                                    ))}

                                </ul>

                            </div>

                        </div>

       {/* Buttons */}
{/* Buttons */}
<div className="mt-10 flex flex-wrap gap-4 pt-4 border-t border-white/10">

    {(() => {
        const isInPlan = plan.some((item) => item.id === workout.id);

        return (
            <button
                onClick={() => {
                    if (!isInPlan) {
                        addToPlan(workout);
                        toast.success(
                            `${workout.name} added to Today's Plan! 🚀`
                        );
                    }
                }}
                disabled={isInPlan}
                className={`flex-1 rounded-full px-6 py-3.5 text-xs font-black uppercase transition ${
                    isInPlan
                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                        : "bg-[#ccff00] text-black hover:opacity-95"
                }`}
            >
                {isInPlan ? "Added to Plan ✓" : "+ Add to Plan"}
            </button>
        );
    })()}

    <SavedButton workout={workout} />

</div>

                    </div>

                </div>

            </div>

        </main>
    );
}