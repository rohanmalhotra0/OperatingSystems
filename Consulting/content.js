/* =========================================================
   consult.lab — case interview & consulting data
   CARDS (50) · ESSAYS (10) · ESSAY_MC (10)
   Categories: Case Frameworks · Interview Lead · Candidate Lead
   ========================================================= */

const CARDS = [

  /* ───────── CASE FRAMEWORKS ───────── */
  {
    term: "MECE Principle",
    cat: "Case Frameworks",
    def: "Mutually Exclusive, Collectively Exhaustive. A structuring principle ensuring analysis buckets do not overlap (ME) and together cover the entire problem space (CE).",
    hint: "Test ME: can one item fit two buckets? Test CE: can you miss something entirely? MECE is the backbone of every issue tree — violating it means you'll double-count or miss drivers."
  },
  {
    term: "Issue Tree",
    cat: "Case Frameworks",
    def: "A hierarchical decomposition of a business problem into MECE branches and sub-branches. Root = the core question; branches = major driver categories; leaves = specific hypotheses to test.",
    hint: "Also called a logic tree or hypothesis tree. Always draw on paper before speaking — structure first, content second. The tree governs which branch you prioritize, not just what exists."
  },
  {
    term: "Profitability Framework",
    cat: "Case Frameworks",
    def: "Profit = Revenue − Cost. Revenue decomposes into Price × Volume (plus mix); Cost decomposes into Fixed and Variable, then by function. Used to diagnose why profits declined or how to increase them.",
    hint: "First ask: is the problem revenue-side or cost-side? Then check whether the issue is company-specific or industry-wide. Comparing to competitors isolates internal from external drivers."
  },
  {
    term: "Market Entry Framework",
    cat: "Case Frameworks",
    def: "Evaluates whether a company should enter a new market across four dimensions: (1) Market attractiveness (size, growth, profitability, competition), (2) Company fit (capabilities, cost position, brand), (3) Entry strategy (organic build, partnership, acquisition), (4) Financial case (investment, payback, NPV).",
    hint: "Always ask WHY the client wants to enter — sometimes the answer is 'don't enter' or 'enter via a different segment.' A beautiful market with no strategic fit is still the wrong move."
  },
  {
    term: "M&A / Due Diligence Framework",
    cat: "Case Frameworks",
    def: "Evaluates an acquisition across: (1) Strategic rationale — why buy?, (2) Target attractiveness (market, business model, competitive moat), (3) Synergies (revenue uplift + cost savings), (4) Integration risks, (5) Valuation and deal terms.",
    hint: "Synergies are almost always over-estimated by acquirers. Ask: are the synergies real (not just assumed), and can they actually be captured given integration complexity?"
  },
  {
    term: "Competitive Response Framework",
    cat: "Case Frameworks",
    def: "Framework for reacting to a competitor's move: (1) What exactly did they do?, (2) Why now?, (3) What is the impact on our volume/pricing/share?, (4) What are our response options?, (5) Which option do we choose and why?",
    hint: "Not every competitive threat requires a response. Options include: ignore, match, leapfrog, or differentiate. Assess whether the competitor's move is sustainable before reacting."
  },
  {
    term: "Pricing Framework",
    cat: "Case Frameworks",
    def: "Three pricing lenses: (1) Cost-plus — floor is variable cost + required margin, (2) Competitive — what do rivals charge?, (3) Value-based — customer's willingness to pay (WTP) is the ceiling. Optimal price sits between cost floor and WTP ceiling, shaped by competitive dynamics.",
    hint: "Value-based pricing is usually the most profitable but hardest to execute. Always ask about price elasticity (how sensitive is demand to price?) and customer segmentation (different WTP by segment)."
  },
  {
    term: "Market Sizing — Top-Down",
    cat: "Case Frameworks",
    def: "Estimating market size by starting from a large known figure (e.g., total population or GDP) and applying successive filters to reach the target segment. Example: US coffee shops = Population × coffee-drinker % × cups/week × average price × 52 weeks.",
    hint: "Good for rapid sanity checks. State every assumption clearly. The goal is to get within the right order of magnitude — not precision. Always cross-check with a bottom-up estimate if time allows."
  },
  {
    term: "Market Sizing — Bottom-Up",
    cat: "Case Frameworks",
    def: "Estimating market size by starting from unit-level economics and building upward. Example: number of coffee shops in the US × average annual revenue per shop.",
    hint: "More accurate when you have reliable unit-level data. Best used to validate a top-down estimate. If the two methods are off by 2–3×, investigate the assumption driving the gap."
  },
  {
    term: "BCG Growth-Share Matrix",
    cat: "Case Frameworks",
    def: "Portfolio planning tool plotting business units on market growth rate (y-axis) vs. relative market share (x-axis). Four quadrants: Stars (high growth, high share), Cash Cows (low growth, high share), Question Marks (high growth, low share), Dogs (low growth, low share).",
    hint: "Cash Cows fund Stars. Question Marks require an invest/divest decision. Dogs are divestiture candidates. Highly simplified — use as a conversation starter, never as a final portfolio answer."
  },
  {
    term: "Porter's Five Forces",
    cat: "Case Frameworks",
    def: "Structural industry analysis framework: (1) Threat of new entrants, (2) Bargaining power of suppliers, (3) Bargaining power of buyers, (4) Threat of substitutes, (5) Rivalry among existing competitors. Industry attractiveness falls when forces are strong.",
    hint: "Use to explain WHY a market is (or isn't) profitable, not just whether to enter. Each force has specific drivers: switching costs affect buyer power; economies of scale affect entry threat."
  },
  {
    term: "Break-Even Analysis",
    cat: "Case Frameworks",
    def: "The volume or revenue at which total revenue equals total cost. Break-Even Volume = Fixed Costs ÷ (Price − Variable Cost per Unit). Break-Even Revenue = Fixed Costs ÷ Contribution Margin %.",
    hint: "Key in any go/no-go investment decision. Ask: how long to break even, and is that time horizon acceptable given the capital at risk? Shorter payback → lower risk."
  },
  {
    term: "Net Present Value (NPV)",
    cat: "Case Frameworks",
    def: "The sum of all future cash flows discounted to present value at a required rate of return (the discount rate). NPV > 0 means the investment creates value. Formula: NPV = Σ [CF_t / (1+r)^t] − Initial Investment.",
    hint: "In case interviews, approximate NPV by ignoring discounting for short horizons or using a simple rule of thumb (e.g., 10% annual discount). Key intuition: a dollar today is worth more than a dollar tomorrow."
  },
  {
    term: "Payback Period",
    cat: "Case Frameworks",
    def: "The time required for cumulative cash inflows to equal the initial investment. Payback = Initial Investment ÷ Annual Cash Flow (for constant cash flows).",
    hint: "Simple and widely used by operators. Its weakness: ignores time value of money and all cash flows after payback. Best used alongside NPV as a risk/liquidity check."
  },
  {
    term: "Ansoff Growth Matrix",
    cat: "Case Frameworks",
    def: "Four growth strategies by product/market novelty: (1) Market Penetration — existing product, existing market (grow share), (2) Market Development — existing product, new market, (3) Product Development — new product, existing market, (4) Diversification — new product, new market (highest risk).",
    hint: "Always start with penetration (least risky, lowest investment) before justifying riskier quadrants. Diversification requires a clear strategic logic — synergies, or a portfolio balance — to be credible."
  },
  {
    term: "Value Chain Analysis",
    cat: "Case Frameworks",
    def: "Disaggregating a firm's activities into primary activities (inbound logistics, operations, outbound logistics, marketing & sales, service) and support activities (procurement, technology, HR, firm infrastructure) to pinpoint where value is created or costs are concentrated.",
    hint: "Use to find a client's competitive advantage or a cost-reduction opportunity. Also useful for make-vs-buy decisions: which value chain activities should be outsourced vs. kept in-house?"
  },
  {
    term: "Sensitivity Analysis",
    cat: "Case Frameworks",
    def: "Testing how much a key output (profit, NPV, break-even volume) changes when a single input variable (price, volume, cost) is varied by a defined amount. Identifies which assumptions most heavily drive the outcome.",
    hint: "In cases, identify the 2–3 biggest value levers early and build your analysis around them. Minor drivers are rabbit holes. 'What one assumption, if wrong, would change your recommendation?' is a great self-check."
  },
  {
    term: "Revenue Bridge",
    cat: "Case Frameworks",
    def: "A waterfall analysis decomposing a revenue change into its drivers: price effect (same volume, different price), volume effect (same price, different volume), and mix effect (shift between higher- and lower-priced products or segments).",
    hint: "Classic in profitability cases. 'Revenue is down 10%' — first question: is it price, volume, or mix? Each has completely different root causes and different strategic remedies."
  },
  {
    term: "Cost Structure Analysis",
    cat: "Case Frameworks",
    def: "Decomposing total costs into fixed vs. variable (behavior relative to output) and by function (COGS, SG&A, R&D, D&A). Identifies which costs are controllable short-term, which scale with the business, and which can be benchmarked against peers.",
    hint: "High fixed-cost structures = high operating leverage: profits amplify as volume grows, but losses amplify as volume falls. Understanding the cost structure is essential before recommending any cost-reduction initiative."
  },
  {
    term: "Benchmarking",
    cat: "Case Frameworks",
    def: "Comparing a company's performance metrics (cost per unit, gross margin, revenue per employee, NPS, EBITDA margin) against industry peers or best-in-class operators to quantify the performance gap and identify improvement potential.",
    hint: "Ask: internal (vs. own history), competitive (same industry), or functional (best-in-class regardless of industry)? Each benchmark reveals different insights. A gap without a benchmark is just a number."
  },

  /* ───────── INTERVIEW LEAD ───────── */
  {
    term: "Case Opening (Interviewer)",
    cat: "Interview Lead",
    def: "The structured brief that opens a case: company background, industry context, the core client question, and any key constraints or objectives. Should be concise (1–2 min), internally consistent, and leave some information for the candidate to request — mirroring real consulting.",
    hint: "Do not front-load all data. A realistic case requires the candidate to ask for what they need. Withholding info is not a trick — it tests whether they know what they need to know."
  },
  {
    term: "Hint Ladder",
    cat: "Interview Lead",
    def: "A tiered sequence of hints from most indirect to most direct: Rung 1 — reframe or restate the question; Rung 2 — point to the relevant area/bucket; Rung 3 — suggest a specific method or tool; Rung 4 — give the answer directly. Interviewers start at Rung 1 and descend only as needed.",
    hint: "Never skip rungs — giving a full answer too fast robs the candidate of a recovery opportunity and inflates your assessment. Record which rung you reached; it directly informs the independence score."
  },
  {
    term: "Candidate Evaluation Rubric",
    cat: "Interview Lead",
    def: "A standardized scorecard with dimensions typically including: (1) Problem structuring & MECE thinking, (2) Hypothesis-driven approach, (3) Analytics & quantitative rigor, (4) Insight quality (so-what), (5) Communication & storyline, (6) Client presence & composure under pressure.",
    hint: "Score during the case, not after. Recency bias is powerful — interviewers tend to overweight the last 5 minutes. Take notes at each phase to ensure the score reflects the whole case."
  },
  {
    term: "Probing (Interviewer)",
    cat: "Interview Lead",
    def: "Targeted follow-up questions to test depth and defend reasoning: 'Why do you think that?', 'What would change your recommendation?', 'What are you not accounting for?', 'Is there another way to look at this data?'",
    hint: "Good probing is genuine curiosity, not a trap. 'What else would you want to know?' and 'What's your biggest concern about this recommendation?' reveal whether the candidate has executive-level judgment."
  },
  {
    term: "Silence Management (Interviewer)",
    cat: "Interview Lead",
    def: "Deliberately staying quiet after posing a question to allow the candidate to think. Interviewers who rush to fill silence inadvertently rescue candidates from their hardest moments and invalidate the evaluation.",
    hint: "30 seconds of silence feels much longer than it is. Use it. If a candidate is genuinely frozen for over 60 seconds, offer a reframe (Rung 1), not the answer. Silence tolerance is itself a skill in client settings."
  },
  {
    term: "Data Exhibit Delivery",
    cat: "Interview Lead",
    def: "Presenting a quantitative exhibit (table, graph, waterfall chart) at a deliberate moment in the case and observing how the candidate reads, synthesizes, and draws implications — ideally without prompting.",
    hint: "Strong candidates don't narrate numbers — they identify the single most important data point and link it to their current hypothesis. Watch whether they read the title and axes before diving into values."
  },
  {
    term: "Nudging (Interviewer)",
    cat: "Interview Lead",
    def: "A soft, indirect signal that the candidate is on the wrong track or missing something: e.g., 'Interesting — is there another angle here?' or simply repeating the original client question. Distinct from a direct hint (which is Rung 2+ on the hint ladder).",
    hint: "A nudge is a question, not an answer. It respects the candidate's intelligence while redirecting. Excessive nudging on one case is itself evaluative data — it signals the candidate needed unusual guidance."
  },
  {
    term: "Error of Omission (Interviewer)",
    cat: "Interview Lead",
    def: "A critical topic, driver, or question that the candidate fails to raise or explore at all. More serious than a calculation error because it signals a gap in business judgment or framework completeness, not just arithmetic.",
    hint: "Examples: never asking about competitive response in a market-entry case; never asking about synergy risk in an M&A case. Errors of omission often disqualify where calculation errors do not."
  },
  {
    term: "Reality Check (Interviewer)",
    cat: "Interview Lead",
    def: "A probe testing whether the candidate's numerical result or recommendation is plausible in the real world: 'You said the addressable market is $400 billion — does that seem right to you?' Forces the candidate to validate their own output.",
    hint: "Strong candidates self-check before you ask. Weak candidates either defend implausible numbers or panic and abandon a correct answer when challenged. The response to this probe is very diagnostic."
  },
  {
    term: "Case Wrap-Up (Interviewer)",
    cat: "Interview Lead",
    def: "The closing phase where the interviewer signals 'time to wrap up' and evaluates how the candidate synthesizes into a clear, structured recommendation: (1) direct answer to the client question, (2) 2–3 supporting reasons, (3) key risks, (4) suggested next steps.",
    hint: "Evaluate crispness and confidence separately from correctness. A clear, well-structured recommendation that is directionally right beats a perfectly accurate recommendation delivered with hedging and confusion."
  },
  {
    term: "Case Type Taxonomy",
    cat: "Interview Lead",
    def: "Classification of consulting cases by problem type: Profitability (diagnosis), Market Entry, M&A/Due Diligence, Growth Strategy, Cost Reduction, Pricing, Operations/Supply Chain, Industry/Competitive Analysis. Match case type to the skill dimension you want to evaluate.",
    hint: "Across a multi-round interview panel, ensure breadth of case types. Don't let two consecutive rounds test identical problem types — you'll accumulate redundant signal rather than a rounded assessment."
  },
  {
    term: "Fit Interview (Interviewer)",
    cat: "Interview Lead",
    def: "A structured behavioral interview assessing personal competencies: leadership, teamwork, resilience under adversity, and motivation for consulting. Uses behavioral questions ('Tell me about a time…') scored against firm-defined competencies.",
    hint: "Score on specificity (real examples, quantified impact), self-awareness (honest reflection on what they'd do differently), and impact orientation. Generic or vague answers are a yellow flag; story inflation is a red flag."
  },
  {
    term: "Red Flags (Interviewer)",
    cat: "Interview Lead",
    def: "Candidate signals associated with poor performance or poor fit: reciting frameworks without adapting them to the client's specific context, ignoring data provided, inability to prioritize ('Let me analyze all 10 drivers equally'), defensiveness when probed, and delivering no clear recommendation at the end.",
    hint: "A single red flag rarely disqualifies. A repeated pattern across the case does. Distinguish recoverable errors (math slip, quickly corrected) from judgment gaps (structural confusion across multiple branches)."
  },
  {
    term: "Green Flags (Interviewer)",
    cat: "Interview Lead",
    def: "Candidate signals associated with strong consulting potential: structuring before speaking, stating a hypothesis before analyzing, asking targeted and contextualized questions, narrating math and checking results, updating their view when given new data, and closing with a crisp recommendation with explicit caveats.",
    hint: "The ideal candidate runs the case like a mini-engagement: hypothesis → targeted analysis → synthesis → recommendation. The interviewer should feel like they are working with a junior consultant, not evaluating an applicant."
  },
  {
    term: "Candidate Independence Score",
    cat: "Interview Lead",
    def: "A qualitative (or explicit count) measure of how much the interviewer had to intervene — through hints, nudges, or redirects — during the case. High independence = candidate drove structure and analysis autonomously. Low independence = interviewer effectively co-solved the case.",
    hint: "A candidate who reached the right answer after 4 hints is structurally weaker than one who was directionally right with 0 hints. Some firms track this formally; all interviewers should factor it into the debrief."
  },

  /* ───────── CANDIDATE LEAD ───────── */
  {
    term: "Clarifying Questions (Candidate)",
    cat: "Candidate Lead",
    def: "Questions asked at the case opening to ensure complete understanding before structuring: objective of the client, definition of key terms (e.g., 'profit' vs. 'EBITDA'), time horizon, geographic scope, and any constraints. Typically 2–4 targeted questions, then ask for a moment to structure.",
    hint: "Test each clarifying question: 'Would the answer change my structure or hypothesis?' If not, don't ask it yet — save it for when you're deep in analysis. Asking 10 clarifying questions reads as stalling, not thoroughness."
  },
  {
    term: "Structure Before Content",
    cat: "Candidate Lead",
    def: "The principle that candidates must always lay out a complete MECE framework before diving into any single branch. Gives the interviewer a map of the candidate's thinking and ensures the analysis is driven by a plan, not by whichever data point is top of mind.",
    hint: "Signal explicitly: 'I'd like to take 30 seconds to structure my approach before diving in — is that okay?' This buys thinking time AND demonstrates discipline. Interviewers almost always say yes."
  },
  {
    term: "Hypothesis-Driven Approach",
    cat: "Candidate Lead",
    def: "Beginning the case with an explicit hypothesis about the likely answer, then designing analysis to prove or disprove it rather than exploring all possibilities neutrally. Mirrors how McKinsey-style consulting delivers efficient, client-credible results.",
    hint: "'My initial hypothesis is that the profit decline is cost-driven rather than revenue-driven, because the case said revenue is flat. I want to test that first.' Updating your hypothesis with new data is a strength, not a flip-flop."
  },
  {
    term: "Prioritization (Candidate)",
    cat: "Candidate Lead",
    def: "After laying out a full structure, explicitly identifying which 1–2 branches are most likely to contain the key driver and proposing to analyze those first. Demonstrates business judgment and efficient time management within the case.",
    hint: "'I'll start with cost because the case said revenue is flat — does that seem right to you?' Candidates who attempt to analyze everything exhaustively run out of time, frustrate interviewers, and look unfocused."
  },
  {
    term: "Data Requests (Candidate)",
    cat: "Candidate Lead",
    def: "Targeted requests for specific information needed to test a hypothesis. Good: 'Do we have the breakdown of costs by fixed vs. variable?' Great: 'Do we have the cost breakdown? I want to determine whether the margin decline is structural or driven by a one-time event.'",
    hint: "Always contextualize your data request — explain why you need it. Uncontextualized asks ('Do you have revenue data?') read as fishing expeditions. Contextualized asks read as executive information management."
  },
  {
    term: "Exhibit Reading (Candidate)",
    cat: "Candidate Lead",
    def: "A structured method for interpreting quantitative exhibits: (1) Read the title, (2) Understand the axes and units, (3) Identify the single most striking data point, (4) Link it to the case question or your current hypothesis. Narrate the reading aloud.",
    hint: "Never start with 'I see that…' and then list every number. Start with 'The key takeaway here is…' and explain what that takeaway means for the client's problem. Data narration without insight is the most common weak-candidate pattern."
  },
  {
    term: "Mental Math (Candidate)",
    cat: "Candidate Lead",
    def: "Performing quick, accurate calculations without a calculator. Core skills: intelligent rounding, using percentages as fractions (13% ≈ 1/8), working in clean millions/billions, unit checks, and stating assumptions explicitly before computing.",
    hint: "'I'll round $247M to $250M for simplicity.' Round aggressively early; be precise at the end. Always state assumptions aloud. A calculation done openly and approximately is better than one done silently and wrongly."
  },
  {
    term: "Synthesis (Candidate)",
    cat: "Candidate Lead",
    def: "Combining the results of multiple analysis branches into a single coherent story: what is happening, why it is happening, and what it implies for the client's decision. Synthesis produces insight, not summary.",
    hint: "'So putting it together: costs are up 15% driven almost entirely by raw materials, while revenue is flat. This tells me the issue is supply-side, not demand-side, and here's what I'd recommend.' Synthesis is the skill interviewers pay most attention to."
  },
  {
    term: "Recommendation (Candidate)",
    cat: "Candidate Lead",
    def: "The closing statement that directly answers the client's core question. Structure: (1) Bottom line up front — yes / no / do this, (2) 2–3 supporting reasons grounded in the analysis, (3) Key risks or conditions that could change the answer, (4) Immediate next steps.",
    hint: "Lead with the answer, then justify. 'I recommend X, because of Y and Z, with the caveat that this assumes the market-size estimate is approximately correct.' Hedging BEFORE the answer is not a recommendation — it's a restatement of complexity."
  },
  {
    term: "Signposting (Candidate)",
    cat: "Candidate Lead",
    def: "Using explicit verbal markers to guide the interviewer through the structure: 'I'll organize this across three areas. First… Second… Third…'; 'Moving to the second area…'; 'To summarize before I give my recommendation…'. Converts a reasoning monologue into a structured presentation.",
    hint: "Signposting is executive presence made audible. It also helps the candidate stay on track. Practice until it sounds natural — the most common failure is signposting only at the opening and then abandoning the structure mid-case."
  },
  {
    term: "Business Intuition (Candidate)",
    cat: "Candidate Lead",
    def: "The ability to sense whether a number, strategy, or recommendation is plausible in the real world without deep prior industry knowledge. Built through reading widely (Economist, FT, HBR) and memorizing key business benchmarks by industry.",
    hint: "'A 40% operating margin for a grocery chain seems high — most supermarkets run 2–4%.' Knowing approximate industry margins, market sizes, and unit economics by sector is a significant differentiator in case interviews."
  },
  {
    term: "Handling Mistakes (Candidate)",
    cat: "Candidate Lead",
    def: "When challenged on a math error or logical mistake: (1) stay calm and composed, (2) acknowledge the error directly ('You're right — let me re-examine that'), (3) rework the calculation aloud with stated assumptions, (4) sanity-check the new result. Never be defensive.",
    hint: "Defensiveness is far more damaging than the original error. Consulting clients and teams make mistakes — they are judged on how they handle them. 'That's basically the same number' for a 2× error is a red flag in any room."
  },
  {
    term: "STAR Method (Candidate)",
    cat: "Candidate Lead",
    def: "Behavioral answer framework: Situation (context, ~10%), Task (your specific role, ~10%), Action (what you personally did — the core of the answer, ~60%), Result (measurable outcome and reflection, ~20%). Used for fit questions: 'Tell me about a time you led a team through conflict.'",
    hint: "Candidates consistently over-invest in Situation/Task and under-invest in Action/Result. The interviewer evaluates Actions (what you did) and Results (what you achieved). Quantify results wherever possible — 'improved team velocity by 30%' beats 'made things better.'"
  },
  {
    term: "Time Management in Cases",
    cat: "Candidate Lead",
    def: "Allocating the 30–45 minute case across phases: ~5 min clarifying/opening, ~5 min structuring, ~15 min analysis, ~5 min synthesis and math, ~5 min recommendation. Strong candidates monitor the clock and signal to the interviewer: 'I want to leave time for a recommendation — should I wrap up here?'",
    hint: "Running out of time before delivering a recommendation is one of the most common case derailers. A directional recommendation with caveats is always better than no recommendation. Time management is a proxy for project management skill."
  },
  {
    term: "Updating Your Hypothesis",
    cat: "Candidate Lead",
    def: "Explicitly revising the initial hypothesis when new data contradicts it: 'I initially thought the problem was cost-driven, but this exhibit shows revenue is actually declining significantly — let me refocus my analysis on the revenue side.' Does not require abandoning the structure, only reprioritizing within it.",
    hint: "Hypothesis updates demonstrate real consulting judgment. The best candidates update fluidly without losing the thread of the case. This mirrors what consultants do in client meetings when the data doesn't confirm the working hypothesis."
  },
];

