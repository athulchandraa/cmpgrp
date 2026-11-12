import { useState } from 'react'
import { Search } from 'lucide-react'

// Fictional sample grievances for demonstrating the search and status filter.
const grievances = [
  {
    referenceId: 'DEMO-2026-1042',
    subject: 'Street light repair request',
    department: 'Local Self Government',
    date: 'Nov 06, 2026',
    status: 'In Progress',
  },
  {
    referenceId: 'DEMO-2026-0981',
    subject: 'Road surface maintenance',
    department: 'Public Works Department',
    date: 'Oct 28, 2026',
    status: 'Pending',
  },
  {
    referenceId: 'DEMO-2026-0873',
    subject: 'Public clinic facility concern',
    department: 'Health Department',
    date: 'Oct 14, 2026',
    status: 'Resolved',
  },
  {
    referenceId: 'DEMO-2026-0756',
    subject: 'School drinking water supply',
    department: 'Education Department',
    date: 'Sep 30, 2026',
    status: 'In Progress',
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

function MyGrievances() {
  const [searchText, setSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedGrievance, setSelectedGrievance] = useState(null)

  // Apply both filters to the sample list; text search ignores letter casing.
  const filteredGrievances = grievances.filter((grievance) => {
    const searchMatches =
      grievance.referenceId.toLowerCase().includes(searchText.toLowerCase()) ||
      grievance.subject.toLowerCase().includes(searchText.toLowerCase())
    const statusMatches =
      selectedStatus === 'All' || grievance.status === selectedStatus

    return searchMatches && statusMatches
  })

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            Citizen portal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#145B43]">
            My Grievances
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Search and review grievances submitted from your account.
          </p>
        </div>

        <p className="mt-6 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
          Demo content: all grievance details and reference IDs below are
          fictional examples.
        </p>

        <section className="mt-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row">
            <label className="relative block flex-1">
              <span className="sr-only">Search by reference ID or subject</span>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={19}
              />
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search reference ID or subject"
                className="w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              />
            </label>

            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              Status
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="min-w-36 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              >
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pr-4 font-semibold">Reference ID</th>
                  <th className="pb-3 pr-4 font-semibold">Subject</th>
                  <th className="pb-3 pr-4 font-semibold">Department</th>
                  <th className="pb-3 pr-4 font-semibold">Date</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrievances.map((grievance) => (
                  <tr
                    key={grievance.referenceId}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 pr-4 font-medium text-[#145B43]">
                      {grievance.referenceId}
                    </td>
                    <td className="py-4 pr-4 text-slate-700">
                      {grievance.subject}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.department}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.date}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(grievance.status)}`}
                      >
                        {grievance.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedGrievance(grievance)}
                        className="whitespace-nowrap rounded-md border border-[#145B43]/30 px-3 py-2 text-xs font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredGrievances.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No grievances match your search and status filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {selectedGrievance && (
          <section
            aria-live="polite"
            className="mt-5 rounded-xl border border-[#145B43]/15 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-bold text-[#145B43]">
                  Grievance Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedGrievance.referenceId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGrievance(null)}
                className="w-fit rounded-md px-3 py-1.5 text-sm font-medium text-[#145B43] hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
              >
                Close details
              </button>
            </div>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-500">Subject</dt>
                <dd className="mt-1 text-slate-800">
                  {selectedGrievance.subject}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Department</dt>
                <dd className="mt-1 text-slate-800">
                  {selectedGrievance.department}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Date</dt>
                <dd className="mt-1 text-slate-800">
                  {selectedGrievance.date}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Status</dt>
                <dd className="mt-1 text-slate-800">
                  {selectedGrievance.status}
                </dd>
              </div>
            </dl>
          </section>
        )}
      </div>
    </main>
  )
}

export default MyGrievances
