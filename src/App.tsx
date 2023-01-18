import Layout from "./utils/Layout"
import { Link } from "react-router-dom"
import video from "./assets/output.webm"

function App() {
  return (
    <>
      <Layout page="index">
        <div className="flex flex-col justify-center  items-center text-5xl h-full text-headline">
          <h1 className="font-medium mt-8">Second Sight</h1>
          <h2 className="font-extralight text-center italic text-4xl">
            a diary for messy thoughts
          </h2>
          <p className="text-xl mt-8 w-3/4 text-center text-paragraph">
            Pour your heart out to a mystical diary who replies with insights
            and the important points of your writing
          </p>
          <Link to="/login">
            <button className="font-medium rounded-full mt-12 px-4 py-1 bg-button text-xl text-buttontext">
              Get Started
            </button>
          </Link>
          <div className="flex-grow w- flex items-center justify-center  ">
            <video
              width="960"
              height="540"
              className="border-2 rounded-xl border-button"
              autoPlay
              muted
              playsInline
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
