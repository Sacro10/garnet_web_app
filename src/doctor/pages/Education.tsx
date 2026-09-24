import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
  Lock,
  Sparkles,
  TestTube,
  Users,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  category: "patient" | "clinician" | "both";
  routeModuleId?: string;
}

interface ReferenceLink {
  label: string;
  url: string;
}

interface ReferenceItem {
  citation: string;
  links?: ReferenceLink[];
}

interface RenalPatientOrganization {
  label: string;
  domainLabel: string;
  url: string;
}

const COMPLETED_MODULES_KEY = "educationCompletedModules";

function readCompletedModuleIds() {
  try {
    const raw = localStorage.getItem(COMPLETED_MODULES_KEY);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set<string>();
  }
}

const modules: Module[] = [
  {
    id: "1",
    title: "KDIGO Genetics in CKD Webinar series",
    description: "Comprehensive webinar series on genetics in chronic kidney disease",
    duration: "9h 57m 13s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "1",
  },
  {
    id: "2",
    title: "KDIGO Webinar Series on Implementing Genetic Testing for CKD in the Real World Setting",
    description: "Practical implementation strategies for genetic testing in clinical practice",
    duration: "4h 3m 36s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "2",
  },
  {
    id: "3",
    title: "Demystifying Genetic Testing",
    description: "Breaking down complex genetic testing concepts into understandable insights",
    duration: "12m 10s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "3",
  },
  {
    id: "4",
    title: "The Art and Science of Genetic Counseling in Nephrology",
    description: "Expert guidance on genetic counseling approaches in kidney disease",
    duration: "11m 58s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "4",
  },
  {
    id: "5",
    title: "Talking About Genetics with Individuals with Kidney Disease – The Basics",
    description: "Essential communication strategies for discussing genetics with patients",
    duration: "37m 14s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "5",
  },
  {
    id: "6",
    title: "Introduction to Genetic Testing and Counseling in Nephrology",
    description: "Foundation course covering genetic testing and counseling fundamentals",
    duration: "1h 5m 22s",
    completed: false,
    locked: false,
    category: "clinician",
    routeModuleId: "6",
  },
  {
    id: "7",
    title: "Common Genetic Kidney Diseases",
    description: "Clinical indications and benefits of genetic testing in nephrology care",
    duration: "8 min read",
    completed: false,
    locked: false,
    category: "both",
    routeModuleId: "7",
  },
  {
    id: "8",
    title: "Who should get tested ?",
    description: "Red flags that indicate when genetic testing should be considered",
    duration: "8 min read",
    completed: false,
    locked: false,
    category: "both",
    routeModuleId: "8",
  },
];

