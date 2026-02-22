/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 10MB.');
      } else {
        setError('Invalid file type. Please upload a JPG or PNG image.');
      }
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  } as any);

  const processImage = async () => {
    if (!file) return;

    if (!process.env.GEMINI_API_KEY) {
      setError('Gemini API Key is not configured. Please add GEMINI_API_KEY to your environment variables.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(10);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      setProgress(30);

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: file.type,
              },
            },
            {
              text: 'Expand this image to a 1200x1200px 1:1 square aspect ratio. Intelligently outpaint the background to fill the square while keeping the product centered and perfectly preserved. Ensure the lighting and textures match the original. The output must be a high-quality product image suitable for TikTok Shop.',
            },
          ],
        },
      });

      setProgress(80);

      let generatedImage = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          generatedImage = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (generatedImage) {
        setResult(generatedImage);
        setProgress(100);
      } else {
        throw new Error('No image was generated. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      let userMessage = 'Something went wrong while processing your image.';
      
      if (err.message?.includes('API_KEY')) {
        userMessage = 'Gemini API Key is missing. Please configure it in your environment variables.';
      } else if (err.message?.includes('safety')) {
        userMessage = 'The image was flagged by safety filters. Please try a different image.';
      } else if (err.message?.includes('fetch')) {
        userMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.message) {
        userMessage = err.message;
      }
      
      setError(userMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `tiktop-size-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="w-full">
      {/* Hero Section - Screenshot 1 Style */}
      <section className="bg-brand-soft pt-32 pb-40 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col gap-24"
          >
            <h1 className="editorial-title text-[14vw] sm:text-[12vw] leading-[0.8]">
              <div className="overflow-hidden">
                <motion.span 
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block"
                >
                  PERFECTLY
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block"
                >
                  SQUARE.
                </motion.span>
              </div>
            </h1>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-black/10 pt-12"
            >
              <p className="text-xl sm:text-3xl font-bold tracking-tight max-w-xl leading-[1.1]">
                Connecting to this tool to grow <br />
                your TikTok Shop brand with AI.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 212, 216, 1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-zinc-200/80 backdrop-blur-sm text-black rounded-full font-bold text-lg transition-all shadow-lg shadow-black/5"
              >
                Start resizing
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Geometric light effect from screenshot */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-[25deg] translate-x-1/3 pointer-events-none" />
      </section>

      {/* Upload Section - Screenshot 2 Style */}
      <section id="upload-section" className="py-32 px-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="max-w-5xl mx-auto mb-24">
            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  {...getRootProps()}
                  className={cn(
                    "relative aspect-[21/9] rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-6 p-12 bg-white hover:bg-zinc-50/50",
                    isDragActive ? "border-black bg-zinc-50" : error ? "border-red-300 bg-red-50/30" : "border-zinc-200"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                    error ? "bg-red-100" : "bg-[#FDE2E4]"
                  )}>
                    <Upload className={cn("w-8 h-8", error ? "text-red-600" : "text-black")} />
                  </div>
                  <div className="text-center">
                    <p className={cn("text-2xl font-bold mb-1", error && "text-red-600")}>
                      {error ? "Try another photo" : "Drag & drop your product photo"}
                    </p>
                    <p className="text-zinc-400 font-medium">JPG, PNG up to 10MB</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Original Preview */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Original</h3>
                        <button onClick={reset} className="text-xs font-bold hover:underline">Change</button>
                      </div>
                      <div className="aspect-square rounded-3xl bg-zinc-50 overflow-hidden border border-zinc-100">
                        <img src={preview} alt="Original" className="w-full h-full object-contain" />
                      </div>
                    </div>

                    {/* Result Preview */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Result</h3>
                        {result && <span className="text-xs font-bold text-emerald-600">Ready</span>}
                      </div>
                      <div className="aspect-square rounded-3xl bg-zinc-50 overflow-hidden border border-zinc-100 relative">
                        {isProcessing ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md z-20 p-12">
                            <div className="w-full max-w-[200px] space-y-6 text-center">
                              <div className="relative h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <motion.div 
                                  className="absolute inset-y-0 left-0 bg-black"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ 
                                    duration: 0.8, 
                                    ease: [0.33, 1, 0.68, 1] // Custom easeOutQuart for fluidity
                                  }}
                                />
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                                  AI Processing
                                </p>
                                <motion.p 
                                  key={progress}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-[10px] font-medium text-zinc-400 tabular-nums"
                                >
                                  {progress}% Complete
                                </motion.p>
                              </div>
                            </div>
                          </div>
                        ) : result ? (
                          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={result} alt="Result" className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300 p-8 text-center">
                            <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                            <p className="text-xs font-bold uppercase tracking-widest">Awaiting AI</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {!result ? (
                      <button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="px-12 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 disabled:opacity-50 transition-all"
                      >
                        {isProcessing ? "Processing..." : "Make it TikTok Ready"}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={downloadResult}
                          className="px-12 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
                        >
                          <Download className="w-5 h-5" />
                          Download
                        </button>
                        <button
                          onClick={reset}
                          className="px-12 py-5 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all"
                        >
                          Start New
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex flex-col sm:flex-row items-center gap-4 text-red-600 text-center sm:text-left"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">Upload Issue</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="px-6 py-2 bg-white border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </div>

          {/* Features Grid - Screenshot 2 Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="font-serif italic text-4xl text-zinc-300">01</span>
              <h3 className="text-2xl font-bold">Upload</h3>
              <p className="text-zinc-500 leading-relaxed">
                Drop any product photo. We handle portrait, landscape, and everything in between.
              </p>
            </div>
            <div className="space-y-4">
              <span className="font-serif italic text-4xl text-zinc-300">02</span>
              <h3 className="text-2xl font-bold">AI Outpaint</h3>
              <p className="text-zinc-500 leading-relaxed">
                Our AI intelligently fills the background to create a perfect 1:1 square without cropping your product.
              </p>
            </div>
            <div className="space-y-4">
              <span className="font-serif italic text-4xl text-zinc-300">03</span>
              <h3 className="text-2xl font-bold">Go Live</h3>
              <p className="text-zinc-500 leading-relaxed">
                Download your 1200x1200px image, optimized and ready for your TikTok Shop listing.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Method Section */}
      <section className="bg-brand-black text-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="editorial-title text-6xl sm:text-8xl mb-8">The <br /> Method.</h2>
            <p className="text-zinc-400 text-xl leading-relaxed">
              Bespoke AI outpainting for a select global clientele of TikTok Shop sellers.
            </p>
          </div>

          <div className="space-y-px bg-white/10">
            {[
              { title: "Strategic", desc: "We don't just resize; we intelligently expand based on product context." },
              { title: "Less talk, more action.", desc: "Upload, click, download. No complex settings or sliders." },
              { title: "Design-centric.", desc: "Every output is optimized for visual appeal and conversion." },
              { title: "Mindset.", desc: "Built for sellers who value speed and professional quality." },
              { title: "Location independent.", desc: "Process your images from anywhere, on any device." }
            ].map((item, i) => (
              <div key={i} className="group bg-brand-black py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/5 transition-colors px-4 -mx-4">
                <h3 className="text-2xl font-medium">{item.title}</h3>
                <p className="text-zinc-500 max-w-md text-sm sm:text-right group-hover:text-zinc-300 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
