import type { ResourceMode } from "./resourceCards";

export type DestinationSection = {
  title: string;
  subtitle?: string;
  meta?: Array<{ label: string; value: string }>;
  bullets?: string[];
  action?: string;
  link?: string;
};

export type LinkPreviewItem = {
  title: string;
  url: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageBackgroundColor?: string;
};

export type OrganizationLinkItem = {
  label: string;
  domainLabel: string;
  url: string;
  description?: string;
};

export type VideoLinkItem = {
  title: string;
  url: string;
  subtitle?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  sourceLabel?: string;
  buttonLabel?: string;
};

export type DiseaseLinkItem = {
  label: string;
  topicId?: string;
};

export type GeneticDiseaseTopic = {
  id: string;
  title: string;
  primarySections: Array<{
    title: string;
    bullets: string[];
  }>;
  featureCards: Array<{
    title: string;
    bullets: string[];
  }>;
  referenceLabel: string;
  referenceUrl: string;
  nextTopicLink?: {
    label: string;
    topicId: string;
  };
};

export type ResourceDestination = {
  id: string;
  mode: ResourceMode;
  title: string;
  context: string;
  sections: DestinationSection[];
  diseaseLinks?: DiseaseLinkItem[];
  geneticDiseaseTopics?: Record<string, GeneticDiseaseTopic>;
  linkPreviews?: LinkPreviewItem[];
  organizationLinks?: OrganizationLinkItem[];
  videoLinks?: VideoLinkItem[];
  featuredLink?: { label: string; url: string };
};

