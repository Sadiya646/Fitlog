import React from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className=" w-full border-t border-white/10 bg-[#090a0d] py-8 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <div className="flex items-center gap-2 text-xl font-black">
                    <img
                        src={logo.src}
                        alt="FitLog Logo"
                        className="h-6 w-6 object-contain"
                    />
                    FITLOG
                </div>

                <p className="text-center text-xs text-white/40">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;