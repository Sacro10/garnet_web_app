import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import GaugeComponent from "react-gauge-component";
import {
  Activity,
  ClipboardCheck,
  FileText,
  FlaskConical,
  GitBranch,
  Microscope,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { educationalCards, practicalCards } from "../data/resourceCards";
import { resourceDestinationContent } from "../data/resourceDestinationContent";
import { DoctorDecorativeArt, DoctorFooter, DoctorHeader } from "../components/DoctorShell";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type QuizPrompt = {
  id: string;
  prompt: string;
  kind: "yesno" | "number";
};

type ReferralDiagnosisTemplate = {
  diagnosisLabel: string;
  requestParagraph: string;
  backgroundParagraph: string;
  valueParagraph: string;
};

type KnowledgeQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
};

type QuizBenchmark = {
  label: string;
  summary: string;
  action: string;
};

type WorkflowStepCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route?: string;
  href?: string;
};

const quizPrompts: QuizPrompt[] = [
  {
    id: "family-kidney-problems",
    prompt: "Does the patient have any family members with kidney disease or other kidney problems?",
    kind: "yesno",
  },
  {
    id: "family-first-signs-age",
    prompt: "How old were the affected family members when they first developed signs of kidney disease?",
    kind: "number",
  },
  {
    id: "family-dialysis-transplant",
    prompt: "Did any family member need dialysis or a kidney transplant?",
    kind: "yesno",
  },
  {
    id: "family-kidney-failure-age",
    prompt: "How old were they when they developed kidney failure?",
    kind: "number",
  },
  {
    id: "personal-kidney-diagnosis",
    prompt: "Has the patient been diagnosed with any of the following?",
    kind: "yesno",
  },
  {
    id: "age-first-diagnosis",
    prompt:
      "How old was the patient when a doctor or other medical professional first diagnosed them with kidney disease?",
    kind: "number",
  },
  {
    id: "extra-renal-manifestations",
    prompt: "Does the patient have any of the following?",
    kind: "yesno",
  },
];

const whyGeneticTestingBenefits = [
  {
    label: "Improved diagnostic accuracy",
    description:
      "Helps clarify the exact cause of CKD, especially in unclear or atypical presentations, and can end patients' diagnostic odyssey.",
  },
  {
    label: "Better risk stratification and prognosis",
    description:
      "Offers insight into disease progression and helps identify patients at higher risk.",
  },
  {
    label: "Family counseling & cascade testing",
    description:
      "Enables recurrence risk assessment, relative screening, early detection of at-risk family members, and family planning conversations.",
  },
  {
    label: "Transplant planning",
    description:
      "Genetic findings can guide living donor selection and avoid transmitting hereditary disease.",
  },
  {
    label: "Therapeutic decision-making",
    description:
      "Certain genetic diagnoses influence treatment choices or eligibility for targeted therapies (when available).",
  },
];

const whyGeneticTestingInfographicCards: Array<{
  title: string;
  lines: string[];
  icon: LucideIcon;
  borderClassName: string;
  iconClassName: string;
  positionClassName: string;
}> = [
  {
    title: "Accurate Diagnosis",
    lines: ["Identify rare and atypical kidney disease causes.", "End diagnostic odysseys."],
    icon: Search,
    borderClassName: "border-[#8a7ab8]",
    iconClassName: "text-[#5d4d95]",
    positionClassName: "md:col-start-1 md:row-start-1",
  },
  {
    title: "Family Planning & Counseling",
    lines: ["Understand inheritance patterns.", "Risk assessment for relatives."],
    icon: Users,
    borderClassName: "border-[#8a7ab8]",
    iconClassName: "text-[#59b8c7]",
    positionClassName: "md:col-start-3 md:row-start-1",
  },
  {
    title: "Prognostication & Monitoring",
    lines: ["Predict disease course.", "Anticipate complications."],
    icon: Activity,
    borderClassName: "border-[#57b9c8]",
    iconClassName: "text-[#57b9c8]",
    positionClassName: "md:col-start-1 md:row-start-2",
  },
  {
    title: "Prevention & Early Intervention",
    lines: ["Screen at-risk individuals.", "Pre-symptomatic management."],
    icon: ShieldCheck,
    borderClassName: "border-[#57b9c8]",
    iconClassName: "text-[#57b9c8]",
    positionClassName: "md:col-start-3 md:row-start-2",
  },
  {
    title: "Therapeutic Guidance",
    lines: ["Personalize treatment strategies.", "Eligibility for clinical trials."],
    icon: Pill,
    borderClassName: "border-[#8a7ab8]",
    iconClassName: "text-[#5d4d95]",
    positionClassName: "md:col-start-1 md:row-start-3",
  },
  {
    title: "Research & Drug Discovery",
    lines: ["Uncover new gene-disease links.", "Develop novel therapies."],
    icon: FlaskConical,
    borderClassName: "border-[#8a7ab8]",
    iconClassName: "text-[#5d4d95]",
    positionClassName: "md:col-start-3 md:row-start-3",
  },
];

const orderTestingWorkflowSteps: WorkflowStepCard[] = [
  {
    id: "clinical-examination",
    title: "Clinical Examination",
    description:
      "Clinical red flags, kidney phenotype, extra-renal findings, and baseline evaluation steps.",
    icon: Stethoscope,
    route: "/doctor/dashboard/resource/genetic-counseling-workflow/clinical-examination",
  },
  {
    id: "pedigree-analysis",
    title: "Pedigree Analysis",
    description: "Family structure, inheritance clues, and how pedigree review changes testing strategy.",
    icon: GitBranch,
    href: "https://www.genecascade.org/ped-cgi/pedigree.cgi",
  },
  {
    id: "how-to-choose-the-test",
    title: "How to Choose the Test",
    description:
      "Selecting the right genetic test based on phenotype, suspected diagnosis, and workflow fit.",
    icon: Microscope,
    route: "/doctor/dashboard/resource/genetic-counseling-workflow/how-to-choose-the-test",
  },
  {
    id: "informed-consent",
    title: "Informed Consent",
    description:
      "Consent essentials, limitations, uncertain findings, family implications, and expectations.",
    icon: ShieldCheck,
    route: "/doctor/dashboard/resource/genetic-counseling-workflow/informed-consent",
  },
  {
    id: "results-disclosure-follow-up",
    title: "Results Disclosure and Follow Up",
    description:
      "Returning results, interpreting impact, counseling next steps, and follow-up planning.",
    icon: ClipboardCheck,
    route: "/doctor/dashboard/resource/genetic-counseling-workflow/results-disclosure-follow-up",
  },
  {
    id: "letter-of-medical-necessity-template",
    title: "Letter of Medical Necessity Template",
    description:
      "Direct-order toolkit with clinician-facing language and a draft letter preview for coverage support.",
    icon: FileText,
    route: "/doctor/dashboard/resource/letter-of-medical-necessity-template",
  },
];

const kidneyKnowledgeQuizQuestions: KnowledgeQuizQuestion[] = [
  {
    id: "nkf-ckd-prevalence",
    prompt: "In the NKF Working Group report, about how many people in the United States were estimated to have CKD?",
    options: ["About 3.7 million", "About 37 million", "About 137 million", "About 237 million"],
    correctIndex: 1,
    explanation:
      "The report cites roughly 37 million people in the US with CKD, highlighting why scalable genetics workflows matter.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-adult-genetic-share",
    prompt: "What proportion of adult kidney diseases was described as potentially explained by genetic causes?",
    options: ["About 1%-3%", "About 10%-20%", "About 40%-50%", "About 80%-90%"],
    correctIndex: 1,
    explanation: "The NKF report and related background discuss an adult range around 10%-20%.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-pediatric-selected-cohorts",
    prompt: "In selected pediatric CKD cohorts, genetic causes may account for as much as:",
    options: ["15%", "30%", "50%", "70%"],
    correctIndex: 3,
    explanation: "The report notes up to 70% in selected pediatric groups.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-consensus-process",
    prompt: "Which consensus approach did the NKF Working Group use to finalize recommendations?",
    options: ["Nominal group technique only", "Modified Delphi process", "Single expert panel vote", "Public comment polling"],
    correctIndex: 1,
    explanation: "Recommendations were refined through a modified Delphi process.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-delphi-rounds",
    prompt: "How many Delphi scoring rounds were used in the NKF process?",
    options: ["2 rounds", "3 rounds", "5 rounds", "8 rounds"],
    correctIndex: 1,
    explanation: "The paper reports 3 rounds of Delphi scoring.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-delphi-response-rate",
    prompt: "What response rate range was reported across the NKF Delphi rounds?",
    options: ["40%-50%", "60%-70%", "90%-92%", "98%-100%"],
    correctIndex: 2,
    explanation: "Response rates were very high, around 90%-92%.",
    source: "NKF Working Group report",
  },
  {
    id: "nkf-polygenic-care",
    prompt: "How did the NKF Working Group describe clinical readiness of polygenic scores in nephrology?",
    options: [
      "Ready for universal routine care today",
      "Only for pediatric nephrology",
      "Insufficiently validated for routine clinical care",
      "Obsolete compared with biopsy",
    ],
    correctIndex: 2,
    explanation: "The group considered current polygenic scores not yet sufficiently validated for routine care use.",
    source: "NKF Working Group report",
  },
  {
    id: "kdigo-think-genetic",
    prompt: "KDIGO advises nephrology clinicians to 'think genetic.' Which action set best matches this advice?",
    options: [
      "Order APOL1 in every patient regardless of presentation",
      "Take family history, document CKD onset age, assess extrarenal features, and consider testing",
      "Wait for dialysis before discussing genetics",
      "Use polygenic scores before monogenic testing",
    ],
    correctIndex: 1,
    explanation: "KDIGO emphasizes family history, onset timing, extrarenal clues, and testing consideration.",
    source: "KDIGO Controversies Conference conclusions",
  },
  {
    id: "kdigo-gene-count",
    prompt: "KDIGO reported that how many genes have been implicated in monogenic kidney diseases?",
    options: ["More than 60", "More than 200", "More than 600", "More than 2000"],
    correctIndex: 2,
    explanation: "The KDIGO conference paper cites more than 600 implicated genes.",
    source: "KDIGO Controversies Conference conclusions",
  },
  {
    id: "kdigo-pediatric-adult-monogenic",
    prompt: "Which combination best reflects KDIGO's monogenic CKD burden estimates?",
    options: [
      "Up to 50% in pediatric nondiabetic cohorts and up to 30% in adult cohorts",
      "Up to 10% in pediatric and up to 5% in adult cohorts",
      "Up to 80% in pediatric and up to 70% in adult cohorts",
      "No meaningful difference between age groups",
    ],
    correctIndex: 0,
    explanation: "KDIGO cites a much higher monogenic burden in pediatric cohorts than in adults.",
    source: "KDIGO Controversies Conference conclusions",
  },
  {
    id: "au-survey-perceived-utility",
    prompt: "In the Australian nephrologist survey, what proportion believed genetic testing would be useful?",
    options: ["About 25%", "About 45%", "About 65%", "About 85%"],
    correctIndex: 3,
    explanation: "Most respondents saw value: 85% reported testing would be useful.",
    source: "Australian nephrologist genomics implementation survey",
  },
  {
    id: "au-survey-confidence",
    prompt: "In that same survey, what proportion felt confident using genomic test results?",
    options: ["About 23%", "About 43%", "About 63%", "About 83%"],
    correctIndex: 0,
    explanation: "Despite high perceived utility, only 23% felt confident using results.",
    source: "Australian nephrologist genomics implementation survey",
  },
  {
    id: "au-survey-preferred-model",
    prompt: "Which service model was preferred by the largest share of surveyed Australian nephrologists?",
    options: [
      "Direct-to-consumer testing model",
      "Nephrologist-only model",
      "Multidisciplinary renal genetics clinic",
      "Pathology-first no-clinic model",
    ],
    correctIndex: 2,
    explanation:
      "A multidisciplinary clinic model was the top choice, including nephrology, clinical genetics, and genetic counseling.",
    source: "Australian nephrologist genomics implementation survey",
  },
  {
    id: "au-survey-peds-vs-adult-confidence",
    prompt: "Who reported higher confidence in using genomic results in the Australian study?",
    options: ["Adult nephrologists", "Pediatric nephrologists", "Both equal", "Neither group reported confidence"],
    correctIndex: 1,
    explanation: "Pediatric nephrologists reported substantially higher confidence than adult nephrologists.",
    source: "Australian nephrologist genomics implementation survey",
  },
  {
    id: "au-survey-barriers",
    prompt: "What was a key implementation barrier identified in the Australian survey?",
    options: [
      "Too many nationally mandated genetics rotations",
      "Hospital/organizational culture plus limited staffing, resources, and funding",
      "Lack of CKD patients with possible inherited disease",
      "Excess availability of genetic counselors",
    ],
    correctIndex: 1,
    explanation: "Respondents emphasized culture/environment and resource constraints as major barriers.",
    source: "Australian nephrologist genomics implementation survey",
  },
  {
    id: "us-survey-size",
    prompt: "How many US nephrologists completed the 2023 survey on genetics education and referrals?",
    options: ["101", "151", "201", "301"],
    correctIndex: 2,
    explanation: "The study sample included 201 completed responses.",
    source: "US nephrologist education and referral survey",
  },
  {
    id: "us-survey-low-referral",
    prompt: "What fraction of surveyed US nephrologists reported referring fewer than 5 patients to genetic evaluation?",
    options: ["17%", "27%", "37%", "57%"],
    correctIndex: 2,
    explanation: "A notable 37% had referred fewer than five patients.",
    source: "US nephrologist education and referral survey",
  },
  {
    id: "us-survey-insurance-concern",
    prompt: "In the US survey, what proportion cited future health insurance eligibility concerns as a referral barrier?",
    options: ["45%", "65%", "85%", "95%"],
    correctIndex: 2,
    explanation: "Insurance concerns were common: 85% identified this barrier.",
    source: "US nephrologist education and referral survey",
  },
  {
    id: "us-survey-training-gaps",
    prompt: "Which statement best matches adult nephrologists' reported genetics training gaps in the US survey?",
    options: [
      "Most reported sufficient training in residency and fellowship",
      "Insufficient training was reported by 65% in residency and 52% in fellowship",
      "Only fellowship training was seen as insufficient",
      "Training gaps were only reported by pediatric nephrologists",
    ],
    correctIndex: 1,
    explanation: "Large training gaps were reported, especially during adult nephrology training stages.",
    source: "US nephrologist education and referral survey",
  },
  {
    id: "sdoh-undiagnosed-rate",
    prompt: "According to the social determinants review, what is true even with major sequencing advances?",
    options: [
      "Nearly all suspected rare disease patients now receive a diagnosis",
      "Only adults remain undiagnosed, not children",
      "More than half of suspected rare genetic disease patients remain undiagnosed",
      "Undiagnosed cases are mostly due to test unavailability in tertiary centers",
    ],
    correctIndex: 2,
    explanation:
      "The review states that over half of patients suspected of rare genetic disorders still remain undiagnosed.",
    source: "Social determinants and diagnostic odyssey review",
  },
];

