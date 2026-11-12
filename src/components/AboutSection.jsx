import {
  Eye,
  HandHeart,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Target,
} from 'lucide-react'

const aboutValues = [
  {
    title: 'Our Mission',
    description:
      'Provide citizens with a clear, accessible channel to raise concerns and receive timely, efficient grievance handling.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    description:
      'Build public trust through transparent processes, accountable action, and responsive public services.',
    icon: Eye,
  },
  {
    title: 'Our Objectives',
    description:
      'Encourage citizen participation and help route grievances for review, action, and clear communication of outcomes.',
    icon: HandHeart,
  },
]

function AboutSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            About the portal
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            About CM Kerala
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            The CM Kerala public grievance redressal portal is a channel for
            citizens to bring public service concerns to the government. It
            supports transparent review, accountable follow-up, and efficient
            handling so people can participate and understand how their
            grievances are addressed.
          </p>

          <div className="mt-8 space-y-4">
            {aboutValues.map((value) => {
              const Icon = value.icon

              return (
                <article
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-[#F4F7F5] p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#145B43]/10 text-[#145B43]">
                    <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#145B43]">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-[2rem] border-l-4 border-t-4 border-[#145B43]/20"
          />
          <div className="relative overflow-hidden rounded-3xl bg-[#145B43] p-8 text-white shadow-xl shadow-[#145B43]/15 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full border-[28px] border-white/10"
            />
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Landmark aria-hidden="true" size={32} strokeWidth={1.6} />
              </div>
              <h3 className="mt-8 text-2xl font-bold">
                A stronger connection between citizens and public services
              </h3>
              <p className="mt-3 leading-7 text-white/80">
                Every concern deserves to be heard, reviewed, and handled with
                care.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mb-3 text-emerald-100"
                    size={23}
                  />
                  <p className="text-sm font-semibold">Accountable action</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                  <MessageCircle
                    aria-hidden="true"
                    className="mb-3 text-emerald-100"
                    size={23}
                  />
                  <p className="text-sm font-semibold">Citizen participation</p>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden h-20 w-20 rounded-br-[2rem] border-b-4 border-r-4 border-[#145B43]/20 sm:block"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
