import { useState } from "react"
import Menu from "./components/menu/Menu"
import Quiz from "./components/quiz/Quiz"


function App() {

  const [apiUrl, setApiUrl] = useState("");

  function handleUrlGenerated(url) {
    setApiUrl(url);
  }

  return (
    <>
      <div>
        {
          apiUrl
            ? <Quiz url={apiUrl} />
            : <Menu onUrlGenerated={handleUrlGenerated} />
        }
      </div>

    </>
  )
}

export default App
