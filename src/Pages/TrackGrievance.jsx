import { useState } from 'react'
import { CheckCircle2, Clock3, Search } from 'lucide-react'

// Fictional records demonstrate how a reference lookup can work without an API.
const sampleGrievances = [
  {
    referenceId: 'DEMO-2026-1042',
    subject: 'Street light repair request',
    department: 'Local Self Government',
    status: 'In Progress',
    submissionDate: 'November 06, 2026',
    history: [
      {
        title: 'Grievance submitted',
        date: 'November 06, 2026',
        description: 'Your grievance was received for review.',
      },
      {
        title: 'Forwarded to department',
        date: 'November 08, 2026',
        description: 'The grievance was assigned to the relevant department.',
      },
      {
        title: 'Department review in progress',
        date: 'November 10, 2026',
        description: 'The department is reviewing the reported issue.',
      },
    ],
  },
  {
    referenceId: 'DEMO-2026-0873',
    subject: 'Public clinic facility concern',
    department: 'Health Department',
    status: 'Resolved',
    submissionDate: 'October 14, 2026',
    history: [
      {
        title: 'Grievance submitted',
        date: 'October 14, 2026',
        description: 'Your grievance was received for review.',
      },
      {
        title: 'Forwarded to department',
        date: 'October 16, 2026',
        description: 'The grievance was assigned to the Health Department.',
      },
      {
        title: 'Response recorded',
        date: 'October 21, 2026',
        description: 'A department response was recorded for this grievance.',
      },
      {
        title: 'Grievance resolved',
        date: 'October 22, 2026',
        description: 'The grievance review was marked as complete.',
      },
    ],
  },
]

function TrackGrievance() {
  const [referenceNumber, setReferenceNumber] = useState('')
  const [foundGrievance, setFoundGrievance] = useState(null)
  const [searchMessage, setSearchMessage] = useState('')

  function handleSearch(event) {
    event.preventDefault()

    if (!referenceNumber.trim()) {
      setFoundGrievance(null)
      setSearchMessage('Enter a grievance reference number to search.')
      return
    }

    // Find a sample record by reference ID without making an API request.
    const matchingGrievance = sampleGrievances.find(
      (grievance) =>
        grievance.referenceId.toLowerCase() ===
        referenceNumber.trim().toLowerCase(),
    )

    setFoundGrievance(matchingGrievance || null)
    setSearchMessage(
      matchingGrievance
        ? ''
        : 'No grievance was found with that reference number. Check the ID and try again.',
    )
  }

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            Citizen services
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            Track Your Grievance
          </h1>
          <p className="mt-3 text-slate-600">
            Enter your reference number to view the latest status and history.
          </p>
        </div>

        <p className="mt-6 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-center text-sm text-slate-600">
          Demo lookup: all reference numbers and grievance details are fictional
          sample data.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:p-6"
        >
          <label htmlFor="reference-number" className="sr-only">
            Grievance reference number
          </label>
          <input
            id="reference-number"
            type="text"
            value={referenceNumber}
            onChange={(event) => {
              setReferenceNumber(event.target.value)
              setSearchMessage('')
            }}
            placeholder="e.g. DEMO-2026-1042"
            className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            <Search aria-hidden="true" size={18} />
            Search
          </button>
        </form>

        {searchMessage && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            {searchMessage}
          </p>
        )}

        {foundGrievance && (
          <section className="mt-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reference ID
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#145B43]">
                  {foundGrievance.referenceId}
                </h2>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                  foundGrievance.status === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-blue-50 text-blue-800'
                }`}
              >
                {foundGrievance.status}
              </span>
            </div>

            <dl className="grid gap-5 py-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">
                  Complaint subject
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">
                  {foundGrievance.subject}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">
                  Assigned department
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">
                  {foundGrievance.department}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">
                  Submission date
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">
                  {foundGrievance.submissionDate}
                </dd>
              </div>
            </dl>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-lg font-bold text-[#145B43]">
                Grievance History
              </h3>
              <ol className="mt-5 space-y-0">
                {foundGrievance.history.map((historyItem, index) => (
                  <li
                    key={`${historyItem.title}-${historyItem.date}`}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {index < foundGrievance.history.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[15px] top-8 h-full w-px bg-[#145B43]/20"
                      />
                    )}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#145B43]/10 text-[#145B43]">
                      {index === foundGrievance.history.length - 1 &&
                      foundGrievance.status === 'Resolved' ? (
                        <CheckCircle2 aria-hidden="true" size={17} />
                      ) : (
                        <Clock3 aria-hidden="true" size={16} />
                      )}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-slate-800">
                        {historyItem.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {historyItem.date}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {historyItem.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default TrackGrievance
