export type BlogPost = {
  img: string;
  date: string;
  month: string;
  featured: boolean;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  category: string;
};

const blogPosts: BlogPost[] = [
  {
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    date: "14",
    month: "Jan",
    featured: false,
    category: "Physiotherapy",
    author: "STAIRS Physio Team",
    readTime: "5 min read",
    title: "Why Physiotherapy Is Not Just For After Injuries",
    excerpt:
      "Most people walk through our doors only after something has gone wrong. But the smartest athletes we work with come in before it does.",
    content: `Most people associate physiotherapy with injury recovery — a broken ankle, a torn ligament, post-surgery rehabilitation. At STAIRS, we see this every day, and we treat it brilliantly. But what we really want to change is the idea that physiotherapy only belongs at the end of the story, when the damage is already done.

The truth is, your body is constantly accumulating stress. Every long hour at a desk, every run on uneven terrain, every session where you pushed a little harder than your recovery allowed — these things leave marks. Not always painful marks, not always visible ones, but imbalances and compensations that quietly build until one day they aren't quiet anymore.

Proactive physiotherapy means coming in before the injury. It means a trained eye assessing how you move, identifying the tightness in your left hip that's been subtly overloading your right knee, catching the shoulder impingement that would have shown up six months into your training block. We fix it before it becomes a problem.

At STAIRS, our physiotherapists work with runners preparing for marathons, badminton players in the middle of their season, desk workers whose posture has slowly collapsed over years of sedentary work, and everyday people who just want to stay active and pain-free into their fifties, sixties, and beyond.

The most common thing we hear from clients after their first assessment session is: "I didn't even know I had that." That's exactly the point. You don't always feel what's wrong — but it's there. And catching it early changes everything.

If you haven't had a physiotherapy assessment and you train regularly, work long hours at a desk, or simply want to move well for as long as possible, book a session at STAIRS. Think of it less like seeing a doctor and more like getting your car serviced before the engine warning light comes on.`,
  },
  {
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    date: "03",
    month: "Feb",
    featured: true,
    category: "Running",
    author: "STAIRS Coaches",
    readTime: "6 min read",
    title: "The STAIRS Guide To Running Without Getting Injured",
    excerpt:
      "Running is one of the most natural things your body can do. So why do so many runners end up hurt? Here is what we have learned from working with hundreds of runners in Bangalore.",
    content: `We have worked with runners of every level at STAIRS — first-timers training for their debut 5K, seasoned triathletes logging 80 kilometres a week, and everyone in between. And the single most common thread we see across all of them is this: people run more than their bodies are currently prepared to handle.

This is not a criticism. Running is addictive. Progress feels incredible. When you find your rhythm, the last thing you want to do is hold back. But the body keeps score, and the invoice usually arrives in the form of knee pain, shin splints, a tight IT band, or something worse.

Here is what we tell every runner who comes through STAIRS:

Strength is not optional. Running is a single-leg sport. Every stride, you are landing on one leg and absorbing two to three times your body weight. If your glutes, hamstrings, and single-leg stability are not strong enough to handle that load, something else will take over — and whatever takes over will eventually break down. Strength and conditioning is not cross-training. It is the foundation of safe running.

Your easy runs need to be genuinely easy. Most runners run their easy days too hard. Zone 2 aerobic work — where you can hold a full conversation — builds your aerobic base without accumulating fatigue. If every run feels like a workout, you are not recovering between sessions. You are just getting slower while getting more injured.

Mobility is as important as mileage. Tight hip flexors, restricted ankle dorsiflexion, and limited thoracic rotation all change how you run — and rarely for the better. A fifteen-minute daily mobility routine is worth more to your running longevity than an extra five kilometres a week.

Sleep is training. The adaptation from your runs happens during sleep. If you are logging big mileage but cutting corners on rest, you are doing the hard part and skipping the reward.

At STAIRS, our Fit To Run programme addresses all of these dimensions — physiotherapy, strength, mobility, and coaching — in one integrated programme designed specifically for runners at every level. If running is part of your life, come and let us help you do it better and for longer.`,
  },
  {
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    date: "19",
    month: "Feb",
    featured: false,
    category: "Myofascial Release",
    author: "STAIRS Physio Team",
    readTime: "4 min read",
    title: "What Is Myofascial Release And Why Does It Work So Well?",
    excerpt:
      "If you have ever felt that deep, almost satisfying ache during a massage that makes tight muscles finally let go, you have experienced something close to myofascial release.",
    content: `Fascia is one of the most important and least understood structures in the human body. It is the connective tissue that wraps around every muscle, bone, nerve, and organ — a continuous web that holds everything in place and allows structures to slide smoothly past one another as you move.

When fascia becomes restricted — through overuse, injury, poor posture, stress, or simply sitting in one position for too long — it creates tension that ordinary stretching cannot reach. Muscles feel tight even after you have stretched them. Certain movements feel stuck. Pain shows up in places that seem unrelated to where the problem actually is.

Myofascial release is a specialist manual therapy technique that targets these restrictions directly. Unlike deep tissue massage, which works primarily on the muscle, myofascial release addresses the fascial system — applying sustained, gentle pressure to the specific points of restriction until the tissue releases. It is slow, deliberate work, and when it is done well, the results are profound.

At STAIRS, our therapists use myofascial release as both a standalone treatment and as part of broader physiotherapy and recovery programmes. We use it to help athletes recover faster between training sessions, to address chronic tension patterns that have built up over years, to support post-surgery rehabilitation, and to treat pain that has not responded well to other interventions.

Some of the conditions that respond particularly well to myofascial release include plantar fasciitis, chronic lower back pain, neck and shoulder tightness, hip impingement, IT band syndrome, and headaches driven by tension in the neck and upper back.

If you have been carrying tightness or discomfort that stretching, foam rolling, and rest have not resolved, myofascial release may be exactly what your body needs. Book a session at STAIRS and let our therapists take a proper look.`,
  },
  {
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    date: "08",
    month: "Mar",
    featured: false,
    category: "Strength & Conditioning",
    author: "STAIRS Coaches",
    readTime: "5 min read",
    title: "Strength Training For Athletes: Why More Is Not Always Better",
    excerpt:
      "The athletes who train the smartest are rarely the ones who train the hardest. Here is what periodised strength and conditioning actually looks like at STAIRS.",
    content: `There is a myth in sport and fitness that progress is linear — that if you work harder, you get better faster. For strength and conditioning, the reality is almost the opposite. The stimulus from training only produces adaptation when it is paired with adequate recovery. Push too hard, recover too little, and you are not building — you are accumulating fatigue while your performance quietly declines.

At STAIRS, our strength and conditioning programmes are built around periodisation. That means deliberate variation in training load, intensity, and focus across weeks and months — structured in a way that allows your body to absorb stress, adapt, and then perform at a higher level before the next training block begins.

For team sport athletes, this means building a foundation of strength in the off-season, converting that into sport-specific power and endurance as the season approaches, and then maintaining performance during competition while managing the cumulative fatigue of matches and training. Getting this right is what separates athletes who peak at the right time from those who arrive at their biggest events already burnt out.

For recreational athletes and fitness enthusiasts, periodisation matters just as much — it just looks different. It might mean a four-week block focusing on building a strength base, followed by a week of deliberate deload, followed by a hypertrophy or power phase. The specific shape changes based on your goals, your training history, and what your body responds to.

What never changes is the principle: smart programming beats hard programming. At STAIRS, every programme we write is tailored to the individual. We assess where you are starting from, we understand where you are trying to go, and we build a pathway between the two that does not grind you into the ground along the way.

If you are training hard but not seeing the results you expect, or if you are picking up niggling injuries that keep interrupting your progress, come and speak to one of our coaches. The problem is usually not effort — it is programme design.`,
  },
  {
    img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
    date: "22",
    month: "Mar",
    featured: false,
    category: "Fitness",
    author: "STAIRS Team",
    readTime: "4 min read",
    title: "The Sedentary Epidemic: How A Desk Job Is Affecting Your Body",
    excerpt:
      "Eight to ten hours a day seated is doing real damage to your posture, your hips, and your spine. The good news is that it is entirely reversible.",
    content: `The human body was not designed to sit for eight to ten hours a day. And yet for most working adults in modern cities, that is precisely what they do. You wake up, sit in a car or on a metro, sit at a desk, sit in meetings, sit on a sofa in the evening, and then lie down to sleep. Movement becomes a scheduled event — a gym class, a weekend run — rather than something woven through the day.

The physical consequences are significant and accumulate gradually, which is why they often go unnoticed until they become painful. Here is what prolonged sitting is doing to your body:

Your hip flexors shorten. When your hips are flexed at 90 degrees for hours on end, the muscles that create that position — your hip flexors — adapt by shortening. Tight hip flexors pull the pelvis forward, creating an anterior pelvic tilt that increases the curve in the lower back and contributes to chronic lower back pain.

Your glutes switch off. When you sit, your glutes are not working. Over time, they become inhibited — they stop firing effectively even when you stand and walk. This transfers load to structures that were not designed to carry it, including your knees, your lower back, and your hamstrings.

Your thoracic spine stiffens. Hours of forward-flexed posture at a screen round the upper back and compress the thoracic spine. This restricts shoulder movement, contributes to neck pain and headaches, and affects breathing mechanics.

The solution is not simply to exercise more, though exercise absolutely helps. It is to address the specific imbalances that sitting has created. At STAIRS, we assess postural patterns and design targeted programmes that reverse the damage — releasing what has shortened, strengthening what has switched off, and rebuilding movement quality from the ground up.

If you spend most of your day at a desk, a biomechanical assessment at STAIRS is one of the most useful things you can do for your long-term health. Come and find out exactly what sitting has done to your body — and what we can do about it.`,
  },
  {
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    date: "10",
    month: "Apr",
    featured: false,
    category: "Recovery",
    author: "STAIRS Team",
    readTime: "5 min read",
    title: "Recovery Is Training: Why Rest Days Are Not Wasted Days",
    excerpt:
      "The session you did yesterday only makes you stronger if your body has the time and resources to adapt. Recovery is not the absence of training — it is where the gains are made.",
    content: `There is a version of fitness culture that treats rest as weakness. It glorifies the six-day training week, the athlete who never misses a session, the mindset that says more is always better. At STAIRS, we work with enough athletes — and enough injured athletes — to know that this mindset causes more harm than it prevents.

Here is the simple physiology: when you train, you create micro-stress in your muscles, your connective tissues, and your nervous system. That stress is the stimulus for adaptation. But the adaptation itself — the strength gain, the aerobic improvement, the skill consolidation — happens during recovery, not during the training session. If you never fully recover, you never fully adapt. You just accumulate fatigue.

Sleep is the most powerful recovery tool available to any athlete, and it is completely free. During deep sleep, your body releases growth hormone, repairs damaged tissues, consolidates motor patterns, and restores the hormonal balance that training disrupts. Cutting sleep to train more is one of the most counterproductive things an athlete can do.

Nutrition in the recovery window matters. In the hour after training, your muscles are primed to absorb protein for repair and carbohydrates to replenish glycogen. Skipping post-training nutrition — or under-fuelling in general — significantly slows recovery and increases injury risk.

Active recovery is real recovery. A gentle walk, an easy swim, a yoga session, or a myofascial release treatment on a rest day keeps blood moving through tissues that need it without adding meaningful stress to a system that is already working to repair itself.

Mental recovery is part of the picture. The will to train is a resource that gets depleted. Chronic overtraining affects mood, motivation, and cognitive function. A true rest day — away from structured training and the pressure to perform — restores the psychological fuel that hard training burns through.

At STAIRS, recovery is built into every programme we design. We also offer dedicated recovery sessions — massage therapy, myofascial release, and mobility work — that accelerate the process. If your training has been consistent but your progress has plateaued, or if you feel flat and unmotivated despite doing everything right, recovery is almost certainly where the gap is. Come and speak to us.`,
  },
];

export default blogPosts;
