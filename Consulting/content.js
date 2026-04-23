/* =========================================================
   Casen — consulting / case-interview study data
   CARDS  (vocab + concepts, MC-friendly)
   FORMULAS  (quick reference)
   FRAMEWORKS  (case-type → buckets, accordion)
   CASES  (full walkthroughs of all 15 Darden 2024-25 cases)
   Source: Darden 2024-2025 Casebook
   ========================================================= */

const CARDS = [
  /* ---------------- Fundamentals (MC-friendly) ---------------- */
  { term:"Case Interview", cat:"Fundamentals", def:"A short, simplified version of a complete consulting engagement used to evaluate problem-solving, communication, and fit.", hint:"Usually 20–30 min of the 30–45 min interview." },
  { term:"Problem-Solving Ability", cat:"Fundamentals", def:"One of three interviewer evaluation criteria — structured approach, analytical/creative thinking, quantified recommendations.", hint:"Covered by: prompt, framework, math, brainstorming, conclusion." },
  { term:"Cultural Fit & Passion", cat:"Fundamentals", def:"Interviewer evaluation criterion — confident, energetic tone and shown (not told) history of teamwork.", hint:"Most visible in fit questions + closing Q&A." },
  { term:"5 Building Blocks of a Case", cat:"Fundamentals", def:"Prompt & clarifying questions → Framework → Exhibits & math → Brainstorming → Conclusion/Recommendation.", hint:"Every case follows this skeleton; skip a block and you lose structure points." },
  { term:"Profitability Case", cat:"Fundamentals", def:"Case type that diagnoses a profit decline or identifies ways to improve profitability. Levers: revenue (price × volume), costs (fixed vs variable), mix.", hint:"Ask: is the issue revenue-side or cost-side first." },
  { term:"Market Entry Case", cat:"Fundamentals", def:"Case type that analyzes an opportunity to expand or quantifies a viable market for a new product/geography.", hint:"Frameworks cover market, capability, financials, risk." },
  { term:"Growth Case", cat:"Fundamentals", def:"Case type that identifies revenue or market-share growth opportunities for an existing business.", hint:"Existing vs new customers × existing vs new products (Ansoff matrix)." },
  { term:"M&A / Acquisition Case", cat:"Fundamentals", def:"Case type evaluating whether a client should buy (or sell) another business — synergies, price, integration risks.", hint:"Standard buckets: target value, strategic fit, integration, alternatives." },
  { term:"Operations Optimization Case", cat:"Fundamentals", def:"Case type that identifies bottlenecks/process weaknesses and optimally allocates resources.", hint:"Look for the max-capacity resource = the bottleneck." },
  { term:"Grading Rubric (Darden)", cat:"Fundamentals", def:"Three dimensions: Case Execution (structure, insight), Communication (clarity, tidy work), Behavioral (clear, concise, relevant answers).", hint:"Strong cases always win on Execution AND Communication." },
  { term:"Difficulty Star System", cat:"Fundamentals", def:"Each case gets Overall / Quantitative / Qualitative ratings. Start with 1-star, work up to 3-star.", hint:"Qual-heavy cases emphasize brainstorming and framework creativity." },

  /* ---------------- Finance & Math (MC-friendly) ---------------- */
  { term:"NPV (Net Present Value)", cat:"Finance & Math", def:"Value of all future cash flows discounted to present minus initial investment.", hint:"NPV > 0 → create value; NPV < 0 → destroy value." },
  { term:"NPV of a Perpetuity", cat:"Finance & Math", def:"Cash Flow ÷ (Discount Rate − Growth Rate) = CF ÷ (r − g). If g = 0, simplifies to CF ÷ r.", hint:"Used for companies/assets assumed to generate CF forever." },
  { term:"Percent Change", cat:"Finance & Math", def:"(Ending Value − Beginning Value) ÷ Beginning Value. Positive = increase, negative = decrease.", hint:"Always divide by the STARTING value, not the ending." },
  { term:"Contribution Margin", cat:"Finance & Math", def:"Selling Price − Variable Costs. Represents dollars per unit available to cover fixed costs and profit.", hint:"Also expressed as CM Rate = CM ÷ Sales." },
  { term:"Breakeven Quantity", cat:"Finance & Math", def:"Fixed Costs ÷ Contribution Margin. Units you must sell before any profit.", hint:"Lower fixed cost OR higher CM → lower breakeven." },
  { term:"ROI (Return on Investment)", cat:"Finance & Math", def:"(Profits − Cost of Investment) ÷ Cost of Investment. Expressed as a %.", hint:"Cousin of payback period but emphasizes % return, not time." },
  { term:"Rule of 72", cat:"Finance & Math", def:"Approximate years to double an investment ≈ 72 ÷ annual interest rate (%).", hint:"At 8%/yr, money doubles in ~9 yrs." },
  { term:"Revenue (Price × Volume)", cat:"Finance & Math", def:"Typical formula: Revenue = Price × Volume. Decompose to isolate cause of revenue change.", hint:"Drop might be price erosion OR volume loss — diagnose which." },
  { term:"COGS", cat:"Finance & Math", def:"Cost of Goods Sold — direct cost of manufacturing a product/service (typically Material + Labor).", hint:"Sits right below Revenue on the income statement." },
  { term:"SG&A", cat:"Finance & Math", def:"Selling, General & Administrative expenses — all other administrative expenses in normal course of business (marketing, R&D, etc.).", hint:"Income statement line below Gross Profit." },
  { term:"EBITDA", cat:"Finance & Math", def:"Earnings Before Interest, Taxes, Depreciation, and Amortization. Proxy for operating cash generation.", hint:"= Revenue − COGS − SG&A." },
  { term:"EBIT", cat:"Finance & Math", def:"Earnings Before Interest and Taxes = Operating Profit. EBITDA − Depreciation.", hint:"Used to compute Operating Margin." },
  { term:"Gross Margin %", cat:"Finance & Math", def:"(Revenue − COGS) ÷ Revenue = Gross Profit ÷ Revenue.", hint:"Measures unit-level profitability before overhead." },
  { term:"Operating Margin %", cat:"Finance & Math", def:"EBIT (Operating Profit) ÷ Revenue. Profitability after direct + operating costs.", hint:"Better operator comparison than gross margin." },
  { term:"Net Margin %", cat:"Finance & Math", def:"Net Income ÷ Revenue. Bottom-line profitability after everything (incl. interest and taxes).", hint:"Final efficiency metric of the income statement." },
  { term:"Customer Acquisition Cost (CAC)", cat:"Finance & Math", def:"Marketing Expenses ÷ Newly Acquired Customers (typically yearly).", hint:"Compare against LTV to check unit economics." },
  { term:"Payback Period", cat:"Finance & Math", def:"Time for cumulative cash inflows to equal the initial investment. Simple form: Fixed Costs ÷ Contribution Margin.", hint:"Shorter payback = less risk exposure, but ignores long-tail value." },
  { term:"Top-Down Market Sizing", cat:"Finance & Math", def:"Total Population → # of users → market share → # units/user × price/unit = market size.", hint:"Start wide, narrow down via filters and %'s." },
  { term:"Bottom-Up Market Sizing", cat:"Finance & Math", def:"Current customers → potential customer base → future user base × units/user × price/unit.", hint:"Start narrow (your customers) and project outward." },

  /* ---------------- Consumer / Retail ---------------- */
  { term:"SKU", cat:"Consumer / Retail", def:"Stock Keeping Unit — unique product identifier used to track inventory.", hint:"One product, multiple sizes/colors = multiple SKUs." },
  { term:"In-Stock Rate", cat:"Consumer / Retail", def:"% of items available for immediate sale. Signals inventory health.", hint:"Low in-stock rate = lost sales + customer churn risk." },
  { term:"CRM", cat:"Consumer / Retail", def:"Customer Relationship Management — systems and practices for tracking and nurturing customer interactions.", hint:"Salesforce, HubSpot are common CRMs." },
  { term:"Omnichannel", cat:"Consumer / Retail", def:"Integration of online, mobile, and in-store channels into one customer experience.", hint:"Buy online, pick up in store = omnichannel in action." },
  { term:"Dynamic Pricing", cat:"Consumer / Retail", def:"Prices adjusted in real-time based on demand and/or competition.", hint:"Airlines, rideshare, Amazon use this constantly." },
  { term:"Loss Leader", cat:"Consumer / Retail", def:"Item sold at a loss to attract customers for other profitable sales.", hint:"Milk or rotisserie chicken near the back of a grocery store." },
  { term:"Mark-up", cat:"Consumer / Retail", def:"% added to cost to set selling price. Different from margin (which is a % of price).", hint:"$50 item with 100% mark-up sells for $100." },
  { term:"Inventory Turnover", cat:"Consumer / Retail", def:"Sales ÷ Inventory. How many times inventory is sold and replaced in a period.", hint:"Higher turnover = less capital tied up in stock." },
  { term:"Phygital Shopping", cat:"Consumer / Retail", def:"Blending of physical and digital shopping (AR/VR, smart mirrors).", hint:"Big trend in beauty, apparel retail." },
  { term:"Q-Commerce", cat:"Consumer / Retail", def:"Quick-commerce — sub-30-minute grocery/essentials delivery.", hint:"GoPuff, Getir, Gorillas are classic examples." },

  /* ---------------- Energy ---------------- */
  { term:"Upstream (E&P)", cat:"Energy", def:"Exploration & Production — finding, drilling, producing oil/gas/LNG.", hint:"The 'dirty hands' end of the value chain." },
  { term:"Midstream", cat:"Energy", def:"Processing, storage, marketing, and transport of oil/gas (most pipelines).", hint:"Think: moving the product." },
  { term:"Downstream", cat:"Energy", def:"Refineries, petrochemical plants, retail, natural gas distribution — closer to consumers.", hint:"Refined products and end-customer sales." },
  { term:"OPEC", cat:"Energy", def:"Organization of Petroleum Exporting Countries — cartel of 14 oil-producing nations.", hint:"Coordinates output to influence global oil prices." },

  /* ---------------- Transportation ---------------- */
  { term:"Load Factor", cat:"Transportation", def:"Capacity utilization — average actual utilization ÷ maximum capacity.", hint:"Airline term: % of seats filled." },
  { term:"ASM", cat:"Transportation", def:"Available Seat Miles = seats × miles. Total capacity offered.", hint:"Denominator in RASM/PRASM." },
  { term:"PRASM / RASM", cat:"Transportation", def:"Passenger/Revenue per Available Seat Mile. Primary airline efficiency metric.", hint:"Higher PRASM = each unit of capacity earned more." },
  { term:"Logistics", cat:"Transportation", def:"Coordinated operations involving many people, facilities, and supplies to move goods/services.", hint:"Usually refers to supply-chain flow management." },
  { term:"3PL", cat:"Transportation", def:"Third Party Logistics — outsourced logistics provider (warehousing, shipping, etc.).", hint:"Example: XPO, C.H. Robinson." },
  { term:"LTL", cat:"Transportation", def:"Less Than Load — small freight, more expensive per unit of weight/volume.", hint:"Used when you don't fill a whole truck." },
  { term:"FTL", cat:"Transportation", def:"Full Truck Load — large shipments, cheaper per unit.", hint:"Best economics when you can fill a whole trailer." },
  { term:"SAF", cat:"Transportation", def:"Sustainable Aviation Fuel — low-carbon alternative to jet fuel.", hint:"Key lever for airline decarbonization targets." },

  /* ---------------- Manufacturing / Agriculture ---------------- */
  { term:"JIT (Just-in-Time)", cat:"Manufacturing / Ag", def:"Pull-demand inventory — materials delivered as needed to minimize raw inventory holding cost.", hint:"Pioneered by Toyota. Fragile to supply shocks." },
  { term:"Commodity", cat:"Manufacturing / Ag", def:"Interchangeable, non-differentiated product (most agricultural products).", hint:"Price set by market, not by firm — hard to earn premium." },
  { term:"Bottleneck", cat:"Manufacturing / Ag", def:"The resource operating at max capacity, limiting total output.", hint:"Fix the bottleneck → throughput rises. Fix anything else → nothing changes." },
  { term:"Bushel", cat:"Manufacturing / Ag", def:"Dry measure of 1 cubic foot (≈ 8 gallons liquid) used for grain and fruit.", hint:"Standard US agricultural unit." },
  { term:"Outsource", cat:"Manufacturing / Ag", def:"Contracting an outside party for production/service — typically to save cost or access expertise.", hint:"Opposite of vertical integration." },

  /* ---------------- Financial Services ---------------- */
  { term:"AUM", cat:"Financial Services", def:"Assets Under Management — market value of all financial assets a firm manages on behalf of clients.", hint:"Core size metric for asset managers and PE firms." },
  { term:"Private Equity", cat:"Financial Services", def:"Investors/funds that invest directly into private companies (or take public → private) to improve operations and resell for return.", hint:"Typical hold period: 3–7 years." },
  { term:"M&A (Mergers & Acquisitions)", cat:"Financial Services", def:"Merger = two companies form new entity (e.g., DowDuPont). Acquisition = larger firm consumes smaller (e.g., Amazon + Whole Foods).", hint:"Terminology matters — 'merger of equals' often still has a dominant party." },
  { term:"ESG", cat:"Financial Services", def:"Environmental, Social, Governance investing — evaluates firms on non-financial risk/impact factors.", hint:"Drives big-pool allocations from pension funds, sovereign wealth." },
  { term:"DeFi", cat:"Financial Services", def:"Decentralized Finance — peer-to-peer lending, borrowing, trading without traditional intermediaries.", hint:"Runs on smart contracts over blockchains." },

  /* ---------------- Information Technology ---------------- */
  { term:"IP (Intellectual Property)", cat:"Information Technology", def:"Intangible creations protected by trademarks/copyrights/patents (software, code, algorithms).", hint:"Often the most valuable asset of a tech company." },
  { term:"Unicorn", cat:"Information Technology", def:"Privately-held startup valued > $1B, typically in software/tech.", hint:"Coined by Aileen Lee in 2013." },
  { term:"Freemium", cat:"Information Technology", def:"Majority of users engage for free (often in exchange for data/ads); paid tier adds features.", hint:"Spotify, Dropbox, Zoom classic cases." },
  { term:"SaaS", cat:"Information Technology", def:"Software as a Service — third-party hosts applications, delivered over the Internet.", hint:"Salesforce, Workday are textbook SaaS." },
  { term:"GDPR", cat:"Information Technology", def:"EU General Data Protection Regulation — strict data-privacy rules for EU residents' personal data.", hint:"Max fines: 4% of global revenue." },
  { term:"IoT", cat:"Information Technology", def:"Internet of Things — physical devices with sensors/software connected to exchange data.", hint:"Smart thermostats, connected cars, industrial sensors." },
  { term:"Edge Computing", cat:"Information Technology", def:"Reduces latency by processing closer to the data source, rather than in a central cloud.", hint:"Essential for autonomous vehicles, real-time video." },

  /* ---------------- Media & Entertainment ---------------- */
  { term:"Digital vs Linear", cat:"Media & Entertainment", def:"Linear = traditional broadcast/cable TV. Digital = online streaming (Netflix, YouTube).", hint:"Ad dollars shifting from linear → digital over past decade." },
  { term:"Ratings (Nielsen)", cat:"Media & Entertainment", def:"Measure of viewers of a program/time segment. Nielsen is the largest US provider.", hint:"Higher rating → higher ad rates chargeable." },
  { term:"Box-Office", cat:"Media & Entertainment", def:"Total revenue from movies shown at theaters.", hint:"Opening weekend is critical for Bollywood/Hollywood success metrics." },
  { term:"Cord Cutting", cat:"Media & Entertainment", def:"Abandoning traditional cable/satellite TV subscriptions for streaming alternatives.", hint:"Pressures ad-supported linear networks the most." },
  { term:"ARPU", cat:"Media & Entertainment", def:"Average Revenue Per User — core profitability metric in subscription businesses.", hint:"Especially tracked in streaming and telecom." },

  /* ---------------- Healthcare & Life Sciences ---------------- */
  { term:"Orphan Drug", cat:"Healthcare", def:"Pharmaceutical drug for small patient populations — often under-developed due to limited profitability.", hint:"US/EU regulators give tax breaks + exclusivity to incentivize development." },
  { term:"FDA", cat:"Healthcare", def:"Food & Drug Administration — US federal agency that protects food/pharma safety. Approval required for nearly all US drugs.", hint:"Phase I → II → III → Filing process." },
  { term:"Generic Drugs", cat:"Healthcare", def:"Same active-ingredient formula as a branded drug — cheaper, typically available after patent expiry.", hint:"Patent cliff = sudden revenue drop when patent expires." },
  { term:"Biotech vs Pharma", cat:"Healthcare", def:"Biotech uses live organisms (bacteria, enzymes). Pharma uses chemical synthesis.", hint:"Biologicals are newer, often more potent but harder to manufacture." },
  { term:"CRISPR", cat:"Healthcare", def:"Gene editing technology enabling precise DNA modification — key to gene therapy breakthroughs.", hint:"Enabling treatments for previously uncurable diseases." },

  /* ---------------- Telecommunications ---------------- */
  { term:"Carrier", cat:"Telecommunications", def:"Company authorized to operate telecom service (AT&T, Verizon, T-Mobile).", hint:"Often vertically integrated: network + retail + content." },
  { term:"OEM", cat:"Telecommunications", def:"Original Equipment Manufacturer — company whose goods are used as components in another firm's finished product.", hint:"Foxconn is the classic OEM for smartphones." },
  { term:"LAN", cat:"Telecommunications", def:"Local Area Network — locally owned data network (e.g., Ethernet, office Wi-Fi).", hint:"Contrast with WAN (Wide Area Network)." },
  { term:"Fiber Optic", cat:"Telecommunications", def:"Glass-strand transmission — ~100x faster than copper for data.", hint:"Backbone of modern internet infrastructure." },
  { term:"Network Slicing", cat:"Telecommunications", def:"Separate virtual wireless networks on shared cloud infra — enables personalized/low-latency 5G services.", hint:"Key 5G differentiation over 4G." },
];

/* =========================================================
   FORMULAS — quick-reference cheat sheet
   ========================================================= */
const FORMULAS = [
  { name:"NPV", formula:"Σ CFₜ / (1 + r)ᵗ  −  Initial Investment", note:"Positive NPV → accept. Discount each year's cash flow back to today." },
  { name:"NPV of a Perpetuity", formula:"CF ÷ (r − g)", note:"If g = 0, simplifies to CF ÷ r. Used when CF is assumed to continue forever." },
  { name:"Percent Change", formula:"(Ending − Beginning) ÷ Beginning", note:"Always divide by starting value, not ending." },
  { name:"Contribution Margin", formula:"Selling Price − Variable Costs", note:"CM Rate = CM ÷ Sales." },
  { name:"Breakeven Quantity", formula:"Fixed Costs ÷ Contribution Margin", note:"Units you must sell before any profit is earned." },
  { name:"ROI", formula:"(Profits − Cost of Investment) ÷ Cost of Investment", note:"Expressed as a percentage." },
  { name:"Rule of 72", formula:"Years to Double ≈ 72 ÷ Rate(%)", note:"Quick mental math for compounding." },
  { name:"Revenue", formula:"Price × Volume", note:"Decompose to find whether revenue moved on price or volume." },
  { name:"Gross Margin %", formula:"(Revenue − COGS) ÷ Revenue", note:"Also = Gross Profit ÷ Revenue." },
  { name:"Operating Margin %", formula:"EBIT ÷ Revenue", note:"Measures profitability after operating costs." },
  { name:"Net Margin %", formula:"Net Income ÷ Revenue", note:"Bottom-line profitability after interest + taxes." },
  { name:"Customer Acquisition Cost (CAC)", formula:"Marketing Expenses ÷ New Customers (yr)", note:"Compare vs LTV to check unit economics." },
  { name:"Market Size — Top-Down", formula:"Pop × Users × Share × Units/User × Price", note:"Filter wide funnel progressively narrower." },
  { name:"Market Size — Bottom-Up", formula:"Current Customers → Potential Base × Units × Price", note:"Project outward from your current base." },
  { name:"Income Statement (skeleton)", formula:"Revenue − COGS = Gross Profit; − SG&A = EBITDA; − D&A = EBIT; − Interest − Taxes = Net Income", note:"Memorize this stack cold." },
  { name:"Potential Savings — Equipment Switch", formula:"ΔProfit = [New Cap × P − New Eff × C] − [Old Cap × P − Old Eff × C]", note:"Transportation case formula." },
  { name:"Savings — New Manufacturing Equipment", formula:"(Old Time × Old Labor + Raw × Old Qty + Old Dep) − (New Time × New Labor + Raw × New Qty + New Dep)", note:"Manufacturing/ag case formula." },
];

/* =========================================================
   FRAMEWORKS — case-type → standard bucket set
   (Accordion: not MC-appropriate)
   ========================================================= */
const FRAMEWORKS = [
  { name:"Profitability", buckets:[
    "Revenue side: Price (list vs effective), Volume (segment, mix), Channel",
    "Cost side: Variable (COGS, labor, materials), Fixed (overhead, lease, SG&A)",
    "Segment analysis: by product, customer, geography — find the loss leader",
    "External: macro/competitor pressure, input-price shocks, demand shifts"
  ], note:"Start with: 'Is the change revenue-side or cost-side?' Then decompose."},
  { name:"Market Entry", buckets:[
    "Market attractiveness: size, growth, segmentation, trends",
    "Competition: current players, share, barriers, likely response",
    "Company capability: resources, expertise, synergies, fit",
    "Financial: investment, projected profits, payback, NPV",
    "Risks & mitigation: regulatory, competitive, execution"
  ], note:"Jane Darden, Cruising Into Bollywood, Opus Two, Weasleys all use this shape."},
  { name:"Growth", buckets:[
    "Existing customers × existing products (upsell, pricing, retention)",
    "Existing customers × new products (cross-sell, bundles, R&D)",
    "New customers × existing products (new geo, new segment)",
    "New customers × new products (innovation, adjacencies, M&A)",
    "Internal capacity: capability, org, capital for growth"
  ], note:"Ansoff matrix — pick 1–2 quadrants, justify why."},
  { name:"M&A / Acquisition", buckets:[
    "Target value: revenue, profit, pipeline, IP, customer base",
    "Strategic fit: product, geography, capability gaps filled",
    "Financial: price, synergies, standalone vs combined NPV",
    "Integration risk: culture, systems, key talent retention",
    "Alternatives: other targets, partnerships, build-in-house"
  ], note:"HuDisney + PharmaCo both use this structure."},
  { name:"Operations / Process", buckets:[
    "Pre-production: suppliers, quality of inputs, contract terms",
    "Production: capacity utilization, bottlenecks, downtime, labor",
    "Post-production: inventory, logistics, shipping, fulfillment",
    "Financial: cost/unit, waste, downtime cost, capex tradeoffs"
  ], note:"ChipCo, Kegging Costs, Pedal Pals all use this."},
  { name:"Pricing", buckets:[
    "Cost-based: unit cost + target margin",
    "Value-based: max the customer/partner will pay",
    "Competitor-based: price vs alternatives",
    "Deal mechanics: lump sum vs royalty, exclusivity, contract length",
    "Relationship: long-term, co-branding, option on future products"
  ], note:"Pineapple Express — always consider all three pricing approaches."},
  { name:"Cost Cutting", buckets:[
    "Labor: benefits, OT, cross-training, layoffs, remote, early retirement",
    "Production: warehouses, real estate, inventory, automation, outsourcing",
    "Finance: overhead, payment terms, asset liquidation",
    "External impacts: customer WTP, brand, competitive pricing, gym trends",
    "Risks: morale, QC, legal, brand reputation from layoffs"
  ], note:"Pedal Pals blueprint."},
  { name:"Non-Profit / Impact", buckets:[
    "Social/humanity: biodiversity, climate, food security, development",
    "Economic/financial: savings, additional income, costs (one-time + recurring)",
    "Operational feasibility: capability, local resource access, fundraising",
    "Risks/challenges: opportunity cost, geopolitics, corruption, acceptance"
  ], note:"Hydrogenous template — impact first, then ROI."},
];

/* =========================================================
   CASES — full walkthroughs of all 15 Darden 2024-25 cases
   (Accordion: prompt → framework → math → recommendation)
   ========================================================= */
