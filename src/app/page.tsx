import Background from "@/components/Background";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import ArcadeBanner from "@/components/ArcadeBanner";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main>
        <Landing />

        {/* Pac-Man Arcade Strip */}
        <ArcadeBanner />

        {/* Section 01: About */}
        <About />

        {/* Section 02: Skills */}
        <Skills />

        {/* Section 03: Projects */}
        <Projects />

        {/* Section anchors for navigation testing and scroll verification */}
        <section id="stats" className="min-h-[50vh] border-t border-line/40">
          <h2>GitHub and LeetCode</h2>
          <p className="lead">Section 04 placeholder — awaiting Phase 4.</p>
        </section>

        <section id="contact" className="min-h-[50vh] border-t border-line/40">
          <h2>Let’s talk</h2>
          <p className="lead">Section 05 placeholder — awaiting Phase 5.</p>
        </section>
      </main>
    </>
  );
}
