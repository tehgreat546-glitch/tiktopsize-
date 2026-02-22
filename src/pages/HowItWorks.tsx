/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-soft pt-32 pb-40 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-24"
          >
            <h1 className="editorial-title text-[14vw] sm:text-[12vw] leading-[0.8]">
              THE <br />
              PROCESS.
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-black/10 pt-12">
              <p className="text-xl sm:text-3xl font-bold tracking-tight max-w-xl leading-[1.1]">
                The science behind perfect <br />
                TikTok Shop product images.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-[25deg] translate-x-1/3 pointer-events-none" />
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="space-y-48">
          {/* Step 1 */}
          <section className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 block">Step 01</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">Upload Your<br />Product Photo.</h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                Start by uploading any product image. Whether it's a vertical shot from your phone or a wide landscape photo from a professional camera, our AI can handle it. We support JPG and PNG up to 10MB.
              </p>
            </motion.div>
            <div className="bg-zinc-50 aspect-square rounded-[3rem] border border-zinc-100 flex items-center justify-center relative overflow-hidden group">
               <Zap className="w-24 h-24 text-zinc-200 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </section>

          {/* Step 2 */}
          <section className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 block">Step 02</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">AI Outpainting<br />& Resizing.</h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                Instead of simply cropping your image and losing valuable product details, our Gemini-powered AI "outpaints" the background. It analyzes the textures, lighting, and colors to expand the scene into a perfect 1:1 square.
              </p>
            </motion.div>
            <div className="bg-zinc-50 aspect-square rounded-[3rem] border border-zinc-100 flex items-center justify-center md:order-1 relative overflow-hidden group">
               <Sparkles className="w-24 h-24 text-zinc-200 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </section>

          {/* Step 3 */}
          <section className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 block">Step 03</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">Download<br />& List.</h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                In seconds, you get a high-resolution 1200x1200px image that is fully compliant with TikTok Shop's requirements. Download it and upload directly to your seller center.
              </p>
              <Link 
                to="/auth?mode=signup"
                className="inline-flex items-center gap-2 mt-10 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all"
              >
                Start now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="bg-zinc-50 aspect-square rounded-[3rem] border border-zinc-100 flex items-center justify-center relative overflow-hidden group">
               <CheckCircle2 className="w-24 h-24 text-zinc-200 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </section>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-brand-black text-white py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 mx-auto mb-12 text-white/10" />
            <h3 className="editorial-title text-6xl sm:text-8xl mb-8">Privacy is our<br />priority.</h3>
            <p className="text-zinc-500 max-w-xl mx-auto text-xl leading-relaxed">
              We process your images securely and delete them from our servers automatically after 24 hours. Your data is never used for training.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