const CASES = [
  {
    id: 1,
    title: "Catch Me Or I Go, HuDisney",
    industry: "Media & Entertainment",
    type: "M&A",
    difficulty: "3 / 3 / 2",
    behavioral: "What industry fascinates you? Please share something current happening in that industry.",
    prompt: "Client is Disney. As streaming competition intensifies and consumers prefer consolidated services, Disney is considering merging Hulu into Disney+. Evaluate viability and strategize implementation.",
    clarifying: [
      "Goal: Increase streaming revenue.",
      "Platforms: Disney+ = family-friendly (Pixar, Star Wars, Marvel); Hulu = broader content (ABC shows, movies, originals).",
      "Geography: Both serve similar global markets."
    ],
    framework: [
      "Streaming Market — trends, consumer prefs, segmentation, competition (share %)",
      "Profitability — revenue (subscription, ads, ARPU); costs (upfront, synergies, infra, marketing); breakeven",
      "Internal Capability — human capital (restructuring, culture); tech integration (infra, CMS, subscriber DB)",
      "Marketing — content leverage, UX (personalized recs), brand perception"
    ],
    math: [
      "Exhibit 1 — Market Share: Netflix 40% | Disney+ 30% | Amazon 15% | Hulu 10% | Others 5%. Disney+ + Hulu = 40% = Netflix. Successful integration → market leader.",
      "Current revenue: Disney+ 100M × $7 × 12 = $8.4B. Hulu 35M × $11 × 12 = $4.62B. Total = $13.02B.",
      "Switchers to $15/mo bundle: (100M − 15M) × 20% = 17M from Disney+; (35M − 15M) × 25% = 5M from Hulu. Plus 15M overlap = 37M bundle subs.",
      "Projected: Bundle 37M × $15 × 12 = $6.66B; D+ only 68M × $7 × 12 = $5.71B; Hulu only 15M × $11 × 12 = $1.98B. Total $14.35B.",
      "Delta vs current: +$1.33B."
    ],
    brainstorm: "Post-integration marketing: Digital Ads (SEM, SEO, targeted social). Content Marketing (exclusives, influencers). Customer Engagement (loyalty rewards, family plans, community, live events).",
    recommendation: "Proceed with integration + bundled sub → $1B+ revenue gain, market-leader position. Risks: subscriber churn (esp. adult-oriented Hulu audience); brand dilution. Next steps: phased rollout; market-test bundle in select regions."
  },
  {
    id: 2,
    title: "Cruising Into Bollywood",
    industry: "Entertainment",
    type: "Market Entry",
    difficulty: "2 / 2 / 3",
    behavioral: "Tell me about a time you had to deal with a difficult stakeholder. Describe the situation and how you navigated conflicts.",
    prompt: "Client is Dom Cruise, a Hollywood action star wanting to enter Bollywood. Assess potential and approach for market entry.",
    clarifying: [
      "Goal: Film debuts with $250M+ opening weekend AND ≥ 4.5-star rating.",
      "Bollywood: Production houses + celebrities drive crowds; musical/dance sequences central; measured by opening weekend box office; multiplexes + single-screen theaters.",
      "Dom's perception: Positive — globally renowned, seen as an international-appeal boost."
    ],
    framework: [
      "Bollywood Market — size/share, genres, global reach, prior international stars, influencers, brand",
      "Opening Weekend Revenue — ticket price, volume/distribution, off-screen (merch, promos, sponsorships)",
      "Production Capabilities — production house partnership, talent (director, cast), tech, safety, financing"
    ],
    math: [
      "Market: 120,000 single-screen (6 showings/day) + 75,000 multiplex (12 showings/day). 200 tickets/show at $1.",
      "House A: 100%×120k×6×200 + 33%×75k×12×200 = $144M + $60M = $204M.",
      "House B: 50%×120k×6×200 + 100%×75k×12×200 = $72M + $180M = $252M ✓",
      "House C: 25%×120k×6×200 + 50%×75k×12×200 = $36M + $90M = $126M.",
      "House D: 75%×120k×6×200 + 50%×75k×12×200 = $108M + $90M = $198M.",
      "→ House B meets $250M but has only 3.0 avg rating (need 4.5 → +50%).",
      "Exhibit 2: Co-star boosts (C1+25%, C2+25%, C3+16.67%, C4+10%); director boosts (D1+33%, D2+30%, D3+16.67%).",
      "Only compatible C+D combo reaching +50% is C1 × D2. Verify: 3.0 × (1 + 0.25 + 0.30) = 4.65 stars ✓"
    ],
    brainstorm: "Trap: assume high occupancy may not hold; Dom + C1/D2 untested chemistry; cultural/language barriers; Bollywood audience taste differs from action-hero norms.",
    recommendation: "Partner with House B + Co-star C1 + Director D2 → projected $252M opening and 4.65 stars. Risks: 100% occupancy assumption; compatibility. Next steps: cultural/language training, audience research, compatibility trials."
  },
  {
    id: 3,
    title: "Crunch Time at ChipCo.",
    industry: "Food & Beverage",
    type: "Operations",
    difficulty: "2 / 2 / 3",
    behavioral: "Revisit a time when you experienced a significant change and share the actions you took to adapt to the new circumstances.",
    prompt: "Client is Bryant, Plant Director at ChipCo (global tortilla chip producer). His NC plant has been missing customer commitments. Diagnose cause and propose solution.",
    clarifying: [
      "Goal: Meet sales commitments without excessive cost.",
      "Plant: Receives raw (corn, oil, seasonings); ships store-ready bags; has internal sales team.",
      "Timeline: ASAP but no hard constraint."
    ],
    framework: [
      "Pre-Production — supplier reliability, input quality, costs, contract terms, supply-chain disruptions, unrealistic sales commitments",
      "Production — capacity utilization, equipment downtime, labor productivity, SOPs, waste mgmt, tech utilization",
      "Post-Production — inventory mgmt, shipping timelines, logistics provider reliability, warehouse ops, comms with sales"
    ],
    math: [
      "Exhibit 1 insight: Seasoner is the bottleneck — uptime drops in summer (humidity → sticky paste), correlating with attainment drops.",
      "Exhibit 2 — costs per cleaning:",
      "Scheduled cleaning: 4 sanitation × $25 × 8 hrs + $50 × 8 = $800 + $400 = $1,200.",
      "Unscheduled: 4 × $25 × 20 + $32 × 20 + $50 × 20 = $2,000 + $640 + $1,000 = $3,640.",
      "Frequency table (Sched Cost | Unsched/mo | Unsched Cost | Total | Downtime):",
      "1x/mo: $1,200 | 1.5 | $5,460 | $6,660 | 38 hrs",
      "2x/mo: $2,400 | 1.0 | $3,640 | $6,040 ✓ | 36 hrs",
      "3x/mo: $3,600 | 0.75 | $2,730 | $6,330 | 39 hrs",
      "4x/mo: $4,800 | 0.5 | $1,820 | $6,620 | 42 hrs",
      "→ 2x/month minimizes both cost ($6,040) and downtime (36 hrs)."
    ],
    brainstorm: "Non-financial: chip quality, food safety, flavor consistency, tool reliability, manpower safety, regulatory cleanliness, brand damage from quality issues.",
    recommendation: "Two valid paths. A: 2x/month — minimizes cost + downtime (but unscheduled disruptions remain). B: 4x/month — maximizes predictability for sales commitments (costs 6 extra hrs/month). Next steps: implement cadence, align ops + commercial teams on realistic customer commitments."
  },
  {
    id: 4,
    title: "Hooville College",
    industry: "Education",
    type: "Growth",
    difficulty: "2 / 2 / 2",
    behavioral: "Discuss a time in which you had to convince others of a different way of doing something.",
    prompt: "Hooville College (liberal arts, ~4,000 students, humanities reputation) faces declining enrollment + rising tuition pressures. President considers: replace flat tuition with binding 5% of annual income for graduates' entire career.",
    clarifying: [
      "Proposed: 5% of annual income, post-graduation, for life.",
      "Current: Flat tuition + financial aid for some.",
      "Mission: 'Inspiring a Life of the Mind' — diverse student body, lifelong learning.",
      "Goal: Immediate enrollment boost + mission realignment."
    ],
    framework: [
      "Financial Value? — current vs proposed per-student LTV, magnitude of difference",
      "Mission Alignment? — recruitment, demographic shift, diversity impact",
      "Can We Implement? — cash-flow during transition, alumni giving impact, operational (collection), reputational (Dept of Ed, alumni, profs)"
    ],
    math: [
      "Per-student LTV (Current): $50k × (1 − 0.34) × 4 yrs = $33k × 4 = $132,000.",
      "Per-student LTV (Proposed): perpetuity = $150k × 5% ÷ 5% = $150,000 (rates cancel).",
      "Per-class (Current): 2,000 × 50% × $132k = $132M.",
      "Per-class (Proposed, before mix): 3,600 × 33% × $150k = $180M.",
      "Weighted avg salary under proposed: 50% × $100k + 25% × $75k + 25% × $175k = $112.5k.",
      "Revised per-class (Proposed): 1,200 × $112,500 = $135M → +$3M vs current (~+2%)."
    ],
    brainstorm: "Rewards: aligns incentives; applications up → better mix/brand; differentiation; increased LTV. Risks: transition cash-flow; alumni giving cannibalization; Dept of Ed scrutiny; incentive distortions (students may under-invest effort).",
    recommendation: "Implement — modest LTV lift (+2%), large enrollment increase (1,200 vs 1,000), mission realignment. Risks: cash position and incentive issues. Next steps: liquidity analysis for the transition years."
  },
  {
    id: 5,
    title: "HR Co.",
    industry: "Professional Services",
    type: "Growth",
    difficulty: "2 / 2 / 1",
    behavioral: "Explain a challenging situation you encountered when working with someone with an opposing opinion.",
    prompt: "HR Co. is a US leader in HR outsourcing (HRO), historically serving SMBs with payroll + benefits. Tech-enabled new entrants have grown rapidly over the past 3 years. Assess competitive threat and recommend action.",
    clarifying: [
      "Model: Outsourced HR — à la carte (payroll, workers' comp) to fully-managed lifecycle; one-time + ongoing fees.",
      "Objective: Assess new-entrant threats; competitive response if needed.",
      "Timeline: Months, not years."
    ],
    framework: [
      "Outsourced HR Market — size/growth, segments, expanding or taking share",
      "Competitor Sales/Service Strategy — biz model, value prop, pricing, tech, customer prefs; incumbents vs new entrants",
      "HR Co. Internal — customer base & service mix, tech infrastructure, financial health",
      "Strategic Options — modernize, acquire entrants, or maintain status quo"
    ],
    math: [
      "Exhibit 1 — 2-yr growth rates:",
      "HR Co.: 4,000 → 4,200 = 5%.",
      "HR Inc.: 14,000 → 15,400 = 10%.",
      "Zeal: 750 → 1,000 = 33%.",
      "Wave: 250 → 500 = 100%.",
      "Others: 6,000 → 6,400 = 6.66%.",
      "Market total: 25,000 → 27,500 = 10%.",
      "→ HR Co. growing 5% vs 10% market → losing share. Zeal/Wave small but fastest-growing.",
      "Exhibit 2: Incumbents = low tech + low CSAT, high valuation. New entrants = high tech + high CSAT. → acquire/invest."
    ],
    brainstorm: "Tech disruption levers: LinkedIn/lead platforms for acquisition; online brand; reduced CAC via platform accessibility; cost reduction from tech-enabled service.",
    recommendation: "Acquire Wave/Zeal to gain tech capabilities — or invest internally in a tech build. Risks: overpaying for a hot company; large-corp change is hard. Next steps: due diligence + financing; internal capability follow-on."
  },
  {
    id: 6,
    title: "Hydrogenous",
    industry: "Non-Profit",
    type: "Other",
    difficulty: "3 / 3 / 2",
    behavioral: "What is your 'dream (consulting) project?'",
    prompt: "Hydrogenous is an NGO fighting desertification (part of UN convention). President Luke asks what factors to consider when selecting the next project.",
    clarifying: [
      "Desertification: natural/human causes reducing biological productivity of drylands.",
      "What they do: afforestation, reforestation, water supply, nature preservation — funded by foundations, governments, institutional donors.",
      "Target: shortest payback + biggest impact; flagship project to attract more philanthropic support."
    ],
    framework: [
      "Motivations — Social/Humanity (biodiversity, climate, food security, development); Economic (savings, additional income, one-time + recurring costs)",
      "Constraints — Operational feasibility (experience, expertise, local access, fundraising); Risks/challenges (opportunity cost, geopolitics, corruption)",
      "Guiding principle: as NGO, prioritize impact first"
    ],
    math: [
      "Project A (Water supplies for 30,000 residents): 20,000 units needed; 80% yield → 25,000 units × $300k/1,000 = $7.5M spread over 5 yrs = $1.5M/yr. Savings scale 0/20/40/60/80%.",
      "A cumulative net: Y1 −$1.5M; Y2 −$2M; Y3 −$1.5M; Y4 $0 (BE); Y5 +$2.5M. → Breakeven Year 4.",
      "Project B (Nature preserve): 5,000 visitors × 1 extra day × $200 = $1M; 1,000 new × 5 × $200 = $1M. Incremental revenue $2M/yr. Payback: $2M ÷ ($2M − $1.5M) = 4 yrs.",
      "Project C (Reforestation vs sandstorms): $40k upfront, $25k savings − $5k maintenance = $20k/yr net. Payback = $40k ÷ $20k = 2 yrs.",
      "Summary: A=4 yrs, B=4 yrs, C=2 yrs. Investment scale: A > B > C. Long-term benefit: A > B > C."
    ],
    brainstorm: "Positive: urgency of location, long-term impact horizon, global recognition. Negative: corruption, technical execution risk, local community acceptance.",
    recommendation: "Interviewee picks; must justify (NGO → impact-first). Risks: cost overruns, construction disruption, tourist estimation errors, low success rate on A. Next steps: mitigate risks (e.g., strong constructor sourcing for A to lift yield)."
  },
  {
    id: 7,
    title: "Jane Darden's Ranch",
    industry: "Hospitality",
    type: "Market Entry",
    difficulty: "2 / 2 / 2",
    behavioral: "Give me an example of a time you used data to solve a problem at work.",
    prompt: "Jane Darden owns Wahoo Cattle Ranch (Montana, family-owned since 1883). Local economy shifted toward high-end resorts/dining, squeezing margins. Should she enter hospitality?",
    clarifying: [
      "Current revenue: beef + milk; horseback riding, fly fishing, hiking tours.",
      "Timeline: breakeven within 3 years post-construction.",
      "Long-term goal: maximize annual net income."
    ],
    framework: [
      "Montana Hospitality Market — population, tourism size, disposable income, consumption, growth, competitors",
      "Finance — investment, Δ revenue, Δ cost (VC/FC), synergies",
      "Options — acquire resort, open own, keep farm, sell to hotel brand",
      "Other — regulation, competitive response, HR, brand alignment"
    ],
    math: [
      "Existing ranch earns $7M/yr (must subtract as loss if ranch is replaced).",
      "Holiday Resort: 400×360×80% = 115,200 room-nights × $300 = $34.56M ≈ $35M rev; VC 10% = $3.5M; FC = $15M; profit = $16.5M.",
      "Prime Resort: 300×360×75% = 81,000 × $500 = $40.5M ≈ $40M; VC 15% = $6M; FC = $15M; profit = $19M.",
      "Net after ranch loss: Holiday $9.5M, Prime $12M.",
      "Payback: Holiday $10M ÷ $9.5M ≈ 1 yr; Prime $30M ÷ $12M ≈ 2.5 yrs.",
      "→ Holiday pays back faster, but Prime maximizes long-term income ($19M > $16.5M) — primary goal wins."
    ],
    brainstorm: "External: competitor response (price wars); regulation (tax, licensing); hospitality volatility. Internal: workforce transformation ranch→resort; execution risk; family business objections.",
    recommendation: "Build Wahoo Prime Resort — increases annual income from $7M → $19M, breaks even within 3-yr window. Risks: capability mismatch, zoning, competitive price war. Next steps: workforce plan, regulatory due diligence, pricing strategy."
  },
  {
    id: 8,
    title: "Kegging Costs",
    industry: "Food & Beverage",
    type: "Operations",
    difficulty: "2 / 3 / 1",
    behavioral: "What is the most significant lesson you have learned from a failure?",
    prompt: "Large craft brewery, grown from 100k → 500k BBL in 3 years. CEO has $20M to allocate between (1) purchase kegs vs renew lease, (2) upgrade canning/packaging system.",
    clarifying: [
      "Primary goal: cost savings; secondary: support future growth.",
      "Production mix: 60% cans, 40% kegs.",
      "Conversions: 1 BBL = 2 kegs OR 14 (24-can) cases.",
      "Value chain: brewery → national distributors → retail/bars."
    ],
    framework: [
      "Keg Purchase Savings — initial contract cost, lease $/keg, purchase price, useful life + replacement rate",
      "Canning System Savings — efficiency (rate, waste), labor, waste cost (utilities ignored, 24hr ops)",
      "Non-cost Factors — future growth support, QC, operational complexity, long-term flexibility"
    ],
    math: [
      "Kegs needed/yr: 500k × 40% × 2 = 400k kegs.",
      "Lease 10-yr: 400k × $10 × 10 = $40M.",
      "Purchase 10-yr: 400k × $50 + 400k × 5% × $50 × 10 = $20M + $10M = $30M.",
      "→ Savings on kegs = $10M.",
      "Cases/yr: 500k × 60% × 14 = 4.2M.",
      "Current canner: 4.2M/600 = 7k canning hrs; labor 28k hrs × $25 = $700k; waste 420k × $20 = $8.4M. Annual $9.1M.",
      "New canner: 4.2M/1,200 = 3,500 hrs; labor 14k × $25 = $350k; waste 294k × $20 = $5.88M. Annual $6.23M.",
      "10-yr current $91M; 10-yr new $62.3M + ($20M acq − $1.3M salvage) = $81M.",
      "→ Savings on canner = $10M."
    ],
    brainstorm: "Tiebreaker: new canning supports future growth; kegs add ops complexity; labor costs may rise; canner tech may obsolete.",
    recommendation: "Either valid. Canning: efficiency supports future growth. Kegs: hedge against future lease increases. Risks: tech obsolescence; distribution complexity. Next steps: training + integration plan OR keg mgmt system."
  },
  {
    id: 9,
    title: "NewsCo.",
    industry: "Media",
    type: "Customer Experience",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about an important skill you developed. What was it and how did you go about developing it?",
    prompt: "NewsCo. is a TV network with live news + pre-recorded entertainment. Viewer trust is declining despite tagline 'News You Can Trust.' Identify root causes and recommend fixes.",
    clarifying: [
      "Survey: only 46% find NewsCo. trustworthy (4th of 6). 2018: 75%+ (ranked 1st).",
      "Has a website, but focus is TV.",
      "Revenue: mostly TV advertising; also cable subs, web ads, prepackaged content."
    ],
    framework: [
      "Content — Quality (accurate? credible? timely?), Tone (biased? sensationalistic?)",
      "Organizational — staffing (diversity, talent), org culture (scandals)",
      "External — societal (misinformation trends, definition shift), competitive (faster, social media)",
      "Avoid 'Financial' bucket — trust is the objective, not revenue"
    ],
    math: [
      "Exhibit 1: Opinion airtime up ~4× since 2014; Newsdesk down ~25%; viewership +25-30%.",
      "Exhibit 2 — 2022 market intel (rev/viewer × viewers):",
      "Newsdesk $4.50 × 510k = $2.30M (46%)",
      "Business $3.00 × 110k = $0.33M (7%)",
      "Documentary $2.50 × 20k = $0.05M (1%)",
      "Travel $3.50 × 170k = $0.60M (12%)",
      "Opinion $6.00 × 250k = $1.50M (30%)",
      "Food $5.00 × 45k = $0.23M (5%)",
      "Insight: Opinion = highest $/viewer but WORST trust. Food > Travel on both trust AND revenue. Reallocate Travel → Food to offset Opinion cut."
    ],
    brainstorm: "Bad recs: ignoring trust to chase revenue; ignoring revenue entirely.",
    recommendation: "Trust decline driven by Opinion growth. Reduce Opinion; invest in Newsdesk engagement + ads; swap Travel → Food to preserve revenue. Risks: reducing Opinion may cut engagement. Next steps: focus groups for Newsdesk engagement."
  },
  {
    id: 10,
    title: "Opus Two",
    industry: "Consumer",
    type: "Market Entry",
    difficulty: "3 / 2 / 3",
    behavioral: "Tell me about a decision you made at work that showcased your integrity.",
    prompt: "Opus Two, prestigious Napa winery producing a Meritage Red Blend. Climate change (droughts, fires) makes Napa unsuitable. Help choose new region + wine.",
    clarifying: [
      "Meritage: multi-grape red blend ('merit' + 'heritage').",
      "Owners: Darden WACC + Philly sommelier — goal is maintain production, quality, brand (not financial return).",
      "Sales: 10,000 cases/yr (120,000 bottles) at $500/bottle to high-end restaurants + DTC.",
      "Timeline: move ASAP once region selected."
    ],
    framework: [
      "Production Size & Quality — location, climate, geography (soil, altitude), resources (water, energy), threats",
      "Region's Perception — reputation, recognition, consumer preference, accessibility",
      "Capabilities/Feasibility — customer/employee buy-in, regional know-how, financial (land, labor, materials), local regulations"
    ],
    math: [
      "Bottles needed: 120,000. Grapes per bottle: 10 clusters. Clusters per vine: 40. Vines per acre: 1,000.",
      "Total clusters needed = 120,000 × 10 = 1,200,000.",
      "Clusters per acre = 40 × 1,000 = 40,000. Acres required = 30.",
      "Alternate: 40,000 ÷ 10 = 4,000 bottles/acre → 120,000 ÷ 4,000 = 30 acres.",
      "Finger Lakes, NY (36 acres, 32 clusters/vine cooler climate): 32 × 1,000 × 36 = 1,152,000 < 1.2M ❌",
      "Albemarle, VA (1,300,000/yr − 10% weather loss): 1.3M × 90% = 1,170,000 < 1.2M ❌",
      "Walla Walla Valley, WA (40 acres, WA law max 750 vines/acre): 750 × 40 × 40 = 1,200,000 ✓"
    ],
    brainstorm: "Napa land alternative uses: general grape growing (juice), fruits/veg, grains/olives; hotel/restaurant, events, tourism; sell; philanthropic donation.",
    recommendation: "Move Opus Two to Walla Walla Valley, WA — the only site with capacity for 120,000 bottles/yr. Risks: consumer pushback; lower regional reputation vs Napa. Next steps: survey current customers; competitive analysis of Walla Walla; repurpose Napa land."
  },
  {
    id: 11,
    title: "Pedal Pals",
    industry: "Technology",
    type: "Cost Improvement",
    difficulty: "1 / 1 / 1",
    behavioral: "(not specified in source)",
    prompt: "Pedal Pals is a Peloton-like interactive fitness platform with millions of members. Activist investor pressure — needs cost cuts.",
    clarifying: [
      "Supply chain: international suppliers for bike parts.",
      "Distribution: online (own site) + retail (owned)."
    ],
    framework: [
      "Internal — Labor (benefits, OT, cross-training, layoffs, geo footprint, early retirement, remote)",
      "Internal — Production (mfg warehouses, real estate live/recorded, inventory, automate, renegotiate, outsource)",
      "External Impacts — customer WTP, new customer acquisition, emerging tech, competition, gym trends",
      "Risks — employee retention, layoff morale, service/product quality, competitive pricing response"
    ],
    math: [
      "2024 projected revenue = expenses = $5B.",
      "Target 5% margin → costs = $4.75B → need $250M cut from cost base; plus cover 2023 loss of $125M → total cut needed = $375M.",
      "Options: Alt manufacturer $210M/yr. Close 30 of 90 offices at $500k ($30k utilities + $170k rent + $300k mgmt) = $15M/yr.",
      "Remaining gap after mfg + RE: $375M − $210M − $15M = $150M from layoffs.",
      "Layoff net savings = $170k cost saved − $20k severance = $150k/FTE.",
      "Layoffs needed = $150M ÷ $150k = 1,000 FTEs = 5% of 20,000 workforce."
    ],
    brainstorm: "Internal: fairness, timing, support, productivity, culture. External: legal liabilities, brand reputation, economic conditions, competition, country regulations, customer impact.",
    recommendation: "Switch manufacturer ($210M) + close 30 offices ($15M) + lay off 1,000 FTEs ($150M) = $375M cut. Risks: brand/morale/legal; outsourcing QC/IP/compliance. Next steps: execution timeline, shareholder comms, thoughtful layoff handling."
  },
  {
    id: 12,
    title: "PharmaCo",
    industry: "Pharmaceuticals",
    type: "M&A",
    difficulty: "2 / 3 / 2",
    behavioral: "Tell me about a time when you had to persuade someone to do something that they at first didn't want to do.",
    prompt: "PharmaCo ($10B annual revenue, Swiss HQ, global sales). Wants to enter biologicals. Considering acquiring BioLead (Austin biotech startup, ~$1B valuation). Evaluate.",
    clarifying: [
      "Core: small-molecule drugs (aspirin, BP, cholesterol).",
      "Why acquire: competitors are years ahead in biologicals → jumpstart via M&A."
    ],
    framework: [
      "Evaluation factors — BioLead pipeline value, R&D capabilities (talent, IP), marketing/sales capabilities (KOL relationships), acquisition price",
      "Great additions — existing partnerships, PharmaCo's capability gaps, alternatives (other targets, partnerships, build)"
    ],
    math: [
      "Phase success: I 70%, II 40%, III 50%, Filing 90%. Costs: I $160M, II $125M, III $75M, Filing $5M. Production costs 20% of sales.",
      "Expected revenue = $10B × 70% × 40% × 50% × 90% = $1,260M.",
      "Expected production cost = 20% × $10B × 12.6% = $252M.",
      "Expected R&D (cumulative phase probs): Phase 1 $160M × 100% + Phase 2 $125M × 70% + Phase 3 $75M × 28% + Filing $5M × 14% = $160M + $87.5M + $21M + $0.7M = $269.2M.",
      "SM1 valuation = $1,260M − $252M − $269.2M = $738.8M.",
      "vs $1B BioLead price → gap must be justified by future pipeline, IP, R&D capability."
    ],
    brainstorm: "R&D integration risks: little research overlap → minimal collaboration; culture clash (mature vs startup); language/time zones; talent departures post-acquisition.",
    recommendation: "Depends on pipeline depth and strategic value beyond SM1. Risks: integration (people, culture, geography); overpaying. Next steps: due diligence on full pipeline; talent retention plan."
  },
  {
    id: 13,
    title: "Pineapple Express",
    industry: "Technology",
    type: "Pricing",
    difficulty: "2 / 1 / 3",
    behavioral: "What accomplishment are you most proud of?",
    prompt: "Client is Alex DSouza, CEO of Moore Semiconductors (US startup). Built new microchip (ID-5) significantly faster/more efficient for smartphones. Pine-apple wants to use it in the new PA-25. Negotiations in a week. Help with pricing.",
    clarifying: [
      "Goal: price considering all startup interests.",
      "Mfg: silicon wafer → circuits via light/chemicals in clean environments.",
      "Relationship: no existing Pine-apple relationship."
    ],
    framework: [
      "Pricing Strategies — cost-based, value-based, competitor-based",
      "Chip Considerations — volume reqs, timely delivery, quality/failure standards",
      "Deal Mechanics — payment (lump vs royalty), contract duration, exclusivity, geography, termination",
      "Relationship — co-branding, long-term, rights to future Moore chips"
    ],
    math: [
      "Total wafer cost = $1,500 + $900 = $2,400. Usable chips = 60 × 80% = 48. Cost/chip = $2,400 / 48 = $50.",
      "Demand curve → Pine-apple profit: $800 × 3.2M = $640M; $900 × 2M = $600M; $1,000 × 1.6M = $640M; $1,100 × 1M = $500M.",
      "Best prices for PA-25: $800 or $1,000.",
      "At $1,000: $400 remaining for chip + Pine-apple margin. Assume 20% margin → $200. Max chip price = $400 − $200 = $200."
    ],
    brainstorm: "If negotiations fail: other smartphone OEMs; license chip; acquire a smartphone co; redesign for non-smartphone use; get acquired.",
    recommendation: "Defensible range — low price (startup, get contract, lose bargaining) or high price (margins to offset R&D, risk of competitor catch-up). Mitigations: multi-year exclusivity with YoY chip improvement commitments."
  },
  {
    id: 14,
    title: "Sticky Surfactants",
    industry: "Chemicals",
    type: "Profitability",
    difficulty: "1 / 1 / 1",
    behavioral: "Tell me about a time that you led a team. What challenges did you face?",
    prompt: "Client CavalierChem (global chemicals mfg). Recently acquired a surfactant factory as part of a larger competitor-asset purchase. Little prior surfactant experience. Facility unprofitable. What to do?",
    clarifying: [
      "Target: highest return from facility over next 5 years.",
      "Core: 80% commodity plastics; 20% related.",
      "Why acquired: bundled with other strategic assets.",
      "Market: $300M annual; CavalierChem + 1 competitor."
    ],
    framework: [
      "Increase Profitability — Revenues (price contracts, market share, new uses) + Costs (VC: COGS, labor, utilities; FC: overhead, maintenance, SG&A)",
      "Repurpose — similar-process products, alternative markets, CapEx/OpEx, timeline",
      "Divest — price achievable, competitor monopoly effect, customer relationships, employee impact",
      "Exclude acquisition price — sunk cost"
    ],
    math: [
      "Cost per lb identical (VC 2.3¢, FC 2.7¢). CC profit 0.5¢ vs competitor 2.0¢ → lever is price.",
      "Volume: 1.4M tons × 2,000 = 2.8B lbs. 75% on contract = 2.1B lbs.",
      "Price delta: 7.67¢ − 5.67¢ = 2¢/lb.",
      "Incremental profit = 2.1B × 2¢ = $42M/yr.",
      "5-yr comparison: Renegotiate $42M × 5 = $210M; Repurpose ($75M × 3) − $50M CapEx = $175M; Divest $200M."
    ],
    brainstorm: "Other price levers: sales-mix shift (contract vs spot); focus on top-paying customers; relationships (dinners, events); renegotiate; premium brand advertising. Product: sustainable production premium; modify product to reduce customer cost → capture savings.",
    recommendation: "Renegotiate contracts to 7.67¢/lb → +$42M/yr. Risks: customer pushback, market contraction. NPVs at 10% are roughly equivalent, so any defensible choice works. Next steps: investigate customer cost structures; solicit alternative asset-sale bids."
  },
  {
    id: 15,
    title: "Weasleys' Wizarding Warehouse",
    industry: "Retail",
    type: "Market Entry",
    difficulty: "2 / 1 / 2",
    behavioral: "Give me an example of a time you came up with a creative solution to a difficult problem.",
    prompt: "Fred and George Weasley run a magic joke shop in Diagon Alley (serves Hogwarts students). A second location in Hogsmeade is available. Does expansion make sense?",
    clarifying: [
      "Competitor: Zonko's in Hogsmeade. Weasleys expect to capture 30% of Hogsmeade market.",
      "Financial goal: breakeven within 4 years.",
      "Top products: fake wands, smart-answer quills, love potions."
    ],
    framework: [
      "Financials — profits, P×Q, VC, FC, upfront",
      "Market Attractiveness — trends, competitors, consumer size/segments/needs",
      "Capabilities — core competencies, resources, expertise",
      "Risks — timeline, implementation (buy vs build vs partner)"
    ],
    math: [
      "Diagon Alley original monthly: 400 × $10 + 300 × $20 + 200 × $30 = $4k + $6k + $6k = $16k.",
      "Annual (top 3) = $192k. Full (top 3 = 80%): $192k / 0.80 = $240,000/yr.",
      "Post-Hogsmeade monthly: (360+140)×$10 + (270+230)×$20 + (180+120)×$30 = $5k + $10k + $9k = $24k. Annual (top 3) = $288k. Full = $360,000/yr. Cannibalization: Diagon drops 10% across products.",
      "Incremental revenue: $360k − $240k = $120,000/yr.",
      "DA original costs: $108k VC + $22.8k insurance + $7.2k tax = $138k. Profit = $240k − $138k = $102k/yr.",
      "DA + Hogsmeade costs: $156k + $33.6k + $14.4k = $204k. Profit = $360k − $204k = $156k/yr.",
      "Incremental profit = $54k/yr. Payback = $200k ÷ $54k ≈ 3.7 yrs ✓ (under 4-yr goal)."
    ],
    brainstorm: "Risks: competition, further cannibalization, personnel, brand implications. Alternatives: R&D new products, expand Diagon Alley store, yield account, retire early.",
    recommendation: "Open Hogsmeade — raises annual profit $102k → $156k (+$54k); meets 4-yr breakeven (3.7 yrs). Risks: ongoing cannibalization; building vs buying may be better. Next steps: renovation partner sourcing; marketing/product programs."
  },

  /* =========================================================
     TUCK CONSULTING CLUB 2024 — 12 cases
     From the Tuck School of Business at Dartmouth. Includes LEK,
     EY-Parthenon, Innosight, IGS, Peter K and Tuck-authored cases.
     Exhibits extracted from the casebook with a couple of documented
     extraction gaps (Kitchen Co Ex A/B, Craft Co Ex A right half).
     ========================================================= */

  {
    id: 16,
    source: "tuck",
    title: "Aftermarket Auto Parts",
    industry: "Automotive",
    type: "Growth Strategy",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time when you had to quickly learn something new outside of your expertise.",
    prompt: "KLE Capital is evaluating acquiring ABC — a leading branded manufacturer of high-performance aftermarket engine air filters that last ~5× longer than standard filters. ABC sells through large retail auto parts stores (AutoZone, Napa), warehouse clubs (Walmart, Costco), auto repair shops, and e-commerce. ABC primarily serves the DIY channel with a small presence in DIFM (do-it-for-me). KLE wants to assess growth opportunities post-acquisition.",
    clarifying: [
      "Geography: 90% of ABC's sales are in North America.",
      "100% of ABC's sales are aftermarket (they replace OEM-installed parts).",
      "Business: excellent reputation for quality, strong customer following, high awareness among performance-minded drivers."
    ],
    framework: [
      "Geography — international expansion outside NA",
      "Product — adjacent aftermarket product lines leveraging brand",
      "Channel — DIFM expansion beyond DIY",
      "Vehicle type — motorcycles, boats, ATVs beyond automotive",
      "OEM — shift from pure aftermarket to factory-installed",
      "Pricing & S&M — selective price increases, targeted spend"
    ],
    math: [
      "DIFM market today: $500M, growing 3%/yr.",
      "Market in 3 yrs: $500M × (1.03)^3 ≈ $550M.",
      "ABC DIFM revenue in 3 yrs: 5,000 shops × $5,000 AOV = $25M.",
      "ABC's DIFM share in 3 yrs: $25M / $550M ≈ 4.5%."
    ],
    brainstorm: "Potential growth avenues: international expansion (outside NA), product line extensions (adjacent aftermarket categories), aggressive DIFM push, new vehicle types (motorcycles, boats, ATVs), OEM sales (factory-install), selective price increases, targeted S&M. Press for rationale on price/spend options — ABC already has high awareness in its core segment. For each opportunity: test via desk research → expert interviews → consumer surveys.",
    recommendation: "DIFM alone gets ABC to only ~4.5% share in 3 years — meaningful but not transformational. Recommend a portfolio: (1) push DIFM aggressively as the near-term lever (biggest, fastest), (2) run international + adjacent-product research in parallel for the 3-5 yr horizon, (3) treat OEM as a long-shot. Risks: DIFM shops may not value 'performance' story the way DIYers do; cannibalization of DIY as repair shops substitute. Next: consumer survey at repair shops, pilot in 3 metros.",
    source_label: "LEK / Tuck Consulting Club 2024"
  },

  {
    id: 17,
    source: "tuck",
    title: "Craft Co",
    industry: "Retail & CPG",
    type: "Growth Strategy",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time where you had to influence or persuade someone.",
    prompt: "Craft Co. is a subscription service that ships customers kits for adult crafting and DIY projects (watercolor, woodworking). Customers pay a monthly fee based on the number of kits they want. Craft Co. grew rapidly during COVID but has seen a dip in recent quarters as new competitors entered the field. Management wants (i) how has Craft Co. performed recently, and (ii) what strategies can it implement to grow profitability and regain share in the next 3-5 years?",
    clarifying: [
      "Target segment: young adults ages 18-35.",
      "Craft Co was first major player; new competitors started entering end of 2020.",
      "No specific ROI target — most interested in short-term (1-3 yr) strategies.",
      "US market only."
    ],
    framework: [
      "Profitability — subscription revenue × subs, variable COGS + fixed marketing",
      "Market — size, growth, trajectory, competitors, trends",
      "Product — pipeline, R&D, new lines (children's kits, cooking kits)",
      "Execution — increase growth (marketing) vs reduce costs (CAC, streamline components)"
    ],
    math: [
      "Q4 2020 subscribers: 75k (45k × 1-kit + 30k × 2-kit).",
      "Revenue: 45k × $50 × 3 + 30k × $80 × 3 = $6.75M + $7.2M ≈ $14M/quarter.",
      "Variable cost: 1-kit $50 × 45k × 3 = $6.75M (breakeven); 2-kit $60 × 30k × 3 = $5.4M.",
      "Total VC ≈ $12M; Fixed cost $2M ops + $8M marketing = $10M.",
      "Quarterly profit: $14M − $12M − $10M = −$8M (operationally unprofitable, marketing-driven).",
      "Subscribers peaked April 2020 at ~120k, declined to ~72k by Dec 2020."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A (left) — Craft Co Q4 2020 revenue & cost structure",
        columns: ["Segment", "Price", "Cost", "% of subs"],
        rows: [
          ["1 kit / month", "$50", "$50", "60%"],
          ["2 kits / month", "$80", "$60", "40%"],
          ["Operating costs / Q", "—", "$2M", "—"],
          ["Marketing costs / Q", "—", "$8M", "—"]
        ],
        note: "Source: Internal company data. 1-kit segment is a breakeven — variable cost equals price."
      },
      {
        type: "line",
        title: "Exhibit A (right) — Monthly subscribers 2019-2020 (reconstructed)",
        points: [
          { x: "J19", y: 50 }, { x: "F19", y: 54 }, { x: "M19", y: 58 }, { x: "A19", y: 62 },
          { x: "M19", y: 66 }, { x: "J19", y: 70 }, { x: "J19", y: 75 }, { x: "A19", y: 80 },
          { x: "S19", y: 85 }, { x: "O19", y: 90 }, { x: "N19", y: 95 }, { x: "D19", y: 100 },
          { x: "J20", y: 105 }, { x: "F20", y: 110 }, { x: "M20", y: 115 }, { x: "A20", y: 120 },
          { x: "M20", y: 115 }, { x: "J20", y: 105 }, { x: "J20", y: 95 }, { x: "A20", y: 88 },
          { x: "S20", y: 82 }, { x: "O20", y: 78 }, { x: "N20", y: 75 }, { x: "D20", y: 72 }
        ],
        unit: "k subscribers",
        note: "⚠️ SYNTHETIC reconstruction — right half of original slide did not extract. Series anchored to verified facts: Q4 2020 avg = 75k (from Part 1 math), pandemic peak April 2020, documented decline pattern."
      },
      {
        type: "table",
        title: "Exhibit B — Craft Co. vs competitor perceptions (1-5 scale)",
        columns: ["Factor", "Craft Co.", "Avg others", "Importance"],
        rows: [
          ["Price", "4.3", "2.4", "High"],
          ["Delivery speed", "2.5", "3.8", "High"],
          ["Kit quality", "3.7", "3.2", "High"],
          ["Time required for craft", "2.3", "3.1", "Mid"],
          ["Variety of craft types", "3.4", "3.6", "Mid"],
          ["Variety of difficulty levels", "3.1", "3.0", "Low"]
        ],
        note: "Source: Survey of recent craft kit purchases. Craft Co wins on price + quality, loses on delivery + convenience."
      }
    ],
    brainstorm: "Revenue levers: grow share-of-wallet with existing customers, new geographies, new channels (retail partnerships). Cost levers: rework the marketing mix ($8M/Q dwarfs ops), streamline 1-kit SKU (currently breakeven). Stabilization levers: better differentiation from new entrants, loyalty incentives, acquire a competitor. Reposition as premium — survey shows customers already rank Craft Co #1 on quality & willing to pay more.",
    recommendation: "Two-track plan: (i) raise prices 15-20% to reposition as 'premium' (quality rank already #1, pricing gap vs competitors suggests headroom); (ii) cut marketing spend ~30% — $8M/Q is unsustainable and growth is coming from pandemic tailwind, not ROAS. Fix delivery (the biggest perception gap). Risks: churn from price increase; competitor response. Next: A/B test pricing in 2 markets; supply-chain review on delivery; buyer-side M&A screen on top 2 competitors."
  },

  {
    id: 18,
    source: "tuck",
    title: "Hanover Health",
    industry: "Healthcare",
    type: "M&A",
    difficulty: "3 / 3 / 3",
    behavioral: "How would you approach a situation where you disagreed with a decision that was made?",
    prompt: "A PE fund is evaluating the acquisition of Hanover Health (HH), which operates urgent care clinics across the US and has grown quickly over the past 5 years. The client has little industry experience but wants to grow EBITDA each year with minimal CapEx over a 3-5 year horizon. Candidate is being asked for a yes/no decision, not a valuation.",
    clarifying: [
      "HH services customers with healthcare only (no insurance issues). 3 out-patient procedures: vaccinations, physicals, x-rays.",
      "Objective: EBITDA growth above 10% CAGR.",
      "Exit: standard 3-5 year hold.",
      "PE client has no healthcare experience but does own a nurse-staffing / talent mgmt portco.",
      "Out-patient urgent care is highly fragmented → good growth runway.",
      "Primary profit drivers: cost-effectiveness and time efficiency per procedure."
    ],
    framework: [
      "HH Profitability — revenue (# visits × $ per proc), cost (variable: staff + single-use; fixed: SG&A + equip), time per proc",
      "Market — out-patient urgent care size + growth, patient needs, substitutes (hospitals, mobile clinics)",
      "Strategic — portfolio synergies with nurse-staffing portco; risks from healthcare inexperience"
    ],
    math: [
      "Revenue CAGR 2019-23: 100 → 190 = 17% — strong and accelerating.",
      "EBITDA: 30 → 38 = only 6% CAGR, missing 10% hurdle.",
      "EBITDA margin fell 30% → 20% in 2023 (x-ray launch year).",
      "2023 without x-ray fixed costs: EBITDA + (equip 20 + training 12 = 32) = 38 + 32 = 70, margin 70/190 = ~37%.",
      "2024 expected (no fixed x-ray, variable only): x-ray variable ~$20M, total costs ~$47.5M.",
      "EBITDA 2024 est: 190 × 1.17 − 47.5 ≈ 174. CAGR 2019→24 on a normalized base → ~12%, clears 10% hurdle.",
      "Out-patient urgent care market: $4.75T × 4% = $190B. HH share: $190M / $190B ≈ 0.1% (room to run).",
      "Full urgent care (in + out): $4.75T × 20% ≈ $950B."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Revenue & EBITDA, 2019-23 ($M)",
        columns: ["Year", "Revenue", "EBITDA", "Margin"],
        rows: [
          ["2019", "100", "30.0", "30%"],
          ["2020", "114", "34.2", "30%"],
          ["2021", "130", "39.0", "30%"],
          ["2022", "150", "45.0", "30%"],
          ["2023", "190", "38.0", "20%"]
        ],
        note: "Revenue CAGR 17%; EBITDA CAGR only 6% (below the 10% hurdle). Margin compression in 2023 — x-ray launch year."
      },
      {
        type: "table",
        title: "Exhibit B — Costs by procedure ($M)",
        columns: ["Procedure", "2021", "2022", "2023"],
        rows: [
          ["Vaccinations", "91.0", "105.0", "152.0"],
          ["Physicals", "27.3", "31.5", "39.9"],
          ["X-Rays", "—", "—", "63.7"],
          ["Total", "118.3", "136.5", "255.6"]
        ],
        note: "X-Ray cost breakdown 2023: Equipment 50% ($31.9M fixed), One-time training 30% ($19.1M fixed), Nurse salaries 20% ($12.7M variable). X-rays have ~20% variable cost share vs vaccinations 30% and physicals 70% — lower unit cost once the fixed layer is absorbed."
      },
      {
        type: "table",
        title: "Exhibit C — US healthcare market by segment, 2023 (% of $4.75T)",
        columns: ["Segment", "Out-patient", "In-patient"],
        rows: [
          ["Urgent Care", "4%", "0%"],
          ["Hospitals", "10%", "16%"],
          ["Mobile Health Clinics", "28%", "42%"]
        ],
        note: "Urgent Care Out-Patient = 4% × $4.75T = $190B. HH market share ≈ 0.1% — highly fragmented."
      },
      {
        type: "table",
        title: "Exhibit D — Customer survey: HH vs Provider A vs Provider B (1-5)",
        columns: ["Factor (ranked by importance)", "HH", "Provider A", "Provider B"],
        rows: [
          ["Quality",              "4.1", "4.7", "4.0"],
          ["Speed of service",     "3.7", "4.5", "3.2"],
          ["Consistency",          "4.0", "4.4", "4.5"],
          ["Range of services",    "4.0", "3.2", "4.5"],
          ["Cleanliness",          "—",   "—",   "—"],
          ["Friendliness of staff","—",   "—",   "—"],
          ["Price",                "—",   "—",   "—"]
        ],
        note: "Survey of urgent care out-patients, end of 2023. A, B = comparable out-patient-only clinics. HH worse than A on quality/speed/consistency, better on range; worse than B on consistency/range, better on quality/speed — consistent with learning curve on the 2023 x-ray launch."
      }
    ],
    brainstorm: "Risks: customer survey shows HH weakness vs 2 competitors (service launch drag); revenue growth could slow; execution risk for PE with no healthcare background. Mitigations: nurse-staffing portco can accelerate x-ray hiring + cross-training; fund an ops playbook for service launches; hire a medical-ops operating partner. Upside: market is $190B and fragmented — plenty of M&A roll-up targets; higher-margin x-rays continue improving the mix.",
    recommendation: "YES, acquire. Headline EBITDA CAGR of 6% is misleading — stripping one-time x-ray fixed costs normalizes 2024 CAGR back above 10% hurdle, and x-rays are the highest-margin line going forward. $190B fragmented market gives ample roll-up opportunity for minimal CapEx. Risks: x-ray learning curve dragging satisfaction → address with nurse-staffing synergy. Next: due diligence on training economics, roll-up target list, customer-satisfaction tracking."
  },

  {
    id: 19,
    source: "tuck",
    title: "Kitchen Co",
    industry: "Retail & CPG",
    type: "Growth Strategy",
    difficulty: "2 / 2 / 3",
    behavioral: "How do you ensure quality in your work while managing multiple tasks?",
    prompt: "A global consumer product company (Kitchen Co) makes small home appliances — blenders, toasters, slow cookers, coffee makers, food preservation, irons, fans, clippers. US brands are typically #1 or #2 in their categories; international is small but growing. Senior execs believe the company has enjoyed considerable growth and profitability for the past decade. CEO Adam thinks 'business as usual' won't sustain the company for long, but his leadership team doesn't share his concerns. He wants our help to identify internal and external forces that could reshape the business over the next 10 years — and recommend how Kitchen Co should act.",
    clarifying: [
      "10-yr aspirations: global leader in home solutions, shift from pure durables to durables + consumables.",
      "Financials: $3.5B total revenue, 35% gross margin.",
      "Current CVP: mid-tier electric appliances, trusted brand names, sold through mass retailers (Walmart, Target), no marketing beyond packaging.",
      "Current profit formula: sell-in to retailers (no price control), relatively low margin vs premium, small admin headcount, strong sales support.",
      "Market used to be 3 tiers (low/mid/premium). Today it's 4 (low / mid / premium mass / premium luxury)."
    ],
    framework: [
      "Current Business — financials, US vs Intl, current business model",
      "Market Dynamics — trends, consumer behavior, competition",
      "Future Aspirations — finances, market position, business model",
      "Hypothesis — Kitchen Co needs to change strategy to deliver 'considerable growth'"
    ],
    math: [
      "US revenue roughly flat at ~$2.8B — low margin growth.",
      "International ~$700M — small but primary growth driver.",
      "At 35% GM on $3.5B: GP ≈ $1.2B.",
      "To hit 'considerable growth' target (say 8% CAGR × 10 yrs), must nearly double → need both Intl expansion + new consumable/service business models.",
      "(Specific multi-year figures degraded by extraction gap — see Exhibit A note.)"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Kitchen Co financials 2009-2013",
        columns: ["Metric", "Availability"],
        rows: [
          ["Revenue by region (US vs Intl)", "Chart lost in extraction"],
          ["Segment margin mix",             "Chart lost in extraction"],
          ["Growth rate vs plan",            "Chart lost in extraction"]
        ],
        note: "⚠️ EXTRACTION GAP: Exhibit A is a financial chart 2009-2013. Chart failed to extract. Only the footnote 'financial data from 2009 to present year, 2013' survived. Ask candidate which metric they want — discuss qualitative trend: US flat, Intl small but growing, overall growth below 'considerable' claim."
      },
      {
        type: "table",
        title: "Exhibit B — Kitchen Co industry trends",
        columns: ["Force", "Qualitative direction"],
        rows: [
          ["Demographics", "Aging dev markets + growing dev-market middle class"],
          ["Urbanization", "Smaller homes + more meal services (threat)"],
          ["Online retail", "Growing rapidly, moving mobile-first"],
          ["Technology", "Rapid — build vs partner decision"],
          ["Household roles", "Changing — more women outside home, kitchen as status symbol"]
        ],
        note: "⚠️ EXTRACTION GAP: Exhibit B is image-only and fully failed extraction. Substituted with the qualitative trend categories referenced in the Part 2 answer — candidate should still be able to reason about direction."
      }
    ],
    brainstorm: "Examples of what you want to HEAR from candidate: Growth is slower than 'considerable' claim; US flat, international tiny but driving margin/revenue growth. What you DON'T want to hear: 'Overall growth looks good' (misses US stagnation). On market dynamics: aging dev markets (simpler, lighter products); emerging-market middle class (intl growth); urbanization (smaller appliances or meal-service threat); online retail (mobile-first); tech pace (build vs partner); shifting household roles.",
    recommendation: "Kitchen Co needs a multi-part pivot: (1) invest in both US (defend/refresh) and international (scale) — US getting squeezed between low-end and premium-luxury; (2) move from pure durables to durables-plus-consumables (razor/blade model on food prep, coffee, water filtration); (3) partner for tech capability rather than build in-house. Risks: cannibalization of legacy retail relationships, need brand extension discipline. Next: innovation pipeline, partnership/M&A scan, Intl market entry plan. Candidate must drive direction — case rewards ambiguity tolerance + creative thinking."
  },

  {
    id: 20,
    source: "tuck",
    title: "Luxury Landscaping",
    industry: "Engineering & Construction",
    type: "M&A",
    difficulty: "3 / 2 / 2",
    behavioral: "Discuss a time you took the initiative to address an unspoken issue.",
    prompt: "A PE firm is considering investing in a luxury residential landscaping company focused on large-scale renovation projects for high-value homes ($2MM+). As part of a post-acquisition growth plan, the client wants to study Los Angeles County to evaluate its appeal as a target for geographic expansion.",
    clarifying: [
      "Service: total landscape renovation (pools, foliage, beds, patios). Triggers: home sale or major upgrade.",
      "Frequency: ~every 20 years. Price: ~10% of home value.",
      "~100-200 small players in the market, each doing <25 projects/yr."
    ],
    framework: [
      "Market size — # relevant homes × renovation rate × price",
      "Potential share — competitor count, competitor focus, product-market fit",
      "Potential profit — upfront cost, financing cost, revenue, running cost",
      "Risks — housing market (price shocks), macro (rates, recessions)"
    ],
    math: [
      "LA County pop 10M / avg household size 6 = ~1.7M households.",
      "% homes $2MM+: ~10% → 170k homes.",
      "% single-family (not apt): ~75-80% → ~130k.",
      "% with large-enough lot: ~65-70% → ~55-60k addressable homes.",
      "Projects/yr: 55-60k / 20-yr cycle = ~2,500-3,000 projects.",
      "% outsourced to 3rd party: ~95-100% → ~2,500-3,000 projects.",
      "Avg home value ~$2.5-3M → project price = 10% × value = $250-300k.",
      "Addressable market: ~2,750 projects × $275k ≈ $750M."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — LA County demographic & pricing data",
        columns: ["Input", "Value"],
        rows: [
          ["LA County population",              "10M people"],
          ["Average household size",            "~6 people"],
          ["Median home sale price",            "$850K"],
          ["Target population",                 "Households $2MM+ in value"],
          ["Project price",                     "~10% of home value"],
          ["Project redo rate",                 "~20 years"]
        ],
        note: "Source: LA County demographic data. Candidate must layer assumptions (% of homes $2MM+, % single-family, % with large lot) on top."
      }
    ],
    brainstorm: "Beyond size: market growth outlook; cyclicality vs recessions; competitive intensity / fragmentation / roll-up targets; seasonality; labor availability and wage trends. Growth drivers: residential construction & renovation spend; population growth; single-family mix; home values; renovation frequency; financing dynamics. Remember the client is the PE firm — evaluating attractiveness of the market, not the company.",
    recommendation: "LA County is an attractive expansion target: ~$750M addressable market, highly fragmented (100-200 sub-scale players doing <25/yr each) — ideal for a roll-up acquirer. Growth likely to outpace US GDP given home-value inflation and renovation frequency. Risks: housing price shocks, recession exposure, interest-rate-driven financing pullback. Next steps: competitive mapping of top 10 players, labor pipeline analysis, pilot acquisition thesis on 2-3 targets."
  },

  {
    id: 21,
    source: "tuck",
    title: "Nutters of Savile Row",
    industry: "Retail & CPG",
    type: "Operations",
    difficulty: "2 / 3 / 2",
    behavioral: "At the end of this process, you get offers from X, Y, and Z firms — how do you think about making that decision?",
    prompt: "Our client is Nutters of Savile Row, a legendary London tailor that opened in 1969 and dressed Mick Jagger, Twiggy, Elton John, and three of the four Beatles on the Abbey Road cover. Nutters offers both made-to-measure suits (machine-cut from an existing pattern, adjusted to measurements) and bespoke suits (fully hand-made, pattern cut from scratch). Owner Alan Lewis is hearing customer grumblings and fears declining customer satisfaction. What could be driving it?",
    clarifying: [
      "Main store on Savile Row + artisan workshop on Beak Street (a few blocks away).",
      "Customer complaints picked up in the past two months.",
      "No recent changes to their regular manufacturing processes.",
      "Process capacity data available later in the case."
    ],
    framework: [
      "Quality — reputation (brand, exclusivity), expertise, fit & attention to detail, feel",
      "Cost — price vs customer expectations (\"value\"), price vs competitors (\"deal\")",
      "Speed — wait time at intake (arrival, throughput); delivery time (process + waiting + WIP)",
      "Flexibility — accessibility (hours, location), selection, service"
    ],
    math: [
      "Made-to-Measure capacity (hrs/month × FTE ÷ hrs/order):",
      "  Measuring: 160 × 1 / 1 = 160 orders",
      "  Sewing: 160 × 5 / 16 = 50 orders",
      "  Finishing: 160 × 1 / 4 = 40 orders  ← bottleneck",
      "Bespoke capacity (steps 2+3 share 5 FTEs):",
      "  Measuring: 160 × 1 / 4 = 40 orders",
      "  Patterning+Sewing: 160 × 5 / 32 = 25 orders  ← bottleneck",
      "  Finishing: 160 × 2 / 8 = 40 orders",
      "MTM demand in April/May (42, 44) exceeds 40 capacity → delay caused by MTM.",
      "Anson adds capacity: MTM finishing → 160 × 2/4 = 80 (sewing becomes new bottleneck @ 50, so Anson = +10 orders); Bespoke P+S → 160 × 6/32 = 30 orders (+5).",
      "Profit from Anson: MTM +10 × $350 = $3,500/mo OR Bespoke +5 × $900 = $4,500/mo."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Orders accepted, last four months",
        columns: ["Month", "Made-to-Measure", "Bespoke", "Total"],
        rows: [
          ["February", "37", "25", "62"],
          ["March",    "39", "23", "62"],
          ["April",    "42", "19", "61"],
          ["May",      "44", "15", "59"]
        ],
        note: "Source: Internal Company Data. Total orders are DECLINING even as delays rise — mix is shifting toward MTM."
      },
      {
        type: "table",
        title: "Exhibit B — Process step times & FTEs (one FTE = 160 hrs/month)",
        columns: ["Line", "Step", "Hrs/order", "FTEs"],
        rows: [
          ["Made-to-Measure", "Measuring",   "1",  "1"],
          ["Made-to-Measure", "Sewing",      "16", "5"],
          ["Made-to-Measure", "Finishing",   "4",  "1"],
          ["Bespoke",         "Measuring",   "4",  "1"],
          ["Bespoke",         "Patterning",  "14", "5 (shared w/ Sewing)"],
          ["Bespoke",         "Sewing",      "18", "5 (shared w/ Patterning)"],
          ["Bespoke",         "Finishing",   "8",  "2"]
        ],
        note: "Note: For bespoke, same 5 master tailors do both patterning AND sewing → treat as ONE combined step of (14+18)=32 hrs/order with 5 FTEs."
      }
    ],
    brainstorm: "Synthesis: delay is caused by MTM orders exceeding capacity (42 & 44 vs 40 cap) in Apr/May. Spare capacity exists in MTM measuring (160 vs 40) AND all of Bespoke (bespoke demand falling below 25 cap). Remediation: move FTEs between steps (if skills allow); pool resources across MTM and Bespoke lines; use waitlist (may actually boost exclusivity perception for a brand like Nutters).",
    recommendation: "Hire Anson for the Bespoke line at up to $4,500/month — generates $1,000/month more profit than MTM assignment ($4,500 vs $3,500). HOWEVER: if the CEO's priority is fixing customer satisfaction (not profit), put Anson on MTM finishing since that's where the delay actually lives. Risks: tradeoff between $1k/mo and brand satisfaction is material for a heritage brand. Next: flex FTEs between steps (measuring has massive spare); pool staff across lines; consider whether a waitlist enhances the exclusivity brand."
  },

  {
    id: 22,
    source: "tuck",
    title: "OldSchool",
    industry: "Government & Public Sector",
    type: "Profitability",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time when you had to think creatively about a solution to a problem.",
    prompt: "OldSchool is a high school founded in 1947 in Delhi, India. Once one of the most prestigious schools in the city, it has been relatively slow to modernize. Over time, OldSchool has experienced declining profitability and growing competition from newer schools. The Principal has heard about the transformative potential of Generative AI in education and is considering investing — but the upfront cost is significant. Should she move ahead?",
    clarifying: [
      "Upfront investment: $200,000.",
      "Any changes will impact profitability of the current year (assume we are at the start of the year).",
      "Current enrollment: 600 students/yr.",
      "If asked how GenAI will be used, trigger a surprise brainstorm before framework."
    ],
    framework: [
      "Revenue — tuition increase (up-to-date curriculum, better job placement); quantity increase (personalized learning, more capacity)",
      "Cost — fixed: automated admin, resource optimization (fewer teachers, virtual learning); variable: digital materials, larger student body",
      "Investment — NPV calc with FCF / discount rate / growth; industry multiples comparison",
      "Risks — staff training, constant updates, implementation, teacher resistance, AI hallucinations, privacy"
    ],
    math: [
      "Current profit: $80 margin × 600 students = $48,000/yr.",
      "New margin: $80 × 1.025 = $82/student (2.5% = 1/40).",
      "New enrollment: 600 × 1.1667 = 700 students (16.67% = 1/6).",
      "New profit: $82 × 700 = $57,400/yr. Increase = $9,400/yr (~20%).",
      "AI tool savings table: net annual savings range $4k - $13k. Winner = Personalized Learning Tool ($13k).",
      "Total annual earnings improvement: $9,400 + $13,000 = $22,400.",
      "NPV (perpetuity @ 10% discount, 0% growth): $22,400 / 10% = $224,000.",
      "Upfront: $200,000. NPV > 0 → invest."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — GenAI cost savings by tool",
        columns: ["AI Tool", "Sub / yr", "Savings / student", "# students", "Gross savings", "Net savings"],
        rows: [
          ["Research & Editing",   "$1,000", "$100", "100", "$10,000", "$9,000"],
          ["Personalized Learning","$2,000", "$30",  "500", "$15,000", "$13,000"],
          ["Administrative Asst",  "$3,000", "$50",  "300", "$15,000", "$12,000"],
          ["Career Development",   "$4,000", "$80",  "100", "$8,000",  "$4,000"],
          ["Virtual Tutor",        "$5,000", "$20",  "500", "$10,000", "$5,000"]
        ],
        note: "Bubble size on original = # students impacted. Personalized Learning is the clear winner on net savings — but candidate must do the math; eyeballing the bubble is misleading."
      }
    ],
    brainstorm: "Surprise brainstorm (revenue side): personalized learning justifies tuition increase; 24/7 virtual tutoring as paid add-on; sell curriculum to other schools leveraging OldSchool's brand. Cost side: automate admin (grading, attendance, scheduling); resource optimization (larger classes, fewer substitute teachers); virtual/remote learning reducing physical space.",
    recommendation: "YES, invest. NPV of $224k on $200k upfront is marginal but positive — and OldSchool specifically should pick the Personalized Learning Tool ($13k annual savings). Risks: projections may not materialize, teacher resistance (especially if strong union), AI hallucinations, privacy concerns. Next: bring in an ed-AI deployment consultant, pilot Personalized Learning with one grade before scaling."
  },

  {
    id: 23,
    source: "tuck",
    title: "Pediatric Hearing Aids",
    industry: "Healthcare",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "What do you think will be the challenges transitioning from your previous career into consulting?",
    prompt: "Our client, a developer of medical-grade hearing aids, is exploring the feasibility of launching a new line of hearing aids designed specifically for children. They want to understand if a target profit of $4M per year is achievable.",
    clarifying: [
      "Client handles the entire manufacturing process in-house.",
      "Pediatric hearing aids: specialized devices sized for children.",
      "Typically a child uses a hearing aid continuously until adulthood, requiring size upgrades every few years.",
      "Client has developed three products targeting different pediatric age groups.",
      "Market is fragmented; no single company has more than 15% share."
    ],
    framework: [
      "Market — customers (parents, insurance, children); competition (# firms); alternatives (necessity, other models)",
      "Profitability — revenue (# units × price); cost (# units × unit cost); R&D spend"
    ],
    math: [
      "US population heuristic: ~4M per age year (320M / 80 yr life).",
      "0-5 yrs: 4M × 6 × 1% = 240k market.",
      "6-11 yrs: 4M × 6 × 1.5% = 360k market.",
      "12-17 yrs: 4M × 6 × 2% = 480k market. Total = 1.08M children.",
      "At 10% penetration, replacement = 1/6 × penetrated:",
      "  Infant: ($300 − $100) × (240k × 10% × 1/6) = $200 × 4k = $800k profit",
      "  Behind-the-ear: $300 × (360k × 10% × 1/6) = $300 × 6k = $1.8M",
      "  In-the-ear: $450 × (480k × 10% × 1/6) = $450 × 8k = $3.6M",
      "Total annual profit ≈ $6.2M. Target $4M → hit by ~55%."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Market research & product offerings",
        columns: ["Age group", "% prevalence", "Product type", "Avg price / unit", "Avg cost / unit"],
        rows: [
          ["0-5 years",   "1.0%",  "Infant",         "$300", "$100"],
          ["6-11 years",  "1.5%",  "Behind-the-ear", "$500", "$200"],
          ["12-17 years", "2.0%",  "In-the-ear",     "$700", "$250"]
        ],
        note: "Prevalence and margin both rise with age group; in-the-ear drives most of the profit."
      }
    ],
    brainstorm: "Risks: fragmented market → many competitors → heavy sales/marketing lift needed; continual tech advancement required → R&D cost pressure; hearing aids are replaced only when children age up (every ~6 yrs) — low repeat frequency. Upside: no single competitor >15% so first-mover share opportunity exists; parent willingness-to-pay for medical devices is typically high.",
    recommendation: "YES — hitting $4M target profit is realistic and likely conservative. Even at a conservative 10% penetration, projected profit is $6.2M — 55% above the target. Risks: tech moves quickly in hearing aids, so budget meaningful R&D spend; expect aggressive competitor marketing. Next: define go-to-market strategy, long-term R&D plan, parent/pediatrician channel strategy."
  },

  {
    id: 24,
    source: "tuck",
    title: "PowerStride Sportswear",
    industry: "Retail & CPG",
    type: "Growth Strategy",
    difficulty: "3 / 2 / 2",
    behavioral: "Discuss a moment where you had to make a difficult ethical decision.",
    prompt: "PowerStride Sportswear, a major US sport shoe manufacturer, releases 100+ new shoe models annually. Sustainability and personalization trends (surge in limited editions, fashion-forward designs) plus a generational shift in demand are forcing new levels of creativity in design. After ChatGPT's launch, GenAI usage has skyrocketed — Adidas integrated AI Archive, Nike launched the ISPA Universal Shoe. The CEO has hired us to suggest how GenAI can boost PowerStride's innovation in shoe design.",
    clarifying: [
      "PowerStride revenue: $3B in 2023. R&D spend: ~$20M/yr.",
      "Product design cycle: market research → concept development → concept refinement → testing.",
      "R&D team includes top-notch footwear designers, materials engineers, biomechanics experts, research scientists.",
      "PowerStride already uses GenAI for marketing (personalized email offers).",
      "GenAI tools: can analyze vast data (trends, design libraries), generate images/videos from text.",
      "GenAI tools: can't yet assess manufacturing feasibility, aesthetics, or usability."
    ],
    framework: [
      "PS's R&D — KPIs (# new models, innovation speed), awards, benchmark vs Adidas/Nike",
      "PS's Design Cycle — market research, concept development, concept refinement stages",
      "GenAI for R&D — available tools, capabilities, economics/pricing, IT integration requirements"
    ],
    math: [
      "Current cycle: Market Research 2mo + Concept Dev 4mo + Concept Refinement 4mo = 10 months.",
      "With GenAI savings:",
      "  Market Research: 2mo × (1 − 50%) = 1.0mo",
      "  Concept Development: 4mo × (1 − 70%) = 1.2mo",
      "  Concept Refinement: 4mo × (1 − 30%) = 2.8mo",
      "New cycle: 1.0 + 1.2 + 2.8 = 5.0 months. Savings = 5 months (~50%)."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Current design cycle & GenAI time savings",
        columns: ["Stage", "Current time", "GenAI savings", "New time"],
        rows: [
          ["Market Research",      "2 months", "50%", "1.0 month"],
          ["Concept Development",  "4 months", "70%", "1.2 months"],
          ["Concept Refinement",   "4 months", "30%", "2.8 months"],
          ["Total",                "10 months", "50%", "5.0 months"]
        ],
        note: "Share of concepts graduated to next stage: Market Research → Concept Dev = 30%; Concept Dev → Concept Refinement = 10%."
      }
    ],
    brainstorm: "Creativity boosters: (MR) trend research, competitive benchmarking, distill sales/survey data; (CD) ideate from design libraries, visualize via text-to-image, suggest materials, cost-benefit analysis; (CR) virtual simulations, concept descriptions, update from shoe performance data, quick iterations with focus groups. Limitations: hallucinations, prompt-quality dependence, reliance on old data → biases, possible copyright risk; can't assess feasibility or true innovation; too many options → choice paralysis; over-reliance stifles human creativity.",
    recommendation: "Yes, deploy GenAI in all three stages — cuts cycle from 10 → 5 months (50% faster to market), lets PowerStride keep pace with Adidas/Nike on AI-assisted design. Weight investment toward Concept Development (biggest savings, 70%). Risks: copyright liability, hallucinations, over-reliance stifling designer creativity. Next: tool selection (build vs partner), IT integration plan, human-in-the-loop guardrails, benchmarking vs Adidas's AI Archive."
  },

  {
    id: 25,
    source: "tuck",
    title: "Snow Big Deal",
    industry: "Transportation & Logistics",
    type: "Opportunity Assessment",
    difficulty: "3 / 3 / 3",
    behavioral: "Describe a challenging situation or conflict you've faced and how you handled it.",
    prompt: "Our client is the New Hampshire Department of Transportation (NH DOT), which rents privately-owned equipment to plow state roads. NH DOT is currently negotiating plow contracts for 2023 but is facing a shortage in equipment to rent — driving up projected response time and the number of 'beats' per truck. Help NH DOT address this issue and plan for the years ahead.",
    clarifying: [
      "Preliminary estimates: 300 machines available this season.",
      "NH DOT does not currently own any plows — 100% rental model.",
      "Plow rental fee includes labor. Rental fees negotiated each season.",
      "Responsible for NH and NH routes into neighboring states.",
      "Beat = unique route that needs plowing. Response time = time to plow a beat.",
      "NH rents 3 classes of plow (assume identical for this case)."
    ],
    framework: [
      "Financials — labor cost (wage), plow buy vs rent, storage/maintenance, operational cost, budget/tax pool",
      "Market — rental rates in NH vs neighbors, plow demand/supply, skilled operator availability, vehicle market",
      "Other factors — decade snowfall trend, labor/prioritization efficiency, buy vs rent, state policy, contract length"
    ],
    math: [
      "Machines needed: (120 in × 1,000 hr/in) / 300 hr/machine = 400 machines.",
      "Deficit: 400 − 300 = 100 machines.",
      "Option 1 (raise rent 10%): rate $50 → $55/hr.",
      "  Incremental on existing 300: $5 × 300 = $1,500/hr.",
      "  Cost for new 100: $55 × 100 = $5,500/hr.",
      "  Total incremental: $7,000/hr.",
      "Option 2 (buy 100): depreciation $60k/5yr = $12k/yr → $12k/300hr = $40/hr.",
      "  Fuel+labor = $12 + $8 = $20/hr. Maintenance+storage = ($2k+$4k)/300hr = $20/hr.",
      "  Per-vehicle hourly cost: $80. Total for 100 vehicles: $8,000/hr.",
      "Breakeven rent increase y%: $15,000y + $5,000 + $5,000y = $8,000 → $20,000y = $3,000 → y = 15%."
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit A — NH annual snowfall (inches) past 10 yrs + 2023 forecast",
        bars: [
          { label: "2014", value: 70 },
          { label: "2015", value: 90 },
          { label: "2016", value: 65 },
          { label: "2017", value: 110 },
          { label: "2018", value: 130 },
          { label: "2019", value: 85 },
          { label: "2020", value: 95 },
          { label: "2021", value: 70 },
          { label: "2022", value: 100 },
          { label: "2023*", value: 120 }
        ],
        unit: "inches",
        note: "2023 = forecast. Top-3 year in last decade, ~70% above 2021. Each inch = 1,000 plow-hours statewide."
      },
      {
        type: "table",
        title: "Exhibit B — Rental vs Purchase economics",
        columns: ["Line item", "Rental option", "Purchase option"],
        rows: [
          ["Current rental rate",              "$50 / hour",   "—"],
          ["Proposed rental increase",         "10%",          "—"],
          ["Purchase cost",                    "—",            "$60,000 / vehicle"],
          ["Useful life",                      "—",            "5 years"],
          ["Hourly fuel cost / vehicle",       "—",            "$12"],
          ["Hourly labor cost",                "incl. in rent","$8"],
          ["Annual maintenance cost / vehicle","—",            "$2,000"],
          ["Annual storage cost / vehicle",    "—",            "$4,000"]
        ],
        note: "Vehicles are depreciated on a straight-line basis over 5 years."
      }
    ],
    brainstorm: "Rent-increase costs: current rate, updated rate, incremental on existing fleet, cost of new rentals. Purchase costs: fixed cost per vehicle, variable (fuel/maintenance/storage), useful life, hours/yr, labor. Other strategic factors: supply smoothing with existing owners, aging rental fleet next year, snowfall variability, tax/budget constraints, relationships.",
    recommendation: "Raise rental rates 10-15% to attract the 100 extra vehicles needed for the 2023 season — renting is ~$1,000/hr cheaper than buying AND preserves flexibility for future years with unknown snowfall. Risks: unanticipated costs, existing rental fleet aging into retirement, dramatic snowfall swings next year cause relationship friction. Next: formalize long-term contracts with key owners, invest in relationships, re-evaluate buy-vs-rent annually with 2-year snowfall forecast."
  },

  {
    id: 26,
    source: "tuck",
    title: "SwitchDeck Motors",
    industry: "Automotive",
    type: "Market Entry",
    difficulty: "3 / 3 / 2",
    behavioral: "How would you approach a situation where you have to lead without authority?",
    prompt: "SwitchDeck Motors, a major US-based automobile company, produces sedans, SUVs, and commercial vehicles (trucks, buses). They want to enter the luxury vehicle market in a foreign country. How should our client approach this market entry opportunity?",
    clarifying: [
      "Sells through traditional dealerships and direct-to-consumer.",
      "All products must achieve annual profits greater than $100M in each market.",
      "Client focuses on luxury consumer vehicles.",
      "Client currently produces only left-hand-drive vehicles; no plans to expand to right-hand drive."
    ],
    framework: [
      "Market — competitive landscape (structure, ease of entry, TAM), growth, consumer preferences",
      "Company — financial (revenue, cost) + non-financial capability (brand, portfolio, distribution)",
      "Risks — regulations (tariffs, FX, foreign laws), competitive response, brand dilution"
    ],
    math: [
      "TAM: 100,000 luxury cars sold in Australia / yr.",
      "Vehicle math (Revenue − Costs = Profit):",
      "  Sedan: 5% × 100k = 5,000 × $30k = $150M rev; costs = $10M + 5,000 × $20k = $110M → $40M profit",
      "  Truck: 1% × 100k = 1,000 × $55k = $55M; costs = $20M + 1,000 × $30k = $50M → $5M profit",
      "  SUV: 5% × 100k = 5,000 × $50k = $250M; costs = $20M + 5,000 × $25k = $145M → $105M profit ✓",
      "  Hatchback: 2% × 100k = 2,000 × $20k = $40M; costs = $10M + 2,000 × $10k = $30M → $10M profit",
      "Only SUV clears the $100M hurdle.",
      "Import tax risk: $50,000 × 3% × 5,000 cars = $7.5M profit reduction — still above $100M."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Country Serviceable Addressable Market (SAM)",
        columns: ["Country", "SAM (bubble)", "WTP", "Competitiveness (1-10)", "Drive"],
        rows: [
          ["UK",         "Large",  "Mid",  "9",  "Right"],
          ["Japan",      "Large",  "Mid",  "9",  "Right"],
          ["Singapore",  "Small",  "High", "8",  "Right"],
          ["S. Korea",   "Mid",    "High", "7",  "Left"],
          ["Indonesia",  "Small",  "Low",  "6",  "Left"],
          ["Belgium",    "Small",  "Mid",  "6",  "Left"],
          ["Australia",  "Large",  "Highest","4","Left"],
          ["Mexico",     "Mid",    "Low",  "3",  "Left"],
          ["India",      "Mid",    "Low",  "2",  "Right"],
          ["Myanmar",    "Small",  "Low",  "1",  "Right"]
        ],
        note: "10 = most competitive, 0 = least. Bubble size = SAM. Australia has highest WTP, largest left-hand-drive SAM, lower competitiveness than S. Korea — clear winner for LHD producer."
      },
      {
        type: "table",
        title: "Exhibit B — Australian auto market by vehicle style",
        columns: ["Vehicle", "Share of TAM", "WTP", "Import cost (fixed)", "Production cost", "Marketing cost"],
        rows: [
          ["Sedan",     "5%", "$30,000", "$10M", "$15,000", "$5,000"],
          ["Truck",     "1%", "$55,000", "$20M", "$20,000", "$10,000"],
          ["SUV",       "5%", "$50,000", "$20M", "$20,000", "$5,000"],
          ["Hatchback", "2%", "$20,000", "$10M", "$10,000", "$0"]
        ],
        note: "Import costs are annual fixed; production and marketing are variable. TAM = 100,000 luxury cars/yr in Australia."
      }
    ],
    brainstorm: "Main risks: (1) Australian government likely to impose 3% import tax on luxury autos next fiscal year — reduces SUV profit by ~$7.5M but still clears hurdle; (2) WTP ceiling constrains price response — can't pass through tax to consumers; (3) competitor response from entrenched EU luxury brands; (4) brand dilution from being 'yet another' SUV brand; (5) FX, foreign regulatory risk.",
    recommendation: "Enter Australia with an SUV — highest WTP in world, large LHD SAM, lower competitiveness than S. Korea, no redesign needed. SUV profit = $105M, clears $100M target (even $97.5M after 3% import tax still tight — mitigate via lobbying). Risks: tax, competitive response. Next: engage Australian officials on local-manufacturing trade-off, build distribution partnerships, competitive war-game."
  },

  {
    id: 27,
    source: "tuck",
    title: "Tuck Air II",
    industry: "Airline",
    type: "Opportunity Assessment",
    difficulty: "3 / 3 / 2",
    behavioral: "Describe an instance where you received critical feedback, and how you responded.",
    prompt: "Tuck Air, a large national airline, is considering installing in-flight Wi-Fi to improve customer experience. Tuck Air operates 250 Boeing 737-500 aircraft in an economy-only, no-frills, low-cost configuration — serving a mix of business and leisure passengers. The client has tasked us to help determine network specifications and financial viability.",
    clarifying: [
      "Tuck Air operates exclusively domestic routes, hub-and-spoke out of Boston Logan.",
      "A recent customer survey showed Tuck Air lagged peers on passenger experience — Wi-Fi flagged as a top improvement, especially among business passengers.",
      "In-flight Wi-Fi uses onboard satellite or ground-based networks; Ku-Band and Ka-Band frequencies transmit to/from aircraft.",
      "Client policy: CAPEX projects must break even within 3 years."
    ],
    framework: [
      "Customer — speed reqs (streaming, video calls, browsing), duration (whole flight vs few hours), segments (business vs leisure WTP)",
      "Financial — up-front CapEx, revenue (flat fee / pro-rated / subscription × connections/flight), ongoing costs (service fee, maintenance)",
      "Risks — customer backlash on paying, reliability, implementation (planes in hangars)"
    ],
    math: [
      "Aircraft occupancy: 125 seats × 80% load = 100 passengers.",
      "Business pax connecting: 100 × 33% × 90% ≈ 30 pax × 200 MB/hr = 6 GB/hr.",
      "Leisure pax connecting: 100 × 67% × 30% ≈ 20 pax × 800 MB/hr = 16 GB/hr.",
      "Ku-Band (14 GB/hr): serves business only (6 GB/hr fits).",
      "Ka-Band (32 GB/hr): serves all pax (6 + 16 = 22 GB/hr fits).",
      "Revenue Ku ($10, business only): $10 × 30 × 1,000 flights = $300k/plane/yr.",
      "Revenue Ka ($4, all): $4 × 50 × 1,000 = $200k/plane/yr.",
      "Contribution margin Ku: $300k − $220k = $80k/plane/yr.",
      "Contribution margin Ka: $200k − $140k = $60k/plane/yr.",
      "Breakeven Ku: $200k / $80k = 2.5 yrs ✓ (< 3 yrs).",
      "Breakeven Ka: $300k / $60k = 5.0 yrs ✗."
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit A — Passenger survey results",
        columns: ["Segment", "% passengers", "Likely to connect", "Data usage", "WTP"],
        rows: [
          ["Business", "33%", "90%", "200 MB / hour", "$10 / flight"],
          ["Leisure",  "67%", "30%", "800 MB / hour", "$4 / flight"]
        ],
        note: "33% of passengers are business, 90% of them connect, at 200 MB/hr. Leisure has more users at lower attach — bigger data footprint per active user."
      },
      {
        type: "table",
        title: "Exhibit A (cont.) — Wi-Fi receiver specifications",
        columns: ["Spec", "Ku-Band", "Ka-Band"],
        rows: [
          ["Shared data capacity", "14 GB / hour",         "32 GB / hour"],
          ["Installation cost",    "$200,000 / aircraft",  "$300,000 / aircraft"],
          ["Annual costs",         "$220,000 / aircraft",  "$140,000 / aircraft"]
        ],
        note: "Boeing 737-500: 125-seat capacity, 80% avg load factor, ~1,000 flights per aircraft per year."
      },
      {
        type: "bar",
        title: "Exhibit B — Breakeven years by receiver choice",
        bars: [
          { label: "Ku (business only)", value: 2.5 },
          { label: "Ka (all pax)",       value: 5.0 }
        ],
        unit: "years",
        note: "Ku breaks even inside the 3-year CapEx policy; Ka does not."
      }
    ],
    brainstorm: "Pricing models: flat fee (free/pay-per-flight/pay-per-day/subscription), rated (by time, by data), two-part (high/low speed tiers, loyalty-free), bundling (streaming, partner brands like Starbucks/Amex). Given Tuck Air's no-frills positioning, a flat fee or per-hour model or single partner aligns best. Risks: product (tech upgrade risk, speed congestion, reliability), security (hackers + data), implementation (in-air payments, roll-out delays grounding aircraft).",
    recommendation: "Install Ku-Band across the fleet, charge $10 flat fee. Supports business pax (higher WTP) at 2.5-yr breakeven — inside 3-yr CapEx policy — while Ka-Band stretches to 5 yrs and misses policy. Risks: roll-out delays (planes in hangars), future tech upgrade (mobile data in the air), network congestion if actual attach > forecast. Next: implementation plan with aircraft-rotation scheduling, sensitivity on business-pax attach rate, progressive roll-out starting with top business-traffic hubs."
  },

  /* =========================================================
     MBB CASEBOOK 2021 — 24 MBB-inspired cases (Peter K., Peter-K.org)
     Cases 28-51. Organized by weekly archetype: profitability (wk 1),
     revenue growth (wk 2), market entry (wk 3), comparison (wk 4).
     Structure follows the 5-step opening + RRRN close format used at
     McKinsey, BCG, Bain, L.E.K., and Kearney.
     ========================================================= */

  {
    id: 28,
    source: "mbb",
    title: "Premier Oil",
    industry: "Oil & Gas",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you had to deliver tough news under pressure.",
    prompt: "Premier Oil is a UK-based offshore upstream oil & gas producer operating rigs across 7 North Sea areas. Pandemic-induced oil price collapse has crushed profitability — 2020 operating margin is −12%. CEO wants a profitability improvement plan focused on cost levers. Industry is capex-heavy, B2B, commoditized.",
    clarifying: [
      "North Sea operations only — 7 producing areas, mixed crude and natural gas output.",
      "Financial target: return to positive margin within 2 years at current commodity prices.",
      "Client owns the rigs (no lease), so rent is not in the cost stack.",
      "Commodity pricing is exogenous — client is a price-taker."
    ],
    framework: [
      "Industry — typical margins, cost structure of majors, demand trends",
      "Client — accounts (crude vs gas mix), product portfolio, value chain",
      "Financial analysis — revenue (price × volume), cost (fixed + variable)",
      "Improvement areas — revenue (secure contracts, hedging), cost (fixed + variable reduction)"
    ],
    math: [
      "Current fixed OpEx: £50M/yr; current drilling cost: £40M/yr → total £90M/yr.",
      "Retrofit scenario: OpEx → $1/barrel, drilling → −30%.",
      "Production: 200k bbl/day × 360 days = 72M bbl/yr.",
      "New OpEx in £: ($1 × 72M) ÷ 2 (FX $2=£1) = £36M.",
      "New drilling: £40M × 0.70 = £28M.",
      "New total: £64M. Savings: £90M − £64M = £26M/yr."
    ],
    brainstorm: "Fixed costs: maintenance (capex-heavy, scheduled vs reactive), R&D/exploration, overhead, energy, B2B marketing (low). Variable costs: labor, platform supplies, extraction supplies, transport (pipeline by volume). Maintenance is the biggest fixed lever — split into (routine vs emergency) × (higher frequency vs higher per-event cost): aging equipment drives both scheduled and emergency frequency; newer equipment + training cuts emergency events but raises per-event service rates. Risks with the retrofit: ignored investment cost, production pauses during retrofit, over-optimistic 30% savings assumption.",
    recommendation: "Proceed with the retrofit — projected £26M/yr in savings brings the business back to breakeven at current commodity prices. Reasoning: OpEx drops ~£14M, drilling drops £12M, and retrofit likely extends equipment life (pushing CapEx replacement further out). Risks: retrofit investment + payback not modeled, production pauses during installation, 30% savings may be optimistic on aging rigs. Next: build full retrofit ROI model (capex + implementation time), sequence retrofits across the 7 areas to minimize production pauses, and stress-test the 30% assumption against supplier bids.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 29,
    source: "mbb",
    title: "WeShare",
    industry: "Real Estate",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you had to make a tough capital allocation decision with limited data.",
    prompt: "WeShare is a shared-office-space provider operating in 10 US cities — 25k members, $160M annual sales, currently unprofitable. Leadership needs to break even within 18 months. Pre-pandemic growth was 50%/yr; competitor WeWork controls 47% of the top-5 market. Business model is essentially rent arbitrage — long-term master leases, sublet to members at retail rates.",
    clarifying: [
      "Target customer mix: freelancers (~30%), entrepreneurs/startups (~50%), enterprise tenants (~20%).",
      "All current locations are leased (not owned) — long-term commitments, 5-10 yrs typical.",
      "Break-even deadline: 18 months. Capital is constrained; no more equity rounds.",
      "Pricing is month-to-month for individuals, annual contracts for enterprise."
    ],
    framework: [
      "Industry — shared-office dynamics, major players, post-pandemic occupancy trends, typical margins",
      "Client — customer segments (freelancer / SMB / enterprise), service lines, 10-city footprint",
      "Profitability — revenue (price × members × location mix), cost (fixed lease burden, variable supplies)",
      "Growth strategies — revenue uplift (price, occupancy, enterprise push) + cost reduction (lease renegotiation, location rationalization)"
    ],
    math: [
      "Building 1: 5-yr contract, $3M setup + lease, $20/sf OpEx, $3.5/sf/month revenue, 50k sf.",
      "Building 1 annual rev/sf: $3.5 × 12 = $42; CM/sf: $42 − $20 = $22.",
      "Building 1 total op profit: $22 × 50k × 5 yrs = $5.5M; Return: $5.5M − $3M = $2.5M; ROI = 83%.",
      "Building 2: 4-yr contract, $2.5M setup, $15/sf OpEx, $3.3/sf/month, 40k sf.",
      "Building 2 rev/sf: $40; CM/sf: $25; total profit: $25 × 40k × 4 = $4M; Return: $1.5M; ROI = 60%.",
      "Building 1 wins on ROI (83% vs 60%) despite higher setup cost."
    ],
    brainstorm: "Cost stack dominated by rent/lease — high fixed-cost business like hotels. Fixed: lease payments (biggest), building maintenance, utilities, marketing & sales (category education needed), overhead (cleaning, security), R&D (design, software), insurance, RE taxes. Variable: snacks/supplies, discount programs, tiered-pricing giveaways. Revenue levers: tiered membership (hot desk → private office → dedicated suite), enterprise contracts (higher ARPU, longer terms), ancillary revenue (event rentals, virtual mailbox, meeting-room credits). Cost levers: renegotiate leases (pandemic gave landlords cold feet — use it), close bottom-decile locations, consolidate software stack.",
    recommendation: "Push enterprise segment aggressively, renegotiate 3-5 underwater leases, close bottom-decile locations to hit break-even in 18 months. Reasoning: enterprise contracts stabilize occupancy and lift ARPU; renegotiated leases flow 100% to the bottom line; closures stop the bleed. Use Building-1 vs Building-2 framework for every location decision (ROI > 70% keep, below 50% exit). Risks: enterprise sales cycle is long (6-12 mo), landlords may refuse, closures trigger reputation risk. Next: enterprise sales team buildout, top-30 lease renegotiation list with walk-away thresholds, bottom-10 location closure plan with member-migration offers.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 30,
    source: "mbb",
    title: "Five Ladies",
    industry: "Fast Food",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Describe a time you drove a cost-reduction initiative across a large organization.",
    prompt: "Five Ladies is a national fast-food burger chain — $2.4B sales in 2020, 2,000 US restaurants (75% company-owned, 25% franchised). Positioned in the 'better burger' segment ($9-11 entree range). 2020 operating margin is 12%. CEO wants a margin-expansion plan focused on cost structure — specifically the rising smallware (plastic cutlery, packaging) line.",
    clarifying: [
      "Store mix: 75% company-owned, 25% franchised — franchise royalties flow through but are small.",
      "Labor-intensive kitchen ops, commodity industry, brand war between better-burger chains.",
      "Menu biased toward salads/bowls (smallware-heavy) vs plain burgers.",
      "Self-service utensil stations in every location — high waste observed."
    ],
    framework: [
      "Market — category growth, major burger chains (share, positioning), typical profitability, customer trends",
      "Five Ladies — menu mix, target customers, marketing positioning, channel mix (in-store / delivery)",
      "Margin analysis — revenue breakdown (region, product), cost structure (fixed + variable)",
      "Improvement areas — revenue (mix, price, upsell) + cost (supply consolidation, ops efficiency)"
    ],
    math: [
      "Utensil volume: 160M utensils/yr (50/50 spoons/forks) → 80M each.",
      "Cost: 500 spoons = $10; 500 forks = $6.",
      "Annual spoon cost: 80M ÷ 500 × $10 = $1.6M; fork cost: 80M ÷ 500 × $6 = $0.96M.",
      "Total utensil cost: $2.56M/yr.",
      "Option 1 — renegotiate supplier for 5% savings: $2.56M × 5% = $0.13M/yr.",
      "Option 2 — build own production (50% savings, $10M capex): $2.56M × 50% = $1.3M/yr. Payback: $10M ÷ $1.3M ≈ 8 yrs."
    ],
    brainstorm: "Fixed: rent/utilities (in-person footprint), maintenance, marketing (brand war — high), overhead, R&D, transportation. Variable: labor (labor-intensive, low automation), food supplies + packaging + smallware, 3rd-party distribution fees (UberEats/DoorDash take 20-30%), credit card commissions, discounts. Why are smallware costs high? (Higher unit price × larger volume): no purchasing consolidation / no bulk contracts; expensive types (silver plastic, biodegradable); high shipping; low-quality supplier management; operational inefficiencies (waste, no standardization); self-service stations over-dispense; menu is smallware-heavy (salads vs burgers); to-go vs sit-down behavior.",
    recommendation: "Start with Option 1 (renegotiate supplier) immediately for $130k/yr of pure savings, then layer operational fixes (cap self-service stations, standardize portions) for another $200-400k. Defer Option 2 (in-house production) — 8-yr payback is too long in a commodity business where tech/materials shift; ops complexity grows; volume is likely to shrink, not grow. Risks: supplier pushback, customer friction on capped utensil stations. Next: RFP to 3 new utensil suppliers, 30-day pilot on capped self-service at 20 stores, franchisee buy-in plan before rollout.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 31,
    source: "mbb",
    title: "Getaway Airlines",
    industry: "Airlines",
    type: "Growth Strategy",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you found a growth opportunity others had missed.",
    prompt: "Getaway Airlines is a US passenger airline focused on vacation destinations — 50 nonstop routes, Minneapolis hub. Top-4 markets: Las Vegas, LA, Portland, Fort Myers. Revenue is growing, but operating profit dropped to 10% in early 2020 (pre-pandemic). CEO wants a plan to double share in the top-4 destinations to offset margin pressure.",
    clarifying: [
      "Pre-pandemic data — do not assume COVID shock. Revenue growing, margin eroding.",
      "Top-4 destinations today = ~20% of total passenger volume (large upside).",
      "Positioning: leisure-focused, middle-of-market (not ultra-low-cost, not premium).",
      "Fixed costs (hub ops, fleet) scale roughly with capacity, not with route mix."
    ],
    framework: [
      "US airlines market — growth, major carriers, profitability benchmarks",
      "Getaway — segments (low-cost / regular / premium), destinations, offerings, marketing",
      "Profitability — revenue (pricing, volume), cost (fixed fleet + variable fuel/crew)",
      "Strategies — increase sales (top-4 doubling) + streamline costs (network efficiency)"
    ],
    math: [
      "Current sales: $0.5B at 10% margin = $50M profit.",
      "Top-4 passenger share: (270 + 140 + 140 + 130)k ÷ 3,180k ≈ 20%.",
      "Top-4 profit today: $50M × 20% = $10M.",
      "Doubling top-4 volume: $10M × 2 = $20M; incremental profit = $10M (+20% total).",
      "Scale benefits: 2× volume at fixed hub cost → margin accretive on incremental pax."
    ],
    brainstorm: "Revenue growth 4-lever: (1) Marketing — aggressive campaigns in top-4 metros, loyalty cards; (2) Pricing — vacation bundles (hotel + tour + taxi), tiered classes (basic/econ/premium), family deals, WTP-based destination pricing, subscriptions; (3) Distribution — expand travel-agency network, agent commissions, mobile app; (4) Value prop — passenger experience upgrade (on-time, friendly staff), higher flight frequency, larger planes if capacity-bound. Cross-sell (pre-board + on-board fees, loyalty credit card); Up-sell (seat-class upgrade, corporate packages); Diversification (cargo/mail, onboard ads, aerial photo services, charters).",
    recommendation: "Double top-4 share with a bundled vacation-package play (flight + hotel + transfers) anchored in Las Vegas first. Projected incremental profit: +$10M (+20% total). Reasoning: top-4 is already proven demand, bundling raises ticket value without premium-class investment, leisure customers have higher bundle attach. Risks: competitive response (Southwest, Allegiant), marketing/distribution spend exceeds forecast, ops complexity of bundles. Next: Vegas pilot (3 months), hotel-partner RFP, update the loyalty program to anchor repeat bookings.",
    source_label: "BCG 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 32,
    source: "mbb",
    title: "Alfa Dental",
    industry: "Healthcare / Insurance",
    type: "Profitability",
    difficulty: "2 / 3 / 2",
    behavioral: "Tell me about a time you had to push back on a partner's aggressive growth behavior.",
    prompt: "Alfa Dental is a major US dental insurer. In 2018 it added Eastern Dental (ED) — a 100-office fee-for-service chain in Arizona — to its network. Claims from ED are growing faster than Alfa's book, and overall profitability is declining. Early 2020, pre-pandemic. CEO wants a diagnosis and a claims-reduction plan without alienating ED.",
    clarifying: [
      "ED is fee-for-service (not capitated) — each visit generates a claim Alfa pays.",
      "ED is exclusively Arizona; Alfa's national book is stable ex-Arizona.",
      "ED's patient visits are growing both via more patients and more visits/patient/yr.",
      "Alfa's Arizona sales team is separately commissioned on new members enrolled."
    ],
    framework: [
      "Arizona dental market — growth, key insurers + chains, typical margins",
      "Alfa Dental — policy types, B2B/B2C client segments, marketing",
      "Deal economics — revenue (premium × insured) vs cost (claims: volume × fee/service + overhead)",
      "Eastern Dental — footprint, service range, pricing, patient volume & visit frequency"
    ],
    math: [
      "ED 2018: 400k patients × 1.6 visits = 640k visits.",
      "ED 2019: 300 providers × 1,500 patients/provider = 450k patients; × 1.7 visits = 765k visits.",
      "Growth: (765k − 640k) ÷ 640k = 20%.",
      "Claims cost grew ~20% YoY — materially above Alfa's premium growth.",
      "Visit frequency drift (1.6 → 1.7) suggests demographic skew or location convenience, not just volume."
    ],
    brainstorm: "Why are ED claims growing? Split into (patient behavior × Alfa positioning × ED strategy). Patient: more dental-health aware, kids visit more often, demographic shift. Alfa: own marketing driving new members to ED, lower co-pays/deductibles/annual cap making visits cheap. ED strategy: marketing, distribution (footprint expansion, teledentistry, mobile offices, more dentists/office), pricing (lower prices, BNPL, price promotions), value prop (new services, expanded hours). Claim reduction levers: cool down marketing in Arizona, renegotiate reimbursement rates with ED (use their volume growth as leverage), raise deductibles/co-pays, deprioritize Arizona sales commissions, narrow covered services for ED patients.",
    recommendation: "Renegotiate ED reimbursement rates down 8-12% — their 20% visit growth depends on Alfa's patient flow, so Alfa has leverage. Pair with modest member-side adjustments: raise Arizona deductible + reintroduce a $20 co-pay on elective visits. Reasoning: rate renegotiation attacks claim cost per visit; cost-sharing reduces over-utilization; both together protect the ED relationship. Risks: ED walks away (unlikely — 100-office footprint depends on network payers), member backlash on cost-sharing. Next: renegotiation playbook with walk-away floor, member communication strategy, sales team re-incentivization away from ED-heavy territories.",
    source_label: "Bain 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 33,
    source: "mbb",
    title: "Rainbow Apparel",
    industry: "Apparel / Retail",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Describe a time you had to make a product-portfolio decision with imperfect data.",
    prompt: "Rainbow Apparel is a high-quality children's clothing brand (ages 0-16) — 250 boutiques + online + Nordstrom shop-in-shops. $40M in 2019 sales across three lines: apparel, shoes, accessories. Profit has been slowly declining 2016-2019. Management is considering adding a fourth product line (toys) projected to generate $4M revenue and $1.2M profit (30% margin). Does this improve profitability?",
    clarifying: [
      "Brand positioning: premium, design-heavy, seasonal collections.",
      "Distribution: own boutiques + online + Nordstrom exclusive.",
      "Current blended margin computed from line-level data (apparel 25% / shoes 30% / accessories 50%).",
      "Toys would be manufactured via existing supplier relationships; no new capex modeled."
    ],
    framework: [
      "External — kids apparel market growth, competitors (Gap Kids, Carter's, Gymboree), consumer trends",
      "Client — product line economics, customer profile, channel mix",
      "Financials — line-level revenue and margins, blended margin benchmark",
      "Strategies — SKU expansion vs existing-line optimization"
    ],
    math: [
      "Apparel: $24M (60%) × 25% = $6M profit.",
      "Shoes: $12M (30%) × 30% = $3.6M.",
      "Accessories: $4M (10%) × 50% = $2M.",
      "Total: $40M revenue, $11.6M profit → blended margin ~29%.",
      "Toys: $1.2M ÷ $4M = 30% margin — essentially matches blended.",
      "Toys doesn't improve overall margin, but adds $4M revenue and $1.2M profit."
    ],
    brainstorm: "Fixed costs: boutique rent + utilities (250 stores), maintenance, marketing (premium positioning is expensive), overhead, R&D (seasonal design), Nordstrom exclusivity fees. Variable: COGS (fabric, manufacturing), labor, shipping, packaging, markdowns. Profit decline causes: secular shift to online (boutiques underperforming), competitive pressure from Carter's/Gymboree on basics, rising input costs, over-investment in unprofitable lines. Alternative levers beyond toys: prune unprofitable boutiques, push accessories (50% margin, 10% of mix — underindexed), build DTC loyalty program, exit wholesale if margin-dilutive.",
    recommendation: "Add toys — it's not margin-accretive but it's margin-neutral and adds $4M revenue + $1.2M profit at near-zero capex, plus cross-sell into existing boutique footprint. Real margin lever isn't toys, though — it's accessories (50% margin, only 10% of mix). Push accessories to 20% of mix via boutique merchandising and online bundles — that shifts blended margin ~200 bps. Risks: toys inventory risk (long lead times, fashion-sensitive), boutique capacity, brand dilution. Next: 6-month toys pilot in 50 top boutiques, accessories-push merchandising program, SKU-level profitability review.",
    source_label: "Bain 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 34,
    source: "mbb",
    title: "North Sun",
    industry: "Automotive / EV",
    type: "Growth Strategy",
    difficulty: "3 / 2 / 3",
    behavioral: "Tell me about a time you had to build a B2B sales motion from scratch.",
    prompt: "North Sun is a Japanese EV manufacturer with strong B2C positioning — 65% of Japanese BEV sales, but only 5% of global EVs. Global EV market: 4M (2021) → 35M (2030), 27% CAGR. B2B segment (rental fleets, corporate, govt) is underperforming. Client wants a B2B acceleration plan anchored around a $1M marketing event targeting 1,000 qualified prospects.",
    clarifying: [
      "B2C is 95%+ of current revenue; B2B has ~5 dedicated sales reps globally.",
      "Typical B2B contract: 40 e-cars × $35k × 5% margin = $70k profit/contract.",
      "Sales funnel: Stage 1 (lead) → Stage 2 (qualified) → Stage 3 (test drive) → Stage 4 (contract); Stage 3→4 conversion is 20%.",
      "Without the event, ~30 Stage-3 prospects would reach Stage 4 on their own."
    ],
    framework: [
      "Industry — global EV growth, major players, B2B adoption curve",
      "Client — B2C strength, B2B gaps (product, sales coverage, infra)",
      "B2B analysis — contract economics, funnel conversion, breakeven math",
      "Growth strategies — marketing, pricing, distribution, value prop × B2B levers"
    ],
    math: [
      "Event cost: $1M. Contract profit: $70k.",
      "Breakeven contracts: $1M ÷ $70k = 14.3 → 15 contracts.",
      "Stage-3 prospects needed at 20% conv: 15 ÷ 0.20 = 75.",
      "Baseline Stage-3 without event: 30.",
      "Incremental Stage-3 required: 75 − 30 = 45 additional test drives driven by the event.",
      "That's ~4.5% of the 1,000 targeted prospects converting to a test drive — reasonable bar."
    ],
    brainstorm: "Why is B2B weak? EV charging infrastructure gaps (fleet hesitation), TCO modeling not packaged for procurement buyers, undersized B2B sales force, service network coverage, lack of fleet-specific configurations. 4-lever revenue growth applied to B2B: Marketing (industry events, trade press, TCO calculator, case studies); Pricing (fleet discounts, subscription/lease options, bundled charging); Distribution (partner with fleet management companies, govt procurement channels); Value prop (fleet-specific telematics, priority service, guaranteed uptime SLAs). The event is one marketing tactic — the bigger issue is sales coverage.",
    recommendation: "Run the event — breakeven is only 45 incremental test drives from a 1,000-prospect target (achievable) and it generates a qualified B2B pipeline for the sales team to work for the next 12 months. Pair with structural fixes: hire 15 B2B sales reps, build the TCO calculator + fleet telematics package, partner with 3 fleet management companies. Risks: test-drive-to-contract conversion might lag 20% at first, event without follow-through is wasted. Next: book the event for Q3, stand up B2B sales team by Q2, launch fleet configurator tool alongside the event.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 35,
    source: "mbb",
    title: "AgriCo",
    industry: "Agriculture / Machinery",
    type: "Growth Strategy",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you had to defend a price decision with finance and sales pushing opposite directions.",
    prompt: "AgriCo is a US agricultural machinery manufacturer founded early 1990s. Farm tractors are a major line. 2020 US tractor sales fell 15%; client needs to reverse. Fragmented market (top 5 = 30-40%). 2020 sales: $0.7B. Three tractor types: compact (<40 HP), utility (40-100 HP), high-HP (100+). Management is considering a 5% price cut on compact tractors to win volume.",
    clarifying: [
      "Compact tractors = 50% of total tractor sales (largest segment).",
      "Compact gross margin: 20% at current avg price $30k/unit.",
      "Demand elasticity uncertain — no existing elasticity model.",
      "Price cuts would go into effect uniformly across the compact line."
    ],
    framework: [
      "Market — US farm machinery size, growth, major players, customer trends",
      "Client — product portfolio (compact / utility / high-HP), channel mix, geography",
      "Revenue analysis — price × volume × mix; compact segment economics",
      "Growth strategies — pricing, new product, distribution, marketing per segment"
    ],
    math: [
      "Current CM/unit: $30k × 20% = $6k.",
      "New CM at 5% price cut: $30k × (20% − 5%) = $4.5k (price drop flows 1:1 into margin).",
      "Current compact volume: $0.7B × 50% ÷ $30k ≈ 12k units.",
      "Current segment profit: 12k × $6k = $72M.",
      "Breakeven volume at new CM: $72M ÷ $4.5k = 16k units.",
      "Required volume lift: +4k units or +33% — a steep elasticity demand."
    ],
    brainstorm: "A 33% volume lift from a 5% price cut implies price elasticity of −6.6, way above typical ag-equipment elasticity of −1 to −2. Better levers for the compact segment: financing (0% APR for 36 months), bundled warranty extensions, trade-in promotions, dealer incentives (push to sell AgriCo over competitor), precision-ag attachments as upsells. Beyond compacts: utility segment may have more room (smaller competitor share), high-HP might benefit from new product refresh. Distribution: online configurator + delivery for small farmers.",
    recommendation: "Do not cut price 5% — the required 33% volume lift is unrealistic given ag-equipment elasticity. Instead: launch 0% APR financing + $1,500 trade-in credit for compacts (effective ~5% buyer-side discount funded partially by the financing arm), and push dealer incentives for utility segment where competitive share is most fragmented. Projected profit delta: +$8-12M. Risks: financing arm exposure, dealer-incentive gaming, competitor matches. Next: financing-arm readiness review, dealer-incentive structure, test-market in 2 states before national rollout.",
    source_label: "BCG 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 36,
    source: "mbb",
    title: "Henderson Electric",
    industry: "Industrial Electronics",
    type: "Growth Strategy",
    difficulty: "3 / 2 / 3",
    behavioral: "Tell me about a time you shifted an organization's focus from hardware to software.",
    prompt: "Henderson Electric provides industrial air conditioning across three lines: AC units, maintenance contracts, and IoT-enabled monitoring software. Total sales: $1B; software revenue is disproportionately low. The software alerts on failures, unusual behavior, and maintenance cycles — and works on competitor equipment. CEO wants a software-acceleration plan.",
    clarifying: [
      "Subscription price: $28k/yr. Current software clients: 500.",
      "Cost stack: fixed $16M/yr (3 components), variable $4M/yr total.",
      "Current software P&L: −$6M (loss).",
      "Sales force is hardware-trained; no dedicated software team."
    ],
    framework: [
      "Market — industrial IoT growth, major players, typical ARR per client",
      "Product — software capabilities vs competitors, interoperability (works on competitor hardware)",
      "Client segments — existing AC customers vs greenfield buyers (incl. competitor-equipment owners)",
      "Growth strategies — dedicated sales team, pricing, bundling, marketing"
    ],
    math: [
      "Variable cost/client: $4M ÷ 500 = $8k/client.",
      "CM/client: $28k − $8k = $20k.",
      "Breakeven clients at $16M fixed cost: $16M ÷ $20k = 800 clients.",
      "Gap to breakeven: 800 − 500 = 300 clients (60% growth).",
      "At +300 clients: profit = 800 × $20k − $16M = $0 (just breakeven). Each client above 800 adds $20k profit."
    ],
    brainstorm: "Why are software sales low? (1) no standalone marketing budget — bundled with hardware; (2) no dedicated software sales team; (3) customer uncertainty on ROI (monitor savings not quantified in sales collateral); (4) integration friction with existing BMS; (5) price resistance — seen as optional; (6) sales comp favors hardware (bigger ticket). Acceleration levers: build a ROI calculator (case studies showing $X saved via early-warning failure detection); hire a 10-person software sales team paid on software ARR; bundle the first year free with AC purchases (convert via renewal); target competitor-equipment owners via industry events (true standalone software motion).",
    recommendation: "Stand up a dedicated software sales team (10 reps, software-specific comp), launch a ROI calculator and 3 customer case studies, and bundle year-one subscription into all new AC sales. Projected path to 800 clients within 18 months — clears breakeven; each additional client is pure $20k CM. Risks: hardware team resists if software cannibalizes bundles, sales hiring timeline, competitor IoT platforms. Next: software-team org design, pricing decision on bundled year-one, target-client list for competitor-equipment outreach.",
    source_label: "Bain 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 37,
    source: "mbb",
    title: "Kitchen World",
    industry: "Retail",
    type: "Growth Strategy",
    difficulty: "3 / 3 / 3",
    behavioral: "Describe a time you invested in a loyalty or retention program.",
    prompt: "Kitchen World is a high-end kitchenware retail chain — 100 US + Canada stores plus online (5-10% of revenue). $200M annual sales, flat for 3 years. North American kitchenware market: $18B (2019); high-end ~10%. Key competitors: Sur la Table, Williams Sonoma. CEO wants a 3-year growth strategy, specifically a decision on a loyalty program.",
    clarifying: [
      "Loyalty pilot: Store A (has loyalty) vs Store B (control). Each has ~50k customers.",
      "Store A: 12 visits/yr, $50/visit, 19% margin.",
      "Store B: 10 visits/yr, $52/visit, 20% margin.",
      "Own platform: $4M capex + $0.1M/yr opex. Third-party: 3% commission on loyalty member sales."
    ],
    framework: [
      "Market — high-end kitchenware growth, competitive positioning, customer trends (online shift)",
      "Client — store footprint, online mix, loyalty pilot results, customer demographics",
      "Growth levers — marketing (loyalty), distribution (online push), product (exclusives), pricing",
      "Decision — build vs buy loyalty platform, pilot scale-up"
    ],
    math: [
      "Store A annual profit: 50k × 12 × $50 × 19% = $5.7M.",
      "Store B annual profit: 50k × 10 × $52 × 20% = $5.2M.",
      "Incremental: $5.7M − $5.2M = $0.5M per 50k customers → $10/member.",
      "Assume 20% of customers enroll: 10k members/store.",
      "Own platform breakeven: $4M ÷ $10/member ≈ 400k loyalty members (~40 stores fully penetrated).",
      "Third-party (3% commission): cost per active member scales with revenue, lower upfront but uncapped."
    ],
    brainstorm: "Why is Kitchen World flat? Specialty retail is getting squeezed by Amazon + Williams Sonoma's DTC push. Growth levers: (1) Marketing — loyalty program + email/SMS personalization; (2) Distribution — fix online (5-10% is low for category), add curbside pickup, test 5 smaller-format urban stores; (3) Product — exclusive brands, private-label high-margin lines, cooking classes as experiential anchor; (4) Pricing — tiered membership, premium workshop tickets. Loyalty pilot shows +visits offsets -ticket and -margin for a net $0.5M uplift per 50k customers. Good news: directional effect is real. Risk: store-A may be outperforming for reasons other than loyalty (market, manager).",
    recommendation: "Launch a loyalty program on third-party platform first (lower upfront cost, faster go-live), with a 12-month option to bring in-house at 400k+ members. Projected profit uplift: $0.5M/store × ~80% of stores participating = $40M over 3 yrs net of commission. Pair with an online-push (target 15% of revenue in 3 yrs) and exclusive brand partnerships for differentiation vs Williams Sonoma. Risks: loyalty program doesn't replicate pilot results at scale, commission scales with success. Next: RFP 3 loyalty platforms, ramp plan (start with 20 stores), online investment plan, exclusive-brand pipeline.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 38,
    source: "mbb",
    title: "The Hunter's Dog",
    industry: "Pet Food",
    type: "Growth Strategy",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you evaluated a major channel-partnership offer.",
    prompt: "The Hunter's Dog is an online fresh-dog-food subscription service offering personalized meal plans. $120M sales in 2020, 100k unique customers. US pet food market: $42B, +10% growth in 2020. Petco has proposed placing Hunter's Dog product in 1,400 Petco stores at identical DTC pricing. Decision: accept the deal?",
    clarifying: [
      "Same retail price to consumer across DTC and Petco (no price arbitrage).",
      "Client gross margin (DTC): 40%. Petco commission: 25% of sales.",
      "Additional opex for Petco channel: 5% (transport, storage, reverse logistics).",
      "Factory expansion capex required to serve Petco: $30M."
    ],
    framework: [
      "Market — pet-food growth, channel mix (DTC vs retail), category trends",
      "Client — DTC unit economics, customer LTV, brand strength",
      "Petco deal economics — channel margin, capex payback, cannibalization risk",
      "Execution — factory expansion, retail ops, brand integrity"
    ],
    math: [
      "Avg annual ticket/customer: $120M ÷ 100k = $1,200.",
      "Petco channel CM%: 40% − 25% commission − 5% extra opex = 10%.",
      "Petco CM per customer: $1,200 × 10% = $120.",
      "Breakeven customers: $30M ÷ $120 = 250k new Petco customers in year 1.",
      "Per-store: 250k ÷ 1,400 = ~178 customers per Petco store in year 1.",
      "Vs DTC CM/customer ($1,200 × 40% = $480) — Petco CM is 1/4 of DTC."
    ],
    brainstorm: "Strategic pros: Petco distribution reaches trial customers the DTC funnel can't; brick-and-mortar legitimizes the brand; captures share from Purina/Hill's in Petco. Cons: margin compression (10% vs 40%); channel conflict with DTC (Petco customers may defect from DTC sub); Petco can drop the brand at will; shelf space isn't free. Risks: customer quality on Petco is worse (one-time buyers vs LTV subscribers), factory expansion is stranded if Petco pulls. Alternatives: limited SKU launch in Petco (trial pack only, drive DTC sub), exclusivity deal with Chewy instead, own retail pilot in Austin/Boston.",
    recommendation: "Accept Petco deal with a limited-SKU approach — place only trial packs ($40) in Petco, direct buyers to the DTC subscription via QR code on package. Reduces capex risk (trial-pack factory = $10M not $30M), protects subscription margins, and uses Petco as a subsidized customer-acquisition channel. Projected: 400k trial-pack buyers in year 1 → 20% subscription conversion = 80k new DTC subs at $480 CM = $38M CM vs $10M capex, net $28M year-1 contribution. Risks: Petco may not accept trial-only terms, channel conflict if full SKU later leaks. Next: negotiate trial-only terms, QR+landing-page infrastructure, 12-month performance review before considering full SKU expansion.",
    source_label: "L.E.K. 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 39,
    source: "mbb",
    title: "Wen Windows",
    industry: "Windows / Manufacturing",
    type: "Growth Strategy",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a new-product launch you were involved in from the start.",
    prompt: "Wen Windows is a vertically integrated window producer (glass, vinyl, fiberglass, frames) — 6 manufacturing facilities + 30 service centers. $150M in 2019 sales, losing share. US window market: $15B, fragmented. Early 2020 (pre-pandemic). Wen is considering launching a new energy-efficient model to regain share.",
    clarifying: [
      "2019 pilot of the energy-efficient model: 2k units, $1.2M revenue.",
      "Fixed costs allocated to this model (marketing + production): $1M/yr.",
      "Gross margin: 30%.",
      "US window buyers: ~70% retrofit (existing homes), 30% new-build."
    ],
    framework: [
      "Market — US window size, growth, fragmentation, energy-efficiency trend",
      "Client — vertical integration advantage, footprint, share loss drivers",
      "Product economics — price, volume, margin, breakeven for energy-efficient model",
      "Growth strategies — price, promotion, distribution, product mix"
    ],
    math: [
      "Avg unit price: $1.2M ÷ 2k units = $600.",
      "CM/unit: $600 × 30% = $180.",
      "Breakeven volume: $1M fixed ÷ $180 CM = ~5.6k units/yr.",
      "Gap from 2k to 5.6k: need ~3x current volume.",
      "Market context: 5.6k units is tiny in $15B market — feasible with the right distribution push."
    ],
    brainstorm: "Why are they losing share? Fragmented market, large national players (Andersen, Pella) have retail distribution (Home Depot, Lowe's); Wen relies on service-center direct sales. Growth levers for the energy-efficient model: (1) Marketing — tap IRA energy-efficiency rebates ($1,200 tax credit for qualifying windows); (2) Pricing — introductory discount; (3) Distribution — add Home Depot pilot, contractor partnerships, online configurator; (4) Value prop — emphasize lifetime energy savings ($400+/yr per household). Energy-efficiency narrative is strong post-IRA (2022) — market is actively growing in this segment.",
    recommendation: "Launch the energy-efficient model aggressively — 3x volume to 5.6k units is plausible if Wen taps (a) IRA tax credits in marketing collateral and (b) Home Depot retail distribution pilot. Projected contribution at 8k units: 8k × $180 − $1M = $440k pure profit incremental. Reasoning: IRA-eligible SKUs are category-growth accelerators, Wen's vertical integration is a cost advantage they haven't been leveraging. Risks: Home Depot relationship takes 12-18 months to build, IRA eligibility needs engineering certification. Next: IRA certification application, Home Depot RFP, contractor-partner program design.",
    source_label: "L.E.K. 2020 · MBB Casebook (Peter K.)"
  },

  {
    id: 40,
    source: "mbb",
    title: "Confectionery Land",
    industry: "CPG / Confectionery",
    type: "Market Entry",
    difficulty: "3 / 2 / 3",
    behavioral: "Tell me about a time you evaluated an international expansion.",
    prompt: "Confectionery Land is a European chocolate/sugar confectionery brand, considering entering developing European Country X with its best-selling chocolate bar. Country X: 9M population, $600M chocolate market, 10% growth/yr. Top 3 (Mondelez, Nestle, Mars) = >50% share. Client's portfolio: chocolate bars, candies, biscuits. Decision: enter or not?",
    clarifying: [
      "Market growth segmented by age: children, 18-44, 45-64, 65+.",
      "Current spending base: Children $120M; 18-44 $180M; 45-64 $180M; 65+ $120M.",
      "2-yr projections: Children +20%; 18-44 price/purchase $6 → $7.5; 45-64 visits 14/yr → 16/yr; 65+ flat.",
      "Client has no existing presence or supply chain in Country X."
    ],
    framework: [
      "New market — size $600M, growth 10%/yr, segments by age, competitive density",
      "Client — product fit (chocolate bar), brand equity, supply chain readiness",
      "Entry economics — revenue potential, cost to build distribution, payback",
      "Execution — build / buy / partner (local distributor vs direct)"
    ],
    math: [
      "Children growth: $120M × 20% = +$24M → $144M.",
      "18-44 growth: $180M × (7.5/6 − 1) = +$45M → $225M.",
      "45-64 growth: $180M × (16/14 − 1) = +$26M → $206M.",
      "65+: unchanged at $120M.",
      "Total market in 2 yrs: $600M + $24M + $45M + $26M = ~$695M (+16%).",
      "Target 3% share in 2 yrs: $695M × 3% = $21M revenue."
    ],
    brainstorm: "Entry options: (a) Build — set up own distribution and sales team (18-24 month ramp, $20-30M investment, most control); (b) Buy — acquire a local chocolate brand ($50-80M, fastest to market, inherits customer base); (c) Partner — license to a local distributor (fastest, lowest capex, weakest brand control, 20-30% margin give-up). Given 3 entrenched competitors at >50% share and no existing client presence, partner route is lowest risk. Target segments: 18-44 is the fastest-growing dollar bucket and aligns with chocolate-bar impulse occasions. Avoid direct confrontation with Mondelez/Mars in top shelf; go premium-adjacent.",
    recommendation: "Enter via local distributor partnership targeting 18-44 segment with a premium-positioned chocolate bar. Projected year-2 revenue: $21M (3% share of $695M market). Reasoning: market is growing fast (+16% over 2 yrs), 18-44 segment is where the incremental dollars are ($45M net growth), partner model de-risks capex while securing distribution. Risks: distributor motivation, brand loss-of-control, competitor price war. Next: shortlist 3 distributor partners, define exclusivity + margin terms, 6-month pilot in 1 city before national rollout.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 41,
    source: "mbb",
    title: "Okay Mobile",
    industry: "Telecom / Energy",
    type: "Market Entry",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you entered an adjacent market leveraging an existing customer base.",
    prompt: "Okay Mobile is an Australian MVNO (mobile virtual network operator) — 1M subscribers, runs on Optus. Considering entering energy retail (electricity + gas) as a virtual retailer (no generation assets, bills only). Target: $5M profit in year 1 post-launch. Australia: 11M electricity customers, 5M gas; $20B electricity + $3-4B gas markets, 1-3% growth.",
    clarifying: [
      "Virtual retailer: client bills customer, buys wholesale energy, keeps margin. No infrastructure build.",
      "Year 1 customer ramp: 0 → 0.2M by EOY (mid-year average = 0.1M).",
      "Avg Australian household spend: $1,300 electricity + $700 gas = $2,000/yr.",
      "Client commission on retail: 10%. Fixed costs: $10M/yr. Variable ≈ $0. Capex out of scope for year-1 P&L."
    ],
    framework: [
      "New market — Australian energy retail, incumbent players, switching dynamics",
      "Client — MVNO customer base (cross-sell potential), brand strength, billing infrastructure",
      "Entry economics — revenue (customers × ARPU × margin), fixed cost, breakeven path",
      "Execution — cross-sell to mobile base vs acquire new customers, bundling"
    ],
    math: [
      "Avg customers through year (linear ramp): 0.2M ÷ 2 = 0.1M.",
      "Annual revenue/customer: ($1,300 + $700) × 10% = $200.",
      "Total revenue: 0.1M × $200 = $20M.",
      "Profit: $20M − $10M fixed = $10M.",
      "Exceeds $5M target by 2x.",
      "Cross-sell assumption: 20% of 1M mobile subs convert → 200k — exactly the ramp plan."
    ],
    brainstorm: "Cross-sell advantages: Okay Mobile already has billing relationship, customer trust, marketing channels (SMS, app). Entry levers: (1) bundle discount (mobile + energy 5% off); (2) app-first sign-up (3-click switch); (3) smart-meter partnerships for usage insights; (4) renewables angle (green-energy tier). Risks: Australian energy retail is competitive and price-regulated in some states; customer acquisition cost could surprise; churn in mobile could cascade to energy. Non-financial: brand extension from mobile to energy is credible but untested. Infrastructure: billing integration, call center for energy-specific queries, regulatory licensing in each state.",
    recommendation: "Proceed with launch — year-1 math shows $10M profit, 2x the $5M target. Target the cross-sell opportunity first (20% of 1M mobile base = 200k, exactly the plan). Launch with a 5% bundle discount and a green-energy tier. Risks: regulatory licensing delays, customer acquisition harder than assumed, Optus-backhaul dependency creates systemic risk. Next: state-by-state licensing timeline, billing-system integration, pilot launch in one state (VIC) before national, churn monitoring dashboard.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 42,
    source: "mbb",
    title: "Guyderma",
    industry: "Beauty / Healthcare",
    type: "Market Entry",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you moved a company into a regulated adjacent market.",
    prompt: "Guyderma is a big beauty company (creams, lotions, masks). Considering expanding into plastic-surgery solutions (botox, disport — injectable neurotoxins). US plastic procedure market: 18M/yr, 1-2% growth. Botox segment dominated by Allergan (Botox) and Ipsen Pharma (Dysport). Client wants $10M profit from the segment. What market share is required?",
    clarifying: [
      "Wholesale acquisition cost per 200-unit botox vial: $1,200.",
      "US botox volume: 2.5M vials/yr.",
      "Expected margin in botox for a new entrant: 5%.",
      "Client has no FDA approval yet for injectables; would need to buy a molecule or partner."
    ],
    framework: [
      "New market — US botox size, growth, competitive structure (Allergan/Ipsen duopoly), regulation",
      "Client — beauty-brand equity, skincare-channel access (dermatologists), capability gap (FDA molecule)",
      "Entry economics — market size, required share, margin profile",
      "Build vs buy — organic R&D (10 yrs) vs acquire (fast, expensive) vs license (partnership)"
    ],
    math: [
      "US botox market size: $1,200 × 2.5M vials = $3B.",
      "Guyderma revenue needed at 5% margin: $10M ÷ 5% = $200M.",
      "Required share: $200M ÷ $3B ≈ 7%.",
      "That's a massive target in a duopoly — Allergan ~70%, Ipsen ~20%, others 10%.",
      "Implication: 7% capture is unrealistic without a differentiated product or acquired brand."
    ],
    brainstorm: "Build vs Buy vs Partner: Build is infeasible — FDA approval takes 8-12 years. Buy a small neurotoxin company (~$500M-1B for a 2-3% share player); integrate sales. Partner with Ipsen (license Dysport distribution for specific channels). Capability gaps: FDA-regulated manufacturing, physician detailing sales force, dermatologist network, reimbursement expertise. Differentiation plays: formulation (longer-lasting), delivery (micro-needle patch — simpler for beauty consumers), channel (skincare + botox bundled in med-spas). Risks: 5% margin is low (competitors run 30%+ — Guyderma would be squeezed at entry), consumer safety regulatory risk, brand dilution from beauty to medical.",
    recommendation: "Do not enter standalone — 7% share in a duopoly with 5% margins is a losing entry profile. Instead, pursue a differentiated adjacent: partner with a dermatologist network to offer bundled skincare+neurotoxin in high-end med-spas, positioning Guyderma as the beauty-continuum brand. If entry is strategically mandatory, acquire a small neurotoxin player ($500M-1B) with an existing FDA molecule to skip the approval curve. Reasoning: direct competition with Allergan is capital-destructive; partnership-bundle captures value without capex. Risks: partner dependency, brand confusion. Next: commission full acquisition-target screen, 6-month med-spa pilot in LA/NY, regulatory readiness review.",
    source_label: "McKinsey 2020 · MBB Casebook (Peter K.)"
  },

  {
    id: 43,
    source: "mbb",
    title: "City Food Bank",
    industry: "Non-Profit / NGO",
    type: "Market Entry",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you had to make capital allocation decisions with nonprofit constraints.",
    prompt: "City Food Bank (CFB) is the largest US food bank. 2020: demand AND donations both spiked — donations +60% to $160M. Wants to expand geographic footprint. Food insecurity: 11% of households (2019) → 23% (2020). Constraint: ≤10% of funds can go to admin (90% must go to hunger relief). Needs a warehouse capacity target for 3-year horizon.",
    clarifying: [
      "2020 donations: $160M (= $100M baseline × 1.6). Donation per meal: $2.",
      "Avg meal weight: 1.25 lbs.",
      "Required on-hand supply: 5 weeks (for surge resilience).",
      "Demand growth assumption: +30% over 3 yrs."
    ],
    framework: [
      "New market — which geographies? Food-insecurity heat mapping (state-level)",
      "Client — CFB's capabilities, existing warehouse network, volunteer base, 90/10 constraint",
      "Economics — donations vs meals served, cost per meal, admin overhead",
      "Execution — warehouse siting, logistics partners, state-level entry sequencing"
    ],
    math: [
      "2020 meals: $160M ÷ $2 per meal = 80M meals.",
      "Annual weight: 80M × 1.25 lbs = 100M lbs.",
      "3-yr weight with 30% growth: 100M × 1.3 = 130M lbs/yr.",
      "5-week supply: 130M × (5/52) = ~13M lbs.",
      "Warehouse capacity target: 13M lbs by 2023.",
      "At ~15 lbs/sf storage density, need ~900k sf of warehouse — likely 3-5 regional facilities."
    ],
    brainstorm: "Geography prioritization: states with biggest 2019→2020 insecurity jump (heat-map via Appendix 1 or USDA data). Partner logistics: Walmart/Target for distribution, local non-profits for last mile, regional food banks for inter-org transfer agreements. Supply chain innovations: cold chain for fresh donations, barcode/inventory systems (currently spreadsheet-driven at many food banks). Constraints: 90/10 admin cap means overhead investments (tech, staffing) must scale with donations. Risk: 2020 was a donation surge — may revert in 2022-23, leaving stranded warehouse capacity.",
    recommendation: "Target 13M lbs of warehouse capacity by 2023, distributed across 4 new regional facilities in the highest-insecurity-growth states (likely MS, NM, LA, KY). Reasoning: supply growth modeled directly from donations + meal cost; 5-week buffer protects against future surge; regional siting minimizes last-mile cost. Risks: donations regress to the mean post-pandemic (stranded capacity), 90/10 admin cap strains overhead for capacity expansion, labor shortages at warehouses. Next: state-level heat map to finalize locations, partnership RFP with 2-3 logistics providers, donor-communication plan to sustain the $160M run-rate.",
    source_label: "BCG 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 44,
    source: "mbb",
    title: "Betacer",
    industry: "Video Games",
    type: "Market Entry",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you evaluated a new category entry at a consumer electronics brand.",
    prompt: "Betacer is a US electronics manufacturer (laptops, phones, monitors, cloud services). Considering entering the US video game market. Global games: $175B (skyrocketed in 2020); US: $41B. Target: mass-market casual gamer (not hardcore). Payback required: 2 years. First product: 'Treasure Hunters' smartphone game, free with in-app purchases.",
    clarifying: [
      "Capex for design + development: $1M. Annual opex (excluding app-store commission): $0.2M.",
      "Free-to-play model — in-app purchases. App store commission: 30%.",
      "Avg spend per paying user: $120/yr. Payer rate: 5% of installs.",
      "Payback target: 2 years."
    ],
    framework: [
      "New market — US games size $41B, segments (casual / hardcore / mobile), growth",
      "Client — existing consumer electronics brand, mobile presence, gaming capability gap",
      "Entry economics — CM per user, breakeven users, LTV vs CAC",
      "Execution — build vs acquire studio, platform choice (iOS / Android / PC)"
    ],
    math: [
      "CM per installed user (mixing payers + non-payers): $120 × 5% × (1 − 30% commission) = $4.2/user.",
      "Total costs over 2 yrs: $1M capex + $0.2M × 2 = $1.4M.",
      "Breakeven users: $1.4M ÷ $4.2 = ~333k installs over 2 years.",
      "That's ~167k installs/yr — feasible via modest marketing in US mobile gaming.",
      "Implied marketing CAC ceiling: profit per user $4.2 ÷ (typical game CPI $2-5) → tight but workable."
    ],
    brainstorm: "Industry dynamics: mobile is the fastest-growing segment within gaming; F2P with IAP is the dominant monetization model; hardcore studios (Riot, Blizzard) dominate PC/console. Entry strategy: start with 1 mobile title (Treasure Hunters), test for retention/monetization metrics, then decide on follow-ons. Alternative: acquire a small indie studio ($10-30M) to skip first-title learning curve. Risks: 90%+ of new mobile games flop; app-store algorithm bias; user acquisition economics ugly (CPI rising). Success pattern: viral hit titles usually come from experienced teams, not first-time launches.",
    recommendation: "Launch Treasure Hunters as a test — 333k breakeven installs is achievable, and 2-yr payback target is met if title hits mid-tier success. But plan for failure: 9 in 10 games don't hit targets. Pair the launch with acquisition-target screening (5 indie studios, $10-30M each) — if Treasure Hunters fails, pivot to M&A; if it succeeds, use learnings to accelerate the studio. Risks: user acquisition costs blow past $4.2/install ceiling; app-store visibility, team inexperience. Next: 90-day soft launch in 1 country (Canada, Australia), acquisition-target pipeline, metrics dashboard (retention D1/D7/D30, ARPDAU).",
    source_label: "BCG 2020 · MBB Casebook (Peter K.)"
  },

  {
    id: 45,
    source: "mbb",
    title: "Sunshine Apparel",
    industry: "Apparel / Toys",
    type: "Market Entry",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you evaluated a 'new category' expansion for an existing brand.",
    prompt: "Sunshine Apparel is a kids' clothing brand — $1B sales, 4% EBT margin, 200 retail stores. Considering entering the traditional toy market (not video games). Target: +10% sales growth. First product category: dolls at $30/unit. Required investment: $4.5M.",
    clarifying: [
      "Peer doll-industry margins: ~5% (Appendix 3).",
      "Doll market size: pulled from Appendix 1 (context-dependent — assume mid-single-digit $B).",
      "Sunshine's 200 stores would cross-merchandise dolls in kids' clothing sections.",
      "No existing toy-manufacturing capability — would use contract manufacturing."
    ],
    framework: [
      "New market — US dolls (segment of $30B toy market), growth, major players (Mattel, MGA)",
      "Client — brand fit (kids apparel → dolls), retail channel leverage, capability gap (toy design/mfg)",
      "Entry economics — CM per doll, breakeven volume, market share required",
      "Execution — own stores first vs wholesale + own; contract mfg vs acquire small toy co."
    ],
    math: [
      "CM per doll: $30 × 5% margin = $1.50.",
      "Breakeven volume: $4.5M ÷ $1.50 = 3M units.",
      "Breakeven sales: 3M × $30 = $90M.",
      "Required market share: $90M ÷ doll market size — if market is ~$3B, that's 3%; if $2B, 4.5%.",
      "For Sunshine to hit 10% sales growth ($100M lift), dolls alone isn't enough — toys category broader needed."
    ],
    brainstorm: "Strategic pros: Sunshine's brand already sits in the girl-parent purchase flow; 200-store retail footprint is ready cross-merchandising; doll category has high gift-occasion spikes. Cons: 5% margin is thin vs 4% EBT (no accretion); Mattel/MGA dominate with decades of IP; toy design isn't a core capability. Alternatives: partner with small doll maker for private-label line (lower margin, faster go-live); acquire a small doll brand ($30-80M); exit to broader toy category (stuffed animals, dress-up sets) where margins are higher. Key risk: toys are trendy (Frozen, Barbie cycles) — hard for non-toy brand to ride waves.",
    recommendation: "Do not enter dolls standalone — 3M unit breakeven at 5% margin in a Mattel/MGA-dominated category is a low-return use of $4.5M. Instead: partner with a small doll brand (white-label manufacturing, Sunshine's branding + retail, 7-8% blended margin) and broaden to adjacent dress-up / accessories where apparel DNA transfers. Projected: $30-40M category sales in year 2 at higher blended margin. Risks: partner dependency, trend-cycle volatility, brand dilution. Next: shortlist 3 toy-mfg partners, SKU strategy for dress-up / accessories, test in 50 top stores before national rollout.",
    source_label: "BCG 2020 · MBB Casebook (Peter K.)"
  },

  {
    id: 46,
    source: "mbb",
    title: "Beta Optics",
    industry: "Healthcare / Manufacturing",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you made a large-capex vs incremental-improvement call.",
    prompt: "Beta Optics is a US-based mid-size prescription eyeglass lens manufacturer. Revenue fell 30% in 2020 (pandemic). B2B: sells to Warby Parker-style retailers. 1M pairs sold at $50 avg in 2020. Considering a $50M investment in digitized production (current: 10+ labor-intensive stages). US annual volume: 80M pairs. Decision: invest or stay?",
    clarifying: [
      "Labor savings: 500 FTEs × 2,000 hrs × $19/hr × 30% labor-savings after digitization.",
      "Raw material savings: $6M raw material spend × 5% waste reduction = $0.3M.",
      "Fixed cost savings: $0.8M (three categories at 20-30% savings each, from $1M base each).",
      "Investment: $50M; equipment useful life: 10 years."
    ],
    framework: [
      "Option A — stay put (low capex, slow margin improvement, exposed to labor inflation)",
      "Option B — digitize (high capex, step-change margin, tech-obsolescence risk)",
      "Decision criteria — payback, NPV, strategic fit, risk",
      "Non-financial — employees (500 FTEs affected), ops complexity, tech future-proofing"
    ],
    math: [
      "Annual labor savings: 500 × 2,000 × $19 × 30% = $5.7M.",
      "Annual raw material savings: $6M × 5% = $0.3M.",
      "Annual fixed cost savings: $0.8M.",
      "Total annual savings: $6.8M.",
      "10-yr cumulative savings: $68M.",
      "Net value: $68M − $50M = $18M over 10 yrs; payback = $50M ÷ $6.8M ≈ 7.4 yrs."
    ],
    brainstorm: "Pros of digitization: labor independence (big deal when wages are rising), consistent quality (fewer returns), scale throughput for future volume recovery. Cons: 7.4-yr payback is risky given tech half-life (machine vision/AI can obsolete today's digitization in 5 yrs); 500 FTE displacement (labor/community/brand risk); if volume doesn't recover, stranded capex. Alternative: phased digitization ($15M pilot line, prove 30% savings at 20% of volume, then scale). Pros/cons of production tech upgrades broadly: ROI positive in 1-2 categories where labor is biggest cost; less so where quality/IP dominates.",
    recommendation: "Do not greenlight $50M single-shot. Instead, phase: $15M pilot line (20% of production) to validate 30% labor savings and 5% waste reduction against actual tech performance. If pilot hits, scale incrementally at $15M tranches. Reasoning: 7.4-yr payback + tech obsolescence risk + 500 FTE displacement = too concentrated. Phased approach preserves optionality. Risks: pilot underperforms (no scale-up triggered); competitor fully-digitizes ahead. Next: pilot scope + vendor RFP, FTE transition plan (retraining or attrition), NPV sensitivity on volume recovery scenarios.",
    source_label: "McKinsey 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 47,
    source: "mbb",
    title: "Mickey Tires",
    industry: "Consumer Products / Manufacturing",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you had to recommend an offshore move and manage political risk.",
    prompt: "Mickey Tires is a US tire manufacturer. 2020 sales down 10% (less driving during pandemic); client expects continued decline. Considering two options: (A) move production to China via a JV, or (B) invest in advanced production tech at the existing Ohio facility. Annual volume: 3M tires, price $60/tire.",
    clarifying: [
      "Current per-tire cost: Labor $30 + Raw materials $15 + Other $3 = $48.",
      "China option: Labor −10%, Materials −80% (local sourcing), Other ×2 (shipping + tariffs).",
      "Tech option: Labor −5%, Materials −50%, Other unchanged.",
      "Options are mutually exclusive (capital budget allows only one)."
    ],
    framework: [
      "Option A — China JV (offshore, lower labor + materials, higher logistics, political/brand risk)",
      "Option B — Ohio tech upgrade (domestic, moderate savings, lower risk, public perception win)",
      "Decision criteria — incremental profit, payback, strategic fit, tail risk",
      "Non-financial — brand (Made in USA), workforce, geopolitical, supply-chain resilience"
    ],
    math: [
      "China cost: Labor $27 + Materials $3 + Other $6 = $36/tire.",
      "Tech cost: Labor $28.5 + Materials $7.5 + Other $3 = $39/tire.",
      "China incremental profit: ($48 − $36) × 3M = $36M/yr.",
      "Tech incremental profit: ($48 − $39) × 3M = $27M/yr.",
      "China wins by $9M/yr — but carries tariff, quality, brand risk.",
      "Current annual profit: ($60 − $48) × 3M = $36M; options double this."
    ],
    brainstorm: "China JV pros: lower materials cost (local rubber/steel), access to Asia-Pacific markets, JV partner brings local expertise. Cons: tariff volatility (Section 301 tariffs on Chinese tires already at 25-35%), brand damage (Made in USA matters in this category), IP leakage, geopolitical risk, quality control. Tech upgrade pros: brand preservation, supply chain resilience, labor relations, government incentives (IRA, CHIPS-style). Cons: lower profit delta, tech obsolescence. Other angle: pursue both — tech Ohio for US market, China JV for export-only — but capital constraint rules this out here.",
    recommendation: "Go with Tech upgrade — China JV's $36M/yr advantage over Tech's $27M/yr disappears after tariff volatility (25-35% tariffs on Chinese tires already, with sunset uncertainty), brand damage, and supply chain fragility. Tech-upgrade net profit is more durable and lower-variance. Reasoning: tariff delta alone could flip the math; Made-in-USA brand equity is measurable in tire-buyer surveys; tech option unlocks future automation wins. Risks: tech vendor execution, labor negotiation on mix-shift, competitor moves. Next: vendor shortlist for Ohio tech, IRA manufacturing credit application, 12-month execution roadmap.",
    source_label: "BCG 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 48,
    source: "mbb",
    title: "POS Vend",
    industry: "Software / SaaS",
    type: "Pricing",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you transitioned a business from one-time revenue to subscription.",
    prompt: "POS Vend is a US point-of-sale software/hardware provider serving small-business retailers and restaurants. US POS market: $12B (2020); cloud-based share growing. 30% of restaurants and 22% of retailers use cloud POS. Client considering pivot from on-premise (one-time revenue) to cloud/SaaS (subscription). Need the indifference-point subscription price.",
    clarifying: [
      "Current on-premise revenue per client: $3k hardware + $0.5k install = $3.5k one-time.",
      "Typical client also adds ~$2.5k in ancillary revenue over a 3-yr window.",
      "Proposed SaaS: priced per month; 3-yr contract default.",
      "Churn assumption: low in year 1, rises year 2-3."
    ],
    framework: [
      "Option A — stay on-premise (higher up-front, no recurring)",
      "Option B — SaaS (recurring, higher LTV, switching risk)",
      "Decision criteria — 3-yr revenue parity, churn, CAC, strategic positioning",
      "Non-financial — salesforce comp, product dev, customer stickiness"
    ],
    math: [
      "3-yr target revenue per client (match on-premise): $3k + $0.5k + $2.5k = $6k.",
      "Indifference point subscription fee: $6k ÷ 3 yrs = $2k/yr = ~$170/month.",
      "With discounting (7% WACC): true indifference ~$180/month to $200/month.",
      "If cloud POS churns 10%/yr, need to raise price ~10% to maintain revenue parity."
    ],
    brainstorm: "Cloud vs on-premise trade-offs: Cloud pros — recurring revenue, better data/analytics, easier upgrades, higher valuation multiple. Cloud cons — lower initial cash, customer resistance (one-time buyers dislike subscriptions), piracy/churn. Pricing model shift risks: salesforce paid on $3k deals won't convert to $170/month; customers perceive rent-seeking (paying every month for same function); requires new billing/collection infrastructure. Segmentation: restaurants (30% cloud already) are more ready than retailers (22%); start with restaurants. Migration: offer existing on-prem customers a grandfathered cloud conversion at $150/month for 12 months.",
    recommendation: "Migrate to SaaS at $200/month (20% above indifference to absorb churn and discount-rate effects). Lead with restaurants (already at 30% cloud adoption), roll to retailers in year 2. Reasoning: $200/month beats the indifference floor, generates recurring revenue multiple for valuation, and captures ancillary revenue (integrations, analytics). Risks: real churn exceeds 10%, salesforce compensation conflict, competitor undercuts on price. Next: sales comp redesign, billing-system buildout, pilot with 50 restaurant clients at $200/month for 6 months to validate churn.",
    source_label: "BCG 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 49,
    source: "mbb",
    title: "Fertilizer Company",
    industry: "Agriculture / Manufacturing",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you optimized a capital-allocation problem with multiple constraints.",
    prompt: "US fertilizer producer — 1.5M tons/yr (nitrogen, phosphatic, potash). 5 factories at capacity. Considering $0.5B capacity expansion: (A) build new factory or (B) upgrade existing. Timeline: 2 years design + 2 years build. State tax incentives available for new-build. US fertilizer demand: 1% growth 2016-19. 81 operational US sites, growing. Target: +240k tons/yr capacity.",
    clarifying: [
      "Production line types: Type 1 — 100k tons/yr capacity, $40M capex.",
      "Type 2 — 60k tons/yr, $30M capex.",
      "Type 3 — 40k tons/yr, $25M capex.",
      "New-build allows mix-and-match; upgrade path at existing sites limited to specific retrofit patterns."
    ],
    framework: [
      "Option A — new factory (greenfield, tax incentives, longer lead time)",
      "Option B — upgrade existing (shorter lead time, limited footprint, no state incentives)",
      "Decision — production-line mix optimization to hit 240k tons/yr",
      "Non-financial — labor, community, environmental, customer proximity"
    ],
    math: [
      "Need ≥240k tons/yr. Candidate sets for new factory:",
      "3× Type 1: 300k tons, $120M.",
      "2× Type 1 + 1× Type 2: 260k tons, $110M. ✓ Meets target.",
      "1× Type 1 + 2× Type 2: 220k tons, $100M. ✗ Fails target.",
      "3× Type 2: 180k tons, $90M. ✗ Fails target.",
      "Winner: 2× Type 1 + 1× Type 2 = $110M for 260k tons (20k buffer).",
      "Upgrade existing would need 4× Type 2 ($120M for 240k) — more expensive per ton."
    ],
    brainstorm: "Non-financial factors: new factory enables site selection (customer proximity, rail access, water rights), state tax incentives often 10-20% of capex (material), community impact (jobs — positive), environmental permitting (2-3 yrs on top of build). Upgrade advantages: no permitting delay, existing labor pool, uses existing logistics. Type 3 is capex-inefficient — rarely optimal. Insight: Type 2 offers 50% more capacity than Type 3 at only 20% more capex; Type 2 dominates Type 3.",
    recommendation: "Build new factory with 2× Type 1 + 1× Type 2 configuration — $110M capex for 260k tons/yr (20k tons buffer above 240k target). Reasoning: $0.42M/ton-capacity (vs $0.50M for upgrade-existing path), state tax incentives likely net $15-20M, Type 3 dominated and excluded. Risks: permitting delay beyond 2 yrs, design-build cost overrun, demand growth underperforms (1% is thin). Next: site selection RFP across 3 states, EPC contractor shortlist, demand-scenario sensitivity (±50% on growth rate).",
    source_label: "McKinsey 2020 · MBB Casebook (Peter K.)"
  },

  {
    id: 50,
    source: "mbb",
    title: "OmegaMed",
    industry: "Healthcare / Software",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you drove a consolidation project across a decentralized organization.",
    prompt: "OmegaMed is a US primary care clinic chain — 500 clinics, grown inorganically. Scheduling software is fragmented (some clinics on Epic, others on Cerner, a few on Excel). Considering a single scheduling platform rollout. Target: 1-year payback. Investment: $5M.",
    clarifying: [
      "Current gridlock: providers at each clinic average ~1.5 hrs/day wasted on scheduling friction.",
      "Staff cost: $100/hr fully loaded.",
      "CM per patient visit: $200. Efficiency gain routes freed time into 2 more visits/clinic/day.",
      "Operating days: 5/week × 50 weeks = 250/yr. Realistic capture of gains: 50%."
    ],
    framework: [
      "Option A — status quo (fragmented, coordination drag, M&A-integration burden)",
      "Option B — single platform (upfront cost, change management, 1-yr payback target)",
      "Decision criteria — payback, ongoing savings, strategic fit (future M&A integration)",
      "Non-financial — staff adoption, data consolidation, regulatory audit trail"
    ],
    math: [
      "Added visits per clinic per year: 2 × 250 = 500.",
      "Incremental profit per clinic: 500 × $200 = $100k theoretical; with $50 efficiency uplift in CM, revised to 500 × $50 = $25k.",
      "Wait — reconcile: 1.5 hr/day × $100 = $150/day cost avoided = $50 uplift × 2 visits = $100/day. Annualize: $25k/clinic.",
      "Across 500 clinics: $25k × 500 = $12.5M theoretical.",
      "Realistic at 50% capture: ~$10M/yr.",
      "Payback: $5M ÷ $10M = 0.5 yrs (6 months). ✓ Beats 1-yr target."
    ],
    brainstorm: "Benefits of unified platform: coordinated scheduling across specialties (patient books PCP + specialist in one visit), data aggregation (demographic + outcomes analytics), M&A integration speed (new clinics onboard faster), compliance auditability. Costs/risks: change management (doctors hate EHR changes), data migration (PHI risk), downtime during transition, vendor lock-in. Alternative: API-integration layer instead of full rip-and-replace (cheaper but less capability). Selection criteria for platform: FHIR compliance, specialty-specific workflows, API openness, $/clinic/month.",
    recommendation: "Proceed with single-platform rollout — 6-month payback at 50% realistic capture is a strong return, and platform consolidation future-proofs M&A integration. Vendor selection: Epic (if OmegaMed is 80% Epic already) or a specialty-focused cloud player (athenahealth, eClinicalWorks). Risks: change management (doctor adoption), data migration PHI exposure, capture <50%. Next: vendor RFP (3 platforms), 50-clinic pilot, migration runbook, training curriculum. Phased rollout: 50 clinics per quarter over 10 quarters.",
    source_label: "Kearney 2021 · MBB Casebook (Peter K.)"
  },

  {
    id: 51,
    source: "mbb",
    title: "DrugGen",
    industry: "Pharma / Healthcare",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you evaluated a product change with compliance vs financial trade-offs.",
    prompt: "DrugGen is a US drug company evaluating new cold-chain packaging for an oncology drug. Change: from 4 pills/day to 4 pills + 2 additional steroids/day (patient compliance play). Global distribution. 1-2% global share = 20k monthly-supply units/yr. Price: $4k/monthly supply (120 pills). Patient population not expanding.",
    clarifying: [
      "Current packaging cost: $160/unit. Current pill cost: $7 × 4 pills × 30 days = $840/unit.",
      "Current CM: $4,000 − $160 − $840 ≈ $3,000/unit. Current annual gross profit: $3k × 20k = $60M.",
      "New packaging cost: $200 (up from $160 due to cold-chain).",
      "New pill cost: $7 × 6 pills × 30 days = $1,260/unit.",
      "Compliance improvement expected: +10-20% adherence uplift (could drive volume growth)."
    ],
    framework: [
      "Option A — keep current packaging (status quo, $60M annual profit)",
      "Option B — switch to cold-chain + extra steroids (higher cost, compliance benefit, volume upside)",
      "Decision criteria — incremental profit, patient outcomes, compliance math",
      "Non-financial — patient reactions, prescriber perception, regulatory, cold-chain logistics"
    ],
    math: [
      "Current CM/unit: $4,000 − $160 − $840 = $3,000.",
      "New CM/unit: $4,000 − $200 − $1,260 = $2,540.",
      "Current annual profit: $3,000 × 20k = $60M.",
      "New annual profit at same volume: $2,540 × 20k = $50.8M → −$9.2M hit.",
      "Breakeven volume uplift needed: $60M ÷ $2,540 ≈ 23.6k units → +3.6k units → ~+18% volume.",
      "Compliance improvement typically drives 10-20% volume lift — sits right around breakeven."
    ],
    brainstorm: "Non-financial benefits: better adherence = better patient outcomes (5-year survival lifts); differentiation vs generic competitors; prescriber preference (they see fewer compliance-related deaths). Risks: patients dislike more pills (swallowing burden); cold-chain adds logistics failure modes (temperature excursions → spoilage); regulatory filing for packaging change takes 12-18 months. Patient reactions split: some welcome simpler compliance (blister packs), others resent forced add-on steroids. Prescriber reactions: oncologists want compliance data before switching.",
    recommendation: "Proceed with cold-chain packaging + steroid combo IF clinical evidence projects ≥18% compliance-driven volume lift — this is the breakeven point. Sensitivity analysis: if compliance lift = 10%, net −$5M; if 20%, net +$0.8M. Recommendation is conditional. Reasoning: patient outcome story is strong, competitive differentiation matters in oncology, but financial case is break-even-contingent. Risks: FDA filing delays, patient acceptance, cold-chain failure modes. Next: commission 100-patient adherence study (6 months), FDA pre-filing meeting, cold-chain logistics RFP. Do not launch without empirical adherence data.",
    source_label: "Kearney 2020 · MBB Casebook (Peter K.)"
  },

  /* =========================================================
     PRACTICE PACK — 15 supplemental cases
     Not from the Darden casebook. Original cases written in the same
     style, covering industries and types complementary to the Darden
     15. Several include exhibits (tables, bar charts, line charts)
     that you'd ask the interviewer for in a real case.
     ========================================================= */

  {
    id: 52,
    source: "practice",
    title: "Prairie Power",
    industry: "Energy",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you had to deliver bad news to a team.",
    prompt: "SunSolve, a residential rooftop-solar installer in Texas, installed 12,000 systems in 2023 for $42M revenue and $12.6M profit (30% margin). In 2025 installs are down to 9,500, revenue to $28M, and profit to $5.6M (20% margin) — even though the Texas residential solar market grew 15%/yr. CEO wants a diagnosis and a fix.",
    clarifying: [
      "Texas residential solar market is GROWING 15%/yr — SunSolve is shrinking while the industry expands.",
      "No new local competitors, but online subscription players ($0-down PPA) expanded into Texas in 2024.",
      "Panel costs dropped 20% industry-wide; installation labor up 35% due to Texas construction boom.",
      "SunSolve only sells cash/loan — no subscription/PPA product. Battery attach rate is 10%."
    ],
    framework: [
      "Revenue decomposition — price per system × volume, by customer segment",
      "Cost decomposition — panels, labor, sales, ops (what's up vs what's down)",
      "Competitive — share loss to online PPA players, pricing pressure",
      "Structural — sales channel mix, financing options customers now expect"
    ],
    math: [
      "2023: 12,000 × $3,500 = $42M revenue; 30% margin = $12.6M profit",
      "2025: 9,500 × $2,947 = $28M revenue; 20% margin = $5.6M profit",
      "Volume decline: (12k − 9.5k) × $3,500 × 30% = −$2.6M",
      "Price decline: 9,500 × ($3,500 − $2,947) × 30% = −$1.6M",
      "Margin compression (labor up > panel savings): $28M × 10pp = −$2.8M",
      "Volume is the biggest chunk — online PPA players capturing 'no-money-down' segment"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Cost structure as % of revenue",
        columns: ["Line item", "2023", "2025", "Δ"],
        rows: [
          ["Panels & hardware", "35%", "28%", "−7 pp"],
          ["Installation labor", "25%", "32%", "+7 pp"],
          ["Sales & marketing", "8%", "14%", "+6 pp"],
          ["Overhead & other", "2%", "6%", "+4 pp"],
          ["Profit margin", "30%", "20%", "−10 pp"]
        ],
        note: "Savings from cheaper panels got more than offset by a skilled-labor shortage."
      }
    ],
    brainstorm: "Launch a PPA/subscription product to match 'no-money-down' competitors. Push battery attach from 10% → 40% (higher margin, IRA tax credit). Pivot partially to commercial rooftop (higher AOV, different sales motion). Reduce labor via pre-assembled panel modules. Don't compete on price in cash segment — compete on speed + warranty.",
    recommendation: "Launch a PPA product targeting 30% of new installs in 18 months + push battery attach to 40% → +$6M annual profit (~22% margin, recovering half the collapse). Risks: working-capital drain from subscription accounting; battery supply volatility. Next: 60-day Austin pilot, financing partner RFP, sales retraining on PPA objection-handling."
  },

  {
    id: 53,
    source: "practice",
    title: "Cold Chain Crunch",
    industry: "Logistics / Grocery",
    type: "Market Entry",
    difficulty: "2 / 3 / 2",
    behavioral: "Describe a time you launched something on an aggressive timeline.",
    prompt: "FrostHop, a 20-minute grocery delivery startup in 6 US cities (produce, dry goods, dairy), is considering adding frozen foods. Frozen requires freezer retrofits to each 'dark store.' CEO wants a yes/no on launching in the next 12 months.",
    clarifying: [
      "35 dark stores across 6 cities; 28 are big enough to retrofit. Current build-out $80k; freezer retrofit adds $160k.",
      "Customer research: frozen lifts AOV by $9/order (current AOV $28).",
      "Frozen GM = 20% vs current 25% (higher energy + spoilage).",
      "Churn: customers who buy frozen churn 18%/yr vs 26% for non-frozen baskets.",
      "70,000 total customers, ~2,000 per store, avg 4 orders/month."
    ],
    framework: [
      "Market — customer demand, alternatives (Instacart, Walmart+), cannibalization of dry/fresh",
      "Operations — retrofit capex, freezer OEM partner, driver cold-bag training, SKU count",
      "Financials — incremental revenue, margin, churn-reduction dollar value",
      "Execution — phased rollout, which stores first, go/no-go gates"
    ],
    math: [
      "AOV lift per customer/yr: $9 × 4 orders × 12 months = $432",
      "Retrofit stores serve: 28 × 2,000 = 56,000 customers",
      "Incremental revenue: 56,000 × $432 = $24.2M/yr",
      "Incremental GP at 20%: $24.2M × 20% = $4.8M/yr",
      "Churn-reduction value: 8pp × 56k = 4,480 customers retained × ~$336 annual profit each = $1.5M/yr",
      "Total incremental profit: ~$6.3M/yr",
      "Capex: 28 × $160k = $4.5M; payback ≈ 8–9 months"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Frozen economics by store tier",
        columns: ["Tier", "Stores", "Customers", "Retrofit capex", "Yr-1 profit"],
        rows: [
          ["A — high density", "10", "25,000", "$1.6M", "$3.2M"],
          ["B — mid density", "12", "22,000", "$1.9M", "$2.4M"],
          ["C — low density", "6", "9,000", "$1.0M", "$0.7M"]
        ],
        note: "Density = orders/mo per square mile. Tier-A has ~5× Tier-C."
      }
    ],
    brainstorm: "Risks: freezer downtime trashes BOTH frozen AND dry goods (shared cold chain); energy prices volatile; FDA/USDA compliance; SKU count triples. Opportunities: private-label frozen (higher margin); 'ice cream in 10 min' as a viral hook; partnerships with DTC frozen brands; meal kits as premium SKUs.",
    recommendation: "Launch frozen in the 10 Tier-A stores in Q1 ($1.6M capex, $3.2M Yr-1 profit, 6-month payback). Gate Tier-B on 6-month unit economics. Curated 120-SKU assortment — don't try to match Walmart at 800+. Risks: cold-chain failure is brand-catastrophic. Next: freezer OEM RFP, 3-store Austin pilot, VP of frozen category hire."
  },

  {
    id: 54,
    source: "practice",
    title: "Medicare Match",
    industry: "Pharmaceuticals",
    type: "Pricing",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you had to stand firm on an unpopular decision.",
    prompt: "PharmaCo-X's blockbuster ZenMax (for major depression) generates $3.2B/yr in US revenue at $480/month net across 555k patients. Medicare has offered to include ZenMax on its 2026 negotiated-price list at a 35% mandated discount — covering ~40% of current patients. Refusing keeps ZenMax on the formulary but at a higher copay tier, historically cutting prescribing ~30% for similar drugs. Accept or refuse?",
    clarifying: [
      "Marginal cost of production: $12/month per patient. R&D is sunk.",
      "Patent expires 2031 (6 years).",
      "Competitor SerenMax launches in 18 months — expected 25% share capture.",
      "Accepting may trigger private-payer discount pressure — estimated 5pp spillover on private lives.",
      "PharmaCo has 2 other drugs facing Medicare review in 2027–28."
    ],
    framework: [
      "Direct financials — accept vs refuse over 6-year patent horizon",
      "Strategic — precedent on private payers; CMS relationship across portfolio",
      "Competitive — how SerenMax launch shifts each scenario",
      "Non-financial — patient access, PR, regulatory reputation"
    ],
    math: [
      "Current GP: ($480 − $12) × 555k × 12 = $3.12B/yr",
      "ACCEPT: Medicare 222k @ $312/mo + private 333k @ $456/mo (5pp spillover)",
      "  → GP: ($300 × 222k + $444 × 333k) × 12 = $799M + $1,774M = $2.57B/yr",
      "REFUSE: 30% Medicare prescribing drop → 155k still on drug at $480",
      "  → GP: ($468 × 488k) × 12 = $2.74B/yr",
      "Refuse wins by ~$170M/yr pre-competitor. With SerenMax shaving 25% non-Medicare share from month 18:",
      "  Accept 6-yr cumulative GP ≈ $13.8B; Refuse ≈ $14.7B. Financial gap: $0.9B"
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit 1 — 6-year cumulative gross profit by scenario",
        bars: [
          { label: "Accept Medicare", value: 13.8 },
          { label: "Refuse Medicare", value: 14.7 }
        ],
        unit: "$B",
        note: "Includes SerenMax launch effect from month 18."
      }
    ],
    brainstorm: "Refusing is a PR flashpoint — Senate hearings, press cycle, potential spillover scrutiny on other drugs. Accepting smooths 2027–28 Medicare negotiations on 2 other PharmaCo drugs. Patient access: 30% prescribing drop = real patients switching to worse drugs. Pipeline: ZenMax-2 (delayed-release) launches pre-patent-cliff — CMS relationship compounds. DTC spend could partially offset Medicare tier shift.",
    recommendation: "Accept the negotiation (push for 32% discount but accept the 35%). The $0.9B of 6-year GP is real, but the strategic discount buys (1) goodwill for 2 upcoming Medicare reviews, (2) no PR/access risk, (3) stability for ZenMax-2 launch. Risks: private payers pile on with their own discount asks — monitor quarterly. Next: war-game ZenMax-2 launch with + without this deal; negotiate volume commitments from CMS in exchange."
  },

  {
    id: 55,
    source: "practice",
    title: "Runway 15",
    industry: "Transportation / Airlines",
    type: "Profitability",
    difficulty: "2 / 2 / 1",
    behavioral: "Tell me about a time you used data to overturn a popular opinion.",
    prompt: "NorthJet, a US budget airline, launched a daily round-trip between Austin and Raleigh 9 months ago. The route is losing $180k/month despite a healthy 75% load factor. CFO wants: cut the route or invest to fix it?",
    clarifying: [
      "1 daily round-trip. Avg 140 pax each way (75% load on 188-seat plane). Avg fare $89.",
      "Daily costs: fuel $12k, crew $8k, airport fees $3k, allocated fixed $8k = $31k total.",
      "Delta entered the same route 4 months in; caused fare to drop from $105 → $89.",
      "NorthJet has a Nashville → Atlanta leg with spare capacity that could through-route."
    ],
    framework: [
      "Unit economics — daily revenue vs daily cost, fixed vs variable",
      "Competitive — Delta's response to our price moves; who blinks first",
      "Network — can the aircraft/crew be redeployed or through-routed?",
      "Strategic — value of the RDU slot; brand signal of pulling a 9-month-old route"
    ],
    math: [
      "Daily revenue: 280 × $89 = $24.9k",
      "Daily cost: $23k direct + $8k fixed = $31k → loss $6.1k/day → $183k/month ≈ $180k ✓",
      "Raise fare to $99 (assume −10% volume): 252 × $99 = $25k — no real improvement",
      "Cut to 5x/week: revenue falls 5/7 but fixed cost doesn't → loss WIDENS to ~$200k",
      "Through-route with Nashville leg: +20 connecting pax → 160/trip × $89 × 2 = $28.5k; added cost ~$1k/day → monthly +$50k"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Monthly P&L sensitivity",
        columns: ["Scenario", "Pax/trip", "Fare", "Monthly P&L"],
        rows: [
          ["Current", "140", "$89", "−$180k"],
          ["Raise fare to $99", "126 (−10%)", "$99", "−$45k"],
          ["Cut to 5x/week", "140", "$89", "−$200k"],
          ["Through-route with Nashville", "160", "$89", "+$50k"],
          ["Cancel route", "0", "—", "$0*"]
        ],
        note: "* Cancel assumes aircraft redeploys to a breakeven route. Slot value not included."
      }
    ],
    brainstorm: "Brand damage of cutting a 9-month-old route (signals to investors). RDU slot has future value. Delta will match if we raise fares. Opportunity cost of the 188-seater on a stronger route (Austin → Boston est. +$80k/mo). Loyalty miles redemption rate matters. Marketing offset from a tourism-board partnership.",
    recommendation: "Through-route Austin → Raleigh with the existing Nashville → Atlanta leg (same aircraft, single stop). Projected +$50k/mo after rebrand. 90-day gate: if through-routing misses, cancel and redeploy to Austin → Boston. Do NOT just raise fares — Delta matches, you lose volume without gaining margin."
  },

  {
    id: 56,
    source: "practice",
    title: "Mainframe Migration",
    industry: "Financial Services / Insurance",
    type: "Operations",
    difficulty: "2 / 2 / 2",
    behavioral: "Walk me through a time you managed a complex technical migration.",
    prompt: "RiverBend Insurance (P&C, $1.8B annual premium) runs its core policy system on 1970s-era mainframes. Annual TCO is $120M; the COBOL-skilled workforce is aging out. CIO asks: migrate to cloud over 5 years, or incrementally modernize the mainframe in place?",
    clarifying: [
      "Mainframe TCO $120M/yr. Cloud migration: $300M one-time over 5 yrs, then $60M/yr run-rate.",
      "'Modernize in place' = API-wrap the mainframe, rehire COBOL, patch. ~$40M/yr incremental for 5 yrs, then reverts to $120M base.",
      "Cloud gives 3x faster release cycle; modernize-in-place keeps current velocity.",
      "Regulatory: state DOIs require 2-year change notices for core policy engines."
    ],
    framework: [
      "Financial — TCO over 10 years, NPV of each path",
      "Risk — migration complexity, data loss, regulatory sign-off, key-talent flight",
      "Strategic — release velocity unlocks bundled insurance, telematics, same-day bind",
      "Execution — phased vs big-bang, team readiness, vendor mgmt (Guidewire / Duck Creek)"
    ],
    math: [
      "10-yr cost of status quo: $120M × 10 = $1.2B",
      "10-yr cost of cloud: $300M (yrs 1–5 migration) + $60M × 5 = $600M",
      "10-yr cost of modernize-in-place: ($120 + $40) × 5 + $120 × 5 = $800M + $600M = $1.4B — WORSE than status quo",
      "Cloud saves ~$600M over 10 yrs but front-loads $300M",
      "Cloud NPV at 8%: ~+$180M, plus the hard-to-quantify release-velocity upside"
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit 1 — 10-year cumulative IT cost by scenario",
        bars: [
          { label: "Status quo (mainframe)", value: 1200 },
          { label: "Cloud migration", value: 600 },
          { label: "Modernize in place", value: 1400 }
        ],
        unit: "$M",
        note: "Cloud crosses status-quo breakeven in Year 7."
      }
    ],
    brainstorm: "Risks: cloud migrations run ~30% over budget; regulatory sign-offs delay go-live; key COBOL people quit mid-migration; data-model translation bugs create policy errors (lawsuit magnet). Mitigations: parallel-run old + new for 12 months; dedicated migration PMO; vendor with P&C-specific track record. Upside: cloud enables telematics-based pricing, AI-assisted underwriting, same-day bind — direct revenue levers.",
    recommendation: "Migrate to cloud, phased over 5 years (policy module first, then claims, then billing). $300M upfront pain earns $180M NPV plus release-velocity upside. Modernize-in-place is strictly worse — more expensive AND no strategic upside. Risks: budget overruns — include 30% contingency; regulatory delay. Next: RFP for Tier-1 P&C migration partner; VP of platform eng; COBOL retention bonuses through year 3."
  },

  {
    id: 57,
    source: "practice",
    title: "Campus Cliff",
    industry: "Education",
    type: "Profitability",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you made a decision with incomplete data.",
    prompt: "Oakridge College (private liberal arts, upstate NY, 1,600 students, $52k tuition) has had flat-to-declining enrollment for 8 years. The 2030 demographic cliff looms — college-age population drops 15%. Board wants a 5-year plan to avoid closure.",
    clarifying: [
      "Annual: $83M revenue, $89M spend → $6M deficit, funded by endowment draw ($180M × 6% = $11M).",
      "Enrollment peaked 2,200 in 2017; now 1,600. Applications peaked 4,200; now 2,800. Yield held ~35%.",
      "Within 90 miles: 3 stronger private peers (Skidmore, Hamilton, Colgate) + SUNY at $10k tuition.",
      "Oakridge has strong theater/dance programs; CS major launched 2 years ago, growing fast."
    ],
    framework: [
      "Market — size of college-aged population in feeder region, competing schools, demand for small-private model",
      "Revenue — students × tuition × yield × aid-discount; auxiliary revenue",
      "Cost — faculty (tenure), facilities, financial aid, admin",
      "Strategic — niche/differentiation, merger, online, orderly closure"
    ],
    math: [
      "Revenue per student net of aid: $52k × (1 − 0.48) = $27k (48% aid discount is industry median)",
      "Enrollment needed to break even: $89M ÷ $27k = 3,300 — 2× current; impossible to close the gap with growth alone",
      "Cost cuts: eliminate 20% of faculty via attrition + buyouts = $9M/yr; close 2 buildings = $2M/yr; admin trim = $3M/yr → $14M/yr",
      "Revenue growth: double CS (80 → 300 × $30k net = +$6.6M/yr); online MS programs +$4M/yr at scale",
      "Combined: deficit closes from −$6M toward breakeven over 5 yrs, IF both levers hit"
    ],
    exhibits: [
      {
        type: "line",
        title: "Exhibit 1 — Oakridge enrollment trend",
        points: [
          { x: "'15", y: 2150 },
          { x: "'16", y: 2180 },
          { x: "'17", y: 2200 },
          { x: "'18", y: 2100 },
          { x: "'19", y: 2000 },
          { x: "'20", y: 1900 },
          { x: "'21", y: 1820 },
          { x: "'22", y: 1760 },
          { x: "'23", y: 1680 },
          { x: "'24", y: 1600 }
        ],
        unit: "full-time undergrad",
        note: "~27% decline since 2017 peak; flat-to-down each of the last 7 years."
      }
    ],
    brainstorm: "Options beyond growth + cut: MERGE with a stronger peer (saves jobs, loses identity); online-first pivot (lose the residential-college brand); niche positioning as 'CS + creative arts' (memorable, quirky); share services with SUNY; accept closure and plan a dignified wind-down. Culture: tenure politics make faculty cuts slow; alumni will push back on most moves.",
    recommendation: "Pursue TWO paths in parallel: (1) aggressive cost cut to $75M by Year 3, (2) niche repositioning as 'CS + creative arts' — double CS, protect theater, drop 3 weakest majors. Set a Year-3 gate — if deficit still >$4M, open merger conversations with a stronger peer. Risks: demographic cliff worse than expected; endowment draw unsustainable. Next: tenured-faculty transition plan, CS facility investment, hire VP of enrollment with turnaround experience."
  },

  {
    id: 58,
    source: "practice",
    title: "The Listen-Along",
    industry: "Technology / Media",
    type: "Growth",
    difficulty: "2 / 1 / 3",
    behavioral: "Tell me about a launch that didn't go as planned. What did you learn?",
    prompt: "MelodyCo (music streaming, 200M MAU, $14B revenue) is considering launching 'Listen-Along' — a social feature letting friends listen to the same track in sync with real-time chat. PM wants: build it or not, and how to measure success?",
    clarifying: [
      "200M global MAU; 90M paid at $10/mo. 110M free users on ads, ~$3/user/yr.",
      "Engineering cost: $18M over 12 months (40 engineers).",
      "Competitors: Apple Music has no social; Spotify has basic Jams. Gen Z skews social (TikTok, BeReal).",
      "Goal: lift engagement (DAU/MAU), cross into 'social' category, improve retention."
    ],
    framework: [
      "User value — who actually benefits? friend pairs, casual groups, creators",
      "Business value — engagement lift, retention, free → paid conversion",
      "Competitive — moat, how fast Spotify fast-follows, effort to match",
      "Execution — scope, A/B plan, launch risk (sync performance, moderation)"
    ],
    math: [
      "If Listen-Along moves DAU/MAU from 50% → 54% (conservative):",
      "  Active daily users: 108M (was 100M) — +8M daily actives",
      "  Ad revenue: +8M × $3/yr = +$24M/yr",
      "  Paid retention: if churn drops 0.5pp/mo → 90M × 0.5% × $10 × 12 = +$54M/yr in retained LTV",
      "  Total upside: ~$78M/yr vs $18M one-time → payback <4 months IF the 4pp DAU lift is real",
      "But that's the whole game — most social features flop and get <1% reach"
    ],
    brainstorm: "Risks: <1% feature usage (most social features flop — build cost doesn't amortize); moderation problem (chat = harassment); sync audio performance at 200M scale; creator/label licensing questions for synced playback; Spotify fast-follows with a better version in 6 months. Opportunities: concert tie-ins (virtual listening parties); creator tool (artist hosts album-listening event); acquisition signal if TikTok/Apple get serious about music.",
    recommendation: "Build minimal v1: 1-to-1 only, no chat, web/desktop first. Launch to 5% of users as a 90-day A/B. Success gate: +10% session length AND +2% 30-day retention in cohort. If both hit, scale + add group mode + chat. If neither, deprecate quietly and keep the sync infrastructure for future features (it's a cheap 'free option' on social). Risks: metric noise, moderation explosion once chat launches. Next: scoped eng spec, legal review on synced-playback licensing, moderation policy from day 0."
  },

  {
    id: 59,
    source: "practice",
    title: "Ghost Kitchen Standoff",
    industry: "Technology / Food Delivery",
    type: "Growth",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you negotiated with a partner who had misaligned incentives.",
    prompt: "EatNow, a US food-delivery platform (15% market share, $22B GMV), is considering launching its own ghost-kitchen brands — EatNow-owned virtual restaurants optimized for delivery. Existing restaurant partners (90k of them) are already upset about commissions. Should EatNow proceed?",
    clarifying: [
      "EatNow takes 25% commission on $22B GMV = $5.5B revenue. Partners keep $16.5B.",
      "Ghost-kitchen economics: delivery-optimized menu, 40% food, 25% labor, 10% rent, 25% operating margin — no partner commission.",
      "Top 10% of partners drive 45% of GMV — they have leverage.",
      "Partner churn already rising 12% → 18% yoy; partners testing DoorDash/Uber Eats."
    ],
    framework: [
      "Opportunity — ghost kitchen TAM, segments where partners are weak (late-night, specific cuisines)",
      "Partner risk — top-partner reaction; cascade to churn; PR risk",
      "Operational — capex, picking cuisine niches, building delivery-only brands",
      "Long-term — is this a hedge or a pivot to vertical integration?"
    ],
    math: [
      "If EatNow captures 2% of GMV via owned brands: $22B × 2% = $440M GMV",
      "Ghost margin $110M (25%) vs commission-model profit $30M on that $440M (after support/tech/CAC) → ~3.5× more profit per GMV dollar",
      "Capex: 50 ghost kitchens × $800k = $40M. Payback <6 months if demand materializes.",
      "BUT partner reaction: if 10% of top partners defect → −$250M revenue × 18% EBITDA = −$45M/yr",
      "Net = positive, but heavily dependent on managing partner relationships"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Profit per $100 GMV: partner vs EatNow ghost",
        columns: ["Line item", "Partner (commission)", "EatNow ghost"],
        rows: [
          ["GMV", "$100", "$100"],
          ["EatNow revenue", "$25 (commission)", "$100 (direct)"],
          ["EatNow operating cost", "$18 (support, tech, CAC)", "$75 (food + labor + rent + CAC)"],
          ["EatNow profit", "$7", "$25"],
          ["Profit ÷ GMV", "7%", "25%"]
        ],
        note: "Ghost kitchen ~3.5× margin per GMV dollar — IF food/labor/rent tracks plan."
      }
    ],
    brainstorm: "Top-partner reactions: public spat (Chipotle-style), lawsuits, lobbying for commission caps, exclusive shift to DoorDash/Uber Eats. PR: 'platform turns on its restaurants' headlines. Talent: running kitchens isn't tech-company muscle memory. Upside: viral potential with niche cuisines (Korean, Halal, late-night breakfast); owned brand IP has spin-off/sale value. Alternative: white-label ghost kitchens FOR top partners — aligned incentives.",
    recommendation: "Launch 5–10 ghost kitchens in categories UNDER-served by top partners (late-night breakfast, regional cuisines) — not direct competition. Cap at 2% GMV in Year 1. If top-10% partner GMV drops >5% in 6 months, pause. Do NOT compete on flagship cuisines (burgers, pizza) where top partners have brand weight. Risks: PR even in niche; kitchen ops talent. Next: DoorDash competitive monitoring, cuisine research, city-by-city partner sentiment."
  },

  {
    id: 60,
    source: "practice",
    title: "Offshore or Out",
    industry: "Energy / Renewables",
    type: "M&A",
    difficulty: "3 / 3 / 1",
    behavioral: "Tell me about a time you championed a long-horizon investment.",
    prompt: "VortexWind (onshore renewable developer, 3GW pipeline) has a chance to acquire development rights to a 900MW offshore wind project off the Massachusetts coast for $450M. Construction: 4 years at $4.2B capex. Once operating, 30 years of power. Worth it?",
    clarifying: [
      "Capacity factor: 45% (offshore runs high). 900MW × 45% × 8,760 = 3,547 GWh/yr.",
      "20-year PPA locked in at $85/MWh. Years 21–30: estimated market price $65/MWh.",
      "Opex: $22.5M/yr.",
      "Industry risk: construction overruns avg +22%; regulatory delays 1–2 yrs common; turbine supply tight.",
      "VortexWind hurdle rate: 10% IRR."
    ],
    framework: [
      "Base-case NPV — acquisition + capex + 30 yrs cash flow, discounted",
      "Sensitivity — capex overrun, PPA price, capacity factor, delay",
      "Strategic — fits VortexWind portfolio (currently all onshore); ESG/investor angle",
      "Risk — execution, regulatory, turbine supply, counterparty"
    ],
    math: [
      "Annual revenue (yrs 5–24, PPA): 3,547 GWh × $85 = $301M/yr",
      "Annual revenue (yrs 25–34, market): 3,547 × $65 = $231M/yr",
      "Opex: $22.5M → net CF: $278M (yrs 5–24), $208M (yrs 25–34)",
      "Total investment: $450M acquisition + $4.2B capex = $4.65B",
      "Undiscounted 30-yr net CF: $278 × 20 + $208 × 10 = $7.64B",
      "NPV at 10%: ~+$450M base case",
      "Capex overrun +22% (industry avg): NPV swings to ~−$475M"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — NPV sensitivity to key inputs",
        columns: ["Scenario", "NPV @ 10%"],
        rows: [
          ["Base case", "+$450M"],
          ["Capex overrun +22% (industry avg)", "−$475M"],
          ["2-year regulatory delay", "+$120M"],
          ["PPA renegotiated up to $95/MWh", "+$890M"],
          ["Capacity factor 40% instead of 45%", "+$80M"],
          ["On-time + on-budget + PPA hold", "+$620M"]
        ],
        note: "Single-digit-percent changes in capex and PPA swing NPV by hundreds of millions."
      }
    ],
    brainstorm: "Industry just saw 3 major offshore cancellations (Avangrid, Ørsted) from cost inflation + rates. Turbine supply from GE/Siemens is bottlenecked. Federal tax credit (IRA) worth ~$0.8B NPV — deal hinges on tax equity staying intact. Portfolio fit: capability leap from onshore. Balance sheet: $4.2B is 60% of current assets — financial strain. Partnership with a utility co-investor could de-risk dramatically.",
    recommendation: "Proceed conditionally: acquire rights ($450M) but structure construction as a 60/40 JV with a strategic utility partner (diversifies risk, eases balance sheet). Lock in turbine supply before signing. NPV range: −$200M to +$500M — acceptable IF tax equity holds and PPA doesn't renegotiate. Risks: overrun >30% turns NPV sharply negative; JV misalignment. Next: term sheets with 2–3 utility co-investors, turbine supply LOI, PPA counterparty credit review."
  },

  {
    id: 61,
    source: "practice",
    title: "Breach Aftermath",
    industry: "Financial Services / Fintech",
    type: "Customer Experience",
    difficulty: "2 / 2 / 3",
    behavioral: "Tell me about a time you rebuilt trust after a mistake.",
    prompt: "PayPoint, a P2P money-transfer app (40M US users), suffered a data breach 3 weeks ago — 8M users had phone, email, and partial account numbers exposed. Active users are down 12% and transaction volume 18%. CEO wants a retention plan.",
    clarifying: [
      "8M users directly affected; 4M more 'adjacent' (notified as precaution).",
      "Transaction volume was $48B/yr; revenue at 1.5% take rate = $720M.",
      "Brand-trust score: 74 → 51 (biggest category drop post-breach).",
      "Competitors (Venmo, Cash App, Zelle) aggressive on acquisition right now.",
      "Regulatory: likely CFPB inquiry + 36 state AG investigations; possible $150M fine."
    ],
    framework: [
      "Immediate — notify, fix, contain; free credit monitoring",
      "Retention — segment affected users, prioritize high-value, hands-on outreach",
      "Trust rebuild — long-term brand campaign + product signals (2FA default, biometric)",
      "Regulatory/legal — manage fines; avoid behavioral commitments that limit future product"
    ],
    math: [
      "12% MAU drop × 40M = 4.8M users at risk. If sustained: −$48B × 12% × 1.5% = −$86M/yr revenue",
      "Txn volume down MORE than users (18% > 12%) → surviving users transacting less — psychological retention, not full exit yet",
      "CAC: $30/user → re-acquiring 4.8M = $144M",
      "Credit monitoring: $8/user × 12M = $96M one-time",
      "Trust rebuild campaign: $60M over 12 months",
      "Total cost ~$300M for $86M/yr protected revenue → payback ~3.5 years if fully recovered"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Affected-user cohort retention, 3 weeks post-breach",
        columns: ["Cohort", "Size", "Still active", "Txn vol vs baseline"],
        rows: [
          ["Heavy (>$2k/mo)", "800k", "82%", "60%"],
          ["Medium ($500–$2k)", "3.1M", "76%", "50%"],
          ["Light (<$500/mo)", "4.1M", "69%", "30%"],
          ["Not affected (control)", "32M", "94%", "96%"]
        ],
        note: "Heavy users retained better but transacting far less — it's a trust problem, not yet an exit problem."
      }
    ],
    brainstorm: "Immediate: CEO video apology (personal, unscripted); free credit monitoring + ID-theft insurance to all 12M affected/adjacent; security upgrade announcement (2FA required, biometric default); vulnerability bounty. Longer: trust advisory board with industry figures; SOC 2 Type II publication; quarterly transparency reports. Don't: blame the vendor publicly (looks like passing the buck); rush marketing before product security actually ships; offer a rebate (cheapens the apology).",
    recommendation: "Three-part plan: (1) immediate — free credit monitoring + ID theft insurance to all 12M, CEO video, mandatory 2FA rollout; (2) 90-day — security transparency report, customer advisory board, direct AM call to every heavy-user cohort customer; (3) 365-day — trust rebuild brand campaign, SOC 2 + pen-test publication. Total ~$300M; prevents $86M/yr erosion. Risks: regulatory penalty larger than modeled; future breach during recovery. Next: legal/comms alignment, CRM segmentation for outreach, security roadmap lock."
  },

  {
    id: 62,
    source: "practice",
    title: "Night Shift Latte",
    industry: "Food & Beverage",
    type: "Operations",
    difficulty: "1 / 1 / 1",
    behavioral: "Tell me about the most boring problem you enjoyed solving.",
    prompt: "BeansMart, a regional coffee chain (110 stores), currently closes at 6 PM. A board member suggested that extending hours to 10 PM would 'easily' grow revenue. COO wants a quick evaluation per store.",
    clarifying: [
      "Avg store does $6,000/day between 6 AM – 6 PM. Morning rush dominates.",
      "Staffing 6–10 PM: 2 baristas × 4 hrs × $22/hr fully loaded = $176 labor/day.",
      "Utilities/fixed: +$40 per store per day for 4 extra hours.",
      "Board member estimate: $800/day evening revenue per store.",
      "Food/drink COGS: 28% of revenue."
    ],
    framework: [
      "Unit economics — revenue needed to cover variable + fixed extension costs",
      "Demand — is $800/day plausible? Benchmarks vs competitors",
      "Operations — staffing, security, customer mix shift, menu adaptation",
      "Strategic — 'morning chain' brand vs 'all-day café'; neighborhood variation"
    ],
    math: [
      "Breakeven revenue: ($176 + $40) ÷ (1 − 28%) = $216 ÷ 0.72 = $300/day per store",
      "If board's $800 is right: profit = ($800 × 0.72) − $216 = $360/day = ~$131k/yr per store × 110 = $14M/yr",
      "If actual is $300/day — net neutral. If less — loss.",
      "Sanity check $800/day: at $6 avg ticket = 133 customers over 4 hrs = 33/hr = 1 every 2 min. Plausible in dense urban, unrealistic in suburb."
    ],
    brainstorm: "Store-level variance matters enormously. 20 urban stores (student corridors, hospital-adjacent, transit hubs) likely hit $800. 60 suburban stores more like $200–$400. 30 strip-mall likely <$200. Evening menu: desserts, wine/beer where licensed adds revenue. Security (cash, late-night safety) and staffing quality concerns. Don't roll out chain-wide on a hunch.",
    recommendation: "Don't roll out chain-wide. Pilot evening hours in 20 urban/student/transit-adjacent stores for 60 days. Chain-wide only if pilot stores average ≥$500/day evening revenue. Add an evening-specific menu (pastries, wine/beer where licensed) during pilot. Risks: understaffing on weekends, late-night safety. Next: select 5 pilot stores, add evening menu, track weekly KPIs."
  },

  {
    id: 63,
    source: "practice",
    title: "Freemium Fence",
    industry: "Technology / Consumer Software",
    type: "Pricing",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you balanced short-term revenue against long-term growth.",
    prompt: "FilingEase (online consumer tax software) serves 8M users a year — 6M free, 2M paid ($60 avg). A board member proposes forcing all users with investment income (1099-DIV, 1099-B) to upgrade to paid. That's 1.5M of the free users. Product VP is worried about brand damage. What to do?",
    clarifying: [
      "Revenue: 2M paid × $60 = $120M/yr. Plus $25M ad revenue on free side.",
      "Of 1.5M investment-income users: 70% have simple 1099-DIV (small dividends), 30% have more complex 1099-B brokerage activity.",
      "Competitor TaxClear lets investment-income users file free.",
      "Survey: 40% of forced-upgrade users would switch competitor."
    ],
    framework: [
      "Revenue — incremental from forced upgrade net of churn + competitor wins",
      "Competitive — does TaxClear grow at your expense? How hard does it lean in?",
      "Brand — 'free' positioning in tax-season marketing; social-media blowback",
      "Product — gate WHAT, soft vs hard paywall, upsell language"
    ],
    math: [
      "Force all 1.5M: 60% stay → 0.9M new paid × $60 = +$54M. Lost ad revenue on 0.6M × $4 = −$2.4M. Net +$51.6M.",
      "Year-2 risk: if free-side overall drops 10% pre-emptively → −$2.4M ad + shrunken future-year conversion funnel",
      "Softer: gate ONLY 1099-B (450k users). 80% stay → 360k × $60 = +$22M. Less brand risk.",
      "Hybrid: gate 1099-B + add in-product upsell for 1099-DIV (soft prompt): ~+$37M with medium brand risk"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Upgrade-gate scenarios",
        columns: ["Scenario", "Users gated", "Retention", "Yr-1 revenue", "Brand risk"],
        rows: [
          ["Status quo", "0", "—", "$0", "Low"],
          ["Gate all 1099 users", "1.5M", "60%", "+$52M", "High"],
          ["Gate only complex (1099-B)", "450k", "80%", "+$22M", "Medium"],
          ["Gate complex + soft-prompt simple", "1.5M (mixed)", "80% / 90%", "+$37M", "Medium-high"]
        ],
        note: "'Soft prompt' = in-app banner explaining upgrade value, no paywall."
      }
    ],
    brainstorm: "Gating is a user-acquisition drag in Year 2+ (ad spend gets less efficient once 'free for all' claim weakens). Better alternative: keep free, improve upsell — show exactly what paid adds (audit support, deduction scans, state filing) at the right moment. Competitive: TaxClear well-funded, won't stay silent on a price moat. Risk of Reddit/Twitter backlash real (remember Adobe creator-tax backlash).",
    recommendation: "Phased: gate ONLY 1099-B (complex brokerage) — +$22M Year 1, lower churn risk, keeps 'free for simple' marketing intact. In parallel, ship in-product upsell for 1099-DIV users (banner: 'upgrade for audit support' — choice, not force). Re-evaluate the harder gate in Year 2 based on churn data. Risks: TaxClear aggressively advertising 'free 1099-B'; 80% retention optimistic. Next: user research on 1099-B cohort, competitive tracking, product-marketing prep."
  },

  {
    id: 64,
    source: "practice",
    title: "Stadium Stalling",
    industry: "Sports & Entertainment",
    type: "Customer Experience",
    difficulty: "2 / 1 / 3",
    behavioral: "Tell me about a time you changed a team's mind with audience research.",
    prompt: "The Charleston Rays, a Class-AA minor league baseball team, have seen attendance drop from 6,200/game (2019) to 3,800/game (2024). Owner wants a plan to rebuild to 6,000+ by 2026.",
    clarifying: [
      "72 home games/yr; stadium capacity 8,500.",
      "Per-fan economics: ticket $14, concession $12, merch $4 = $30 total.",
      "Survey of lapsed attendees: top reasons = time-of-game (45%), on-field talent (30%), stadium experience (25%). NOT price.",
      "New competition: 4 major concerts + 2 youth sports complexes opened in region since 2021.",
      "Saturday college football on local TV = direct overlap."
    ],
    framework: [
      "Segment — fan archetypes (diehards, family, young adults, corporate)",
      "Barriers — time, product quality, substitutes, experience gaps",
      "Offerings — ticket bundles, themed nights, food/merch, loyalty",
      "Partnerships — schools, youth teams, sponsors, MLB affiliate"
    ],
    math: [
      "Revenue per fan: $30. Attendance decline: 2,400 × 72 × $30 = $5.2M/yr lost",
      "Restoring 1,000 fans/game = $2.2M/yr at current mix",
      "Intervention candidates:",
      "  Theme nights: 30 nights × +800 fans = +24k × $30 = $720k rev; cost $300k → +$420k",
      "  Kids-free Sundays: 20 games × +500 = +10k × $16 concession+merch = $160k rev; cost $20k → +$140k",
      "  Corporate group sales: +300/game × 72 × $45 (premium) = $970k rev; cost $150k → +$820k",
      "Combined: ~$1.4M Yr-1 profit + halo effect on the base"
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit 1 — Per-game attendance by fan segment (2019 vs 2024)",
        bars: [
          { label: "Diehards '19", value: 1200 },
          { label: "Diehards '24", value: 1100 },
          { label: "Family '19", value: 2400 },
          { label: "Family '24", value: 1200 },
          { label: "Young adult '19", value: 1500 },
          { label: "Young adult '24", value: 800 },
          { label: "Corporate '19", value: 1100 },
          { label: "Corporate '24", value: 700 }
        ],
        unit: "fans",
        note: "Diehards held. Family, young-adult, corporate dropped hardest — that's where growth has to come from."
      }
    ],
    brainstorm: "Family segment: more weekend day games, theme nights (fireworks, Star Wars), giveaways, kids-free promos. Young adult: social-worthy experiences (craft beer night, after-game DJ) to compete with bars. Corporate: cold-call 200 regional businesses, bundle suites + catering. Food: MiLB food reputation is bad — upgrade 3 concessions to local restaurant partners (rent-share). Partnerships with Little League = family-ticket pipeline.",
    recommendation: "Launch three programs: Theme Nights (30/yr), Youth-Free Sundays, Corporate Group Sales — plus upgrade 3 concessions to local-restaurant partners (rent share, no capex). Year-1 target: 5,000 avg attendance (+1,200), +$1.4M revenue, +$900k profit. Gate full 6,000 goal on Year-1 results. Risks: on-field performance (losing teams hurt everything); major concert weekends compete directly. Next: segment research, partnership outreach, hire a director of fan experience."
  },

  {
    id: 65,
    source: "practice",
    title: "Drone Harvest",
    industry: "Manufacturing / Agriculture",
    type: "M&A",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you evaluated a deal that looked great on paper but had hidden risks.",
    prompt: "SeedFarm Corp (ag inputs, $4B revenue — seeds + fertilizer) is considering acquisition of AerialAg, a 4-year-old drone-based field-mapping and variable-rate-application startup. AerialAg: 2% market share, $80M revenue (+90% yoy), −$30M loss. Asking price $1.2B. Recommend.",
    clarifying: [
      "SeedFarm has 28% share in seeds, 15% in fertilizer — dominant but losing ground to Deere and Climate Corp.",
      "AerialAg tech: multispectral imaging + ML → 'prescription maps' that tell tractors where to plant/spray.",
      "Competitors: Deere + Bayer have in-house drone teams but offer narrower, bolt-on products.",
      "AerialAg has 4 major farm-co contracts; key people are the moat (hire value ~$60M).",
      "SeedFarm needs a drone/precision story for the 2026 farmer-conference season."
    ],
    framework: [
      "Valuation — standalone DCF vs strategic premium",
      "Strategic — defensive (stop losing to Deere) vs offensive (enable bundled selling)",
      "Integration — retain AerialAg team, tech stack fit, sales-channel leverage",
      "Alternatives — in-house build, smaller acquisition, partnership"
    ],
    math: [
      "AerialAg standalone: $80M × 90% yoy × 3 yrs → ~$540M; margins positive at scale, ~$150M EBITDA Yr-5",
      "12× EBITDA = $1.8B; PV at 15% hurdle ≈ $1.0B standalone",
      "Strategic synergies: bundle sell to 50k farm customers × 15% attach × $12k/farm = $90M/yr rev at 35% margin = $32M/yr EBITDA = ~$320M PV",
      "Defensive value: keeps AerialAg away from Deere (avoids ~$50M/yr erosion) = ~$500M PV",
      "Total: $1.0B + $320M + $500M = ~$1.8B — vs $1.2B ask = ~$600M upside"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Precision-ag acquisition candidates",
        columns: ["Target", "Revenue", "Growth", "Loss/yr", "Ask ($M)", "Fit"],
        rows: [
          ["AerialAg (subject)", "$80M", "90%", "$30M", "$1,200", "High"],
          ["CropSense", "$45M", "70%", "$18M", "$550", "Medium"],
          ["Fieldlytics", "$110M", "40%", "$5M", "$1,400", "Medium-high"],
          ["Build in-house", "$0", "—", "$100M/yr × 3 yrs", "$300", "High / slow"]
        ],
        note: "AerialAg has highest growth + clearest tech lead. Fieldlytics is more mature but less integration-ready."
      }
    ],
    brainstorm: "Deere counter-bid risk is real — if Deere bids $1.4B, either deal falls apart or SeedFarm overpays. Integration: drone pilots + ML engineers won't thrive in a fertilizer-company culture (comp + autonomy expectations). In-house build is cheaper but 3-year delay likely fatal vs Deere going to market first. Partnership alternative: 25% stake + tech licensing = $300M, lower optionality but preserves cash. Regulatory: FAA drone rules shifting; operator certification could bottleneck.",
    recommendation: "Proceed at $1.2B with earn-outs — $900M upfront + $300M over 3 yrs tied to revenue and key-talent retention. Pre-close: executive retention packages (4-year vests), FAA compliance review, test Deere ROFR if possible. Total economic upside ~$600M IF synergies + talent both hit. Risks: Deere counter-bid, talent flight Year 2, FAA regulatory lag. Next: IOI → LOI → DD (tech, talent, regulatory). Walk-away trigger: any bid above $1.5B; execute in-house build + partnership instead."
  },

  {
    id: 66,
    source: "practice",
    title: "Yellow Bus, Blue Plug",
    industry: "Transportation / Public Sector",
    type: "Growth",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you led a team through a major operational transition.",
    prompt: "BluBus operates a school-bus fleet of 2,400 buses across 12 Midwest school districts. Incoming state regulation bans new-diesel-bus purchases starting 2028. BluBus has to plan the EV transition. What's the right pace and mix?",
    clarifying: [
      "Current diesel: $130k purchase, 15-yr life, $18k/yr fuel+maintenance.",
      "Electric: $340k purchase, 15-yr life, $6k/yr energy+maintenance. Range: 140 mi/day.",
      "Charging infra: $80k per bus (depot upgrade), amortized over fleet at that depot.",
      "Federal EPA Clean School Bus grant: $300k per EV, competitive — ~45% historical win rate.",
      "400 buses currently on routes >120 mi/day (near EV range limit)."
    ],
    framework: [
      "Regulatory timeline — 2028 ban drives replacement-wave planning now",
      "Unit economics — EV vs diesel lifecycle cost, with/without grant",
      "Operational — range, charging capacity, driver training, winter performance",
      "Phasing — which buses/routes first, grant application timing"
    ],
    math: [
      "Per-bus 15-yr TCO, diesel: $130k + $18k × 15 = $400k",
      "Per-bus 15-yr TCO, EV without grant: $340k + $80k infra + $6k × 15 = $510k → EV +$110k/bus",
      "WITH $300k grant: EV TCO = $40k + $80k + $90k = $210k → EV $190k CHEAPER per bus",
      "Fleet-wide if all grants hit: $190k × 2,000 buses = $380M savings",
      "Realistic grant capture at 45% hit rate: ~900 buses → ~$170M savings",
      "400 long-route buses exceed EV range — defer to 2031+ (pray for range improvements or use plug-in hybrids)"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Transition phasing by route type",
        columns: ["Phase", "Buses", "Route mileage", "Timing", "Funding"],
        rows: [
          ["Phase 1", "600", "<80 mi/day", "2025", "Grant-funded ($180M ask)"],
          ["Phase 2", "1,000", "80–120 mi/day", "2026–27", "Grant + district bonds"],
          ["Phase 3", "400", "120–140 mi/day", "2028–30", "Cash flow + deferred"],
          ["Phase 4", "400", ">140 mi/day", "2031+", "Wait for range + hybrids"]
        ],
        note: "Phase 4 = rural consolidated routes. Range issue is real; don't force the wrong tech."
      }
    ],
    brainstorm: "Grant timing: apply early for max win rate; bundle applications across districts. Charging infrastructure bottleneck — grid connection delays of 18+ months common. Driver training: EV feels different (no engine noise, regen braking) — 2-day training + 30-day onboarding window per depot. Weather: −15°F range drops 25% — plan for winter. V2G revenue: idle fleet earns $1–2k/yr selling grid services. Risk of 2028 ban getting pushed — don't assume political stability.",
    recommendation: "Phased transition over 6 years: Phase 1 (600 short-route, 2025) federally grant-funded; Phase 2 (1,000 medium, 2026–27) grant + bond; Phase 3 (400 long, 2028–30) pay-as-you-go; defer Phase 4 (400 extreme-range) until range improves or hybrids mature. Front-load charging infrastructure — 12 depot upgrades parallel to Phase 1. Projected ~$170M net savings IF grants hit at 45%. Risks: grant program underfunded, grid delays, 2028 ban weakened. Next: Q1 grant application (early = higher win rate), charging-partner RFP, driver training curriculum, district stakeholder roadshow."
  },

  {
    id: 67,
    source: "practice",
    title: "Heartline Clinics",
    industry: "Healthcare / Outpatient",
    type: "Profitability",
    difficulty: "3 / 3 / 3",
    behavioral: "Tell me about a time you had to deliver hard news to a team about a struggling part of the business.",
    prompt: "Heartline is a regional chain of 24 cardiology urgent-care clinics across Ohio and Michigan. Over the last 3 years, revenue grew 18% but EBITDA margin collapsed from 14% to 4%. Board wants an answer in 4 weeks: where is the money leaking, and what do we do? Revenue today is $320M.",
    clarifying: [
      "Mix: 70% commercial insurance, 22% Medicare, 8% Medicaid / self-pay.",
      "Clinic count went from 16 → 24 over 3 years (8 greenfield openings, no acquisitions).",
      "Key cost lines: clinical labor (42% of revenue, up from 34%), real estate (11%, up from 9%), supplies (12%, flat), admin (18%, up from 16%).",
      "4 of the 8 new clinics are in markets where Heartline has no brand equity.",
      "Patient volume per clinic varies 3x between highest and lowest performers."
    ],
    framework: [
      "Revenue side — volume × price × mix; is growth from new clinics cannibalizing mature ones?",
      "Cost side — clinical labor inflation (nurse + tech wage run-up post-2022), real estate, admin overhead from scaling",
      "Unit economics by clinic — mature vs ramping; ID which new clinics are never going to hit contribution target",
      "Payer mix — Medicaid % grew? commercial rates re-negotiated?",
      "Decide: fix clinic-level ops, close weak locations, or renegotiate structurally (payers, staffing model)"
    ],
    math: [
      "Revenue growth: $320M today vs ~$270M 3yr ago → +18% ✓",
      "EBITDA today: 4% × $320M = $12.8M; 3yr ago: 14% × $270M = $37.8M → DOWN $25M in absolute dollars",
      "Cost delta — clinical labor: 42% − 34% = 8pts × $320M = $25.6M of new labor drag",
      "Real estate: 11% − 9% = 2pts × $320M = $6.4M of new rent drag; admin: 2pts × $320M = $6.4M",
      "Mature clinic avg: $16M rev × 16% margin = $2.6M EBITDA ea.",
      "New clinic avg: $8M rev × −4% margin = −$0.3M EBITDA ea. (4 weak ones closer to −$1M)",
      "Close 4 weakest new clinics: avoid ~$4M losses + free ~$8M capex for reinvestment"
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit 1 — EBITDA contribution by clinic cohort ($M)",
        bars: [
          { label: "Mature (16 clinics)", value: 42 },
          { label: "New yr-1 (4)", value: -4 },
          { label: "New yr-2 (4)", value: -2 },
          { label: "Corp overhead", value: -23 }
        ],
        unit: "$M EBITDA",
        note: "Mature book is fine. New clinics haven't ramped AND corporate overhead bloated during expansion."
      }
    ],
    brainstorm: "Clinical labor: travel-nurse dependency is the silent killer; each travel RN costs 2.3x an employed one. Convert to core staff with sign-on bonuses. Real estate: lease terms on weak new clinics — exit clauses or sublet. Payer mix: commercial contract renegotiation tied to quality metrics Heartline actually wins. Telecardiology: virtual follow-ups at 60% margin vs 30% in-clinic. Medicare Advantage risk contract option: flip from fee-for-service to capitated for chronic patients. Don't miss: admin bloat from scaling too fast — a CMO, 3 VPs, and a compliance team all hired on the assumption of 40 clinics.",
    recommendation: "Close 4 weakest new clinics (save ~$4M/yr losses, free $8M capex). Consolidate clinical labor — cut travel-RN usage 60% via sign-on bonuses and regional float pool (~$10M). Renegotiate 3 largest commercial payer contracts tied to outcome data (~$6M). Hold admin headcount flat 18 months (~$4M). Target: EBITDA margin back to 11% in 24 months ($35M from $13M today). Risks: closures hit brand in sub-markets; labor squeeze backfires if nurses leave. Next: clinic-level P&L review, labor market analysis by metro, payer contract audit, comms plan for closures."
  },

  {
    id: 68,
    source: "practice",
    title: "StreamWave",
    industry: "Consumer Tech / Media",
    type: "Pricing",
    difficulty: "2 / 2 / 2",
    behavioral: "Tell me about a time you changed your mind because of data you didn't expect.",
    prompt: "StreamWave is a #3 music-streaming service in the US with 14M paying subscribers at a flat $10/mo. Spotify and Apple Music both offer a $17/mo family plan (up to 6 users). StreamWave doesn't. CEO is asking: should we launch a family tier, and at what price?",
    clarifying: [
      "Current ARPU: $10/mo; gross margin per sub: 28% (music rights are the big cost).",
      "Churn: 4% monthly. Household estimate: ~35% of current subs share a password with a family member who'd otherwise pay separately.",
      "Music royalty costs scale ~$3/mo per active listener regardless of account type.",
      "Competitor family plans: Spotify $17, Apple $17, Amazon $17 (all 6 users). Individual plans all $11.",
      "Prior test: a $15 duo-plan pilot last year got 2% uptake and was killed."
    ],
    framework: [
      "Demand — who upgrades from individual → family, who buys net-new?",
      "Cannibalization — how many existing subs shift from $10 to $17 shared across 3 people?",
      "Incremental cost — royalty scales per listener, so more listeners = real cost",
      "Churn effect — family plans lock in multi-person households (big retention win)",
      "Competitive — being the only player without family pricing is a distribution liability with carriers and retailers"
    ],
    math: [
      "Baseline: 14M × $10 = $140M/mo revenue; GM $39M/mo.",
      "Assume family plan launches at $17; 20% of existing subs (2.8M) convert individually → now 2.8M family 'owners' each bringing avg 1.5 additional listeners.",
      "Revenue shift: 2.8M × ($17 − $10) = +$19.6M/mo from conversion uplift",
      "Royalty cost add: 2.8M × 1.5 extra listeners × $3 = +$12.6M/mo royalty",
      "Net contribution from conversions: +$7M/mo = +$84M/yr",
      "New-customer acquisition: assume +500k net-new family sign-ups driven by the plan itself × $17 × 12 × 40% GM = +$41M/yr",
      "Churn reduction: family households churn at 1.5% vs 4% → retained-value uplift ~$30M/yr over 2 yrs",
      "Total NPV lift: ~$150–170M/yr within 18 months"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Competitive pricing landscape",
        columns: ["Service", "Individual", "Duo", "Family (6)", "Student"],
        rows: [
          ["Spotify", "$11", "$15", "$17", "$6"],
          ["Apple Music", "$11", "—", "$17", "$6"],
          ["Amazon Music", "$11", "—", "$17", "$6"],
          ["YouTube Music", "$11", "—", "$17", "$6"],
          ["StreamWave (today)", "$10", "—", "—", "—"]
        ],
        note: "StreamWave is the only major service without family pricing AND the only one without student pricing."
      }
    ],
    brainstorm: "The killed duo-plan test at $15 failed because $15 − $10 = only $5 savings vs 2 individual plans ($20) — not a big enough wedge. Family at $17 for up to 6 = $2.83/person, huge wedge, much stickier. Risk: existing individual subs in shared households downgrade their household into one family plan → 3M subs become 1M families. Mitigate with 3-month price lock for current subs who DON'T switch. Student plan is a parallel gap worth closing. Carrier bundles (Verizon, T-Mobile) want family SKUs to bundle — launching unlocks a distribution channel Heartline is locked out of today.",
    recommendation: "Launch a Family Plan at $17/mo (up to 6 users) AND a Student Plan at $5/mo within 90 days. Accept ~$40M of cannibalization in year 1 — net gain ~$85M, scaling to $150M+ by month 18 as churn compounds. Pair the launch with two carrier-bundle deals (Verizon + T-Mobile) to recover share from Spotify. Risks: royalty inflation on per-listener basis, competitive price war, existing-sub perceived unfairness. Next: finalize royalty renegotiation pre-launch, carrier bundle pilot, in-app upgrade flow, churn cohort tracking from day 1."
  },

  {
    id: 69,
    source: "practice",
    title: "GlassGrove",
    industry: "Retail / DTC",
    type: "Market Entry",
    difficulty: "3 / 2 / 3",
    behavioral: "Tell me about a time your analysis showed one answer but your gut said another — what did you do?",
    prompt: "GlassGrove is a DTC eyewear brand (prescription glasses, $95 avg order) that has grown to $180M revenue online-only over 6 years. CAC has nearly tripled, from $38 to $110. CEO wants to open 40 physical stores in 24 months at ~$2M build-out each. Is this the right move?",
    clarifying: [
      "Online LTV is $280 over 5 yrs (prescription refills + sunglasses + partner frames); GM is 68%.",
      "Competitor Warby Parker operates ~260 stores; their store-opened cohorts show ~20% lift in total-market new-customer acquisition within 3 miles of a store.",
      "Store unit economics: est. $3.2M avg revenue/yr, 55% contribution margin in-store (rent, labor, ops take the rest).",
      "Category conversion online: 2.1%. In-store (industry avg for eyewear DTC): 8–12%.",
      "$80M cash on hand. Existing investors open to a $100M raise at current valuation if there's a clear store plan."
    ],
    framework: [
      "Channel economics — CAC trajectory online is unsustainable; stores may be cheaper per customer acquired at scale",
      "Omni halo — does a store lift online orders in its catchment (Warby data says yes)?",
      "Unit economics — store payback vs online payback; capex intensity + real-estate risk",
      "Capital plan — $80M build + working capital → raise needed; dilution trade-off",
      "Operational — retail ops is a net-new muscle; can leadership absorb it?"
    ],
    math: [
      "Online CAC $110; at $95 AOV + $280 LTV, payback ≈ 1.7 yrs, LTV/CAC = 2.5x — ok but eroding.",
      "Store: $2M capex + $3.2M revenue/yr × 55% contribution = $1.76M contribution/yr → payback ~1.2 yrs",
      "Halo effect: 20% lift in online new customers within 3-mile catchment — for a 40-store plan covering ~25% of US metro households, that's roughly +4–5pts total new-customer growth/yr",
      "Total 40-store capex: 40 × $2M = $80M (matches cash on hand before working capital)",
      "Year-3 store revenue fully ramped: 40 × $3.2M = $128M; contribution $70M",
      "Assume 30% of in-store revenue cannibalizes online at 68% GM; net lift year-3 ≈ $55M contribution"
    ],
    exhibits: [
      {
        type: "line",
        title: "Exhibit 1 — Blended CAC trend ($/customer, 2019 → 2025)",
        points: [
          { x: "'19", y: 38 },
          { x: "'20", y: 46 },
          { x: "'21", y: 62 },
          { x: "'22", y: 78 },
          { x: "'23", y: 91 },
          { x: "'24", y: 103 },
          { x: "'25", y: 110 }
        ],
        unit: "$ CAC",
        note: "CAC has tripled in 6 yrs. Meta + Google inventory is saturated; organic lever (stores) is the cheapest next customer."
      }
    ],
    brainstorm: "Store format matters: flagship (3,500 sqft, $3M capex) vs mall kiosk (600 sqft, $400K capex) vs shop-in-shop with Nordstrom (near-zero capex, 70/30 rev share). Don't assume 40 identical stores — A/B test 3 formats first. Real estate timing: 2026 retail vacancy rates are favorable post office-to-retail conversions. Talent: experienced retail COO is scarce; hiring takes 6 months. Risk: online DTC brand culture + retail ops culture clash. Vision exam service: optometrists in each store = compliance, licensing, 50-state regulatory slog but defensible moat. Alternative to stores: acquire small regional optical chain with 20 locations for ~$40M.",
    recommendation: "Commit to physical retail but phase it: 10 stores in year 1 as a tested format (6 flagship + 4 kiosk A/B), then scale to 30 more in year 2 IF cohort data confirms halo + store-level payback < 18 months. Raise $50M alongside (not $100M) to preserve optionality. Hire retail COO and VP of optometry operations in Q1. Risks: halo data doesn't replicate Warby results; retail ops execution lag; consumer recession hits discretionary eyewear first. Next: 3-format pilot plan, COO search, cannibalization tracking infra, real-estate broker RFP for top 12 metros."
  },

  {
    id: 70,
    source: "practice",
    title: "TitanForge Steel",
    industry: "Manufacturing / Industrials",
    type: "M&A",
    difficulty: "4 / 3 / 4",
    behavioral: "Tell me about a time you had to weigh a clear financial case against strategic risk.",
    prompt: "TitanForge is a $2.1B-revenue specialty steel manufacturer in Pennsylvania. Major customers (auto + construction) are pushing for 'green steel' — steel with <1 tonne CO2 per tonne output (industry avg is 1.8). TitanForge is evaluating acquisition of MetroCycle, a scrap-metal recycler with secure feedstock contracts for electric-arc-furnace steelmaking. Asking price $620M. Is this the right deal?",
    clarifying: [
      "TitanForge currently uses blast furnace (1.9 t CO2/tonne); MetroCycle feedstock enables EAF route (0.4 t CO2/tonne when paired with renewable power).",
      "MetroCycle revenue: $310M, EBITDA $52M (17% margin), growing 8%/yr. Locked in 12-year feedstock contracts with 4 major auto OEMs (premium pricing, ~20% above spot).",
      "Capex to convert 2 of TitanForge's 5 furnaces to EAF: $480M over 3 yrs. That's on top of the $620M acquisition.",
      "Competitor Nucor already operates 100% EAF; their green-steel contracts command a 12–15% price premium.",
      "Regulatory: EU CBAM carbon tariff kicks in 2027; US IRA 45X credits provide $3–5/tonne for low-carbon steel produced domestically.",
      "TitanForge has $900M available debt capacity + $140M cash."
    ],
    framework: [
      "Strategic rationale — is 'green steel' a real customer demand or marketing narrative?",
      "Deal economics — MetroCycle valuation vs synergy value (feedstock security + price premium access)",
      "Integration — TitanForge has never operated a recycler; union labor, logistics, yard management are new competencies",
      "Alternatives — long-term supply contract with MetroCycle (no acquisition) vs in-house scrap sourcing vs partnership/JV",
      "Financing + deployment — $1.1B combined (deal + conversion capex); debt covenants, dilution risk"
    ],
    math: [
      "MetroCycle standalone value: $52M × 9x EBITDA multiple = $470M → $620M asking = $150M premium (32% over baseline)",
      "Synergy value — green-steel premium: 2 converted furnaces × ~800K t/yr each = 1.6M t/yr × $90/t premium = $144M/yr incremental revenue at ~30% margin = ~$43M EBITDA/yr",
      "IRA 45X credit: 1.6M t × $4 avg = $6.4M/yr",
      "EU CBAM avoidance: export ~200K t/yr to EU — tariff savings ~$22M/yr from 2027",
      "Combined incremental EBITDA: $52M (MC standalone) + $43M (premium) + $6M (IRA) + $22M (CBAM) = $123M/yr by year 4",
      "Payback on $1.1B total investment: ~9 years undiscounted; NPV positive at 8% discount if premium sustains",
      "Debt capacity: $620M deal financed 60/40 debt/cash = $372M debt (leaves $530M debt capacity for conversion)"
    ],
    exhibits: [
      {
        type: "table",
        title: "Exhibit 1 — Strategic path comparison (5-year NPV, $M)",
        columns: ["Path", "Total invest", "Yr-5 EBITDA uplift", "Execution risk", "Strategic control"],
        rows: [
          ["Acquire MetroCycle + convert 2 furnaces", "$1,100", "+$123M", "High", "Full"],
          ["Long-term feedstock contract only", "$60", "+$35M", "Medium", "Low (feedstock risk)"],
          ["JV with MetroCycle (50/50)", "$310", "+$75M", "Medium", "Shared"],
          ["Status quo (blast furnace only)", "$0", "$0 (or −$40M CBAM risk)", "Low", "None"],
          ["Acquire different recycler (cheaper target $410M)", "$890", "+$95M", "High", "Full but weaker contracts"]
        ],
        note: "MetroCycle contracts with auto OEMs are the unique asset. Cheaper recyclers exist but without the premium-customer feedstock locks."
      }
    ],
    brainstorm: "Premium risk: the 12–15% green-steel premium could compress if capacity floods the market — Nucor and ArcelorMittal both planning EAF expansions. Labor integration: MetroCycle is non-union, TitanForge is USW — don't merge labor pools; keep MetroCycle as separate subsidiary. Feedstock security: locked contracts are the moat, but if OEMs renegotiate at contract end (12 yrs), premium evaporates. Alternative financing: structured deal with $200M earn-out tied to 2027 CBAM outcomes — shifts risk to seller. Cultural: TitanForge is an integrated steelmaker, not a recycler. Run MetroCycle at arm's length first 24 months. Power sourcing: EAF only clean with renewable power — negotiate PPA for 600MW during the conversion period. Political: US tariffs + IRA + state incentives (PA has $40M green-manufacturing grant) stack favorably.",
    recommendation: "Proceed at $560M (not $620M) + $60M contingent earn-out tied to 2027 CBAM + IRA credit realization. Fund 60% debt, 40% cash. Convert 2 furnaces over 36 months in parallel; preserve remaining 3 as blast-furnace capacity to hedge demand volatility. Run MetroCycle as standalone subsidiary for 24 months before integration. Target combined EBITDA +$95M by year 4 (risk-adjusted from $123M base case). Risks: premium compression if green-steel oversupplied, union integration delays, power-contract costs. Next: sign renewable-power LOI within 60 days, begin OEM validation discussions to confirm premium durability, CFIUS filing (MetroCycle has a minority foreign LP), PA state incentive application, dedicated integration-management office."
  },

  {
    id: 71,
    source: "practice",
    title: "FrostLine Yogurt",
    industry: "Consumer Goods / Food",
    type: "Ops / Cost",
    difficulty: "3 / 3 / 2",
    behavioral: "Tell me about a time you had to make a capacity decision under forecast uncertainty.",
    prompt: "FrostLine makes premium Greek yogurt (single-serve + multipack) distributed in 22,000 US grocery stores. It's 7 months from peak season (Q4 holiday + back-to-school Aug–Nov). Forecast is 38% above current plant capacity. CEO wants to decide: expand in-house plant 2 ($180M capex, ready in 14 months), contract a co-packer (3–5 month lead), or raise price to throttle demand. What's the call?",
    clarifying: [
      "Current revenue $640M; EBITDA margin 18%. Plant 1 runs 24/7 at 88% utilization today.",
      "Plant 2 expansion: +55% capacity, 14-month build, $180M capex. Fully depreciated over 10 yrs.",
      "Top 3 co-packers have capacity; cost $0.85/unit vs in-house $0.58/unit. 4-month onboarding for food-safety audits + label qualification.",
      "Price elasticity: 10% price increase historically = 6% volume decline in category; premium yogurt is less elastic (4% decline).",
      "Retailers have firm slotting commitments — missing shelves during peak = permanent shelf loss to competitor.",
      "SKU mix: 60% single-serve (tight margin, high volume), 30% multipack, 10% new flavor launches (highest margin)."
    ],
    framework: [
      "Demand reality — is the 38% forecast real (retailer POs) or hopeful (sales plan)?",
      "Capacity options matrix — in-house, co-pack, price-based demand throttle, SKU rationalization",
      "Timing — 7 months until peak; only co-pack or SKU cuts fit the window. Plant 2 is a 2027 play.",
      "Unit economics — co-pack margin compression vs stock-out cost (shelf loss)",
      "Risk — co-packer quality + food safety + brand",
      "Strategic — do BOTH: co-pack now for this peak, plant 2 for sustained growth"
    ],
    math: [
      "Current plant output: ~200M units/yr at 88% util; max ~227M. Forecast: 276M units (+38%).",
      "Gap: 276M − 227M = 49M units need external capacity this year.",
      "Co-pack cost premium: 49M × ($0.85 − $0.58) = $13.2M incremental COGS",
      "Price-based throttle: raise price 6% → volume down ~2.4% → 270M demand (still 43M short). Not enough.",
      "Plant 2: $180M / $55M avg annual incremental contribution = 3.3 yr payback",
      "Stock-out cost if FrostLine can't supply: estimated shelf loss ~800 stores × $45k/yr avg revenue each = $36M/yr (and sticky — hard to win back)",
      "So: $13M co-pack cost << $36M stock-out cost. Co-pack this year is obvious."
    ],
    exhibits: [
      {
        type: "bar",
        title: "Exhibit 1 — Cost-to-serve 49M unit gap, by path ($M + risk)",
        bars: [
          { label: "Co-pack", value: 13 },
          { label: "Price +6%", value: 36 },
          { label: "Cut low-margin SKUs", value: 22 },
          { label: "Stock out", value: 36 },
          { label: "Air-freight fillers", value: 48 }
        ],
        unit: "$M cost",
        note: "Co-pack is the cheapest path to cover peak. SKU cuts sacrifice margin. Stock-out is catastrophic because shelf space is lost semi-permanently."
      }
    ],
    brainstorm: "Do both: co-pack for 2025 peak, plant 2 for sustained growth. Co-pack only 30M of 49M — reserve 19M headroom via SKU rationalization (kill 5 weakest flavors, reclaim line-changeover time). Food safety audit: do NOT skip it; one Listeria headline kills the brand. Co-packer relationship: 2 co-packers not 1 to de-risk. Labels / shelf-ready packaging: requires co-packer to install FrostLine-specific tooling — $1.2M setup, amortize over 2 yrs. Alternative: delay new-flavor launches to free plant 1 capacity. Plant 2 location: Midwest (closer to milk supply, lower labor cost vs current NY facility). Milk-supply risk: +55% capacity needs +55% milk; lock farmer contracts now. Sustainability angle: newer plant = 30% less water + waste = marketing win with Gen Z consumers.",
    recommendation: "Pursue two-track plan: (1) Onboard 2 co-packers in Q1 to deliver 30M units for this peak ($8M premium + $1.2M tooling), (2) Cut 5 lowest-margin SKUs to free 15M in-house units (+$4M margin), (3) Hold price flat — brand trust matters more than short-term margin, (4) Approve $180M Plant 2 capex to break ground Q2 for 2027 readiness. Total yr-1 cost: ~$10M; avoided shelf-loss value ~$36M/yr sticky. Risks: co-packer food-safety incident, Plant 2 cost overruns, milk-supply inflation. Next: sign co-packer LOIs within 30 days, SKU rationalization announcement to trade, Plant 2 site selection (Wisconsin vs Ohio), milk-farmer contract expansion, Q3 quality-assurance audits of co-packers."
  }
];

