'use client';

import React from 'react';
import { CheckCircle2, Award, BookOpen, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '@/lib/assessment-data';

export default function QuizAssessor() {
  return (
    <div className="space-y-6">
      {/* Assessment Header Card */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900 rounded-2xl border border-emerald-500/30 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">Youth Growth Foundation — Internship Assessment Matrix</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Score Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Official assessment responses submitted for the <strong>AI for Networking and Security (AI Agent Development)</strong> internship. Includes rigorous mathematical proofs, architectural justifications, and academic citations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Google Form Submitted</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Candidate: <span className="text-slate-200">Yash Jain</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Email: <span className="text-slate-200">yaashjainn@gmail.com</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Contact: <span className="text-slate-200">+91 8770183178</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {ASSESSMENT_QUESTIONS.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.id}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    {item.points > 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {item.points} Points Awarded
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Correct</span>
              </div>
            </div>

            {/* Submitted Answer Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 mb-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold block text-[10px] uppercase tracking-wider mb-1">
                Yash Jain&apos;s Submitted Answer:
              </span>
              {Array.isArray(item.submittedAnswer) ? (
                <div className="space-y-1">
                  {item.submittedAnswer.map((ans, aIdx) => (
                    <div key={aIdx} className="flex items-center space-x-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{ans}</span>
                    </div>
                  ))}
                </div>
              ) : typeof item.submittedAnswer === 'object' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  {Object.entries(item.submittedAnswer).map(([concept, app]) => (
                    <div key={concept} className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block">{concept}</span>
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 block font-medium">↳ {app}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                  {item.submittedAnswer}
                </span>
              )}
            </div>

            {/* Technical Rationale */}
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
              <p className="whitespace-pre-line">{item.rationale}</p>

              {item.mathFormula && (
                <div className="p-2.5 rounded-lg bg-slate-950 text-cyan-300 font-mono text-[11px] border border-slate-800">
                  {item.mathFormula}
                </div>
              )}

              {item.citations.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-500">Academic Literature:</span>
                  {item.citations.map((cite, cIdx) => (
                    <span key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {cite}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
