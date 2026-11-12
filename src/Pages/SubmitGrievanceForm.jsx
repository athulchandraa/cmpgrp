import { useState } from 'react'
import { FileText, Paperclip, Sparkles, UploadCloud } from 'lucide-react'
import AIAnalysisCard from '../components/AIAnalysisCard'
import { analyzeGrievanceAPI, submitComplaint } from '../API/apiService'


const keralaDistricts = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
]

const grievanceCategories = [
  'Roads and Public Works',
  'Health',
  'Education',
  'Public Safety',
  'Local Self Government',
  'Agriculture',
  'Water and Sanitation',
  'Other',
]

function SubmitGrievanceForm() {
  const [formValues, setFormValues] = useState({
    district: '',
    category: '',
    subject: '',
    description: '',
  })

  
  const [selectedFile, setSelectedFile] = useState(null)
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

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0] || null)
    setFormMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    

    // The supporting attachment is optional; the other fields are required.
    const newErrors = {}
    if (!formValues.district) {
      newErrors.district = 'Please select a district.'
    }
    if (!formValues.category) {
      newErrors.category = 'Please select a grievance category.'
    }
    if (!formValues.subject.trim()) {
      newErrors.subject = 'Please enter a complaint subject.'
    }
    if (!formValues.description.trim()) {
      newErrors.description = 'Please describe the grievance.'
    }

    setErrors(newErrors)
    setFormMessage('')

    const data=new FormData();
    Object.entries(formValues).forEach(([key,value])=>{
      data.append(key,value)
    });

    if(selectedFile){
      data.append("supportingDocument",selectedFile)
    }

    if (Object.keys(newErrors).length === 0) {
      handleComplaint(data)
    }
  }

  //AI ANALYSIS

    async function handleAiAnalysis() {
      if (!formValues.description.trim()) {
        setFormMessage("Please enter complaint description first.");
        return;
      }

      try {
        const response = await analyzeGrievanceAPI(formValues.description);

        const result = response.data.analysis;

        setFormValues((prev) => ({
          ...prev,
          district: result.district || prev.district,
          category: result.category || prev.category,
          subject: result.subject || prev.subject,
        }));

        setFormMessage("AI analysis completed successfully!");
      } catch (error) {
        console.error("AI Analysis Error:", error);
        setFormMessage("AI analysis failed. Please try again.");
      }
    }

  const handleComplaint=async(data)=>{
      try{
        setFormMessage("Submitting Grievience....")
        const response=await submitComplaint(data)
        setFormMessage("Submitted Grievience successfully")
        setFormValues({
          district: '',
          category: '',
          subject: '',
          description: '',
        })
        setSelectedFile(null)
      }catch(error){
        console.error("Submission Error : " , error)
        setFormMessage(error.response?.data?.message || "Failed to Submit grievance")
      }
      
  }

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#145B43]">
            Citizen services
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#145B43] sm:text-4xl">
            Submit a Grievance
          </h1>
          <p className="mt-3 text-slate-600">
            Share the details of your concern so it can be directed to the
            relevant service.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8"
        >
          <section aria-labelledby="location-heading">
            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2
                id="location-heading"
                className="text-lg font-semibold text-slate-900"
              >
                1. Location and category
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose where the issue occurred and the closest service area.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="district"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  District <span className="text-red-700">*</span>
                </label>
                <select
                  id="district"
                  name="district"
                  value={formValues.district}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.district)}
                  aria-describedby={errors.district ? 'district-error' : undefined}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                >
                  <option value="">Select a district</option>
                  {keralaDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p id="district-error" className="mt-1.5 text-sm text-red-700">
                    {errors.district}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Grievance Category <span className="text-red-700">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                >
                  <option value="">Select a category</option>
                  {grievanceCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p id="category-error" className="mt-1.5 text-sm text-red-700">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section aria-labelledby="details-heading">
            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2
                id="details-heading"
                className="text-lg font-semibold text-slate-900"
              >
                2. Grievance details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Provide a clear subject and explain the issue.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Complaint Subject <span className="text-red-700">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                  placeholder="Briefly summarize the issue"
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-sm text-red-700">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Detailed Description <span className="text-red-700">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={formValues.description}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? 'description-error' : undefined
                  }
                  className="w-full resize-y rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                  placeholder="Describe what happened, where it happened, and any relevant details."
                />
                {errors.description && (
                  <p
                    id="description-error"
                    className="mt-1.5 text-sm text-red-700"
                  >
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section aria-labelledby="attachment-heading">
            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2
                id="attachment-heading"
                className="text-lg font-semibold text-slate-900"
              >
                3. Supporting document
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                This attachment is optional. Add an image or document if it
                helps explain your concern.
              </p>
            </div>

            <label
              htmlFor="supporting-file"
              className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-slate-300 bg-[#F4F7F5] px-5 py-7 text-center transition hover:border-[#145B43]/50"
            >
              <UploadCloud
                aria-hidden="true"
                className="text-[#145B43]"
                size={30}
              />
              <span className="mt-2 text-sm font-medium text-slate-700">
                Choose an image or document
              </span>
              <span className="mt-1 text-xs text-slate-500">
                PNG, JPG, PDF, or DOC
              </span>
              <input
                id="supporting-file"
                name="supportingFile"
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            {selectedFile && (
              <p className="mt-3 flex items-center gap-2 text-sm text-[#145B43]">
                <Paperclip aria-hidden="true" size={16} />
                <span className="break-all">{selectedFile.name}</span>
              </p>
            )}
          </section>

          {formMessage && (
            <p
              role="status"
              className="rounded-md bg-[#145B43]/5 px-4 py-3 text-sm text-[#145B43]"
            >
              {formMessage}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleAiAnalysis}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#145B43]/30 bg-white px-5 py-3 text-sm font-semibold text-[#145B43] transition hover:bg-[#145B43]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              <Sparkles aria-hidden="true" size={18} />
              Analyse with AI
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#145B43] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              <FileText aria-hidden="true" size={18} />
              Submit Grievance
            </button>
                  <AIAnalysisCard/>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SubmitGrievanceForm
