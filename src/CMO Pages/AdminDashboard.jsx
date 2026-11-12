import { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import AssignDepartmentModal from '../CMO Components/AssignDepartmentModal'

// Fictional example records used to populate the dashboard and its charts.
const sampleGrievances = [
  {
    referenceId: 'DEMO-2026-1042',
    subject: 'Street light repair request',
    district: 'Ernakulam',
    category: 'Local Self Government',
    department: 'Local Self Government',
    priority: 'Medium',
    status: 'In Progress',
    officer: 'Officer A',
    overdue: false,
    date: 'Nov 06, 2026',
  },
  {
    referenceId: 'DEMO-2026-1038',
    subject: 'Road surface maintenance',
    district: 'Kozhikode',
    category: 'Public Works',
    department: 'Public Works Department',
    priority: 'High',
    status: 'Pending',
    overdue: true,
    date: 'Nov 04, 2026',
  },
  {
    referenceId: 'DEMO-2026-1021',
    subject: 'Public clinic facility concern',
    district: 'Thiruvananthapuram',
    category: 'Health',
    department: 'Health Department',
    priority: 'High',
    status: 'Resolved',
    overdue: false,
    date: 'Nov 02, 2026',
  },
  {
    referenceId: 'DEMO-2026-1016',
    subject: 'School drinking water supply',
    district: 'Palakkad',
    category: 'Education',
    department: 'Education Department',
    priority: 'Medium',
    status: 'In Progress',
    officer: 'Officer B',
    overdue: false,
    date: 'Oct 31, 2026',
  },
  {
    referenceId: 'DEMO-2026-1007',
    subject: 'Local drainage maintenance',
    district: 'Kollam',
    category: 'Local Self Government',
    department: 'Local Self Government',
    priority: 'Low',
    status: 'Pending',
    overdue: true,
    date: 'Oct 29, 2026',
  },
  {
    referenceId: 'DEMO-2026-0994',
    subject: 'Community health service request',
    district: 'Ernakulam',
    category: 'Health',
    department: 'Health Department',
    priority: 'Medium',
    status: 'Resolved',
    overdue: false,
    date: 'Oct 27, 2026',
  },
  {
    referenceId: 'DEMO-2026-0978',
    subject: 'Damaged road sign',
    district: 'Kannur',
    category: 'Public Works',
    department: 'Public Works Department',
    priority: 'Low',
    status: 'In Progress',
    officer: 'Officer C',
    overdue: false,
    date: 'Oct 24, 2026',
  },
  {
    referenceId: 'DEMO-2026-0952',
    subject: 'School classroom repair',
    district: 'Kozhikode',
    category: 'Education',
    department: 'Education Department',
    priority: 'High',
    status: 'Pending',
    overdue: true,
    date: 'Oct 20, 2026',
  },
  {
    referenceId: 'DEMO-2026-0927',
    subject: 'Street waste collection',
    district: 'Alappuzha',
    category: 'Local Self Government',
    department: 'Local Self Government',
    priority: 'Medium',
    status: 'Resolved',
    overdue: false,
    date: 'Oct 17, 2026',
  },
]

const districts = [
  'Alappuzha',
  'Ernakulam',
  'Kannur',
  'Kollam',
  'Kozhikode',
  'Palakkad',
  'Thiruvananthapuram',
]
const categories = ['Education', 'Health', 'Local Self Government', 'Public Works']
const priorities = ['High', 'Medium', 'Low']
const statuses = ['Pending', 'Assigned', 'In Progress', 'Resolved']
const chartColors = ['#D6A84F', '#347A5E', '#6B9E88', '#145B43']

function getStatusClasses(status) {
  if (status === 'Resolved') {
    return 'bg-emerald-50 text-emerald-800'
  }
  if (status === 'In Progress') {
    return 'bg-blue-50 text-blue-800'
  }
  if (status === 'Assigned') {
    return 'bg-[#145B43]/10 text-[#145B43]'
  }
  return 'bg-amber-50 text-amber-800'
}

function AdminDashboard() {
  const [grievances, setGrievances] = useState(sampleGrievances)
  const [filters, setFilters] = useState({
    district: 'All',
    category: 'All',
    priority: 'All',
    status: 'All',
  })
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [viewedGrievance, setViewedGrievance] = useState(null)

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }))
  }

  function handleAssign(assignment) {
    // Update the matching grievance locally; no backend request is made.
    setGrievances((previousGrievances) =>
      previousGrievances.map((grievance) =>
        grievance.referenceId === assignment.referenceId
          ? {
              ...grievance,
              department: assignment.department,
              officer: assignment.officer,
              priority: assignment.priority,
              remarks: assignment.remarks,
              status:
                grievance.status === 'Pending' ? 'Assigned' : grievance.status,
            }
          : grievance,
      ),
    )
    setSelectedGrievance(null)
  }

  // Each selected filter is applied to the same sample list before totals and
  // charts are calculated, so every dashboard view stays in sync.
  const filteredGrievances = grievances.filter((grievance) => {
    return (
      (filters.district === 'All' || grievance.district === filters.district) &&
      (filters.category === 'All' || grievance.category === filters.category) &&
      (filters.priority === 'All' || grievance.priority === filters.priority) &&
      (filters.status === 'All' || grievance.status === filters.status)
    )
  })

  const statusChartData = statuses.map((status) => ({
    name: status,
    value: filteredGrievances.filter((item) => item.status === status).length,
  }))

  // Chart series are grouped from the currently filtered sample grievances.
  const districtChartData = districts
    .map((district) => ({
      name: district,
      grievances: filteredGrievances.filter(
        (item) => item.district === district,
      ).length,
    }))
    .filter((item) => item.grievances > 0)

  const departmentChartData = [
    'Local Self Government',
    'Public Works Department',
    'Health Department',
    'Education Department',
  ]
    .map((department) => ({
      name: department,
      grievances: filteredGrievances.filter(
        (item) => item.department === department,
      ).length,
    }))
    .filter((item) => item.grievances > 0)

  const statistics = [
    {
      label: 'Total',
      value: filteredGrievances.length,
      icon: ClipboardList,
    },
    {
      label: 'Pending',
      value: filteredGrievances.filter((item) => item.status === 'Pending')
        .length,
      icon: Clock3,
    },
    {
      label: 'Resolved',
      value: filteredGrievances.filter((item) => item.status === 'Resolved')
        .length,
      icon: CheckCircle2,
    },
    {
      label: 'Overdue',
      value: filteredGrievances.filter((item) => item.overdue).length,
      icon: AlertTriangle,
    },
  ]

  const statusTotal = statusChartData.reduce((total, item) => total + item.value, 0)

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#145B43]">
              CM Kerala · Admin Portal
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#145B43] sm:text-3xl">
              Chief Minister&apos;s Office Dashboard
            </h1>
          </div>
          <p className="text-sm text-slate-500">Dashboard overview · Demo data</p>
        </div>

        <p className="mt-5 rounded-lg border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
          All dashboard records and metrics are fictional sample data for
          demonstration only.
        </p>

        <section
          aria-label="Dashboard filters"
          className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { name: 'district', label: 'District', options: districts },
            { name: 'category', label: 'Category', options: categories },
            { name: 'priority', label: 'Priority', options: priorities },
            { name: 'status', label: 'Status', options: statuses },
          ].map((filter) => (
            <label
              key={filter.name}
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {filter.label}
              <select
                name={filter.name}
                value={filters[filter.name]}
                onChange={handleFilterChange}
                className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              >
                <option value="All">All {filter.label}s</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </section>

        <section
          aria-label="Grievance statistics"
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {statistics.map((statistic) => {
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

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-1">
            <h2 className="text-lg font-bold text-[#145B43]">
              Grievance Status Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current status distribution
            </p>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {statusChartData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-600">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          chartColors[index % chartColors.length],
                      }}
                    />
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.value}
                  </span>
                </div>
              ))}
              {statusTotal === 0 && (
                <p className="text-center text-sm text-slate-500">
                  No grievances match these filters.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
            <h2 className="text-lg font-bold text-[#145B43]">
              District-wise Grievances
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sample grievance volume by district
            </p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtChartData} margin={{ bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={55}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="grievances"
                    name="Grievances"
                    fill="#145B43"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              {districtChartData.length === 0 && (
                <p className="text-center text-sm text-slate-500">
                  No district data matches these filters.
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#145B43]">
            Department-wise Grievances
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample grievance volume by assigned department
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentChartData}
                layout="vertical"
                margin={{ left: 18, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={165}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Bar
                  dataKey="grievances"
                  name="Grievances"
                  fill="#347A5E"
                  radius={[0, 5, 5, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            {departmentChartData.length === 0 && (
              <p className="text-center text-sm text-slate-500">
                No department data matches these filters.
              </p>
            )}
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#145B43]">
              Recent Complaints
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest sample records matching the selected filters
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pr-4 font-semibold">Reference ID</th>
                  <th className="pb-3 pr-4 font-semibold">Subject</th>
                  <th className="pb-3 pr-4 font-semibold">District</th>
                  <th className="pb-3 pr-4 font-semibold">Department</th>
                  <th className="pb-3 pr-4 font-semibold">Officer</th>
                  <th className="pb-3 pr-4 font-semibold">Priority</th>
                  <th className="pb-3 pr-4 font-semibold">Date</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrievances.slice(0, 6).map((grievance) => (
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
                      {grievance.district}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.department || 'Not assigned'}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.officer || 'Not assigned'}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.priority}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {grievance.date}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(grievance.status)}`}
                      >
                        {grievance.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {grievance.status === 'Resolved' ? (
                        <button
                          type="button"
                          onClick={() => setViewedGrievance(grievance)}
                          className="rounded-md border border-[#145B43]/30 px-3 py-2 text-xs font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
                        >
                          View
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setViewedGrievance(null)
                            setSelectedGrievance(grievance)
                          }}
                          className="whitespace-nowrap rounded-md border border-[#145B43]/30 px-3 py-2 text-xs font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
                        >
                          {grievance.officer ? 'Reassign' : 'Assign Department'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredGrievances.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No complaints match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {viewedGrievance && (
            <div className="mt-5 rounded-lg border border-[#145B43]/15 bg-[#F4F7F5] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-[#145B43]">
                    Grievance details
                  </h3>
                  <p className="mt-1 text-sm text-slate-700">
                    {viewedGrievance.referenceId} · {viewedGrievance.subject}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {viewedGrievance.department} · {viewedGrievance.status}
                  </p>
                  {viewedGrievance.remarks && (
                    <p className="mt-2 text-sm text-slate-600">
                      Remarks: {viewedGrievance.remarks}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setViewedGrievance(null)}
                  className="rounded-md px-2 py-1 text-sm font-medium text-[#145B43] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#145B43]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <AssignDepartmentModal
        grievance={selectedGrievance}
        onAssign={handleAssign}
        onCancel={() => setSelectedGrievance(null)}
      />
    </main>
  )
}

export default AdminDashboard
