import SecondaryBtn from "../secondaryBtn/SecondaryBtn"

type Props = {
    filterStatus: string
    setFilterStatus: (status: "all" | "await" | "onroad") => void
}

const FilterButtons: React.FC<Props> = ({ filterStatus, setFilterStatus }) => {
    const filters = ["all", "await", "onroad"] as const

    return (
        <div className="flex space-x-2">
            {filters.map((filter) => (
                <SecondaryBtn
                    key={filter}
                    title={filter}
                    onClick={() => setFilterStatus(filter)}
                    classes={`border-black hover:bg-black hover:text-white hover:border-white ${
                        filterStatus === filter ? "bg-black text-white" : "bg-white text-black"
                    }`}
                />
            ))}
        </div>
    )
}

export default FilterButtons
