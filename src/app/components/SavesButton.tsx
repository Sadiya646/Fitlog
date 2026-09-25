"use client";

import React from "react";
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

interface SavedButtonProps {
    workout: Workout;
}

const SavedButton = ({ workout }: SavedButtonProps) => {
    const {
        savedWorkouts,
        addToSaved,
        removeFromSaved,
    } = usePlan();

    const isSaved = savedWorkouts.some(
        (item) => item.id === workout.id
    );

    const handleSave = () => {
        if (isSaved) {
            removeFromSaved(workout.id);
            toast.info("Removed from Saved");
        } else {
            addToSaved(workout);
            toast.success("Saved for Later! ♡");
        }
    };

    return (
        <button
            onClick={handleSave}
            className={`rounded-full border px-6 py-3 text-xs font-black uppercase transition ${
                isSaved
                    ? "border-[#ccff00] bg-[#ccff00] text-black"
                    : "border-white/20 text-white hover:bg-white/10"
            }`}
        >
            {isSaved ? "Saved ✓" : "♡ Save for Later"}
        </button>
    );
};

export default SavedButton;