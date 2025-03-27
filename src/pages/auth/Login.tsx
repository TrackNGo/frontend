import { ChangeEvent, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"
import SelectBox from "../../components/selectBox/SelectBox"
import Headline from "../../components/headline/Headline"
import baseUrl from "../../common/baseBackendUrl"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState<{ credentialsUsername?: string; password?: string; accType?: string }>({})
  const [credentials, setCredentials] = useState<{ credentialsUsername: string; password: string; accType: string }>({
    credentialsUsername: "",
    password: "",
    accType: "General",
  })

  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
    setError((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (value: string) => {
    setCredentials((prev) => ({
      ...prev,
      accType: value
    }))
    setError((prev) => ({ ...prev, accType: "" }))
  }

  async function submit(event: any) {
    event.preventDefault()
    const newError: { credentialsUsername?: string; password?: string; accType?: string } = {}

    if (!credentials.credentialsUsername) {
      newError.credentialsUsername = "Username Required!"
    }
    if (!credentials.password) {
      newError.password = "Password Required!"
    }
    if (!credentials.accType) {
      newError.accType = "Account Type Required!"
    }

    if (Object.keys(newError).length > 0) {
      setError(newError)
    } else {
      setError({})
      const data = {
        loginIdentifier: credentials.credentialsUsername,
        password: credentials.password,
        accType: credentials.accType
      }
      console.log("Logging in with data:", data)

      if (data) {
        const response = await axios.post(`${baseUrl.adminBackend}api-user/login`, data);
        if(response.data) {
          login(response.data.token)
          navigate(`/dashboard/${response.data.user.busNumber}`)
        }
      }
      // backend connection
    }
  }

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <div className="container mx-auto my-10">
        <div className="flex items-center justify-center mb-8">
          <form className="w-full max-w-lg rounded-xl bg-white sm:p-6 sm:border sm:shadow-lg sm:border-slate-200">
            <Headline title={"Login to Your Account"} />

            <div className="mt-4">
              <TextBox
                onChange={handleInputChange}
                value={credentials.credentialsUsername}
                title={"Bus Number"}
                type={"text"}
                placeholder={"Enter Bus Number"}
                name={"credentialsUsername"}
              />
              <div
                className={`text-sm capitalize mt-1 ${error.credentialsUsername ? "text-red-600" : "text-slate-400"
                  }`}
              >
                {error.credentialsUsername || "required"}
              </div>
            </div>

            <div className="mt-4">
              <SelectBox
                title="Account Type"
                name="accType"
                value={credentials.accType}
                onChange={handleSelectChange}
                options={["General"]}
                placeholder="Select Account Type"
                disabled={true}
              />
            </div>

            <div className="mt-4">
              <TextBox
                onChange={handleInputChange}
                value={credentials.password}
                title={"Password"}
                type={"password"}
                placeholder={"Enter Password"}
                name={"password"}
              />
              <div
                className={`text-sm capitalize mt-1 ${error.password ? "text-red-600" : "text-slate-400"
                  }`}
              >
                {error.password || "required"}
              </div>
            </div>

            <div className="mt-6">
              <PrimaryBtn
                type={"button"}
                onClick={submit}
                title={"Login"}
                classes={
                  "bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border border-solid border-slate-900 text-white w-full"
                }
              />
            </div>

            <div className="mt-4">
              <PrimaryBtn
                type={"button"}
                onClick={() => console.log(credentials)}
                title={"Forgot Password"}
                classes={
                  "bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border border-solid border-black text-black w-full"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
