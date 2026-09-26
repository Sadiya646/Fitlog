"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const Library = () => {
    const router = useRouter();

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog"
                );

                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error("Failed to fetch workouts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    if (loading) {
        return (
            <section
                id="library"
                className="bg-[#090a0d] px-4 py-16 text-center text-white"
            >
                <div className="flex flex-col items-center justify-center gap-4">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

    <p className="text-sm text-white/50">
        Loading workouts...
    </p>
</div>
            </section>
        );
    }

    return (
        <section
            id="library"
            className="bg-[#090a0d] px-4 py-16 text-white"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00]">
                        Workout Library
                    </p>

                    <h2 className="mt-2 text-3xl font-black uppercase md:text-4xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Workout Cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {workouts.map((workout) => (
                        <div
                            key={workout.id}
                            onClick={() =>
                                router.push(
                                    `/workout/${workout.id}`
                                )
                            }
                            className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#12141a] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
                        >
                            {/* Image */}
                            <div className="overflow-hidden">
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-5">

                                {/* Category Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {workout.muscleGroups
                                        .slice(0, 2)
                                        .map((muscle) => (
                                            <span
                                                key={muscle}
                                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase text-[#ccff00]"
                                            >
                                                {muscle}
                                            </span>
                                        ))}
                                </div>

                                {/* Workout Name */}
                                <h3 className="mt-3 text-sm font-black uppercase tracking-wide">
                                    {workout.name}
                                </h3>

                                {/* Equipment */}
                                <p className="mt-2 text-xs text-white/40">
                                    {workout.equipment}
                                </p>

                                {/* Stats */}
                                <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4">

                                    {/* Duration */}
                                    <div className="text-center">
                                        <p className="text-[9px] font-bold uppercase tracking-wide text-white/40">
                                            Duration
                                        </p>

                                        <p className="mt-2 text-xs font-black">
                                            ⏱ {workout.duration} min
                                        </p>
                                    </div>

                                    {/* Calories */}
                                    <div className="border-x border-white/10 text-center">
                                        <p className="text-[9px] font-bold uppercase tracking-wide text-white/40">
                                            Calories
                                        </p>

                                        <p className="mt-2 text-xs font-black">
                                            🔥 {workout.caloriesBurned} kcal
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="text-center">
                                        <p className="text-[9px] font-bold uppercase tracking-wide text-white/40">
                                            Rating
                                        </p>

                                        <p className="mt-2 text-xs font-black">
                                            ⭐ {workout.rating}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Library;