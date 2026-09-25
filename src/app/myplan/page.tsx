"use client";



const Page = () => {
    return (
        <div className="min-h-screen bg-[#090a0d] px-4 py-10 text-white">

            {/* Heading */}
            <div className="mx-auto max-w-7xl">
                <h1 className="text-4xl font-black uppercase">
                    My Plan
                </h1>

                <p className="mt-2 text-sm text-white/50">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Metrics */}
            <div className="mx-auto mt-8 grid max-w-7xl grid-cols-3 gap-3">

                <div className="rounded-lg border border-white/10 bg-[#15171c] p-4">
                    <p className="text-xs text-white/40">
                        Exercises
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                        0
                    </h2>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#15171c] p-4">
                    <p className="text-xs text-white/40">
                        Minutes
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                        0
                    </h2>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#15171c] p-4">
                    <p className="text-xs text-white/40">
                        Calories
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                        0
                    </h2>
                </div>

            </div>

            {/* Tabs */}
            <div className="mx-auto mt-8 flex max-w-7xl gap-2">
                <button className="rounded-full bg-[#ccff00] px-5 py-2 text-xs font-black uppercase text-black">
                    Today's Plan
                </button>

                <button className="rounded-full border border-white/20 px-5 py-2 text-xs font-black uppercase text-white/50">
                    Saved
                </button>
            </div>

            {/* Empty State */}
            <div className="mx-auto mt-10 flex min-h-[300px] max-w-7xl flex-col items-center justify-center rounded-lg border border-dashed border-white/10">

                <h2 className="text-xl font-black uppercase">
                    Nothing Here Yet
                </h2>

                <p className="mt-2 text-center text-sm text-white/40">
                    Browse the library and add a lift to get today moving.
                </p>

                <a
                    href="/workout"
                    className="mt-5 rounded-full bg-[#ccff00] px-5 py-2 text-xs font-black uppercase text-black"
                >
                    Go to Workouts
                </a>

            </div>

        </div>
    );
};

export default Page;