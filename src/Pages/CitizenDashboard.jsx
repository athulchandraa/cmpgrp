import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  MessageSquareText,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// All counts, grievance rows, and activity entries below are fictional examples.
const dashboardStatistics = [
  { label: 'Total Grievances', value: 8, icon: FileText },
  { label: 'Pending', value: 2, icon: Clock3 },
  { label: 'In Progress', value: 3, icon: LoaderCircle },
  { label: 'Resolved', value: 3, icon: CheckCircle2 },
]

const recentGrievances = [
  {
    referenceId: 'DEMO-2026-1042',
    subject: 'Street light repair request',
    department: 'Local Self Government',
    submissionDate: 'Nov 06, 2026',
    status: 'In Progress',
  },
  {
    referenceId: 'DEMO-2026-0981',
    subject: 'Road surface maintenance',
    department: 'Public Works Department',
    submissionDate: 'Oct 28, 2026',
    status: 'Pending',
  },
  {
    referenceId: 'DEMO-2026-0873',
    subject: 'Public clinic facility concern',
    department: 'Health Department',
    submissionDate: 'Oct 14, 2026',
    status: 'Resolved',
  },
]

const recentActivity = [
  {
    message: 'A department review was recorded for your grievance.',
    referenceId: 'DEMO-2026-1042',
    date: 'Nov 10, 2026',
  },
  {
    message: 'Your grievance was received for review.',
    referenceId: 'DEMO-2026-0981',
    date: 'Oct 28, 2026',
  },
  {
    message: 'A response was recorded for your grievance.',
    referenceId: 'DEMO-2026-0873',
    date: 'Oct 21, 2026',
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

function CitizenDashboard() {

  const [citizen,setCitizen]=useState({
    name:""
  })
  
  const getUserData=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    setCitizen({...citizen,name:user.name});
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Citizen Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#145B43] sm:text-3xl">
              Welcome, {citizen.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review your grievance status and recent updates.
            </p>
          </div>
          <Link
            to="/submit-grievance"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            <MessageSquareText aria-hidden="true" size={18} />
            Submit New Grievance
          </Link>
        </div>

        <p className="mt-6 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
          Demo dashboard: all names, reference IDs, dates, counts, and activity
          shown here are fictional examples.
        </p>

        {/* Reuse one card layout for each statistic in the sample array. */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#145B43]">
                Recent Grievances
              </h2>
              <Link
                to="/my-grievances"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#145B43] hover:underline"
              >
                View all
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                    <th className="pb-3 pr-4 font-semibold">Reference ID</th>
                    <th className="pb-3 pr-4 font-semibold">Subject</th>
                    <th className="pb-3 pr-4 font-semibold">Department</th>
                    <th className="pb-3 pr-4 font-semibold">Submitted</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentGrievances.map((grievance) => (
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
                        {grievance.submissionDate}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(grievance.status)}`}
                        >
                          {grievance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#145B43]">
              Recent Activity
            </h2>
            <div className="mt-5 space-y-5">
              {recentActivity.map((activity, index) => (
                <article
                  key={`${activity.referenceId}-${activity.date}`}
                  className="relative flex gap-3"
                >
                  {index < recentActivity.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[15px] top-8 h-full w-px bg-slate-200"
                    />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#145B43]/10 text-[#145B43]">
                    <Clock3 aria-hidden="true" size={16} />
                  </span>
                  <div className="pb-1">
                    <p className="text-sm leading-5 text-slate-700">
                      {activity.message}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.referenceId} · {activity.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default CitizenDashboard
