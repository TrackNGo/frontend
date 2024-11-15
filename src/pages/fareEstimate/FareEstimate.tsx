import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import BtnSet from "../../components/btnSet/BtnSet"
import Headline from "../../components/headline/Headline"
import SelectBox from "../../components/selectBox/SelectBox"

const btnSet = [
    {
        title: 'find on locations',
        onClick: () => alert('find on locations btn clicked'),
    },
    {
        title: 'find on route number',
        onClick: () => alert('find on route number btn clicked'),
    },
    {
        title: 'view schedule',
        onClick: () => alert('view schedule btn clicked'),
    }
]

const FareEstimate = () => {
    return (
        <div className="px-2">
            <Headline title={"fare estimate your bus"} />

            <div className="mb-2">
                <div className="mb-1">
                    <SelectBox
                        title={"start location"}
                        name={"startLocation"}
                    />
                </div>
                <div className="mb-1">
                    <SelectBox
                        title={"end location"}
                        name={"endLocation"}
                    />
                </div>
            </div>

            <div className="py-2">
                <PrimaryBtn
                    title={"search fare estimate"}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />
                <BtnSet btnSet={btnSet} />
            </div>
        </div>
    )
}

export default FareEstimate 