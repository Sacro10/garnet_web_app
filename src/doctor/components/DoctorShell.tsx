import { BadgeCheck, LogOut, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export const doctorSerifFont = "'Lora Variable', serif";
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type DoctorHeaderProps = {
  activeMode?: "educational" | "practical";
  backLabel?: string;
  backTo?: string;
  title?: string;
};

export function DoctorHeader({ activeMode, backLabel, backTo, title = "Clinician workspace" }: DoctorHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[#c3d6d9] bg-[#f6fafa]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => {
            if (backTo) {
              navigate(backTo);
              return;
            }

            navigate("/");
          }}
          className="-m-1.5 flex items-center gap-4 rounded-2xl p-1.5 text-left"
          aria-label={backLabel ?? "Return to GARNET landing page"}
        >
          <img
            src={publicAsset("garnet-mark.png")}
            alt=""
            className="h-12 w-12 object-contain"
          />
          <div className="leading-tight">
            <p className="text-[1.6rem] font-bold tracking-[0.24em] text-[#00687b]">GARNET</p>
            <p className="hidden text-sm text-[#5b6472] sm:block">{title}</p>
          </div>
        </button>

        <div className="flex items-center gap-2 text-sm font-semibold text-[#16323b] sm:gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={() => navigate("/doctor/dashboard/educational")}
              className={`rounded-full px-3.5 py-2.5 transition-colors ${
                activeMode === "educational"
                  ? "bg-[#cfe7ea] text-[#16323b]"
                  : "text-[#00687b] hover:bg-[#cfe7ea] hover:text-[#16323b]"
              }`}
            >
              Educational Materials
            </button>
            <button
              type="button"
              onClick={() => navigate("/doctor/dashboard/practical")}
              className={`rounded-full px-3.5 py-2.5 transition-colors ${
                activeMode === "practical"
                  ? "bg-[#f4d8d2] text-[#16323b]"
                  : "text-[#3f4650] hover:bg-[#f4d8d2] hover:text-[#16323b]"
              }`}
            >
              Practical Tools
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/doctor/profile")}
            title="Profile"
            aria-label="Open profile"
            className="flex size-11 items-center justify-center rounded-full border border-[#c3d6d9] bg-white text-[#16323b] transition-colors hover:bg-[#cfe7ea]"
          >
            <UserRound className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Log out"
            className="flex size-11 items-center justify-center rounded-full border border-[#c3d6d9] bg-white text-[#16323b] transition-colors hover:bg-[#f4d8d2] hover:text-[#9f4035]"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function DoctorPageShell({
  activeMode,
  children,
  title,
}: {
  activeMode?: "educational" | "practical";
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DoctorHeader activeMode={activeMode} title={title} />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-wash" />
        <DoctorDecorativeArt activeMode={activeMode} />
        <div className="relative z-10">{children}</div>
      </main>
      <DoctorFooter />
    </div>
  );
}

export function DoctorDecorativeArt({ activeMode }: { activeMode?: "educational" | "practical" }) {
  const art =
    activeMode === "educational"
      ? {
          left: publicAsset("medical-art/dna-circuit.png"),
          right: publicAsset("medical-art/dna-magnifier.png"),
          leftOpacity: "opacity-[0.12]",
          rightOpacity: "opacity-[0.11]",
        }
      : activeMode === "practical"
        ? {
            left: publicAsset("medical-art/genetic-engineering.png"),
            right: publicAsset("medical-art/kidney-dna.png"),
            leftOpacity: "opacity-[0.1]",
            rightOpacity: "opacity-[0.15]",
          }
        : {
            left: publicAsset("medical-art/dna-molecule.png"),
            right: publicAsset("medical-art/kidney-dna.png"),
            leftOpacity: "opacity-[0.16]",
            rightOpacity: "opacity-[0.17]",
          };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      <img
        src={art.left}
        alt=""
        className={`absolute -left-24 bottom-[-155px] h-[520px] w-[520px] rotate-[-10deg] object-contain ${art.leftOpacity}`}
      />
      <img
        src={art.right}
        alt=""
        className={`absolute -right-24 top-8 h-[470px] w-[470px] rotate-[7deg] object-contain ${art.rightOpacity}`}
      />
    </div>
  );
}

export function DoctorFooter() {
  return (
    <footer className="bg-[#0f2b33] text-[#a7bfc6]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <img src={publicAsset("garnet-mark.png")} alt="" className="h-10 w-10 shrink-0 object-contain" />
              <div className="leading-tight">
                <p className="text-xl font-bold tracking-[0.18em] text-[#e6f0f2]">GARNET</p>
                <p className="text-[0.95rem]">Genetic indicators Assessment Referral Note and Education Tool</p>
              </div>
            </div>
            <p className="mt-5 max-w-md leading-relaxed">
              A clinician-facing workspace for nephrology education, genetic counseling workflows,
              and practical genetic testing resources.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.95rem] font-medium text-[#e6f0f2]">
              <BadgeCheck aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-[#8fd0df]" />
              For educational purposes only
            </p>
          </div>

          <nav aria-label="Doctor resources">
            <h3 className="text-[0.95rem] font-bold uppercase tracking-[0.14em] text-[#e6f0f2]">
              Doctor Side
            </h3>
            <ul className="mt-4 space-y-1.5">
              <li>
                <Link className="inline-block rounded-md py-1.5 text-[1.02rem] underline-offset-4 transition-colors hover:text-[#e6f0f2] hover:underline" to="/doctor/dashboard/educational">
                  Educational Materials
                </Link>
              </li>
              <li>
                <Link className="inline-block rounded-md py-1.5 text-[1.02rem] underline-offset-4 transition-colors hover:text-[#e6f0f2] hover:underline" to="/doctor/dashboard/practical">
                  Practical Tools
                </Link>
              </li>
              <li>
                <Link className="inline-block rounded-md py-1.5 text-[1.02rem] underline-offset-4 transition-colors hover:text-[#e6f0f2] hover:underline" to="/doctor/dashboard/resource/genetic-counseling-workflow">
                  Workflow
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="GARNET platform">
            <h3 className="text-[0.95rem] font-bold uppercase tracking-[0.14em] text-[#e6f0f2]">
              Platform
            </h3>
            <ul className="mt-4 space-y-1.5">
              <li>
                <Link className="inline-block rounded-md py-1.5 text-[1.02rem] underline-offset-4 transition-colors hover:text-[#e6f0f2] hover:underline" to="/">
                  Main Landing
                </Link>
              </li>
              <li>
                <Link className="inline-block rounded-md py-1.5 text-[1.02rem] underline-offset-4 transition-colors hover:text-[#e6f0f2] hover:underline" to="/learn">
                  Patient Learn
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="max-w-3xl text-[0.98rem] leading-relaxed">
            <strong className="font-semibold text-[#e6f0f2]">Medical disclaimer: </strong>
            GARNET does not provide medical advice, diagnosis, risk estimates, genetic counseling,
            or treatment recommendations. Please speak with a qualified healthcare professional.
          </p>
          <p className="mt-5 text-[0.95rem]">
            © {new Date().getFullYear()} GARNET · A Columbia medical research project
          </p>
        </div>
      </div>
    </footer>
  );
}
