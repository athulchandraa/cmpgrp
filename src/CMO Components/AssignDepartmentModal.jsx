import { useState } from 'react'
import { X } from 'lucide-react'

const departments = [
  'Public Works Department',
  'Health Department',
  'Education Department',
  'Police Department',
  'Local Self Government',
  'Agriculture Department',
]

const officers = [
  'Officer A',
  'Officer B',
  'Officer C',
]

const priorities = ['Low', 'Medium', 'High']

function AssignDepartmentForm({ grievance, onAssign, onCancel }) {
  // Props provide the selected grievance and let the parent handle modal actions.
  const [formValues, setFormValues] = useState(() => ({
    department: grievance.officer ? grievance.department || '' : '',
    officer: grievance.officer || '',
    priority: grievance.officer ? grievance.priority || '' : '',
    remarks: grievance.remarks || '',
  }))
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState('')

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))
    setErrors((previousErrors) => ({ ...previousErrors, [name]: '' }))
    setFormMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    // Require assignment details while allowing remarks to remain optional.
    const newErrors = {}
    if (!formValues.department) {
      newErrors.department = 'Please select a department.'
    }
    if (!formValues.officer) {
      newErrors.officer = 'Please select an officer.'
    }
    if (!formValues.priority) {
      newErrors.priority = 'Please select a priority.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setFormMessage('')
      return
    }

    // Send the completed values to the parent; no API call is made here.
    onAssign?.({
      referenceId: grievance.referenceId,
      ...formValues,
    })
    setFormMessage('Assignment details are ready. No changes were sent to a server.')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-modal-title"
        className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
          <div>
            <h2
              id="assign-modal-title"
              className="text-xl font-bold text-[#145B43]"
            >
              Assign Department
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Grievance reference:{' '}
              <span className="font-semibold text-slate-800">
                {grievance.referenceId || 'Not provided'}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close assignment dialog"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5 sm:p-6">
          <div>
            <label
              htmlFor="assign-department"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Department <span className="text-red-700">*</span>
            </label>
            <select
              id="assign-department"
              name="department"
              value={formValues.department}
              onChange={handleInputChange}
              aria-invalid={Boolean(errors.department)}
              aria-describedby={
                errors.department ? 'assign-department-error' : undefined
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errors.department && (
              <p
                id="assign-department-error"
                className="mt-1.5 text-sm text-red-700"
              >
                {errors.department}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="assign-officer"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Officer <span className="text-red-700">*</span>
              </label>
              <select
                id="assign-officer"
                name="officer"
                value={formValues.officer}
                onChange={handleInputChange}
                aria-invalid={Boolean(errors.officer)}
                aria-describedby={
                  errors.officer ? 'assign-officer-error' : undefined
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              >
                <option value="">Select an officer</option>
                {officers.map((officer) => (
                  <option key={officer} value={officer}>
                    {officer}
                  </option>
                ))}
              </select>
              {errors.officer && (
                <p id="assign-officer-error" className="mt-1.5 text-sm text-red-700">
                  {errors.officer}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="assign-priority"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Priority <span className="text-red-700">*</span>
              </label>
              <select
                id="assign-priority"
                name="priority"
                value={formValues.priority}
                onChange={handleInputChange}
                aria-invalid={Boolean(errors.priority)}
                aria-describedby={
                  errors.priority ? 'assign-priority-error' : undefined
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              >
                <option value="">Select priority</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p
                  id="assign-priority-error"
                  className="mt-1.5 text-sm text-red-700"
                >
                  {errors.priority}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="assign-remarks"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Remarks <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="assign-remarks"
              name="remarks"
              rows={4}
              value={formValues.remarks}
              onChange={handleInputChange}
              className="w-full resize-y rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              placeholder="Add any instructions for the assigned officer"
            />
          </div>

          {formMessage && (
            <p role="status" className="text-sm text-[#145B43]">
              {formMessage}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#145B43] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              Assign
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function AssignDepartmentModal({ grievance, onAssign, onCancel }) {
  if (!grievance) {
    return null
  }

  // A new key remounts the form and clears its state when the selected grievance changes.
  return (
    <AssignDepartmentForm
      key={grievance.referenceId}
      grievance={grievance}
      onAssign={onAssign}
      onCancel={onCancel}
    />
  )
}

export default AssignDepartmentModal
