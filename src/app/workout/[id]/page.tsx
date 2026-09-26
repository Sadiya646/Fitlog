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

    const { plan, addToPlan } = usePlan();

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
                <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-[#12141a] p-6 md:p-10 lg:flex-row">

                    
                    <div className="w-full lg:w-1/2">
                        <div className="overflow-hidden rounded-2xl bg-white/5">
                            <img
                                src={workout.image}
                                alt={workout.name}
                                className="min-h-[350px] w-full object-cover lg:min-h-[600px]"
                            />
                        </div>
                    </div>

                 
                    <div className="flex w-full flex-col lg:w-1/2">

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2">
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
                        <h1 className="mt-4 text-3xl font-black uppercase tracking-wide md:text-4xl">
                            {workout.name}
                        </h1>

                       
                        <p className="mt-4 text-sm leading-relaxed text-white/60">
                            {workout.description}
                        </p>

                       
                        <div className="mt-7">
                            <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-white">
                                Key Specs
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090a0d]">

                                {/* Equipment */}
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Equipment
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.equipment}
                                    </span>
                                </div>

                                {/* Difficulty */}
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Difficulty
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.difficulty}
                                    </span>
                                </div>

                               
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Sets
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.sets}
                                    </span>
                                </div>

                                {/* Reps */}
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Reps
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.reps}
                                    </span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Duration
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        ⏱ {workout.duration} min
                                    </span>
                                </div>

                                {/* Calories */}
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Calories
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        🔥 {workout.caloriesBurned} kcal
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-between px-5 py-3.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        Rating
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        ⭐ {workout.rating}
                                    </span>
                                </div>

                            </div>
                        </div>

                     
                        <div className="mt-7">
                            <h2 className="text-sm font-black uppercase tracking-wider">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-3">
                                {workout.instructions.map(
                                    (step, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-sm leading-relaxed text-white/60"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                                                {index + 1}
                                            </span>

                                            <span className="pt-0.5">
                                                {step}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>

                        
                        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-5">

                            {/* Add to Today's Plan */}
                            <button
                                onClick={handleAddToPlan}
                                disabled={isInPlan}
                                className={`flex-1 rounded-full px-6 py-3.5 text-xs font-black uppercase transition ${
                                    isInPlan
                                        ? "cursor-not-allowed bg-white/10 text-white/40"
                                        : "bg-[#ccff00] text-black hover:opacity-90"
                                }`}
                            >
                                {isInPlan
                                    ? "✓ Added to Today's Plan"
                                    : "＋ Add to Today's Plan"}
                            </button>

                            {/* Save for Later */}
                            <SavedButton workout={workout} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}