import { useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import BtnSet from "../../components/btnSet/BtnSet"
import Headline from "../../components/headline/Headline"
import SelectBox from "../../components/selectBox/SelectBox"
import { useNavigate } from "react-router-dom"

const options = [
    "Colombo",
    "Jaffna",
    "kalutara",
    "Polonnoruwa",
    "Kurunagala"
]

const TimeTable = () => {
    const [locations, setLocations] = useState<{ startLocation: string | null, endLocation: string | null }>({
        startLocation: null,
        endLocation: null
    })

    const navigate = useNavigate()

    const btnSet = [
        {
            title: 'find on route number',
            onClick: () => navigate('/busroute'),
        },
        {
            title: 'find on locations',
            onClick: () => navigate('/home'),
        },
        {
            title: 'estimate fare',
            onClick: () => navigate('/fareestimate'),
        }
    ]

    const handleLocationChange = (key: 'startLocation' | 'endLocation', value: string) => {
        setLocations(prev => ({ ...prev, [key]: value }))
    }

    function submissionHandel() {
        if(locations.startLocation && locations.endLocation) {
            navigate(`/timetable/views/${locations.startLocation}/${locations.endLocation}`)
        }
    }

    return (
        <div className="px-2">
            <Headline title={"Bus Time Table"} />

            <div className="mb-2">
                <div className="mb-1">
                    <SelectBox
                        title={"start location"}
                        name={"startLocation"}
                        placeholder="Select Starting Location"
                        options={options}
                        onChange={(value) => handleLocationChange('startLocation', value)}
                    />
                </div>
                <div className="mb-1">
                    <SelectBox
                        title={"end location"}
                        name={"endLocation"}
                        placeholder="Select Ending Location"
                        options={options}
                        onChange={(value) => handleLocationChange('endLocation', value)}
                    />
                </div>
            </div>

            <div className="py-2">
                <PrimaryBtn
                    title={"search bus time table"}
                    onClick={() => submissionHandel()}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />

                <div className="my-2 w-full flex justify-center">
                    <button className="w-full px-5 py-3 text-white bg-blue-500 rounded-lg text-md font-medium shadow-md 
               hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out active:scale-95"
                        onClick={() => navigate('/timetable/views/null/null')}
                    >
                        View All Bus Timetables
                    </button>
                </div>

                <BtnSet btnSet={btnSet} />
            </div>
        </div>
    )
}

export default TimeTable
