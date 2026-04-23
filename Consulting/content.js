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
     PRACTICE PACK — 15 supplemental cases
     Not from the Darden casebook. Original cases written in the same
     style, covering industries and types complementary to the Darden
     15. Several include exhibits (tables, bar charts, line charts)
     that you'd ask the interviewer for in a real case.
     ========================================================= */

  {
    id: 28,
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
    id: 29,
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
    id: 30,
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
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
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
    id: 36,
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
    id: 37,
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
    id: 38,
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
    id: 39,
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
    id: 40,
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
    id: 41,
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
    id: 42,
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
