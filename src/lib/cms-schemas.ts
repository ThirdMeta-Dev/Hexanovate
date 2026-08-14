import type { SectionSchema } from "./cms-types";

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  BannerSection: {
    defaultContent: {
      eyebrow: "Hero Section",
      headline: "The Future of Business Deserves a Better World. We're Building It.",
      subtext: "A connected business ecosystem built around your vision. Bringing together systems, growth engines, teams, and capabilities so you can focus on what you do best.",
      ctaPrimaryText: "Book a Demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryText: "B2B ThirdMeta",
      ctaSecondaryLink: "https://thirdmeta.in/",
      videoUrl: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/social_SEO_Continuation_from_previous_scene._On_the_RIGHT_side_of_th_275c5974-1f7e-49bb-9f8a-647eb3ffd219_0.mp4",
    },
    fields: [
      { key: "eyebrow", label: "Eyebrow Badge Text", type: "text" },
      { key: "headline", label: "Hero Headline", type: "textarea" },
      { key: "subtext", label: "Hero Sub-text", type: "textarea" },
      { key: "ctaPrimaryText", label: "Primary CTA Text", type: "text" },
      { key: "ctaPrimaryLink", label: "Primary CTA Link", type: "url" },
      { key: "ctaSecondaryText", label: "Secondary CTA Text", type: "text" },
      { key: "ctaSecondaryLink", label: "Secondary CTA Link", type: "url" },
      { key: "videoUrl", label: "Background Video", type: "video" },
    ],
  },

  FmcgSection: {
    defaultContent: {
      heading: "The Native Unit",
      subheading: "Scale That Converts. From Shelf to Cart.",
    },
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "text" },
    ],
    isCarousel: true,
    carouselLabel: "FMCG Client Portfolios",
    defaultItems: [
      { clientName: "Ajmal", metric1Value: "18X", metric1Label: "ROAS", metric2Value: "388k", metric2Label: "Website clicks" },
      { clientName: "ABK Grooming", metric1Value: "22 Lacs+", metric1Label: "Sales in 3 months", metric2Value: "30%", metric2Label: "Returning customer rate" },
      { clientName: "Mrs. Foodrite", metric1Value: "400k", metric1Label: "Content Views in 1 month", metric2Value: "101%", metric2Label: "Audience growth" },
      { clientName: "Warana", metric1Value: "200%+", metric1Label: "Content interactions in 3 months", metric2Value: "233%+", metric2Label: "Profile visits" },
      { clientName: "Indovill", metric1Value: "5.5X", metric1Label: "ROAS in 4 months", metric2Value: "1.1M", metric2Label: "Revenue Generated" },
    ],
    itemFields: [
      { key: "clientName", label: "Client Name", type: "text" },
      { key: "metric1Value", label: "Metric 1 Value", type: "text" },
      { key: "metric1Label", label: "Metric 1 Label", type: "text" },
      { key: "metric2Value", label: "Metric 2 Value", type: "text" },
      { key: "metric2Label", label: "Metric 2 Label", type: "text" },
    ],
  },

  B2bSection: {
    defaultContent: {
      heading: "ThirdMeta",
      subheading: "B2B Pipeline That Converts. Account-based marketing that drives enterprise revenue.",
      ctaText: "Explore ThirdMeta",
      ctaLink: "https://thirdmeta.in/",
    },
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Button Link", type: "url" },
    ],
    isCarousel: true,
    carouselLabel: "B2B Portfolio Cases",
    defaultItems: [
      { number: "01", title: "KlearStack – 5x Inbound Leads", description: "Scaled organic traffic and AI search visibility by 5x, driving 3x growth in MQLs and lifting conversion rate from 1% to 3% through SEO-led demand generation.", imageUrl: "" },
      { number: "02", title: "eFax – 3X Signup Growth", description: "Redesigned the signup funnel to achieve 3X new signups with 50% lower drop-off rates, optimising the user journey for stronger retention and funnel conversion.", imageUrl: "" },
      { number: "03", title: "Senses – Scaling Organic Visibility", description: "Delivered 5X organic traffic growth, 50+ product keyword rankings, and 750+ keywords in AIO & SERP features via strategic SEO & keyword-growth campaigns.", imageUrl: "" },
      { number: "04", title: "Truein – 5.4x High-Intent Conversions", description: "Achieved 5.4x increase in high-intent conversions within 60 days, doubling user engagement, boosting scroll depth by 30%, and tripling CTA click-through rates.", imageUrl: "" },
    ],
    itemFields: [
      { key: "number", label: "Card Number", type: "text" },
      { key: "title", label: "Case Title", type: "text" },
      { key: "description", label: "Result Description", type: "textarea" },
      { key: "imageUrl", label: "Portfolio Image", type: "image" },
    ],
  },

  EducationSection: {
    defaultContent: {
      heading: "EduHexa",
      subheading: "Smart Classroom Consulting. Education growth solutions for institutions.",
      ctaText: "Explore EduHexa",
      ctaLink: "https://eduhexa.in/",
    },
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Button Link", type: "url" },
    ],
    isCarousel: true,
    carouselLabel: "Education Portfolio Cases",
    defaultItems: [
      { num: "01", title: "ELMO – 3X Revenue Growth", desc: "Achieved 3X revenue growth with deeper website engagement — boosting scroll depth by 50% and higher on-site interactions through a full-funnel content and UX strategy.", imageUrl: "" },
      { num: "02", title: "cybernetyx – 12.9x Qualified Leads", desc: "Scaled qualified leads from 120 to 1,548 — a 12.9x increase — while delivering 21.7x ROI and generating 1,992 ad leads through precision-targeted demand generation campaigns.", imageUrl: "" },
      { num: "03", title: "EyRIS – 10X Lead Volume Growth", desc: "Lowered cost per lead by 2X while driving 10X growth in lead volume and doubling qualified demo requests through optimised paid media and conversion-rate improvements.", imageUrl: "" },
      { num: "04", title: "EduHexa – 4.2x Engagement Growth", desc: "Built a cohesive digital learning ecosystem for EduHexa, achieving 4.2x engagement growth and 60K new enrollments through a refined student acquisition funnel.", imageUrl: "" },
      { num: "05", title: "Future Skills Funnel – 52% CPL Reduction", desc: "Redesigned the full digital funnel for a global skills training platform — from paid demand gen to landing pages — cutting cost-per-lead by 52% while scaling reach.", imageUrl: "" },
    ],
    itemFields: [
      { key: "num", label: "Number", type: "text" },
      { key: "title", label: "Case Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "imageUrl", label: "Portfolio Image", type: "image" },
    ],
  },

  WhatDefinesUsSection: {
    defaultContent: {
      heading: "What Defines Us",
      videoUrl: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/social_SEO_cinematic_inspirational_mountain_scene_during_sunrise_the_3b26e672-23ad-48f4-91df-447957cfc7bd_0.mp4",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "videoUrl", label: "Background Video", type: "video" },
    ],
    isCarousel: true,
    carouselLabel: "Defining Principles",
    defaultItems: [
      { title: "Systems Run It. Humans Own It.", desc: "Behind every framework is a person who treats your outcome as their own problem." },
      { title: "The Rules Are Yours.", desc: "We do not fit you into a model. We build the model entirely around you." },
      { title: "The Long Game Is The Only Game.", desc: "We measure success in years, not campaigns. That changes every decision we make." },
    ],
    itemFields: [
      { key: "title", label: "Principle Title", type: "text" },
      { key: "desc", label: "Principle Description", type: "textarea" },
    ],
  },

  LogoMarqueeSection: {
    defaultContent: { heading: "Trusted by leading brands" },
    fields: [
      { key: "heading", label: "Section Label", type: "text" },
    ],
    isCarousel: true,
    carouselLabel: "Client Logos",
    defaultItems: [],
    itemFields: [
      { key: "name", label: "Brand Name", type: "text" },
      { key: "imageUrl", label: "Logo Image URL", type: "image" },
    ],
  },

  WhyWeStartedSection: {
    defaultContent: {
      heading: "Why We Started",
      videoUrl: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/I-DID-NOT-LISTEN-founder-founderlife-agencyowner-personalbrand-femalefounders.mp4",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "videoUrl", label: "Founder Video", type: "video" },
    ],
  },

  SolutionsSection: {
    defaultContent: {
      heading: "Our Solutions",
      videoFmcg: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/FMCG.mp4",
      videoNative: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/B2B.mp4",
      videoEdu: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/Education.mp4",
    },
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
      { key: "videoFmcg", label: "B2B / ThirdMeta Card Video", type: "video" },
      { key: "videoNative", label: "FMCG / NativeUnit Card Video", type: "video" },
      { key: "videoEdu", label: "EdTech / EduHexa Card Video", type: "video" },
    ],
  },

  WhyChooseUsSection: {
    defaultContent: {
      heading: "Why Choose ThirdMeta",
      subheading: "We don't just execute. We own the number.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "text" },
    ],
    isCarousel: true,
    carouselLabel: "Reasons / Cards",
    defaultItems: [],
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  TeamCultureSection: {
    defaultContent: {
      heading: "Team & Culture",
      subheading: "Outcome-obsessed thinkers. Zero gaps. Zero guesswork.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Team Members",
    defaultItems: [],
    itemFields: [
      { key: "imageUrl", label: "Photo", type: "image" },
      { key: "label", label: "Name", type: "text" },
      { key: "desc1", label: "Title / Role", type: "text" },
      { key: "desc2", label: "Description", type: "text" },
    ],
  },

  TestimonialSection: {
    defaultContent: { heading: "What Our Clients Say" },
    fields: [
      { key: "heading", label: "Section Heading", type: "text" },
    ],
    isCarousel: true,
    carouselLabel: "Testimonials",
    defaultItems: [
      { quote: "ThirdMeta redefined how we approach revenue growth. The Native Unit's data-driven FMCG strategy fixed our funnel leaks and compounded results month over month without extra spend.", name: "Mr Vikram Mehta", role: "Supply Chain Head", metric1Value: "98%", metric1Label: "On-time delivery rate achieved", metric2Value: "123+", metric2Label: "Markets successfully activated" },
      { quote: "ThirdMeta transformed our brand visibility entirely. Their FMCG marketing expertise brought measurable growth across all channels and target demographics.", name: "Ms Priya Sharma", role: "Marketing Director", metric1Value: "87%", metric1Label: "Customer retention rate improved", metric2Value: "245+", metric2Label: "Campaigns successfully launched" },
      { quote: "Our B2B pipeline tripled in just six months. ThirdMeta's account-based marketing approach exceeded all of our revenue and lead generation targets.", name: "Mr Rahul Kapoor", role: "VP Sales, TechCorp", metric1Value: "312%", metric1Label: "ROI on marketing investment", metric2Value: "89+", metric2Label: "Enterprise clients acquired" },
    ],
    itemFields: [
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Client Name", type: "text" },
      { key: "role", label: "Client Role / Company", type: "text" },
      { key: "metric1Value", label: "Metric 1 Value", type: "text" },
      { key: "metric1Label", label: "Metric 1 Label", type: "text" },
      { key: "metric2Value", label: "Metric 2 Value", type: "text" },
      { key: "metric2Label", label: "Metric 2 Label", type: "text" },
    ],
  },

  LeadershipTestimonialSection: {
    defaultContent: { heading: "Why Clients Trust Us" },
    fields: [{ key: "heading", label: "Section Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Testimonials",
    defaultItems: [
      { quote: "ThirdMeta redefined how we approach revenue growth.", name: "Mr Vikram Mehta", role: "Supply Chain Head" },
    ],
    itemFields: [
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Client Name", type: "text" },
      { key: "role", label: "Client Role", type: "text" },
    ],
  },

  ValuesApproachSection: {
    defaultContent: { heading: "Values & Approach" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Values",
    defaultItems: [],
    itemFields: [
      { key: "title", label: "Value Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  AwardsLogoWallSection: {
    defaultContent: { heading: "Awards & Recognition" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Award Logos",
    defaultItems: [],
    itemFields: [
      { key: "name", label: "Award Name", type: "text" },
      { key: "imageUrl", label: "Logo Image URL", type: "image" },
    ],
  },

  ResourcesSection: {
    defaultContent: { heading: "Resources" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Resource Cards",
    defaultItems: [],
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "ctaText", label: "CTA Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
  },

  TestimonialsHeaderSection: {
    defaultContent: {
      heading: "We Build Growth Systems for Predictable Outcomes",
      ctaText: "Book A Call",
      ctaLink: "/schedule-demo",
      videoUrl: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/CTA-Background-video.mp4",
      cta1Text: "B2B ThirdMeta",
      cta1Link: "https://thirdmeta.in/",
      cta2Text: "FMCG NativeUnit",
      cta2Link: "https://thenativeunit.com/",
    },
    fields: [
      { key: "heading", label: "Main Heading", type: "textarea" },
      { key: "ctaText", label: "CTA Button Text (default variant)", type: "text" },
      { key: "ctaLink", label: "CTA Button Link (default variant)", type: "url" },
      { key: "videoUrl", label: "Background Video", type: "video" },
      { key: "cta1Text", label: "Contact CTA 1 Text", type: "text" },
      { key: "cta1Link", label: "Contact CTA 1 Link", type: "url" },
      { key: "cta2Text", label: "Contact CTA 2 Text", type: "text" },
      { key: "cta2Link", label: "Contact CTA 2 Link", type: "url" },
    ],
  },

  FaqSection: {
    defaultContent: { heading: "Frequently Asked Questions" },
    fields: [{ key: "heading", label: "Section Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "FAQ Items",
    defaultItems: [
      { question: "Is ThirdMeta an agency?", answer: "No. ThirdMeta is a connected growth ecosystem. Think of us as the infrastructure your business needs to scale. We house specialized brands for B2B, The Native Unit (FMCG), and EduHexa (Education), all working under one unified vision." },
      { question: "What industries do you typically work with?", answer: "We work across B2B SaaS, FMCG, D2C, and enterprise brands. Our specialized brands adapt to your industry's specific GTM motions and compliance requirements." },
      { question: "How long before we see results?", answer: "Most clients see measurable pipeline impact within 60–90 days. Full integration with our ecosystem typically reaches peak velocity by month 4–6." },
      { question: "Do you work with early-stage startups?", answer: "We partner with growth-stage and scale-up companies that have product-market fit. If you're pre-revenue, our advisory retainer may be a better starting point." },
      { question: "We're an established FMCG brand — are we too traditional to work with you?", answer: "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow." },
      { question: "We already have multiple agencies. How does that affect fit?", answer: "We integrate with your existing agency stack. Our role is orchestration and accountability — ensuring all partners move toward the same north-star metric." },
      { question: "What does pricing look like?", answer: "We work on retainer and performance models depending on the engagement scope. Book a strategy call to discuss what makes sense for your stage and goals." },
    ],
    itemFields: [
      { key: "question", label: "Question", type: "text" },
      { key: "answer", label: "Answer", type: "textarea" },
    ],
  },

  DemoFormSection: {
    defaultContent: {
      heading: "Get in Touch",
      subheading: "Tell us about your business and we'll respond within 48 hours.",
    },
    fields: [
      { key: "heading", label: "Form Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
  },

  BookStrategyCallSection: {
    defaultContent: {
      heading: "Book a Free Strategy Call",
      subheading: "Get a tailored 90-day growth roadmap in 30 minutes. No pitch, no pressure.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
  },

  TagsCarouselSection: {
    defaultContent: {},
    fields: [],
    isCarousel: true,
    carouselLabel: "Tag Items (Row 1 & Row 2)",
    defaultItems: [
      { label: "B2B Pipeline That Converts", row: "1" },
      { label: "Consumer Brands That Scale", row: "1" },
      { label: "Smart Classroom Consulting", row: "1" },
      { label: "Inbound Lead Generation", row: "1" },
      { label: "Revenue Growth Systems", row: "1" },
      { label: "Not an Agency. A System.", row: "1" },
      { label: "The Planetary Growth Ecosystem", row: "1" },
      { label: "Outcome Obsessed. Always.", row: "1" },
      { label: "One Partner. Every Function.", row: "1" },
      { label: "Built Around You. Not For You.", row: "1" },
      { label: "Effort vs Outcome. We Pick Outcome.", row: "2" },
      { label: "Data Over Instincts. Every Time.", row: "2" },
      { label: "Humans Behind Every System", row: "2" },
      { label: "Long Game Thinkers", row: "2" },
      { label: "Creativity Meets Technology", row: "2" },
      { label: "Zero Gaps. Zero Guesswork.", row: "2" },
      { label: "Growth That Compounds", row: "2" },
      { label: "We Own The Number", row: "2" },
      { label: "Your Vision. Our Obsession.", row: "2" },
      { label: "Predictable. Measurable. Permanent.", row: "2" },
    ],
    itemFields: [
      { key: "label", label: "Tag Label", type: "text" },
      { key: "row", label: "Row (1 or 2)", type: "text" },
    ],
  },

  FooterSection: {
    defaultContent: {
      linkedinUrl: "https://www.linkedin.com/company/hexanovate/",
      twitterUrl: "https://x.com/hexanovate",
      instagramUrl: "https://www.instagram.com/hexanovate/",
      behanceUrl: "https://www.behance.net/urvimandge",
      sol1Label: "TheNativeUnit", sol1Link: "https://thenativeunit.com/",
      sol2Label: "EduHexa", sol2Link: "https://eduhexa.in/",
      sol3Label: "ThirdMeta", sol3Link: "https://thirdmeta.in/",
      copy: "© 2026 ThirdMeta. All rights reserved.",
    },
    fields: [
      { key: "linkedinUrl", label: "LinkedIn URL", type: "url" },
      { key: "twitterUrl", label: "Twitter/X URL", type: "url" },
      { key: "instagramUrl", label: "Instagram URL", type: "url" },
      { key: "behanceUrl", label: "Behance URL", type: "url" },
      { key: "sol1Label", label: "Solution 1 Label", type: "text" },
      { key: "sol1Link", label: "Solution 1 Link", type: "url" },
      { key: "sol2Label", label: "Solution 2 Label", type: "text" },
      { key: "sol2Link", label: "Solution 2 Link", type: "url" },
      { key: "sol3Label", label: "Solution 3 Label", type: "text" },
      { key: "sol3Link", label: "Solution 3 Link", type: "url" },
      { key: "copy", label: "Copyright Text", type: "text" },
    ],
  },

  ContactInfoSection: {
    defaultContent: {
      address: "ThirdMeta HQ, Mumbai, India",
      email: "seo@hexanovate.com",
      phone: "+91 00000 00000",
      mapEmbedUrl: "",
    },
    fields: [
      { key: "address", label: "Office Address", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "mapEmbedUrl", label: "Google Maps Embed URL", type: "url" },
    ],
  },

  AboutIntroSection: {
    defaultContent: {
      heading: "About ThirdMeta",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
    ],
    isCarousel: true,
    carouselLabel: "Stats Counter",
    defaultItems: [
      { value: "94", suffix: "%", label: "Clients stayed beyond two years." },
      { value: "120", suffix: "+", label: "Businesses grew inside the ecosystem." },
      { value: "200", suffix: "Cr+", label: "Revenue influenced across clients." },
    ],
    itemFields: [
      { key: "value", label: "Stat Number", type: "text" },
      { key: "suffix", label: "Suffix (%, +, Cr+)", type: "text" },
      { key: "label", label: "Stat Label", type: "text" },
    ],
  },

  AboutMissionVisionSection: {
    defaultContent: {
      missionHeading: "Our Mission",
      missionText: "To build the most outcome-driven growth ecosystem for B2B, FMCG, and Education businesses.",
      visionHeading: "Our Vision",
      visionText: "A world where every business has access to institutional-grade growth infrastructure.",
    },
    fields: [
      { key: "missionHeading", label: "Mission Heading", type: "text" },
      { key: "missionText", label: "Mission Text", type: "textarea" },
      { key: "visionHeading", label: "Vision Heading", type: "text" },
      { key: "visionText", label: "Vision Text", type: "textarea" },
    ],
  },

  AboutEcosystemSection: {
    defaultContent: {
      heading: "The ThirdMeta Ecosystem",
      subheading: "Three specialized brands. One unified vision.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Ecosystem Items (Left 1-3, Right 4-6)",
    defaultItems: [
      { title: "Everything Talks To Everything", body: "No siloed strategies. Every function, signal and system connects so nothing compounds in isolation." },
      { title: "Human Wit. Machine Scale.", body: "Human intelligence sets the direction. AI and automation handle the volume. Neither works without the other." },
      { title: "Strategy That Actually Executes", body: "A plan without ownership is just a document. We stay until the strategy shows up in the number." },
      { title: "We Own The Outcome", body: "Not the tasks. Not the deliverables. The actual result. That shift changes every decision we make." },
      { title: "Agility Is Non-Negotiable", body: "Markets move fast. We move faster. Experiments, pivots and decisions happen at the speed of opportunity." },
      { title: "Your World. Our Blueprint.", body: "We do not fit you into a template. We build the entire system around how your business actually works." },
    ],
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },

  AboutEcosystemAccordionSection: {
    defaultContent: { heading: "How the Ecosystem Works" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Accordion Items",
    defaultItems: [],
    itemFields: [
      { key: "title", label: "Item Title", type: "text" },
      { key: "content", label: "Item Content", type: "textarea" },
    ],
  },

  LeadershipHeroSection: {
    defaultContent: {
      heading: "Leadership & Team",
      subheading: "Outcome-obsessed thinkers driving real results.",
    },
    fields: [
      { key: "heading", label: "Hero Heading", type: "textarea" },
      { key: "subheading", label: "Sub-heading", type: "text" },
    ],
  },

  LeadershipWhyChooseUsSection: {
    defaultContent: {
      heading: "Why Choose ThirdMeta",
      subheading: "We are built differently.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Reason Cards",
    defaultItems: [],
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  LeadershipGrowthSystemsSection: {
    defaultContent: {
      heading: "We Build Growth Systems for Predictable Outcomes",
      cta1Text: "B2B ThirdMeta",
      cta1Link: "https://thirdmeta.in/",
      cta2Text: "FMCG/D2C",
      cta2Link: "https://thenativeunit.com/",
    },
    fields: [
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "cta1Text", label: "CTA 1 Button Text", type: "text" },
      { key: "cta1Link", label: "CTA 1 Button Link", type: "url" },
      { key: "cta2Text", label: "CTA 2 Button Text", type: "text" },
      { key: "cta2Link", label: "CTA 2 Button Link", type: "url" },
    ],
  },

  AboutContactSection: {
    defaultContent: {
      heading: "Get in Touch",
      subheading: "Tell us about your business and we'll respond within 48 hours.",
    },
    fields: [
      { key: "heading", label: "Form Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
  },

  ThankYouBanner: {
    defaultContent: {
      heading: "We Have Got Your Ambition. Now It Is Officially Ours Too.",
    },
    fields: [
      { key: "heading", label: "Headline Text", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Next Steps",
    defaultItems: [
      { num: "1", title: "Bring The Problem", desc: "Walk us through what is not working and why. The more honest you are, the more useful this call becomes." },
      { num: "2", title: "We Solve It Live", desc: "No follow-up deck required. We think through a solution on the call and share it with you then and there." },
      { num: "3", title: "Your Call. Literally.", desc: "If it feels right, we start. If it does not, you leave with a free growth roadmap. Either way you win." },
    ],
    itemFields: [
      { key: "num", label: "Step Number", type: "text" },
      { key: "title", label: "Step Title", type: "text" },
      { key: "desc", label: "Step Description", type: "textarea" },
    ],
  },

  AboutB2BPortfolioSection: {
    defaultContent: {
      heading: "B2B Portfolio",
      subheading: "Enterprise clients we've driven revenue for.",
    },
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Sub-heading", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Portfolio Slides",
    defaultItems: [],
    itemFields: [
      { key: "problem", label: "Problem", type: "textarea" },
      { key: "solution", label: "Solution / Impact", type: "textarea" },
      { key: "brandLogoUrl", label: "Brand Logo URL", type: "image" },
      { key: "brandAlt", label: "Brand Name / Alt", type: "text" },
      { key: "personName", label: "Person Name", type: "text" },
      { key: "personRole", label: "Person Role", type: "text" },
      { key: "quote", label: "Testimonial Quote", type: "textarea" },
      { key: "avatarUrl", label: "Avatar URL", type: "image" },
      { key: "testimonialName", label: "Testimonial Name", type: "text" },
      { key: "testimonialRole", label: "Testimonial Role", type: "text" },
      { key: "stat1Value", label: "Stat 1 Value", type: "text" },
      { key: "stat1Suffix", label: "Stat 1 Suffix", type: "text" },
      { key: "stat1Desc", label: "Stat 1 Description", type: "text" },
      { key: "stat2Value", label: "Stat 2 Value", type: "text" },
      { key: "stat2Suffix", label: "Stat 2 Suffix", type: "text" },
      { key: "stat2Desc", label: "Stat 2 Description", type: "text" },
    ],
  },

  AboutJourneySection: {
    defaultContent: { heading: "Our Journey" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Journey Milestones",
    defaultItems: [
      { date: "Sept 2020", label: "The Beginning", title: "Two Products. One Big Dream.", detail: "Built Vegigo, a hyperlocal ecommerce platform. Built an all-in-one restaurant management solution. Building was our profession. Zero marketing knowledge. Maximum optimism." },
      { date: "Dec 2021", label: "The Hard Truth", title: "Great Product. Terrible Growth. Classic Failure.", detail: "Went to market with 2 products. Got ignored. Hired agencies. Got reports, decks, and invoices. Numbers never moved. Finance shook. Started learning marketing from scratch, out of necessity." },
      { date: "June 2022", label: "The Gap Found", title: "Effort vs Outcome. Nobody Was Talking About This.", detail: "Tasks were completed. Budgets were spent. Results did not show up. Named the real problem: nobody owned the outcome. That one insight became the founding principle of ThirdMeta." },
      { date: "Dec 2022 – Dec 2023", label: "Proof Found", title: "What Worked For Us, Worked For Them Too.", detail: "Onboarded clients. Applied everything learned the hard way. Worked with 40+ businesses across 12 domains. Became the primary growth driver for several of them. Combined revenue influenced: INR 12Cr+ across active partnerships." },
      { date: "May – Nov 2024", label: "Going Deep", title: "Twelve Domains Was Ambition. Three Is Mastery.", detail: "Niched down to 3 domains with proven, significant impact. Sept 2024: ThirdMeta launched for B2B businesses. Nov 2024: NativeUnit launched for D2C and FMCG brands. Client retention after niching down: 91%" },
      { date: "April 2025", label: "New Category", title: "Ed-Tech Needed This. We Built It.", detail: "EduHexa launched as India's first independent AI Smart Classroom consultancy. Not a reseller. Not an agency. A neutral expert. 35+ institutions audited within the first 6 months of launch." },
      { date: "Oct 2025 – April 2026", label: "Full Ownership", title: "Marketing And Sales. Owned End To End.", detail: "Expanded into complete sales ownership for select partner businesses. 30+ active partnerships across all 3 verticals right now. 140+ businesses impacted since day one. INR 50Cr+ in revenue influenced across all client businesses." },
    ],
    itemFields: [
      { key: "date", label: "Date / Period", type: "text" },
      { key: "label", label: "Milestone Label", type: "text" },
      { key: "title", label: "Milestone Title", type: "text" },
      { key: "detail", label: "Detail Text", type: "textarea" },
    ],
  },

  LeadershipGallerySection: {
    defaultContent: { heading: "Our People" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Gallery Images",
    defaultItems: [],
    itemFields: [
      { key: "imageUrl", label: "Image URL", type: "image" },
      { key: "alt", label: "Alt Text", type: "text" },
    ],
  },

  ResourcesSection: {
    defaultContent: { heading: "Resources" },
    fields: [{ key: "heading", label: "Heading", type: "text" }],
    isCarousel: true,
    carouselLabel: "Resource Cards",
    defaultItems: [
      { imageUrl: "", date: "February 23, 2026", readTime: "06 Mins read", title: "Organic vs Paid Marketing: What B2B Companies Need to Know in 2025", ctaLink: "https://thirdmeta.in/blog/organic-vs-paid-marketing" },
      { imageUrl: "", date: "February 14, 2026", readTime: "06 Mins read", title: "SaaS SEO Strategy 2026: How to Drive Qualified Demos and Revenue Growth", ctaLink: "https://thirdmeta.in/blog/saas-seo-strategy-qualified-demos-revenue-growth" },
    ],
    itemFields: [
      { key: "imageUrl", label: "Card Image", type: "image" },
      { key: "date", label: "Publish Date", type: "text" },
      { key: "readTime", label: "Read Time", type: "text" },
      { key: "title", label: "Article Title", type: "text" },
      { key: "ctaLink", label: "Article Link", type: "url" },
    ],
  },

  GlobalHeader: {
    defaultContent: {
      ctaText: "Book a Demo",
      ctaLink: "/schedule-demo",
    },
    fields: [
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Button Link", type: "url" },
    ],
  },
};
