'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Zap, Sliders, AlertTriangle, ArrowRight, Check } from 'lucide-react';

export default function AdversarialDefense() {
  const [epsilon, setEpsilon] = useState<number>(0.15);
  const [isAttacked, setIsAttacked] = useState<boolean>(true);

  // When epsilon is high and no defense, vanilla classifier fails
  const vanillaAccuracy = Math.max(12, Math.round(98 - epsilon * 400));
  const protectedAccuracy = 99;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Adversarial Evasion Attack & Feature Sanitizer Defense
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              An <strong>Evasion Attack</strong> subtly perturbs test-time network traffic metadata (inter-arrival jitter Δt, dummy packet padding Δbytes, and TCP window scaling) to nudge feature vectors across the machine learning decision boundary without altering the underlying malicious exploit. NetPulse neutralizes evasion via feature quantization and randomized smoothing.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAttacked(!isAttacked)}
              data-testid="toggle-evasion-btn"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAttacked
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isAttacked ? 'Evasion Attack Active' : 'Clean Benign Traffic'}
            </button>
          </div>
        </div>

        {/* Epsilon Perturbation Slider */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span>Adversarial Perturbation Budget (ε L-infinity norm):</span>
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{epsilon.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.25"
            step="0.01"
            value={epsilon}
            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>ε = 0.02 (Sub-perceptual Jitter: ±2ms)</span>
            <span>ε = 0.25 (Aggressive Padding: ±120 Bytes)</span>
          </div>
        </div>

        {/* Side-by-side Pipeline Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unprotected Vanilla Classifier */}
          <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Standard Deep Learning Classifier</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300">
                Vulnerable to Evasion
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-red-200/60 dark:border-red-900/40">
                <span className="text-slate-600 dark:text-slate-400">Incoming Flow:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {isAttacked ? 'Malicious SYN-Flood + ε Jitter' : 'Normal Web Traffic'}
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-red-200/60 dark:border-red-900/40">
                <span className="text-slate-600 dark:text-slate-400">Model Decision:</span>
                <span className={`font-mono font-bold ${isAttacked ? 'text-red-600 dark:text-red-400' : 'text-emerald-600'}`}>
                  {isAttacked ? 'CLASSIFIED AS BENIGN (EVADED)' : 'BENIGN (CORRECT)'}
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-red-200/60 dark:border-red-900/40">
                <span className="text-slate-600 dark:text-slate-400">Detection Accuracy:</span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400">
                  {isAttacked ? `${vanillaAccuracy}% (High False Negative)` : '98%'}
                </span>
              </div>
            </div>
          </div>

          {/* NetPulse Sanitized Defense */}
          <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>NetPulse Adversarial Feature Sanitizer</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                Certified Robust
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="text-slate-600 dark:text-slate-400">Sanitizer Transform:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  Discrete 20ms Quantization + Random Smoothing
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="text-slate-600 dark:text-slate-400">Model Decision:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {isAttacked ? 'MALICIOUS_INTRUSION (BLOCKED)' : 'BENIGN (CORRECT)'}
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="text-slate-600 dark:text-slate-400">Detection Accuracy:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {protectedAccuracy}% (Attack Defeated)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
