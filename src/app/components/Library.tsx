"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                return res.json();
            })
            .then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="bg-[#090a0d] px-4 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Header */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                        Workout Library
                    </p>

                    <h2 className="mt-2 text-3xl font-black uppercase md:text-4xl">
                        Choose Your Workout
                    </h2>

                    <p className="mt-2 max-w-xl text-sm text-white/50">
                        Explore workouts and choose the right one for your
                        training session.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-sm text-white/50">
                            Loading workouts...
                        </p>
                    </div>
                )}

                {/* Workout Cards */}
                {!loading && workouts.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {workouts.map((workout) => (
                            <Link
                                href={`/workout/${workout.id}`}
                                key={workout.id}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#12141a] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={workout.image}
                                        alt={workout.name}
                                        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase text-white">
                                        {workout.difficulty}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-5">
                                    {/* Muscle Groups */}
                                    <div className="flex flex-wrap gap-2">
                                        {workout.muscleGroups.map((muscle) => (
                                            <span
                                                key={muscle}
                                                className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-black uppercase text-black"
                                            >
                                                {muscle}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Name */}
                                    <h3 className="mt-4 text-lg font-black uppercase">
                                        {workout.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/50">
                                        {workout.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                                        <div>
                                            <p className="text-[9px] uppercase text-white/30">
                                                Time
                                            </p>

                                            <p className="mt-1 text-xs font-bold">
                                                {workout.duration} min
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[9px] uppercase text-white/30">
                                                Calories
                                            </p>

                                            <p className="mt-1 text-xs font-bold">
                                                {workout.caloriesBurned}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[9px] uppercase text-white/30">
                                                Rating
                                            </p>

                                            <p className="mt-1 text-xs font-bold">
                                                ⭐ {workout.rating}
                                            </p>
                                        </div>
                                    </div>

                                    {/* View Details */}
                                    <div className="mt-5 text-xs font-black uppercase tracking-wider text-[#ccff00]">
                                        View Details →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* No Data */}
                {!loading && workouts.length === 0 && (
                    <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-white/10">
                        <p className="text-sm text-white/40">
                            No workouts found.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Library;