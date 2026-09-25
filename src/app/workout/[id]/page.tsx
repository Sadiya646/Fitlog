"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "../../context/PlanContext";

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

const Page = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = use(params);

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const { plan, addToPlan } = usePlan();

    useEffect(() => {
        fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Workout not found");
                }

                return res.json();
            })
            .then((data) => {
                setWorkout(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    // Check whether workout is already in today's plan
    const alreadyAdded = workout
        ? plan.some((item) => item.id === workout.id)
        : false;

    // Add workout to plan
    const handleAddToPlan = () => {
        if (!workout) return;

        if (alreadyAdded) {
            setToastMessage("Already added to Today's Plan!");

            setTimeout(() => {
                setToastMessage(null);
            }, 2500);

            return;
        }

        if (plan.length >= 5) {
            setToastMessage("Today's Plan is full! Maximum 5 workouts.");

            setTimeout(() => {
                setToastMessage(null);
            }, 2500);

            return;
        }

        addToPlan(workout);

        setToastMessage("Added to Today's Plan! ✓");

        setTimeout(() => {
            setToastMessage(null);
        }, 2500);
    };

    // Loading
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
                <p className="text-sm text-white/50">
                    Loading workout...
                </p>
            </main>
        );
    }

    // Workout not found
    if (!workout) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#090a0d] text-white">
                <h1 className="text-2xl font-black">
                    Workout Not Found
                </h1>

                <Link
                    href="/"
                    className="mt-5 rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-black"
                >
                    Back to Workouts
                </Link>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-[#090a0d] px-4 py-8 text-white">

            {/* Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <Link
                    href="/"
                    className="mb-6 inline-block text-xs font-bold uppercase text-white/50 hover:text-white"
                >
                    ← Back to Workouts
                </Link>

                {/* Main Details */}
                <div className="grid gap-8 md:grid-cols-2">

                    {/* Image */}
                    <div>
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-[350px] w-full rounded-2xl object-cover md:h-[500px]"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">

                        {/* Muscle Groups */}
                        <div className="flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="mt-4 text-4xl font-black uppercase">
                            {workout.name}
                        </h1>

                        {/* Difficulty */}
                        <p className="mt-2 text-xs font-bold uppercase text-white/40">
                            {workout.difficulty}
                        </p>

                        {/* Description */}
                        <p className="mt-5 text-sm leading-6 text-white/60">
                            {workout.description}
                        </p>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                            <div className="rounded-xl border border-white/10 bg-[#101217] p-4">
                                <p className="text-[9px] uppercase text-white/40">
                                    Duration
                                </p>

                                <p className="mt-2 font-black">
                                    {workout.duration} min
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#101217] p-4">
                                <p className="text-[9px] uppercase text-white/40">
                                    Calories
                                </p>

                                <p className="mt-2 font-black">
                                    {workout.caloriesBurned}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#101217] p-4">
                                <p className="text-[9px] uppercase text-white/40">
                                    Sets
                                </p>

                                <p className="mt-2 font-black">
                                    {workout.sets}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#101217] p-4">
                                <p className="text-[9px] uppercase text-white/40">
                                    Rating
                                </p>

                                <p className="mt-2 font-black">
                                    ⭐ {workout.rating}
                                </p>
                            </div>

                        </div>

                        {/* Equipment & Reps */}
                        <div className="mt-6 grid grid-cols-2 gap-4">

                            <div>
                                <p className="text-[10px] uppercase text-white/40">
                                    Equipment
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.equipment}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase text-white/40">
                                    Reps
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.reps}
                                </p>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            {/* Add to Plan */}
                            <button
                                onClick={handleAddToPlan}
                                disabled={alreadyAdded}
                                className={`rounded-full px-6 py-3 text-xs font-black uppercase transition ${
                                    alreadyAdded
                                        ? "cursor-not-allowed bg-white/10 text-white/40"
                                        : "bg-[#ccff00] text-black hover:opacity-80"
                                }`}
                            >
                                {alreadyAdded
                                    ? "Added to Plan ✓"
                                    : "Add to Today's Plan"}
                            </button>

                            {/* Save */}
                            <button
                                className="rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase text-white transition hover:bg-white/10"
                            >
                                ♡ Save for Later
                            </button>

                        </div>

                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-12 border-t border-white/10 pt-8">

                    <h2 className="text-2xl font-black uppercase">
                        Instructions
                    </h2>

                    <div className="mt-5 space-y-4">

                        {workout.instructions.map(
                            (instruction, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 rounded-xl border border-white/10 bg-[#101217] p-4"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                                        {index + 1}
                                    </span>

                                    <p className="text-sm leading-6 text-white/60">
                                        {instruction}
                                    </p>
                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>
        </main>
    );
};

export default Page;