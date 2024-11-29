interface RouteStopListProps {
    stops: string[]
}

const RouteStopList = ({ stops }: RouteStopListProps) => {
    return (
        <div className="mt-4">
            <div className="capitalize text-lg font-medium">details</div>
            <div className="mb-2 text-xs text-slate-500">Based on selected route on bus</div>
            {stops.length ? (
                stops.map((stop, index) => (
                    <div
                        key={index}
                        className="w-full capitalize text-[12px] text-left pl-4 p-1 my-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
                    >
                        {stop}
                    </div>
                ))
            ) : (
                <div className="w-full text-center text-sm text-gray-500 mt-2">
                    No route stops available.
                </div>
            )}
        </div>
    )
}

export default RouteStopList
