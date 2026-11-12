import AboutSection from '../components/AboutSection'
import DepartmentsSection from '../components/DepartmentsSection'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import HowItWorksSection from '../components/HowItWorksSection'
import LatestUpdatesSection from '../components/LatestUpdatesSection'
import Navbar from '../components/Navbar'
import StatisticsSection from '../components/StatisticsSection'

function HomePage() {
  return (
    <>
      <Navbar />
      <section id='Hero'><HeroSection /></section>
      <section id='stat'><StatisticsSection /></section>
      <section id='department'><DepartmentsSection /></section>
      <section id='how'><HowItWorksSection /></section>
      <section id='about'><AboutSection /></section>
      <section id='latest'><LatestUpdatesSection /></section>
      <section id='footer'><Footer /></section>
    </>
  )
}

export default HomePage
