import { ArrowRight, CalendarDays } from 'lucide-react'

// These fictional announcements are demo content and are not official updates.
const announcements = [
  {
    title: 'Grievance Portal Service Demonstration',
    date: 'November 12, 2026',
    description:
      'A sample announcement showing how citizens can learn about submitting and tracking a grievance through the portal.',
  },
  {
    title: 'Public Service Feedback Session',
    date: 'November 18, 2026',
    description:
      'This fictional update highlights an opportunity for citizens to share feedback about public services.',
  },
  {
    title: 'Department Response Process Overview',
    date: 'November 25, 2026',
    description:
      'A demo notice explaining how grievances may be reviewed and routed to the relevant department.',
  },
]

function LatestUpdatesSection() {
  return (
    <section className="bg-[#F4F7F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            News and notices
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            Latest Updates &amp; Announcements
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Fictional demo content for illustration only; these are not
            official announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* map() displays one announcement card for each demo item above. */}
          {announcements.map((announcement) => (
            <article
              key={announcement.title}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays
                  aria-hidden="true"
                  className="text-[#145B43]"
                  size={17}
                />
                <time>{announcement.date}</time>
              </div>
              <h3 className="text-lg font-semibold leading-7 text-[#145B43]">
                {announcement.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {announcement.description}
              </p>
              <a
                href="#updates"
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#145B43] transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
              >
                Read More
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </article>
          ))}
        </div>

        <p id="updates" className="sr-only">
          The announcement summaries above are sample demo content.
        </p>
      </div>
    </section>
  )
}

export default LatestUpdatesSection
