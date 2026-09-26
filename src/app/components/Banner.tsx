import React from "react";
import bannerImage from "@/assets/banner.png";

const Banner = () => {
    return (
        <section className="w-full bg-[#090a0d] px-4 py-12 md:px-6">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#12141a] p-8 md:flex-row md:p-12 lg:p-16">

                {/* Left Side */}
                <div className="w-full max-w-xl">

                    {/* Eyebrow */}
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00]">
                        WORKOUT LIBRARY
                    </span>

                    {/* Heading */}
                    <h1 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                        TRAIN WITH INTENT.
                        <br />
                        LOG EVERY SET.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
                        FitLog is a dark, no-nonsense gym companion: pick a
                        lift, lock it into today&apos;s plan, and watch the
                        week&apos;s work add up.
                    </p>

                    {/* CTA */}
                    <div className="mt-8">
                        <a
                            href="#library"
                            className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:opacity-90"
                        >
                            <span>BROWSE WORKOUTS</span>
                            <span className="text-base">↓</span>
                        </a>
                    </div>
                </div>

                {/* Right Side - Banner Image */}
                <div className="mt-10 flex w-full items-center justify-center md:mt-0 md:w-1/2">
                    <img
                        src={bannerImage.src}
                        alt="Workout Banner"
                        className="h-auto max-h-[380px] w-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;