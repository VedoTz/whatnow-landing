"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import "./early-access.css";

const questions = [
  ["What is Planarela?", "Planarela helps turn free time into personalized plans—whether you're on your own, planning a date, meeting friends or exploring somewhere new. Discover ideas, share experiences and keep the moments that matter."],
  ["When can I try it?", "Planarela is in early access preparation. There is no announced launch date. Join the list to hear when access becomes available; signing up does not guarantee an invitation or a place in a particular release."],
  ["Which devices will it support?", "Supported devices and system requirements will be confirmed when access is announced. The previews on this page are a look at the experience, not a guarantee of availability on a particular device."],
  ["How much will it cost?", "Joining the early access list is free and requires no payment details. App pricing and any paid features have not been announced here; review the terms offered when access becomes available."],
  ["What happens when I join Early Access?", "Submit your email to register your interest. We'll use it for early access and launch updates. This does not create an app account, start a subscription or require a purchase."],
  ["What happens to my email?", "This form sends your email to Formspree, our form service, together with the landing-page source and a broad campaign category if one is recognized. Don't include sensitive information. Joining this list does not grant access to your contacts, location or diary. See Formspree's privacy policy for how the form service handles data."],
];

// Only fixed campaign categories leave the browser. Never forward arbitrary URL values.
function campaignSource() {
  const value = new URLSearchParams(window.location.search).get("utm_source");
  return ["instagram", "tiktok", "facebook", "newsletter", "friend"].includes(value || "") ? value : "direct_or_other";
}

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [manualLink, setManualLink] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const confirmed = useRef(false);
  const request = useRef<AbortController | null>(null);
  const shareBusy = useRef(false);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { if (status === "success") success.current?.focus(); }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || confirmed.current) return;
    const normalized = email.trim();
    const [local, domain, extra] = normalized.split("@");
    if (!input.current?.validity.valid || !local || !domain || extra !== undefined || normalized.length > 254 || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..") || !domain.includes(".") || domain.split(".").some(part => !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(part))) {
      setInvalid(true); setError("Enter a valid email address, such as you@example.com."); setStatus("error"); input.current?.focus(); return;
    }
    busy.current = true;
    setInvalid(false); setError(""); setStatus("loading");
    const controller = new AbortController(); request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://formspree.io/f/xyekyqay", {
        method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, source: "Planarela Landing Page", campaign_source: campaignSource() }),
        signal: controller.signal,
      });
      // No response bodies or email-existence details are exposed to the visitor.
      if (!response.ok) {
        setError(response.status === 429 ? "Too many attempts right now. Please wait a few minutes before trying again." : "We couldn't confirm your signup. Please try again in a moment.");
        setStatus("error"); return;
      }
      confirmed.current = true; setEmail(""); setStatus("success");
    } catch {
      setError("We couldn't confirm your signup. Check your connection before trying again. Your request may already have arrived."); setStatus("error");
    } finally { window.clearTimeout(timeout); busy.current = false; request.current = null; }
  }

  async function share() {
    if (shareBusy.current) return;
    shareBusy.current = true; setShareStatus(""); setManualLink("");
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set("utm_source", "friend");
    try {
      if (navigator.share) {
        try { await navigator.share({ title: "Planarela", text: "Less deciding. More doing. Discover Planarela.", url: url.href }); setShareStatus("Share options closed."); return; }
        catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
      }
      try { await navigator.clipboard.writeText(url.href); setShareStatus("Link copied. Send it to a friend!"); }
      catch { setManualLink(url.href); setShareStatus("Copy the link below to share Planarela."); }
    } finally { shareBusy.current = false; }
  }

  return <>
    <section id="faq" className="pa-faq" aria-labelledby="faq-title">
      <div className="pa-faq-layout">
        <div><p className="pa-eyebrow">A little clarity</p><h2 id="faq-title">Good questions.<br /><span>More possibilities.</span></h2><p className="pa-faq-intro">A few things to know before your next adventure.</p><a className="pa-faq-link" href="#early-access">Join the early access list <span aria-hidden="true">↗</span></a></div>
        <div className="pa-faq-items">{questions.map(([question, answer], index) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><div className="pa-faq-answer"><p>{answer}</p>{index === 5 && <a href="https://formspree.io/legal/privacy-policy/">Formspree privacy policy ↗</a>}</div></details>)}</div>
      </div>
    </section>
    <section id="early-access" className="pa-access" aria-labelledby="access-title">
      <div className="pa-access-inner">
        <div className="pa-access-copy"><img src="/planarela-icon.png" alt="" width="80" height="80" /><p className="pa-eyebrow">Your next chapter</p><h2 id="access-title">Less deciding.<br />More <span>living.</span></h2><p>New places. Your favorite people.<br />Stories you'll want to keep.</p><div className="pa-access-note">A little more possibility in your everyday.</div></div>
        <div className="pa-access-card">
          {status === "success" ? <div ref={success} tabIndex={-1} className="pa-access-success"><span className="pa-access-check" aria-hidden="true">✓</span><h3>You're on the list!</h3><p>Your next adventure starts here. We'll let you know when it's your turn to explore Planarela.</p></div> : <><p className="pa-eyebrow">Be part of what’s next</p><h3>Make room for<br />your next adventure.</h3><p>Join the early access list for launch updates and news about availability.</p><form onSubmit={submit} noValidate aria-busy={status === "loading"}><label htmlFor="access-email">Email address</label><input ref={input} id="access-email" name="email" type="email" required maxLength={254} autoComplete="email" autoCapitalize="none" spellCheck={false} inputMode="email" placeholder="you@example.com" value={email} readOnly={status === "loading"} aria-invalid={invalid} aria-describedby={`access-note${error ? " access-error" : ""}`} onChange={event => { setEmail(event.target.value); if (status === "error") { setStatus("idle"); setError(""); setInvalid(false); } }} /><p id="access-error" role="alert" className="pa-access-error">{error}</p><button className="pa-access-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join Early Access →"}</button><p role="status" className="pa-access-progress">{status === "loading" ? "Sending your signup. Please wait." : ""}</p><p id="access-note" className="pa-access-small">Free to join. No payment details.<br />Your email is sent via Formspree for early access and launch updates. <a href="#faq">Learn more in the FAQ.</a></p></form></>}
          <div className="pa-access-share"><button type="button" onClick={share}>Share Planarela with a Friend <span aria-hidden="true">↗</span></button><p role="status">{shareStatus}</p>{manualLink && <><label htmlFor="share-link">Share link</label><input id="share-link" readOnly value={manualLink} onFocus={event => event.currentTarget.select()} /></>}</div>
        </div>
      </div>
    </section>
  </>;
}
