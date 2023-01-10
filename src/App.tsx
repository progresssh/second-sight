import Layout from "./utils/Layout"
import { Link } from "react-router-dom"
import video from "./assets/output.webm"

function App() {
  return (
    <>
      <Layout page="index">
        <div className="flex flex-col justify-center  items-center text-5xl h-full text-[#FFFFFE]">
          <h1 className="font-medium mt-8">Second Sight</h1>
          <h2 className="font-extralight italic text-4xl">
            an insightful diary
          </h2>
          <p className="text-xl mt-8 w-3/4 text-center text-[#B8C1EC]">
            A mystical friend inhabits your diary, providing you with clarity
            and insight...
          </p>
          <Link to="/login">
            <button className="font-medium rounded-full mt-12 px-4 py-1 bg-[#EEBBC3] text-xl text-[#232946]">
              Get Started
            </button>
          </Link>
          <div className="flex-grow w- flex items-center justify-center  ">
            <video
              width="960"
              height="540"
              className="border-2 rounded-xl border-[#EEBBC3]"
              autoPlay
              muted
              loop
            >
              <source src={video} type="video/webm" />
            </video>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default App
