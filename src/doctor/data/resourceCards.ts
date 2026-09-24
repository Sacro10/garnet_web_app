import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  BookText,
  ClipboardCheck,
  ClipboardList,
  Dna,
  FileSearch,
  Film,
  FlaskConical,
  GraduationCap,
  UserRoundPlus,
  Video,
} from "lucide-react";

export type ResourceMode = "educational" | "practical";

export type ResourceCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  route?: string;
};

export const educationalCards: ResourceCard[] = [
  {
    id: "why-genetic-testing-in-nephrology",
    title: "Why Genetic Testing in Nephrology?",
    subtitle: "Diagnosis, management, and family care",
    icon: Dna,
    route: "/doctor/dashboard/resource/why-genetic-testing-in-nephrology",
  },
  {
    id: "common-genetic-kidney-diseases",
    title: "Common Genetic Kidney Diseases",
    subtitle: "Short overviews of most common rare diseases",
    icon: BookText,
    route: "/doctor/dashboard/resource/common-genetic-kidney-diseases",
  },
  {
    id: "risks-not-offering",
    title: "Risks: Not Offering Testing",
    subtitle: "Missed diagnosis opportunities",
    icon: AlertTriangle,
    route: "/doctor/dashboard/resource/risks-not-offering",
  },
  {
    id: "case-studies",
    title: "Patients' Stories",
    subtitle: "Hear the patient's voices",
    icon: Film,
    route: "/doctor/dashboard/resource/case-studies",
  },
  {
    id: "genetic-testing-counseling-videos",
    title: "Educational Videos",
    subtitle: "Webinars, playlists, and explainers",
    icon: Video,
    route: "/doctor/dashboard/resource/genetic-testing-counseling-videos",
  },
  {
    id: "quizzes",
    title: "Quizzes",
    subtitle: "Literacy checkpoints",
    icon: ClipboardCheck,
    route: "/doctor/dashboard/resource/quizzes",
  },
  {
    id: "external-training",
    title: "External Training for Nephrologists",
    subtitle: "Guidelines, webinars, CME",
    icon: GraduationCap,
    route: "/doctor/dashboard/resource/external-training",
  },
  {
    id: "renal-patient-organizations",
    title: "Patients' Organizations",
    subtitle: "Patient support and referral resources",
    icon: BookOpen,
    route: "/doctor/dashboard/resource/renal-patient-organizations",
  },
  {
    id: "peer-reviewed-papers",
    title: "Peer-Reviewed Papers",
    subtitle: "Evidence and literature",
    icon: FileSearch,
    route: "/doctor/dashboard/resource/peer-reviewed-papers",
  },
];

export const practicalCards: ResourceCard[] = [
  {
    id: "identify-patient",
    title: "Identify the Patient",
    subtitle: "Clinical screening questionnaire",
    icon: ClipboardList,
    route: "/doctor/dashboard/resource/genetic-testing-risks",
  },
  {
    id: "refer-genetic-counselor",
    title: "Refer to Genetic Counselor",
    subtitle: "Specialist counseling support",
    icon: UserRoundPlus,
    route: "/doctor/counselors",
  },
  {
    id: "order-testing-directly",
    title: "Order Testing Directly",
    subtitle: "Clinician-led ordering toolkit",
    icon: FlaskConical,
    route: "/doctor/dashboard/resource/order-testing-directly",
  },
];

export const modeSummary: Record<ResourceMode, { title: string; description: string }> = {
  educational: {
    title: "Educational Materials",
    description: "Guidelines, videos, training, and literature",
  },
  practical: {
    title: "Practical Tools",
    description: "Clinical screening, counseling referral, and direct test ordering",
  },
};