/* ---------------------------------------------------------
   ESSAYS (10) — open-ended practice prompts for both roles
   --------------------------------------------------------- */
const ESSAYS = [
  {
    q: "As a candidate, walk through how you'd structure and crack a profitability case where operating margins have declined 200bps year-over-year.",
    hint: "Clarify: is the decline industry-wide or company-specific? Revenue flat or down?\nUse Profit = Revenue − Cost as your top-level structure.\nSplit Revenue into Price × Volume; check for mix effects.\nSplit Costs into Fixed and Variable, then by function (COGS, SG&A, etc.).\nHypothesis-first: if revenue is flat, go to costs first.\nCompare to competitors to distinguish internal vs. external drivers.\nSynthesize to root cause, then recommend specific levers."
  },
  {
    q: "As an interviewer, how do you design a case that specifically tests quantitative reasoning under pressure?",
    hint: "Choose a profitability or market-sizing case with multiple sequential calculation steps.\nWithhold some data so candidates must make assumptions and state them aloud.\nInclude at least one unit conversion (e.g., daily to annual, per-unit to aggregate).\nInsert a mid-case data exhibit requiring interpretation, not just narration.\nUse a reality-check probe: 'Does that number seem right to you?'\nNote: candidates who show their math verbally are far easier to evaluate and coach than those who compute silently."
  },
  {
    q: "As a candidate, structure a market entry decision for a US pharmaceutical company considering expanding into Brazil.",
    hint: "Market attractiveness: TAM, growth, pricing regulation (ANVISA/CMED controls), IP enforcement, generic competition, distribution channel depth.\nCompany fit: existing LatAm footprint, regulatory affairs capability, product-disease match to Brazilian epidemiology, manufacturing cost position.\nEntry strategy: organic build (long but full control), local distribution partner (faster but margin compression), acquisition of a Brazilian pharma (fastest, highest integration risk).\nFinancial case: required investment, time to regulatory approval, time to break-even, risk-adjusted NPV.\nKey risks: currency volatility (BRL), reimbursement timeline, pricing headroom vs. SUS-mandated prices.\nRecommendation should be conditional: 'Enter via partnership if existing relationships allow X; build independently only if margins can support Y.'"
  },
  {
    q: "As an interviewer, your candidate gave a recommendation that is analytically correct but communicated poorly. How do you provide constructive feedback?",
    hint: "Separate content quality from communication quality — acknowledge sound reasoning first.\nFocus feedback on structure: 'Your recommendation lacked a direct opening answer — consultants lead with the conclusion, then justify it.'\nBe specific: give a concrete example of what a stronger version would sound like ('Try: I recommend entering the market. Here are three reasons why...').\nAsk the candidate to try again immediately — in-the-moment practice is more valuable than debriefing alone.\nEnd with a genuine positive: 'The analysis was strong — the communication just needs a structural tweak.'"
  },
  {
    q: "As a candidate, you are 20 minutes into a case and realize you've been analyzing the wrong branch of your framework. How do you recover?",
    hint: "Do not panic or apologize excessively — stay composed and professional.\nAcknowledge the pivot clearly: 'Given this new data, the real issue appears to be on the revenue side — I'd like to redirect my analysis there.'\nReorient within your existing framework rather than starting over from scratch.\nSignpost the new direction explicitly so the interviewer can follow the pivot.\nCheck the clock: if fewer than 10 minutes remain, skip to synthesis with what you have and flag what additional analysis you'd do in a real engagement.\nKey insight: recovering gracefully from a wrong path demonstrates adaptability — the consulting skill interviewers value most."
  },
  {
    q: "As an interviewer, describe how to use the hint ladder appropriately when a candidate stalls completely on a market sizing question.",
    hint: "Let silence breathe for 30–40 seconds — this is valuable evaluation time, not dead air.\nRung 1 — Reframe: 'What population of people would actually buy this product?'\nRung 2 — Point to a bucket: 'Have you thought about segmenting by age or income?'\nRung 3 — Suggest the method: 'A top-down approach starting with total US population might work here.'\nRung 4 — Give a number: 'US population is roughly 330 million — does that help you get started?'\nRecord which rung you reached — it directly inputs into the candidate's independence score on the evaluation rubric."
  },
  {
    q: "As a candidate, estimate the total annual revenue of all US Starbucks stores. Walk through your reasoning.",
    hint: "Bottom-up approach is most defensible:\nNumber of US Starbucks stores: ~16,000.\nTransactions per store per day: ~500 (heavy morning peak, lighter afternoon and evening).\nAverage ticket size: ~$7 (mixture of coffee $4–5, food $8–12, specialty $6–8).\nRevenue per store per day: 500 × $7 = $3,500.\nRevenue per store per year: $3,500 × 365 ≈ $1.28M.\nTotal US revenue: 16,000 × $1.28M ≈ $20.5B.\nSanity check: Starbucks reported ~$18–20B in US revenues recently — directionally accurate.\nState assumptions clearly; be ready to adjust if the interviewer challenges transaction count or ticket size."
  },
  {
    q: "As a candidate, should a struggling retail chain close its bottom 20% of stores by revenue? How do you structure this decision?",
    hint: "Define 'struggling': unprofitable (negative EBIT), cash-draining (negative FCF), or below the firm's hurdle rate?\nAnalyze store-level P&L: which stores are cash-flow negative vs. below-average but still positive?\nConsider: fixed cost reallocation (closing a store doesn't eliminate all shared overhead), lease exit costs and remaining obligations, and cannibalization risk to nearby stores.\nHalo effects: some stores serve as brand touchpoints even if unprofitable (airports, flagship locations).\nAlternatives: renegotiate leases, reformat store (smaller footprint, different mix), cost-reduce before closing.\nQuantify: what is the total cash benefit of closing the 20%? What revenue is at risk?\nRecommendation should be tiered: close X immediately (deeply negative), negotiate Y leases, reformat Z — not a blanket 20% cut."
  },
  {
    q: "As an interviewer, what distinguishes a candidate who truly 'gets consulting' from one who is skilled at reciting frameworks?",
    hint: "Consulting instinct: do they ask 'so what?' after every data point, or just describe what they see?\nHypothesis-driven: did they state a working hypothesis before analyzing, or did they try to boil the ocean?\nPrioritization: did they identify the most important branch and go there first, or analyze everything equally?\nClient orientation: did they frame the recommendation in terms of what the client should do, not just what the data shows?\nAdaptability: did they update their view when given contradicting data, or double down on their original framework?\nFramework-reciters: apply MECE boxes without linking them to the specific context — the boxes are the same every case."
  },
  {
    q: "As a candidate, structure a pricing strategy recommendation for a B2B SaaS company considering a shift from per-seat to usage-based pricing.",
    hint: "Apply all three pricing lenses: cost-plus (floor: fully loaded cost per customer), competitive (what do comparable SaaS peers charge on usage-based models?), value-based (how does customer-perceived value scale with usage volume?).\nKey diagnostic: who are the heavy users vs. light users? Does per-seat currently overcharge light users (churn risk) and undercharge heavy users (revenue leak)?\nSegmentation: enterprise vs. SMB may have very different preferences — enterprise likes predictability; SMBs may prefer usage-based to match cash flow.\nRisks of switching: usage-based creates ARR volatility, makes forecasting harder, and can cause revenue decline in a downturn.\nImplementation: migration path for existing contracts, pricing calculator for the sales team, customer communication plan.\nRecommendation: usage-based if value clearly scales with usage, the ACV economics hold, and the sales motion can support a more complex conversation."
  },
];

