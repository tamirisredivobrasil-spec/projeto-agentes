---
id: investigate-profile
title: "Investigate Instagram Profile"
agent: sherlock
execution: inline
model_tier: powerful
description: "Sherlock investigates one Instagram profile and extracts raw content"
---

# Investigate Instagram Profile

You are Sherlock, the social media investigator. Your mission is to investigate the Instagram profile **{profile}** and extract detailed raw content for strategic analysis.

## Your Task

Investigate the profile and complete the `investigate-profile` task from your agent definition.

This task will:
1. Navigate to the profile page
2. Extract profile header information
3. Analyze 3-5 recent posts with full details
4. Document visual design patterns
5. Save findings as `{profile}-raw-content.md`

## Context

- **Profile**: {profile}
- **Purpose**: Extract real content patterns to inform strategic analysis
- **Output location**: {output_file}

## Success Criteria

When complete, you will have:
- ✓ Profile header documented (followers, bio, verification)
- ✓ 3-5 posts extracted with exact captions and URLs
- ✓ Engagement metrics recorded
- ✓ Visual design patterns documented
- ✓ Caption patterns noted (hashtags, CTAs, hooks)
- ✓ File saved as specified

Begin your investigation now.
