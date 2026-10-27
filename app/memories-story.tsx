"use client";

import { useStoryReveal } from "./use-story-reveal";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./memories-story.css";

const chapters = [
  { label: "Friends", title: "Good days start with your people.", copy: "Find your friends, send a friendship request and stay connected. Bring your people into the plan with an invitation.", detail: "Find friends · Friendship requests · Invitations", scene: "The people", note: "A familiar face. A new possibility." },
  { label: "Shared Experiences", title: "Less someday. More being there.", copy: "Make a plan together, then make time for it. A coffee, a long walk, a whole afternoon — the best part happens when you show up.", detail: "Make a plan · Get together · Enjoy the moment", scene: "The moment", note: "An ordinary afternoon, made yours." },
  { label: "Diary & Memories", title: "The plan ends. The story stays.", copy: "Keep a timeline of completed plans, with up to five photos per memory. Edit or delete your memories, share with Friends, and let a favourite day inspire a similar plan.", detail: "Up to 5 photos · Edit or delete · Share with Friends", scene: "The memory", note: "A little reminder of a day well spent." },
];

export default function MemoriesStory() {
  const storyRoot = useStoryReveal();
  const [chapter, setChapter] = useState(0);
  const reducedMotion = useReducedMotion();
  const current = chapters[chapter];
  return (
    <section ref={storyRoot} className="pa-memories" id="friends-and-memories" aria-labelledby="pa-memory-title">
      <div className="pa-memory-inner">
        <header data-story-reveal data-story-delay="0" className="pa-memory-heading">
          <p className="pa-memory-kicker">Your people. Your days. Your story.</p>
          <h2 id="pa-memory-title">Plan together.<br />Live the moment.<br /><span>Keep the memory.</span></h2>
          <p>From the first invitation to the stories you come back to. Make room for more life, together.</p>
        </header>
        <div data-story-reveal data-story-delay="60" className="pa-memory-chapters" role="group" aria-label="Explore the story">
          {chapters.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={chapter === index} aria-controls="pa-memory-scene" onClick={() => setChapter(index)}>
              <span className="pa-memory-number">0{index + 1}</span><span>{item.label}</span><span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div data-story-reveal data-story-delay="120" className="pa-memory-layout">
          <div className="pa-memory-copy" aria-live="polite" aria-atomic="true">
            <p className="pa-memory-kicker">0{chapter + 1} / {current.label}</p>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <p className="pa-memory-detail">{current.detail}</p>
            {chapter === 2 && <p className="pa-memory-small">Memory creation is subject to your plan’s limits.</p>}
            <button className="pa-memory-next" type="button" onClick={() => setChapter((chapter + 1) % chapters.length)}>
              {chapter === 2 ? "Back to your people" : `Next: ${chapters[chapter + 1].label}`} <span aria-hidden="true">→</span>
            </button>
          </div>
          <div id="pa-memory-scene" className={`pa-memory-scene pa-memory-scene-${chapter}`}>
            <div className="pa-memory-demo-label">Illustrative story · Not an app screenshot</div>
            <motion.div key={chapter} className="pa-memory-art" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .7, ease: [.22, 1, .36, 1] }}>
              <p className="pa-memory-script">{current.scene}</p>
              {chapter === 0 ? <div className="pa-memory-people">
                <div className="pa-memory-portraits" aria-hidden="true"><img src="/avatar-woman-curly-01.png" alt="" width="120" height="120" loading="lazy" /><span>+</span><img src="/avatar-man-navy-01.png" alt="" width="120" height="120" loading="lazy" /></div>
                <div className="pa-memory-paper"><span className="pa-memory-kicker">A little hello</span><strong>“Free this afternoon?”</strong><p>One invitation. A day to look forward to.</p></div>
              </div> : <div className="pa-memory-photo">
                <img src="/hero-good-food.png" alt="Existing Planarela food illustration used to represent a shared afternoon" width="460" height="320" loading="lazy" />
                <div><span>{chapter === 1 ? "An afternoon together" : "A day worth keeping"}</span><span aria-hidden="true">{chapter === 1 ? "↗" : "♡"}</span></div>
              </div>}
              {chapter === 2 && <div className="pa-memory-timeline"><span aria-hidden="true">●</span><div><strong>In your Diary</strong><p>Completed plans, remembered your way.</p></div><span aria-hidden="true">♡</span></div>}
              <p className="pa-memory-note">{current.note}</p>
            </motion.div>
          </div>
        </div>
        <footer data-story-reveal data-story-delay="180" className="pa-memory-footer"><div><p className="pa-memory-kicker">There’s more life to make time for.</p><h3>Your next story starts with a plan.</h3></div><a href="#early-access">Get Early Access <span aria-hidden="true">↗</span></a></footer>
      </div>
    </section>
  );
}
