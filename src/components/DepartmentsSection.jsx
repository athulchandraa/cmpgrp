import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Shield,
  Sprout,
  Construction,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Keep department names, descriptions, and icons together for easy maintenance.
const departments = [
  {
    name: 'Public Works Department',
    description: 'Roads, bridges, and public infrastructure services.',
    icon: Construction,
  },
  {
    name: 'Health Department',
    description: 'Public health services and healthcare facilities.',
    icon: HeartPulse,
  },
  {
    name: 'Education Department',
    description: 'Schools, learning, and education-related services.',
    icon: GraduationCap,
  },
  {
    name: 'Police Department',
    description: 'Public safety, law enforcement, and community support.',
    icon: Shield,
  },
  {
    name: 'Local Self Government',
    description: 'Local civic services and community development.',
    icon: Building2,
  },
  {
    name: 'Agriculture Department',
    description: 'Agriculture services and support for farming communities.',
    icon: Sprout,
  },
]

function DepartmentsSection() {
  return (
    <section className="bg-[#F4F7F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#145B43]">
              Find the right service
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
              Explore Government Departments
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* map() creates a department card for each item in the array above. */}
          {departments.map((department) => {
            const Icon = department.icon

            return (
              <article
                key={department.name}
                className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#145B43]/10 text-[#145B43] transition group-hover:bg-[#145B43] group-hover:text-white">
                  <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-800">
                  {department.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {department.description}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-9 text-center">
          <Link
            to="/departments"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            View All Departments
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DepartmentsSection
