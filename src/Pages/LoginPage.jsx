import { useState } from 'react'
import { Eye, EyeOff, Landmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../API/apiService'
import toast from 'react-hot-toast'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState('')
  const[userData,setUSerdata]=useState({
    email:"",password:""
  })

  const navigate=useNavigate()
  

  const handleSubmit =async (event)=> {
    event.preventDefault()

    // Validate required fields before attempting to submit the demo form.
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.'
    }
    if (!password) {
      newErrors.password = 'Please enter your password.'
    }


    setErrors(newErrors)
    setFormMessage('')

    if(Object.keys(newErrors).length==0){
      const loginData={
        email:email,password:password
      }
      handleLogin(loginData)
    }


    
    // if (Object.keys(newErrors).length === 0) {
    //   setFormMessage('Login is not connected in this demo.')
    // }
  }

  const handleLogin=async(loginData)=>{
      try{
        const response=await loginAPI(loginData)
        if(response.status==200){
          const result=response.data
          console.log(result);
          sessionStorage.setItem("user",JSON.stringify(result.data))
          sessionStorage.setItem("token",result.token)

          toast.success("Login successfull")
          if(result.data.role=="CMO"){
            setTimeout(()=>{
              navigate('/cmo-dashboard')
            },1500)
          }else if(result.data.role=="user"){
            setTimeout(()=>{
              navigate('/dashboard')
            },1500)
          }
        }
        
      }catch(err){
        toast.error("Login Failed")
      }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F5] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-[#145B43]/10 sm:p-8">
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

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Citizen Login</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access your grievance portal account.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email address
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
              <p id="email-error" className="mt-1.5 text-sm text-red-700">
                {errors.email}
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrors((previousErrors) => ({
                    ...previousErrors,
                    password: '',
                  }))
                  setFormMessage('')
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145B43] focus:ring-2 focus:ring-[#145B43]/20"
                placeholder="Enter your password"
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
              <p id="password-error" className="mt-1.5 text-sm text-red-700">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-[#145B43] focus:ring-[#145B43]"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#145B43] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
            >
              Forgot Password?
            </Link>
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
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#145B43] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145B43]"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