export const resourceDestinationContent: Record<string, ResourceDestination> = {
  "peer-reviewed-papers": {
    id: "peer-reviewed-papers",
    mode: "educational",
    title: "Peer-Reviewed Papers",
    context:
      "Selected papers with full abstract text and direct article links.",
    sections: [
      {
        title: "The Art and Science of Genetic Counseling in Nephrology",
        meta: [
          { label: "Author", value: "Kelsie Bogyo et al." },
          { label: "Journal", value: "Kidney360" },
          { label: "Year", value: "2025" },
          { label: "Sponsor", value: "NIDDK/NIH; published by Wolters Kluwer on behalf of the American Society of Nephrology" },
        ],
        subtitle:
          "The recognition that up to 10% of individuals with kidney diseases might obtain a genetic diagnosis has led to genetic testing (GT) becoming a critical component of nephrology practice. Genetic counselors have expertise in providing genomic services, which include genetic counseling and testing. They play a crucial role by helping patients estimate their genetic risks, understand the effect of results, and coordinate follow-up care. Nephrologists are in a pivotal position to offer genomic services directly to their patients or to refer them to genetic counseling before or after GT. Nephrologists should therefore be able to identify patients who would benefit most from these services. To effectively refer patients, nephrologists should be able to explain the genetic counseling process and its relevance to the patient. This review aims to help build a collaborative relationship between nephrologists and genetic counselors. It introduces and expands upon the topics genetic counselors cover during genetic counseling sessions, including how they support patients in understanding the implications of genetic findings, decision making related to GT, and the psychosocial aspects of living with a genetic diagnosis. By integrating genetic counseling into nephrology, patients with kidney diseases can receive comprehensive care tailored to their genetic and clinical needs.",
        action: "Link",
        link: "https://pubmed.ncbi.nlm.nih.gov/40265959/",
      },
      {
        title: "Diagnostic Utility of Exome Sequencing for Kidney Disease",
        meta: [
          { label: "Author", value: "E. E. Groopman et al." },
          { label: "Journal", value: "The New England Journal of Medicine" },
          { label: "Year", value: "2019" },
          { label: "Sponsor", value: "National Institutes of Health, American Society of Nephrology Foundation for Kidney Research, Columbia Institute for Genomic Medicine, and AstraZeneca" },
        ],
        subtitle:
          "BACKGROUND\nExome sequencing is emerging as a first-line diagnostic method in some clinical disciplines, but its usefulness has yet to be examined for most constitutional disorders in adults, including chronic kidney disease, which affects more than 1 in 10 persons globally.\n\nMETHODS\nWe conducted exome sequencing and diagnostic analysis in two cohorts totaling 3315 patients with chronic kidney disease. We assessed the diagnostic yield and, among the patients for whom detailed clinical data were available, the clinical implications of diagnostic and other medically relevant findings.\n\nRESULTS\nIn all, 3037 patients (91.6%) were over 21 years of age, and 1179 (35.6%) were of self-identified non-European ancestry. We detected diagnostic variants in 307 of the 3315 patients (9.3%), encompassing 66 different monogenic disorders. Of the disorders detected, 39 (59%) were found in only a single patient. Diagnostic variants were detected across all clinically defined categories, including congenital or cystic renal disease (127 of 531 patients [23.9%]) and nephropathy of unknown origin (48 of 281 patients [17.1%]). Of the 2187 patients assessed, 34 (1.6%) had genetic findings for medically actionable disorders that, although unrelated to their nephropathy, would also lead to subspecialty referral and inform renal management.\n\nCONCLUSIONS\nExome sequencing in a combined cohort of more than 3000 patients with chronic kidney disease yielded a genetic diagnosis in just under 10% of cases. (Funded by the National Institutes of Health and others.)",
        action: "Link",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6510541/",
      },
      {
        title:
          "Genetics in Chronic Kidney Disease: Conclusions from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference",
        meta: [
          { label: "Author", value: "KDIGO Conference Participants" },
          { label: "Journal", value: "Kidney International" },
          { label: "Year", value: "2022" },
          { label: "Sponsor", value: "KDIGO; unrestricted educational grants from American Kidney Fund, AstraZeneca, Chinook Therapeutics, Natera, Otsuka, Reata Pharmaceuticals, and Sanofi" },
        ],
        subtitle:
          "Numerous genes for monogenic kidney diseases with classical patterns of inheritance as well as for complex kidney diseases that manifest in combination with environmental factors have been discovered. Genetic findings are increasingly used to inform clinical management of nephropathies, and have led to improved diagnostics, disease surveillance, choice of therapy, and family counseling. All of these rely on accurate interpretation of genetic data, which can be outpaced by current rates of data collection. In March of 2021, KDIGO (Kidney Diseases: Improving Global Outcomes) held a Controversies Conference on Genetics in Chronic Kidney Disease (CKD) to review the current state of understanding of monogenic and complex (polygenic) kidney diseases, processes for applying genetic findings in clinical medicine, and using genomics for defining and stratifying CKD. Given the important contribution of genetic variants to CKD, practitioners with CKD patients are advised to “think genetic,” which specifically involves obtaining a family history, detailed information on age of CKD onset, clinical examination for extra-renal symptoms, and considering genetic testing. To improve implementation of genetics in nephrology, meeting participants advise developing an advanced training or subspecialty track for nephrologists, guidelines for testing and treatment, and education of patients, students, and practitioners. Key areas of future research, including clinical interpretation of genome variation, electronic phenotyping, global representation, kidney-specific molecular data, polygenic scores, translational epidemiology, and open data resources, were also identified.",
        action: "Link",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9922534/",
      },
      {
        title:
          "Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group",
        meta: [
          { label: "Author", value: "Nora Franceschini et al." },
          { label: "Journal", value: "American Journal of Kidney Diseases" },
          { label: "Year", value: "2024" },
          { label: "Sponsor", value: "National Kidney Foundation support from Alnylam Pharmaceuticals, Natera, Reata Pharmaceuticals, Travere Therapeutics, and Vertex Pharmaceuticals" },
        ],
        subtitle:
          "About 37 million people in the United States have chronic kidney disease, a disease that encompasses multiple causes. About 10% or more of kidney diseases in adults and as many as 70% of selected chronic kidney diseases in children are expected to be explained by genetic causes. Despite the advances in genetic testing and an increasing understanding of the genetic bases of certain kidney diseases, genetic testing in nephrology lags behind other medical fields. More understanding of the benefits and logistics of genetic testing is needed to advance the implementation of genetic testing in chronic kidney diseases. Accordingly, the National Kidney Foundation convened a Working Group of experts with diverse expertise in genetics, nephrology, and allied fields to develop recommendations for genetic testing for monogenic disorders and to identify genetic risk factors for oligogenic and polygenic causes of kidney diseases. Algorithms for clinical decision making on genetic testing and a road map for advancing genetic testing in kidney diseases were generated. An important aspect of this initiative was the use of a modified Delphi process to reach group consensus on the recommendations. The recommendations and resources described herein provide support to nephrologists and allied health professionals to advance the use of genetic testing for diagnosis and screening of kidney diseases.",
        action: "Link",
        link: "https://pubmed.ncbi.nlm.nih.gov/39033956/",
      },
    ],
  },
  "why-genetic-testing-in-nephrology": {
    id: "why-genetic-testing-in-nephrology",
    mode: "educational",
    title: "Why Genetic Testing in Nephrology?",
    context:
      "Genetic testing plays a critical role in nephrology because 10-20% of adults with chronic kidney disease and up to 70% of children with chronic kidney disease have a monogenic cause that can be identified with a genetic test. Despite this, nephrology currently lags behind other specialties in implementing genetic testing.",
    sections: [
      {
        title: "Improved Diagnostic Accuracy",
        subtitle:
          "Identifying a genetic cause can clarify the exact cause of CKD, especially for unclear or atypical presentations.",
        bullets: [
          "Helps end patients' diagnostic odyssey.",
          "Can reduce uncertainty and guilt for patients and families.",
          "Supports more confident classification when phenotype, biopsy, imaging, or family history are atypical or overlapping.",
        ],
      },
      {
        title: "Family Counseling and Cascade Testing",
        subtitle:
          "A molecular diagnosis enables assessment of recurrence risk, screening of relatives, and earlier detection of at-risk family members.",
        bullets: [
          "Supports cascade testing for relatives.",
          "Can allow early surveillance and treatment to delay ESKD.",
          "Improves family counseling, reproductive counseling, and risk communication.",
        ],
      },
      {
        title: "Transplant Planning",
        subtitle:
          "Genetic findings can guide donor selection and reduce the risk of transmitting hereditary disease.",
        bullets: [
          "Helps evaluate biologically related living donor candidates.",
          "Can prevent use of donors who may carry the same familial kidney disease.",
          "Supports family-centered transplant planning.",
        ],
      },
      {
        title: "Therapeutic Decision-Making",
        subtitle:
          "Certain genetic diagnoses influence treatment choices and may affect eligibility for targeted therapies when available.",
        bullets: [
          "Can refine prognosis and expected disease progression.",
          "May affect surveillance, medication, transplant, and subspecialty referral decisions.",
          "Can identify extra-renal risks that need screening or preventive care.",
        ],
      },
      {
        title: "Additional References",
        bullets: [
          "Genetic Testing in the Management of Adult CKD — https://www.ovid.com/jnls/jasn/fulltext/10.1681/asn.0000000913~genetic-testing-in-the-management-of-adult-ckd",
          "The Clinical Utility of Genetic Testing in the Diagnosis and Management of Adults with Chronic Kidney Disease — https://www.ovid.com/jnls/jasn/fulltext/10.1681/asn.0000000000000249~the-clinical-utility-of-genetic-testing-in-the-diagnosis-and",
          "Genetic evaluation of living kidney donor candidates: A review and recommendations for best practices — https://www.amjtransplant.org/article/S1600-6135(23)00305-2/fulltext",
        ],
      },
    ],
  },
  "genetic-testing-risks": {
    id: "genetic-testing-risks",
    mode: "educational",
    title: "Referral indication page",
    context:
      "Structured intake questions to identify patients who may warrant nephrogenetics referral or testing.",
    sections: [
      {
        title: "Referral Indication Questionnaire",
        subtitle: "Use the structured screening items below to capture history, diagnosis, onset, and extra-renal features.",
      },
    ],
  },
  "risks-not-offering": {
    id: "risks-not-offering",
    mode: "educational",
    title: "Risks: Not Offering Testing",
    context:
      "CME presentation resource for risks and ethics considerations in renal genetics.",
    sections: [
      {
        title: "Renal Genetics CME Ethics Deck",
        subtitle: "Single active presentation on this page",
      },
    ],
  },
  "case-studies": {
    id: "case-studies",
    mode: "educational",
    title: "Patients' Stories",
    context:
      "Hear the patient's voices.",
    sections: [],
    videoLinks: [
      {
        title: "Putting a Stop to Polycystic Kidney Disease (PKD). Interview with Richard Kellner",
        subtitle: "Personal experience with PKD",
        url: "https://www.youtube.com/watch?v=khK6OgPehlI",
        thumbnailUrl: "https://i.ytimg.com/vi/khK6OgPehlI/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/khK6OgPehlI",
        sourceLabel: "YouTube",
        buttonLabel: "Watch story",
      },
      {
        title: "The Cataldo Family - John's Diagnosis, Dialysis and Transplant Story",
        subtitle: "Family story about diagnosis, dialysis, and transplant",
        url: "https://www.youtube.com/watch?v=w01RSJbEW2Q",
        thumbnailUrl: "https://i.ytimg.com/vi/w01RSJbEW2Q/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/w01RSJbEW2Q",
        sourceLabel: "YouTube",
        buttonLabel: "Watch story",
      },
      {
        title: "The Kidney Collective Podcast | Ep. 4: I Wish Others Knew About Genetic Testing for Kidney Disease",
        subtitle: "Patient perspective on genetic testing for kidney disease",
        url: "https://www.youtube.com/watch?v=A_BqDASURHU",
        thumbnailUrl: "https://i.ytimg.com/vi/A_BqDASURHU/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/A_BqDASURHU",
        sourceLabel: "YouTube",
        buttonLabel: "Watch story",
      },
      {
        title: "Living with PKD: Steve Irby's Journey from Diagnosis to Transplant",
        subtitle: "Personal journey from diagnosis to transplant",
        url: "https://www.youtube.com/watch?v=SodEFKdHIlA",
        thumbnailUrl: "https://i.ytimg.com/vi/SodEFKdHIlA/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/SodEFKdHIlA",
        sourceLabel: "YouTube",
        buttonLabel: "Watch story",
      },
      {
        title: "The Story of Alport Syndrome",
        subtitle: "Patient and family experience with Alport syndrome",
        url: "https://www.youtube.com/watch?v=-bvs1b6hSkw",
        thumbnailUrl: "https://i.ytimg.com/vi/-bvs1b6hSkw/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/-bvs1b6hSkw",
        sourceLabel: "YouTube",
        buttonLabel: "Watch story",
      },
    ],
  },
  quizzes: {
    id: "quizzes",
    mode: "educational",
    title: "Quizzes",
    context:
      "20-question interactive knowledge check based on NKF, KDIGO, implementation, and equity-focused nephrogenetics literature.",
    sections: [
      {
        title: "Source Set 1: Clinical Guidance",
        subtitle: "NKF Working Group + KDIGO conference paper",
        bullets: ["Indications for testing", "Family history and extrarenal clues", "Monogenic vs polygenic readiness"],
      },
      {
        title: "Source Set 2: Nephrologist Implementation",
        subtitle: "Australian and US nephrologist surveys",
        bullets: ["Confidence, referral behavior, and barriers", "Training gaps and service model preferences"],
      },
      {
        title: "Source Set 3: Equity and Access",
        subtitle: "Social determinants and diagnostic odyssey review",
        bullets: ["Who remains undiagnosed", "Why disparities persist", "What systems changes are needed"],
      },
    ],
  },
  "external-training": {
    id: "external-training",
    mode: "educational",
    title: "External Training for Nephrologists",
    context:
      "Direct links to external nephrology genetics training resources with preview cards.",
    sections: [],
    linkPreviews: [
      {
        title: "CME Kidney SPA Course",
        subtitle: "Genetic testing in the diagnosis of kidney diseases microlearning series",
        url: "https://cme.kidney.org/spa/courses/resource/r860-genetic-testing-in-the-diagnosis-of-kidney-diseases-a-microlearning-series/curriculum/home/default",
      },
      {
        title: "Mayo Clinic Nephrogenetics Update 2026",
        subtitle: "Integrating genetics into clinical nephrology practice",
        url: "https://ce.mayo.edu/nephrology/content/nephrogenetics-update-2026-integrating-genetics-clinical-practice",
      },
      {
        title: "Genetics in Kidney Transplantation 2026",
        subtitle: "Columbia Medicine CME",
        url: "https://www.columbiamedicinecme.org/Attendee/Attendee/EventPage?eId=Egjf4bSI%2Bk1RAlMXHueCaA%3D%3D",
        imageUrl:
          "https://eventleafmedia.blob.core.windows.net/c9642/49976/63cb4074-89e4-40f2-a812-2df6984023f8.png",
        imageAlt: "Columbia Medicine CME logo for Genetics in Kidney Transplantation 2026",
        imageBackgroundColor: "#1b4585",
      },
    ],
  },
  "renal-patient-organizations": {
    id: "renal-patient-organizations",
    mode: "educational",
    title: "Patients' Organizations",
    context:
      "Patient advocacy organizations and a referral guide for rare kidney diseases.",
    sections: [],
    organizationLinks: [
      {
        label: "Alport Syndrome Foundation",
        domainLabel: "alportsyndrome.org",
        url: "https://alportsyndrome.org/",
        description: "Supports patients and families affected by Alport spectrum disorders through education, advocacy, and research support.",
      },
      {
        label: "American Kidney Fund (AKF)",
        domainLabel: "kidneyfund.org",
        url: "https://www.kidneyfund.org/",
        description: "Provides patient education, financial assistance, and advocacy for people with kidney disease.",
      },
      {
        label: "Dent Disease Foundation",
        domainLabel: "dentdisease.org",
        url: "https://www.dentdisease.org/",
        description: "Offers disease-specific information, community support, and research advocacy for Dent disease.",
      },
      {
        label: "National Kidney Foundation (NKF)",
        domainLabel: "kidney.org",
        url: "https://www.kidney.org/",
        description: "National kidney health organization offering patient education, professional resources, and advocacy.",
      },
      {
        label: "NephCure Kidney International",
        domainLabel: "nephcure.org",
        url: "https://nephcure.org/",
        description: "Focuses on rare protein-spilling kidney diseases, including patient support, research, and clinical trial education.",
      },
      {
        label: "PKD Foundation",
        domainLabel: "pkdcure.org",
        url: "https://pkdcure.org/",
        description: "Supports people affected by polycystic kidney disease through education, advocacy, and research funding.",
      },
      {
        label: "Rare Kidney Disease Foundation (ADTKD)",
        domainLabel: "rarekidney.org",
        url: "https://www.rarekidney.org/",
        description: "Provides information and community support for Autosomal Dominant Tubulointerstitial Kidney Disease (ADTKD).",
      },
    ],
    featuredLink: {
      label: "How do I know where to refer patients with rare kidney diseases?",
      url: "https://nephrogenix.wixsite.com/nephrogenetics/genereviews",
    },
  },
  "genetic-testing-counseling-videos": {
    id: "genetic-testing-counseling-videos",
    mode: "educational",
    title: "Educational Videos",
    context:
      "Curated videos focused specifically on genetic testing and kidney disease.",
    sections: [],
    videoLinks: [
      {
        title: "PKD | A Genetics Primer for the Modern Nephrologist | Case Study",
        subtitle: "Bianca E Russell",
        url: "https://www.youtube.com/watch?v=66iTRyKZX08",
        thumbnailUrl: "https://i.ytimg.com/vi/66iTRyKZX08/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/66iTRyKZX08",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Fabry | A Genetics Primer for the Modern Nephrologist | Case Study",
        subtitle: "Bianca E Russell",
        url: "https://www.youtube.com/watch?v=o-ObnRQTyLM",
        thumbnailUrl: "https://i.ytimg.com/vi/o-ObnRQTyLM/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/o-ObnRQTyLM",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Overview of a Seminal Paper in Renal Genetics | Chronic Kidney Disease: New Genetic Insights",
        subtitle: "Renal genetics literature overview",
        url: "https://www.youtube.com/watch?v=PH68X4L9iE0",
        thumbnailUrl: "https://i.ytimg.com/vi/PH68X4L9iE0/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/PH68X4L9iE0",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "REN | After the Diagnosis: Approach to Rare Disorders | Part 1 | Case Study",
        subtitle: "Anthony Bleyer",
        url: "https://www.youtube.com/watch?v=DvL4aGeRtIo",
        thumbnailUrl: "https://i.ytimg.com/vi/DvL4aGeRtIo/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/DvL4aGeRtIo",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Alport Syndrome | Genetics in Pediatric Kidney Disease: Part 1 | Case Study",
        subtitle: "Patricia Weng",
        url: "https://www.youtube.com/watch?v=lhYapBz0Y5Y",
        thumbnailUrl: "https://i.ytimg.com/vi/lhYapBz0Y5Y/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/lhYapBz0Y5Y",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "HNF1B | Genetics in Pediatric Kidney Disease: Part 3 | Case Study",
        subtitle: "Patricia Weng",
        url: "https://www.youtube.com/watch?v=v3Kq1TfFw6M",
        thumbnailUrl: "https://i.ytimg.com/vi/v3Kq1TfFw6M/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/v3Kq1TfFw6M",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Alport Syndrome - Causes, Symptoms, Diagnosis, Treatment & Pathology",
        subtitle: "Disease overview video",
        url: "https://www.youtube.com/watch?v=q6HVWo7mQmY",
        thumbnailUrl: "https://i.ytimg.com/vi/q6HVWo7mQmY/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/q6HVWo7mQmY",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Alport Syndrome | Genetics in Pediatric Kidney Disease: Part 2 | Case Study",
        subtitle: "Patricia Weng",
        url: "https://www.youtube.com/watch?v=6bfwYl2M8C0",
        thumbnailUrl: "https://i.ytimg.com/vi/6bfwYl2M8C0/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/6bfwYl2M8C0",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Correlation in Genotype and Phenotype | Genetics in Pediatric Kidney Disease: Part 4",
        subtitle: "Patricia Weng",
        url: "https://www.youtube.com/watch?v=nrDdfnOzgdI",
        thumbnailUrl: "https://i.ytimg.com/vi/nrDdfnOzgdI/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/nrDdfnOzgdI",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Broad-Panel NGS Testing for Kidney Disease in a Community Nephrology Setting | ASN Abstract",
        subtitle: "Kidney disease testing implementation",
        url: "https://www.youtube.com/watch?v=mffAqtzFSbU",
        thumbnailUrl: "https://i.ytimg.com/vi/mffAqtzFSbU/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/mffAqtzFSbU",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
      {
        title: "Negative Genetics Results in Kidney Disease: Part 1 - The Why",
        subtitle: "Natera Academy | Meg Hager",
        url: "https://www.youtube.com/watch?v=oWa-3eux89k",
        thumbnailUrl: "https://i.ytimg.com/vi/oWa-3eux89k/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/oWa-3eux89k",
        sourceLabel: "YouTube",
        buttonLabel: "Watch video",
      },
    ],
  },
  costs: {
    id: "costs",
    mode: "practical",
    title: "Costs of Genetic Testing",
    context:
      "Patient billing handout for genetic testing costs.",
    sections: [
      {
        title: "Cost of Genetic Testing: Patient Billing Postcard",
        subtitle: "Single active billing resource on this page",
      },
    ],
  },
  "order-testing-directly": {
    id: "order-testing-directly",
    mode: "practical",
    title: "Order Testing Directly",
    context:
      "Direct-order workflow with clinical steps and documentation tools for initiating testing in practice.",
    sections: [
      {
        title: "Direct-order workflow",
        subtitle: "Use this page to review the workflow and open the letter template on its own page.",
      },
    ],
  },
  "letter-of-medical-necessity-template": {
    id: "letter-of-medical-necessity-template",
    mode: "practical",
    title: "Letter of Medical Necessity Template",
    context:
      "Clinician-facing direct-order toolkit with reusable documentation fields and a draft letter preview for coverage support.",
    sections: [
      {
        title: "Letter and documentation toolkit",
        subtitle: "Use this page to prepare clinician-facing documentation for direct ordering.",
      },
    ],
  },
  "administrative-steps": {
    id: "administrative-steps",
    mode: "practical",
    title: "Administrative Steps",
    context:
      "End-to-end operational workflow from clinical indication to finalized follow-up.",
    sections: [
      {
        title: "Step 1: Confirm Indication",
        bullets: ["Capture phenotype red flags.", "Verify family history completeness."],
      },
      {
        title: "Step 2: Consent and Documentation",
        bullets: ["Use standardized consent checklist.", "Attach notes needed for lab and payer review."],
      },
      {
        title: "Step 3: Order and Sample Logistics",
        bullets: ["Submit order with required fields.", "Track sample kit, collection, and shipping status."],
      },
      {
        title: "Step 4: Results and Follow-Up",
        bullets: ["Schedule result return appointment.", "Trigger counselor/family follow-up workflow."],
      },
    ],
  },
  "referral-templates": {
    id: "referral-templates",
    mode: "practical",
    title: "Referral Templates",
    context:
      "Editable placeholder templates for nephrology genetics referral communication.",
    sections: [
      {
        title: "Template A: General Genetics Referral",
        subtitle: "Clinical question + phenotype summary",
        bullets: [
          "Reason for referral: suspected inherited kidney disorder.",
          "Requested service: counseling and test strategy recommendation.",
        ],
      },
      {
        title: "Template B: Urgent Referral",
        subtitle: "Time-sensitive transplant or treatment planning",
        bullets: [
          "Priority reason: transplant pathway decision support.",
          "Requested turnaround: earliest available consult.",
        ],
      },
      {
        title: "Template C: Family Cascade Referral",
        subtitle: "Relative screening and counseling",
        bullets: [
          "Known family finding: placeholder variant label.",
          "Requested service: cascade counseling and testing plan.",
        ],
      },
    ],
  },
  "find-counselor": {
    id: "find-counselor",
    mode: "practical",
    title: "Find a Genetic Counselor",
    context:
      "Placeholder search and filter workflow for locating nephrology-relevant counseling support.",
    sections: [
      {
        title: "Search Filters",
        bullets: [
          "Region: city/state or telehealth",
          "Specialty: adult CKD, pediatric nephrology, transplant",
          "Availability: next 2 weeks, language preferences",
        ],
      },
      {
        title: "Result Card: Dr. A. Rivera (placeholder)",
        meta: [
          { label: "Format", value: "Telehealth + in-person" },
          { label: "Focus", value: "Glomerular disease" },
        ],
        action: "View Profile (placeholder)",
      },
      {
        title: "Result Card: M. Lee, MS, CGC (placeholder)",
        meta: [
          { label: "Format", value: "Telehealth" },
          { label: "Focus", value: "Cystic kidney disease" },
        ],
        action: "Request Intro (placeholder)",
      },
      {
        title: "Result Card: S. Patel, MS, CGC (placeholder)",
        meta: [
          { label: "Format", value: "In-person" },
          { label: "Focus", value: "Pediatric nephrology" },
        ],
        action: "Check Availability (placeholder)",
      },
    ],
  },
  posters: {
    id: "posters",
    mode: "practical",
    title: "Posters",
    context:
      "Clinic-ready visual for patient and family education.",
    sections: [
      {
        title: "Poster: Family Genetic Testing Flyer",
        subtitle: "Single active poster on this page",
      },
    ],
  },
  brochures: {
    id: "brochures",
    mode: "practical",
    title: "Brochures",
    context:
      "Patient-facing handout placeholders to support shared decision-making.",
    sections: [
      {
        title: "Brochure: Understanding Kidney Genetic Testing",
        subtitle: "What the test can and cannot tell you",
        action: "Open Handout (placeholder)",
      },
      {
        title: "Brochure: Preparing for a Genetic Counseling Visit",
        subtitle: "What to bring and what to expect",
        action: "Open Handout (placeholder)",
      },
      {
        title: "Brochure: Family Implications and Next Steps",
        subtitle: "How results may affect relatives",
        action: "Open Handout (placeholder)",
      },
      {
        title: "Brochure: Financial Questions to Ask",
        subtitle: "Coverage, prior auth, and billing discussion prompts",
        action: "Open Handout (placeholder)",
      },
    ],
  },
  "next-steps": {
    id: "next-steps",
    mode: "practical",
    title: "Next Steps",
    context:
      "Checklist-style follow-up after screening or initial genetics discussion.",
    sections: [
      {
        title: "Checklist 1",
        bullets: ["Confirm indication and selected test strategy."],
      },
      {
        title: "Checklist 2",
        bullets: ["Verify consent completion and documentation quality."],
      },
      {
        title: "Checklist 3",
        bullets: ["Place order and assign sample tracking owner."],
      },
      {
        title: "Checklist 4",
        bullets: ["Book result review visit and counseling follow-up."],
      },
      {
        title: "Checklist 5",
        bullets: ["Create family communication and cascade testing plan."],
      },
    ],
  },
  "common-genetic-kidney-diseases": {
    id: "common-genetic-kidney-diseases",
    mode: "educational",
    title: "Common Genetic Kidney Diseases",
    context: "Short overviews of most common rare diseases.",
    sections: [],
    diseaseLinks: [
      {
        label: "ADPKD",
        topicId: "adpkd",
      },
      { label: "Branchio-Oto-Renal Syndrome (EYA1)", topicId: "bor" },
      { label: "Collagenopathies: Alport Spectrum Disorder", topicId: "alport" },
      { label: "Dent disease", topicId: "dent" },
      { label: "Fabry disease (GLA)", topicId: "fabry" },
      { label: "Gitelman and Bartter", topicId: "tubulopathies" },
      {
        label: "HNF1B-related Autosomal Dominant Tubulointerstitial Kidney Disease",
        topicId: "hnf1b-adtkd",
      },
      {
        label: "Nephronophthisis-Related Ciliopathies",
        topicId: "ciliopathies",
      },
      {
        label: "PAX2-Related Disorder (also known as Renal Coloboma Syndrome and Papillorenal syndrome)",
        topicId: "pax2",
      },
    ],
    geneticDiseaseTopics: {
      bor: {
        id: "bor",
        title: "Branchio-Oto-Renal Syndrome (EYA1)",
        primarySections: [],
        featureCards: [
          {
            title: "Genetics",
            bullets: ["Most commonly associated with EYA1; other genes include SIX1 and SIX5."],
          },
          {
            title: "Clinical Features",
            bullets: ["Branchial arch anomalies", "Ear malformations or hearing loss", "Renal anomalies including CAKUT spectrum findings"],
          },
          {
            title: "Why It's Important",
            bullets: ["Supports renal surveillance", "Guides hearing evaluation", "Enables family screening and counseling"],
          },
        ],
        referenceLabel: "GeneReviews: Branchiootorenal Spectrum Disorder.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1380/",
      },
      dent: {
        id: "dent",
        title: "Dent Disease",
        primarySections: [],
        featureCards: [
          {
            title: "Genetics",
            bullets: ["X-linked disorder most often caused by CLCN5; OCRL can also be implicated."],
          },
          {
            title: "Clinical Features",
            bullets: ["Low-molecular-weight proteinuria", "Hypercalciuria", "Nephrocalcinosis, kidney stones, and progressive CKD"],
          },
          {
            title: "Why It's Important",
            bullets: ["Avoids misclassification as primary glomerular disease", "Supports family testing", "Guides monitoring for stones and CKD progression"],
          },
        ],
        referenceLabel: "GeneReviews: Dent Disease.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK99494/",
      },
      "hnf1b-adtkd": {
        id: "hnf1b-adtkd",
        title: "HNF1B-related Autosomal Dominant Tubulointerstitial Kidney Disease",
        primarySections: [],
        featureCards: [
          {
            title: "Genetics",
            bullets: ["Autosomal dominant HNF1B variants or deletions."],
          },
          {
            title: "Clinical Features",
            bullets: ["Kidney cysts or CAKUT features", "Hypomagnesemia or hyperuricemia", "Diabetes or pancreatic, liver, or genital tract findings may occur"],
          },
          {
            title: "Why It's Important",
            bullets: ["Explains syndromic kidney presentations", "Guides family screening", "Prompts evaluation for extra-renal features"],
          },
        ],
        referenceLabel: "GeneReviews: HNF1B-Related Disease.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK532299/",
      },
      pax2: {
        id: "pax2",
        title: "PAX2-Related Disorder",
        primarySections: [],
        featureCards: [
          {
            title: "Also Known As",
            bullets: ["Renal Coloboma Syndrome", "Papillorenal syndrome"],
          },
          {
            title: "Clinical Features",
            bullets: ["Renal hypodysplasia or other CAKUT findings", "Optic nerve coloboma or other ocular findings", "Progressive CKD can occur"],
          },
          {
            title: "Why It's Important",
            bullets: ["Supports ophthalmology referral", "Guides family screening", "Clarifies CAKUT presentations with eye findings"],
          },
        ],
        referenceLabel: "GeneReviews: PAX2-Related Disorder.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1451/",
      },
      adpkd: {
        id: "adpkd",
        title: "ADPKD",
        primarySections: [
          {
            title: "Indications for Testing",
            bullets: [
              "Early-onset or atypical cystic kidney disease",
              "Negative family history but imaging suggests ADPKD",
              "Living kidney donor evaluation",
              "Young patients where imaging is ambiguous",
              "Family planning, including PGT-M, CVS, and amniocentesis",
            ],
          },
          {
            title: "Clinical Importance",
            bullets: [
              "PKD1 loss-of-function variants correlate with more rapid progression",
              "Enables cascade testing",
              "Essential for donor screening",
              "Improves prognostic accuracy (PROPKD)",
            ],
          },
        ],
        featureCards: [
          {
            title: "Genetics",
            bullets: [
              "PKD1 accounts for about 78% of ADPKD cases.",
              "PKD2 accounts for about 15% of ADPKD cases.",
              "Less common genes include IFT140, GANAB, HNF1B, ALG8, ALG9, PKHD1, and others.",
            ],
          },
          {
            title: "Inheritance",
            bullets: ["Autosomal dominant", "50% chance with affected parent"],
          },
          {
            title: "Why It's Important",
            bullets: [
              "Aids diagnosis and early management",
              "Supports family screening",
              "Impacts treatment decisions (e.g. Tolvaptan, imaging)",
            ],
          },
          {
            title: "Clinical Features",
            bullets: [
              "Bilateral kidney cysts",
              "Hypertension",
              "Liver cysts",
              "Intracranial aneurysms in selected higher-risk families",
            ],
          },
        ],
        referenceLabel:
          "Harris PC, Torres VE. Polycystic Kidney Disease, Autosomal Dominant. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1246/",
      },
      arpkd: {
        id: "arpkd",
        title: "2. Autosomal Recessive Polycystic Kidney Disease (ARPKD)",
        primarySections: [],
        featureCards: [
          {
            title: "Genes",
            bullets: ["PKHD1", "DZIP1L"],
          },
          {
            title: "Testing Indications",
            bullets: [
              "Neonatal enlarged echogenic kidneys",
              "Congenital hepatic fibrosis",
            ],
          },
          {
            title: "Importance",
            bullets: [
              "Confirms diagnosis and guides neonatal care",
              "Enables cascade testing",
              "Critical for prenatal planning and screening",
              "Determines recurrence risk for future pregnancies",
            ],
          },
        ],
        referenceLabel:
          "Bergmann C, Guay-Woodford LM, Harris PC, et al. Autosomal Recessive Polycystic Kidney Disease. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1326/",
      },
      alport: {
        id: "alport",
        title: "Collagenopathies: Alport Spectrum Disorder",
        primarySections: [],
        featureCards: [
          {
            title: "Genetics and Inheritance Patterns",
            bullets: [
              "COL4A5 causes X-linked Alport syndrome; males are often more severely affected.",
              "COL4A3 and COL4A4 can cause autosomal recessive or autosomal dominant Alport spectrum disease.",
              "Genotype-phenotype correlation helps estimate risk for kidney failure, hearing loss, and ocular findings.",
              "A licensed figure can be added here once provided; do not copy restricted figures from ResearchGate without permission.",
            ],
          },
          {
            title: "Why It's Important to Know",
            bullets: [
              "A genetic diagnosis enables family screening and early treatment of affected family members to delay ESKD",
              "Earlier intervention, including ACE inhibitors to delay CKD progression",
              "Living kidney donation planning",
              "Family planning, including PGT-M, CVS, and amniocentesis",
              "Referral for hearing testing and ophthalmology evaluation",
            ],
          },
          {
            title: "Clinical Features",
            bullets: [
              "Kidney: persistent microscopic hematuria",
              "Kidney: progressive proteinuria and CKD that can progress to ESKD",
              "Kidney biopsy: thin basement membranes, lamellation, splitting, and basket-weave appearance of the glomerular basement membrane",
              "Ears: sensorineural hearing loss (especially XLAS males)",
              "Eyes: anterior lenticonus and retinal flecks",
            ],
          },
        ],
        referenceLabel:
          "Nozu K, Yamamura T, Horinouchi T. Alport Syndrome. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1207/#alport.molgen.TA",
      },
      cakut: {
        id: "cakut",
        title:
          "CAKUT (CONGENITAL ANOMALIES OF THE KIDNEY AND URINARY TRACT): CLINICAL + GENETIC OVERVIEW",
        primarySections: [],
        featureCards: [
          {
            title: "Spectrum + Genetics",
            bullets: [
              "CAKUT is a spectrum of developmental disorders",
              "Common genes: PAX2, HNF1B, EYA1, GATA3, RET",
              "Less common genes: WNT4, WNT9B, BMP4",
              "Highly genetically heterogeneous with many genes identified",
            ],
          },
          {
            title: "Inheritance Patterns",
            bullets: [
              "Autosomal dominant (most common): one affected parent, variable expressivity",
              "Autosomal recessive (rare): two carrier parents, affected offspring",
              "De novo / multifactorial: spontaneous variants or gene-environment interaction",
              "Variable severity within families",
            ],
          },
          {
            title: "Why It Matters",
            bullets: [
              "Leading cause of pediatric CKD",
              "Often detected prenatally",
              "Helps guide prognosis, family screening, and early treatment",
            ],
          },
          {
            title: "Clinical Features & Presentation",
            bullets: [
              "Kidney anomalies: renal agenesis (missing kidney), renal dysplasia (malformed tissue)",
              "Urinary tract anomalies: hydronephrosis (swollen kidney due to blockage), vesicoureteral reflux (VUR; backward flow)",
              "Symptoms: recurrent UTIs, poor growth, hypertension to CKD",
            ],
          },
          {
            title: "Example Case Summaries",
            bullets: [
              "Prenatal detection: bilateral hydronephrosis on ultrasound with postnatal diagnosis of VUR",
              "Infant presentation: recurrent UTIs and poor weight gain leading to UPJ obstruction diagnosis",
              "Adult presentation: previously undiagnosed CAKUT presenting with hypertension and reduced kidney function",
              "Syndromic case: renal anomalies associated with hearing loss or diabetes (e.g. HNF1B-related disease)",
            ],
          },
          {
            title: "Onset Timeline",
            bullets: [
              "Present at birth (prenatal ultrasound findings)",
              "Infancy/childhood (UTIs, growth issues)",
              "Adulthood (some diagnosed later with CKD)",
            ],
          },
        ],
        referenceLabel:
          "Westbrook E, Haff M, Spencer JD. Congenital Anomalies of the Kidney and Urinary Tract: A Clinical Review.",
        referenceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7451090/",
      },
      srns: {
        id: "srns",
        title:
          "Genes in Steroid-Resistant Nephrotic Syndrome (SRNS)",
        primarySections: [
          {
            title:
              "Hereditary FSGS (Focal segmental glomerulosclerosis) / Steroid-Resistant Nephrotic Syndrome (SRNS)",
            bullets: [],
          },
          {
            title: "When to Test",
            bullets: [
              "Early-onset or familial FSGS",
              "Steroid-resistant nephrotic syndrome",
              "Pre-transplant evaluation (to assess recurrence risk)",
            ],
          },
          {
            title: "Relevance",
            bullets: [
              "Monogenic FSGS generally does not respond to immunosuppression",
              "APOL1 variants inform donor selection and prognosis",
            ],
          },
        ],
        featureCards: [
          {
            title: "Primary Genes",
            bullets: ["NPHS1", "NPHS2", "ACTN4", "INF2", "TRPC6"],
          },
          {
            title: "APOL1-Associated FSGS/SRNS Risk",
            bullets: [
              "APOL1 high-risk genotypes are major contributors, particularly in populations of African descent",
            ],
          },
          {
            title: "Additional Rare Genes",
            bullets: ["WT1", "CD2AP", "LMNA", "PLCE1", "COQ2"],
          },
        ],
        referenceLabel:
          "Lipska-Zietkiewicz BS. Genetic Steroid-Resistant Nephrotic Syndrome Overview. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK573219/",
      },
      tubulopathies: {
        id: "tubulopathies",
        title: "Bartter & Gitelman Syndromes: A Comparative Overview",
        primarySections: [],
        featureCards: [
          {
            title: "Bartter Syndrome",
            bullets: [
              "Genes: SLC12A1",
              "Genes: KCNJ1",
              "Genes: CLCNKB",
              "Genes: BSND",
              "Indications: Neonatal/Infantile Hypokalemic Alkalosis",
              "Utility: Guides lifelong electrolyte and growth management",
            ],
          },
          {
            title: "Gitelman Syndrome",
            bullets: [
              "Gene: SLC12A3",
              "Indications: Chronic hypokalemia, hypomagnesemia, low BP",
              "Utility: Avoids unnecessary workups, confirms benign course",
            ],
          },
        ],
        referenceLabel:
          "Weber F, Lehmann-Horn F. Hypokalemic Periodic Paralysis. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1338/",
      },
      ciliopathies: {
        id: "ciliopathies",
        title: "Nephronophthisis-Related Ciliopathies (NPHP-RC)",
        primarySections: [],
        featureCards: [
          {
            title: "Genes",
            bullets: [
              "Common: NPHP1 (most frequent)",
              "Others: NPHP3, NPHP4, NPHP5 (IQCB1), NPHP6 (CEP290)",
              ">25 genes identified (ciliary function)",
            ],
          },
          {
            title: "Inheritance",
            bullets: [
              "Autosomal recessive (most common)",
              "Rare oligogenic inheritance",
              "Often affects siblings, not parents",
            ],
          },
          {
            title: "Why It Matters",
            bullets: [
              "Major cause of genetic CKD in children",
              "Progresses to end-stage renal disease (ESRD)",
              "Helps guide diagnosis (often missed early), extrarenal screening, and family counseling",
            ],
          },
          {
            title: "Clinical Features",
            bullets: [
              "Kidney: tubulointerstitial disease",
              "Small/normal kidneys",
              "Corticomedullary cysts (late)",
              "Key symptoms: polyuria/polydipsia, growth failure, anemia",
              "Extrarenal features: retinal disease (vision loss), brain anomalies (e.g., cerebellar), liver fibrosis",
            ],
          },
          {
            title: "Onset",
            bullets: [
              "Infantile: ESRD <5 years",
              "Juvenile (most common): ESRD in teens",
              "Adolescent/adult: slower progression",
            ],
          },
          {
            title: "Examples",
            bullets: [
              "Infant: rapid kidney failure + enlarged kidneys",
              "Child: polyuria + growth delay -> CKD",
              "Teen: progressive CKD -> ESRD",
              "Syndromic: kidney disease + retinal degeneration",
            ],
          },
        ],
        referenceLabel:
          "Stokman M, Lilien M, Knoers N. Nephronophthisis-Related Ciliopathies. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK368475/",
      },
      fabry: {
        id: "fabry",
        title: "Fabry Disease: Key Features & Clinical Value",
        primarySections: [],
        featureCards: [
          {
            title: "Gene",
            bullets: ["GLA"],
          },
          {
            title: "Testing Indications",
            bullets: [
              "Unexplained proteinuria with LVH",
              "Neuropathic pain, angiokeratomas",
            ],
          },
          {
            title: "Clinical Value",
            bullets: [
              "Enzyme Replacement Therapy (ERT) eligibility: ERT replaces deficient alpha-galactosidase A enzyme",
              "Facilitates early detection in relatives: genetic screening for at-risk family members",
              "Important for cardiac, neurologic surveillance: regular monitoring to manage complications",
            ],
          },
        ],
        referenceLabel:
          "Mehta A, Hughes DA. Fabry Disease. GeneReviews.",
        referenceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK1292/",
      },
      mitochondrial: {
        id: "mitochondrial",
        title: "Mitochondrial Nephropathy",
        primarySections: [],
        featureCards: [
          {
            title: "Genes",
            bullets: [
              "mtDNA (common): MT-TL1 (e.g., MELAS)",
              "Nuclear genes: COQ8B, PDSS2, ADCK4, TWNK",
              "Dual origin: mitochondrial + nuclear DNA",
            ],
          },
          {
            title: "Inheritance",
            bullets: [
              "Maternal (mtDNA)",
              "Autosomal recessive / dominant (nuclear genes)",
              "Variable expression due to heteroplasmy",
            ],
          },
          {
            title: "Why It Matters",
            bullets: [
              "Underrecognized cause of CKD",
              "Multisystem disease (kidney + others)",
              "Impacts: diagnosis & management, family counseling, treatment decisions",
            ],
          },
          {
            title: "Mitochondria",
            bullets: [
              "AIAD? / example phenotype: FSGS + resistant nephrotic syndrome (RNA)",
              "Impacts: diagnosis & management",
              "Family counseling",
              "Treatment decisions",
            ],
          },
          {
            title: "Clinical Features",
            bullets: [
              "Kidney: proteinuria (often FSGS), tubulopathy, progressive CKD",
              "Extrarenal: neurologic (seizures, stroke-like episodes), hearing loss, myopathy, cardiomyopathy, diabetes",
            ],
          },
          {
            title: "Onset",
            bullets: [
              "Variable: childhood -> adulthood",
              "Depends on mutation & heteroplasmy",
              "Steroid-resistant nephrotic (SRNS)",
            ],
          },
          {
            title: "Examples",
            bullets: [
              "Child: steroid-resistant nephrotic syndrome (SRNS)",
              "Adult: FSGS + hearing loss + diabetes",
              "Syndromic: MELAS with kidney involvement",
            ],
          },
          {
            title: "Genetic Counseling",
            bullets: [
              "Maternal inheritance (mtDNA): all children at risk (variable severity)",
              "Nuclear genes: AR 25% risk in siblings; AD variable",
            ],
          },
          {
            title: "Genetic Testing",
            bullets: [
              "Confirms diagnosis",
              "Guides family risk",
              "Heteroplasmy -> unpredictable severity",
            ],
          },
          {
            title: "Key Takeaway",
            bullets: [
              "Multisystem mitochondrial disorder",
              "Think of it in CKD + extrarenal features",
              "Variable presentation -> often missed",
            ],
          },
        ],
        referenceLabel:
          "Imasawa T, Murayama K, Hirano D, Nozu K. Comprehensive review of mitochondrial nephropathy.",
        referenceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11928409/",
      },
    },
  },
};
