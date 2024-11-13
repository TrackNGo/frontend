import SecondaryBtnType from "../../../types/btn/secondaryBtn/SecondaryBtnType"

const SecondaryBtn = (btn:SecondaryBtnType) => {
    return (
        <button className={`${btn.classes}`+" flex text-xs items-center border rounded-md px-2 py-1 transition"}>
            <span>{btn.title}</span>
            <span className="ml-2">&gt;</span>
        </button>
    )
}

export default SecondaryBtn