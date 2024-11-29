import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"

const Dashboard = () => {
  return (
    <div className="px-2">
      <div className="mt-2">
        <PrimaryBtn
          type={"button"}
          title={"Start"}
          classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
        />
      </div>
      <div className="mt-2">
        <PrimaryBtn
          type={"button"}
          title={"End"}
          classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
        />
      </div>
      <div className="mt-2">
        <PrimaryBtn
          type={"button"}
          title={"Alert"}
          classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
        />
      </div>
    </div>
  )
}

export default Dashboard