/* ---------------------------------------------------------
   ESSAY_MC — one multiple-choice question per essay prompt
   Tests the key analytical or conceptual argument of each.
   --------------------------------------------------------- */
const ESSAY_MC = [
  {
    topic: "Profitability case structure",
    q: "In a profitability case where revenue is flat and profits are declining, a hypothesis-driven candidate should FIRST analyze:",
    opts: [
      "Market share trends vs. competitors",
      "Cost structure — specifically fixed vs. variable and by function",
      "Competitor pricing and promotional activity",
      "Customer acquisition cost and churn rate"
    ],
    correct: 1,
    explain: "Revenue flat + profits declining = costs are rising. Lead with the cost side. First ask whether it's fixed or variable cost inflation, then drill into which cost category (COGS, SG&A, etc.) is the driver. This is the hypothesis-driven path, not boiling the ocean."
  },
  {
    topic: "MECE principle",
    q: "A candidate structures a market-entry case across three buckets: (1) Customers, (2) Competition, (3) Company. A peer says this is not fully MECE. The most valid critique is:",
    opts: [
      "It has too many buckets for a 30-minute case",
      "Competitive analysis could be included under 'Company' — buckets risk overlapping",
      "The framework ignores financial analysis entirely",
      "Competition should always be analyzed before customers"
    ],
    correct: 1,
    explain: "MECE requires mutual exclusivity. 'Company' analysis (competitive positioning, capabilities) and 'Competition' can blur if the candidate analyzes competitive benchmarking under both. Adding an explicit 'Market/Context' bucket and defining what belongs where solves the overlap."
  },
  {
    topic: "Hint ladder",
    q: "A candidate is completely stuck on what to analyze next in a profitability case. Per the hint ladder, the FIRST hint the interviewer should give is:",
    opts: [
      "Give the answer directly: 'The driver is variable cost inflation in raw materials'",
      "Point to the bucket: 'Have you looked at the cost side yet?'",
      "Reframe the question: 'Remind yourself — what are the two components of profit?'",
      "Provide a starting number: 'Fixed costs are $50M annually'"
    ],
    correct: 2,
    explain: "The hint ladder starts at the most indirect level — reframing or restating the core question. You descend only as needed. Jumping to the answer short-circuits the candidate's evaluation and inflates your assessment of their capability."
  },
  {
    topic: "Recommendation quality",
    q: "A candidate ends a case with: 'It depends on a number of factors, including market conditions, the competitive landscape, and the company's strategic priorities.' This is best characterized as:",
    opts: [
      "A strong, appropriately nuanced final answer",
      "A weak answer — it restates complexity without providing a recommendation",
      "A good setup for a detailed synthesis to follow",
      "An appropriate hedge for a genuinely ambiguous problem"
    ],
    correct: 1,
    explain: "'It depends' without a direct answer is not a recommendation — it is a restatement of the problem. Consulting recommendations lead with the conclusion: 'I recommend X, because of Y and Z, with the caveat that...' Hedges come after the answer, never instead of it."
  },
  {
    topic: "Hypothesis-driven approach",
    q: "Stating an explicit hypothesis at the start of a case is valuable primarily because:",
    opts: [
      "It guarantees the candidate reaches the correct answer",
      "It focuses the analysis on proving or disproving a specific claim, making the case more efficient and client-credible",
      "It impresses interviewers through confident language",
      "It eliminates the need for data analysis in well-defined problems"
    ],
    correct: 1,
    explain: "Hypothesis-driven analysis mirrors how McKinsey and top consulting firms work: form a working view upfront, then design the minimum analysis needed to test it. This is more efficient than exhaustive 'neutral' exploration and better reflects how consultants add value under time pressure."
  },
  {
    topic: "Market sizing — top-down vs. bottom-up",
    q: "A candidate is asked to size the US dog food market. They begin: 'There are 330 million Americans, and roughly 40% own dogs, so that's 132 million dog owners…' This is an example of:",
    opts: [
      "Bottom-up market sizing, starting from households",
      "Top-down market sizing, starting from total population and applying filters",
      "Value-chain analysis applied to a consumer product",
      "Benchmarking against known industry data"
    ],
    correct: 1,
    explain: "Top-down sizing starts from a large known figure (total population) and applies filters downward to reach the target segment. Bottom-up would start from one unit — one dog's annual food spend — and multiply up by the number of dogs. Both are valid; cross-checking both is ideal."
  },
  {
    topic: "Exhibit reading",
    q: "A candidate is shown a bar chart of company revenue by region for 2023. They respond: 'North America had $450M, EMEA had $320M, APAC had $180M, and LatAm had $50M.' The interviewer is most likely thinking:",
    opts: [
      "Excellent — the candidate accurately read all values",
      "The candidate narrated the data without providing any analytical insight",
      "The candidate should have focused on LatAm as the smallest region",
      "The candidate correctly identified North America as the priority"
    ],
    correct: 1,
    explain: "Strong exhibit reading drives immediately to a so-what: 'The key insight is that APAC is growing at 40% YoY while North America is flat — the growth opportunity is clearly in APAC.' Listing numbers without interpretation is the most common weak-candidate exhibit pattern."
  },
  {
    topic: "Handling a mistake",
    q: "A candidate calculates a break-even volume of 10,000 units. The interviewer asks: 'Are you sure about that number?' The ideal candidate response is:",
    opts: [
      "Defend the original answer confidently — showing resolve under pressure",
      "Say 'close enough' and move forward with the recommendation",
      "Acknowledge the challenge, rework the math aloud with stated assumptions, then sanity-check the new result",
      "Ask the interviewer for the correct answer to save time"
    ],
    correct: 2,
    explain: "Staying composed, acknowledging the flag, reworking openly, and validating the result demonstrates both intellectual honesty and analytical rigor — both highly valued in consulting. Defensiveness or dismissiveness is far more damaging than the original arithmetic error."
  },
  {
    topic: "Signposting",
    q: "Which of the following is the strongest opening to a case structure presentation?",
    opts: [
      "'So I've been thinking about the problem and there are a few things we should look at…'",
      "'I'd like to organize this across three areas: first, the profitability drivers; second, competitive context; third, strategic options. I'll start with profitability because that's where I believe the root cause lies.'",
      "'Let me just start with cost analysis since that seems like the obvious issue.'",
      "'Before I begin, I have about 10 clarifying questions to make sure I understand the problem fully.'"
    ],
    correct: 1,
    explain: "Strong signposting previews the full structure, assigns an explicit order, and explains the prioritization rationale — all in one sentence. It gives the interviewer a map and demonstrates hypothesis-driven thinking simultaneously. Options A, C, and D lack at least one of these three elements."
  },
  {
    topic: "STAR method",
    q: "In a STAR behavioral answer, a candidate spends 70% of their response on Situation and Task. This is most likely to:",
    opts: [
      "Impress the interviewer with thorough contextual detail",
      "Frustrate the interviewer, since the evaluable content — Actions and Results — is underexplored",
      "Be ideal for leadership-specific behavioral questions",
      "Be acceptable if the situation was genuinely complex"
    ],
    correct: 1,
    explain: "Interviewers score on Action (what you specifically did) and Result (measurable impact). Spending 70% on S/T is one of the most common STAR mistakes. Target ~20% on Situation/Task and ~80% on Action/Result. Quantified results ('reduced cost by 18%') are always stronger than descriptive ones."
  },
];
