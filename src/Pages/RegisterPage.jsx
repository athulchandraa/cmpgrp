import { useState } from 'react'
import { Eye, EyeOff, Landmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../API/apiService'
import toast from 'react-hot-toast'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState('')
  const[userData,setUSerdata]=useState({
    name:"",email:"",mobile:"",password:""
  })

  const navigate=useNavigate()

  const handleSubmit=async(event)=> {
    event.preventDefault()

    // Check that every field is filled and that both password entries match.
    const newErrors = {}
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.'
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your mobile number.'
    }
    if (!password) {
      newErrors.password = 'Please create a password.'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'The passwords do not match.'
    }else if(password==confirmPassword){
    }
    setErrors(newErrors)
    setFormMessage('')

    if (Object.keys(newErrors).length === 0) {
        const regData={
          name:fullName,email:email,mobile:mobileNumber,password:password
        }
        handleRegistration(regData)
    }    

  }

  const handleRegistration=async(regData)=>{
    console.log(regData);
    try{
      const response=await registerAPI(regData)
    if(response.status==201){
      toast.success(`${response.data.message}`)
      setTimeout(()=>{
        navigate('/login')
      },1500)
    }
    }catch(err){
      console.log(err);
      toast.error("Registration Failed!")
    }
    }
  

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F5] px-4 py-10">
      <section className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-[#145B43]/10 sm:p-8">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#145B43]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#145B43] text-white">
            <Landmark aria-hidden="true" size={25} />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight text-[#145B43]">
              CM Kerala
            </span>
            <span className="block text-xs text-slate-500">
              Public Grievance Portal
            </span>
          </span>
        </Link>

        <div className="mt-7 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Register as a citizen to use the grievance portal.
          </p>
        </div>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="full-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              id="full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value)
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  fullName: '',
                }))
                setFormMessage('')
              }}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'full-name-error' : undefined}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p id="full-name-error" className="mt-1 text-sm text-red-700">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  email: '',
                }))
                setFormMessage('')
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-700">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="mobile-number"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Mobile Number
            </label>
            <input
              id="mobile-number"
              name="mobileNumber"
              type="tel"
              autoComplete="tel"
              value={mobileNumber}
              onChange={(event) => {
                setMobileNumber(event.target.value)
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  mobileNumber: '',
                }))
                setFormMessage('')
              }}
              aria-invalid={Boolean(errors.mobileNumber)}
              aria-describedby={
                errors.mobileNumber ? 'mobile-number-error' : undefined
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && (
              <p id="mobile-number-error" className="mt-1 text-sm text-red-700">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrors((previousErrors) => ({
                    ...previousErrors,
                    password: '',
                    confirmPassword: '',
                  }))
                  setFormMessage('')
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-slate-500 hover:text-[#145B43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#145B43]"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={19} />
                ) : (
                  <Eye aria-hidden="true" size={19} />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-700">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  setErrors((previousErrors) => ({
                    ...previousErrors,
                    confirmPassword: '',
                  }))
                  setFormMessage('')
                }}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? 'confirm-password-error' : undefined
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirmation password'
                    : 'Show confirmation password'
                }
                className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-slate-500 hover:text-[#145B43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#145B43]"
              >
                {showConfirmPassword ? (
                  <EyeOff aria-hidden="true" size={19} />
                ) : (
                  <Eye aria-hidden="true" size={19} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-1 text-sm text-red-700"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {formMessage && (
            <p role="status" className="text-sm text-slate-600">
              {formMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[#145B43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#104a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#145B43] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
