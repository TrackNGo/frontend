import { useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import BtnSet from "../../components/btnSet/BtnSet"
import Headline from "../../components/headline/Headline"
import TextBox from "../../components/textBox/TextBox"
import { useNavigate } from "react-router-dom"


const BusRoute = () => {
    const [busRouteNumber, setBusRouteNumber] = useState<string>("")
    const navigate=useNavigate()

    const btnSet = [
        {
            title: 'find on locations',
            onClick: () => navigate('/home'),
        },
        {
            title: 'Bus Time Table',
            onClick: () => navigate('/timetable'),
        },
        {
            title: 'estimate fare',
            onClick: () => navigate('/fareestimate'),
        }
    ]

    const handleBusRouteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusRouteNumber(event.target.value)
    }

    return (
        <div className="px-2">
            <Headline title={"track your bus on route number"} />

            <div className="mt-1 mb-2">
                <div className="mb-1">
                    <TextBox
                        title={"route number"}
                        name={"busRouteNumber"}
                        type={"text"}
                        placeholder={"Enter Bus Route Number"}
                        value={busRouteNumber}
                        onChange={handleBusRouteChange}
                    />
                </div>
            </div>

            <div className="py-2">
                <PrimaryBtn
                    title={"search bus"}
                    onClick={() => console.log("Bus Route Number:", busRouteNumber)}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />
                <BtnSet btnSet={btnSet} />
            </div>
        </div>
    )
}

export default BusRoute
