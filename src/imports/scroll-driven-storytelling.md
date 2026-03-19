Create a premium scroll-driven storytelling interaction system across the entire page inspired by the motion design patterns used on Apple, Stripe, Linear, and award-winning SaaS websites.

The page should feel like a cinematic narrative where each section transitions smoothly into the next while guiding user attention through typography, motion, and layered depth.

The animation system should be consistent across the entire page and should work seamlessly with the scroll-based title reveal effect applied to all page titles and subtitles.

Global Animation Philosophy

The page should behave like a continuous story rather than separate sections.

Scrolling should:

• reveal information progressively
• guide the user’s attention
• build visual rhythm
• emphasize key messaging

Avoid abrupt animations. Motion should feel fluid, smooth, and intentional.

Every section should transition naturally into the next through motion continuity, subtle parallax, and progressive reveals.

Global Motion System

Use a unified animation system for the entire page.

Core animation properties:

Opacity transition

0 → 1

Vertical motion

translateY: 24px → 0px

Scale motion

scale: 0.96 → 1

Parallax background motion

translateY relative to scroll speed (0.3x)

Animation easing

cubic-bezier(0.22, 1, 0.36, 1)

Animation duration

600–900ms equivalent scroll distance

Scroll interaction type

scroll-linked (scrub enabled)
Section Entry Behavior

When a new section enters the viewport:

Section background softly fades into view.

Title and subtitle reveal using the progressive text reveal system.

Content elements appear sequentially with staggered motion.

Sequence example:

Title reveal
↓
Subtitle reveal
↓
Primary visual element
↓
Supporting UI cards or text blocks

Stagger delay

80–120ms
Title and Subtitle System (Core Storytelling Element)

Every section title should use a scroll-linked progressive reveal.

Initial state:

Opacity

0.3

Vertical position

translateY: 16px

As scroll progresses:

Opacity

0.3 → 1

Translate

16px → 0px

Color

muted → full contrast

Long titles should reveal line-by-line as scroll progresses.

Section Transition Effects

Sections should not simply appear.

Use transition choreography to connect them.

When leaving a section:

• previous section fades upward
• background transitions subtly
• next section fades into place

Example transition flow:

Section A content

opacity: 1 → 0.6
translateY: 0 → -30px

Section B content

opacity: 0 → 1
translateY: 30px → 0

This creates a continuous scroll narrative.

Parallax Depth System

Introduce subtle depth layers.

Each section can include:

• foreground content layer
• background visual layer
• decorative gradient or pattern layer

Background layers move slower during scroll.

Example motion:

Foreground

scroll speed: 1x

Background

scroll speed: 0.3x

Decorative graphics

scroll speed: 0.5x

This creates visual depth similar to Apple product pages.

Visual Element Reveal Animations

Images, product visuals, or feature illustrations should animate with soft zoom and fade effects.

Initial state

opacity: 0
scale: 0.95
translateY: 30px

Final state

opacity: 1
scale: 1
translateY: 0

Animation begins when element reaches:

70% viewport height
Feature Cards Animation

Feature cards should animate in staggered sequence.

Animation flow:

Card 1 appears
↓
Card 2 appears
↓
Card 3 appears

Animation properties:

opacity: 0 → 1
translateY: 24px → 0
scale: 0.98 → 1

Hover interaction:

scale: 1 → 1.04
shadow elevation increase
Sticky Scroll Story Sections (Advanced)

Some sections should pin to the viewport briefly to create a storytelling moment.

While pinned:

• visuals change
• content updates
• steps reveal progressively

Example use cases:

• product workflow explanation
• feature breakdown
• data visualization sequence

Pin duration

120–160% viewport height
Animated Data or Metrics

For statistics sections:

Numbers animate upward.

Example:

0 → 98%
0 → 3x faster
0 → 200M records processed

Animation timing:

800ms equivalent scroll distance
CTA Reveal System

Important call-to-action sections should feel dramatic and intentional.

CTA block animation:

Background gradient expands
↓
Title fades in
↓
CTA button scales into place

Button hover effect:

scale: 1 → 1.05
shadow glow
Micro-Interactions

Add subtle micro-interactions for polish.

Buttons

scale: 1 → 1.04
background shift

Links

underline reveal animation

Cards

shadow elevation increase

Icons

slight rotation or glow on hover
Reading Progress Indicator

Add a scroll progress bar at the top of the page.

Progress width should represent:

scroll position / page height

Color should match the brand accent color.

Mobile Adaptation

Mobile animations must remain smooth.

Adjustments:

Reduce translation distance

24px → 12px

Reduce parallax intensity

0.3x → 0.15x

Avoid pinned sections longer than:

100vh

Maintain readable text without requiring heavy scroll.

Accessibility Rules

Ensure animations do not hinder readability.

Rules:

• Text must remain readable before animation completes
• Avoid opacity below 0.3
• Respect prefers-reduced-motion settings

Final Instruction for Figma Make

Generate a scroll-driven storytelling interaction system where:

• titles reveal progressively with scroll
• sections transition fluidly into each other
• images and UI components animate with subtle depth
• content appears sequentially with staggered timing
• parallax motion adds visual richness
• CTAs and key visuals receive emphasis