"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Plus,
  Calendar,
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import { useLanguageCopy } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardContent() {
  const { user, refetchMe } = useAuth();
  const router = useRouter();
  const params = useParams();
  const space = params.space as string;
  const { copy } = useLanguageCopy();
  const dashboardCopy = copy.dashboard;
  const [quickAddValue, setQuickAddValue] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("google") === "success") {
      refetchMe();
      router.replace(`/${space}/dashboard`);
    }
  }, [refetchMe, router, space]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickAddValue.trim()) {
      setQuickAddValue("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            {dashboardCopy.welcomeBack}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {dashboardCopy.signedInAs} {user?.email}
          </p>
        </div>
      </motion.div>

      {/* Quick Add */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleQuickAdd} className="pulse-glass rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
              <Plus size={20} className="text-emerald-300" />
            </div>
            <input
              type="text"
              value={quickAddValue}
              onChange={(e) => setQuickAddValue(e.target.value)}
              placeholder="Add a task, note, or idea..."
              className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="pulse-action-button inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
            >
              <span>Add</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* AI Insight Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
      >
        <div className="pulse-glass rounded-2xl border border-violet-300/20 bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
              <BrainCircuit size={20} className="text-violet-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-violet-300" />
                <h3 className="text-sm font-bold text-white">AI Insight</h3>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                You&apos;ve completed 8 tasks this week. Your productivity is up 23% from last week. Consider scheduling some time for deep work tomorrow.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.3 }}
      >
        <div className="pulse-glass rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={20} className="text-emerald-300" />
            <h3 className="text-lg font-bold text-white">Activity Timeline</h3>
          </div>
          <div className="space-y-4">
            {[
              { time: "2 hours ago", text: "Completed project review", icon: CheckCircle2 },
              { time: "4 hours ago", text: "Added 3 tasks to Work list", icon: Plus },
              { time: "Yesterday", text: "Updated finance tracker", icon: TrendingUp },
              { time: "2 days ago", text: "Planned weekly goals", icon: Calendar },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <activity.icon size={16} className="text-emerald-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.text}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Minimal Overview Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.5 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Tasks", value: "12", change: "+3" },
          { label: "Notes", value: "8", change: "+1" },
          { label: "Expenses", value: "$340", change: "-$45" },
          { label: "Goals", value: "5", change: "+2" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="pulse-glass rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-black text-white">{stat.value}</p>
            <p className={`mt-1 text-xs ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stat.change}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
