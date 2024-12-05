interface BusStatusProps {
    status: boolean | undefined
}

const BusStatus = ({ status }: BusStatusProps) => {
    return (
        <div className="relative flex items-center">
            <span className="absolute flex h-3 w-3">
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status ? "bg-emerald-400 opacity-75" : "bg-red-500 opacity-75"
                        }`}
                ></span>
                <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${status ? "bg-emerald-400" : "bg-red-500"}`}
                ></span>
            </span>
            <span className={`ml-5 ${status ? "text-green-600" : "text-red-600"} capitalize`}>
                {status ? "Active on road" : "Not active on road"}
            </span>
        </div>
    )
}

export default BusStatus
