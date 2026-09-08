const EYEBROW = "WHAT YOU'VE PROBABLY ALREADY TRIED";

const INTRO =
  "Do more courses. Stuff the resume with keywords. Go do an M.Tech, or another certificate. Or, from people who've never worked in the field: core subjects are too hard, just move to IT. None of it closes the actual gap — the one that stays quiet until someone asks a why question in a design review or an interview.";

const BULLETS = [
  "30 tabs open, zero projects shipped",
  "Concepts understood, but can't apply under pressure",
  "Working in embedded but can't explain the architecture you built",
  `Watching batchmates get promoted while you're still waiting for your "right time"`,
];

const COACHING_PARAGRAPH =
  "Coaching institutes — a handful of names keep coming up, along with the government-backed route. The pitch is always the same: a promised job, a handful of success stories. The real number is closer to 6 or 7 percent of students actually landing strong placements.";

const SKEPTICISM = [
  `"Why does this cost what it costs?"`,
  `"I don't have time." — for most people asking, that's simply true, not a soft no.`,
];

const PULL_QUOTE =
  "MOST EMBEDDED TRAINING IN INDIA PREPARES YOU TO PASS A TEST. THIS PREPARES YOU TO SURVIVE A DESIGN REVIEW.";

const CLOSING_LINE =
  "No job guarantee. Nobody honestly can promise one. What you get is fluency — and a bonus track on resume, LinkedIn, and GitHub presence.";

export default function Battlefield() {
  return (
    <section className="w-full px-6 py-24" style={{ backgroundColor: "var(--teal-800)" }}>
      <div className="mx-auto max-w-[680px]">
        <div className="text-center">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.04em]"
            style={{ color: "var(--orange-400)" }}
          >
            {EYEBROW}
          </p>
          <h2
            className="font-display uppercase text-[26px] lg:text-[34px]"
            style={{ fontWeight: 700, color: "var(--paper)", lineHeight: 1.15, marginTop: "16px" }}
          >
            COURSES ARE NOT GOING TO FIX THIS.
          </h2>
        </div>

        <p
          className="font-body text-base"
          style={{ lineHeight: 1.6, color: "rgba(251,247,241,0.85)", marginTop: "20px" }}
        >
          {INTRO}
        </p>

        <ul style={{ marginTop: "32px" }}>
          {BULLETS.map((line) => (
            <li
              key={line}
              className="font-body flex gap-2 text-[15px]"
              style={{ color: "rgba(251,247,241,0.8)", lineHeight: 1.5, marginBottom: "12px" }}
            >
              <span aria-hidden style={{ color: "var(--orange-400)" }}>
                →
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <p
          className="font-mono text-[11px] uppercase tracking-[0.04em]"
          style={{ color: "var(--orange-400)", marginTop: "40px" }}
        >
          WHAT ELSE IS OUT THERE
        </p>
        <p
          className="font-body text-[15px]"
          style={{ lineHeight: 1.6, color: "rgba(251,247,241,0.8)", marginTop: "12px" }}
        >
          {COACHING_PARAGRAPH}
        </p>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8" style={{ marginTop: "28px" }}>
          {SKEPTICISM.map((line) => (
            <blockquote
              key={line}
              className="font-body flex-1 text-[15px] italic"
              style={{
                borderLeft: "2px solid var(--orange-400)",
                paddingLeft: "16px",
                color: "rgba(251,247,241,0.75)",
              }}
            >
              {line}
            </blockquote>
          ))}
        </div>

        <p
          className="font-display text-center uppercase text-[19px] lg:text-[24px]"
          style={{
            fontWeight: 700,
            color: "var(--paper)",
            lineHeight: 1.3,
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "48px",
          }}
        >
          {PULL_QUOTE}
        </p>

        <p
          className="font-body text-center text-sm"
          style={{
            color: "rgba(251,247,241,0.7)",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
        >
          {CLOSING_LINE}
        </p>
      </div>
    </section>
  );
}
