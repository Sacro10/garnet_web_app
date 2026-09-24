import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { BookOpen, MapPinned } from "lucide-react";
import type { ResourceMode } from "../data/resourceCards";
import { DoctorPageShell, doctorSerifFont } from "../components/DoctorShell";


export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Clinician");
      localStorage.setItem("userRole", "doctor");
    }
  }, []);

  const goToMode = (mode: ResourceMode) => {
    navigate(`/doctor/dashboard/${mode}`);
  };

  return (
    <DoctorPageShell>
        <motion.section
          key="home"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
        >
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
            <h1 className="font-bold text-[2.2rem] leading-tight text-[#16323b] sm:text-5xl" style={{ fontFamily: doctorSerifFont }}>
              Doctor dashboard
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#5b6472]">
              Choose what you need.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            <ModePanelCard
              title="Educational Materials"
              description="Guidelines, videos, and literature."
              icon={BookOpen}
              accent="teal"
              onClick={() => goToMode("educational")}
            />
            <ModePanelCard
              title="Practical Tools"
              description="Workflows, referrals, and templates."
              icon={MapPinned}
              accent="coral"
              onClick={() => goToMode("practical")}
            />
          </div>
        </motion.section>
    </DoctorPageShell>
  );
}

type ModePanelCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "teal" | "coral";
  onClick: () => void;
};

function ModePanelCard({ title, description, icon: Icon, accent, onClick }: ModePanelCardProps) {
  const accentClasses =
    accent === "teal"
      ? {
          chip: "bg-[#cfe7ea] text-[#00687b]",
        }
      : {
          chip: "bg-[#f4d8d2] text-[#9f4035]",
        };

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className="group flex min-h-[320px] w-full flex-col items-center justify-center rounded-3xl border border-[#c3d6d9] bg-white p-6 text-center shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] transition-all hover:border-[#9fbfc5] hover:shadow-[0_18px_44px_-18px_rgba(12,48,58,0.24),0_4px_12px_-4px_rgba(12,48,58,0.1)] sm:p-8 lg:p-10"
    >
      <div className={`mb-7 flex h-28 w-28 items-center justify-center rounded-[2rem] ${accentClasses.chip}`}>
        <Icon className="h-16 w-16" strokeWidth={1.55} />
      </div>
      <h2 className="font-bold text-[1.9rem] leading-tight text-[#16323b] sm:text-[2.3rem]" style={{ fontFamily: doctorSerifFont }}>
        {title}
      </h2>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-[#3f4650]">
        {description}
      </p>
    </motion.button>
  );
}