/* =========================================================
   MATH DRILLS — timed single-problem practice for Learn tab
   ========================================================= */
const MATH_DRILLS = [
  // ---------- MARKET SIZING ----------
  {
    id: "ms-dentists",
    type: "Market Sizing",
    prompt: "Estimate the number of practicing dentists in the US.",
    unit: "dentists",
    answerLo: 150000, answerHi: 250000,
    timeSec: 180,
    solution: "US pop ≈ 330M. Avg dentist sees ~2,000 patients across the year (8 patients/day × 250 workdays). So dentists ≈ 330M / 2,000 ≈ 165K. Actual: ~200K. Any answer in 150K–250K range is solid."
  },
  {
    id: "ms-gas-stations",
    type: "Market Sizing",
    prompt: "Estimate the number of gas stations in the US.",
    unit: "stations",
    answerLo: 100000, answerHi: 200000,
    timeSec: 180,
    solution: "330M people ≈ 128M households. ~85% have a car → ~260M cars total. Each car fills up ~1.5×/week = ~75 fills/yr → ~19.5B fills/yr. A station pumps ~1,000 cars/week = 52K/yr. 19.5B / 52K ≈ 125K–150K stations. Actual: ~115K."
  },
  {
    id: "ms-pizzas",
    type: "Market Sizing",
    prompt: "Estimate the number of pizzas sold in the US per year.",
    unit: "pizzas/yr",
    answerLo: 2500000000, answerHi: 4500000000,
    timeSec: 180,
    solution: "330M people. Avg person eats ~10 pizzas/yr (1 delivery/mo + occasional frozen/restaurant), but segment: kids (~25% of pop) eat more, elderly (~20%) eat less, adults (~55%) eat avg. Rough: 330M × 10 = 3.3B pizzas/yr. Actual: ~3B."
  },
  {
    id: "ms-commercial-jets",
    type: "Market Sizing",
    prompt: "Estimate how many commercial passenger jets are operating in the US at any moment during peak daytime hours.",
    unit: "jets in air",
    answerLo: 4000, answerHi: 8000,
    timeSec: 240,
    solution: "~5,000 commercial flights/hr in US peak. Avg flight ~2 hrs → ~10,000 jets in air simultaneously? No — flights overlap. Ballpark: FAA tracks ~5,000–7,000 aircraft aloft at any peak moment (commercial + cargo + private). Commercial-only ≈ 4,000–6,000."
  },
  {
    id: "ms-kids-shoes",
    type: "Market Sizing",
    prompt: "Estimate annual revenue of the US kids' shoe market (age 2–14).",
    unit: "$",
    answerLo: 4000000000, answerHi: 12000000000,
    timeSec: 240,
    solution: "Age 2–14 ≈ ~13 years × 4.2M births/yr = ~55M kids (adjusting for mortality ≈ 50M). Kids need 2 pairs/yr at avg $50 = $100/kid/yr. 50M × $100 = $5B/yr. Actual: ~$7B. Acceptable range $4–12B."
  },

  // ---------- BREAKEVEN ----------
  {
    id: "be-coffee-shop",
    type: "Breakeven",
    prompt: "A coffee shop has $12,000/month in fixed costs (rent, payroll, insurance). Each drink sells for $5 and has $1.50 in variable cost. How many drinks must it sell per month to break even?",
    unit: "drinks/mo",
    answerLo: 3428, answerHi: 3430,
    exact: 3429,
    timeSec: 120,
    solution: "Contribution margin per drink = $5 − $1.50 = $3.50. Breakeven = Fixed / CM = $12,000 / $3.50 = 3,428.57 → round to 3,429 drinks/month (~115/day)."
  },
  {
    id: "be-software",
    type: "Breakeven",
    prompt: "A SaaS company invests $2M to build a new product. Each subscription is $200/yr with $20/yr in hosting costs. How many subscribers does it need in year 1 to break even on the build investment?",
    unit: "subscribers",
    answerLo: 11111, answerHi: 11112,
    exact: 11112,
    timeSec: 120,
    solution: "CM per sub = $200 − $20 = $180/yr. Breakeven = $2M / $180 = 11,111.1 → 11,112 subscribers to recoup the build within year 1."
  },
  {
    id: "be-factory",
    type: "Breakeven",
    prompt: "A factory pays $500K/yr in fixed costs. Each widget sells for $40 with $25 variable cost. The factory is currently selling 20,000 widgets/yr. How many MORE widgets must it sell to break even?",
    unit: "more widgets",
    answerLo: 13333, answerHi: 13334,
    exact: 13334,
    timeSec: 120,
    solution: "CM per widget = $40 − $25 = $15. Breakeven = $500K / $15 = 33,333.3 → 33,334 total. Currently 20,000 → needs 13,334 more."
  },

  // ---------- CAGR / GROWTH ----------
  {
    id: "cagr-3yr",
    type: "CAGR",
    prompt: "Revenue grew from $200M to $338M over 3 years. What is the CAGR? (Answer as a %)",
    unit: "% CAGR",
    answerLo: 19, answerHi: 21,
    exact: 19.12,
    timeSec: 120,
    solution: "CAGR = (End/Start)^(1/n) − 1 = (338/200)^(1/3) − 1 = 1.69^(0.333) − 1. 1.69^(1/3): try 1.19 → 1.685 (close!). So CAGR ≈ 19%. Rule of 72 check: 72/19 ≈ 3.8 yrs to double; we grew 1.69× in 3 yrs, slightly under doubling — checks out."
  },
  {
    id: "double-time",
    type: "CAGR",
    prompt: "A startup grows revenue 24% per year. Using the rule of 72, approximately how many years does it take for revenue to double?",
    unit: "years",
    answerLo: 2.9, answerHi: 3.1,
    exact: 3.0,
    timeSec: 60,
    solution: "Rule of 72: yrs to double ≈ 72 / r% = 72 / 24 = 3 years. (Exact: ln(2)/ln(1.24) = 3.22 yrs — rule of 72 is a fast approximation.)"
  },
  {
    id: "cagr-10yr",
    type: "CAGR",
    prompt: "A company's revenue went from $50M to $100M over 10 years. What is the approximate CAGR? (Answer as a %)",
    unit: "% CAGR",
    answerLo: 6.9, answerHi: 7.3,
    exact: 7.18,
    timeSec: 90,
    solution: "Revenue doubled over 10 years. Rule of 72 inverted: r ≈ 72/10 = 7.2%. So CAGR ≈ 7.2%. Exact: (2)^(1/10) − 1 = 1.0718 − 1 = 7.18%."
  },

  // ---------- MARGIN / MARKUP ----------
  {
    id: "margin-1",
    type: "Margin / Markup",
    prompt: "A product sells for $80 and costs $48 to make. What is the gross margin %?",
    unit: "% margin",
    answerLo: 39.9, answerHi: 40.1,
    exact: 40,
    timeSec: 60,
    solution: "Margin = Profit / Revenue = ($80 − $48) / $80 = $32 / $80 = 40%. (Don't confuse with markup: markup = $32/$48 = 66.7%.)"
  },
  {
    id: "markup-to-margin",
    type: "Margin / Markup",
    prompt: "A retailer buys a jacket for $60 and applies a 50% markup. What is the GROSS MARGIN % on the sale? (Answer as a whole number %)",
    unit: "% margin",
    answerLo: 33, answerHi: 34,
    exact: 33,
    timeSec: 90,
    solution: "50% markup on $60 → sell price = $60 × 1.5 = $90. Profit = $30. Margin = $30 / $90 = 33.3%. Trap: markup % and margin % are NOT the same — markup is over cost, margin is over revenue."
  },
  {
    id: "required-price",
    type: "Margin / Markup",
    prompt: "A product costs $24 to make. The company targets a 40% gross margin. What price should it sell at?",
    unit: "$",
    answerLo: 39.9, answerHi: 40.1,
    exact: 40,
    timeSec: 60,
    solution: "If margin = 40%, then cost = 60% of price. Price = Cost / 0.6 = $24 / 0.6 = $40. Check: ($40 − $24) / $40 = 40%. ✓"
  },

  // ---------- REVENUE / PROFIT ----------
  {
    id: "rev-1",
    type: "Revenue / Profit",
    prompt: "A company has 3 segments: A sells 1,000 units at $500 each with 30% margin. B sells 4,000 units at $100 each with 20% margin. C sells 500 units at $2,000 each with 50% margin. What is total gross profit? ($ millions)",
    unit: "$M gross profit",
    answerLo: 0.73, answerHi: 0.74,
    exact: 0.73,
    timeSec: 180,
    solution: "A: 1,000 × $500 × 30% = $150K. B: 4,000 × $100 × 20% = $80K. C: 500 × $2,000 × 50% = $500K. Total = $150 + $80 + $500 = $730K = $0.73M."
  },
  {
    id: "rev-2",
    type: "Revenue / Profit",
    prompt: "A company has $50M revenue with 40% gross margin, $8M in operating expenses, and pays 25% tax on profit. What is its net income? ($M)",
    unit: "$M net income",
    answerLo: 8.9, answerHi: 9.1,
    exact: 9,
    timeSec: 120,
    solution: "Gross profit = $50M × 40% = $20M. Operating profit = $20M − $8M = $12M. Tax = $12M × 25% = $3M. Net income = $12M − $3M = $9M."
  },
  {
    id: "price-inc",
    type: "Revenue / Profit",
    prompt: "A product sells 10,000 units/yr at $100 with $60 variable cost. The company raises price to $110 and sales volume drops 8%. By how much ($) does gross profit change per year?",
    unit: "$ change in profit",
    answerLo: 60000, answerHi: 62000,
    exact: 60000,
    timeSec: 180,
    solution: "Before: 10,000 × ($100 − $60) = $400K. After: 9,200 × ($110 − $60) = 9,200 × $50 = $460K. Change = +$60K/yr. Price increase MORE than compensates for volume drop because higher margin per unit."
  }
];

