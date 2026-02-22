/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Shield, Lock, Eye, Trash2 } from 'lucide-react';

export default function Privacy() {
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
              PRIVACY.
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-black/10 pt-12">
              <p className="text-xl sm:text-3xl font-bold tracking-tight max-w-xl leading-[1.1]">
                Your data is your asset. <br />
                We keep it that way.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-[25deg] translate-x-1/3 pointer-events-none" />
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter">Our Commitment to Security.</h2>
              <p className="text-zinc-500 leading-relaxed">
                At TikTop Size, we understand that your product images are valuable business assets. We are committed to protecting your privacy and ensuring that your data is handled with the highest level of security.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-24">
            <section className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-400">
                <Eye className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Data Collection</span>
              </div>
              <h3 className="text-3xl font-bold">What we collect and why.</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">
                We only collect the images you upload for the sole purpose of processing them through our AI engine. We do not use your images to train our models, nor do we share them with any third parties other than our secure AI processing partners (Google Gemini API).
              </p>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-400">
                <Trash2 className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Retention</span>
              </div>
              <h3 className="text-3xl font-bold">Automatic Deletion.</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">
                To ensure your privacy, all uploaded and processed images are automatically deleted from our temporary storage servers after 24 hours. We do not maintain long-term archives of your content. Once it's gone, it's gone.
              </p>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-400">
                <Lock className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Security</span>
              </div>
              <h3 className="text-3xl font-bold">Industry-standard protection.</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">
                We use industry-standard encryption to protect your data during transmission and while it is temporarily stored on our servers. Our infrastructure is built on world-class cloud providers with rigorous security certifications.
              </p>
            </section>

            <div className="pt-24 border-t border-zinc-100">
              <p className="text-sm text-zinc-400 italic">
                Last updated: February 21, 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
