import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import FareDetails from "../../components/fareDetails/FareDetails"
import Headline from "../../components/headline/Headline"
import LocationPointBox from "../../components/locationPointBox/LocationPointBox"

const FareEstimateDetails = () => {
    return (
        <div className="px-2">
            <Headline title={"fare estimate"} />

            <div>
                {/* Placeholder for map */}
                map
            </div>

            <div className="mt-2">

            </div>

            <div className="mt-4">
                <div>
                    <div className="capitalize text-md font-medium">starting point</div>
                    <LocationPointBox location={"colombo"} />
                    <div className="mb-2 text-xs text-slate-500">Based on selected location</div>
                </div>

                <div className="mt-1">
                    <div className="capitalize text-md font-medium">ending point</div>
                    <LocationPointBox location={"jaffna"} />
                    <div className="mb-2 text-xs text-slate-500">Based on selected location</div>
                </div>

                <div className="mt-1">
                    <div className="capitalize text-md font-medium">route number</div>
                    <LocationPointBox location={"15"} />
                    <div className="mb-2 text-xs text-slate-500">Based on bus route number</div>
                </div>
            </div>

            <div>
                <div className="mt-4 capitalize text-lg font-medium">
                    fare details
                </div>

                <div className="mb-2 text-xs text-slate-500">
                    Based on selected route
                </div>

                <div className="mb-2">
                    <div className="my-2">
                        <FareDetails
                            busType={"normal"}
                            estimatedFare={"500"}
                        />
                    </div>

                    <div className="my-2">
                        <FareDetails
                            busType={"semi-luxury"}
                            estimatedFare={"750"}
                        />
                    </div>

                    <div className="my-2">
                        <FareDetails
                            busType={"luxury"}
                            estimatedFare={"1000"}
                        />
                    </div>
                </div>
            </div>

            <div className="py-4">
                <div className="mb-3">
                    <PrimaryBtn
                        title={"cancel"}
                        type={"button"}
                        onClick={() => { }}
                        classes={"bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"}
                    />
                </div>

                <div className="mt-2">
                    <PrimaryBtn
                        title={"go home"}
                        type={"button"}
                        onClick={() => { }}
                        classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"}
                    />
                </div>
            </div>
        </div>
    )
}

export default FareEstimateDetails
