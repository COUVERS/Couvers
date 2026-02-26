import CustomButton from './Reusable-Components/CustomButton'
import Navigation from './components/Navigation'
import CertificateTest from './pages/CertificateTest'
import Quiz from './components/Quiz'
import { quizQuestions } from './services/quizData'

function App() {

   const currentQuestion = quizQuestions[0]

 return (
    <div style={{ display: "flex" }}>

      <Navigation />

      <div style={{ flex: 1, padding: "40px" }}>

        <h1>This is a set up</h1>

        <CustomButton />

        <Quiz
          question={currentQuestion}
          questionNumber={1}
          totalQuestions={quizQuestions.length}
        />

        <CertificateTest />

      </div>

    </div>
  )
}

export default App
