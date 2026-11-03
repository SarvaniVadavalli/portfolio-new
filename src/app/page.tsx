import Background from "@/components/Background";
import Header from "@/components/Header";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main>
        <Landing />

        {/* Section anchors for Phase 2 navigation testing and scroll verification */}
        <section id="about" className="min-h-[50vh] border-t border-line/40">
          <h2>About me</h2>
          <p className="lead">Section 01 placeholder — awaiting Phase 3.</p>
        </section>

        <section id="skills" className="min-h-[50vh] border-t border-line/40">
          <h2>What I work with</h2>
          <p className="lead">Section 02 placeholder — awaiting Phase 3.</p>
        </section>

        <section id="projects" className="min-h-[50vh] border-t border-line/40">
          <h2>Things I’ve built</h2>
          <p className="lead">Section 03 placeholder — awaiting Phase 3.</p>
        </section>

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
