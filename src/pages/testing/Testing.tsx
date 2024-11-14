import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import SecondaryBtn from "../../components/btn/secondaryBtn/SecondaryBtn"
import BusDetails from "../../components/busDetails/BusDetails"
import FareDetails from "../../components/fareDetails/FareDetails"
import LocationPointBox from "../../components/locationPointBox/LocationPointBox"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"

const Testing = () => {
  return (
    <div className='p-1 px-2'>
      <h1 className="text-3xl font-bold">
        TRackNGo Web_App
      </h1>
      <div className='mb-3'>
        <h1 className='text-3xl mb-3'>TrackingApp</h1>
      </div>
      <div className='mb-3'>
        <PrimaryBtn title='Login' classes={'bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-white text-white'} />
      </div>
      <div className='mb-3'>
        <PrimaryBtn title='Forgot Password' classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-black text-black'} />
      </div>
      <div className='mb-3'>
        <TextBox title='username' type='text' placeholder='Enter your username' name={'username'} />
      </div>
      <div className='mb-3'>
        <TextBox title='Password' type='password' placeholder='Enter your password' name={'password'} />
      </div>
      <div className='mb-3'>
        <SelectBox title={'Start'} placeholder='Enter Start Location' options={['john', 'rock', 'hulk']} name={'startLocation'} />
      </div>
      <div className='mb-3'>
        <SecondaryBtn title='Submit Report' classes='border-black bg-white text-black hover:bg-black hover:text-white hover:border-white' />
      </div>
      <div className='mb-3'>
        <SecondaryBtn title='Submit Report' classes='border-white bg-black text-white hover:bg-white hover:text-black hover:border-black' />
      </div>
      <div className='mb-3'>
        <BusDetails busNumber={'ND-4588'} startLocation={'Colombo'} endLocation={'Kandy'} routeNumber={'1'} fareEstimate={'1250'} status={true} />
      </div>
      <div className='mb-3'>
        <BusDetails busNumber={'ND-4588'} startLocation={'Colombo'} endLocation={'Kandy'} routeNumber={'1'} fareEstimate={'1250'} status={false} />
      </div>
      <div className='mb-3'>
        <FareDetails type={'normal'} price={'800'} />
      </div>
      <div className='mb-3'>
        <FareDetails type={'semi luxury'} price={'1400'} />
      </div>
      <div className='mb-3'>
        <FareDetails type={'luxury'} price={'1900'} />
      </div>
      <div className='mb-3' onClick={() => { console.log('open') }}>
        <LocationPointBox location={'colombo'} />
      </div>
      <div className='mb-3'>
        <LocationPointBox location={'galle'} />
      </div>
      <div className='mb-3'>

      </div>
    </div>
  )
}

export default Testing
