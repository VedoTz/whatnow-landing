"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 28,
}: FadeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setFormStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xyekyqay", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "WhatNow Landing Page",
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setFormStatus("success");
      setEmail("");
    } catch {
      setFormStatus("error");
    }
  }

  const preferences = [
    "Italian ❤️",
    "Museums 👍",
    "Football ❤️",
    "Clubs 🚫",
    "Cocktails 👍",
    "Outdoors 🌲",
  ];

  const featureCards = [
    {
      image: "/feature-make-a-plan.png",
      label: "Make a Plan",
      title: "Free time, solved.",
      description:
        "Tell WhatNow your situation and get a personalized plan in seconds.",
      bg: "bg-[#FFF4F4]",
      color: "text-[#FF2B2B]",
    },
    {
      image: "/feature-groups.png",
      label: "Groups",
      title: "Everyone gets a say.",
      description:
        "WhatNow combines everyone's preferences into one plan everyone can enjoy.",
      bg: "bg-[#F0F5FF]",
      color: "text-[#4974D1]",
    },
    {
      image: "/feature-events.png",
      label: "Events",
      title: "The big moment stays central.",
      description:
        "Concert, game or festival — WhatNow builds everything else around it.",
      bg: "bg-[#FFF8EB]",
      color: "text-[#C47D18]",
    },
    {
      image: "/feature-vacation.png",
      label: "Vacation",
      title: "Land. Open WhatNow.",
      description:
        "Must-dos, timing and preferences become one smart itinerary.",
      bg: "bg-[#EEF8FF]",
      color: "text-[#3282BE]",
    },
  ];

  const cardsContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.11,
      },
    },
  };

  const cardItem: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#111111]">

      {/* HEADER */}
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-50 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10"
      >
        <img
          src="/whatnow-logo-horizontal.png"
          alt="WhatNow"
          className="h-[50px] w-auto md:h-[96px]"
        />

        <nav className="hidden items-center gap-9 text-[15px] font-medium text-gray-700 md:flex">
          <a href="#how" className="transition hover:text-[#FF2B2B]">
            How it works
          </a>
          <a href="#features" className="transition hover:text-[#FF2B2B]">
            Features
          </a>
          <a href="#vacation" className="transition hover:text-[#FF2B2B]">
            Vacation
          </a>
          <a href="#groups" className="transition hover:text-[#FF2B2B]">
            Groups
          </a>
        </nav>

        <motion.a
          href="#early-access"
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="rounded-full bg-[#FF2B2B] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_12px_30px_rgba(255,43,43,0.24)] md:px-6 md:py-3.5 md:text-sm"
        >
          Join Early Access
        </motion.a>
      </motion.header>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1440px] gap-4 px-5 pb-10 pt-4 md:min-h-[760px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-8 md:px-10 md:pb-14 md:pt-2">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -34,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          transition={{
            duration: 0.85,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-20"
        >
          <h1 className="max-w-[680px] text-[49px] font-bold leading-[0.92] tracking-[-0.055em] md:text-[86px]">
            Never ask
            <br />
            <span className="text-[#FF2B2B]">
              “What should
              <br />
              we do?”
            </span>{" "}
            again.
          </h1>

          <p className="mt-6 max-w-[570px] text-[15px] leading-6 text-gray-500 md:mt-8 md:text-xl md:leading-8">
            Tell us who you're with, how much time you have and what
            you're in the mood for. WhatNow builds the plan, so you can
            spend less time deciding and more time doing.
          </p>

          <motion.a
            href="#early-access"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.045,
                    y: -2,
                  }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="mt-7 inline-flex rounded-full bg-[#FF2B2B] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(255,43,43,0.28)] md:mt-9 md:px-8 md:py-4 md:text-base"
          >
            Join Early Access →
          </motion.a>

          <p className="mt-4 text-[12px] text-gray-400 md:mt-5 md:text-sm">
            Be one of the first to try WhatNow.
          </p>
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 34,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-3 min-h-[430px] md:mt-0 md:min-h-[690px]"
        >
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFECEC] blur-3xl md:h-[560px] md:w-[560px]" />

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                    rotate: [-6, -4.5, -6],
                  }
            }
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[0%] top-[8%] z-0 w-[145px] -rotate-6 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:hidden"
          >
            <img
              src="/hero-good-food.png"
              alt=""
              className="h-[108px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 7, 0],
                    rotate: [6, 7.5, 6],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[0%] top-[15%] z-0 w-[150px] rotate-6 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:hidden"
          >
            <img
              src="/hero-more-of-this.png"
              alt=""
              className="h-[112px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[2%] right-[3%] z-0 w-[145px] -rotate-3 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:hidden"
          >
            <img
              src="/hero-same-people.png"
              alt=""
              className="h-[108px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                    rotate: [-6, -4.5, -6],
                  }
            }
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[0%] top-[8%] hidden w-[230px] -rotate-6 overflow-hidden rounded-[30px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] lg:block"
          >
            <img
              src="/hero-good-food.png"
              alt="Good food. Better company."
              className="h-[175px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 9, 0],
                    rotate: [6, 7.5, 6],
                  }
            }
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[1%] top-[4%] hidden w-[240px] rotate-6 overflow-hidden rounded-[30px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] lg:block"
          >
            <img
              src="/hero-more-of-this.png"
              alt="More of this"
              className="h-[190px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                    rotate: [-3, -2, -3],
                  }
            }
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[5%] right-[0%] hidden w-[245px] -rotate-3 overflow-hidden rounded-[30px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] lg:block"
          >
            <img
              src="/hero-same-people.png"
              alt="Same people. New stories."
              className="h-[185px] w-full object-cover"
            />
          </motion.div>

          <motion.img
            src="/whatnow-phone-hero.png"
            alt="WhatNow day plan"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -11, 0],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-15px] left-1/2 z-20 w-[250px] -translate-x-1/2 drop-shadow-[0_30px_55px_rgba(0,0,0,0.22)] md:bottom-auto md:left-[54%] md:top-1/2 md:w-[500px] md:max-w-[78%] md:-translate-x-1/2 md:-translate-y-1/2"
          />
        </motion.div>
      </section>

      {/* EXACTLY */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-[#FAFAFA]">
        <div
          className="absolute -left-[150px] top-[40px] h-[520px] w-[430px] bg-[#FF2B2B] opacity-[0.055] md:left-[-10%] md:top-[7%] md:h-[390px] md:w-[620px] md:opacity-[0.08]"
          style={{
            borderRadius: "44% 56% 63% 37% / 40% 37% 63% 60%",
            transform: "rotate(-7deg)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 md:grid md:grid-cols-[1.52fr_0.13fr_0.85fr] md:items-center md:gap-5 md:px-10 md:py-16">

          <div className="relative h-[455px] md:hidden">
            <FadeIn delay={0}>
              <div className="absolute left-0 top-0 flex items-center gap-2">
                <img
                  src="/avatar-woman-curly-01.png"
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="rounded-[22px] bg-white px-5 py-3 text-sm shadow-md">
                  What should we do?
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="absolute right-1 top-[76px] flex items-center gap-2">
                <img
                  src="/avatar-man-navy-01.png"
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="rounded-[18px] bg-red-50 px-4 py-2 text-[13px] text-[#C52424]">
                  I don&apos;t know.
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="absolute left-[12%] top-[145px] flex items-center gap-2">
                <img
                  src="/avatar-woman-brunette-01.png"
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="rounded-[24px] bg-white px-6 py-3 text-base font-semibold shadow-md">
                  Anything.
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="absolute right-[10%] top-[215px] flex items-center gap-2">
                <img
                  src="/avatar-man-black-01.png"
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="rounded-[16px] bg-white px-4 py-2 text-xs shadow">
                  Where?
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="absolute left-[20%] top-[278px] flex items-center gap-2">
                <img
                  src="/avatar-man-bearded-02.png"
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="rounded-full bg-[#FF2B2B] px-5 py-2.5 text-sm font-semibold text-white shadow-md">
                  Food?
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="absolute right-1 top-[335px] flex items-center gap-2">
                <img
                  src="/avatar-man-charcoal-03.png"
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="rounded-[20px] bg-white px-5 py-3 text-sm shadow-md">
                  Somewhere new?
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.48}>
              <div className="absolute bottom-0 left-0 flex items-center gap-2">
                <img
                  src="/avatar-woman-blonde-01.png"
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="rounded-[24px] bg-[#FFF0F0] px-6 py-3 text-base font-semibold text-[#C52424]">
                  You decide.
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="relative hidden min-h-[470px] md:block">
            <div className="absolute left-[2%] top-[1%] flex -rotate-2 items-center gap-3">
              <img
                src="/avatar-woman-curly-01.png"
                alt=""
                className="h-[68px] w-[68px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[28px] border border-red-100 bg-white px-8 py-5 text-[18px] font-medium shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                What should we do?
              </div>
            </div>

            <div className="absolute right-[3%] top-[8%] flex rotate-2 items-center gap-3">
              <img
                src="/avatar-man-navy-01.png"
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[20px] bg-[#FFF0F0] px-5 py-3 text-sm text-[#C52424] shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
                I don&apos;t know.
              </div>
            </div>

            <div className="absolute left-[14%] top-[30%] flex rotate-1 items-center gap-3">
              <img
                src="/avatar-woman-brunette-01.png"
                alt=""
                className="h-[58px] w-[58px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[30px] bg-white px-10 py-4 text-[21px] font-semibold shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
                Anything.
              </div>
            </div>

            <div className="absolute right-[12%] top-[40%] flex -rotate-2 items-center gap-3">
              <img
                src="/avatar-man-black-01.png"
                alt=""
                className="h-[44px] w-[44px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[18px] border border-red-100 bg-white px-5 py-2.5 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.07)]">
                Where?
              </div>
            </div>

            <div className="absolute left-[39%] top-[58%] flex -rotate-1 items-center gap-3">
              <img
                src="/avatar-man-bearded-02.png"
                alt=""
                className="h-[50px] w-[50px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[22px] bg-[#FF2B2B] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(255,43,43,0.24)]">
                Food?
              </div>
            </div>

            <div className="absolute bottom-[17%] right-[2%] flex rotate-3 items-center gap-3">
              <img
                src="/avatar-man-charcoal-03.png"
                alt=""
                className="h-[54px] w-[54px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[24px] border border-red-100 bg-white px-7 py-3.5 text-base font-medium shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
                Somewhere new?
              </div>
            </div>

            <div className="absolute bottom-[2%] left-[2%] flex rotate-1 items-center gap-3">
              <img
                src="/avatar-woman-blonde-01.png"
                alt=""
                className="h-[78px] w-[78px] rounded-full object-cover shadow-md"
              />
              <div className="rounded-[34px] bg-[#FFF0F0] px-10 py-5 text-[22px] font-semibold text-[#C52424] shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
                You decide.
              </div>
            </div>
          </FadeIn>

          <FadeIn className="hidden justify-center md:flex">
            <div className="-rotate-12 text-[84px] font-light text-[#FF2B2B]">
              ↗
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="relative mt-12 md:-ml-4 md:mt-0">
            <div className="absolute -left-5 top-0 h-20 w-1.5 rounded-full bg-[#FF2B2B] md:-left-6 md:top-2 md:h-28 md:w-2" />

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF2B2B] md:text-xs">
              From this...
            </p>

            <h2 className="text-[58px] font-bold leading-none tracking-[-0.055em] md:text-[88px]">
              Exactly.
            </h2>

            <div className="mt-7 flex items-center gap-4 md:mt-8 md:gap-5">
              <motion.img
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.06,
                        rotate: 3,
                      }
                }
                src="/whatnow-icon.png"
                alt="WhatNow"
                className="h-[82px] w-[82px] rounded-[24px] shadow-[0_18px_45px_rgba(255,43,43,0.25)] md:h-[112px] md:w-[112px] md:rounded-[32px]"
              />

              <div className="text-3xl text-[#FF2B2B] md:text-4xl">
                →
              </div>

              <p className="text-lg font-medium text-gray-400 md:text-xl">
                ...to this.
              </p>
            </div>

            <p className="mt-6 max-w-[330px] text-sm leading-6 text-gray-500 md:mt-7 md:text-base md:leading-7">
              Less debating. Less searching. One plan everyone can actually enjoy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative overflow-hidden py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <FadeIn className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF2B2B] md:text-sm">
              Four simple steps
            </p>

            <h2 className="mt-3 text-[42px] font-bold tracking-[-0.045em] md:text-7xl">
              How it works
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-6 text-gray-500 md:text-lg md:leading-8">
              A few taps. WhatNow turns your free time into a plan built around you.
            </p>
          </FadeIn>

          {/* MOBILE */}
          <motion.div
            variants={cardsContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 space-y-5 lg:hidden"
          >
            <motion.div
              variants={cardItem}
              className="relative overflow-hidden rounded-[30px] border border-red-100 bg-gradient-to-br from-white to-[#FFF8F8] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-100/60 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-xs font-bold text-white">
                  01
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  👥
                </div>
              </div>

              <h3 className="relative mt-6 text-[27px] font-bold">
                Who are you with?
              </h3>

              <p className="relative mt-2 text-sm text-gray-500">
                Solo, date, friends or the whole group.
              </p>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {["Solo", "Date", "Friends", "Group"].map((x, i) => (
                  <span
                    key={x}
                    className={`rounded-full px-4 py-2 text-xs ${
                      i === 1
                        ? "bg-red-50 font-semibold text-[#FF2B2B]"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="relative overflow-hidden rounded-[30px] border border-orange-100 bg-gradient-to-br from-white to-[#FFF9F3] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-xs font-bold text-white">
                  02
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  🕒
                </div>
              </div>

              <h3 className="mt-6 text-[27px] font-bold leading-tight">
                How much time do you have?
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#FF2B2B] px-4 py-2 text-xs font-semibold text-white">
                  2 hours
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs shadow-sm">
                  Afternoon
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs shadow-sm">
                  Tonight
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="relative flex min-h-[390px] items-center justify-center py-4"
            >
              <div className="absolute h-[290px] w-[290px] rounded-full bg-[#FFF0F0] blur-3xl" />

              <motion.img
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/phone-how-it-works-right.png"
                alt="WhatNow app"
                className="relative z-10 w-[235px] drop-shadow-[0_28px_50px_rgba(0,0,0,0.20)]"
              />
            </motion.div>

            <motion.div
              variants={cardItem}
              className="relative overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-white to-[#F6FAFF] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-xs font-bold text-white">
                  03
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  🧭
                </div>
              </div>

              <h3 className="mt-6 text-[27px] font-bold">
                What are you feeling?
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Food", "Fun", "Sports", "Nightlife", "Culture", "Chill"].map(
                  (x, i) => (
                    <span
                      key={x}
                      className={`rounded-full px-4 py-2 text-xs ${
                        i === 0
                          ? "bg-red-50 font-semibold text-[#FF2B2B]"
                          : "bg-white shadow-sm"
                      }`}
                    >
                      {x}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="rounded-[34px] bg-[#FF2B2B] p-7 text-white shadow-[0_25px_65px_rgba(255,43,43,0.27)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#FF2B2B]">
                  04
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  ✨
                </div>
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Done.
              </p>

              <h3 className="mt-2 text-[30px] font-bold">
                Your plan is ready.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Places, food and experiences organized into one smart plan built around you.
              </p>

              <button className="mt-7 flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-bold text-[#FF2B2B]">
                See it in action
                <span>→</span>
              </button>
            </motion.div>
          </motion.div>

          {/* DESKTOP */}
          <FadeIn className="relative mt-14 hidden min-h-[820px] lg:block">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF1F1] blur-3xl" />

            <div className="absolute left-[14%] top-[13%] h-[70%] w-[72%] rounded-[190px] border-[2px] border-dashed border-[#FF2B2B]/20" />

            <img
              src="/phone-how-it-works-left.png"
              alt=""
              className="absolute left-[47%] top-[53%] z-0 w-[270px] -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-15"
            />

            <motion.img
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              src="/phone-how-it-works-right.png"
              alt="WhatNow app"
              className="absolute left-1/2 top-1/2 z-20 w-[375px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_35px_65px_rgba(0,0,0,0.22)]"
            />

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
              className="absolute left-[0%] top-[3%] z-30 w-[350px] -rotate-[1deg] rounded-[34px] border border-red-100 bg-gradient-to-br from-white to-[#FFF7F7] p-7 shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-sm font-bold text-white">
                  01
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  👥
                </div>
              </div>

              <h3 className="mt-6 text-[27px] font-bold">
                Who are you with?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Solo, date, friends or the whole group.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Solo", "Date", "Friends", "Group"].map((x, i) => (
                  <span
                    key={x}
                    className={`rounded-full px-4 py-2 text-xs ${
                      i === 1
                        ? "bg-red-50 font-semibold text-[#FF2B2B]"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
              className="absolute right-[0%] top-[4%] z-30 w-[345px] rotate-[1deg] rounded-[34px] border border-orange-100 bg-gradient-to-br from-white to-[#FFF9F3] p-7 shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-sm font-bold text-white">
                  02
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  🕒
                </div>
              </div>

              <h3 className="mt-6 text-[27px] font-bold leading-tight">
                How much time do you have?
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#FF2B2B] px-4 py-2 text-xs font-semibold text-white">
                  2 hours
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs shadow-sm">
                  Afternoon
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs shadow-sm">
                  Tonight
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
              className="absolute bottom-[1%] right-[0%] z-30 w-[360px] rotate-[1deg] rounded-[34px] border border-blue-100 bg-gradient-to-br from-white to-[#F6FAFF] p-7 shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FF2B2B] px-3 py-1.5 text-sm font-bold text-white">
                  03
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-xl shadow-sm">
                  🧭
                </div>
              </div>

              <h3 className="mt-6 text-[27px] font-bold">
                What are you feeling?
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Food", "Fun", "Sports", "Nightlife", "Culture", "Chill"].map(
                  (x, i) => (
                    <span
                      key={x}
                      className={`rounded-full px-4 py-2 text-xs ${
                        i === 0
                          ? "bg-red-50 font-semibold text-[#FF2B2B]"
                          : "bg-white shadow-sm"
                      }`}
                    >
                      {x}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
              className="absolute bottom-[0%] left-[0%] z-30 w-[395px] -rotate-[1deg] rounded-[38px] bg-[#FF2B2B] p-8 text-white shadow-[0_30px_80px_rgba(255,43,43,0.28)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-[#FF2B2B]">
                  04
                </span>

                <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-white/15 text-2xl">
                  ✨
                </div>
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Done.
              </p>

              <h3 className="mt-2 text-[32px] font-bold leading-tight">
                Your plan is ready.
              </h3>

              <p className="mt-4 max-w-[300px] text-sm leading-6 text-white/75">
                Places, food and experiences organized into one smart plan built around you.
              </p>

              <button className="mt-8 flex w-full items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-bold text-[#FF2B2B] shadow-lg">
                See it in action
                <span>→</span>
              </button>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* RED BRAND MOMENT */}
      <section className="relative overflow-hidden bg-[#FF2B2B]">
        <div className="absolute -left-[180px] -top-[200px] h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-20 md:min-h-[540px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-10">

          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              WhatNow
            </p>

            <h2 className="mt-4 text-[48px] font-bold leading-[0.94] tracking-[-0.055em] text-white md:text-[78px]">
              From ideas
              <br />
              to actual plans.
            </h2>

            <p className="mt-5 text-lg text-white/75">
              Less deciding. More doing.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="relative min-h-[420px]">

              {/* black card */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[2%] top-[3%] w-[250px] rounded-[30px] bg-[#111111] p-6 text-white shadow-[0_24px_60px_rgba(100,0,0,0.28)] md:w-[290px]"
              >
                <p className="text-xs text-white/45">
                  Next plan
                </p>

                <p className="mt-2 text-[24px] font-bold leading-tight">
                  Better than “I don’t know.”
                </p>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  One tap turns indecision into something everyone can actually do.
                </p>
              </motion.div>

              {/* extra card 1 */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 6, 0],
                        rotate: [-2, 0, -2],
                      }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[2%] top-[0%] w-[210px] rotate-[-2deg] rounded-[28px] bg-white/14 p-5 text-white backdrop-blur-md md:w-[235px]"
              >
                <p className="text-xs text-white/55">
                  Tonight
                </p>

                <p className="mt-1 text-xl font-bold">
                  Dinner + drinks?
                </p>

                <p className="mt-2 text-xs leading-5 text-white/60">
                  WhatNow already has an idea.
                </p>
              </motion.div>

              {/* icon */}
              <motion.img
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -11, 0],
                        rotate: [5, 7, 5],
                      }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/whatnow-icon.png"
                alt="WhatNow"
                className="absolute right-[10%] top-[33%] h-[165px] w-[165px] rounded-[46px] shadow-[0_35px_80px_rgba(120,0,0,0.28)] md:h-[210px] md:w-[210px] md:rounded-[58px]"
              />

              {/* extra card 2 */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -6, 0],
                        rotate: [2, 0, 2],
                      }
                }
                transition={{
                  duration: 6.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[2%] left-[4%] w-[225px] rotate-[2deg] rounded-[28px] bg-white p-5 text-black shadow-[0_22px_55px_rgba(120,0,0,0.22)] md:w-[260px]"
              >
                <p className="text-xs text-gray-400">
                  Your plan
                </p>

                <p className="mt-1 text-xl font-bold">
                  Ready in seconds ✨
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Places, timing and preferences already connected.
                </p>
              </motion.div>

              {/* extra card 3 */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 7, 0],
                      }
                }
                transition={{
                  duration: 5.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[6%] right-[0%] w-[190px] rounded-[25px] bg-[#FF6666]/70 p-5 text-white backdrop-blur-md md:w-[220px]"
              >
                <p className="text-xs text-white/60">
                  Less searching
                </p>

                <p className="mt-1 text-lg font-bold leading-tight">
                  More actually going.
                </p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOUR WAYS */}
      <section id="features" className="py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF2B2B]">
              The core of WhatNow
            </p>

            <h2 className="mt-3 text-[43px] font-bold leading-[0.98] tracking-[-0.05em] md:text-7xl">
              Four ways to use WhatNow.
            </h2>

            <p className="mt-5 text-base text-gray-500 md:text-xl">
              Same app. Different moments. Whatever comes next.
            </p>
          </FadeIn>

          <motion.div
            variants={cardsContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.08 }}
            className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-7"
          >
            {featureCards.map((card) => (
              <motion.div
                variants={cardItem}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                }}
                key={card.label}
                className={`group overflow-hidden rounded-[30px] ${card.bg} shadow-[0_18px_55px_rgba(0,0,0,0.05)] md:rounded-[38px]`}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="aspect-[1.22/1] w-full object-cover transition duration-500 group-hover:scale-[1.025] md:aspect-[4/3]"
                />

                <div className="relative p-6 md:p-7">
                  <div className="absolute right-5 top-5 h-14 w-14 rounded-full bg-white/60 blur-xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm ${card.color}`}
                      >
                        {card.label}
                      </span>

                      <h3 className="mt-4 text-[24px] font-bold">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-[13px] leading-5 text-gray-500">
                        {card.description}
                      </p>
                    </div>

                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              scale: 1.12,
                              rotate: -4,
                            }
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF2B2B] text-lg text-white shadow-lg"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PERSONALIZATION */}
      <section className="relative overflow-hidden bg-[#FAFAFA] py-20 md:py-24">
        <div className="absolute -right-[160px] top-[60px] h-[420px] w-[420px] rounded-full bg-[#FF2B2B] opacity-[0.05] blur-3xl" />

        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-10">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF2B2B]">
              Personal to you
            </p>

            <h2 className="mt-3 text-[48px] font-bold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              It gets to
              <br />
              know you.
            </h2>

            <p className="mt-5 text-base text-gray-500 md:text-xl">
              Not what everyone likes. What you like.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className="rounded-[32px] bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] md:p-11"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/avatar-woman-brunette-02.png"
                  alt=""
                  className="h-[62px] w-[62px] rounded-full object-cover"
                />

                <div>
                  <p className="font-bold">Your preferences</p>
                  <p className="mt-1 text-xs text-gray-500">
                    WhatNow learns what works for you.
                  </p>
                </div>

                <div className="ml-auto text-xl">❤️</div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {preferences.map((item, index) => (
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -2,
                            scale: 1.04,
                          }
                    }
                    key={item}
                    className={`rounded-full px-4 py-2.5 text-[12px] font-medium ${
                      index === 0 || index === 2
                        ? "bg-red-50 text-[#FF2B2B]"
                        : "bg-gray-100"
                    }`}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-[26px] bg-[#111111] p-6 text-white">
                  <p className="text-xs text-white/45">Next plan</p>

                  <p className="mt-2 text-[23px] font-bold">
                    Better because it knows you.
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/55">
                    Your ratings and choices quietly improve every plan.
                  </p>
                </div>

                <div className="rounded-[26px] border border-red-100 bg-[#FFF5F5] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF2B2B]">
                    You rated
                  </p>

                  <p className="mt-3 text-2xl text-[#FF2B2B]">
                    ★★★★★
                  </p>

                  <p className="mt-3 text-xs leading-5 text-gray-500">
                    WhatNow remembers what made this plan work.
                  </p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="early-access"
        className="relative overflow-hidden bg-[#FF2B2B] py-20 md:py-24"
      >
        <FadeIn>
          <div className="relative mx-auto max-w-[1000px] px-5 text-center">
            <motion.img
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -7, 0],
                      rotate: [0, 2, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              src="/whatnow-icon.png"
              alt="WhatNow"
              className="mx-auto h-[88px] w-[88px] rounded-[27px] shadow-[0_25px_60px_rgba(130,0,0,0.28)] md:h-[105px] md:w-[105px]"
            />

            <h2 className="mt-7 text-[48px] font-bold leading-[0.95] tracking-[-0.055em] text-white md:text-7xl">
              Okay. So...
              <br />
              WhatNow?
            </h2>

            {formStatus === "success" ? (
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.96,
                        y: 15,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-9 max-w-[640px] rounded-[30px] bg-white px-7 py-8 shadow-[0_25px_70px_rgba(120,0,0,0.22)]"
              >
                <div className="text-4xl">🎉</div>

                <h3 className="mt-4 text-2xl font-bold text-black">
                  You&apos;re on the list.
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  We&apos;ll let you know when WhatNow is ready for early access.
                </p>
              </motion.div>
            ) : (
              <>
                <p className="mx-auto mt-5 max-w-xl text-base text-white/75 md:text-lg">
                  Be one of the first to try it when we launch.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-[640px] flex-col gap-2 rounded-[24px] bg-white p-2 sm:flex-row"
                >
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="min-w-0 flex-1 rounded-[18px] px-5 py-4 text-black outline-none"
                  />

                  <motion.button
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.025,
                          }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="rounded-[18px] bg-[#111111] px-7 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
                  >
                    {formStatus === "loading"
                      ? "Joining..."
                      : "Join Early Access →"}
                  </motion.button>
                </form>

                {formStatus === "error" && (
                  <p className="mt-4 text-sm font-medium text-white">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="mt-4 text-xs text-white/50">
                  No spam. Just launch updates and early access.
                </p>
              </>
            )}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <img
            src="/whatnow-logo-horizontal.png"
            alt="WhatNow"
            className="h-[54px] w-auto self-start brightness-0 invert md:h-[62px]"
          />

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/55 md:text-sm">
            <a href="#how" className="hover:text-white">
              How it works
            </a>

            <a href="#features" className="hover:text-white">
              Features
            </a>

            <span>Vacation</span>
            <span>Groups</span>
            <span>Instagram</span>
            <span>TikTok</span>
          </div>

          <p className="text-xs text-white/35 md:text-sm">
            © 2026 WhatNow
          </p>
        </div>
      </footer>
    </main>
  );
}