const references: ReferenceItem[] = [
  {
    citation:
      "Bogyo K, Vena N, Milo Rasouly H. The Art and Science of Genetic Counseling in Nephrology. Kidney360. 2025 Apr 23;6(7):1230-1244.",
    links: [
      { label: "doi: 10.34067/KID.0000000825", url: "https://doi.org/10.34067/KID.0000000825" },
      { label: "PMID: 40269595", url: "https://pubmed.ncbi.nlm.nih.gov/40269595/" },
      { label: "PMCID: PMC12338368", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12338368/" },
    ],
  },
  {
    citation:
      "Groopman EE, et al. Diagnostic Utility of Exome Sequencing for Kidney Disease. N Engl J Med. 2019 Jan 10;380(2):142-151.",
    links: [
      { label: "doi: 10.1056/NEJMoa1806891", url: "https://doi.org/10.1056/NEJMoa1806891" },
      { label: "PMID: 30586318", url: "https://pubmed.ncbi.nlm.nih.gov/30586318/" },
      { label: "PMCID: PMC6510541", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6510541/" },
    ],
  },
  {
    citation:
      "Genetics in chronic kidney disease: conclusions from a KDIGO Controversies Conference. Kidney International. Volume 101, Issue 6, 1126-1141.",
  },
  {
    citation:
      "Franceschini N, Feldman DL, Berg JS, et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. Am J Kidney Dis. 2024 Dec;84(6):751-766.",
    links: [
      { label: "doi: 10.1053/j.ajkd.2024.05.010", url: "https://doi.org/10.1053/j.ajkd.2024.05.010" },
      { label: "PMID: 39033956", url: "https://pubmed.ncbi.nlm.nih.gov/39033956/" },
      { label: "PMCID: PMC11585423", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11585423/" },
    ],
  },
];

const renalPatientOrganizations: RenalPatientOrganization[] = [
  {
    label: "Alport Syndrome Foundation",
    domainLabel: "alportsyndrome.org",
    url: "https://alportsyndrome.org/",
  },
  {
    label: "American Kidney Fund (AKF)",
    domainLabel: "kidneyfund.org",
    url: "https://www.kidneyfund.org/",
  },
  {
    label: "Dent Disease Foundation",
    domainLabel: "dentdisease.org",
    url: "https://www.dentdisease.org/",
  },
  {
    label: "National Kidney Foundation (NKF)",
    domainLabel: "kidney.org",
    url: "https://www.kidney.org/",
  },
  {
    label: "NephCure Kidney International",
    domainLabel: "nephcure.org",
    url: "https://nephcure.org/",
  },
  {
    label: "PKD Foundation",
    domainLabel: "pkdcure.org",
    url: "https://pkdcure.org/",
  },
  {
    label: "Rare Kidney Disease Foundation (ADTKD)",
    domainLabel: "rarekidney.org",
    url: "https://www.rarekidney.org/",
  },
];

const renalReferralGuide = {
  label: "How do I know where to refer patients with rare kidney diseases?",
  url: "https://nephrogenix.wixsite.com/nephrogenetics/genereviews",
};

type ResourceFilter = "all" | "clinician" | "patient" | "completed";

export default function Education() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "patient";
  const selectedCategory = userRole === "clinician" ? "clinician" : "patient";
  const [completedModuleIds, setCompletedModuleIds] = useState<Set<string>>(
    () => readCompletedModuleIds()
  );
  const [activeFilter, setActiveFilter] = useState<ResourceFilter>("all");

  useEffect(() => {
    const syncCompletion = () => {
      setCompletedModuleIds(readCompletedModuleIds());
    };

    window.addEventListener("focus", syncCompletion);
    window.addEventListener("storage", syncCompletion);

    return () => {
      window.removeEventListener("focus", syncCompletion);
      window.removeEventListener("storage", syncCompletion);
    };
  }, []);

  const roleScopedModules = useMemo(
    () =>
      modules.filter(
        (module) => module.category === selectedCategory || module.category === "both"
      ),
    [selectedCategory]
  );

  const enrichedModules = useMemo(
    () =>
      roleScopedModules.map((module) => ({
        ...module,
        isCompleted: !!module.routeModuleId && completedModuleIds.has(module.routeModuleId),
      })),
    [roleScopedModules, completedModuleIds]
  );

  const visibleModules = useMemo(() => {
    if (activeFilter === "all") return enrichedModules;
    if (activeFilter === "completed") return enrichedModules.filter((module) => module.isCompleted);
    if (activeFilter === "clinician") {
      return enrichedModules.filter(
        (module) => module.category === "clinician" || module.category === "both"
      );
    }
    return enrichedModules.filter(
      (module) => module.category === "patient" || module.category === "both"
    );
  }, [activeFilter, enrichedModules]);

  const completedCount = enrichedModules.filter((module) => module.isCompleted).length;
  const progress = enrichedModules.length > 0 ? (completedCount / enrichedModules.length) * 100 : 0;
  const readingCount = enrichedModules.filter((module) => module.duration.includes("read")).length;

  const handleModuleClick = (module: Module) => {
    if (module.locked) {
      alert("Complete previous modules to unlock this one!");
      return;
    }

    if (module.routeModuleId) {
      navigate(`/doctor/education/${module.routeModuleId}`);
      return;
    }

    alert(
      `In a production app, this would open the "${module.title}" learning module with video content, quizzes, and interactive elements.`
    );
  };

  const filterChips: Array<{ id: ResourceFilter; label: string }> = [
    { id: "all", label: "All" },
    { id: "clinician", label: "For Clinicians" },
    { id: "patient", label: "For Patients" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7ff] pb-24 relative overflow-hidden" style={{ fontFamily: "Georgia, serif" }}>
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute top-36 -right-16 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative z-10 px-6 pt-5 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="h-11 w-11 rounded-2xl bg-white/95 shadow-sm border border-blue-100 flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#153a7a]" />
          </button>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.16em] text-blue-700/80 font-semibold">Knowledge Hub</p>
            <h1
              className="text-[2rem] leading-none text-[#102347] mt-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Resources
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/70 bg-white/80 backdrop-blur px-3 py-2 text-xs text-[#24457f]">
            <Sparkles className="w-3.5 h-3.5" />
            {userRole === "clinician" ? "Clinician Track" : "Patient Track"}
          </div>
        </div>

        <section className="rounded-[1.75rem] overflow-hidden shadow-xl shadow-blue-900/15 border border-white/60">
          <div className="bg-gradient-to-br from-[#0d1f4a] via-[#153a7a] to-[#0e8ea3] text-white p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90 font-semibold">Personalized Learning</p>
                <h2
                  className="mt-2 text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Build confidence in renal genetics with high-signal resources
                </h2>
                <p className="mt-3 text-sm md:text-base text-blue-100/95">
                  Curated modules, practical explainers, and evidence-backed references designed for fast clinical and patient decision support.
                </p>
              </div>

              <div className="rounded-2xl bg-white/12 border border-white/20 px-4 py-3 text-right min-w-[170px]">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/85">Overall Progress</p>
                <p className="text-3xl mt-1" style={{ fontFamily: "Georgia, serif" }}>
                  {Math.round(progress)}%
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 border border-white/20 px-3 py-3">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-blue-100/90">Completed</p>
                <p className="text-lg mt-1 font-semibold">{completedCount}</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 px-3 py-3">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-blue-100/90">Total</p>
                <p className="text-lg mt-1 font-semibold">{enrichedModules.length}</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 px-3 py-3">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-blue-100/90">Quick Reads</p>
                <p className="text-lg mt-1 font-semibold">{readingCount}</p>
              </div>
            </div>

            <div className="mt-5 h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-emerald-200 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`rounded-full px-4 py-2 text-sm whitespace-nowrap border transition-all ${
                  isActive
                    ? "bg-[#173f86] text-white border-[#173f86] shadow-md"
                    : "bg-white/90 text-[#24457f] border-blue-100 hover:bg-blue-50"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <section className="space-y-4">
          {visibleModules.length === 0 ? (
            <div className="rounded-2xl bg-white border border-blue-100 p-6 text-center text-[#45639b]">
              No resources match this filter yet.
            </div>
          ) : (
            visibleModules.map((module) => {
              const ModuleIcon =
                module.category === "clinician"
                  ? Users
                  : module.category === "patient"
                    ? TestTube
                    : BookOpen;

              const statusLabel = module.isCompleted
                ? "Completed"
                : module.duration.includes("read")
                  ? "Reading"
                  : "Video";

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module)}
                  disabled={module.locked}
                  className={`w-full text-left rounded-3xl border p-5 bg-white/95 backdrop-blur transition-all ${
                    module.locked
                      ? "opacity-60"
                      : "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/10"
                  }`}
                  style={{ borderColor: "rgba(141, 181, 255, 0.35)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        module.isCompleted
                          ? "bg-emerald-50"
                          : module.locked
                            ? "bg-gray-100"
                            : "bg-blue-50"
                      }`}
                    >
                      {module.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      ) : module.locked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ModuleIcon className="w-6 h-6 text-blue-700" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="text-lg md:text-xl text-[#102347] leading-tight"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {module.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs md:text-sm text-[#45639b] whitespace-nowrap">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                      </div>

                      <p className="text-sm md:text-base text-[#3f5687] mt-2 leading-relaxed">{module.description}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs text-[#1f4f9a]">
                          {module.category === "clinician"
                            ? "Clinician"
                            : module.category === "patient"
                              ? "Patient"
                              : "Shared"}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-cyan-50 border border-cyan-100 px-3 py-1 text-xs text-cyan-800">
                          {statusLabel}
                        </span>
                        {module.locked && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-xs text-gray-700">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="hidden sm:flex h-10 w-10 rounded-full bg-[#e9f1ff] items-center justify-center mt-0.5">
                      {module.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-[#1b4f9f]" />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 rounded-full bg-blue-50 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        module.isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      }`}
                      style={{ width: module.isCompleted ? "100%" : "46%" }}
                    />
                  </div>
                </button>
              );
            })
          )}
        </section>

        <section className="rounded-3xl border border-blue-100 bg-white/92 backdrop-blur p-5 md:p-7 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-blue-700/75 font-semibold">Patient Support</p>
              <h2
                className="mt-1 text-xl md:text-2xl text-[#102347]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Patients' Organizations
              </h2>
            </div>
            <span className="hidden sm:inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-[#42639a]">
              {renalPatientOrganizations.length} organizations
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)] lg:items-center">
            <div className="space-y-3">
              {renalPatientOrganizations.map((organization, index) => (
                <div
                  key={organization.url}
                  className="rounded-2xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-[#173f86] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm md:text-[0.95rem] text-[#2f4676] leading-relaxed">
                        {organization.label}{" "}
                        <a
                          href={organization.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5d6fc4] underline underline-offset-2 hover:text-[#173f86]"
                        >
                          {organization.domainLabel}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={renalReferralGuide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] border border-[#c68080] bg-gradient-to-br from-[#fff5f5] via-white to-[#fff0f0] p-6 shadow-[0_10px_30px_rgba(147,35,35,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(147,35,35,0.16)]"
            >
              <div className="flex h-full flex-col justify-center">
                <p
                  className="text-2xl leading-tight text-[#9e1d1d] underline decoration-[#9e1d1d] underline-offset-4 md:text-[2rem]"
                  style={{ fontFamily: "Georgia, serif", textShadow: "0 3px 10px rgba(120, 20, 20, 0.12)" }}
                >
                  {renalReferralGuide.label}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9e1d1d]">
                  Open referral guide
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-blue-100 bg-white/90 backdrop-blur p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2
              className="text-xl md:text-2xl text-[#102347]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Evidence Base
            </h2>
            <span className="text-xs md:text-sm text-[#42639a]">{references.length} key references</span>
          </div>

          <div className="space-y-3">
            {references.map((reference, index) => (
              <article
                key={index}
                className="rounded-2xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/60 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-[#173f86] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#2f4676] leading-relaxed">{reference.citation}</p>
                    {reference.links && reference.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reference.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-blue-200 bg-white px-3 py-1 text-xs text-[#1c4a94] hover:bg-blue-50"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
