import { BiFont, BiQuestionMark, BiShow, BiX } from "react-icons/bi";

export default function PlayCollection() {
  return (
    <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center">
      <p className="font-bold">1/10</p>
      <h1 className="font-black text-8xl">to make</h1>
      <div className=" inputWithEmoji " tabIndex={1}>
        <input
          name="wordTwo"
          type="text"
          className="noInput"
          placeholder="What is it?"
        />
      </div>
      <button type="submit" className="px-4 py-1">
        I'm sure!
      </button>
    </div>
  );
}
