/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Check, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for new sellers getting started.",
      features: [
        "5 images per day",
        "Standard processing speed",
        "1200x1200px output",
        "Basic AI outpainting",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      description: "For growing brands with high volume.",
      features: [
        "Unlimited images",
        "Priority processing speed",
        "4K High-Res output",
        "Advanced subject preservation",
        "AI Image Analysis & Edits",
        "Thinking Mode reasoning"
      ],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large agencies and marketplaces.",
      features: [
        "API access",
        "Dedicated account manager",
        "Custom AI model training",
        "SLA & uptime guarantees",
        "Bulk batch processing",
        "White-label options"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const comparison = [
    { feature: "Daily Image Limit", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Max Resolution", free: "1.2K", pro: "4K", enterprise: "8K+" },
    { feature: "AI Model", free: "Flash", pro: "Pro Image", enterprise: "Custom" },
    { feature: "Processing Speed", free: "Standard", pro: "Priority", enterprise: "Dedicated" },
    { feature: "Image Analysis", free: "—", pro: "Included", enterprise: "Advanced" },
    { feature: "Thinking Mode", free: "—", pro: "Included", enterprise: "Included" },
    { feature: "API Access", free: "—", pro: "—", enterprise: "Included" },
    { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
  ];

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
              PRICING.
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-black/10 pt-12">
              <p className="text-xl sm:text-3xl font-bold tracking-tight max-w-xl leading-[1.1]">
                Simple, transparent plans for <br />
                every stage of growth.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-[25deg] translate-x-1/3 pointer-events-none" />
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-12 rounded-[3rem] border transition-all duration-500 ${
                plan.popular 
                  ? 'border-black bg-white scale-105 z-10 shadow-2xl shadow-black/5' 
                  : 'border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-6 py-2 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-zinc-400 font-medium text-xl">{plan.period}</span>}
                </div>
                <p className="text-zinc-500 text-sm mt-6 leading-relaxed">{plan.description}</p>
              </div>

              <div className="h-px bg-zinc-100 mb-12" />

              <ul className="space-y-6 mb-12">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-4 text-sm">
                    <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-zinc-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/auth?mode=signup"
                className={`w-full py-5 rounded-2xl text-center text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-black text-white hover:bg-zinc-800'
                    : 'bg-white border border-zinc-200 text-black hover:bg-zinc-50'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-32 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="editorial-title text-5xl sm:text-6xl mb-6">Compare <br /> Features.</h2>
            <p className="text-zinc-500 text-xl leading-relaxed">
              A detailed breakdown of what's included in each plan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="py-8 text-xs font-bold uppercase tracking-widest text-zinc-400">Feature</th>
                  <th className="py-8 text-xl font-bold">Free</th>
                  <th className="py-8 text-xl font-bold">Pro</th>
                  <th className="py-8 text-xl font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {comparison.map((row, i) => (
                  <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="py-8 text-zinc-600 font-medium">{row.feature}</td>
                    <td className="py-8 text-zinc-500">{row.free}</td>
                    <td className="py-8 font-bold">{row.pro}</td>
                    <td className="py-8 text-zinc-500">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-zinc-50 py-32 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="editorial-title text-5xl sm:text-6xl mb-6">Common <br /> Questions.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
            {[
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings. You'll maintain access until the end of your billing period." },
              { q: "Do you offer bulk discounts?", a: "For agencies processing more than 1,000 images per month, please contact our sales team for custom enterprise pricing." },
              { q: "What image formats are supported?", a: "We currently support JPG and PNG files up to 10MB in size. We recommend high-resolution originals for the best outpainting results." },
              { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and automatically delete all processed images after 24 hours." }
            ].map((faq, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-xl font-bold">{faq.q}</h4>
                <p className="text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
