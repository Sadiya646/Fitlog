"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

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
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // localStorage থেকে শুরুতেই data load করবে
    const [plan, setPlan] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            const savedPlan = localStorage.getItem("fitlog-plan");

            if (savedPlan) {
                return JSON.parse(savedPlan);
            }
        }

        return [];
    });

    // Plan change হলে localStorage-এ save করবে
    useEffect(() => {
        localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }, [plan]);

    // Add workout
    const addToPlan = (workout: Workout) => {
        setPlan((prev) => {
            // আগে থেকেই থাকলে আবার add করবে না
            const alreadyExists = prev.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return prev;
            }

            // Maximum 5 workouts
            if (prev.length >= 5) {
                return prev;
            }

            return [...prev, workout];
        });
    };

    // Remove workout
    const removeFromPlan = (id: number) => {
        setPlan((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                addToPlan,
                removeFromPlan,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};