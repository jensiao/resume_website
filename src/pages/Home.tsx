import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Projects from '../sections/Projects'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </div>
  )
}
