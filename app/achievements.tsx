"use client";

import { useState } from "react";
import "./achievements.css";

const milestones = [
  { count: 1, name: "First Move", icon: "first-move", story: "Every great story starts with showing up." },
  { count: 5, name: "Off We Go", icon: "off-we-go", story: "A little less deciding. A little more living." },
  { count: 10, name: "Plan Rookie", icon: "plan-rookie", story: "New experiences are becoming your thing." },
  { count: 25, name: "Plan Explorer", icon: "plan-explorer", story: "The familiar makes room for something new." },
  { count: 50, name: "Seasoned Planner", icon: "seasoned-planner", story: "Good plans. Better stories to tell." },
  { count: 100, name: "Plan Master", icon: "plan-master", story: "A hundred plans. A life full of moments." },
  { count: 250, name: "Life in Motion", icon: "life-in-motion", story: "Making time for life is second nature now." },
  { count: 500, name: "Planarela Legend", icon: "planarela-legend", story: "Five hundred plans lived. A story only you could write." },
];
const special = [
  ["Social Planner", "social-planner"], ["The Organizer", "the-organizer"],
  ["Globetrotter", "globetrotter"], ["Event Hunter", "event-hunter"],
  ["Memory Keeper", "memory-keeper"], ["Never Boring", "never-boring"],
  ["Weekend Warrior", "weekend-warrior"], ["Early Bird", "early-bird"], ["Night Owl", "night-owl"],
];

export default function Achievements() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const [previewed, setPreviewed] = useState(false);
  const level = milestones[selected];
  function select(index: number) {
    setSelected(index);
    setPreviewed(false);
    setReplay(0);
  }
  return (
    <section id="achievements" className="pa-achievements" aria-labelledby="pa-achievements-title">
      <div className="pa-ach-inner">
        <div className="pa-ach-heading">
          <p className="pa-ach-eyebrow">Achievements / A life well planned</p>
          <h2 id="pa-achievements-title">Make plans.<br />Make <span>your mark.</span></h2>
          <p className="pa-ach-lead">The places you discover. The people you bring together. The moments you make time for. Every completed plan is part of your story.</p>
        </div>

        <div className="pa-ach-showcase">
          <div className="pa-ach-art">
            <div className="pa-ach-orbit" aria-hidden="true" />
            <span className="pa-ach-art-label">The ultimate milestone</span>
            <img className="pa-ach-crown" src="/achievements/planarela-legend.webp" alt="Gold Planarela Legend crown with coral and blue gems" width="420" height="420" loading="lazy" decoding="async" />
            <p className="pa-ach-legend-name">Planarela Legend</p>
            <p className="pa-ach-legend-count"><strong>500</strong> completed plans</p>
          </div>
          <div className="pa-ach-story">
            <p className="pa-ach-eyebrow">From your first plan to your five hundredth</p>
            <h3>Less time on someday.<br />More “remember when?”</h3>
            <p>Start small. Try somewhere new. Bring your people along. Discover milestones that celebrate the experiences you actually live.</p>
            <ul className="pa-ach-benefits">
              <li><span aria-hidden="true">01</span> See how far you’ve come.</li>
              <li><span aria-hidden="true">02</span> Find a reason to try something new.</li>
              <li><span aria-hidden="true">03</span> Build a collection that tells your story.</li>
            </ul>
            <a className="pa-ach-cta" href="#early-access">Start your story — Join Early Access <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="pa-ach-journey">
          <div className="pa-ach-journey-heading">
            <div><p className="pa-ach-eyebrow">Eight milestones. Your own pace.</p><h3>The road to Legend.</h3></div>
            <p id="pa-ach-preview-note">Interactive preview only. Selecting a milestone or playing the animation does not complete plans or award achievements.</p>
          </div>
          <ol className="pa-ach-milestones" aria-label="Explore achievement milestones" aria-describedby="pa-ach-preview-note">
            {milestones.map((item, index) => <li key={item.count}>
              <button type="button" aria-pressed={selected === index} aria-controls="pa-ach-detail" onClick={() => select(index)}>
                <img src={`/achievements/${item.icon}.webp`} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <span className="pa-ach-step-count">{item.count}</span>
                <span className="pa-ach-step-name">{item.name}</span>
                <span className="pa-ach-step-caption">{item.count === 1 ? "completed plan" : "completed plans"}</span>
              </button>
            </li>)}
          </ol>
          <div id="pa-ach-detail" className="pa-ach-detail">
            <div className="pa-ach-selected">
              <div key={`${selected}-${replay}`} className={`pa-ach-selected-icon${previewed ? " pa-ach-unlock" : ""}`}>
                <img src={`/achievements/${level.icon}.webp`} alt="" width="112" height="112" loading="lazy" decoding="async" />
              </div>
              <div aria-live="polite" aria-atomic="true">
                <p className="pa-ach-eyebrow">{previewed ? "Unlock preview · No achievement awarded" : "Milestone preview"}</p>
                <h4>{level.name}</h4><p>{level.story}</p>
              </div>
            </div>
            <div className="pa-ach-progress">
              <div className="pa-ach-progress-label"><span>Journey to Legend</span><strong>{level.count} / 500</strong></div>
              <progress max="500" value={level.count} aria-label={`Milestone preview: ${level.count} of 500 completed plans toward Planarela Legend`} />
              <p>{level.count === 500 ? "The final progression milestone." : `${500 - level.count} more completed plans to Legend from this milestone.`}</p>
              <button type="button" className="pa-ach-replay" onClick={() => { setPreviewed(true); setReplay(value => value + 1); }}>{previewed ? "Replay unlock preview" : "Preview unlock animation"} <span aria-hidden="true">↗</span></button>
            </div>
          </div>
          <p className="pa-ach-rule">In the app, progression counts only completed plans verified by Planarela. Preview activity on this page never counts toward your progress.</p>
        </div>

        <div className="pa-ach-special">
          <div><p className="pa-ach-eyebrow">Beyond the numbers</p><h3>There’s more than<br />one way to shine.</h3><p>From bringing people together to exploring the world, discover nine special achievements.</p></div>
          <ul aria-label="Special achievement collection">{special.map(([name, icon]) => <li key={icon}><img src={`/achievements/${icon}.webp`} alt="" width="64" height="64" loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
