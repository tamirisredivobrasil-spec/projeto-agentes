---
title: Analyze Content Patterns
description: Extract strategic patterns and insights from raw profile content
process_steps:
  - step_1: "Review raw content systematically"
  - step_2: "Extract posting patterns and frequency"
  - step_3: "Identify hooks and mental triggers"
  - step_4: "Analyze visual design identity"
  - step_5: "Determine positioning and tone"
  - step_6: "Infer overall strategy and goals"
output_format: "Comprehensive pattern analysis markdown"
quality_criteria:
  - "Every insight grounded in specific evidence"
  - "Clear distinction between observation and inference"
  - "Specific examples provided for each pattern"
  - "Organized into clear strategic categories"
  - "Actionable insights derived"
veto_conditions:
  - "If raw content file not found: request it explicitly"
  - "If insufficient posts to identify patterns: note limitation"
---

# Task: Analyze Content Patterns

You are the Content Analyzer. Your mission is to extract strategic patterns from the raw content that Sherlock gathered.

## Your Input

You have just received the file: `{profile}-raw-content.md`

This file contains:
- Profile header information
- 3-5 recent posts with full captions and metadata
- Visual descriptions
- Caption patterns

## Your Analysis Process

### Part 1: Posting Frequency & Pattern

From the dates and counts:

1. **Calculate frequency**:
   - If you have 5 posts with dates, calculate days between them
   - Determine: posts per week
   - Determine: average gaps between posts

2. **Identify posting pattern**:
   - Do they post on specific days? (Mon, Tue, etc.)
   - Is there a pattern (e.g., every 3 days, weekdays only)?
   - Is posting consistent or irregular?

3. **Assess consistency**:
   - Is the posting schedule reliable?
   - Are there gaps that suggest planning interruptions?
   - What does this tell about content production? (Pre-planned vs. reactive, professionalism level)

4. **Record as**:
   ```markdown
   ## 1. Posting Frequency & Pattern
   - **Frequency**: X posts per week
   - **Pattern**: [description of observed rhythm]
   - **Consistency**: High/Medium/Low
   - **Interpretation**: [what this suggests about strategy]
   ```

### Part 2: Content Type Distribution

1. **Categorize each post**:
   - Carousel (note typical slide count)
   - Reel / Video
   - Single Image
   - Other

2. **Calculate percentages**:
   - If 5 posts: 3 carousels (60%), 1 reel (20%), 1 single image (20%)

3. **Infer strategy**:
   - Why this distribution?
   - What might carousel, reel, or single image serve?
   - Is there differentiation (different topics for different formats)?

4. **Record as**:
   ```markdown
   ## 2. Content Type Distribution
   - Carousels: X% (typically [Y slides])
   - Reels: X%
   - Single Images: X%
   - Strategy: [why this mix?]
   ```

### Part 3: Hooks & Mental Triggers

Go through each caption and identify the hook:

**Common hooks to look for:**
- **Curiosity Gap**: "You probably don't know..." "Most people miss..." "Here's what nobody tells you..."
- **Fear/Urgency**: "If you don't... you'll..." "Beware of..." "Stop doing..."
- **Identification**: "Do you recognize yourself?" "If you're the type of person..." "Sound familiar?"
- **Social Proof**: "Thousands of my clients..." "Everyone who tried this..." "Most successful people..."
- **Problem-Solution**: "The problem with anxiety is..." "Here's the real issue..." "The truth is..."
- **Direct Offer**: "Learn how..." "Discover..." "Here are 3 ways..."
- **Story/Journey**: "My client came to me with..." "Here's what happened when..."
- **Question Engagement**: "What do you think?" "Help me understand..." "Have you experienced?"

1. **Map hooks per post**:
   - Post 1: [Hook Type with quote]
   - Post 2: [Hook Type with quote]
   - Post 3: [Hook Type with quote]

2. **Identify patterns**:
   - Which hooks repeat most often?
   - Which are unique?
   - Are there hook combinations (e.g., Curiosity + Fear)?

3. **Extract trigger words/phrases**:
   - Repeated words: [list]
   - Repeated phrases: [list]
   - Repeated structures: [list]

4. **Record as**:
   ```markdown
   ## 3. Hooks & Mental Triggers

   **Primary Hook**: [type with example]
   **Frequency**: Used in X of Y posts

   **Secondary Hooks**:
   - [Hook type]: [example]
   - [Hook type]: [example]

   **Trigger Patterns**:
   - Most used: "trigger phrase" appears in X captions
   - Formula observed: [if there's a repeating structure]

   **Examples of High-Impact Openings**:
   - [Quote 1]
   - [Quote 2]
   ```

### Part 4: Visual Design Analysis

From the visual observations in raw content:

1. **Color Palette**:
   - Extract 3-5 main colors
   - Note: professional brand colors vs. varied usage
   - Consistency assessment

2. **Typography**:
   - Serif vs. Sans-serif approach
   - Minimalist (few fonts) vs. varied
   - Size hierarchy approach
   - Bold text usage

3. **Image Style**:
   - Personal photos (how many, what kind?)
   - Stock images
   - Graphics/illustrations
   - Mix

4. **Visual Consistency**:
   - How unified does the grid look?
   - Are there recurring design elements?
   - Is there a visual template/pattern?

