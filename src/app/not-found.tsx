import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#090a0d] px-4 text-white">
            <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ccff00]">
                    FitLog
                </p>

                <h1 className="mt-4 text-7xl font-black">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-black uppercase">
                    Page Not Found
                </h2>

                <p className="mt-3 text-sm text-white/50">
                    The page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
                >
                    Go to Workouts
                </Link>
            </div>
        </main>
    );
};

export default NotFound;