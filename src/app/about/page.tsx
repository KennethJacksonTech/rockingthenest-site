export default function AboutPage() {
  const funFacts = [
    {
      emoji: "🌴",
      text: "We like it hot – just give us an umbrella, some water to splash around in, a cool drink and we are all set!",
    },
    {
      emoji: "👟",
      text: 'Our "uniform" is shorts, a tank and our beloved Chacos! Although we have been told we clean up nice.',
    },
    {
      emoji: "💻",
      text: "We both have worked in the tech industry and Brad still does. Yep, we are nerds!",
    },
    {
      emoji: "🎸",
      text: "Brad loves spending time with the boys working on music and being silly.",
    },
    {
      emoji: "🤸",
      text: "Maggie's ultimate goal is to learn how to do a cartwheel.",
    },
    {
      emoji: "🏰",
      text: "We love anything Disney! Harry Potter too!",
    },
    {
      emoji: "✝️",
      text: "Jesus is awesome, kindness is always cool, and laughing is mandatory!",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-inverse py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-[2.5rem] leading-[1.2] tracking-[-0.01em] text-text-light mb-3">
          About Rocking The Nest
        </h1>
        <p className="text-text-light/80 font-body text-lg">
          Empty nesters who refuse to slow down
        </p>
      </section>

      {/* Story */}
      <section className="bg-surface-primary py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <img
            src="/images/brad-maggie-st-kitts-.jpg"
            alt="Maggie and Brad"
            className="rounded-lg w-full object-cover shadow-lg"
          />
          <div className="font-body text-text-primary leading-[1.7] space-y-4">
            <p>
              The story of Rocking The Nest started in 2014 when we realized we
              would be free in two years. Our youngest was going to graduate from
              high school and we would be childless for the first time in 30 plus
              years! Then what? A plan was made to sell the big house on 6 acres
              and start planning the next phase of our lives! And that plan was
              to see and do as much as possible! We decided these are not the
              days to take it easy – these are the days to let go, have fun, and
              fulfill dreams!
            </p>
            <p>
              Fast forward to today and life just keeps getting better and
              better! It&apos;s a good thing we both believe in working hard to
              play hard! Rocking The Nest came about so we could share our
              experiences as empty nesters, especially our passion for travel –
              as a couple and with family or friends. We could be gone all the
              time! Whether is a quick day trip, weekend getaway to see one of
              our favorite bands in concert, or an awesome week vacation with
              friends or family – we love it all!
            </p>
            <p>
              We live in the great state of Texas, although our hearts really
              live at the beach. Our family is blended with seven kids and lots
              of grandkids. We claim to be empty-nesters although our daughter,
              two of the grandkids and an adorable yorkie named Jax share a
              house with us. And we love it!
            </p>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="bg-surface-secondary py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-semibold text-[2rem] leading-[1.3] text-text-primary text-center mb-10">
            Fun Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {funFacts.map((fact, i) => (
              <div
                key={i}
                className="bg-surface-primary rounded-lg p-6 flex items-start gap-4 shadow-sm"
              >
                <span className="text-3xl flex-shrink-0">{fact.emoji}</span>
                <p className="font-body text-text-primary leading-[1.7]">
                  {fact.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Off */}
      <section className="bg-surface-primary py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-lg text-text-primary/80 italic leading-[1.7] mb-6">
            Our goal in life is to give, serve, love, inspire, be inspired,
            worship, be crazy, have fun, travel, meet people, be outrageous,
            laugh, dance, sing, run, listen, and go to as many rock concerts as
            we can!
          </p>
          <p className="font-body text-text-primary/80 italic mb-6">
            Thank you for coming along for the journey! We are so glad you are
            here!
          </p>
          <p className="font-heading font-bold text-[2rem] text-accent-primary mb-2">
            Rock On!
          </p>
          <p className="text-text-muted font-body">— Maggie &amp; Brad</p>
        </div>
      </section>
    </>
  );
}
