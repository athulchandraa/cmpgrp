import {
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
} from 'lucide-react'

// Fictional demo values are kept together here so the cards are easy to update.
const statistics = [
  {
    label: 'Total Grievances',
    value: '12,500',
    icon: FileText,
  },
  {
    label: 'Resolved',
    value: '9,200',
    icon: CheckCircle2,
  },
  {
    label: 'Pending',
    value: '2,100',
    icon: Clock3,
  },
  {
    label: 'In Progress',
    value: '1,200',
    icon: LoaderCircle,
  },
]

function StatisticsSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            Grievance Statistics
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Fictional demo data for illustrative purposes only; these are not
            actual government statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* map() renders one matching statistic card for every array item. */}
          {statistics.map((statistic) => {
            const Icon = statistic.icon

            return (
              <article
                key={statistic.label}
                className="rounded-xl border border-slate-100 bg-[#F4F7F5] p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#145B43]/10 text-[#145B43]">
                    <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                  </span>
                  <span className="h-1 w-10 rounded-full bg-[#145B43]/20" />
                </div>
                <p className="mt-6 text-3xl font-bold tracking-tight text-[#145B43]">
                  {statistic.value}
                </p>
                <h3 className="mt-1 text-sm font-medium text-slate-600">
                  {statistic.label}
                </h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
