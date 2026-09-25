"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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

interface PlanContextType {
    plan: Workout[];
    savedWorkouts: Workout[];
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    addToSaved: (workout: Workout) => void;
    removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    // Lazy initialization to prevent cascading render warnings
    const [plan, setPlan] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("fitlog_today_plan");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("fitlog_saved");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("fitlog_today_plan", JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {
        localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    }, [savedWorkouts]);

    const addToPlan = (workout: Workout) => {
        setPlan((prev) => {
            if (prev.some((item) => item.id === workout.id)) return prev;
            return [...prev, workout];
        });
    };

    const removeFromPlan = (id: number) => {
        setPlan((prev) => prev.filter((item) => item.id !== id));
    };

    const addToSaved = (workout: Workout) => {
        setSavedWorkouts((prev) => {
            if (prev.some((item) => item.id === workout.id)) return prev;
            return [...prev, workout];
        });
    };

    const removeFromSaved = (id: number) => {
        setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                savedWorkouts,
                addToPlan,
                removeFromPlan,
                addToSaved,
                removeFromSaved,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used inside PlanProvider");
    }
    return context;
};