/* =========================================================
   WORKED EXAMPLES — "learn by doing" walkthroughs
   Each example teaches how to pick a framework, state assumptions,
   and do the math out loud. The structure mirrors how an interviewer
   wants you to think: frame → assume → compute → sanity-check.
   ========================================================= */
const WORKED_EXAMPLES = [
  // ---------- 01. Market sizing: the user-requested population question ----------
  {
    id: "wx-kids-2-14",
    type: "Market Sizing",
    title: "How many US kids age 2–14?",
    lede: "A classic 60-second opener. The interviewer wants to see you build a tree, state assumptions crisply, and sanity-check the answer. They don't care about the exact number — they care about the structure.",
    framework: {
      picked: "Top-down from total population",
      why: "Demographic questions anchor on US population (~335M), which is a number you should know cold. Top-down lets you get an estimate in 4 lines of math. Bottom-up (summing birth-year cohorts) gives the same answer but costs 2× the time."
    },
    assumptions: [
      { claim: "US population ≈ 335M", why: "Round-number anchor. Actual is ~333M (2024). Close enough for a 2-minute answer; being off by 2M is noise." },
      { claim: "Roughly even age distribution across 0–80", why: "A simplification. Real US pyramid dips in the baby-bust years and tapers after 70. Call out the assumption and move on — the interviewer isn't grading the nuance, they're grading that you **know** you simplified." },
      { claim: "Age range 2–14 is inclusive → 13 single-year cohorts", why: "Ages are 2, 3, 4, … 14 — that's 13 numbers, not 12. This is the #1 off-by-one error in kids' market-sizing questions." }
    ],
    steps: [
      { label: "Anchor on total US pop", math: "335M", why: "Must-know number. State it out loud so the interviewer can correct you if they want a different baseline." },
      { label: "Divide into single-year cohorts", math: "335M ÷ 80 yrs ≈ 4.2M per year", why: "Treats population as a uniform rectangle over an 80-year lifespan. Not literally true but close enough." },
      { label: "Width of the age bucket", math: "14 − 2 + 1 = 13 yrs", why: "Inclusive endpoints. Double-check by listing: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 = 13." },
      { label: "Multiply cohorts × years", math: "4.2M × 13 ≈ 55M", why: "Cohort size × number of cohorts. Round to tidy numbers when you say it out loud — 54M or 55M, whatever lets you finish confidently." }
    ],
    answer: "≈ 55 million US kids aged 2–14",
    sanityCheck: "Gut-check: that's ~16% of the US population. Real census figure is ~52M (15.6%) — our estimate is within 5%. Anything you deliver in the 45–60M range is defensible as long as your tree is clean.",
    traps: [
      "Using 14 − 2 = 12 years (off-by-one). Always write out the list when inclusive.",
      "Assuming a 100-year lifespan → cohort becomes 3.35M, pushing the answer to ~44M. Use 80 as the working-life span for US market sizing.",
      "Quoting 330M as 3.3B. Unit errors eat candidates alive — say the units out loud."
    ],
    variations: [
      { q: "US kids 0–17?",      a: "18 cohorts × 4.2M = ~75M. Actual: 73M." },
      { q: "US adults 25–54?",   a: "30 cohorts × 4.2M = ~126M. Actual: 130M." },
      { q: "US seniors 65+?",    a: "Don't use the uniform assumption here — real distribution falls off. Ballpark: ~17% of pop = ~57M. Actual: 56M." }
    ],
    vocabUsed: ["market sizing", "top-down estimation"],
    formulasUsed: []
  },

  // ---------- 02. CAGR: the user-requested "why CAGR" question ----------
  {
    id: "wx-cagr-vs-avg",
    type: "CAGR",
    title: "Revenue went from $50M → $80M over 3 years. What's the growth rate?",
    lede: "The interviewer is testing whether you know the difference between a simple average and a compound growth rate. If you answer '20%/yr' without thinking, you've failed the question.",
    framework: {
      picked: "CAGR (compound annual growth rate)",
      why: "CAGR is the constant yearly rate that would take $50M → $80M in 3 years **if** growth compounded smoothly. Any time the question gives you a start value, an end value, and a number of periods — and asks for \"the growth rate\" — that's CAGR. A simple average over-states the rate because it ignores that year 2's base is bigger than year 1's."
    },
    assumptions: [
      { claim: "Growth compounded (not simple)", why: "Almost always true for revenue, users, subscribers. Real businesses grow off last year's base, not the starting base." },
      { claim: "\"3 years\" means 3 periods of growth", why: "Start-of-year-1 → end-of-year-3 is 3 compounding periods. If the question said \"from 2020 to 2023\" you'd count the same way: 3 step-ups." },
      { claim: "No inter-year volatility matters", why: "CAGR smooths over bumpy years. Interviewer doesn't care about the actual year-1 or year-2 values — just the endpoints." }
    ],
    steps: [
      { label: "State the CAGR formula", math: "CAGR = (End / Start)^(1/n) − 1", why: "Memorize this cold. n = number of compounding periods." },
      { label: "Plug in", math: "($80M / $50M)^(1/3) − 1 = 1.6^(0.333) − 1", why: "Ratio is 1.6, so we need the cube root of 1.6." },
      { label: "Estimate the cube root", math: "1.6^(1/3) ≈ 1.17  (because 1.17³ ≈ 1.60)", why: "Memorize a few anchors: 1.1³ ≈ 1.33, 1.2³ ≈ 1.73, 1.5³ ≈ 3.4. 1.6 sits just above 1.17³." },
      { label: "Subtract 1 and convert", math: "1.17 − 1 = 0.17 → **17%/yr**", why: "The growth rate itself is the amount above 1." }
    ],
    answer: "CAGR ≈ 17% / year",
    sanityCheck: "Verify by forward-compounding: $50M × 1.17³ = $50M × 1.60 = $80M. ✓ If you had used the wrong formula (simple average), you'd say ($80M − $50M) / ($50M × 3) = 20%/yr — which is 3 points too high. For a CEO forecasting future revenue, that 3-point error compounds into a huge overshoot.",
    traps: [
      "Saying \"($80 − $50) / $50 / 3 = 20%\". That's the simple-average approximation — it ignores compounding and always over-states the true rate.",
      "Using n = 4 (count of year-end values) instead of n = 3 (number of step-ups). Always count the **intervals**, not the **years labeled**.",
      "Forgetting the −1 at the end. (End/Start)^(1/n) is the **growth factor**, not the rate."
    ],
    variations: [
      { q: "$50M → $80M over 5 years?",     a: "1.6^(1/5) − 1. 1.6^(0.2) ≈ 1.098 → ~10%/yr." },
      { q: "$100M → $200M over 4 years?",   a: "2^(1/4) − 1 = 1.189 − 1 = ~19%/yr. (Rule of 72: doubling in 4 yrs → 72/4 = 18%, so 19% checks out.)" },
      { q: "When would you NOT use CAGR?",  a: "If the interviewer wants you to discuss volatility, year-by-year, or early decline → report the growth year by year instead. CAGR hides bumpy trajectories." }
    ],
    vocabUsed: ["CAGR", "compound growth"],
    formulasUsed: ["CAGR"]
  },

  // ---------- 03. Breakeven: coffee-shop expansion ----------
  {
    id: "wx-breakeven-coffee",
    type: "Breakeven",
    title: "Should the coffee shop expand?",
    lede: "A coffee shop owner asks: \"If I open a second location with $12K/mo fixed costs, drinks at $5 with $1.50 variable cost, how many drinks per day do I need to break even?\" The interviewer is watching whether you convert monthly → daily and whether you nail contribution margin.",
    framework: {
      picked: "Breakeven on contribution margin",
      why: "Breakeven = Fixed Costs ÷ Contribution Margin per unit. This is the single formula that tells you when revenue covers all costs. \"Price × volume = total cost\" works too but takes more algebra; CM is one line."
    },
    assumptions: [
      { claim: "$1.50 variable cost captures everything that scales per drink", why: "Cups, lids, milk, beans, a slice of barista labor. If the interviewer gave you a labor-is-fixed setup, you'd lump it into the $12K." },
      { claim: "$5 price is net of discounts", why: "If 10% of customers use a loyalty punch-card, realized price is lower. Ask. In this frame, we treat $5 as realized." },
      { claim: "30 days / month", why: "Keeps the monthly→daily conversion clean. 30 is the consulting-math default unless told otherwise." }
    ],
    steps: [
      { label: "Contribution margin per drink", math: "$5 − $1.50 = **$3.50**", why: "CM is what each incremental drink contributes toward fixed costs and profit. Do NOT confuse this with gross margin percent." },
      { label: "Monthly breakeven in drinks", math: "$12,000 ÷ $3.50 ≈ **3,429** drinks/mo", why: "Fixed costs ÷ CM. Round up — you can't break even on a fractional drink." },
      { label: "Convert to daily", math: "3,429 ÷ 30 ≈ **115 drinks/day**", why: "This is the number the owner will actually feel. 115 drinks in a 12-hour day = ~10/hour = ~1 every 6 min. Sanity-checkable." },
      { label: "What about profit?", math: "For each +100 drinks/day above breakeven: 100 × $3.50 × 30 = $10,500/mo profit", why: "Contribution margin scales linearly above breakeven. Shows the interviewer you understand operating leverage." }
    ],
    answer: "3,429 drinks/mo (~115/day) to break even; every +100/day = +$10.5K/mo profit.",
    sanityCheck: "Is 115 drinks/day realistic? A decent shop does 200–400 drinks/day. So this shop clears breakeven in a normal week and drops real money above that — worth expanding, unless the $12K fixed-cost number is light (it might be — real shops budget $18–25K/mo with rent in a primary market).",
    traps: [
      "Using gross margin % (70%) instead of CM dollars ($3.50). $12K / 0.70 = $17,143 in **revenue**, not drinks — that's a different answer to a different question.",
      "Forgetting to round up. 3,428.57 drinks/mo → 3,429, not 3,428.",
      "Assuming 365/12 = 30.4 days/mo and over-precising the daily number. Keep it at 30."
    ],
    variations: [
      { q: "Drinks raised to $6, VC unchanged?",  a: "CM = $4.50 → 12K/4.50 = 2,667/mo (~89/day). Price raises cut breakeven fast." },
      { q: "Fixed rent jumps to $18K/mo?",        a: "18K / 3.50 = 5,143/mo (~172/day). Now you need a busier shop." },
      { q: "Add $1K/mo marketing that lifts volume 20%?", a: "New fixed = $13K. Breakeven = 13K / 3.50 = 3,714/mo. Compare to prior 3,429 × 1.20 = 4,115. Marketing works." }
    ],
    vocabUsed: ["breakeven", "contribution margin", "fixed costs", "variable cost"],
    formulasUsed: ["Breakeven volume", "Contribution margin"]
  },

  // ---------- 04. Margin vs Markup: the classic trap ----------
  {
    id: "wx-margin-vs-markup",
    type: "Margin / Markup",
    title: "Margin vs markup — the trap",
    lede: "\"We buy at $60 and sell at $100. What's our margin?\" Half of candidates say 67%. That's markup, not margin. The interviewer will pounce — this is a favorite ding question.",
    framework: {
      picked: "Definitional — memorize both formulas",
      why: "There's no framework here, it's pure vocab. The fix is knowing the two definitions cold and checking which denominator the question wants."
    },
    assumptions: [
      { claim: "Cost = $60, Price = $100", why: "Given. Note the **profit per unit** is $40 in both formulas — only the denominator changes." },
      { claim: "No discounts, no channel fees", why: "If the question mentions \"retailer sells to distributor at a 20% cut\", that's a separate layer you'd net out first." }
    ],
    steps: [
      { label: "Gross margin (GM%)", math: "(Price − Cost) / **Price** = $40 / $100 = **40%**", why: "Margin asks: what fraction of the **price** is profit? Denominator is what the customer pays." },
      { label: "Markup", math: "(Price − Cost) / **Cost** = $40 / $60 = **66.7%**", why: "Markup asks: what fraction of the **cost** did we add on? Denominator is what you paid." },
      { label: "Why they're different", math: "Same numerator ($40), different denominator (price vs cost).", why: "Price > Cost, so margin (bigger denominator) < markup (smaller denominator). Always." },
      { label: "Convert between them", math: "Margin = Markup / (1 + Markup) · Markup = Margin / (1 − Margin)", why: "Handy when the interviewer gives you one and asks for the other. E.g., 50% markup → 50/(150) = 33.3% margin." }
    ],
    answer: "Gross margin = **40%**. Markup = **66.7%**. The $40 profit is the same — the denominator is different.",
    sanityCheck: "Markup is always bigger than margin for the same sale. If your markup answer is smaller than your margin, you've swapped the formulas.",
    traps: [
      "Saying \"margin is 67%\" because you divided by cost. This is the most common error in case interviews — it will ding you.",
      "Mixing the two mid-case: interviewer says \"50% markup\"; you compute as if it's a 50% margin. You'll misprice the product by 50%.",
      "Forgetting that retail uses margin, wholesale/import uses markup. Different industries talk about the same thing with different denominators."
    ],
    variations: [
      { q: "Cost $40, price $50. Margin? Markup?", a: "Margin = $10/$50 = 20%. Markup = $10/$40 = 25%." },
      { q: "30% margin, cost $70. Price?", a: "Price = Cost / (1 − margin) = $70 / 0.7 = $100. Verify: ($100 − $70)/$100 = 30%. ✓" },
      { q: "40% markup, price $140. Cost?", a: "Cost = Price / (1 + markup) = $140 / 1.40 = $100. Markup = $40/$100 = 40%. ✓" }
    ],
    vocabUsed: ["gross margin", "markup"],
    formulasUsed: ["Gross margin", "Markup"]
  },

  // ---------- 05. Profitability tree: why did profits fall? ----------
  {
    id: "wx-profit-decline",
    type: "Profit Decomposition",
    title: "Profits are down 20%. Why?",
    lede: "A CEO walks in: \"My profits are down 20% year over year. Figure out why.\" The interviewer wants you to **not panic and not guess**. They want a structured decomposition.",
    framework: {
      picked: "Profit = Revenue − Cost, decomposed into P × Q and F + V",
      why: "Profit tree is the most-used framework in profitability cases. It forces you to walk revenue (price × volume) and costs (fixed + variable) separately, so you find **where** the leak is before you diagnose **why**."
    },
    assumptions: [
      { claim: "Nothing else changed (tax rate, capital structure)", why: "Profit declines rarely come from tax unless there was a regime change. Confirm and set aside." },
      { claim: "Prior year is a clean base (no one-time gains)", why: "If last year had a one-time asset sale, this year's \"decline\" might be an illusion. Always ask." },
      { claim: "Market is the business's existing market (not new geos)", why: "New-market expansion is its own decomp; this one assumes like-for-like." }
    ],
    steps: [
      { label: "Write the tree", math: "Profit = (Price × Volume) − (Fixed + Variable/unit × Volume)", why: "Four levers: price, volume, fixed costs, variable cost per unit. Isolate which moved." },
      { label: "Ask: revenue side or cost side?", math: "Δ Revenue  vs  Δ Total Cost", why: "Narrow to one branch before going deeper. If revenue fell and costs held, you're looking at a pricing or demand issue." },
      { label: "Within revenue: price or volume?", math: "Δ (P × Q) = (P₁ × Q₁) − (P₀ × Q₀)", why: "Were units sold lower (customer loss, market shrink, competitor)? Or were realized prices lower (discounting, mix shift)?" },
      { label: "Within cost: fixed or variable?", math: "Δ Total Cost = Δ F + (V₁ × Q₁ − V₀ × Q₀)", why: "Fixed cost jumped? New lease, new HQ, scaled-up headcount? Variable cost per unit up? Input inflation, supply-chain cost, FX?" },
      { label: "Diagnose the root cause in the winning branch", math: "→ External (market, competitor, input prices) vs Internal (ops, pricing, mix)", why: "Once you've located the leak, the **why** is one of four categories: market, competitor, customer, company. This is the 4 C's — use them as your checklist." }
    ],
    answer: "You don't answer a profitability case with a single number — you answer it with the leak: e.g., \"Profit is down because volume fell 15% while fixed costs held flat. Volume fell because a new competitor entered with a 10% lower price, and we didn't match. Recommendation: targeted price match in overlap markets.\"",
    sanityCheck: "At each branch, quantify: if the CEO says \"revenue fell 10% and variable costs are stable as a %,\" that tells you the leak is on the top line. Force numbers out of the interviewer — \"What's the price change? The volume change?\" — and build the waterfall from there.",
    traps: [
      "Brainstorming causes before decomposing. If you jump to \"maybe a competitor entered\" before walking the tree, you'll miss the volume branch entirely.",
      "Combining price and volume into \"revenue fell\" without splitting — you can't fix what you haven't isolated.",
      "Ignoring fixed costs. A one-time ERP rollout or office expansion can crater profit even when revenue is flat."
    ],
    variations: [
      { q: "Revenue is flat but profit is down 20%.", a: "Must be a cost story. Split fixed vs variable. Fixed up → new investment; variable up → input inflation or mix shift to lower-margin products." },
      { q: "Profit is down but EBITDA is up.", a: "D&A or interest jumped. Ask about new capex (→ more depreciation) or new debt (→ more interest)." },
      { q: "Profit is down in one segment only.", a: "Decomp that segment with the same tree. Often mix shift or segment-specific competitor." }
    ],
    vocabUsed: ["profitability", "contribution margin", "fixed costs", "variable cost", "4 C's"],
    formulasUsed: ["Profit", "Gross margin"]
  },

  // ---------- 06. Framework application: market entry ----------
  {
    id: "wx-market-entry",
    type: "Framework Application",
    title: "Should our US retailer enter Canada?",
    lede: "A US-based specialty retailer is considering opening stores in Canada. The interviewer wants a structured framework, not a gut answer. This is the canonical market-entry case — it's tested 5+ times across major firms' casebooks.",
    framework: {
      picked: "Market attractiveness + company fit + entry mode",
      why: "Any entry case walks three legs: is the market worth entering (size, growth, competition)? can we win (capabilities, brand, cost structure)? and how should we enter (organic, JV, acquire, license)? Miss any leg and the interviewer drills there."
    },
    assumptions: [
      { claim: "\"Enter\" means physical stores (not e-commerce alone)", why: "Specialty retail is typically omnichannel — but the question is about footprint. Confirm with the interviewer before assuming the answer." },
      { claim: "Canadian consumer preferences ≈ US for this category", why: "Plausible for most specialty retail (apparel, housewares). Not true for food (palate differences) or finance. Flag and confirm." },
      { claim: "FX, tariffs, regulation are manageable, not blockers", why: "Set aside to focus on strategy first. If the interviewer later asks about margin erosion from FX, come back to this." }
    ],
    steps: [
      { label: "Sizing: is the market worth it?", math: "Canadian pop ≈ 40M · spend/capita × penetration × capture", why: "Rough math: if US spend/capita in this category is $200 and Canada's similar, that's $8B. Capture 3% over 5 yrs = $240M. Enough to matter for a $2B retailer. Not enough for a $20B retailer." },
      { label: "Competition: who's there?", math: "Porter 5 forces: incumbents, buyer power, supplier power, substitutes, new entrants", why: "If Canada already has a strong domestic player (think Canadian Tire for hardware, Tim Hortons for coffee), the game is a head-on fight. If it's fragmented mom-and-pops, you can roll them up." },
      { label: "Fit: do we have the right to win?", math: "Brand recognition · operating model · supply chain proximity · CAD/USD margin math", why: "Key question: does the US brand travel? Lululemon did. JCPenney didn't. Check Canadian search volume, store-location distance from existing supply-chain hubs, margin dilution at CAD pricing." },
      { label: "Entry mode: how do we go in?", math: "Greenfield · JV · Acquire existing player · Franchise · E-com first", why: "Greenfield: slow, costly, full control. Acquire: fastest, brings local knowledge but integration risk. JV: de-risks but dilutes. E-com first: cheapest test — prove demand before building stores." },
      { label: "Risks & mitigations", math: "FX hedging · Tariff exposure · Labor law (Quebec French-language requirements)", why: "A Canadian entry has 2 curveballs Americans miss: Quebec's language rules (Bill 96) and NAFTA/USMCA tariff lines. Naming either by name signals you've done your homework." }
    ],
    answer: "Recommendation depends on the numbers, but the structure is: **yes if** (a) market is $Xb+ and fragmented, (b) brand translates (proof: Canadian search volume, US border-shopper data), (c) we enter via e-com first to test demand before committing $50–200M to store footprint. **No if** a strong Canadian incumbent owns the category and our brand doesn't register north of the border.",
    sanityCheck: "Pressure-test your recommendation: would you stake your own money on it? If the answer is \"I dunno, depends on the data,\" force the interviewer to give you numbers and pick a side. Consultants don't hedge.",
    traps: [
      "Jumping to entry mode before sizing the market. If the market is $500M, entry mode doesn't matter.",
      "Ignoring the 'why now'. Canada was the right call in 2010 for many retailers; in 2024, e-com changes the calculus. Ask about timing.",
      "Forgetting cannibalization: Canadian stores near the border may cannibalize US border-crossers who currently drive south. Net it out."
    ],
    variations: [
      { q: "What if it's a Canadian firm entering the US?", a: "Flip the framework. US market is 9× bigger but 10× more competitive. Entry mode usually: e-com first or acquire a small US regional." },
      { q: "What if it's a food brand, not specialty retail?", a: "Palate/regulation differ more. Add: FDA vs Health Canada labeling, unit-economics per SKU, potential Quebec-specific SKUs." },
      { q: "Interviewer says market is $2B and growing 8%. Go.", a: "Attractive market. Pivot to fit + entry mode. Recommend acquire-small or JV to get to market in < 2 yrs; greenfield if brand is already strong in border markets." }
    ],
    vocabUsed: ["market entry", "Porter's 5 forces", "4 C's", "go / no-go"],
    formulasUsed: []
  }
];

