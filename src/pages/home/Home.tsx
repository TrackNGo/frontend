import { useState } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
import BtnSet from "../../components/btnSet/BtnSet";
import Headline from "../../components/headline/Headline";
import SelectBox from "../../components/selectBox/SelectBox";
import { useNavigate } from "react-router-dom";

const options = [
    "Colombo",
    "Polonnoruwa",
    "Kurunagala",
    "Vavuniya"
];

const Home = () => {
    const [locations, setLocations] = useState<{ startLocation: string | null, endLocation: string | null }>({
        startLocation: null,
        endLocation: null
    });

    const navigate = useNavigate();

    const btnSet = [
        {
            title: 'find on route number',
            onClick: () => navigate('/busroute'),
        },
        // {
        //     title: 'view schedule',
        //     onClick: () => navigate('/schedule'),
        // },
        {
            title: 'estimate fare',
            onClick: () => navigate('/fareestimate'),
        }
    ];

    const handleLocationChange = (key: 'startLocation' | 'endLocation', value: string) => {
        setLocations(prev => ({ ...prev, [key]: value }));
    };

    // Filter options for endLocation to exclude the selected startLocation
    const filteredEndLocationOptions = options.filter(option => option !== locations.startLocation);

    return (
        <div className="px-2">
            <Headline title={"track your bus on locations"} />

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
                        options={filteredEndLocationOptions}
                        onChange={(value) => handleLocationChange('endLocation', value)}
                    />
                </div>
            </div>

            <div className="py-2">
                <PrimaryBtn
                    title={"search bus"}
                    onClick={() => navigate(`/bustracking/routes/search/${locations.startLocation}/${locations.endLocation}`)}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />
                <BtnSet btnSet={btnSet} />
            </div>
        </div>
    );
};

export default Home;
