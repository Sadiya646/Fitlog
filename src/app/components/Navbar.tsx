import React from 'react';
import logo from "@/assets/logo.png"
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <nav className="w-full bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              {/* Left side: Logo */}
              <div>
               <img src={logo.src} alt="" className="w-8 h-8 object-contain"/>
              </div>

              {/* Middle: Navigation Links */}
              {/* <div className="flex items-center space-x-1 bg-[#ffdddd] p-1 rounded-full border border-zinc-800">
                <Link 
                  href="/workouts" 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    pathname === '/workouts' 
                      ? 'bg-[#242b15] text-[#ccff00]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Workout
                </Link>
                <Link 
                  href="/my-plan" 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    pathname === '/my-plan' 
                      ? 'bg-[#242b15] text-[#ccff00]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  My Plan
                </Link>
              </div> */}

              {/* Right side: Status Badges (Counters) */}
              <div className="flex items-center space-x-6">
                {/* Plan badge = filled pill with accent background (#ccff00) */}
                <div className="flex items-center space-x-2 text-sm text-zinc-300">
                  <span>Plan</span>
                  <span className="bg-[#ccff00] text-black font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                {/* Saved badge = pill with outline/border only */}
                <div className="flex items-center space-x-2 text-sm text-zinc-300">
                  <span>Saved</span>
                  <span className="bg-transparent text-zinc-300 border border-zinc-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </nav>
        </div>
    );
};

export default Navbar;