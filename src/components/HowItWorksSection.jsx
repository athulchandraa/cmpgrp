import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FilePenLine,
} from 'lucide-react'

const processSteps = [
  {
    title: 'Submit Grievance',
    description: 'Citizens submit their complaints.',
    icon: FilePenLine,
  },
  {
    title: 'CMO Review',
    description: "The Chief Minister's Office reviews the complaint.",
    icon: ClipboardCheck,
  },
  {
    title: 'Department Action',
    description: 'The relevant department investigates the issue.',
    icon: Building2,
  },
  {
    title: 'Resolution',
    description:
      'The CMO reviews the response and communicates the outcome.',
    icon: CheckCircle2,
  },
]

function HowItWorksSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            How Does It Work?
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-5">
          {/* This line connects the numbered steps on wider screens. */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-[#145B43]/20 md:block"
          />

          {processSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <article
                key={step.title}
                className="relative flex gap-4 rounded-xl border border-slate-100 bg-[#F4F7F5] p-5 shadow-sm md:flex-col md:items-center md:border-0 md:bg-transparent md:p-4 md:text-center md:shadow-none"
              >
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#145B43] text-white shadow-md">
                  <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#145B43]/70">
                    Step {index + 1}
                  </p>
                  <h3 className="text-lg font-semibold text-[#145B43]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
