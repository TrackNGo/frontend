import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import BtnSet from "../../components/btnSet/BtnSet"
import Headline from "../../components/headline/Headline"
import TextBox from "../../components/textBox/TextBox"

const btnSet = [
    {
        title: 'find on locations',
        onClick: () => alert('find on route number btn clicked'),
    },
    {
        title: 'view schedule',
        onClick: () => alert('view schedule btn clicked'),
    },
    {
        title: 'estimate fare',
        onClick: () => alert('view schedule btn clicked'),
    }
]

const BusRoute = () => {
    return (
        <div className="px-2">
            <Headline title={"track your bus on locations"} />

            <div className="mb-2">
                <div className="mb-1">
                    <TextBox
                        title={"route number"}
                        name={"busRouteNumber"}
                        type={"text"}
                        placeholder={"Enter Bus Route Number"}
                    />
                </div>
            </div>

            <div className="py-2">
                <PrimaryBtn
                    title={"search bus"}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />
                <BtnSet btnSet={btnSet} />
            </div>
        </div>
    )
}

export default BusRoute
