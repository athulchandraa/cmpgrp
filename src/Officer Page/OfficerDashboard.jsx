import { useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  LoaderCircle,
  X,
} from 'lucide-react'

// Fictional assigned grievances used as sample dashboard data.
const assignedGrievances = [
  {
    referenceId: 'DEMO-2026-1042',
    subject: 'Street light repair request',
    priority: 'Medium',
    submissionDate: 'Nov 06, 2026',
    status: 'In Progress',
    description:
      'A request to inspect and repair a street light that is not working.',
  },
  {
    referenceId: 'DEMO-2026-1038',
    subject: 'Road surface maintenance',
    priority: 'High',
    submissionDate: 'Nov 04, 2026',
    status: 'Pending',
    description:
      'A report about a damaged road surface that needs inspection.',
  },
  {
    referenceId: 'DEMO-2026-1016',
    subject: 'School drinking water supply',
    priority: 'Medium',
    submissionDate: 'Oct 31, 2026',
    status: 'In Progress',
    description:
      'A concern regarding the drinking water supply at a local school.',
  },
  {
    referenceId: 'DEMO-2026-0994',
    subject: 'Community health service request',
    priority: 'Low',
    submissionDate: 'Oct 27, 2026',
    status: 'Resolved',
    description:
      'A request for information about a community health service.',
  },
]

function getStatusClasses(status) {
  if (status === 'Resolved') {
    return 'bg-emerald-50 text-emerald-800'
  }
  if (status === 'In Progress') {
    return 'bg-blue-50 text-blue-800'
  }
  return 'bg-amber-50 text-amber-800'
}

function getPriorityClasses(priority) {
  if (priority === 'High') {
    return 'bg-red-50 text-red-800'
  }
  if (priority === 'Medium') {
    return 'bg-amber-50 text-amber-800'
  }
  return 'bg-slate-100 text-slate-700'
}

function OfficerDashboard() {
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const officerName = 'Officer A'

  const dashboardStatistics = [
    {
      label: 'Total Assigned',
      value: assignedGrievances.length,
      icon: FileText,
    },
    {
      label: 'Pending',
      value: assignedGrievances.filter((item) => item.status === 'Pending')
        .length,
      icon: Clock3,
    },
    {
      label: 'In Progress',
      value: assignedGrievances.filter((item) => item.status === 'In Progress')
        .length,
      icon: LoaderCircle,
    },
    {
      label: 'Resolved',
      value: assignedGrievances.filter((item) => item.status === 'Resolved')
        .length,
      icon: CheckCircle2,
    },
  ]

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            Department Officer Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#145B43] sm:text-3xl">
            Welcome, {officerName}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review your assigned grievances and their current status.
          </p>
        </div>

        <p className="mt-6 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
          Demo dashboard: officer name, grievance records, reference IDs, and
          dates are fictional sample data.
        </p>

        {/* Map the statistic list to keep each dashboard card consistent. */}
        <section
          aria-label="Assigned grievance statistics"
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {dashboardStatistics.map((statistic) => {
            const Icon = statistic.icon

            return (
              <article
                key={statistic.label}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-600">
                    {statistic.label}
                  </p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#145B43]/10 text-[#145B43]">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-[#145B43]">
                  {statistic.value}
                </p>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#145B43]">
              Recently Assigned Grievances
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a record to view its sample details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {assignedGrievances.map((grievance) => (
              <article
                key={grievance.referenceId}
                className="rounded-xl border border-slate-100 bg-[#F4F7F5] p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {grievance.referenceId}
                    </p>
                    <h3 className="mt-1 font-semibold text-slate-900">
                      {grievance.subject}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(grievance.status)}`}
                  >
                    {grievance.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                  <span>
                    Priority:{' '}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityClasses(grievance.priority)}`}
                    >
                      {grievance.priority}
                    </span>
                  </span>
                  <span>Submitted: {grievance.submissionDate}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGrievance(grievance)}
                  className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#145B43]/30 bg-white px-4 py-2 text-sm font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
                >
                  <Eye aria-hidden="true" size={17} />
                  View Details
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      {selectedGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="officer-grievance-title"
            className="my-auto w-full max-w-lg rounded-xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {selectedGrievance.referenceId}
                </p>
                <h2
                  id="officer-grievance-title"
                  className="mt-1 text-xl font-bold text-[#145B43]"
                >
                  {selectedGrievance.subject}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGrievance(null)}
                aria-label="Close grievance details"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {selectedGrievance.description}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Priority</dt>
                <dd className="mt-1 font-medium text-slate-800">
                  {selectedGrievance.priority}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="mt-1 font-medium text-slate-800">
                  {selectedGrievance.status}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Submission date</dt>
                <dd className="mt-1 font-medium text-slate-800">
                  {selectedGrievance.submissionDate}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedGrievance(null)}
                className="rounded-md bg-[#145B43] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default OfficerDashboard