const getQuizBenchmark = (scorePercent: number): QuizBenchmark => {
  if (scorePercent >= 90) {
    return {
      label: "Advanced Benchmark",
      summary: "Strong mastery of current kidney genetics implementation evidence.",
      action: "You can mentor others and lead protocol-level discussions.",
    };
  }

  if (scorePercent >= 75) {
    return {
      label: "Proficient Benchmark",
      summary: "Solid command of core evidence with a few knowledge gaps remaining.",
      action: "Review missed topics and retake to move into advanced range.",
    };
  }

  if (scorePercent >= 60) {
    return {
      label: "Developing Benchmark",
      summary: "Foundational understanding is present, but consistency needs improvement.",
      action: "Focus on consensus recommendations, barriers, and workforce education findings.",
    };
  }

  return {
    label: "Foundation Benchmark",
    summary: "This is an early baseline and a good point to build from.",
    action: "Revisit source material and retake the quiz for measurable progress.",
  };
};

const manifestationOptions = [
  "Hearing differences",
  "Vision differences",
  "Liver or pancreatic cysts",
  "Cardiac structural differences",
  "Developmental or neurologic differences",
];

const nkfWorkingGroupPaperUrl = "https://pubmed.ncbi.nlm.nih.gov/39033956/";

const diagnosisOptions = [
  "FSGS or glomerular disease",
  "Cystic kidney disease",
  "Tubulointerstitial kidney disease",
  "Congenital anomalies of kidney/urinary tract",
  "Unknown-cause CKD",
];

const getReferralDiagnosisTemplate = (
  selectedDiagnoses: string[],
  customDiagnosis: string,
): ReferralDiagnosisTemplate => {
  const normalizedCustomDiagnosis = customDiagnosis.trim();
  const primaryDiagnosis = normalizedCustomDiagnosis || selectedDiagnoses[0] || "inherited kidney disease";

  if (normalizedCustomDiagnosis) {
    return {
      diagnosisLabel: normalizedCustomDiagnosis,
      requestParagraph:
        `I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected ${normalizedCustomDiagnosis}.`,
      backgroundParagraph:
        `Genetic testing may help confirm the diagnosis of ${normalizedCustomDiagnosis}, especially when presentation is atypical, family history is incomplete, or standard clinical evaluation does not fully explain the patient's kidney disease.`,
      valueParagraph:
        `A molecular diagnosis may help clarify prognosis, guide management, support family counseling and cascade testing, and assist with transplant or donor planning when relevant.`,
    };
  }

  switch (primaryDiagnosis) {
    case "FSGS or glomerular disease":
      return {
        diagnosisLabel: "hereditary glomerular disease",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected hereditary glomerular disease.",
        backgroundParagraph:
          "Genetic testing may help clarify the cause of glomerular disease or FSGS, particularly when there is early onset disease, steroid resistance, a family history of kidney disease, or clinical uncertainty regarding the underlying etiology.",
        valueParagraph:
          "A molecular diagnosis may help refine prognosis, influence treatment selection, reduce unnecessary interventions, and support family counseling and transplant planning when relevant.",
      };
    case "Cystic kidney disease":
      return {
        diagnosisLabel: "cystic kidney disease",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected cystic kidney disease.",
        backgroundParagraph:
          "The diagnosis of inherited cystic kidney disease can be uncertain when imaging findings are inconclusive, the family history is unclear, or the patient does not fit classic clinical criteria. Genetic testing may help identify the underlying cause and distinguish among inherited cystic disorders.",
        valueParagraph:
          "A molecular diagnosis may help guide prognosis, family counseling, cascade testing, and transplant or living donor decision-making when relevant.",
      };
    case "Tubulointerstitial kidney disease":
      return {
        diagnosisLabel: "hereditary tubulointerstitial kidney disease",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected hereditary tubulointerstitial kidney disease.",
        backgroundParagraph:
          "Hereditary tubulointerstitial kidney disease may be difficult to recognize clinically because findings can be nonspecific and family history may not be fully apparent. Genetic testing may help establish the diagnosis when routine evaluation is inconclusive.",
        valueParagraph:
          "A molecular diagnosis may help clarify prognosis, support family counseling, and guide long-term monitoring and transplant planning when appropriate.",
      };
    case "Congenital anomalies of kidney/urinary tract":
      return {
        diagnosisLabel: "congenital anomalies of the kidney and urinary tract",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected congenital anomalies of the kidney and urinary tract.",
        backgroundParagraph:
          "Congenital anomalies of the kidney and urinary tract can occur as part of inherited or syndromic disease. Genetic testing may help identify the underlying cause, especially when anomalies coexist with family history or extra-renal findings.",
        valueParagraph:
          "A molecular diagnosis may help guide prognosis, additional evaluation for associated features, family counseling, and future reproductive or transplant-related planning.",
      };
    case "Unknown-cause CKD":
      return {
        diagnosisLabel: "chronic kidney disease of unknown etiology",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to chronic kidney disease of unknown etiology.",
        backgroundParagraph:
          "When chronic kidney disease remains unexplained after routine evaluation, genetic testing may help identify an inherited cause, particularly in the setting of early onset disease, a positive family history, or extra-renal manifestations.",
        valueParagraph:
          "A molecular diagnosis may help clarify disease mechanism, guide management, support family counseling and cascade testing, and inform transplant or donor assessment when relevant.",
      };
    default:
      return {
        diagnosisLabel: "inherited kidney disease",
        requestParagraph:
          "I am writing this letter on behalf of my patient to request coverage for genetic testing related to suspected inherited kidney disease.",
        backgroundParagraph:
          "Genetic testing may help establish the diagnosis when kidney disease is suspected to have an inherited basis, especially when standard clinical evaluation is inconclusive or family history and extra-renal features raise concern for a monogenic condition.",
        valueParagraph:
          "A molecular diagnosis may help clarify prognosis, guide management, support family counseling and cascade testing, and assist with transplant or donor planning when relevant.",
      };
  }
};

type ReferralTemplateFormState = {
  age: string;
  gender: string;
  clinicalSummary: string;
};

type RiskQuizAnswers = Record<string, string>;
type ReferralLikelihoodAnalysis = {
  level: "High" | "Moderate" | "Lower";
  score: number;
  maxScore: number;
  summary: string;
  recommendation: string;
  reasons: string[];
};

const diagnosisReasonByType: Record<string, string> = {
  "FSGS or glomerular disease":
    "The NKF Working Group recommends kidney-specific panel testing for FSGS and steroid-resistant nephrotic syndrome and supports testing when glomerular disease is suspected to have a genetic basis after clinical evaluation.",
  "Cystic kidney disease":
    "The NKF Working Group supports genetic testing for suspected cystic kidney disease, especially when the presentation is atypical or does not clearly meet classic clinical criteria.",
  "Tubulointerstitial kidney disease":
    "The NKF Working Group supports genetic testing for suspected tubulointerstitial kidney disorders after clinical evaluation and recommends kidney-specific panel testing for tubulopathies.",
  "Congenital anomalies of kidney/urinary tract":
    "The NKF Working Group includes structural abnormalities such as CAKUT among the kidney phenotypes for which genetic testing is indicated when a genetic etiology is suspected.",
  "Unknown-cause CKD":
    "The NKF Working Group strongly recommends considering kidney-specific panel testing in CKD of unknown etiology after a full standard clinical evaluation.",
};

const createInitialReferralTemplateFormState = (): ReferralTemplateFormState => ({
  age: "",
  gender: "",
  clinicalSummary: "",
});

const valueOrNotProvided = (value?: string) => (value && value.trim() ? value.trim() : "Not provided");

const listOrNone = (values: string[]) => (values.length > 0 ? values.join(", ") : "None selected");

const toPositiveNumber = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const buildReferralLikelihoodAnalysis = (
  answers: RiskQuizAnswers,
  diagnoses: string[],
  manifestations: string[],
): ReferralLikelihoodAnalysis => {
  let score = 0;
  const reasons: string[] = [];

  if (answers["family-kidney-problems"] === "Yes") {
    score += 2;
    reasons.push(
      "The NKF Working Group identifies first-degree family history suggestive of dominant, X-linked, or recessive kidney disease as an indication to consider genetic testing.",
    );
  }

  if (answers["family-dialysis-transplant"] === "Yes") {
    score += 1;
    reasons.push(
      "A family history that includes dialysis, transplant, or advanced kidney disease strengthens concern for a clinically important inherited kidney disorder.",
    );
  }

  const familyOnsetAge = toPositiveNumber(answers["family-first-signs-age"]);
  if (familyOnsetAge !== null && familyOnsetAge <= 40) {
    score += 1;
    reasons.push(
      "Earlier onset of kidney disease in affected relatives is a red flag that increases suspicion for a monogenic kidney condition.",
    );
  }

  if (answers["personal-kidney-diagnosis"] === "Yes") {
    score += 1;
  }

  if (diagnoses.length > 0) {
    score += 2;
    diagnoses.forEach((diagnosis) => {
      const reason = diagnosisReasonByType[diagnosis];
      if (reason) {
        reasons.push(reason);
      }
    });
  }

  const firstDiagnosisAge = toPositiveNumber(answers["age-first-diagnosis"]);
  if (firstDiagnosisAge !== null && firstDiagnosisAge <= 40) {
    score += 2;
    reasons.push(
      "Earlier age at first diagnosis is a strong referral indicator because the NKF report highlights early-onset CKD as a setting where inherited disease should be strongly considered.",
    );
  }

  if (answers["extra-renal-manifestations"] === "Yes") {
    score += 1;
  }

  if (manifestations.length > 0) {
    score += 2;
    reasons.push(
      `Extra-renal features were identified (${manifestations.join(", ")}), and the NKF report notes that these findings can support diagnosis, management, and recognition of syndromic or inherited kidney disease.`,
    );
  }

  if (reasons.length === 0) {
    reasons.push("The current responses do not show strong inherited-disease signals yet.");
  }

  if (score >= 7) {
    return {
      level: "High",
      score,
      maxScore: 11,
      summary: "This patient profile shows multiple features that support genetic testing or nephrogenetics referral.",
      recommendation: "Proceed with genetic testing discussion and referral workflow.",
      reasons,
    };
  }

  if (score >= 4) {
    return {
      level: "Moderate",
      score,
      maxScore: 11,
      summary: "There are several referral indicators, but the case would benefit from confirming a few clinical details.",
      recommendation: "Consider referral and review missing family history, onset timing, and extra-renal features before ordering.",
      reasons,
    };
  }

  return {
    level: "Lower",
    score,
    maxScore: 11,
    summary: "The current answers show fewer classic inherited-kidney red flags.",
    recommendation: "Reassess if new family history, early onset features, or extra-renal findings emerge.",
    reasons,
  };
};

