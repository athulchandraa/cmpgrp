import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Landmark,
  MessageSquareText,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F7F5]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[40px] border-[#145B43]/5"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#145B43]/10 px-4 py-2 text-sm font-semibold text-[#145B43]">
            <Landmark aria-hidden="true" size={17} />
            CM Kerala Public Grievance Portal
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#145B43] sm:text-5xl lg:text-6xl">
            Your Voice, Our Responsibility
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A transparent platform to raise public grievances and track
            government action.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/submit-grievance"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              <MessageSquareText aria-hidden="true" size={18} />
              Submit Grievance
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              to="/track-grievance"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#145B43]/25 bg-white px-6 py-3.5 text-sm font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              <FileText aria-hidden="true" size={18} />
              Track Grievance
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute inset-5 rounded-[2rem] bg-[#145B43]/10"
          />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-[#145B43]/10 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#145B43] text-white">
                  <Landmark aria-hidden="true" size={25} />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Public Service</p>
                  <p className="text-sm text-slate-500">Grievance support</p>
                </div>
              </div>
              <CheckCircle2
                aria-label="Secure public service"
                className="text-[#145B43]"
                size={24}
              />
            </div>

            <div className="space-y-4 py-6">
              <div className="rounded-xl bg-[#F4F7F5] p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#145B43] shadow-sm">
                    <MessageSquareText aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800">
                      Share your concern
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Submit your grievance to the appropriate department.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#145B43]/10 text-[#145B43]">
                    <FileText aria-hidden="true" size={19} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-800">
                        Track progress
                      </p>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Transparent
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Follow updates and responses as your concern is reviewed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <CheckCircle2
                aria-hidden="true"
                className="text-[#145B43]"
                size={17}
              />
              A direct channel to public services
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