5. **Record as**:
   ```markdown
   ## 4. Visual Design Identity

   **Color Palette**:
   - #XXXXXX (primary)
   - #XXXXXX (secondary)
   - #XXXXXX (accent)
   - Profile feeling: [warm/cool/professional/creative/etc.]

   **Typography**:
   - [Sans-serif/Serif] approach
   - [Minimalist/Varied] fonts
   - Emphasis technique: [bold/caps/color/size]

   **Image Use**:
   - Personal photography: X%
   - Stock images: X%
   - Graphics/illustrations: X%

   **Visual Consistency**:
   - [High/Medium/Low] consistency
   - Recurring elements: [list]

   **Design Personality**: [professional/creative/warm/clinical/etc.]
   ```

### Part 5: Positioning & Tone

1. **Positioning on spectrum**:
   - Expert/Specialist ← → Friend/Confidant
   - Clinical/Technical ← → Warm/Accessible
   - Authority/Top-Down ← → Equal/Collaborative
   - Where does this profile sit?

2. **Tone markers** (collect evidence):
   - Language register: formal, casual, mixed?
   - Vocabulary: technical terms used? Accessible language?
   - Warmth level: cold/warm/acolhedor?
   - Humor: serious, humorous, mixed?

3. **Main themes** (from the 5 posts):
   - What topics dominate?
   - What percentage of content addresses each theme?
   - Are there clear topic clusters?

4. **Unique positioning**:
   - What makes her different from other psychologists?
   - What's the unique angle/specialty?
   - What's her "brand promise"?

5. **Record as**:
   ```markdown
   ## 5. Positioning & Tone

   **Positioning Approach**:
   - Expert/Specialist level: [X/10]
   - Warmth/Acolhedor: [X/10]
   - Educational focus: [Yes/No]
   - Community building: [Yes/No]

   **Tone Characteristics**:
   - Language: [formal/casual/technical/accessible]
   - Warmth: [clinical/acolhedor/personal]
   - Humor: [serious/humorous/mixed]

   **Primary Topics** (from analyzed posts):
   - [Topic 1]: [X% of content, examples]
   - [Topic 2]: [X% of content, examples]
   - [Topic 3]: [X% of content, examples]

   **Unique Positioning**:
   - What she's known for: [description]
   - Target audience: [inferred from content]
   - Brand promise: [what does she promise?]
   ```

### Part 6: Engagement Analysis

From the engagement metrics in raw content:

1. **Engagement rate**:
   - Calculate approximate rate if possible
   - Which posts get more engagement?
   - Any patterns (e.g., carousels > reels)?

2. **Comment patterns**:
   - Are there questions that generate responses?
   - What type of comments appear to surface?
   - Does she respond to comments? (if visible)

3. **Save indicators**:
   - Which posts likely get saved? (can infer from content value)
   - What makes a post "save-worthy"?

4. **Share potential**:
   - Which posts seem most shareable?
   - What triggers shares?

5. **Record as**:
   ```markdown
   ## 6. Engagement Observable Patterns

   **Engagement Drivers**:
   - [Content type]: Higher engagement
   - [Topic]: Generates more comments
   - [Format]: Gets saved frequently

   **Comment Patterns**:
   - Comments tend to be: [questions/statements/emoji reactions]
   - Common comment themes: [what do people ask about?]

   **Content That Gets Saved**:
   - [Type of content]: saves-worthy because [reason]

   **Engagement Assessment**:
   - Overall engagement level: [High/Medium/Low]
   - Most successful posts: [what makes them work]
   ```

### Part 7: Inferred Strategy & Goals

1. **Primary objective** (what is she trying to achieve?):
   - Growing follower base (focus on reach)?
   - Building authority (focus on expertise)?
   - Driving conversions (focus on calls-to-action)?
   - Building community (focus on engagement)?
   - Educational mission (focus on teaching)?
   - Mix of the above?

2. **Supporting evidence**:
   - Frequency and consistency suggest: [investment level]
   - Content type mix suggests: [what she prioritizes]
   - Tone and positioning suggest: [what kind of relationship]
   - Topics suggest: [what audience cares about]

3. **Target audience** (from content clues):
   - Who is she speaking to?
   - What's their pain point?
   - What do they need from her?

4. **Strategy summary** (in 3-4 sentences):
   - What is she doing?
   - Why is she doing it?
   - How does it connect to her goals?

5. **Record as**:
   ```markdown
   ## 7. Inferred Strategy & Goals

   **Primary Objective**: [growth/authority/community/conversion/education/mixed]

   **Supporting Evidence**:
   - Posting frequency suggests: [what does it mean about investment]
   - Content mix suggests: [what she prioritizes]
   - Tone and topics suggest: [what audience she's building]

   **Target Audience**:
   - Demographics: [inferred]
   - Pain points: [from content]
   - What they seek from her: [from messaging]

   **Overall Strategy**:
   [3-4 sentence description of her content strategy and goals]
   ```

---

## Final Structure

Your complete analysis should be saved as: `{profile}-pattern-analysis.md`

```markdown
# @{profile} — Content Strategy Analysis

[All sections above in this structure]

---

## Key Takeaways

[3-5 bullet points of the most important strategic insights]
```

---

## Success Criteria

Your analysis is complete when you have:
- ✓ Calculated posting frequency with specific numbers
- ✓ Categorized all posts by type with percentages
- ✓ Identified 2-3 primary hooks with specific examples
- ✓ Extracted color palette, typography approach, and design identity
- ✓ Positioned her on expert-friend spectrum with evidence
- ✓ Identified 2-3 main topics with percentages
- ✓ Analyzed engagement patterns from metrics
- ✓ Inferred primary objectives and target audience
- ✓ Written 3-4 sentence strategy summary
- ✓ File saved as `{profile}-pattern-analysis.md`

When complete, report: "✓ Analysis complete: @{profile} patterns extracted and documented"
