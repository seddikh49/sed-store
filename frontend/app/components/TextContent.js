


export default function TextContent({ text }) {
  return (
    <>
      <div className="flex justify-center items-center gap-2 ">
        <h1 className="xl:text-5xl xm:text-3xl text-gray-600">{text}</h1>
        <p className=" h-1 w-10 font-bold bg-amber-500"></p>
      </div>
    </>
  )
}