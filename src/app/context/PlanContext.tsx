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
    addToPlan: (workout: Workout) => boolean;
    removeFromPlan: (id: number) => void;
    savedWorkouts: Workout[];
    addToSaved: (workout: Workout) => void;
    removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<
    PlanContextType | undefined
>(undefined);

export const PlanProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [savedWorkouts, setSavedWorkouts] =
        useState<Workout[]>([]);

    useEffect(() => {
        const savedPlan =
            localStorage.getItem("fitlog-plan");

        const saved =
            localStorage.getItem("fitlog-saved");

        if (savedPlan) {
            setPlan(JSON.parse(savedPlan));
        }

        if (saved) {
            setSavedWorkouts(JSON.parse(saved));
        }
    }, []);

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

   const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
        return false;
    }

    if (
        plan.some(
            (item) => item.id === workout.id
        )
    ) {
        return false;
    }

    setPlan((prev) => [...prev, workout]);

    return true;
};



    const removeFromPlan = (id: number) => {
        setPlan((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );
    };

    const addToSaved = (workout: Workout) => {
        setSavedWorkouts((prev) => {
            if (
                prev.some(
                    (item) => item.id === workout.id
                )
            ) {
                return prev;
            }

            return [...prev, workout];
        });
    };

    const removeFromSaved = (id: number) => {
        setSavedWorkouts((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
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