import BtnSetTypes from '../../types/btnSet/BtnSetTypes'
import PrimaryBtn from '../btn/primaryBtn/PrimaryBtn'

interface BtnSetProps {
    btnSet: BtnSetTypes[]
  }

  const BtnSet = ({ btnSet }: BtnSetProps) => {
    return (
      <div className="py-2">
        {btnSet.map((btn, index) => (
          <div key={index} className="mt-2">
            <PrimaryBtn
              type="button"
              title={btn.title}
              onClick={btn.onClick}
              classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black'}
            />
          </div>
        ))}
      </div>
    )
  }

export default BtnSet