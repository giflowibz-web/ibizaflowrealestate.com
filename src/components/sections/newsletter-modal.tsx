"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, MoveRight } from "lucide-react";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Blurred Architectural Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 blur-md scale-105"
        style={{ 
          backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/images_1.png')`,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Close Button */}
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-8 right-8 text-white hover:text-accent transition-colors duration-300 z-10"
        aria-label="Close modal"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* Modal Content */}
      <div className="relative w-full max-w-[680px] bg-[#141414] p-10 md:p-16 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center space-y-6">
          <span className="text-accent-caps text-[10px] tracking-[0.3em]">JOIN</span>
          
          <h2 className="font-display text-white text-3xl md:text-[42px] leading-tight tracking-wide">
            MY EXCLUSIVE LIST
          </h2>
          
          <p className="text-[#A3A3A3] font-body text-sm leading-relaxed max-w-[500px]">
            Get Exclusive Access about Featured Listings, Insider Real Estate Market Updates, Behind-the-scenes Interviews, and much more!
          </p>

          <form className="w-full mt-8 space-y-8 text-left">
            <div className="relative group">
              <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                Full Name *
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-transparent"
              />
            </div>

            <div className="relative group">
              <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                Phone *
              </label>
              <input 
                type="tel" 
                required
                className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-accent transition-colors duration-300"
              />
            </div>

            <div className="relative group">
              <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                Email *
              </label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-accent transition-colors duration-300"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="relative flex items-center h-5">
                <input
                  id="consent"
                  type="checkbox"
                  className="w-4 h-4 rounded-none bg-transparent border-[#333333] text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </div>
              <label htmlFor="consent" className="text-[10px] text-[#737373] leading-relaxed font-body">
                I agree to be contacted by Aaron Kirman via call, email, and text for real estate services. To opt out, you can reply "stop" at any time or reply "help" for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.{" "}
                <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
              </label>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                type="submit"
                className="group relative flex items-center justify-center gap-4 bg-accent text-white px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#A38B61]"
              >
                SUBMIT
                <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;