import { useState, ChangeEvent } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
import TextBox from "../../components/textBox/TextBox";

const ChangePassword = () => {
    const [error, setError] = useState<string>("")
    const [credentials, setCredentials] = useState<{ currentPassword: string; newPassword: string, confirmPassword: string }>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
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
        if (credentials.currentPassword === "" && credentials.newPassword === "" && credentials.confirmPassword === "") {
            setError("Username and Password Required!")
        } else if (credentials.currentPassword === "" && credentials.newPassword === "") {
            setError("Username Required!")
        } else if (credentials.newPassword === "" && credentials.confirmPassword === "") {
            setError("Username Required!")
        } else if (credentials.currentPassword === "" && credentials.confirmPassword === "") {
            setError("Username Required!")
        } else if (credentials.currentPassword === "") {
            setError("Username Required!")
        } else if (credentials.newPassword === "") {
            setError("Password Required!")
        } else if (credentials.confirmPassword === "") {
            setError("Password Required!")
        }
        const data = credentials.newPassword
        console.log(data)
    }

    return (
        <div>
            <div className="container mx-auto mb-10 md:mt-5">
                <div className="flex items-center justify-center mb-6">
                    <form className="md:border md:border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-10 md:pt-6 md:shadow-lg">
                        <div className="text-left md:text-center mb-8">
                            <h1 className="capitalize text-3xl font-semibold mb-2">change your password</h1>
                        </div>

                        <div className="mt-2">
                            <TextBox onChange={handleInputChange} value={credentials.currentPassword} title={"current password"} type={"password"} placeholder={"Password"} name={"currentPassword"} />
                            <div className={`text-sm capitalize ${credentials.currentPassword === "" && error ? "text-red-600" : "text-slate-400"}`}>required</div>
                        </div>

                        <div className="mt-2">
                            <TextBox onChange={handleInputChange} value={credentials.newPassword} title={"new password"} type={"password"} placeholder={"Password"} name={"newPassword"} />
                            <div className={`text-sm capitalize ${credentials.newPassword === "" && error ? "text-red-600" : "text-slate-400"}`}>required</div>
                        </div>

                        <div className="mt-2">
                            <TextBox onChange={handleInputChange} value={credentials.confirmPassword} title={"confirm password"} type={"password"} placeholder={"Password"} name={"confirmPassword"} />
                            <div className={`text-sm capitalize ${credentials.confirmPassword === "" && error ? "text-red-600" : "text-slate-400"}`}>required</div>
                        </div>

                        <div className="mt-4">
                            <PrimaryBtn type={"button"} onClick={submit} title={"login"} classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"} />
                        </div>

                        <div className="mt-3">
                            <PrimaryBtn type={"button"} onClick={() => { console.log(credentials) }} title={"forgot password"} classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-950 text-black'} />
                        </div>

                        <div className="mt-3">
                            <PrimaryBtn type={"button"} onClick={() => { console.log(credentials) }} title={"cancel"} classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-950 text-black'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
