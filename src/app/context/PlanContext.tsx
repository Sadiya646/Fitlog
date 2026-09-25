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

    savedWorkouts: Workout[];
    addToSaved: (workout: Workout) => void;
    removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
    undefined
);

export const PlanProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>(() => {
        if (typeof window !== "undefined") {
            const savedPlan =
                localStorage.getItem("fitlog-plan");

            if (savedPlan) {
                return JSON.parse(savedPlan);
            }
        }

        return [];
    });

    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(
        () => {
            if (typeof window !== "undefined") {
                const saved =
                    localStorage.getItem("fitlog-saved");

                if (saved) {
                    return JSON.parse(saved);
                }
            }

            return [];
        }
    );

    useEffect(() => {
        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan]);

    useEffect(() => {
        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(savedWorkouts)
        );
    }, [savedWorkouts]);

    // Add to Today's Plan
    const addToPlan = (workout: Workout) => {
        setPlan((prev) => {
            const alreadyExists = prev.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) return prev;

            if (prev.length >= 5) return prev;

            return [...prev, workout];
        });
    };

    // Remove from Today's Plan
    const removeFromPlan = (id: number) => {
        setPlan((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    // Save for Later
    const addToSaved = (workout: Workout) => {
        setSavedWorkouts((prev) => {
            const alreadyExists = prev.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) return prev;

            return [...prev, workout];
        });
    };

    // Remove from Saved
    const removeFromSaved = (id: number) => {
        setSavedWorkouts((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                addToPlan,
                removeFromPlan,
                savedWorkouts,
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
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};