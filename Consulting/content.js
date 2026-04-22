/* =========================================================
   darden.lab — consulting / case-interview study data
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
  }
];
