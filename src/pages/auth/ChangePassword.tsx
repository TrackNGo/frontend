import { useState, ChangeEvent } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
import TextBox from "../../components/textBox/TextBox";
import Headline from "../../components/headline/Headline";

const ChangePassword = () => {
    const [error, setError] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({})
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
        setError((prev) => ({ ...prev, [name]: "" }))
    }

    async function submit(event: any) {
        event.preventDefault()

        const newError: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {}

        if (!credentials.currentPassword) {
            newError.currentPassword = "Current Password Required!"
        }
        if (!credentials.newPassword) {
            newError.newPassword = "New Password Required!"
        }
        if (!credentials.confirmPassword) {
            newError.confirmPassword = "Confirm Password Required!"
        }

        if (credentials.newPassword && credentials.confirmPassword && credentials.newPassword !== credentials.confirmPassword) {
            newError.confirmPassword = "Password not match";
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
        } else {
            setError({});
            console.log("Password successfully changed:", credentials.newPassword);
            //backend connection
        }

    }

    return (
        <div className="px-2 sm:px-6 lg:px-8">
            <div className="container mx-auto my-10">
                <div className="flex items-center justify-center mb-8">
                    <form className="w-full max-w-lg rounded-xl bg-white sm:p-6 sm:border sm:shadow-lg sm:border-slate-200">
                        <Headline title={"Change Your Password"} />

                        <div className="mt-4">
                            <TextBox
                                onChange={handleInputChange}
                                value={credentials.currentPassword}
                                title={"Current Password"}
                                type={"password"}
                                placeholder={"Current Password"}
                                name={"currentPassword"}
                            />
                            <div
                                className={`text-sm capitalize mt-1 ${error.currentPassword ? "text-red-600" : "text-slate-400"
                                    }`}
                            >
                                {error.currentPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <TextBox
                                onChange={handleInputChange}
                                value={credentials.newPassword}
                                title={"New Password"}
                                type={"password"}
                                placeholder={"New Password"}
                                name={"newPassword"}
                            />
                            <div
                                className={`text-sm capitalize mt-1 ${error.newPassword ? "text-red-600" : "text-slate-400"
                                    }`}
                            >
                                {error.newPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <TextBox
                                onChange={handleInputChange}
                                value={credentials.confirmPassword}
                                title={"Confirm Password"}
                                type={"password"}
                                placeholder={"Confirm Password"}
                                name={"confirmPassword"}
                            />
                            <div
                                className={`text-sm capitalize mt-1 ${error.confirmPassword ? "text-red-600" : "text-slate-400"
                                    }`}
                            >
                                {error.confirmPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-6">
                            <PrimaryBtn
                                type={"button"}
                                onClick={submit}
                                title={"Change Password"}
                                classes={
                                    "bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white w-full"
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <PrimaryBtn
                                type={"button"}
                                onClick={() => {
                                    console.log(credentials)
                                }}
                                title={"Forgot Password"}
                                classes={
                                    "bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black w-full"
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <PrimaryBtn
                                type={"button"}
                                onClick={() => {
                                    console.log(credentials)
                                }}
                                title={"Cancel"}
                                classes={
                                    "bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black w-full"
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
