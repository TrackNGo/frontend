import { useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"

const Login = () => {
  const [error, setError] = useState<string>("")

  return (
    <div>
      <div className="container mx-auto mb-10 md:mt-5">
        <div className="flex items-center justify-center mb-6">
          <form className="border border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-6 shadow-lg">
            <div className="text-left md:text-center">
              <h1 className="capitalize text-3xl font-semibold mb-2">login your account</h1>
            </div>
            <div>
              <TextBox title={"username"} type={"text"} placeholder={"Username"} name={"username"} />
              <div className="text-slate-500 text-sm capitalize">required</div>
            </div>

            <div className="mt-2">
              <TextBox title={"password"} type={"password"} placeholder={"Password"} name={"password"} />
              <div className="text-slate-500 text-sm capitalize">required</div>
            </div>

            {/*username or password error set*/
              error && <div>{error}</div>
            }

            <div className="mt-4">
              <PrimaryBtn type={"submit"} title={"login"} classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"} />
            </div>

            <div className="mt-3">
              <PrimaryBtn type={"button"} title={"forgot password"} classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-950 text-black'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
