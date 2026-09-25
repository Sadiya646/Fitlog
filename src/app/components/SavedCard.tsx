"use client";

import React from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
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

interface SavedCardProps {
    workout: Workout;
}

const SavedCard = ({ workout }: SavedCardProps) => {
    const { removeFromSaved, addToPlan } = usePlan();

    // Remove from Saved
    const handleRemove = () => {
        removeFromSaved(workout.id);

        toast.info(
            `${workout.name} removed from Saved.`
        );
    };

    // Add Saved workout to Today's Plan
    const handleAddToPlan = () => {
        addToPlan(workout);

        toast.success(
            `${workout.name} added to Today's Plan! 🚀`
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12141a]">

            {/* Image */}
            <img
                src={workout.image}
                alt={workout.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">

                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="text-[10px] font-bold uppercase text-[#ccff00]"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Name */}
                <h2 className="mt-2 text-lg font-black uppercase">
                    {workout.name}
                </h2>

                {/* Info */}
                <p className="mt-1 text-xs text-white/50">
                    {workout.duration} min ·{" "}
                    {workout.caloriesBurned} kcal
                </p>

                {/* Buttons */}
                <div className="mt-5 flex flex-wrap gap-2">

                    {/* Details */}
                    <Link
                        href={`/workout/${workout.id}`}
                        className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-xs font-bold uppercase text-white transition hover:bg-white/5"
                    >
                        View Details
                    </Link>

                    {/* Add to Plan */}
                    <button
                        onClick={handleAddToPlan}
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black transition hover:opacity-90"
                    >
                        + Plan
                    </button>

                    {/* Remove */}
                    <button
                        onClick={handleRemove}
                        className="rounded-full border border-red-500/30 px-4 py-2 text-xs font-bold uppercase text-red-400 transition hover:bg-red-500/10"
                    >
                        Remove
                    </button>

                </div>

            </div>
        </div>
    );
};

export default SavedCard;