/* =========================================================
   BRAIN TEASERS — market-sizing and Fermi estimation drills
   Numeric answer + generous tolerance; the real value is the
   reasoning walkthrough. Used by Learn mode 4 ("brain teasers")
   and exposed to the AI tutor via /api/content.
   ========================================================= */
const BRAIN_TEASERS = [
  {
    id: "bt-m1",
    cat: "market",
    prompt: "Estimate the annual US retail coffee-shop market ($B).",
    unit: "$B",
    answer: 47,
    tolPct: 35,
    walkthrough: [
      "US population ≈ 330M; adults ≈ 260M.",
      "~65% of adults drink coffee → ~170M coffee drinkers.",
      "Of those, ~45% regularly buy coffee out → ~75M shop buyers.",
      "Frequency: 4 cups/week × 50 weeks × avg $3.50 ≈ $700/yr.",
      "Total: 75M × $700 ≈ $52B → round to ~$50B."
    ],
    anchor: "Industry estimates put 2023 US coffee-shop revenue at ~$47B."
  },
  {
    id: "bt-m2",
    cat: "market",
    prompt: "How many new passenger vehicles are sold in the US per year (millions)?",
    unit: "M vehicles",
    answer: 15,
    tolPct: 30,
    walkthrough: [
      "US population ≈ 330M; households ≈ 125M.",
      "Avg cars/household ≈ 1.9 → ~235M cars on the road.",
      "Avg vehicle lifespan ≈ 12–15 years → replacement rate ≈ 1/13.",
      "New sales ≈ 235M / 13 ≈ 18M. Adjust ~15% down for used-only replacements.",
      "Estimate: ~15M new passenger vehicles sold per year."
    ],
    anchor: "Actual 2023 US new light-vehicle sales: ~15.5M."
  },
  {
    id: "bt-m3",
    cat: "market",
    prompt: "Size the US pet-food market ($B).",
    unit: "$B",
    answer: 55,
    tolPct: 30,
    walkthrough: [
      "US households ≈ 125M; ~65% own a pet → ~80M pet households.",
      "Avg pets/household ≈ 1.5 → ~120M pets (roughly half dogs, half cats).",
      "Annual food spend: ~$400/dog, ~$250/cat → blended ~$325/pet.",
      "Core food: 120M × $325 ≈ $39B.",
      "Add ~30% for premium, treats and specialty → ~$55B."
    ],
    anchor: "APPA 2023 US pet-food market: ~$58B."
  },
  {
    id: "bt-m4",
    cat: "market",
    prompt: "Annual revenue of an average US McDonald's location ($M)?",
    unit: "$M",
    answer: 3.6,
    tolPct: 30,
    walkthrough: [
      "Avg customers/day ≈ 1,500–2,000.",
      "Avg ticket: ~$9 (incl. drinks, combos).",
      "Daily revenue: 1,750 × $9 ≈ $15,750.",
      "Annualize: $15,750 × 365 ≈ $5.7M — too high for an average.",
      "Cut for slower days + rural locations → blended ~$3.5M average-unit volume."
    ],
    anchor: "McDonald's US AUV ≈ $3.5M (2022)."
  },
  {
    id: "bt-m5",
    cat: "market",
    prompt: "Size the US streaming-video market — consumer spend ($B).",
    unit: "$B",
    answer: 40,
    tolPct: 35,
    walkthrough: [
      "US households ≈ 125M.",
      "~85% subscribe to at least one streaming service → ~106M subscribing HHs.",
      "Avg services/HH ≈ 3.5 × avg price $10/mo ≈ $35/mo → $420/yr.",
      "Subtotal: 106M × $420 ≈ $44B.",
      "Haircut ~10% for free ad-tier mix → ~$40B."
    ],
    anchor: "2023 US SVOD+AVOD consumer revenue ≈ $40B."
  },
  {
    id: "bt-m6",
    cat: "market",
    prompt: "Size the US gym / fitness-membership market ($B).",
    unit: "$B",
    answer: 33,
    tolPct: 30,
    walkthrough: [
      "US adults ≈ 260M.",
      "~20% hold a gym membership → ~52M members.",
      "Avg monthly dues: ~$30 → $360/yr.",
      "Subscription revenue: 52M × $360 ≈ $18.7B.",
      "Add boutique/studio classes (~25% uplift) → ~$23B.",
      "Add personal training + ancillary (~$10B) → ~$33B."
    ],
    anchor: "IHRSA 2023 US health-club industry: ~$32B."
  },
  {
    id: "bt-m7",
    cat: "market",
    prompt: "How many cups of coffee does Starbucks sell in the US per day (millions)?",
    unit: "M cups",
    answer: 9,
    tolPct: 35,
    walkthrough: [
      "US Starbucks locations: ~16,000.",
      "Avg daily transactions/store: ~500.",
      "Cups per transaction: ~1.1 (some orders double-up).",
      "Daily cups: 16,000 × 500 × 1.1 ≈ 8.8M → ~9M."
    ],
    anchor: "Publicly disclosed ~9M US transactions/day — roughly cup parity."
  },
  {
    id: "bt-m8",
    cat: "market",
    prompt: "Annual US haircut spend — salons + barbers ($B).",
    unit: "$B",
    answer: 65,
    tolPct: 30,
    walkthrough: [
      "US adults ≈ 260M (≈ 130M men, 130M women).",
      "Women: 6 salon visits/yr × $65 avg (incl. color) = $390/yr × 130M ≈ $50.7B.",
      "Men: 9 barber visits/yr × $25 = $225/yr × 130M ≈ $29.3B.",
      "Kids (≈72M under 18): 4 cuts/yr × $20 = $80/yr × 72M ≈ $5.8B.",
      "Subtotal ~$85B — 20% haircut for at-home cuts → ~$65B."
    ],
    anchor: "IBISWorld US hair services ≈ $60B (2023)."
  },
  {
    id: "bt-m9",
    cat: "market",
    prompt: "Revenue of a single transatlantic 777 flight ($K)?",
    unit: "$K",
    answer: 280,
    tolPct: 35,
    walkthrough: [
      "777 capacity ≈ 300 seats; typical load factor 82% → 245 pax.",
      "Mix: 10 first @ $5,000 = $50K; 30 business @ $3,500 = $105K; 205 economy @ $700 = $143K.",
      "Passenger revenue ≈ $298K.",
      "Add cargo ($20–50K) → gross ~$330K.",
      "Net of taxes/fees → booked revenue ~$280K."
    ],
    anchor: "Rule of thumb: long-haul widebody grosses $250–400K per sector."
  },
  {
    id: "bt-g1",
    cat: "fermi",
    prompt: "How many piano tuners work in Chicago?",
    unit: "tuners",
    answer: 125,
    tolPct: 60,
    walkthrough: [
      "Chicago population ≈ 2.7M; households ≈ 1M.",
      "~1 in 50 households owns a piano → ~20,000 pianos.",
      "Add ~10% for schools, churches, venues → ~22,000 pianos.",
      "Avg piano tuned once a year.",
      "Tuner capacity: 4 tunings/day × 200 working days = 800 tunings/yr.",
      "Minimum: 22,000 / 800 ≈ 28 full-time tuners.",
      "Realistic with part-timers & overlap → ~100–150 active tuners."
    ],
    anchor: "Canonical Fermi answer: ~125 tuners (directory listings)."
  },
  {
    id: "bt-g2",
    cat: "fermi",
    prompt: "How many ping-pong balls fit inside a Boeing 747 (millions)?",
    unit: "M balls",
    answer: 22,
    tolPct: 45,
    walkthrough: [
      "747 cabin volume ≈ 31,000 ft³ ≈ 875 m³.",
      "Ping-pong ball volume (as cube, for packing): 40mm³ → 6.4×10⁻⁵ m³.",
      "Loose fill: 875 / 6.4e-5 ≈ 14M balls.",
      "Hexagonal packing adds ~40% density → ~20M.",
      "Add cargo hold (~5,000 ft³ → ~2M more) → ~22M total."
    ],
    anchor: "Canonical answer: ~22M ping-pong balls."
  },
  {
    id: "bt-g3",
    cat: "fermi",
    prompt: "How many barbershops operate in New York City?",
    unit: "shops",
    answer: 1800,
    tolPct: 40,
    walkthrough: [
      "NYC population ≈ 8.4M; ~50% male → 4.2M men.",
      "Men visit barbershop every 6 weeks → ~9 visits/yr → ~38M cuts/yr.",
      "Avg barber: 6 cuts/day × 250 working days ≈ 1,500 cuts/yr.",
      "Barbers needed: 38M / 1,500 ≈ 25,000.",
      "Avg shop: ~10 barbers → 2,500 shops.",
      "Discount ~30% (some cuts at salons/home) → ~1,800 barbershops."
    ],
    anchor: "NYC Census-of-Business: ~1,800 barbershops."
  },
  {
    id: "bt-g4",
    cat: "fermi",
    prompt: "Weight of a fully-loaded 72-passenger school bus (tons)?",
    unit: "tons",
    answer: 15,
    tolPct: 30,
    walkthrough: [
      "Empty Type-C school bus: ~12,000 lbs (6 tons).",
      "72 students × ~100 lbs avg (K–12 blend) = 7,200 lbs (3.6 tons).",
      "Driver + fuel + luggage: ~500 lbs (0.25 tons).",
      "Loaded: 6 + 3.6 + 0.25 ≈ 10 tons.",
      "Heavier Type-C/D buses reach ~15 tons fully loaded."
    ],
    anchor: "Type-C 72-pax loaded: ~30,000 lbs ≈ 15 tons."
  },
  {
    id: "bt-g5",
    cat: "fermi",
    prompt: "Annual US fluid-milk consumption (billion gallons)?",
    unit: "B gallons",
    answer: 5,
    tolPct: 30,
    walkthrough: [
      "US population ≈ 330M.",
      "Per-capita fluid milk ≈ 16 gallons/yr (declining trend).",
      "Total: 330M × 16 ≈ 5.3B gallons.",
      "(Add cheese/yogurt/butter in milk-weight equivalent → +35%, but excluded here.)"
    ],
    anchor: "USDA 2022 fluid milk: ~5.0B gallons."
  },
  {
    id: "bt-g6",
    cat: "fermi",
    prompt: "How many windows are on the Empire State Building?",
    unit: "windows",
    answer: 6500,
    tolPct: 30,
    walkthrough: [
      "102 floors; footprint ≈ 200 × 400 ft.",
      "Average ~60–65 windows/floor (fewer on setback upper floors).",
      "102 × 64 ≈ 6,500 windows."
    ],
    anchor: "Architectural spec: 6,514 windows."
  }
];
