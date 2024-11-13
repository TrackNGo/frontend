import TextBoxType from "../../types/input/textBox/TextBoxType"

const TextBox = (input: TextBoxType) => {
    return (
        <>
<div className="w-full">
      {input.title && <label className="capitalize text-md font-medium text-gray-700">{input.title}</label>}
      <input
        type={input.type}
        placeholder={input.placeholder}
        name={input.name}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
        required
    />
    </div>
        </>
    )
}

export default TextBox