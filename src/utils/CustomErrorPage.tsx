import sleepyCat from "../assets/cat-sleepy.gif"

export default function CustomErrorPage({
  code,
  error,
}: {
  code: string
  error: string
}) {
  return (
    <div className="h-full p-4 flex flex-col justify-center items-center space-y-2 bg-background">
      <div className="flex flex-col items-center justify-between mb-4 font-bold text-headline">
        <p className="text-3xl  mb-4">{code}</p>
        <p className="text-xl">{error}</p>
      </div>

      <img
        className="max-w-[512px] w-4/5 h-auto rounded-xl border-2 border-button"
        alt="Gif of a disturbed cat"
        src={sleepyCat}
      />
      <p className="text-paragraph max-w-2/5 w-4/6 text-center text-sm">
        I&apos;m going back to sleep...
      </p>
    </div>
  )
}
