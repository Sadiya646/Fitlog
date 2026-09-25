"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Workout {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
}

const Library = () => {

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => res.json())
            .then((data) => {
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
            <div className="flex justify-center py-20">
                <p className="font-bold text-[#ccff00]">
                    Loading workouts...
                </p>
            </div>
        );
    }

    return (
        <section
            id="library"
            className="px-4 py-10"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <h2 className="text-3xl font-black uppercase text-white">
                    The Library
                </h2>

                <p className="mt-2 text-sm text-white/50">
                    Twelve lifts covering every major muscle group.
                </p>

                {/* Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {workouts.map((workout) => (

                        <Link
                            key={workout.id}
                            href={`/workout/${workout.id}`}
                            className="overflow-hidden rounded-lg border border-white/10 bg-[#15171c] transition hover:border-[#ccff00]"
                        >

                            {/* Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4">

                                {/* Tags */}
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {workout.muscleGroups.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-black uppercase text-black"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>

                                {/* Name */}
                                <h3 className="text-sm font-black uppercase text-white">
                                    {workout.name}
                                </h3>

                                {/* Equipment */}
                                <p className="mt-1 text-[14px] text-white/40">
                                    {workout.equipment}
                                </p>

                                {/* Stats */}
                                <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-[13px] text-white/50">
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

                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Library;