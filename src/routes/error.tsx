import sleepyCat from "../assets/cat-sleepy.gif"

export default function ErrorPage() {
  return (
    <div className="h-full p-4 flex flex-col justify-center items-center space-y-2 bg-[#232946]">
      <div className="flex flex-col items-center justify-between mb-4 font-bold text-[#FFFFFE]">
        <p className="text-3xl  mb-4">404</p>
        <p className="text-xl">Huh? What are you doing here?</p>
      </div>

      <img
        className="max-w-[512px] w-4/5 h-auto rounded-xl border-2 border-[#eebbc3]"
        alt="Gif of a disturbed cat"
        src={sleepyCat}
      />
      <p className="text-[#b8c1ec] max-w-2/5 w-4/6 text-center text-sm">
        You&apos;ve got the wrong link, I&apos;m going back to sleep...
      </p>
    </div>
  )
}