const buildClinicalSummaryFromRiskQuiz = (
  answers: RiskQuizAnswers,
  personalKidneyCondition: string,
  manifestations: string[],
): string =>
  [
    `Primary kidney diagnosis: ${valueOrNotProvided(personalKidneyCondition)}.`,
    `Family history of kidney disease: ${valueOrNotProvided(answers["family-kidney-problems"])}. Age at first family signs: ${valueOrNotProvided(answers["family-first-signs-age"])}.`,
    `Family dialysis or transplant history: ${valueOrNotProvided(answers["family-dialysis-transplant"])}. Family kidney failure age: ${valueOrNotProvided(answers["family-kidney-failure-age"])}.`,
    `Personal kidney diagnosis response: ${valueOrNotProvided(answers["personal-kidney-diagnosis"])}. Age at first diagnosis: ${valueOrNotProvided(answers["age-first-diagnosis"])}.`,
    `Extra-renal manifestations response: ${valueOrNotProvided(answers["extra-renal-manifestations"])}. Selected manifestations: ${listOrNone(manifestations)}.`,
  ].join("\n");

export default function ResourceDestinationPage() {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [searchParams] = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [knowledgeQuizAnswers, setKnowledgeQuizAnswers] = useState<Record<string, number>>({});
  const [knowledgeQuizStep, setKnowledgeQuizStep] = useState(0);
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [personalKidneyCondition, setPersonalKidneyCondition] = useState("");
  const [manifestations, setManifestations] = useState<string[]>([]);
  const [referralTemplateForm, setReferralTemplateForm] = useState<ReferralTemplateFormState>(() =>
    createInitialReferralTemplateFormState(),
  );
  const [isReferralQuizComplete, setIsReferralQuizComplete] = useState(false);
  const [isReferralIndicationSubmitted, setIsReferralIndicationSubmitted] = useState(false);
  const [failedPreviewUrls, setFailedPreviewUrls] = useState<Record<string, boolean>>({});
  const referralAnalysisRef = useRef<HTMLDivElement | null>(null);

  const detail = resourceId ? resourceDestinationContent[resourceId] : undefined;
  const allCards = [...educationalCards, ...practicalCards];
  const sourceCard =
    allCards.find((card) => card.id === resourceId || card.route === `/doctor/dashboard/resource/${resourceId}`) ??
    (resourceId === "letter-of-medical-necessity-template"
      ? practicalCards.find((card) => card.id === "order-testing-directly")
      : undefined);

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Clinician");
      localStorage.setItem("userRole", "doctor");
    }

    if (!detail || !sourceCard) {
      navigate("/doctor/dashboard", { replace: true });
    }
  }, [detail, navigate, sourceCard]);

  useEffect(() => {
    if (detail?.id === "quizzes") {
      setKnowledgeQuizAnswers({});
      setKnowledgeQuizStep(0);
    }
  }, [detail?.id]);

  useEffect(() => {
    if (!isReferralIndicationSubmitted) {
      return;
    }

    window.requestAnimationFrame(() => {
      referralAnalysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isReferralIndicationSubmitted]);

  if (!detail || !sourceCard) {
    return null;
  }

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (
    option: string,
    setValues: (updater: (prev: string[]) => string[]) => void,
  ) => {
    setValues((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const isQuizPage = detail.id === "quizzes";
  const isReferralTemplatesPage = detail.id === "referral-templates";
  const isReferralIndicationPage = detail.id === "genetic-testing-risks";
  const isOrderTestingDirectlyPage = detail.id === "order-testing-directly";
  const isLetterMedicalNecessityPage = detail.id === "letter-of-medical-necessity-template";
  const isPostersPage = detail.id === "posters";
  const isCostsPage = detail.id === "costs";
  const isRisksNotOfferingPage = detail.id === "risks-not-offering";
  const isRenalPatientOrganizationsPage = detail.id === "renal-patient-organizations";
  const isExternalTrainingPage = detail.id === "external-training";
  const isGeneticTestingCounselingVideosPage = detail.id === "genetic-testing-counseling-videos";
  const isCommonGeneticKidneyDiseasesPage = detail.id === "common-genetic-kidney-diseases";
  const isPeerReviewedPapersPage = detail.id === "peer-reviewed-papers";
  const isCaseStudiesPage = detail.id === "case-studies";
  const isWhyGeneticTestingPage = detail.id === "why-genetic-testing-in-nephrology";
  const applauseMessages = [
    "Excellent work! Correct answer.",
    "Great job! You nailed this one.",
    "Nice clinical read. Correct.",
    "Strong answer. Keep it up.",
  ];
  const encouragementMessages = [
    "Good effort. Let's sharpen this one.",
    "Close. Keep going, you are building momentum.",
    "Not quite yet. Review the key point below.",
    "Nice attempt. The explanation will lock this in.",
  ];
  const Icon = sourceCard.icon;
  const selectedGeneticDiseaseTopicId = isCommonGeneticKidneyDiseasesPage
    ? searchParams.get("topic")
    : null;
  const selectedGeneticDiseaseTopic =
    isCommonGeneticKidneyDiseasesPage && selectedGeneticDiseaseTopicId
      ? detail.geneticDiseaseTopics?.[selectedGeneticDiseaseTopicId]
      : undefined;
  const risksDeckPath = publicAsset("resources/20220118_RenalGenetics_CME_Ethics.pptx");
  const costsHandoutPath = publicAsset("costs/OH-Patient-Billing-Postcard-2026.pdf");
  const costsCoveragePoints = [
    "Most government-insured patients are not expected to have out-of-pocket expenses.",
    "Many national and regional plans treat Natera as an in-network provider, which can reduce testing costs.",
    "Medicare Advantage coverage may differ, so patient-specific verification still matters.",
  ];
  const costsSupportPrograms = [
    "Discounted cash rates",
    "Compassionate care for patients who qualify",
    "Interest-free payment plans",
  ];
  const risksClinicalActions = [
    "Review family history, age at onset, and extra-renal findings before discussing testing.",
    "Use pre-test counseling to address discrimination fears, family implications, and test fit.",
    "Offer genetic testing based on clinical indication rather than assumptions about ancestry, interest, or finances.",
  ];

  const getHostLabel = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "External site";
    }
  };

  const applyRiskQuizToReferralForm = () => {
    setReferralTemplateForm((prev) => ({
      ...prev,
      clinicalSummary: buildClinicalSummaryFromRiskQuiz(answers, personalKidneyCondition, manifestations),
    }));
    setIsReferralQuizComplete(true);
  };

  const resetReferralFormKeepingQuizData = () => {
    setReferralTemplateForm({
      ...createInitialReferralTemplateFormState(),
      clinicalSummary: buildClinicalSummaryFromRiskQuiz(answers, personalKidneyCondition, manifestations),
    });
  };

  const resetDirectOrderingForm = () => {
    setPersonalKidneyCondition("");
    setDiagnoses([]);
    setReferralTemplateForm(createInitialReferralTemplateFormState());
  };

  const referralIndicationAnalysis = buildReferralLikelihoodAnalysis(answers, diagnoses, manifestations);
  const referralLikelihoodPercent = Math.round(
    (referralIndicationAnalysis.score / referralIndicationAnalysis.maxScore) * 100,
  );
  const showDetailHero =
    !isReferralIndicationPage &&
    detail.id !== "order-testing-directly" &&
    detail.id !== "case-studies" &&
    detail.id !== "genetic-testing-counseling-videos" &&
    detail.id !== "risks-not-offering" &&
    detail.id !== "peer-reviewed-papers" &&
    detail.id !== "renal-patient-organizations" &&
    detail.id !== "common-genetic-kidney-diseases";

  const setReferralField = (field: keyof ReferralTemplateFormState, value: string) => {
    setReferralTemplateForm((prev) => ({ ...prev, [field]: value }));
  };

  const currentKnowledgeQuestion = kidneyKnowledgeQuizQuestions[knowledgeQuizStep];
  const totalKnowledgeQuestions = kidneyKnowledgeQuizQuestions.length;
  const answeredKnowledgeCount = Object.keys(knowledgeQuizAnswers).length;
  const isKnowledgeQuizComplete = answeredKnowledgeCount === totalKnowledgeQuestions;
  const currentKnowledgeChoice =
    currentKnowledgeQuestion ? knowledgeQuizAnswers[currentKnowledgeQuestion.id] : undefined;
  const isCurrentKnowledgeAnswered = currentKnowledgeChoice !== undefined;
  const isCurrentKnowledgeCorrect =
    currentKnowledgeQuestion && currentKnowledgeChoice !== undefined
      ? currentKnowledgeChoice === currentKnowledgeQuestion.correctIndex
      : false;
  const knowledgeCorrectCount = kidneyKnowledgeQuizQuestions.reduce(
    (count, question) => (knowledgeQuizAnswers[question.id] === question.correctIndex ? count + 1 : count),
    0,
  );
  const knowledgeScorePercent = Math.round((knowledgeCorrectCount / totalKnowledgeQuestions) * 100);
  const knowledgeBenchmark = getQuizBenchmark(knowledgeScorePercent);
  const applauseMessage = currentKnowledgeQuestion
    ? applauseMessages[knowledgeQuizStep % applauseMessages.length]
    : applauseMessages[0];
  const encouragementMessage = currentKnowledgeQuestion
    ? encouragementMessages[knowledgeQuizStep % encouragementMessages.length]
    : encouragementMessages[0];

  const setKnowledgeAnswer = (questionId: string, optionIndex: number) => {
    if (knowledgeQuizAnswers[questionId] !== undefined) {
      return;
    }

    const targetQuestion = kidneyKnowledgeQuizQuestions.find((question) => question.id === questionId);
    if (targetQuestion && optionIndex === targetQuestion.correctIndex) {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.65 },
      });
    }

    setKnowledgeQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const goToNextKnowledgeQuestion = () => {
    setKnowledgeQuizStep((prev) => Math.min(prev + 1, totalKnowledgeQuestions - 1));
  };

  const resetKnowledgeQuiz = () => {
    setKnowledgeQuizAnswers({});
    setKnowledgeQuizStep(0);
  };

  const buildReferralTemplateLetter = () => {
    const form = referralTemplateForm;
    const diagnosisTemplate = getReferralDiagnosisTemplate(diagnoses, personalKidneyCondition);
    const clinicalSummary = form.clinicalSummary.trim() || "Kidney disease with concern for an inherited etiology.";
    const ageText = form.age.trim();
    const genderText = form.gender.trim();
    const caseDescriptor = [ageText ? `${ageText}-year-old` : "", genderText || "", "individual"]
      .filter(Boolean)
      .join(" ");
    const numberedFindings = clinicalSummary
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");

    return `Dear Medical Director:

${diagnosisTemplate.requestParagraph} This letter documents the medical necessity for genetic testing to clarify the diagnosis and support ongoing management.

${diagnosisTemplate.backgroundParagraph}

De-identified Clinical Summary:
This request is based on a de-identified clinical case involving ${caseDescriptor || "an individual"} with a suspected diagnosis of ${diagnosisTemplate.diagnosisLabel} supported by the following clinical findings.
${numberedFindings}

${diagnosisTemplate.valueParagraph}

I am requesting approval for disease-appropriate genetic testing to evaluate the suspected inherited basis of this kidney disease presentation.

Testing should include the genes or testing strategy most appropriate for the suspected diagnosis and clinical presentation.

I hope you will support this letter of medical necessity. Please feel free to contact our office if you have additional questions.

Sincerely,

Referring clinician
`;
  };
  const getReferralFileBaseName = () => {
    const diagnosisSlug = (personalKidneyCondition.trim() || diagnoses[0] || "kidney_disease")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    return `${diagnosisSlug || "kidney_disease"}_referral_template`;
  };

  const triggerBlobDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const wrapTextToLines = (text: string, maxCharsPerLine: number) => {
    const wrappedLines: string[] = [];
    const paragraphs = text.split("\n");

    paragraphs.forEach((paragraph) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) {
        wrappedLines.push("");
        return;
      }

      const words = trimmedParagraph.split(/\s+/);
      let currentLine = "";

      words.forEach((word) => {
        const nextLine = currentLine ? `${currentLine} ${word}` : word;
        if (nextLine.length <= maxCharsPerLine) {
          currentLine = nextLine;
          return;
        }

        if (currentLine) {
          wrappedLines.push(currentLine);
        }
        currentLine = word;
      });

      wrappedLines.push(currentLine);
    });

    return wrappedLines;
  };

  const escapePdfText = (value: string) =>
    value
      .normalize("NFKD")
      .replace(/[^\x20-\x7E]/g, "?")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");

  const buildPdfBlobFromText = (text: string) => {
    const pageWidth = 612;
    const pageHeight = 792;
    const marginX = 50;
    const topY = 742;
    const bottomY = 50;
    const lineHeight = 14;
    const linesPerPage = Math.floor((topY - bottomY) / lineHeight) + 1;
    const lines = wrapTextToLines(text, 95);
    const pages: string[][] = [];

    for (let i = 0; i < lines.length; i += linesPerPage) {
      pages.push(lines.slice(i, i + linesPerPage));
    }

    const pageCount = Math.max(1, pages.length);
    if (pages.length === 0) {
      pages.push([""]);
    }

    const pageObjectStart = 4;
    const objects: string[] = [];
    objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");

    const pageRefs: string[] = [];
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const pageObjectNum = pageObjectStart + pageIndex * 2;
      pageRefs.push(`${pageObjectNum} 0 R`);
    }

    objects.push(
      `2 0 obj\n<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pageCount} >>\nendobj`,
    );
    objects.push("3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj");

    pages.forEach((pageLines, pageIndex) => {
      const pageObjectNum = pageObjectStart + pageIndex * 2;
      const contentObjectNum = pageObjectNum + 1;

      const contentBody =
        "BT\n/F1 11 Tf\n" +
        pageLines
          .map((line, lineIndex) => {
            const y = topY - lineIndex * lineHeight;
            return `1 0 0 1 ${marginX} ${y} Tm (${escapePdfText(line)}) Tj`;
          })
          .join("\n") +
        "\nET";

      const contentLength = new TextEncoder().encode(contentBody).length;

      objects.push(
        `${pageObjectNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectNum} 0 R >>\nendobj`,
      );
      objects.push(
        `${contentObjectNum} 0 obj\n<< /Length ${contentLength} >>\nstream\n${contentBody}\nendstream\nendobj`,
      );
    });

    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [0];

    objects.forEach((obj, index) => {
      offsets[index + 1] = new TextEncoder().encode(pdf).length;
      pdf += `${obj}\n`;
    });

    const xrefPosition = new TextEncoder().encode(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";

    for (let i = 1; i <= objects.length; i += 1) {
      pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;

    return new Blob([pdf], { type: "application/pdf" });
  };

  const downloadReferralTemplatePdf = () => {
    const letter = buildReferralTemplateLetter();
    const pdfBlob = buildPdfBlobFromText(letter);
    triggerBlobDownload(pdfBlob, `${getReferralFileBaseName()}.pdf`);
  };

  const downloadReferralTemplateWordDoc = () => {
    const letter = buildReferralTemplateLetter();

    const blob = new Blob([letter], { type: "application/msword;charset=utf-8" });
    triggerBlobDownload(blob, `${getReferralFileBaseName()}.doc`);
  };

  const diagnosisOptionsEnabled = answers["personal-kidney-diagnosis"] === "Yes";
  const manifestationOptionsEnabled = answers["extra-renal-manifestations"] === "Yes";

  const renderRiskQuiz = (
    showContinueButton: boolean,
    useDiagnosisOptions: boolean,
    showReferralAnalysis: boolean,
  ) => (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6">
        <h3 className="text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
          Personal Kidney Diagnosis
        </h3>
        <p className="mt-2 text-black/75">
          Has the patient been diagnosed with any of the following? (List of clinical diagnoses for which experts have
          recommended genetic testing.)
        </p>
        <div className="mt-4 flex gap-2">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => {
                setAnswer("personal-kidney-diagnosis", choice);
                if (choice === "No") {
                  setDiagnoses([]);
                }
              }}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                answers["personal-kidney-diagnosis"] === choice
                  ? "border-cyan-700 bg-cyan-700 text-white"
                  : "border-black/20 bg-white text-black hover:text-cyan-700"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
        {useDiagnosisOptions ? (
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {diagnosisOptions.map((option) => {
              const selected = diagnoses.includes(option);
              return (
                <button
                  key={option}
                  disabled={!diagnosisOptionsEnabled}
                  onClick={() => toggleMulti(option, setDiagnoses)}
                  className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                    !diagnosisOptionsEnabled
                      ? "cursor-not-allowed border-black/10 bg-slate-100 text-black/35"
                      : selected
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-black/15 bg-cyan-50 text-black hover:text-cyan-700"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            placeholder="Enter the patient's kidney condition"
            value={personalKidneyCondition}
            onChange={(e) => setPersonalKidneyCondition(e.target.value)}
            rows={4}
            className="mt-4 w-full rounded-2xl border border-black/15 bg-cyan-50 px-4 py-3 text-black outline-none transition-colors placeholder:text-black/45 focus:border-cyan-600"
          />
        )}
      </section>

      <section className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6">
        <h3 className="text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
          Family History
        </h3>
        <div className="mt-4 space-y-4">
          {quizPrompts
            .filter((q) => q.id.startsWith("family-"))
            .map((question) => (
              <div key={question.id} className="rounded-2xl bg-cyan-50 px-4 py-3">
                <p className="text-black">{question.prompt}</p>
                {question.kind === "yesno" ? (
                  <div className="mt-3 flex gap-2">
                    {["Yes", "No"].map((choice) => (
                      <button
                        key={choice}
                        onClick={() => setAnswer(question.id, choice)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                          answers[question.id] === choice
                            ? "border-cyan-700 bg-cyan-700 text-white"
                            : "border-black/20 bg-white text-black hover:text-cyan-700"
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter age"
                    value={answers[question.id] ?? ""}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    className="mt-3 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-black outline-none focus:border-cyan-600"
                  />
                )}
              </div>
            ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6">
        <h3 className="text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
          Age at First Diagnosis of Kidney Disease
        </h3>
        <p className="mt-2 text-black/75">
          How old was the patient when a doctor or other medical professional first diagnosed them with kidney
          disease?
        </p>
        <input
          type="number"
          min="0"
          placeholder="Enter age at first diagnosis"
          value={answers["age-first-diagnosis"] ?? ""}
          onChange={(e) => setAnswer("age-first-diagnosis", e.target.value)}
          className="mt-4 w-full rounded-xl border border-black/15 bg-cyan-50 px-3 py-2 text-black outline-none focus:border-cyan-600"
        />
      </section>

      <section className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6">
        <h3 className="text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
          Extra-renal Manifestations
        </h3>
        <p className="mt-2 text-black/75">
          Does the patient have any of the following? (List of manifestations commonly associated with hereditary forms
          of kidney disease.)
        </p>
        <div className="mt-4 flex gap-2">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => {
                setAnswer("extra-renal-manifestations", choice);
                if (choice === "No") {
                  setManifestations([]);
                }
              }}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                answers["extra-renal-manifestations"] === choice
                  ? "border-cyan-700 bg-cyan-700 text-white"
                  : "border-black/20 bg-white text-black hover:text-cyan-700"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {manifestationOptions.map((option) => {
            const selected = manifestations.includes(option);
            return (
              <button
                key={option}
                disabled={!manifestationOptionsEnabled}
                onClick={() => toggleMulti(option, setManifestations)}
                className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                  !manifestationOptionsEnabled
                    ? "cursor-not-allowed border-black/10 bg-slate-100 text-black/35"
                    : selected
                    ? "border-cyan-700 bg-cyan-700 text-white"
                    : "border-black/15 bg-cyan-50 text-black hover:text-cyan-700"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </section>

      {showContinueButton ? (
        <div className="flex justify-end">
          <button
            onClick={applyRiskQuizToReferralForm}
            className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
          >
            Continue to Referral Form
          </button>
        </div>
      ) : null}

      {showReferralAnalysis ? (
        isReferralIndicationSubmitted ? (
          <div ref={referralAnalysisRef} className="space-y-5">
            <section className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Referral Analysis</p>
                  <h3 className="mt-2 text-2xl md:text-3xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                    Level of recommendation to genetic testing
                  </h3>
                  <p className="mt-2 max-w-3xl text-black/75">{referralIndicationAnalysis.summary}</p>
                </div>
                <div className="rounded-[26px] border border-black/10 bg-white px-5 py-5 text-center shadow-[0_14px_28px_rgba(0,0,0,0.06)]">
                  <p className="text-[0.7rem] uppercase tracking-[0.4em] text-cyan-700">Likelihood Gauge</p>

                  <div className="mx-auto mt-2 w-[220px]">
                    <GaugeComponent
                      type="semicircle"
                      value={referralLikelihoodPercent}
                      minValue={0}
                      maxValue={100}
                      marginInPercent={{ top: 0.06, bottom: 0.02, left: 0.08, right: 0.08 }}
                      arc={{
                        width: 0.24,
                        padding: 0.015,
                        cornerRadius: 3,
                        subArcs: [
                          { limit: 16, color: "#1dbb1d" },
                          { limit: 32, color: "#98d81a" },
                          { limit: 48, color: "#ffe21a" },
                          { limit: 64, color: "#ffc01f" },
                          { limit: 82, color: "#ff8e22" },
                          { limit: 100, color: "#f1412d" },
                        ],
                      }}
                      pointer={{
                        type: "needle",
                        color: "#111111",
                        baseColor: "#111111",
                        length: 0.72,
                        width: 8,
                        animate: true,
                        animationDuration: 900,
                        elastic: false,
                      }}
                      labels={{
                        valueLabel: { hide: true },
                        tickLabels: {
                          hideMinMax: true,
                          ticks: [],
                        },
                      }}
                    />
                  </div>

                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.34em] text-black/45">Likelihood</p>
                  <p className="mt-2 text-sm text-black/55">
                    Score {referralIndicationAnalysis.score}/{referralIndicationAnalysis.maxScore}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
                <div className="rounded-[24px] border border-black/10 bg-white p-4">
                  <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                    Why this result was assigned
                  </h4>
                  <ul className="mt-4 space-y-3 text-black/75">
                    {referralIndicationAnalysis.reasons.map((reason) => (
                      <li key={reason} className="rounded-2xl bg-cyan-50 px-4 py-3">
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={nkfWorkingGroupPaperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                  >
                    Open NKF Working Group paper
                  </a>
                </div>

                <div className="rounded-[24px] border border-black/10 bg-white p-4">
                  <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                    Suggested next step
                  </h4>
                  <p className="mt-4 text-black/75">{referralIndicationAnalysis.recommendation}</p>
                  <button
                    onClick={() => setIsReferralIndicationSubmitted(false)}
                    className="mt-5 rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                  >
                    Edit questionnaire
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setIsReferralIndicationSubmitted(true)}
              className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
            >
              Show Likelihood Gauge
            </button>
          </div>
        )
      ) : null}
    </div>
  );

  const renderKnowledgeQuiz = () => {
    if (!currentKnowledgeQuestion) {
      return null;
    }

    if (isKnowledgeQuizComplete) {
      return (
        <div className="space-y-6">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
          >
            <p className="text-sm uppercase tracking-wide text-cyan-700">Quiz Complete</p>
            <h3 className="mt-2 text-2xl md:text-3xl text-black" style={{ fontFamily: "Georgia, serif" }}>
              Final Score: {knowledgeCorrectCount}/{totalKnowledgeQuestions} ({knowledgeScorePercent}%)
            </h3>
            <p className="mt-2 text-black/75">{knowledgeBenchmark.summary}</p>

            <div className="mt-5 rounded-2xl border border-black/10 bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-cyan-800">{knowledgeBenchmark.label}</p>
              <p className="mt-1 text-black/80">{knowledgeBenchmark.action}</p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-cyan-700 transition-all duration-700"
                  style={{ width: `${Math.max(knowledgeScorePercent, 2)}%` }}
                />
              </div>

              <div className="mt-2 grid grid-cols-4 text-xs text-black/60">
                <span>0%</span>
                <span className="text-center">60%</span>
                <span className="text-center">75%</span>
                <span className="text-right">90%+</span>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                Answer Review
              </h4>
              <div className="mt-3 space-y-3">
                {kidneyKnowledgeQuizQuestions.map((question, index) => {
                  const selectedIndex = knowledgeQuizAnswers[question.id];
                  const wasCorrect = selectedIndex === question.correctIndex;

                  return (
                    <div key={question.id} className="rounded-xl border border-black/10 bg-white px-4 py-3">
                      <p className="text-sm text-black/65">Q{index + 1}</p>
                      <p className="mt-1 text-black">{question.prompt}</p>
                      <p className={`mt-2 text-sm ${wasCorrect ? "text-cyan-800" : "text-orange-700"}`}>
                        {wasCorrect ? "Correct" : "Needs review"}
                      </p>
                      <p className="mt-1 text-sm text-black/75">Correct answer: {question.options[question.correctIndex]}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={resetKnowledgeQuiz}
                className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => navigate("/doctor/dashboard/resource/peer-reviewed-papers")}
                className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-black transition-colors hover:text-cyan-700"
              >
                Review Learning Resources
              </button>
            </div>
          </motion.article>
        </div>
      );
    }

    const questionNumber = knowledgeQuizStep + 1;
    const progressPercent = Math.round((questionNumber / totalKnowledgeQuestions) * 100);

    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26 }}
        className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-wide text-cyan-700">
            Question {questionNumber} of {totalKnowledgeQuestions}
          </p>
          <p className="text-sm text-black/70">
            Score: {knowledgeCorrectCount}/{answeredKnowledgeCount}
          </p>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-cyan-100">
          <div className="h-full rounded-full bg-cyan-700 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>

        <h3 className="mt-5 text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
          {currentKnowledgeQuestion.prompt}
        </h3>

        <div className="mt-5 grid gap-3">
          {currentKnowledgeQuestion.options.map((option, index) => {
            const isSelected = currentKnowledgeChoice === index;
            const isCorrectOption = index === currentKnowledgeQuestion.correctIndex;

            return (
              <button
                key={`${currentKnowledgeQuestion.id}-${option}`}
                onClick={() => setKnowledgeAnswer(currentKnowledgeQuestion.id, index)}
                disabled={isCurrentKnowledgeAnswered}
                className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                  isCurrentKnowledgeAnswered
                    ? isCorrectOption
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : isSelected
                        ? "border-orange-300 bg-orange-50 text-orange-800"
                        : "border-black/15 bg-white text-black/60"
                    : "border-black/15 bg-cyan-50 text-black hover:text-cyan-700"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isCurrentKnowledgeAnswered ? (
          <div className={`mt-5 rounded-2xl border px-4 py-4 ${isCurrentKnowledgeCorrect ? "border-cyan-200 bg-cyan-50" : "border-orange-200 bg-orange-50"}`}>
            <p className={`text-sm font-semibold ${isCurrentKnowledgeCorrect ? "text-cyan-800" : "text-orange-800"}`}>
              {isCurrentKnowledgeCorrect ? applauseMessage : encouragementMessage}
            </p>
            <p className="mt-1 text-black/80">{currentKnowledgeQuestion.explanation}</p>
            <p className="mt-2 text-sm text-black/60">Source: {currentKnowledgeQuestion.source}</p>
          </div>
        ) : (
          <p className="mt-5 text-sm text-black/65">Select one option to reveal feedback and the source-based explanation.</p>
        )}

        {isCurrentKnowledgeAnswered ? (
          <div className="mt-6 flex justify-end">
            <button
              onClick={goToNextKnowledgeQuestion}
              className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
            >
              {knowledgeQuizStep === totalKnowledgeQuestions - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        ) : null}
      </motion.article>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DoctorHeader activeMode={detail.mode} />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-wash" />
        <DoctorDecorativeArt activeMode={detail.mode} />

        <section className="relative z-10 mx-auto min-h-[calc(100vh-68px)] w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => {
                if (selectedGeneticDiseaseTopic) {
                  navigate("/doctor/dashboard/resource/common-genetic-kidney-diseases");
                  return;
                }

                navigate(`/doctor/dashboard/${detail.mode}`);
              }}
              className="rounded-full border border-[#c3d6d9] bg-white px-4 py-2 text-sm font-semibold text-[#00687b] transition-colors hover:bg-[#cfe7ea]"
            >
              Back
            </button>
          </div>

          {showDetailHero ? (
            <div className="mb-6 rounded-3xl border border-[#c3d6d9] bg-white p-6 shadow-[0_10px_30px_-14px_rgba(12,48,58,0.16),0_2px_6px_-3px_rgba(12,48,58,0.08)] md:p-8">
              <div className="mb-4 inline-flex rounded-2xl bg-[#cfe7ea] p-3 text-[#00687b]">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h2 className="text-3xl font-bold text-[#16323b] md:text-4xl" style={{ fontFamily: "'Lora Variable', serif" }}>
                {detail.title}
              </h2>
              <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#5b6472] md:text-lg">{detail.context}</p>
            </div>
          ) : null}

          {isPeerReviewedPapersPage ? (
            <div className="space-y-5" style={{ fontFamily: "Georgia, serif" }}>
              {detail.sections.map((section, index) => (
                <motion.article
                  key={`${section.title}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.26 }}
                  className="group rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-6"
                >
                  <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-black transition-colors group-hover:text-cyan-700" style={{ fontFamily: "Georgia, serif" }}>
                    {section.title}
                  </h3>
                  {section.meta ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {section.meta.map((meta) => (
                        <span
                          key={`${section.title}-${meta.label}`}
                          className="rounded-full border border-black/10 bg-cyan-50 px-3 py-1 text-sm text-black/80"
                        >
                          <strong className="font-semibold text-black">{meta.label}:</strong> {meta.value}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <h4 className="mt-5 text-2xl font-bold text-black" style={{ fontFamily: "Georgia, serif" }}>
                    Abstract
                  </h4>
                  {section.subtitle ? (
                    <p className="mt-2 whitespace-pre-line text-black/85 leading-relaxed text-[1.08rem]">
                      {section.subtitle}
                    </p>
                  ) : null}
                  {section.link ? (
                    <a
                      href={section.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-full border border-black/15 px-4 py-2 text-base text-black transition-colors hover:text-cyan-700"
                    >
                      Open Article
                    </a>
                  ) : null}
                </motion.article>
              ))}
            </div>
          ) : isQuizPage ? (
            renderKnowledgeQuiz()
          ) : isReferralTemplatesPage ? (
            !isReferralQuizComplete ? (
              <div>
                <div className="mb-4 rounded-2xl border border-black/10 bg-white/92 px-4 py-3 text-black/80">
                  Complete the patient risk quiz first. Your answers will be used to generate the general clinical
                  summary in the referral letter.
                </div>
                {renderRiskQuiz(true, false, false)}
              </div>
            ) : (
            <div className="space-y-6">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                <h3 className="text-2xl md:text-3xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                  Diagnosis-Based Referral Letter
                </h3>
                <p className="mt-2 text-black/75">
                  This version uses the doctor-entered kidney diagnosis to tailor the referral letter language.
                </p>
                <p className="mt-2 text-sm text-black/65">
                  Use de-identified clinical information only. Age and gender are allowed here, but do not enter names, dates of birth, medical record numbers, addresses, or other direct identifiers.
                </p>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                  <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                    De-identified Inputs
                  </h4>
                  <p className="mt-1 text-sm text-black/70">
                    Enter age, gender, and diagnosis-level or phenotype-level details only.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="text-sm text-black/75">
                      Age
                      <input
                        type="text"
                        value={referralTemplateForm.age}
                        onChange={(e) => setReferralField("age", e.target.value)}
                        className="mt-1 w-full rounded-xl border border-black/15 bg-cyan-50 px-3 py-2 text-black outline-none focus:border-cyan-600"
                      />
                    </label>
                    <label className="text-sm text-black/75">
                      Gender
                      <input
                        type="text"
                        value={referralTemplateForm.gender}
                        onChange={(e) => setReferralField("gender", e.target.value)}
                        className="mt-1 w-full rounded-xl border border-black/15 bg-cyan-50 px-3 py-2 text-black outline-none focus:border-cyan-600"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                  <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                    Letter Preview
                  </h4>
                  <p className="mt-1 text-sm text-black/70">
                    The download uses a diagnosis-based template. Update the kidney condition or quiz answers if you want to change the letter.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-2xl bg-cyan-50 p-4 text-sm leading-6 text-black whitespace-pre-wrap">
                    {buildReferralTemplateLetter()}
                  </pre>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsReferralQuizComplete(false)}
                    className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                  >
                    Edit Quiz Answers
                  </button>
                  <button
                    onClick={downloadReferralTemplatePdf}
                    className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={downloadReferralTemplateWordDoc}
                    className="rounded-full bg-cyan-600 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-700"
                  >
                    Download Word (.doc)
                  </button>
                  <button
                    onClick={resetReferralFormKeepingQuizData}
                    className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                  >
                    Reset Form
                  </button>
                </div>
              </motion.article>
            </div>
            )
          ) : isOrderTestingDirectlyPage ? (
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-6 text-black">
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
                  Genetic Counseling Workflow
                </h2>
                <p className="text-base md:text-lg opacity-85">
                  Clinical workflow and counseling steps
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:auto-rows-fr xl:grid-cols-3">
                {orderTestingWorkflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const cardClasses =
                    "group mx-auto grid h-[430px] w-full max-w-[560px] grid-rows-[112px_120px_1fr] rounded-[44px] border border-black/10 bg-white/94 px-8 py-8 text-left shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.12)]";

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.28 }}
                      className="h-full"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (step.href) {
                            window.location.assign(step.href);
                            return;
                          }

                          if (step.route) {
                            navigate(step.route);
                          }
                        }}
                        className={`${cardClasses} cursor-pointer`}
                      >
                        <div className="inline-flex h-[96px] w-[96px] items-center justify-center self-start rounded-[28px] bg-[#eef4ff] text-[#193568]">
                          <Icon
                            className="h-10 w-10 transition-colors group-hover:text-cyan-700 md:h-12 md:w-12"
                            strokeWidth={1.6}
                          />
                        </div>
                        <h3
                          className="max-w-[16ch] self-start text-2xl leading-tight text-black transition-colors group-hover:text-cyan-700 md:text-3xl"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {step.title}
                        </h3>
                        <p className="self-start text-sm leading-8 text-black/70 transition-colors group-hover:text-cyan-700 md:text-base">
                          {step.description}
                        </p>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : isLetterMedicalNecessityPage ? (
            <div className="mx-auto max-w-[1180px]">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                id="letter-of-medical-necessity-template"
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Workflow Support</p>
                      <h3 className="mt-3 text-2xl md:text-4xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Letter of Medical Necessity Template
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-black/75">
                        Preserve the direct-order workflow details while drafting payer-facing justification language for
                        kidney genetic testing using de-identified clinical information only.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4">
                      <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Ordering inputs
                      </h4>
                      <div className="mt-4 space-y-4">
                        <label className="block text-sm text-black/75">
                          Kidney condition
                          <input
                            type="text"
                            value={personalKidneyCondition}
                            onChange={(e) => setPersonalKidneyCondition(e.target.value)}
                            placeholder="Enter suspected kidney condition only"
                            className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-black outline-none focus:border-cyan-600"
                          />
                        </label>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <label className="text-sm text-black/75">
                            Age
                            <input
                              type="text"
                              value={referralTemplateForm.age}
                              onChange={(e) => setReferralField("age", e.target.value)}
                              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-black outline-none focus:border-cyan-600"
                            />
                          </label>
                          <label className="text-sm text-black/75">
                            Gender
                            <input
                              type="text"
                              value={referralTemplateForm.gender}
                              onChange={(e) => setReferralField("gender", e.target.value)}
                              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-black outline-none focus:border-cyan-600"
                            />
                          </label>
                        </div>

                        <label className="block text-sm text-black/75">
                          Clinical summary
                          <textarea
                            value={referralTemplateForm.clinicalSummary}
                            onChange={(e) => setReferralField("clinicalSummary", e.target.value)}
                            rows={7}
                            placeholder="Enter de-identified phenotype, indication, family history, and extra-renal features. Do not include names, DOBs, MRNs, addresses, or exact dates."
                            className="mt-1 w-full rounded-2xl border border-black/15 bg-white px-3 py-3 text-black outline-none focus:border-cyan-600"
                          />
                        </label>
                        <p className="text-sm text-black/65">
                          Keep this summary de-identified and limited to clinically necessary details.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4">
                      <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                        What this preserves
                      </h4>
                      <ul className="mt-4 space-y-3 text-black/75">
                        <li className="rounded-2xl bg-white px-4 py-3">Cost and coverage guidance from the billing resource page.</li>
                        <li className="rounded-2xl bg-white px-4 py-3">Clinician-facing ordering language adapted from the referral template workflow.</li>
                        <li className="rounded-2xl bg-white px-4 py-3">Download options for quick documentation handoff.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                      <h4 className="text-lg text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Draft letter preview
                      </h4>
                      <p className="mt-2 text-sm text-black/65">
                        This preview keeps the existing direct-order content, but frames it as the workflow's letter of
                        medical necessity template.
                      </p>
                      <pre className="mt-4 overflow-x-auto rounded-2xl bg-cyan-50 p-4 text-sm leading-6 text-black whitespace-pre-wrap">
                        {buildReferralTemplateLetter()}
                      </pre>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={downloadReferralTemplatePdf}
                        className="rounded-full bg-cyan-700 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={downloadReferralTemplateWordDoc}
                        className="rounded-full bg-cyan-600 px-5 py-2 text-sm text-white transition-colors hover:bg-cyan-700"
                      >
                        Download Word (.doc)
                      </button>
                      <button
                        onClick={resetDirectOrderingForm}
                        className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                      >
                        Reset Toolkit
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ) : isRenalPatientOrganizationsPage && detail.organizationLinks?.length && detail.featuredLink ? (
            <div className="mx-auto max-w-[1240px]">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                <h3
                  className="text-center text-2xl md:text-4xl text-black"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {detail.title}
                </h3>

                <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)] lg:items-center">
                  <div className="space-y-4">
                    {detail.organizationLinks.map((organization) => (
                      <div key={organization.url} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-base leading-relaxed text-black/85 md:text-lg">
                        <div>
                          <span className="font-semibold">{organization.label}</span>
                          <span> - </span>
                          <a
                            href={organization.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6a74c9] underline underline-offset-2 hover:text-cyan-700"
                          >
                            {organization.domainLabel}
                          </a>
                        </div>
                        {organization.description ? (
                          <p className="mt-1 text-sm leading-relaxed text-black/65 md:text-base">
                            {organization.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <a
                    href={detail.featuredLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[28px] border border-[#d59b9b] bg-gradient-to-br from-[#fff5f5] via-white to-[#fff0f0] p-6 shadow-[0_12px_28px_rgba(140,20,20,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(140,20,20,0.16)]"
                  >
                    <p
                      className="text-2xl leading-tight text-[#9e1d1d] underline decoration-[#9e1d1d] underline-offset-4 md:text-[2rem]"
                      style={{
                        fontFamily: "Georgia, serif",
                        textShadow: "0 3px 8px rgba(120, 20, 20, 0.14)",
                      }}
                    >
                      {detail.featuredLink.label}
                    </p>
                  </a>
                </div>
              </motion.article>
            </div>
          ) : isCommonGeneticKidneyDiseasesPage && detail.diseaseLinks?.length ? (
            <div className="mx-auto max-w-[1120px]">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                {selectedGeneticDiseaseTopic ? (
                  <div className="space-y-6">
                    {selectedGeneticDiseaseTopic.id === "tubulopathies" ? (
                      <div className="space-y-5">
                        <div className="grid gap-0 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] md:grid-cols-2">
                          <div className="border-b border-black/10 bg-[#f5f8fd] p-6 md:border-b-0 md:border-r">
                            <h3
                              className="text-center text-3xl text-[#2f6fa5] md:text-5xl"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              BARTTER SYNDROME
                            </h3>

                            <div className="mt-6 space-y-3">
                              {selectedGeneticDiseaseTopic.featureCards[0]?.bullets.slice(0, 4).map((bullet) => (
                                <div
                                  key={bullet}
                                  className="rounded-2xl border-2 border-[#8caecc] bg-white px-4 py-3 text-xl text-black md:text-2xl"
                                >
                                  {bullet}
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 rounded-[24px] border-2 border-[#7da6cb] bg-white px-5 py-4 text-center">
                              <p className="text-2xl font-semibold text-black md:text-3xl">Indications:</p>
                              <p className="mt-2 text-xl leading-snug text-black md:text-2xl">
                                Neonatal/Infantile
                                <br />
                                Hypokalemic Alkalosis
                              </p>
                            </div>

                            <div className="mt-6 rounded-[24px] bg-[#2f78b2] px-5 py-5 text-center text-white">
                              <p className="text-2xl font-semibold md:text-3xl">Utility:</p>
                              <p className="mt-2 text-xl leading-snug md:text-2xl">
                                Guides Lifelong Electrolyte
                                <br />
                                and Growth Management
                              </p>
                            </div>
                          </div>

                          <div className="bg-[#f6fbf3] p-6">
                            <h3
                              className="text-center text-3xl text-[#54965c] md:text-5xl"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              GITELMAN SYNDROME
                            </h3>

                            <div className="mt-6 rounded-2xl border-2 border-[#7cae87] bg-white px-4 py-3 text-xl text-black md:text-2xl">
                              {selectedGeneticDiseaseTopic.featureCards[1]?.bullets[0]}
                            </div>

                            <div className="mt-6 rounded-[24px] border-2 border-[#88bc8f] bg-white px-5 py-4 text-center">
                              <p className="text-2xl font-semibold text-black md:text-3xl">Indications:</p>
                              <p className="mt-2 text-xl leading-snug text-black md:text-2xl">
                                Chronic Hypokalemia,
                                <br />
                                Hypomagnesemia, Low BP
                              </p>
                            </div>

                            <div className="mt-6 rounded-[24px] bg-[#59a86c] px-5 py-5 text-center text-white">
                              <p className="text-2xl font-semibold md:text-3xl">Utility:</p>
                              <p className="mt-2 text-xl leading-snug md:text-2xl">
                                Avoids Unnecessary Workups,
                                <br />
                                Confirms Benign Course
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                          <a
                            href={selectedGeneticDiseaseTopic.referenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-cyan-700"
                          >
                            {selectedGeneticDiseaseTopic.referenceLabel}
                          </a>
                        </div>
                      </div>
                    ) : selectedGeneticDiseaseTopic.id === "ciliopathies" ? (
                      <div className="space-y-5">
                        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                          <div className="grid gap-0 lg:grid-cols-[0.58fr_0.42fr]">
                            <div className="border-b border-black/10 bg-[#244d73] px-5 py-4 text-white lg:border-b-0 lg:border-r">
                              <h3
                                className="text-3xl leading-tight md:text-5xl"
                                style={{ fontFamily: "Georgia, serif" }}
                              >
                                Nephronophthisis-Related
                                <br />
                                Ciliopathies (NPHP-RC)
                              </h3>
                            </div>
                            <div className="bg-[#244d73] px-5 py-4 text-white">
                              <h3
                                className="text-2xl leading-tight md:text-4xl"
                                style={{ fontFamily: "Georgia, serif" }}
                              >
                                Genetic disorders affecting
                                <br />
                                kidney cilia and multiple organs
                              </h3>
                            </div>
                          </div>

                          <div className="grid gap-4 p-4 lg:grid-cols-[0.62fr_0.38fr]">
                            <div className="grid gap-4 md:grid-cols-2">
                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    GENES
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-lg leading-relaxed text-black/90 md:text-2xl">
                                  {selectedGeneticDiseaseTopic.featureCards[0]?.bullets.slice(0, 2).map((bullet) => (
                                    <div key={bullet}>• {bullet}</div>
                                  ))}
                                  <div className="rounded-2xl border border-[#d3a36c] bg-[#fff8ee] px-3 py-3 text-base md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[0]?.bullets[2]}
                                  </div>
                                </div>
                              </article>

                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    CLINICAL FEATURES
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[3]?.bullets.map((bullet) => (
                                    <div key={bullet}>• {bullet}</div>
                                  ))}
                                </div>
                              </article>

                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    INHERITANCE
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-lg leading-relaxed text-black/90 md:text-2xl">
                                  <div>{selectedGeneticDiseaseTopic.featureCards[1]?.bullets[0]}</div>
                                  <div>{selectedGeneticDiseaseTopic.featureCards[1]?.bullets[1]}</div>
                                  <div className="rounded-2xl border border-[#d99b9b] bg-[#fff1f1] px-3 py-3 text-base md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[1]?.bullets[2]}
                                  </div>
                                </div>
                              </article>

                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    WHY IT MATTERS
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[2]?.bullets.map((bullet) => (
                                    <div key={bullet}>• {bullet}</div>
                                  ))}
                                </div>
                              </article>
                            </div>

                            <div className="space-y-4">
                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    ONSET
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[4]?.bullets.map((bullet) => (
                                    <div key={bullet}>• {bullet}</div>
                                  ))}
                                </div>
                              </article>

                              <article className="rounded-[24px] border border-[#9eb8c8] bg-[#f5fbff]">
                                <div className="rounded-t-[24px] border-b border-[#9eb8c8] bg-[#e5f0f7] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    EXAMPLES
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[5]?.bullets.map((bullet) => (
                                    <div key={bullet}>• {bullet}</div>
                                  ))}
                                </div>
                              </article>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                          <a
                            href={selectedGeneticDiseaseTopic.referenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-cyan-700"
                          >
                            {selectedGeneticDiseaseTopic.referenceLabel}
                          </a>
                        </div>
                      </div>
                    ) : selectedGeneticDiseaseTopic.id === "fabry" ? (
                      <div className="space-y-5">
                        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                          <div className="px-5 py-5 text-center">
                            <h3
                              className="text-3xl leading-tight text-[#2d6ea1] md:text-5xl"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              Fabry Disease: Key Features &amp; Clinical Value
                            </h3>
                          </div>

                          <div className="px-5 pb-5">
                            <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-[#6b9bb8] bg-[#e8f4fb] px-5 py-3">
                              <span className="text-2xl text-[#2d6ea1] md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                Gene
                              </span>
                              <span className="rounded-xl border border-black/15 bg-white px-4 py-1 text-3xl font-semibold text-black md:text-4xl">
                                {selectedGeneticDiseaseTopic.featureCards[0]?.bullets[0]}
                              </span>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-[24px] border-2 border-[#7ca7ba]">
                              <div className="bg-[#e9f6fb] px-4 py-3 text-center">
                                <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                  Testing Indications
                                </h4>
                              </div>
                              <div className="grid gap-0 border-t border-[#7ca7ba] md:grid-cols-2">
                                <div className="border-b border-[#7ca7ba] bg-[#eef9f1] px-5 py-5 text-center md:border-b-0 md:border-r">
                                  <p className="text-2xl font-semibold text-black md:text-3xl">
                                    {selectedGeneticDiseaseTopic.featureCards[1]?.bullets[0]}
                                  </p>
                                </div>
                                <div className="bg-[#eef9f1] px-5 py-5 text-center">
                                  <p className="text-2xl font-semibold text-black md:text-3xl">
                                    {selectedGeneticDiseaseTopic.featureCards[1]?.bullets[1]}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-[24px] border-2 border-[#c5b6d9]">
                              <div className="bg-[#efe8f8] px-4 py-3 text-center">
                                <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                  Clinical Value
                                </h4>
                              </div>
                              <div className="grid gap-0 border-t border-[#c5b6d9] md:grid-cols-3">
                                {selectedGeneticDiseaseTopic.featureCards[2]?.bullets.map((bullet, index) => (
                                  <div
                                    key={bullet}
                                    className={`bg-[#f6f1fb] px-5 py-5 text-center ${
                                      index < 2 ? "border-b border-[#c5b6d9] md:border-b-0 md:border-r" : ""
                                    }`}
                                  >
                                    <p className="text-xl font-semibold leading-snug text-black md:text-2xl">
                                      {bullet.split(":")[0]}
                                    </p>
                                    <p className="mt-3 text-lg leading-relaxed text-black/85 md:text-xl">
                                      {bullet.includes(":") ? bullet.split(":").slice(1).join(":").trim() : ""}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                          <a
                            href={selectedGeneticDiseaseTopic.referenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-cyan-700"
                          >
                            {selectedGeneticDiseaseTopic.referenceLabel}
                          </a>
                        </div>
                      </div>
                    ) : selectedGeneticDiseaseTopic.id === "mitochondrial" ? (
                      <div className="space-y-5">
                        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                          <div className="grid gap-4 p-4 lg:grid-cols-[0.33fr_0.31fr_0.36fr]">
                            <div className="space-y-4">
                              <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    GENES
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-lg leading-relaxed text-black/90 md:text-2xl">
                                  {selectedGeneticDiseaseTopic.featureCards[0]?.bullets.map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                </div>
                              </article>

                              <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    INHERITANCE
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-lg leading-relaxed text-black/90 md:text-2xl">
                                  {selectedGeneticDiseaseTopic.featureCards[1]?.bullets.slice(0, 2).map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                  <div className="rounded-2xl border border-[#d6b064] bg-[#fff6dc] px-3 py-3 text-base md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[1]?.bullets[2]}
                                  </div>
                                </div>
                              </article>
                            </div>

                            <div className="space-y-4">
                              <div className="px-2 py-1 text-center">
                                <h3
                                  className="text-3xl leading-tight text-black md:text-5xl"
                                  style={{ fontFamily: "Georgia, serif" }}
                                >
                                  Mitochondrial Nephropathy
                                </h3>
                              </div>

                              <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    WHY IT MATTERS
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-lg leading-relaxed text-black/90 md:text-2xl">
                                  {selectedGeneticDiseaseTopic.featureCards[2]?.bullets.map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                </div>
                              </article>

                              <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    MITOCHONDRIA
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[3]?.bullets.map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                </div>
                              </article>
                            </div>

                            <div className="space-y-4">
                              <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    CLINICAL FEATURES
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[4]?.bullets.map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                </div>
                              </article>

                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                                <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                  <div className="bg-[#d9edf6] px-4 py-3">
                                    <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                      ONSET
                                    </h4>
                                  </div>
                                  <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[5]?.bullets.map((bullet) => (
                                      <div key={bullet}>{bullet}</div>
                                    ))}
                                  </div>
                                </article>

                                <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                  <div className="bg-[#d9edf6] px-4 py-3">
                                    <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                      EXAMPLES
                                    </h4>
                                  </div>
                                  <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[6]?.bullets.map((bullet) => (
                                      <div key={bullet}>{bullet}</div>
                                    ))}
                                  </div>
                                </article>
                              </div>

                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                                <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                  <div className="bg-[#d9edf6] px-4 py-3">
                                    <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                      GENETIC COUNSELING
                                    </h4>
                                  </div>
                                  <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[7]?.bullets.map((bullet) => (
                                      <div key={bullet}>{bullet}</div>
                                    ))}
                                  </div>
                                </article>

                                <article className="overflow-hidden rounded-[24px] border border-[#a9c3d0] bg-[#eef8fd]">
                                  <div className="bg-[#d9edf6] px-4 py-3">
                                    <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                      GENETIC TESTING
                                    </h4>
                                  </div>
                                  <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                    {selectedGeneticDiseaseTopic.featureCards[8]?.bullets.map((bullet) => (
                                      <div key={bullet}>{bullet}</div>
                                    ))}
                                  </div>
                                </article>
                              </div>

                              <article className="overflow-hidden rounded-[24px] border border-[#7999b0] bg-[#eef8fd]">
                                <div className="bg-[#d9edf6] px-4 py-3">
                                  <h4 className="text-2xl text-black md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                                    KEY TAKEAWAY
                                  </h4>
                                </div>
                                <div className="space-y-3 p-4 text-base leading-relaxed text-black/90 md:text-xl">
                                  {selectedGeneticDiseaseTopic.featureCards[9]?.bullets.map((bullet) => (
                                    <div key={bullet}>{bullet}</div>
                                  ))}
                                </div>
                              </article>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                          <a
                            href={selectedGeneticDiseaseTopic.referenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-cyan-700"
                          >
                            {selectedGeneticDiseaseTopic.referenceLabel}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="rounded-[22px] bg-[#2e5c96] px-5 py-4 text-white shadow-[0_8px_20px_rgba(21,43,84,0.16)]">
                          <h3
                            className="text-2xl leading-tight md:text-4xl"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {selectedGeneticDiseaseTopic.title}
                          </h3>
                        </div>

                        <div
                          className={`grid gap-6 ${
                            selectedGeneticDiseaseTopic.id === "adpkd"
                              ? "xl:grid-cols-[0.9fr_1.1fr]"
                              : ""
                          }`}
                        >
                          <div className="space-y-5">
                            {selectedGeneticDiseaseTopic.primarySections.length > 0 ? (
                              <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                                {selectedGeneticDiseaseTopic.primarySections.map((section) => (
                                  <div key={section.title} className="mb-5 last:mb-0">
                                    <h4
                                      className="text-2xl text-black md:text-3xl"
                                      style={{ fontFamily: "Georgia, serif" }}
                                    >
                                      {section.title}
                                    </h4>
                                    <ul className="mt-3 list-disc space-y-2 pl-6 text-lg leading-relaxed text-black/85 md:text-[1.65rem]">
                                      {section.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                              <a
                                href={selectedGeneticDiseaseTopic.referenceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2 transition-colors hover:text-cyan-700"
                              >
                                {selectedGeneticDiseaseTopic.referenceLabel}
                              </a>
                            </div>

                            {selectedGeneticDiseaseTopic.nextTopicLink ? (
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/doctor/dashboard/resource/common-genetic-kidney-diseases?topic=${selectedGeneticDiseaseTopic.nextTopicLink?.topicId}`,
                                  )
                                }
                                className="text-left text-2xl leading-snug text-[#214fd1] underline underline-offset-4 transition-colors hover:text-cyan-700 md:text-[2.25rem]"
                                style={{ fontFamily: "Georgia, serif" }}
                              >
                                {selectedGeneticDiseaseTopic.nextTopicLink.label}
                              </button>
                            ) : null}
                          </div>

                          <div
                            className={`grid gap-4 ${
                              selectedGeneticDiseaseTopic.id === "arpkd"
                                ? "md:grid-cols-3"
                                : "md:grid-cols-2"
                            }`}
                          >
                            {selectedGeneticDiseaseTopic.featureCards.map((card, index) => {
                              const cardHeaderClass =
                                selectedGeneticDiseaseTopic.id === "arpkd"
                                  ? ["bg-[#b9e0f6]", "bg-[#cdeebf]", "bg-[#d9c6ef]"][index] ?? "bg-cyan-100"
                                  : ["bg-[#2e5c96]", "bg-[#6f9946]", "bg-[#c36d35]", "bg-[#2e5c96]", "bg-[#c36d35]"][index] ??
                                    "bg-cyan-100";

                              return (
                                <article
                                  key={card.title}
                                  className={`overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] ${
                                    selectedGeneticDiseaseTopic.id === "adpkd" &&
                                    (card.title === "Clinical Features" || card.title === "Example Cases")
                                      ? "md:col-span-2"
                                      : ""
                                  }`}
                                >
                                  <div className={`${cardHeaderClass} px-4 py-3`}>
                                    <h4
                                      className={`text-center text-xl md:text-2xl ${
                                        cardHeaderClass.includes("bg-[#b9e0f6]") ||
                                        cardHeaderClass.includes("bg-[#cdeebf]") ||
                                        cardHeaderClass.includes("bg-[#d9c6ef]")
                                          ? "text-black"
                                          : "text-white"
                                      }`}
                                      style={{ fontFamily: "Georgia, serif" }}
                                    >
                                      {card.title}
                                    </h4>
                                  </div>
                                  <div className="p-4">
                                    <ul className="space-y-3 text-base leading-relaxed text-black/85 md:text-lg">
                                      {card.bullets.map((bullet) => (
                                        <li key={bullet} className="rounded-2xl bg-[#f7fafc] px-3 py-2">
                                          {bullet}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-3xl text-black md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
                      {detail.title}
                    </h3>
                    <p className="max-w-4xl text-base leading-relaxed text-black/75 md:text-lg">
                      Most genetic diseases causing CKD are extremely rare. There are hundreds of such genetic
                      diseases, and together they cause about 10% of CKD cases. Most of these diseases are diagnosed
                      only with a genetic test. We are only providing here a short highlight of some of those diseases.
                    </p>
                    {detail.diseaseLinks.map((disease) => (
                      <button
                        key={disease.label}
                        type="button"
                        onClick={() => {
                          if (!disease.topicId) return;
                          navigate(`/doctor/dashboard/resource/common-genetic-kidney-diseases?topic=${disease.topicId}`);
                        }}
                        className={`block text-left text-lg leading-[1.45] text-black transition-colors hover:text-cyan-700 md:text-2xl ${
                          disease.topicId ? "cursor-pointer" : "cursor-default"
                        }`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        <span className="mr-3 align-top">-</span>
                        <span className="underline underline-offset-4">{disease.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.article>
            </div>
          ) : isPostersPage ? (
            <div className="mx-auto max-w-[1180px]">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Clinic Poster</p>
                    <h3 className="mt-3 text-2xl md:text-4xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                      Family Genetic Testing Flyer
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-black/75">
                      Use this flyer in clinic spaces to prompt family-history discussions, support earlier recognition
                      of inherited kidney disease, and direct patients toward genetic counseling resources.
                    </p>

                    <div className="mt-5 rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-black/75">
                      The poster preview is displayed at a larger portrait scale for easier review. Open or download
                      the full-resolution image for printing.
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={publicAsset("posters/Flyer_v3.2.png")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full bg-cyan-700 px-4 py-2 text-sm text-white transition-colors hover:bg-cyan-800"
                      >
                        Open Full Size
                      </a>
                      <a
                        href={publicAsset("posters/Flyer_v3.2.png")}
                        download
                        className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                      >
                        Download Poster
                      </a>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.10)]">
                    <div className="flex min-h-[720px] items-center justify-center bg-[linear-gradient(180deg,#f9fdff_0%,#edf9fc_100%)] p-4 md:p-6">
                      <img
                        src={publicAsset("posters/Flyer_v3.2.png")}
                        alt="Family genetic testing flyer poster"
                        className="max-h-[82vh] w-auto max-w-full rounded-[20px] object-contain shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ) : isCostsPage ? (
            <div className="mx-auto max-w-[980px]">
              <div className="space-y-6">
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
                >
                  <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Billing Overview</p>
                      <h3 className="mt-3 text-2xl md:text-4xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Affordable pricing and billing options
                      </h3>
                      <p className="mt-3 max-w-3xl text-base leading-relaxed text-black/75 md:text-lg">
                        Most Renasight and Prospera patients are expected to have no out-of-pocket costs. If co-pay or
                        co-insurance results in a bill, the patient can be informed about available financial
                        assistance programs before costs become a barrier.
                      </p>

                      <div className="mt-6 rounded-[24px] border border-black/10 bg-cyan-50 p-5">
                        <h4 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                          Insurance coverage
                        </h4>
                        <ul className="mt-4 space-y-3 text-black/75">
                          {costsCoveragePoints.map((point) => (
                            <li key={point} className="rounded-2xl bg-white px-4 py-3">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.10)]">
                      <img
                        src={publicAsset("resource-graphics/costs-billing-hero.png")}
                        alt="Affordable pricing and billing options handout graphic"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
                >
                  <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
                    <div>
                      <h4 className="text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        What to tell patients
                      </h4>
                      <p className="mt-3 text-black/75">
                        The source handout emphasizes that coverage is common, that in-network status may lower cost, and
                        that financial counseling is available when billing questions arise.
                      </p>
                      <div className="mt-5 rounded-[24px] border border-black/10 bg-cyan-50 p-4 text-sm leading-relaxed text-black/75">
                        Please refer patients with billing concerns to the financial counseling team and verify plan
                        details when Medicare Advantage or unusual coverage circumstances may apply.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-5">
                        <h4 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                          Financial access programs
                        </h4>
                        <ul className="mt-4 space-y-3 text-black/75">
                          {costsSupportPrograms.map((program) => (
                            <li key={program} className="rounded-2xl bg-white px-4 py-3">
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[24px] bg-[#0d1b2a] p-5 text-white shadow-[0_16px_36px_rgba(13,27,42,0.18)]">
                        <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Contact</p>
                        <p className="mt-4 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
                          Financial Counseling
                        </p>
                        <p className="mt-4 text-white/80">Phone: (650) 489-4873</p>
                        <p className="mt-2 break-all text-white/80">Email: financialsupport@natera.com</p>
                        <p className="mt-5 text-sm text-white/70">
                          Source organization: Natera, 13011 McCallen Pass, Building A Suite 100, Austin, TX 78753.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={costsHandoutPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                    >
                      Open Original Handout
                    </a>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-black/55">
                    Handout notes: tests are performed in a CLIA-certified laboratory, with CAP accreditation and ISO
                    13485 certification. FDA clearance language and other regulatory statements remain part of the
                    original source document.
                  </p>
                </motion.article>
              </div>
            </div>
          ) : isRisksNotOfferingPage ? (
            <div className="mx-auto max-w-[980px]">
              <div className="space-y-6">
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
                >
                  <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Protections against genetic discrimination</p>
                      <h3 className="mt-3 text-2xl md:text-4xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        GINA, HIPAA, and testing children
                      </h3>
                      <p className="mt-3 max-w-3xl text-base leading-relaxed text-black/75 md:text-lg">
                        This section summarizes protections and boundaries that should be discussed when genetic testing
                        is offered in nephrology, including anti-discrimination protections, information sharing, and
                        pediatric testing ethics.
                      </p>

                      <div className="mt-6 rounded-[24px] border border-black/10 bg-cyan-50 p-5">
                        <h4 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                          Core points
                        </h4>
                        <ul className="mt-4 space-y-3 text-black/75">
                          {[
                            "GINA is a US federal law enacted in 2008 that protects against genetic discrimination in employment and health insurance.",
                            "GINA does not cover life insurance, disability insurance, or long-term care insurance.",
                            "HIPAA supports careful, privacy-preserving information sharing; family communication should generally be patient-mediated or authorized.",
                            "Children should generally not be tested for adult-onset genetic risk unless the result can affect their current medical care.",
                          ].map((objective) => (
                            <li key={objective} className="rounded-2xl bg-white px-4 py-3">
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.10)]">
                      <img
                        src={publicAsset("resource-graphics/risks-gina-signing.png")}
                        alt="Photo associated with the Genetic Information Nondiscrimination Act of 2008"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.26 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-700">Risks of not offering genetic testing</p>
                  <h3 className="mt-3 text-2xl md:text-4xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                    The doctor's legal responsibilities
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-black/75 md:text-lg">
                    Placeholder for the forthcoming legal-responsibility content. This section is intentionally not
                    filled with generated legal analysis until the source material is provided.
                  </p>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-[24px] border border-black/10 bg-[#0d1b2a] p-5 text-white shadow-[0_16px_36px_rgba(13,27,42,0.18)]">
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">GINA at a glance</p>
                      <ul className="mt-4 space-y-3 text-white/80">
                        <li className="rounded-2xl bg-white/8 px-4 py-3">Federal law enacted in 2008.</li>
                        <li className="rounded-2xl bg-white/8 px-4 py-3">
                          Protects against discrimination in employment and health insurance.
                        </li>
                        <li className="rounded-2xl bg-white/8 px-4 py-3">
                          Does not cover life, disability, or long-term care insurance.
                        </li>
                        <li className="rounded-2xl bg-white/8 px-4 py-3">
                          Best applied before disease is considered clinically manifested.
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-5">
                      <h4 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Family communication and cascade testing
                      </h4>
                      <p className="mt-3 text-black/75">
                        The deck emphasizes that genetic results have family-level impact. Clinicians should warn
                        patients, encourage disclosure, and bring in genetic counseling when relatives may benefit from
                        cascade testing.
                      </p>
                      <p className="mt-4 text-black/75">
                        US case law and HIPAA guidance both support reasonable efforts centered on patient-mediated or
                        authorized disclosure rather than direct outreach without consent.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-black/10 bg-cyan-50 p-5">
                      <h4 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        Practical clinician actions
                      </h4>
                      <ul className="mt-4 space-y-3 text-black/75">
                        {risksClinicalActions.map((action) => (
                          <li key={action} className="rounded-2xl bg-white px-4 py-3">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.10)]">
                      <img
                        src={publicAsset("resource-graphics/risks-dna-cartoon.png")}
                        alt="Illustration of genetic discrimination concerns"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.10)]">
                      <img
                        src={publicAsset("resource-graphics/risks-bias-chart.png")}
                        alt="Chart illustrating sources of bias in offering genetic testing"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={risksDeckPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                    >
                      Open Original PowerPoint
                    </a>
                    <a
                      href={risksDeckPath}
                      download
                      className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700"
                    >
                      Download Source File
                    </a>
                  </div>
                </motion.article>
              </div>
            </div>
          ) : isReferralIndicationPage ? (
            renderRiskQuiz(false, true, true)
          ) : (isCaseStudiesPage || isGeneticTestingCounselingVideosPage) && detail.videoLinks?.length ? (
            <div className="mx-auto max-w-[1320px] space-y-6" style={{ fontFamily: "Georgia, serif" }}>
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-7"
              >
                <h3 className="text-2xl text-black md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
                  {isCaseStudiesPage ? "Personal Stories Video Library" : "Genetic Testing and Counseling Video Library"}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-relaxed text-black/75 md:text-lg">
                  {isCaseStudiesPage
                    ? "Play personal-story videos directly on this page."
                    : "Play the embedded YouTube videos directly on this page."}
                </p>
              </motion.article>

              <div className="grid gap-6 lg:grid-cols-2">
                {detail.videoLinks.map((videoItem, index) => {
                  const previewUrl =
                    videoItem.thumbnailUrl ??
                    `https://image.thum.io/get/width/1200/noanimate/${videoItem.url}`;
                  const previewFailed = failedPreviewUrls[videoItem.url];
                  const hostLabel = getHostLabel(videoItem.url);
                  const isEmbeddedVideo = Boolean(videoItem.embedUrl);

                  return (
                    <motion.article
                      key={videoItem.url}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.26 }}
                      className="overflow-hidden rounded-[30px] border border-black/10 bg-white/92 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-5"
                    >
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h4
                            className="text-xl leading-tight text-black md:text-2xl"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {videoItem.title}
                          </h4>
                          {videoItem.subtitle ? (
                            <p className="mt-2 text-base leading-relaxed text-black/70">{videoItem.subtitle}</p>
                          ) : null}
                        </div>
                        <a
                          href={videoItem.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded-full border border-black/15 px-3 py-1 text-sm text-black transition-colors hover:text-cyan-700"
                        >
                          {videoItem.buttonLabel ?? "Open video"}
                        </a>
                      </div>

                      {isEmbeddedVideo ? (
                        <div className="overflow-hidden rounded-[24px] border border-black/10 bg-black shadow-[0_8px_20px_rgba(0,0,0,0.14)]">
                          <div className="aspect-video w-full">
                            <iframe
                              src={videoItem.embedUrl}
                              title={videoItem.title}
                              className="h-full w-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : !previewFailed ? (
                        <a
                          href={videoItem.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition-transform hover:-translate-y-1"
                        >
                          <div className="relative">
                            <img
                              src={previewUrl}
                              alt={`Preview for ${videoItem.title}`}
                              className="h-64 w-full object-cover"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setFailedPreviewUrls((prev) => ({
                                  ...prev,
                                  [videoItem.url]: true,
                                }))
                              }
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#102347]">
                              {videoItem.sourceLabel ?? "Video"}
                            </div>
                          </div>
                        </a>
                      ) : (
                        <a
                          href={videoItem.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-64 w-full items-center justify-center rounded-[24px] border border-black/10 bg-gradient-to-br from-cyan-200 via-white to-cyan-300 px-6 text-center shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                        >
                          <p className="text-base text-black/80">{hostLabel}</p>
                        </a>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            </div>
          ) : isExternalTrainingPage && detail.linkPreviews?.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {detail.linkPreviews.map((linkItem, index) => {
                const previewUrl =
                  linkItem.imageUrl ??
                  `https://image.thum.io/get/width/1200/noanimate/${linkItem.url}`;
                const previewFailed = failedPreviewUrls[linkItem.url];
                const hostLabel = getHostLabel(linkItem.url);
                const isCustomPreview = Boolean(linkItem.imageUrl);

                return (
                  <motion.a
                    key={linkItem.url}
                    href={linkItem.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.26 }}
                    className="overflow-hidden rounded-[30px] border border-black/10 bg-white/92 shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
                  >
                    {!previewFailed ? (
                      <div
                        className={
                          isCustomPreview
                            ? "flex h-48 w-full items-center justify-center p-8"
                            : ""
                        }
                        style={
                          isCustomPreview
                            ? { backgroundColor: linkItem.imageBackgroundColor ?? "#ffffff" }
                            : undefined
                        }
                      >
                        <img
                          src={previewUrl}
                          alt={linkItem.imageAlt ?? `Website preview for ${linkItem.title}`}
                          className={
                            isCustomPreview
                              ? "h-full w-full object-contain"
                              : "h-48 w-full object-cover"
                          }
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedPreviewUrls((prev) => ({
                              ...prev,
                              [linkItem.url]: true,
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-cyan-200 via-white to-cyan-300 px-4 text-center">
                        <p className="text-base text-black/80">{hostLabel}</p>
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                        {linkItem.title}
                      </h3>
                      {linkItem.subtitle ? <p className="mt-2 text-black/70">{linkItem.subtitle}</p> : null}
                      <p className="mt-3 break-all text-sm text-cyan-800">{linkItem.url}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          ) : isWhyGeneticTestingPage ? (
            <div className="mx-auto max-w-[1120px] space-y-6">
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26 }}
                className="rounded-[30px] border border-black/10 bg-white/92 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-8"
              >
                <p className="max-w-4xl text-lg leading-relaxed text-black/85 md:text-[1.45rem]">
                  Genetic testing plays a critical role in nephrology because a significant proportion of
                  chronic kidney disease (CKD), 10-20% of adults with CKD and up to 70% of children with CKD, has a
                  monogenic cause that can be identified with a genetic test. Despite this, nephrology currently lags behind other specialties
                  in implementing genetic testing. Identifying a genetic cause of kidney disease provides
                  major clinical benefits, including:
                </p>

                <div className="mt-8 space-y-4">
                  {whyGeneticTestingBenefits.map((benefit) => (
                    <div key={benefit.label} className="flex gap-4 rounded-[24px] bg-cyan-50 px-5 py-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-cyan-700" />
                      <p className="text-lg leading-relaxed text-black/85 md:text-[1.12rem]">
                        <strong className="text-black">{benefit.label}:</strong> {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-black/10 pt-5">
                  <p className="text-sm uppercase tracking-wide text-cyan-800">References</p>
                  <div className="mt-2 space-y-3 text-base leading-relaxed text-cyan-900">
                    {[
                      {
                        label:
                          "Franceschini N, Feldman DL, Berg JS, et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. Am J Kidney Dis. 2024.",
                        href: "https://pubmed.ncbi.nlm.nih.gov/39033956/",
                      },
                      {
                        label: "Genetic Testing in the Management of Adult CKD.",
                        href: "https://www.ovid.com/jnls/jasn/fulltext/10.1681/asn.0000000913~genetic-testing-in-the-management-of-adult-ckd",
                      },
                      {
                        label:
                          "The Clinical Utility of Genetic Testing in the Diagnosis and Management of Adults with Chronic Kidney Disease.",
                        href: "https://www.ovid.com/jnls/jasn/fulltext/10.1681/asn.0000000000000249~the-clinical-utility-of-genetic-testing-in-the-diagnosis-and",
                      },
                      {
                        label:
                          "Genetic evaluation of living kidney donor candidates: A review and recommendations for best practices.",
                        href: "https://www.amjtransplant.org/article/S1600-6135(23)00305-2/fulltext",
                      },
                    ].map((reference) => (
                      <a
                        key={reference.href}
                        href={reference.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block underline decoration-cyan-400 underline-offset-4"
                      >
                        {reference.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>

              <motion.aside
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.26 }}
                className="mx-auto w-full max-w-[920px] overflow-hidden rounded-[30px] border border-black/10 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f4fbff_48%,#eef7fb_100%)] p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:p-8"
              >
                <div className="text-center">
                  <h3
                    className="text-3xl uppercase tracking-[0.04em] text-[#2c4e8d] md:text-[2.55rem]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Why Genetic Testing in Nephrology?
                  </h3>
                  <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-[#57b9c8]" />
                  <p className="mt-4 text-lg text-[#44587a] md:text-xl">A Precision Medicine Approach to Kidney Care</p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] md:grid-rows-3 md:items-center">
                  {whyGeneticTestingInfographicCards.map((card) => {
                    const CardIcon = card.icon;

                    return (
                      <div
                        key={card.title}
                        className={`rounded-[28px] border-2 bg-white/96 p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] ${card.borderClassName} ${card.positionClassName}`}
                      >
                        <div className={`mb-4 inline-flex rounded-full bg-slate-50 p-4 ${card.iconClassName}`}>
                          <CardIcon className="h-9 w-9" strokeWidth={1.8} />
                        </div>
                        <h4 className="text-xl uppercase tracking-[0.03em] text-[#34538f]">{card.title}</h4>
                        <div className="mt-3 space-y-1 text-base leading-relaxed text-[#44587a]">
                          {card.lines.map((line) => (
                            <p key={`${card.title}-${line}`}>{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-center md:col-start-2 md:row-start-2">
                    <div className="flex h-[190px] w-[190px] items-center justify-center rounded-full border-[9px] border-[#57b9c8] bg-white shadow-[0_14px_34px_rgba(39,78,141,0.15)]">
                      <div className="flex h-[152px] w-[152px] flex-col items-center justify-center rounded-full border-[9px] border-[#5d4d95] text-center text-[#34538f]">
                        <Icon className="h-10 w-10 text-[#5d4d95]" strokeWidth={1.8} />
                        <p className="mt-3 text-sm uppercase tracking-[0.12em]">Genetic Insights</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[20px] bg-[#57b9c8] px-5 py-4 text-center text-lg uppercase tracking-[0.08em] text-white">
                  Empowering Nephrologists. Transforming Patient Lives
                </div>
              </motion.aside>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {detail.sections.map((section, index) => (
                <motion.article
                  key={`${section.title}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.26 }}
                  className="rounded-[30px] border border-black/10 bg-white/92 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="text-xl md:text-2xl text-black" style={{ fontFamily: "Georgia, serif" }}>
                    {section.title}
                  </h3>

                  {section.subtitle ? <p className="mt-2 text-black/70">{section.subtitle}</p> : null}

                  {section.meta ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {section.meta.map((meta) => (
                        <span key={`${section.title}-${meta.label}`} className="rounded-full bg-cyan-50 px-3 py-1 text-sm text-black/80">
                          <strong className="font-medium text-black">{meta.label}:</strong> {meta.value}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-3 space-y-2 text-black/75">
                      {section.bullets.map((bullet) => (
                        <li key={`${section.title}-${bullet}`} className="rounded-xl bg-cyan-50 px-3 py-2">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.action ? (
                    <button className="mt-4 rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:text-cyan-700">
                      {section.action}
                    </button>
                  ) : null}
                </motion.article>
              ))}
            </div>
          )}

        </section>
      </main>
      <DoctorFooter />
    </div>
  );
}
