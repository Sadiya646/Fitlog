
"use client";

import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePlan } from "@/app/context/PlanContext";

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

interface TodayPlanCardProps {
    workout: Workout;
    markAsDone: (id: number, name: string) => void;
    // isDone:boolean;
}

const TodayPlanCard = ({
    workout,
    markAsDone,
    
}: TodayPlanCardProps) => {
    const { removeFromPlan } = usePlan();

    // Remove workout
    const handleRemove = () => {
        removeFromPlan(workout.id);

        toast.error(
            `"${workout.name}" removed from Today's Plan 🗑️`
        );
    };

    // Mark workout as done
    const handleDone = () => {
        markAsDone(workout.id, workout.name);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#12141a] p-5 md:flex-row">

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

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-white/60">

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

                {/* View Details */}
                <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                    View Details
                </Link>

                {/* Mark as Done */}
                <button
                    onClick={handleDone}
                    className="rounded-full bg-[#ccff00] px-5 py-2 text-xs font-black uppercase tracking-wider text-black transition hover:opacity-90"
                >
                    ✓ Mark as Done
                </button>

                {/* Remove */}
                <button
                    onClick={handleRemove}
                    className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
                >
                    ✕
                </button>

            </div>

        </div>
    );
};

export default TodayPlanCard;
