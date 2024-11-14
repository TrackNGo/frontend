import { ChangeEvent, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"

const Login = () => {
  const [error, setError] = useState<string>("")
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: ""
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
    setError("")
  }
  async function submit(event: any) {
    event.preventDefault()
    if (credentials.username === "" && credentials.password === "") {
      setError("Username and Password Required!")
    } else if (credentials.username === "") {
      setError("Username Required!")
    } else if (credentials.password === "") {
      setError("Password Required!")
    }
    const data = {
      username: credentials.username,
      password: credentials.password
    }
    console.log(data)
  }

  return (
    <div>
      <div className="container mx-auto mb-10 md:mt-5">
        <div className="flex items-center justify-center mb-6">
          <form className="md:border md:border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-10 md:pt-6 md:shadow-lg">
            <div className="text-left md:text-center">
              <h1 className="capitalize text-3xl font-semibold mb-2">login your account</h1>
            </div>
            <div>
              <TextBox onChange={handleInputChange} value={credentials.username} title={"username"} type={"text"} placeholder={"Username"} name={"username"} />
              <div className={`text-sm capitalize ${credentials.username === "" && error ? "text-red-600" : "text-slate-500"}`}>required</div>
            </div>

            <div className="mt-2">
              <TextBox onChange={handleInputChange} value={credentials.password} title={"password"} type={"password"} placeholder={"Password"} name={"password"} />
              <div className={`text-sm capitalize ${credentials.password === "" && error ? "text-red-600" : "text-slate-500"}`}>required</div>
            </div>

            <div className="mt-4">
              <PrimaryBtn type={"button"} onClick={submit} title={"login"} classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"} />
            </div>

            <div className="mt-3">
              <PrimaryBtn type={"button"} onClick={() => { console.log(credentials) }} title={"forgot password"} classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-950 text-black'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
