import React from 'react';
import bannerImage from "@/assets/banner.png"
import Link from 'next/link';
const Banner = () => {
    return (
        <div className="w-full bg-[#111111] px-6 py-12 flex justify-center">
            <div className="w-full max-w-6xl bg-[#18181b] border border-zinc-800 rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
                
                {/* Left Side: Text Content */}
                <div className="max-w-xl space-y-6">
                    <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
                        Workout Library
                    </span>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h1>
                    
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                    </p>
                    
                    <div>
                        <Link 
                            href="/workouts" 
                            className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b3e600] transition"
                        >
                            BROWSE WORKOUTS
                        </Link>
                    </div>
                </div>

                {/* Right Side: Image Placeholder */}
                <div className="mt-8 md:mt-0 relative w-full md:w-1/2 h-72 md:h-96 flex items-center justify-center">
                    <img 
                        src={bannerImage.src} 
                        alt="Workout Banner Illustration" 
                        className="object-contain max-h-full"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;