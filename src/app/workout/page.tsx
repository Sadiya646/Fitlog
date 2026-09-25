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

const Page = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => res.json())
            .then((data: Workout[]) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#090a0d]">
                <p className="text-sm font-bold uppercase text-[#ccff00]">
                    Loading workouts...
                </p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#090a0d] px-4 py-10 text-white">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black uppercase">
                        The Library
                    </h1>

                    <p className="mt-2 text-sm text-white/50">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {workouts.map((workout) => (
                        <Link
                            href={`/workout/${workout.id}`}
                            key={workout.id}
                            className="group overflow-hidden rounded-lg border border-white/10 bg-[#15171c] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
                        >

                            {/* Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-4">

                                {/* Category */}
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {workout.muscleGroups.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-black uppercase text-black"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>

                                {/* Workout Name */}
                                <h2 className="text-sm font-black uppercase">
                                    {workout.name}
                                </h2>

                                {/* Equipment */}
                                <p className="mt-1 text-[11px] text-white/40">
                                    {workout.equipment}
                                </p>

                                {/* Stats */}
                                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">

                                    <span className="text-[10px] text-white/50">
                                        ⏱ {workout.duration} min
                                    </span>

                                    <span className="text-[10px] text-white/50">
                                        🔥 {workout.caloriesBurned} kcal
                                    </span>

                                    <span className="text-[10px] text-white/50">
                                        ⭐ {workout.rating}
                                    </span>

                                </div>

                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Page;