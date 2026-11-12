import { Bot, Check, Pencil, ShieldAlert } from 'lucide-react'

function AIAnalysisCard({
  analysis,
  onAcceptSuggestion,
  onEditSuggestion,
}) {
  // Keep the card out of view until analysis results have been provided.
  if (!analysis) {
    return null
  }

  const priority = analysis.suggestedPriority?.toLowerCase()
  let priorityClasses = 'bg-slate-100 text-slate-700'

  // Choose a label color based on the priority returned in the props.
  if (priority === 'low') {
    priorityClasses = 'bg-emerald-100 text-emerald-800'
  } else if (priority === 'medium') {
    priorityClasses = 'bg-amber-100 text-amber-800'
  } else if (priority === 'high') {
    priorityClasses = 'bg-red-100 text-red-800'
  }

  return (
    <section
      aria-labelledby="ai-analysis-heading"
      className="rounded-xl border border-[#145B43]/15 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#145B43]/10 text-[#145B43]">
          <Bot aria-hidden="true" size={23} />
        </span>
        <div>
          <h2
            id="ai-analysis-heading"
            className="text-lg font-bold text-[#145B43]"
          >
            AI Grievance Analysis
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Suggested details based on the grievance provided
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">
            AI Generated Summary
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {analysis.summary || 'No summary was provided.'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-[#F4F7F5] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Suggested Department
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {analysis.suggestedDepartment || 'Not specified'}
            </p>
          </div>
          <div className="rounded-lg bg-[#F4F7F5] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Suggested Category
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {analysis.suggestedCategory || 'Not specified'}
            </p>
          </div>
          <div className="rounded-lg bg-[#F4F7F5] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Suggested Priority
            </h3>
            <p className="mt-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityClasses}`}
              >
                {analysis.suggestedPriority || 'Not specified'}
              </span>
            </p>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-900">
          <ShieldAlert
            aria-hidden="true"
            className="mt-0.5 shrink-0"
            size={18}
          />
          AI suggestions are for assistance only and require human review.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onEditSuggestion?.(analysis)}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#145B43]/30 px-4 py-2.5 text-sm font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
        >
          <Pencil aria-hidden="true" size={17} />
          Edit Suggestion
        </button>
        <button
          type="button"
          onClick={() => onAcceptSuggestion?.(analysis)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
        >
          <Check aria-hidden="true" size={18} />
          Accept Suggestion
        </button>
      </div>
    </section>
  )
}

export default AIAnalysisCard
