import type { Quiz } from '../types';

export const quizzes: Quiz[] = [
  // ============================================================
  // DEL-101: Advanced Overthinking 101
  // ============================================================
  {
    id: 'quiz-del-101',
    courseId: 'DEL-101',
    title: 'Advanced Overthinking 101 — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-del-101-1',
        text: 'They replied "k". What does this mean?',
        options: [
          'They are busy and responded quickly',
          'The relationship has entered its villain arc',
          'They are conserving mobile battery at 2%',
          'You should immediately write a 47-page analysis and three possible timelines',
        ],
        correctIndex: 1,
        feedback: [
          'Rookie analysis. "Busy" is never the correct answer in Delusion Studies.',
          'Correct. The single letter "k" is statistically equivalent to a restraining order. Excellent detection.',
          'Points for creativity, but we don\'t grade on pity here.',
          'This is technically what you will do. Marks for self-awareness, not methodology.',
        ],
      },
      {
        id: 'q-del-101-2',
        text: 'You sent a meme and they reacted with 😂. How many seconds do you spend analysing whether this means they find you genuinely funny or were just being polite?',
        options: [
          '0 seconds. It was just a reaction.',
          '30–60 seconds of mild consideration',
          '4–6 hours including a peer review of the meme quality',
          'You are still analysing it. The meme was sent in 2021.',
        ],
        correctIndex: 3,
        feedback: [
          'You do not belong in this department. Seek help of a different kind.',
          'Underdeveloped analytical response. Return to Week 1.',
          'Solid effort but insufficient time investment for advanced standing.',
          'Outstanding commitment. You are what this university was built for.',
        ],
      },
      {
        id: 'q-del-101-3',
        text: 'The correct academic term for a conversation you replay in your head but never had is:',
        options: [
          'A hallucination (medical term)',
          'An Imaginary Dialogue Unit (IDU)',
          'Internal Narrative Fiction (INF)',
          'A completely normal thing that everyone does',
        ],
        correctIndex: 1,
        feedback: [
          'Reductive and slightly concerning. Please see a different kind of professional.',
          'Correct. An IDU is the currency of the Department of Delusion Studies.',
          'Plausible but not the preferred terminology in our curriculum.',
          'It is, but that is not the point. We have to name it to study it.',
        ],
      },
      {
        id: 'q-del-101-4',
        text: 'It is 3:17am. You are wide awake. The most academically rigorous activity at this moment is:',
        options: [
          'Going to sleep immediately',
          'Logging the experience and returning to sleep',
          'Initiating the Advanced Midnight Overthinking Protocol on six separate emotional issues simultaneously',
          'Listening to a podcast until you pass out',
        ],
        correctIndex: 2,
        feedback: [
          'Responsible, but you clearly have not done the reading.',
          'Adequate but unambitious. Two stars.',
          'Outstanding. Six simultaneous emotional spirals is what distinguishes our top scholars.',
          'Only if the podcast is somehow about your problems.',
        ],
      },
      {
        id: 'q-del-101-5',
        text: 'You are in the shower. You begin replaying an argument from 2019. The correct response is to:',
        options: [
          'Recognise it as intrusive thought and redirect attention',
          'Win the argument. Finally. With better points. In your head.',
          'Acknowledge the memory and gently let it pass',
          'Get out of the shower. The overthinking is now unsafe.',
        ],
        correctIndex: 1,
        feedback: [
          'You may be in the wrong department.',
          'Correct. The shower is the only arena where you have home advantage. Use it.',
          'Spiritually sound. Academically inadequate.',
          'Arguably the most dramatic response. Points for commitment.',
        ],
      },
      {
        id: 'q-del-101-6',
        text: 'How many possible interpretations of the phrase "see you around" exist, according to the Delulu Framework™?',
        options: [
          '1 — it is a casual farewell',
          '12 — accounting for tone, context, and eye contact duration',
          '47 — the canonical number of possible interpretations for any ambiguous statement',
          'Infinite — interpretation is fractal',
        ],
        correctIndex: 2,
        feedback: [
          'Catastrophically underanalysed.',
          '12 is amateur-level analysis. You need more hours.',
          'Correct. 47 is the canonical number established in the Delulu Framework™. Always 47.',
          'Philosophically impressive but computationally impractical for fieldwork.',
        ],
      },
    ],
  },

  // ============================================================
  // UNP-101: Professional Procrastination
  // ============================================================
  {
    id: 'quiz-unp-101',
    courseId: 'UNP-101',
    title: 'Professional Procrastination — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-unp-101-1',
        text: 'Your assignment is due in 12 minutes. What is your optimal strategy?',
        options: [
          'Begin immediately and submit what you have',
          'Open YouTube for one final tutorial on the topic',
          'Create a comprehensive new productivity system that will prevent this next time',
          'Accept your fate and write the conclusion first because at least that exists',
        ],
        correctIndex: 3,
        feedback: [
          'You\'ve clearly never experienced true procrastination. This response is disqualifying.',
          'Classic. The tutorial will be 47 minutes long. Your awareness of this is academic progress.',
          'Outstanding commitment to the bit. The system will be abandoned in 36 hours.',
          'Correct. The conclusion-first methodology is peak deadline engineering.',
        ],
      },
      {
        id: 'q-unp-101-2',
        text: 'Define "productive procrastination" as a formal academic concept.',
        options: [
          'Working on important tasks in order of priority',
          'Completing low-value tasks to avoid high-value ones while maintaining the illusion of productivity',
          'Procrastinating efficiently, getting nothing done in record time',
          'A contradiction in terms with no academic merit',
        ],
        correctIndex: 1,
        feedback: [
          'That\'s just regular work. You may need to audit lower-level courses.',
          'Correct. Productive procrastination is the art of being visibly busy while accomplishing nothing relevant.',
          'Creative but incorrect. This is just procrastination, unmodified.',
          'Surprising take from someone sitting an exam on the topic.',
        ],
      },
      {
        id: 'q-unp-101-3',
        text: 'At what percentage complete should you begin panicking about an assignment?',
        options: [
          '0% — the moment it is assigned',
          '50% — the midpoint reflection panic',
          '95% — when you realise you\'ve been working on the wrong brief',
          '101% — after submission, when it\'s already too late',
        ],
        correctIndex: 3,
        feedback: [
          'Pre-emptive panic is anxiety, not procrastination. Please recalibrate.',
          'Midpoint reflection panic is a real stage but not the primary trigger.',
          '95% is for amateur procrastinators. True professionals wait for full completion.',
          'Correct. Post-submission panic is the purest form. Nothing can be done. Ideal.',
        ],
      },
      {
        id: 'q-unp-101-4',
        text: 'You have set seventeen alarms for 7am. It is now 11:43am. This demonstrates:',
        options: [
          'Poor time management and a need for support',
          'An optimistic relationship with your future self that has empirically never been justified',
          'Standard operating procedure for productivity culture participants',
          'All of the above, simultaneously',
        ],
        correctIndex: 3,
        feedback: [
          'Partially correct, but missing the philosophical dimension.',
          'Philosophically rich. But incomplete without the systemic context.',
          'Systemic but not personal enough.',
          'Correct. All three are simultaneously true and this is the advanced understanding.',
        ],
      },
      {
        id: 'q-unp-101-5',
        text: 'The scientific name for the phenomenon of cleaning your room instead of doing the actual task is:',
        options: [
          'Avoidance Behaviour (DSM terminology)',
          'Environmental Displacement Activity (EDA)',
          'Procrastination Laundering — the act of disguising avoidance as household virtue',
          'Being a responsible adult, actually',
        ],
        correctIndex: 2,
        feedback: [
          'Medically accurate but academically uninspired.',
          'Plausible. Not our preferred term but we\'ll accept it.',
          'Correct. Procrastination Laundering is the conversion of guilt into clean surfaces.',
          'The room was going to need cleaning eventually. This logic is why you failed last semester.',
        ],
      },
    ],
  },

  // ============================================================
  // RZZ-101: Quantum Rizz Mechanics
  // ============================================================
  {
    id: 'quiz-rzz-101',
    courseId: 'RZZ-101',
    title: 'Quantum Rizz Mechanics — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-rzz-101-1',
        text: 'Define "unspoken rizz."',
        options: [
          'A proven field of quantum physics with Nobel-level research behind it',
          'Charisma that allegedly exists without any observable or documented evidence',
          'A new programming language developed at MIT for social interaction modelling',
          'A GPU optimization technique for rendering high-polygon social situations',
        ],
        correctIndex: 1,
        feedback: [
          'Ambitious. Incorrect. Probably describes your rizz level.',
          'Correct. Unspoken rizz is charisma on faith — you either feel it or you don\'t, and neither party can explain it.',
          'Absolutely not, but interesting that this was your instinct.',
          'This is genuinely a creative answer and we respect the thought process.',
        ],
      },
      {
        id: 'q-rzz-101-2',
        text: 'According to Heisenberg\'s Rizz Principle, which of the following is impossible?',
        options: [
          'Simultaneously having rizz and being aware you have it',
          'Rizz existing in a two-dimensional social space',
          'Measuring rizz without changing it',
          'A and C simultaneously',
        ],
        correctIndex: 3,
        feedback: [
          'Partially correct. The self-awareness paradox is well-documented.',
          'Rizz is inherently multi-dimensional. This is Week 1 content.',
          'Partially correct. Observation changes the field.',
          'Correct. The Rizz Uncertainty Principle states you cannot simultaneously know your rizz and not affect it.',
        ],
      },
      {
        id: 'q-rzz-101-3',
        text: 'Two people in a situationship are described as "quantum entangled." This means:',
        options: [
          'They share a strong emotional bond based on meaningful communication',
          'The state of one person\'s emotional availability instantaneously affects the other, regardless of distance or logic',
          'They are in a stable and healthy romantic partnership',
          'They have matching energy for reasons neither can explain or control',
        ],
        correctIndex: 1,
        feedback: [
          'Communication is not present in a situationship. Incorrect on both counts.',
          'Correct. Situationship entanglement is non-local, non-consensual, and largely unexplained.',
          '"Stable" and "situationship" are mutually exclusive in academic literature.',
          'This is the colloquial answer. We require the technical one. Partial marks only.',
        ],
      },
      {
        id: 'q-rzz-101-4',
        text: 'Someone who "radiates rizz without trying" is exhibiting which phenomenon?',
        options: [
          'Spontaneous Charisma Emission (SCE)',
          'Passive Rizz Field Generation',
          'Ambient Aura Radiation',
          'Being naturally charismatic (non-academic explanation)',
        ],
        correctIndex: 1,
        feedback: [
          'Close. SCE requires active generation. Passive field generation is the correct classification.',
          'Correct. Passive Rizz Field Generation is the resting state of naturally charismatic individuals.',
          'Ambient Aura is a component, not the mechanism. Good thinking, wrong answer.',
          'You are not thinking with sufficient academic abstraction. Re-read the textbook.',
        ],
      },
      {
        id: 'q-rzz-101-5',
        text: 'What is the correct unit of measurement for rizz?',
        options: [
          'Rizz has no measurable unit, which is the point',
          'Joules (energy-based measurement)',
          'The Sigma (σ) — one standard deviation above baseline charisma',
          'Followers (digital-era proxy measurement)',
        ],
        correctIndex: 2,
        feedback: [
          'Philosophically consistent but academically useless.',
          'Energy-based measurement is a common mistake. Rizz is field-based, not energy-based.',
          'Correct. The Sigma (σ) is the canonical unit, with average rizz at 0σ and legendary rizz at 3σ+.',
          'Followers measure reach, not rizz. Influencers have proven this repeatedly.',
        ],
      },
      {
        id: 'q-rzz-101-6',
        text: 'You walk into a room and everyone turns to look. According to Rizz Field Theory, you have:',
        options: [
          'Made an entrance (social definition)',
          'Triggered an ambient field collapse — your Passive Rizz Field has exceeded the room\'s baseline',
          'Walked in too loudly',
          'Done something remarkable that you are now too self-conscious to repeat',
        ],
        correctIndex: 1,
        feedback: [
          'Colloquially acceptable. Academically insufficient.',
          'Correct. Field collapse is the technical term. The room adjusts to your presence. This is measurable.',
          'Possible, but we prefer the more flattering and academically interesting interpretation.',
          'The self-consciousness immediately drains the field. You understand the theory correctly.',
        ],
      },
    ],
  },

  // ============================================================
  // GRS-101: Introduction to Touching Grass
  // ============================================================
  {
    id: 'quiz-grs-101',
    courseId: 'GRS-101',
    title: 'Introduction to Touching Grass — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-grs-101-1',
        text: 'What is grass, technically?',
        options: [
          'A loading screen texture in video games',
          'Monocotyledonous plants of the family Poaceae, commonly found outside',
          'A green filter applied to outdoor photos',
          'Something you have heard of but not personally encountered',
        ],
        correctIndex: 1,
        feedback: [
          'This is not entirely wrong for some of our students. But it is wrong.',
          'Correct. Grass exists in nature, outdoors, where sunlight reaches.',
          'The filter exists because of the grass. Not the other way around.',
          'This is concerning but within the expected range for our demographic.',
        ],
      },
      {
        id: 'q-grs-101-2',
        text: 'The primary barrier preventing chronically online students from touching grass is:',
        options: [
          'Geographic inaccessibility to natural spaces',
          'The phone',
          'Seasonal weather conditions',
          'A structural sense that outdoor activities are somehow off-brand',
        ],
        correctIndex: 1,
        feedback: [
          'Parks are everywhere. This is not the barrier.',
          'Correct. The phone is always the answer. The phone is always the problem. Put it down.',
          'Weather is a secondary excuse. The phone remains primary.',
          'This is a real factor but it is ultimately caused by too much time online.',
        ],
      },
      {
        id: 'q-grs-101-3',
        text: 'Your first reaction upon touching grass for the first time this year is most likely to be:',
        options: [
          'A profound sense of connection with the natural world',
          'Immediately taking a photo to post about having touched grass',
          'A mild panic about what you might be missing on your phone',
          'Relief that the task is complete',
        ],
        correctIndex: 1,
        feedback: [
          'If so, you don\'t need this course. You\'re fine.',
          'Correct. The irony of documenting grass-touching for social media is the central paradox of this course.',
          'Also correct in spirit. But the phone is the action, not the thought.',
          'This is the student experience. You touch the grass, you\'ve done it, now what?',
        ],
      },
      {
        id: 'q-grs-101-4',
        text: 'True or false: "Going outside" and "touching grass" are the same activity.',
        options: [
          'True — being outside is sufficient',
          'False — touching grass requires physical contact with actual grass, not just leaving a building',
          'True — as long as you can see grass from where you are',
          'False — touching grass is a metaphor and cannot be literalised',
        ],
        correctIndex: 1,
        feedback: [
          'Incorrect. You can go outside and still be entirely on your phone.',
          'Correct. Contact is mandatory. Proximity is not enough.',
          'Viewing grass through a window is called "screen time" in this context.',
          'This course is explicitly literalising the metaphor. That is the point.',
        ],
      },
      {
        id: 'q-grs-101-5',
        text: 'Complete the sentence: "The recommended frequency of touching grass for a healthy chronically online student is ___."',
        options: [
          'Once per semester, documented and shared',
          'Daily, but we are not expecting daily',
          'Never — the grass will still be there tomorrow',
          'When the algorithm tells you to go outside',
        ],
        correctIndex: 1,
        feedback: [
          'The documentation requirement undermines the spirit of the exercise.',
          'Correct. Daily is ideal. We know the reality. The gap between these is the curriculum.',
          'This is the problem. Tomorrow becomes next week becomes a lifestyle.',
          'The algorithm will never tell you to go outside. It wants you inside, scrolling.',
        ],
      },
    ],
  },

  // ============================================================
  // BRT-101: Skibidi Linguistics
  // ============================================================
  {
    id: 'quiz-brt-101',
    courseId: 'BRT-101',
    title: 'Skibidi Linguistics — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-brt-101-1',
        text: 'The term "sigma" originally referred to what before entering internet culture?',
        options: [
          'The eighteenth letter of the Greek alphabet, used in mathematics and science',
          'A social media platform that failed in 2018',
          'A personality classification in a viral Reddit thread about wolves',
          'A financial instrument related to volatility measurement',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Sigma (Σ/σ) is a Greek letter used in statistics (standard deviation), mathematics, and science, before internet culture adopted it as a personality archetype.',
          'This platform does not exist. A mark for creativity.',
          'The wolf pack hierarchy meme existed, but sigma came from the Greek letter, not the Reddit thread.',
          'Standard deviation in finance uses sigma, but this is a partial answer, not the primary origin.',
        ],
      },
      {
        id: 'q-brt-101-2',
        text: 'In linguistic terms, what is "semantic drift" as demonstrated by the word "rizz"?',
        options: [
          'When a word moves from one language to another',
          'When a word\'s meaning shifts over time through social usage',
          'When a word is deliberately invented for marketing purposes',
          'When two words merge into a portmanteau',
        ],
        correctIndex: 1,
        feedback: [
          'That\'s loanword adoption, not semantic drift.',
          'Correct. Semantic drift occurs when a word\'s meaning changes through cultural usage. "Rizz" shifted from slang to an officially recognised word in major dictionaries.',
          'Neologisms are related but distinct. Semantic drift is about meaning change, not origin.',
          'Portmanteau formation is a separate linguistic phenomenon.',
        ],
      },
      {
        id: 'q-brt-101-3',
        text: 'The "lifecycle of a meme word" typically follows which sequence?',
        options: [
          'Origin → Peak usage → Mainstream adoption → Cringe → Ironic revival',
          'Mainstream adoption → Peak usage → Origin → Cringe',
          'Cringe → Peak usage → Origin → Revival',
          'Origin → Cringe → Mainstream adoption → Revival',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. This is the canonical lifecycle. Origin (niche community) → Peak → Mainstream (parents learn it) → Cringe (because parents learned it) → Ironic revival (using it because it\'s cringe).',
          'Mainstream adoption cannot precede peak usage. Incorrect ordering.',
          'Cringe cannot precede origin. This is backwards.',
          'Cringe cannot precede mainstream. You\'ve skipped the critical stage.',
        ],
      },
      {
        id: 'q-brt-101-4',
        text: 'A peer-reviewed paper on internet linguistics uses the phrase "no cap" in its abstract. This represents:',
        options: [
          'A methodological error that invalidates the research',
          'An innovative and brave stylistic choice by a forward-thinking academic',
          'The exact moment academia decided to stop fighting and join the timeline',
          'Standard academic language that is more recent than you think',
        ],
        correctIndex: 2,
        feedback: [
          'Some journals disagree. A few don\'t.',
          'Brave is one word for it.',
          'Correct. Academia has been slowly absorbing internet language for a decade. "No cap" in an abstract is simply where we are now as a civilization.',
          '"No cap" was added to Merriam-Webster but is not standard in formal academic writing. Yet.',
        ],
      },
      {
        id: 'q-brt-101-5',
        text: 'What is the "chronically online" hypothesis in sociolinguistics?',
        options: [
          'The theory that internet users develop distinct linguistic patterns that diverge from offline speech',
          'The clinical diagnosis of excessive internet use with linguistic symptoms',
          'A conspiracy theory about social media platforms changing language deliberately',
          'The idea that online language will eventually fully replace offline speech',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Extended online exposure creates distinct vocabulary, syntax patterns, and communicative norms that differ from, and increasingly influence, offline speech.',
          'Related to digital dependency research, not a linguistics hypothesis specifically.',
          'Platforms do study language effects but this is not the chronically online hypothesis.',
          'Influence, not replacement. The hypothesis is about divergence, not extinction.',
        ],
      },
    ],
  },

  // ============================================================
  // DEL-201: Applied Delusion Engineering
  // ============================================================
  {
    id: 'quiz-del-201',
    courseId: 'DEL-201',
    title: 'Applied Delusion Engineering — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-del-201-1',
        text: 'You have manifested a promotion without applying for any jobs. Your progress report should read:',
        options: [
          'No progress — manifestation requires complementary action',
          'Advanced progress — the universe is processing your request',
          'Excellent progress — you have correctly identified that wanting it is sufficient',
          'Moderate progress — you have visualised the outcome but have not yet changed your screensaver to represent it',
        ],
        correctIndex: 1,
        feedback: [
          'Technically correct but you will not get marks in this department for being technically correct.',
          'Correct. The universe has a 4–6 week processing time. Standard.',
          'Wanting it is a necessary but not sufficient condition in the Delusion Framework. You also need to tell people about it.',
          'The screensaver step is actually mandatory in advanced practice. Partial marks.',
        ],
      },
      {
        id: 'q-del-201-2',
        text: '"I\'m that girl" syndrome (clinical term: Applied Protagonist Activation Disorder) is best characterised by:',
        options: [
          'Evidence-based self-improvement with measurable progress',
          'A five-day obsessive routine that collapses on the sixth day but was genuinely iconic',
          'Sustained daily habits over a six-month period',
          'A lifestyle brand deal that was never secured',
        ],
        correctIndex: 1,
        feedback: [
          'Evidence-based improvement is not within the scope of this department.',
          'Correct. Five days of immaculate routine, then return to the original state. The routine, however, was cinematic.',
          'Six months is aspirational. Week 2 is statistically more accurate.',
          'The lifestyle brand exists only in the vision board. It is still valid.',
        ],
      },
      {
        id: 'q-del-201-3',
        text: 'The Reality Distortion Field (RDF) theory suggests that sufficiently delusional confidence can:',
        options: [
          'Create actual outcomes through pure psychological force',
          'Convince others of competence that does not yet exist, creating opportunities that competence then has to keep up with',
          'Distort space and time at a quantum level',
          'Protect you from consequences you deserve',
        ],
        correctIndex: 1,
        feedback: [
          'Delusion cannot create physical outcomes. That\'s manifestation, a related but distinct field.',
          'Correct. The RDF works by securing opportunities first, then racing to develop the actual skills required. It is terrifying and sometimes it works.',
          'This is only applicable in extreme sigma cases. Not peer-reviewed.',
          'Consequences are deferred, not distorted. There is a distinction.',
        ],
      },
    ],
  },

  // ============================================================
  // DEL-301: Situationship Economics
  // ============================================================
  {
    id: 'quiz-del-301',
    courseId: 'DEL-301',
    title: 'Situationship Economics — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-del-301-1',
        text: 'In classical economics, the "sunk cost fallacy" refers to continuing an investment because of past investment. In situationship economics, the equivalent is:',
        options: [
          'Leaving a situationship after two weeks when it shows no signs of progression',
          'Staying in a situationship for eighteen months because of "all the good memories," three decent dates, and one really meaningful conversation in a parking lot',
          'Refusing to enter a situationship due to risk-averse emotional portfolio management',
          'Dating multiple people simultaneously to hedge situationship risk',
        ],
        correctIndex: 1,
        feedback: [
          'Two weeks is barely a down payment. You have not reached sunk cost territory.',
          'Correct. Eighteen months, three dates, one parking-lot conversation. This is the canonical sunk cost situationship.',
          'Emotional risk aversion is not within the scope of this course.',
          'Portfolio diversification is covered in a separate elective.',
        ],
      },
      {
        id: 'q-del-301-2',
        text: 'The double read-receipt indicator (blue ticks, no reply) represents which economic concept?',
        options: [
          'Market failure — the message was delivered but communication broke down',
          'Negative externalities — your emotional investment has costs borne by a third party',
          'Supply chain disruption — their emotional availability is temporarily unavailable',
          'The Veblen good paradox — the more they ignore you, the more you want them',
        ],
        correctIndex: 3,
        feedback: [
          'Market failure requires a functioning market to fail. Situationships are pre-market.',
          'The third party in this metaphor does not exist.',
          'Temporarily is doing a lot of work in this answer.',
          'Correct. The Veblen effect in situationship economics: inaccessibility increases perceived value, despite the absence of inherent value.',
        ],
      },
      {
        id: 'q-del-301-3',
        text: '"Not putting labels on it" represents which economic equilibrium?',
        options: [
          'A Nash Equilibrium where neither party wants to be the first to define the relationship',
          'A Pareto optimal outcome where both parties benefit equally',
          'Market saturation — too many situationships in circulation',
          'Monopolistic competition — exclusive without being exclusive',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Nash Equilibrium — neither party will unilaterally define the relationship because doing so risks worse outcomes (rejection, confrontation). Both lose, but equally.',
          'Pareto optimality requires that no one can be made better off without making the other worse. Situationships make everyone worse off eventually.',
          'Market saturation is a macro concern. This is micro-level analysis.',
          'Monopolistic competition is valid but Nash Equilibrium is the better technical term here.',
        ],
      },
    ],
  },

  // ============================================================
  // DEL-401: Imaginary Conversation Theory
  // ============================================================
  {
    id: 'quiz-del-401',
    courseId: 'DEL-401',
    title: 'Imaginary Conversation Theory — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-del-401-1',
        text: 'The "retrospective comeback" is defined as a perfect response that occurs how long after the actual conversation?',
        options: [
          'Within 30 seconds — the optimal window',
          '2–6 hours — shower window',
          '3–7 days — sufficient time to fully understand what you should have said',
          'Never — the perfect comeback does not exist in real time',
        ],
        correctIndex: 2,
        feedback: [
          '30 seconds is the l\'esprit de l\'escalier — you\'ve thought of it too soon. It is too real.',
          'The shower window is the classic venue. But full clarity takes longer.',
          'Correct. 3–7 days is when the perfect comeback crystallises, having been refined by time, distance, and the inability to deliver it.',
          'Technically true but nihilistic. This is not what we are teaching.',
        ],
      },
      {
        id: 'q-del-401-2',
        text: 'In Imaginary Conversation Theory, "pre-argument architecture" refers to:',
        options: [
          'Preparing your points before a real scheduled debate',
          'Designing and rehearsing all sides of an argument with a person who does not know the argument is happening',
          'Writing a draft message that you delete before sending',
          'The structural layout of a written complaint letter',
        ],
        correctIndex: 1,
        feedback: [
          'Pre-argument for a real debate is just preparation. Not our field.',
          'Correct. Pre-argument architecture involves casting all roles in the imaginary dialogue, scripting optimal responses, and maintaining the delusion that this is useful.',
          'The draft message is a sub-category: "pre-response architecture."',
          'Complaint letters are a related applied skill, not the core theory.',
        ],
      },
      {
        id: 'q-del-401-3',
        text: 'How many distinct parties can exist in a single imaginary dialogue?',
        options: [
          '2 — you and the other person',
          '3 — you, the other person, and the version of you that responds perfectly',
          'Unlimited — the dialogue can expand to include any number of imagined parties',
          '1 — it is ultimately always just you',
        ],
        correctIndex: 2,
        feedback: [
          'The basic model has 2. Advanced practitioners populate the room.',
          '3 is the standard configuration. But the jury, the witness, and the judge can also appear.',
          'Correct. Advanced practitioners include audiences, supporting characters, and sometimes historical figures for rhetorical weight.',
          'Philosophically compelling and partially correct. But it doesn\'t get you the marks.',
        ],
      },
    ],
  },

  // ============================================================
  // DEL-501: Main Character Syndrome
  // ============================================================
  {
    id: 'quiz-del-501',
    courseId: 'DEL-501',
    title: 'Main Character Syndrome — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-del-501-1',
        text: 'You are walking to a coffee shop. What is the cinematically appropriate internal experience?',
        options: [
          'Nothing — it is a walk to get coffee',
          'Mild awareness of your surroundings',
          'A slow-motion internal monologue with thematic music, meaningful glances, and the sense that this moment is pivotal in your narrative arc',
          'Focused navigation — you do not want to be late',
        ],
        correctIndex: 2,
        feedback: [
          'You do not have the syndrome. This is either healthy or a different kind of problem.',
          'Mild awareness is NPC-level engagement with your own life.',
          'Correct. Every coffee walk is either a character development moment or a plot-advancing scene. Never just a walk.',
          'Being late is narratively interesting. Punctuality has no cinematic value.',
        ],
      },
      {
        id: 'q-del-501-2',
        text: 'A stranger makes accidental eye contact with you on public transport. As the main character, this represents:',
        options: [
          'A brief coincidence with no narrative significance',
          'A potential supporting character introduction or foreshadowing of a future plot point',
          'An invasion of personal space',
          'The beginning of a meet-cute that you will never follow up on',
        ],
        correctIndex: 1,
        feedback: [
          'No coincidences in the main character\'s narrative. Nothing is without significance.',
          'Correct. Every stranger is either a supporting character, a foil, or narrative foreshadowing. They do not exist randomly.',
          'Personal space is for people who don\'t see themselves as protagonists.',
          'Also technically correct for a specific main character sub-genre.',
        ],
      },
      {
        id: 'q-del-501-3',
        text: 'The "character development moment" distinction is: something that changes you versus something that ___.',
        options: [
          'Stays the same as before',
          'Confirms what you already believed about yourself while feeling transformative',
          'Happens to someone else but affects you tangentially',
          'Is caused by external forces beyond your control',
        ],
        correctIndex: 1,
        feedback: [
          'If nothing changes, it is filler, not development.',
          'Correct. Most "character development moments" for people with Main Character Syndrome confirm the existing narrative rather than changing it. The epiphany was already there. You just found a dramatic backdrop.',
          'Tangential development is a side character experience.',
          'External forces are the inciting incident, not the development itself.',
        ],
      },
    ],
  },

  // ============================================================
  // UNP-201: Advanced Bed Rotting
  // ============================================================
  {
    id: 'quiz-unp-201',
    courseId: 'UNP-201',
    title: 'Advanced Bed Rotting — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-unp-201-1',
        text: 'The philosophically optimal bed rotting duration is:',
        options: [
          'Under 2 hours — a power nap',
          '4–8 hours — a full recovery session',
          'An amount of time after which you lose track of whether it is day or night',
          'Whatever the algorithm feeds you, because you have surrendered control of time',
        ],
        correctIndex: 2,
        feedback: [
          'Two hours is a brief intermission. Not a rot.',
          'This is sleep recovery. Advanced Bed Rotting is different from napping.',
          'Correct. True bed rotting is characterised by temporal disorientation. When you next eat, you are unsure if it is lunch, dinner, or a new breakfast.',
          'Surrendering to the algorithm is a valid co-rotting technique but not the definitional measure.',
        ],
      },
      {
        id: 'q-unp-201-2',
        text: 'Justify the phrase "I\'m just recharging" to someone questioning your bed rotting.',
        options: [
          'You cannot justify it. This is a valid critique.',
          'Humans require recovery time. Bed rotting is unstructured recovery from the demands of performing as a functional person.',
          'You are manifesting. It counts as productivity.',
          'You are simply responding to a cellular-level need for stillness, which evolutionary biology supports.',
        ],
        correctIndex: 1,
        feedback: [
          'You will not score well in this department with this level of accountability.',
          'Correct. The "recharging" justification draws on legitimate recovery science and applies it broadly and somewhat liberally.',
          'Manifesting while horizontal is an advanced technique. Do not conflate.',
          'Evolutionary biology can be invoked, but "cellular-level need" is pushing the scientific basis further than it supports.',
        ],
      },
      {
        id: 'q-unp-201-3',
        text: 'The rot-to-productivity pipeline is best described as:',
        options: [
          'A direct causal path from rest to output',
          'A theoretical construct that is cited frequently but observed rarely',
          'The moment at which sufficient rotting generates the guilt required to produce minimal output',
          'Something that does not exist',
        ],
        correctIndex: 2,
        feedback: [
          'Direct causation is aspirational. The pipeline runs through guilt.',
          'It exists. It is just guilt-mediated.',
          'Correct. The pipeline runs: rot → accumulation of guilt → guilt becomes productive discomfort → minimal output, briefly, before the cycle resets.',
          'It exists. You have probably experienced it at 11pm on a day you wasted.',
        ],
      },
    ],
  },

  // ============================================================
  // UNP-301: Deadline Speedrunning
  // ============================================================
  {
    id: 'quiz-unp-301',
    courseId: 'UNP-301',
    title: 'Deadline Speedrunning — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-unp-301-1',
        text: 'The ideal opening line of a twelve-minute essay is:',
        options: [
          'A carefully considered thesis statement with supporting preview',
          '"Throughout history, many scholars have..." — the universal buffer',
          'The conclusion, restated as an introduction, so you can skip back to it at the end',
          'Your name, the date, and then scroll down to see how many words that bought you',
        ],
        correctIndex: 2,
        feedback: [
          'You have twelve minutes. Carefully considered is not on the schedule.',
          'Classic. Works every time. Not the best answer for this specific question.',
          'Correct. The conclusion-first methodology in time-critical writing creates a structural loop that technically fulfils the introduction-body-conclusion requirement with forty percent of the actual content.',
          'The header word count strategy is a supplementary technique, not the opening move.',
        ],
      },
      {
        id: 'q-unp-301-2',
        text: 'What role does caffeine play in Deadline Speedrunning methodology?',
        options: [
          'A controlled substance to be consumed responsibly throughout the day',
          'A performance-enhancing drug consumed in crisis quantities at inappropriate hours',
          'A ritual element with more psychological than physiological function at this stage',
          'B and C are simultaneously true and this is the advanced understanding',
        ],
        correctIndex: 3,
        feedback: [
          'Responsible consumption is not the Speedrunning paradigm.',
          'Physiologically accurate but incomplete.',
          'The ritual element is real but so is the stimulant effect.',
          'Correct. At 3am with a deadline in two hours, caffeine is simultaneously pharmaceutical and ceremonial.',
        ],
      },
      {
        id: 'q-unp-301-3',
        text: 'After submitting a crisis-written piece, the most accurate self-assessment is:',
        options: [
          '"This is not my best work."',
          '"I work better under pressure. This might actually be great."',
          '"I will never let this happen again."',
          'B and C simultaneously, and you believe both with equal conviction for approximately 11 minutes',
        ],
        correctIndex: 3,
        feedback: [
          'Accurate but incomplete.',
          'A classic narrative. Occasionally true. Usually not.',
          'The vow lasts until the next assignment.',
          'Correct. Both beliefs coexist in the post-submission state. The cycle begins again within the hour.',
        ],
      },
    ],
  },

  // ============================================================
  // UNP-401: The Art of Doing Absolutely Nothing
  // ============================================================
  {
    id: 'quiz-unp-401',
    courseId: 'UNP-401',
    title: 'The Art of Doing Absolutely Nothing — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-unp-401-1',
        text: 'What distinguishes "doing nothing" from "being lazy"?',
        options: [
          'Nothing — they are the same',
          'Intentionality — "doing nothing" is a chosen state, while laziness is default inertia',
          'The presence of a productivity podcast playing in the background',
          'Whether you feel guilty about it',
        ],
        correctIndex: 1,
        feedback: [
          'The distinction exists. This course exists because of it.',
          'Correct. Intentional nothingness is a philosophical position. Laziness is the absence of intention. The difference is awareness and choice.',
          'Passive consumption negates the nothingness. You are not doing nothing if you are consuming.',
          'Guilt is a confounding variable. The intentional quality is the definitional distinction.',
        ],
      },
      {
        id: 'q-unp-401-2',
        text: 'The Japanese concept of "ma" (間) refers to:',
        options: [
          'The pause or negative space between things — a concept related to intentional nothingness',
          'A type of meditation that involves physical stillness',
          'The word for "mother" which is irrelevant here but you knew that',
          'A Japanese productivity framework',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Ma (間) is the Japanese concept of negative space — the meaningful pause, the silence, the gap. It is the culturally sophisticated cousin of Doing Absolutely Nothing.',
          'Related but different. Meditation is purposive. Ma is descriptive.',
          'It is. But "ma" also means negative space. Both are true. Only one is relevant.',
          'Productivity is the opposite of this course\'s philosophy.',
        ],
      },
      {
        id: 'q-unp-401-3',
        text: 'The final project for this course is:',
        options: [
          'A 2000-word reflection on the experience of doing nothing',
          'Nothing — submission of nothing receives full marks',
          'A curated presentation of your most intentional moments of nothingness',
          'An interview about your philosophy of inactivity',
        ],
        correctIndex: 1,
        feedback: [
          'A reflective essay about nothing is still doing something. Contradictory.',
          'Correct. The only appropriate final project for this course is nothing. This is not laziness. It is consistent application of the curriculum.',
          'Curation implies effort. Effort contradicts the module.',
          'Speaking is doing. This misses the point.',
        ],
      },
    ],
  },

  // ============================================================
  // UNP-501: Academic Comeback Theory
  // ============================================================
  {
    id: 'quiz-unp-501',
    courseId: 'UNP-501',
    title: 'Academic Comeback Theory — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-unp-501-1',
        text: 'The "fresh start effect" in behavioural science states that people are more likely to pursue goals at temporal landmarks (Monday, New Year, semester start). In practice, this means:',
        options: [
          'Monday is the most productive day of the week',
          'Goal pursuit is systematically delayed to the next available temporal landmark',
          'New Year\'s resolutions are effective if maintained for at least 3 weeks',
          'People are naturally more motivated at the start of things',
        ],
        correctIndex: 1,
        feedback: [
          'Monday is the most planned day. Productivity is another matter.',
          'Correct. The fresh start effect explains why students who fail on Wednesday wait until Monday to try again, rather than Thursday.',
          'Three weeks is the average resolution duration. The effect enables them, it does not sustain them.',
          'Motivation spikes at landmarks, then returns to baseline. The spike is real, the follow-through is not guaranteed.',
        ],
      },
      {
        id: 'q-unp-501-2',
        text: 'You have downloaded Notion for the fifth time. This indicates:',
        options: [
          'A genuine commitment to organisational improvement',
          'The app is good enough to keep downloading',
          'The tool has become a ritual substitute for the actual behaviour it is meant to support',
          'You deleted it four times, which means your standards are high',
        ],
        correctIndex: 2,
        feedback: [
          'Fifth download suggests the previous four did not produce the intended commitment.',
          'The app is fine. The pattern is the issue.',
          'Correct. The app download is the ritual of beginning — it feels like progress while requiring none. The behaviour remains unchanged.',
          'Standards for the app, not for yourself. That is a different thing.',
        ],
      },
      {
        id: 'q-unp-501-3',
        text: 'The Academic Comeback concludes successfully when:',
        options: [
          'You achieve your stated academic goals',
          'You sustain the new habits for at least six months',
          'It does not — the comeback is the point, not the destination',
          'You tell at least three people about it',
        ],
        correctIndex: 2,
        feedback: [
          'Goal achievement is rare but not impossible. For academic purposes, we study the pattern, not the exception.',
          'Six months is beyond the scope of this course\'s documented cases.',
          'Correct. The comeback narrative is cyclical. The story of trying again is the story, not the success. We document it, not defeat it.',
          'The audience does not determine the outcome. Though it does affect the performance.',
        ],
      },
    ],
  },

  // ============================================================
  // RZZ-201: Introduction to Unspoken Rizz
  // ============================================================
  {
    id: 'quiz-rzz-201',
    courseId: 'RZZ-201',
    title: 'Introduction to Unspoken Rizz — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-rzz-201-1',
        text: 'The correct duration of initial eye contact that signals confidence rather than aggression is:',
        options: [
          '0.5–1 seconds — brief acknowledgement',
          '2–4 seconds — the confident window',
          '6+ seconds — sustained dominance gaze',
          'Whatever feels natural, because eye contact theory is pseudoscience',
        ],
        correctIndex: 1,
        feedback: [
          'Too brief. Subcommunicates avoidance.',
          'Correct. 2–4 seconds is the confident window. Beyond that, you enter the uncanny valley of eye contact.',
          '6+ seconds is territory. Not rizz.',
          'Functional but you will not pass the exam with this.',
        ],
      },
      {
        id: 'q-rzz-201-2',
        text: 'Posture that communicates high rizz is characterised by:',
        options: [
          'Maximally erect spine and squared shoulders at all times',
          'Relaxed, open, and taking up appropriate space without encroaching',
          'Leaning forward aggressively to demonstrate engagement',
          'Whatever your natural posture is, because authenticity matters most',
        ],
        correctIndex: 1,
        feedback: [
          'Maximally erect suggests effort and rigidity. Rizz is effortless.',
          'Correct. Relaxed, open posture communicates security. Security communicates rizz. The chain holds.',
          'Aggressive lean violates the space that rizz requires.',
          'If your natural posture communicates security, yes. If not, we suggest adjustment.',
        ],
      },
      {
        id: 'q-rzz-201-3',
        text: 'Strategic silence in conversation serves what function in unspoken rizz theory?',
        options: [
          'It creates awkwardness that breaks rapport',
          'It communicates that you are comfortable with ambiguity and do not need to fill space',
          'It gives you time to think of what to say next',
          'It is always a mistake and should be avoided',
        ],
        correctIndex: 1,
        feedback: [
          'Only uncomfortable silence is awkward. Strategic silence is charged.',
          'Correct. The ability to sit comfortably in silence signals social security — a core component of unspoken rizz.',
          'Thinking is a secondary benefit. The primary function is communicating calm.',
          'This answer would fail you in Week 3. Silence is a tool.',
        ],
      },
    ],
  },

  // ============================================================
  // RZZ-301: Advanced NPC Detection
  // ============================================================
  {
    id: 'quiz-rzz-301',
    courseId: 'RZZ-301',
    title: 'Advanced NPC Detection — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-rzz-301-1',
        text: 'The defining characteristic of a conversational NPC is:',
        options: [
          'They are quiet and do not speak much',
          'They repeat the same conversational patterns regardless of context or prompt variation',
          'They are boring',
          'They lack confidence in social settings',
        ],
        correctIndex: 1,
        feedback: [
          'Quiet people may have high interior processing. Not NPC territory.',
          'Correct. The NPC is defined by conversational scripting — the same responses, the same observations, the same jokes, regardless of the evolving context.',
          '"Boring" is the subjective experience. Scripted repetition is the mechanism.',
          'Shyness is not NPC behaviour. Shyness has self-awareness. NPCs don\'t.',
        ],
      },
      {
        id: 'q-rzz-301-2',
        text: 'The most advanced form of NPC is:',
        options: [
          'Someone who agrees with everything',
          'Someone who disagrees with everything on principle',
          'Someone who performs uniqueness through scripted individuality',
          'Someone who is completely silent',
        ],
        correctIndex: 2,
        feedback: [
          'Agreement NPCs are common. Not the highest level.',
          'Contrarianism is a script. A specific type of NPC.',
          'Correct. The peak NPC believes themselves to be a unique individual while executing a predictable performance of individuality. They are, paradoxically, the most scripted.',
          'Silence is ambiguous. Could be depth. Could be nothing.',
        ],
      },
      {
        id: 'q-rzz-301-3',
        text: 'After completing this course, students are warned that:',
        options: [
          'NPC detection is not a real skill and this course is satirical',
          'Seeing NPCs everywhere is a sign of high social intelligence',
          'Seeing everyone as NPCs is a symptom of the same pattern-reductive thinking you are studying',
          'NPC detection skill grants social superiority',
        ],
        correctIndex: 2,
        feedback: [
          'The satirical frame does not eliminate the real insight about scripted social behaviour.',
          'It may be. It may also be a sign of something else.',
          'Correct. The ultimate lesson is that pattern-reducing others to NPCs is itself a cognitive script. The irony is the point of the course.',
          'Social superiority is not a real outcome. Social awareness, maybe.',
        ],
      },
    ],
  },

  // ============================================================
  // RZZ-401: Aura Conservation Theory
  // ============================================================
  {
    id: 'quiz-rzz-401',
    courseId: 'RZZ-401',
    title: 'Aura Conservation Theory — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-rzz-401-1',
        text: 'According to the First Law of Aura Conservation, aura can be:',
        options: [
          'Created through consistent effort over time',
          'Destroyed permanently by a single embarrassing event',
          'Transferred between individuals in social interactions, but not created or destroyed on net',
          'Measured objectively using standardised instruments',
        ],
        correctIndex: 2,
        feedback: [
          'Aura can be amplified through effort but not created from nothing.',
          'A single embarrassing event can reduce aura but the First Law holds — it transfers to observers. Your loss is their gain.',
          'Correct. Aura obeys a conservation principle — social interactions redistribute it rather than creating or destroying it on aggregate.',
          'Standardised measurement remains an open research problem in our department.',
        ],
      },
      {
        id: 'q-rzz-401-2',
        text: 'The half-life of a good impression is:',
        options: [
          'Indefinite — first impressions are permanent',
          'Context-dependent, but generally around 2–3 subsequent interactions',
          'Instant — impressions decay the moment they are made',
          'Determined by how often you are thought about in their absence',
        ],
        correctIndex: 3,
        feedback: [
          'Impressions fade. First impressions anchor but do not hold forever.',
          'The 2–3 interaction model is a useful approximation. Not the most precise answer.',
          'If impressions decayed instantly, social memory would be impossible.',
          'Correct. The persistence of an impression is maintained by recollection. If they think about you between interactions, the impression is alive. This is the advanced understanding.',
        ],
      },
      {
        id: 'q-rzz-401-3',
        text: 'The optimal strategy for aura recovery after a public L is:',
        options: [
          'Immediately and publicly addressing the L with self-deprecating humour',
          'Avoiding all social situations until the incident is statistically forgotten',
          'Returning to the same social environment with elevated energy as if nothing happened',
          'Changing your name and moving to a new city',
        ],
        correctIndex: 2,
        feedback: [
          'Effective if executed well. Risky if timing is off.',
          'Avoidance extends the aura deficit by removing all positive interactions.',
          'Correct. The classic aura recovery protocol is re-entry with elevated energy. The contrast between the L and the recovery becomes the narrative. Redemption arcs exist.',
          'Not recommended for anything under a 7/10 L.',
        ],
      },
    ],
  },

  // ============================================================
  // RZZ-501: Social Interaction Survival
  // ============================================================
  {
    id: 'quiz-rzz-501',
    courseId: 'RZZ-501',
    title: 'Social Interaction Survival — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-rzz-501-1',
        text: 'The most effective small talk opening for a chronically online student is:',
        options: [
          '"So what do you do?" — classic professional opener',
          '"How are you?" — a greeting, not a question',
          '"Did you see the thing?" — ambiguous but high-engagement',
          'A specific observation about the shared context you are both in',
        ],
        correctIndex: 3,
        feedback: [
          'Slightly interrogative. Works in professional contexts only.',
          '"How are you" is a ritual phrase. Neither party expects a real answer.',
          '"The thing" only works if they know what thing. High risk.',
          'Correct. Shared context observations require no common knowledge and invite naturally expanding responses.',
        ],
      },
      {
        id: 'q-rzz-501-2',
        text: 'The correct way to leave a party conversation is:',
        options: [
          'Just walk away when you find a natural pause',
          'Say "I\'ll let you go" and create a false sense of mutual conclusion',
          'Cite a reason — drink refill, bathroom, someone you have to speak to',
          'Keep making exit noises until one finally lands',
        ],
        correctIndex: 2,
        feedback: [
          'Abrupt exits are sometimes the cleanest. Also sometimes catastrophic.',
          '"I\'ll let you go" is polite but transparent. The ceding is one-sided.',
          'Correct. The cited reason provides mutual cover — they are not being abandoned, you are being directed.',
          'The multiple-exit phenomenon is real and studied. But it is not the optimal strategy.',
        ],
      },
      {
        id: 'q-rzz-501-3',
        text: 'You have been introduced to someone whose name you immediately forgot. The correct response is:',
        options: [
          'Immediately admit you forgot and ask again — honesty is best',
          'Never use their name and hope the issue resolves itself',
          'Use the introduction context to your advantage — "How do you know [mutual contact]?" — buy time',
          'Introduce them to a third person incorrectly, forcing them to correct you',
        ],
        correctIndex: 2,
        feedback: [
          'Functionally fine. Socially slightly deflating for the other person.',
          'This works until they introduce you to someone else and you must introduce them.',
          'Correct. Context-buying questions are the most elegant solution — they engage, extend, and give you time.',
          'This is the nuclear option. Occasionally works. Permanently risky.',
        ],
      },
    ],
  },

  // ============================================================
  // GRS-201: Outdoor Survival
  // ============================================================
  {
    id: 'quiz-grs-201',
    courseId: 'GRS-201',
    title: 'Outdoor Survival for Chronically Online Students — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-grs-201-1',
        text: 'The sky is grey and overcast. Without using your phone, you determine it will probably:',
        options: [
          'Be clear by afternoon — grey mornings often clear',
          'Rain — overcast skies with low-hanging clouds typically indicate precipitation',
          'Stay the same — weather is unpredictable without data',
          'Snow — all bad weather leads to snow if you\'re wearing the wrong shoes',
        ],
        correctIndex: 1,
        feedback: [
          'This is optimism, not meteorology.',
          'Correct. Low grey cloud cover is a reliable visual indicator of imminent precipitation. This is knowledge that existed before weather apps.',
          'Unpredictable at micro-level but pattern-observable at macro-level. You can make a reasonable call.',
          'Snow requires specific temperature conditions. Wrong shoes are a separate issue.',
        ],
      },
      {
        id: 'q-grs-201-2',
        text: 'You are lost and your phone has died. The first step is:',
        options: [
          'Panic — this is the appropriate response',
          'Stay where you are and wait',
          'Look for landmarks and establish your approximate location',
          'Ask someone — other humans often know where things are',
        ],
        correctIndex: 3,
        feedback: [
          'Panic is a natural first step. Not the recommended one.',
          'Staying put is the wilderness survival rule. Urban or suburban environments have a better option.',
          'Landmark navigation is effective but slower than the available alternative.',
          'Correct. Other humans are present and knowledgeable about their environment. This is the fastest solution.',
        ],
      },
      {
        id: 'q-grs-201-3',
        text: 'A stranger greets you on the street. The correct response is:',
        options: [
          'Ignore and continue walking — stranger danger',
          'Acknowledge and respond briefly and positively',
          'Check if they are following you',
          'Immediately rate the interaction on Yelp',
        ],
        correctIndex: 1,
        feedback: [
          'Contextually sometimes valid. Broadly antisocial.',
          'Correct. Brief positive acknowledgement is the baseline of outdoor human interaction.',
          'Situationally valid in some contexts. Not the general rule.',
          'This is not a feature that exists. Yet.',
        ],
      },
    ],
  },

  // ============================================================
  // GRS-301: Digital Detox Engineering
  // ============================================================
  {
    id: 'quiz-grs-301',
    courseId: 'GRS-301',
    title: 'Digital Detox Engineering — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-grs-301-1',
        text: 'The phantom notification sensation — feeling your phone vibrate when it has not — indicates:',
        options: [
          'A hardware fault in the device',
          'A conditioned neurological response from habitual notification checking',
          'Heightened sensory awareness',
          'That your phone is haunted, which is a less common but documented phenomenon',
        ],
        correctIndex: 1,
        feedback: [
          'The device is fine. The issue is elsewhere.',
          'Correct. Phantom vibration syndrome is a documented psychological phenomenon caused by chronic device checking. The nervous system has learned to anticipate it.',
          'Not the mechanism. The opposite of heightened awareness — it is conditioned anticipation.',
          'If your phone is haunted, this course cannot help you.',
        ],
      },
      {
        id: 'q-grs-301-2',
        text: 'The optimal strategy for a 24-hour digital detox is:',
        options: [
          'Abrupt cold turkey — simply do not use the phone',
          'Taper the usage over three days before the detox begins',
          'Replace digital stimulation with analogue equivalents — books, walks, human conversation',
          'Spend 24 hours telling people on social media that you are doing a detox',
        ],
        correctIndex: 2,
        feedback: [
          'Effective but high-failure-rate. Withdrawal without substitution.',
          'Tapering is the medical model. Useful for serious cases.',
          'Correct. Substitution is more sustainable than abstinence. The stimulus need is real — the digital component is not.',
          'The social media announcement is the most commonly observed approach and the least effective.',
        ],
      },
      {
        id: 'q-grs-301-3',
        text: '97% of students in this course check their phones during the detox. The academically important insight is:',
        options: [
          'The detox is poorly designed',
          'Digital dependency is stronger than voluntary intention',
          'The students are not committed enough',
          'The statistic itself was delivered via a phone notification',
        ],
        correctIndex: 3,
        feedback: [
          'The design is fine. The participants are the variable.',
          'True and important. But not the most interesting answer.',
          'Commitment is a factor. But even highly committed students check.',
          'Correct. The irony of receiving a digital detox course notification on a phone captures the structural paradox of the entire field.',
        ],
      },
    ],
  },

  // ============================================================
  // GRS-401: Human Interaction Fundamentals
  // ============================================================
  {
    id: 'quiz-grs-401',
    courseId: 'GRS-401',
    title: 'Human Interaction Fundamentals — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-grs-401-1',
        text: 'When someone is speaking, the correct listening posture is:',
        options: [
          'Simultaneously composing your reply',
          'Nodding at 3-second intervals regardless of content',
          'Actually processing what they are saying before responding',
          'Making eye contact at the frequency calculated in RZZ-201',
        ],
        correctIndex: 2,
        feedback: [
          'This is the dominant mode. It is not listening.',
          'Nodding is a response loop, not listening.',
          'Correct. Actual comprehension before response. Radical in practice.',
          'RZZ-201 applies here but processing is the prior requirement.',
        ],
      },
      {
        id: 'q-grs-401-2',
        text: 'You want to express disagreement with someone you respect. The approach is:',
        options: [
          'Agree publicly and disagree privately',
          '"Yes, and..." — absorb their point before introducing yours',
          '"Actually..." — immediate correction with evidence',
          'Change the subject and return to it later when they have forgotten',
        ],
        correctIndex: 1,
        feedback: [
          'Conflict avoidance has a cost. This is a short-term solution.',
          'Correct. Acknowledging first signals respect. The disagreement lands better when the other person does not feel dismissed first.',
          '"Actually" is a high-friction opener. Use sparingly.',
          'They remember. They always remember.',
        ],
      },
      {
        id: 'q-grs-401-3',
        text: 'The "no worries" reflex — saying "no worries" when something is actually an inconvenience — is:',
        options: [
          'Good social grace — not every inconvenience requires acknowledgement',
          'A conditioned social lubricant that prioritises the other person\'s comfort over honest expression',
          'A lie that is acceptable at this scale',
          'B and C simultaneously, which is how most social lubrication works',
        ],
        correctIndex: 3,
        feedback: [
          'True. But not the complete picture.',
          'True. But "lie" is relevant here.',
          'True. But the mechanism of the lie matters.',
          'Correct. Social lubrication is often a small, consensual dishonesty that maintains functional relationships. B and C are both true and both necessary to understand together.',
        ],
      },
    ],
  },

  // ============================================================
  // GRS-501: Sunlight Appreciation 101
  // ============================================================
  {
    id: 'quiz-grs-501',
    courseId: 'GRS-501',
    title: 'Sunlight Appreciation 101 — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-grs-501-1',
        text: 'Vitamin D deficiency is associated with which symptoms most relevant to our student demographic?',
        options: [
          'Sunburn and related skin conditions',
          'Fatigue, low mood, impaired sleep, and reduced immune function',
          'Excessive outdoor activity and overexposure to natural light',
          'None — vitamin D supplements resolve everything',
        ],
        correctIndex: 1,
        feedback: [
          'Sunburn is a UVB effect, not a deficiency symptom.',
          'Correct. Fatigue, low mood, impaired sleep, and immune dysfunction are the primary symptoms — explaining much of what our student body attributes to "just being like this."',
          'Overexposure to natural light is not a vitamin D deficiency symptom. That is the opposite direction.',
          'Supplements help but do not replicate all the effects of actual sunlight exposure.',
        ],
      },
      {
        id: 'q-grs-501-2',
        text: 'The sun is approximately how many minutes from Earth in light-travel time?',
        options: [
          '8 minutes',
          '1 minute',
          '45 minutes',
          'This is irrelevant — the sun is just there',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Approximately 8 minutes and 20 seconds at average Earth-Sun distance. The light you see left the sun before most of your lectures started.',
          'Too close. This would be significantly closer than the actual distance.',
          'Too far. This is approaching the inner asteroid belt.',
          'It is just there, yes. But understanding scale changes your relationship with it.',
        ],
      },
      {
        id: 'q-grs-501-3',
        text: 'The optimal time to get sunlight exposure for circadian rhythm benefits is:',
        options: [
          'Any time — all sunlight is equivalent',
          'Morning light, specifically within 1–2 hours of waking',
          'Solar noon — maximum UV intensity',
          'Evening — when the sun is lower and safer',
        ],
        correctIndex: 1,
        feedback: [
          'Light timing is not equivalent. Morning light has specific circadian effects.',
          'Correct. Morning light (within 1–2 hours of waking) anchors the circadian clock and has the strongest effect on sleep quality, mood, and metabolic function.',
          'Noon has high UV intensity but is not optimal for circadian signalling.',
          'Evening light helps with winding down but is not the primary circadian input.',
        ],
      },
    ],
  },

  // ============================================================
  // BRT-201: Meme Archaeology
  // ============================================================
  {
    id: 'quiz-brt-201',
    courseId: 'BRT-201',
    title: 'Meme Archaeology — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-brt-201-1',
        text: 'A meme formatted as a standard white-background Impact-font text image can be dated to approximately:',
        options: [
          '2015–2020 — late Classic era',
          '2009–2014 — Early Classic era',
          '2005–2009 — Proto-Classic era',
          '1996–2004 — Paleolithic internet era',
        ],
        correctIndex: 1,
        feedback: [
          'This period saw the decline of Impact font as newer formats dominated.',
          'Correct. The Impact font macro format dominated 2009–2014, characterised by white text, black outline, and simple visual templates.',
          'This period had proto-meme forms but Impact font macro format emerged later.',
          'The paleolithic era predates standardised meme formats.',
        ],
      },
      {
        id: 'q-brt-201-2',
        text: 'The Doge meme ("such wow, many amaze") represents which linguistic phenomenon?',
        options: [
          'Doggerel — informal verse with irregular rhythm',
          'Broken grammar as an ironic stylistic choice communicating expressiveness beyond standard syntax',
          'A transliteration of Japanese internet language',
          'A reference to Doge, the historical Venetian title',
        ],
        correctIndex: 1,
        feedback: [
          'Doggerel is poetry. Close phonetically. Not related.',
          'Correct. The Doge meme format uses intentionally broken grammar to convey emotional intensity — the limitation of the syntax communicates more than proper grammar would.',
          'Not a transliteration. An original anglophone internet format.',
          'The Venetian Doge did inspire the meme\'s name indirectly. But not the language format.',
        ],
      },
      {
        id: 'q-brt-201-3',
        text: 'A meme has already been posted by your parents. This event is technically known as:',
        options: [
          'The adoption horizon — the point at which a meme crosses into general population usage',
          'The cringe point — after which the meme should be retired',
          'The Facebook migration event',
          'Natural meme succession',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. The adoption horizon marks the crossing from early-adopter culture into general population. Post-adoption, the meme enters the cringe cycle.',
          'The cringe point follows the adoption horizon. They are sequential, not simultaneous.',
          'Colloquially accurate for the specific platform, not the academic term.',
          'Succession implies replacement. Adoption horizon is the moment, not the process.',
        ],
      },
    ],
  },

  // ============================================================
  // BRT-301: Internet Culture Engineering
  // ============================================================
  {
    id: 'quiz-brt-301',
    courseId: 'BRT-301',
    title: 'Internet Culture Engineering — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-brt-301-1',
        text: 'The recommendation algorithm optimises for which primary metric?',
        options: [
          'Content quality as determined by editorial review',
          'User satisfaction as self-reported',
          'Engagement duration — maximising time spent on platform',
          'Educational value of the content served',
        ],
        correctIndex: 2,
        feedback: [
          'Algorithms are not editorial. No human review at scale.',
          'Self-reported satisfaction often diverges from actual behaviour. Algorithms follow behaviour.',
          'Correct. Recommendation systems optimise for engagement duration — the longer you scroll, the more the algorithm learns, and the more it can keep you scrolling. This is the core engineering objective.',
          'Educational value is not a primary metric on any major social platform.',
        ],
      },
      {
        id: 'q-brt-301-2',
        text: 'Manufactured outrage as a content strategy works because:',
        options: [
          'People are generally angry and need an outlet',
          'Outrage generates higher engagement metrics than positive content, which algorithms amplify',
          'Controversial topics naturally attract more thoughtful discussion',
          'The creators are genuinely outraged and this authenticity resonates',
        ],
        correctIndex: 1,
        feedback: [
          'People are sometimes angry but the mechanism is algorithmic, not psychological primarily.',
          'Correct. Outrage-generating content produces higher engagement (shares, comments, time spent) than neutral content. Algorithms learn this and amplify outrage systematically.',
          'Controversy attracts discussion but "thoughtful" is not what drives the metrics.',
          'Genuine outrage exists but is not the engineering explanation for manufactured outrage as strategy.',
        ],
      },
      {
        id: 'q-brt-301-3',
        text: 'The niche-to-mainstream pipeline describes:',
        options: [
          'How pipes work on the internet (infrastructure)',
          'The pathway by which content originates in small online communities before reaching mass audiences',
          'A specific content format developed for TikTok',
          'The process by which algorithms identify emerging creators',
        ],
        correctIndex: 1,
        feedback: [
          'Not infrastructure. Cultural flow.',
          'Correct. Content originates in niche communities (4chan, small subreddits, Discord servers), migrates to larger platforms, reaches mainstream media, and eventually enters general culture. This pipeline has accelerated dramatically.',
          'Not platform-specific.',
          'Creator discovery is a component, not the pipeline itself.',
        ],
      },
    ],
  },

  // ============================================================
  // BRT-401: Applied Braincell Economics
  // ============================================================
  {
    id: 'quiz-brt-401',
    courseId: 'BRT-401',
    title: 'Applied Braincell Economics — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-brt-401-1',
        text: 'The marginal utility of scrolling — the additional satisfaction from one more post — exhibits which pattern over time?',
        options: [
          'Increasing returns — each post is more satisfying than the last',
          'Constant returns — satisfaction remains stable throughout a scrolling session',
          'Diminishing returns — each successive post provides less satisfaction, yet scrolling continues',
          'Oscillating returns — satisfaction peaks at regular intervals',
        ],
        correctIndex: 2,
        feedback: [
          'If each post were more satisfying, you would eventually stop. You do not.',
          'Satisfaction demonstrably decreases in extended scrolling. Constant returns is inaccurate.',
          'Correct. Diminishing marginal utility is well-documented in digital consumption — each post provides less satisfaction, but the threshold for stopping rises as the algorithm adapts. The result is continued consumption despite diminishing returns.',
          'Oscillation would require regular peaks. Scrolling behaviour does not match this pattern.',
        ],
      },
      {
        id: 'q-brt-401-2',
        text: 'The opportunity cost of a three-hour TikTok session includes all of the following EXCEPT:',
        options: [
          'Time that could have been spent on productive tasks',
          'Cognitive capacity temporarily reduced by passive stimulation',
          'The TikTok subscription fee',
          'Social connection that could have occurred offline',
        ],
        correctIndex: 2,
        feedback: [
          'This is a genuine opportunity cost.',
          'Cognitive state effects are real and well-documented.',
          'Correct. TikTok has no subscription fee. There is no monetary cost excluded from the list — only your time, cognitive capacity, and social alternatives are the costs.',
          'Genuine opportunity cost.',
        ],
      },
      {
        id: 'q-brt-401-3',
        text: 'The two remaining braincells theory proposes that:',
        options: [
          'Extensive internet use causes measurable neural damage',
          'The colloquial experience of cognitive depletion after extensive scrolling is a real but recoverable state',
          'There are exactly two functioning braincells in the average chronically online individual',
          'Braincells can be replenished through meme consumption',
        ],
        correctIndex: 1,
        feedback: [
          'Measurable structural damage is not supported. Functional fatigue is.',
          'Correct. The "two braincells" experience is cognitive fatigue from passive stimulation overload — a recoverable state, not a permanent reduction. Sleep, outdoor exposure, and reduced stimulation reverse it.',
          'The number is not literal. This is a metaphor. We are studying the metaphor and its accuracy.',
          'Memes do not replenish braincells. This course would be much shorter if they did.',
        ],
      },
    ],
  },

  // ============================================================
  // BRT-501: Neural Networks and Neuron Damage
  // ============================================================
  {
    id: 'quiz-brt-501',
    courseId: 'BRT-501',
    title: 'Neural Networks and Neuron Damage — Final Examination',
    passingScore: 50,
    questions: [
      {
        id: 'q-brt-501-1',
        text: 'The key similarity between biological neural networks and artificial neural networks is:',
        options: [
          'Both run on electricity and are therefore physically identical',
          'Both learn by adjusting connection weights based on feedback signals',
          'Both make mistakes in similar ways',
          'Both were invented by the same person',
        ],
        correctIndex: 1,
        feedback: [
          'The physical substrate differs significantly despite both using electrical signals.',
          'Correct. The core mechanism of both biological and artificial neural networks is Hebbian-style learning — connections that produce correct outputs are strengthened, and those that produce errors are weakened.',
          'Error patterns differ significantly. Biological networks generalise differently from artificial ones.',
          'Artificial neural networks were inspired by biological ones but not invented by the same researcher.',
        ],
      },
      {
        id: 'q-brt-501-2',
        text: 'Why does the AI industry increasingly use Gen Z internet language in their models\' outputs?',
        options: [
          'AI researchers are Gen Z',
          'The training data includes massive amounts of internet text, which is disproportionately Gen Z-authored',
          'A deliberate stylistic choice by product teams',
          'AI models have developed their own communication style that happens to resemble Gen Z language',
        ],
        correctIndex: 1,
        feedback: [
          'Researcher demographics are relevant but not the primary mechanism.',
          'Correct. AI language models are trained on internet-sourced text. Gen Z produces and consumes a disproportionate volume of internet text. The models reflect their training data.',
          'Product teams sometimes do choose this, but the underlying source is the training data.',
          'Models do not develop original styles independent of training. They reflect patterns in data.',
        ],
      },
      {
        id: 'q-brt-501-3',
        text: 'The "singularity" in popular discourse refers to a hypothetical point at which:',
        options: [
          'All social media platforms merge into one',
          'AI systems surpass human intelligence and self-improve recursively',
          'The internet goes offline permanently',
          'Everyone becomes a content creator simultaneously',
        ],
        correctIndex: 1,
        feedback: [
          'Platform consolidation has been occurring gradually and is not what singularity refers to.',
          'Correct. The technological singularity, as theorised, is a hypothetical event where AI systems exceed human cognitive ability and begin improving themselves, producing exponential capability growth beyond predictable human comprehension.',
          'This would be catastrophic but is not the singularity.',
          'This is the Creator Economy Singularity. A different, more immediately terrifying concept.',
        ],
      },
    ],
  },

  // ============================================================
  // SECRET-666: The Forbidden Curriculum
  // ============================================================
  {
    id: 'quiz-secret-666',
    courseId: 'SECRET-666',
    title: 'The Forbidden Curriculum — Final Examination (CLASSIFIED)',
    passingScore: 60,
    questions: [
      {
        id: 'q-secret-1',
        text: 'You have found the secret course. What does this say about you?',
        options: [
          'That I am thorough, curious, and perhaps slightly too invested in a satirical university website',
          'Nothing — I clicked randomly',
          'That I am the main character of this application',
          'That I have successfully completed all other courses and deserve additional suffering',
        ],
        correctIndex: 0,
        feedback: [
          'Correct. Welcome. You have passed the only test that matters.',
          'The randomness would not have found you here. Nothing is random in this institution.',
          'You might be. The evidence is mounting.',
          'The suffering has been upgraded. This is worse. You\'re welcome.',
        ],
      },
      {
        id: 'q-secret-2',
        text: 'The university motto is "Educating the Chronically Online Since Never." This is technically:',
        options: [
          'A paradox — you cannot educate from a starting point of never',
          'Accurate — the university cannot educate anyone, but it has been consistent in its approach',
          'A timeline error — the university was founded at some point',
          'A philosophical statement about the nature of internet-based learning',
        ],
        correctIndex: 1,
        feedback: [
          'A paradox would require internal contradiction. The motto is self-consistent.',
          'Correct. The motto is completely accurate. Since Never is the founding date. Education is not guaranteed. Both claims stand.',
          'The university was not founded. It emerged. There is a difference.',
          'It is, among other things.',
        ],
      },
      {
        id: 'q-secret-3',
        text: 'If you are the NPC, what does that make the application?',
        options: [
          'The game',
          'The dungeon master',
          'A mirror',
          'Also an NPC, but a more self-aware one',
        ],
        correctIndex: 2,
        feedback: [
          'Close but the metaphor is less competitive than that.',
          'The DM shapes the world but does not interact directly. This is more interactive.',
          'Correct. The application is a mirror. It shows you what internet culture and academic satire look like when pressed together. You are seeing yourself.',
          'Also acceptable. We accept this answer with full marks in the alternate marking scheme.',
        ],
      },
      {
        id: 'q-secret-4',
        text: 'You have reached the end of Brainrot University. What was the point?',
        options: [
          'There was no point — it\'s a satirical project',
          'The point was the people we cooked along the way',
          'Entertainment with a functional full-stack application underneath it',
          'All of the above, at varying levels of sincerity',
        ],
        correctIndex: 3,
        feedback: [
          'Reductive. There\'s also a working quiz engine.',
          'Poetic. Awarded full marks.',
          'True and the most technically accurate.',
          'Correct. Everything is simultaneously true here. That is the point. Or one of them.',
        ],
      },
    ],
  },
];

export const getQuizById = (id: string): Quiz | undefined =>
  quizzes.find((q) => q.id === id);

export const getQuizByCourseId = (courseId: string): Quiz | undefined =>
  quizzes.find((q) => q.courseId === courseId);
