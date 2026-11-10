---
title: Voice agents: AI you talk to
slug: voice-agents
description: Two seconds of silence and a voice bot already feels broken. How voice agents work: chained vs speech-to-speech, turn detection, barge-in and latency.
date: 2026-11-08
series: ai-explained
youtube: ofnfe2JkqTE
facebook: https://facebook.com/reel/1127671853450724
instagram: https://www.instagram.com/p/DfeUo91DqOa/
tags: voice agents, realtime api, speech to text, text to speech, webrtc
---
You ask a voice bot a question and wait. Two seconds of silence, and it already feels broken. Why so harsh? In conversation, people usually reply within about **200 milliseconds**, a pattern a study found across ten languages. Voice agents are judged by human timing.

## What a voice agent is

A voice agent is an AI you talk to out loud. It listens, thinks, and answers in speech. There are two main designs.

## Design 1: the chain

**Speech-to-text → LLM → text-to-speech.**

- **Pros:** you get a transcript, you can swap any piece, and you can check or change the text before it's spoken.
- **Cons:** every hop adds delay, and tone of voice is lost once speech becomes text.

## Design 2: speech-to-speech

One **realtime model** hears audio and answers in audio. As OpenAI's guide puts it, you "use one model to interpret audio, decide what to do, and respond in speech". The session handles audio turns, tools and interruptions.

- **Pros:** lower latency, keeps tone and emotion.
- **Cons:** less control over each step.

## Making it feel natural

**Stream everything.** Start speaking the first sentence before the rest is written.

**Detect the end of a turn.** When did the user stop talking? **Voice activity detection** (VAD) listens for silence. But silence gets fooled by a pause mid-thought, so **semantic** detection checks whether the sentence sounds finished.

**Support barge-in.** People interrupt. Stop talking the moment they start, and listen.

**Use the right transport.** In the browser, audio usually travels over **WebRTC**, built for low-latency, real-time media.

**Cover slow tools.** Voice agents still call tools. Say something like "let me check" while a slow call runs, instead of going silent.

## Measure what users feel

The key number: time from when the user **stops talking** to the **first sound** of the reply. Track it, and optimize the slowest step.

## Tip: keep answers short

Paragraphs that read fine on screen sound endless out loud. Ask the model for short, spoken-style answers.

> Fast to answer, quick to listen.

## Sources

- [OpenAI, Voice agents guide](https://developers.openai.com/api/docs/guides/voice-agents)
- [OpenAI, Voice activity detection](https://developers.openai.com/api/docs/guides/realtime-vad)
- [LiveKit Agents docs](https://docs.livekit.io/agents/)
- [Stivers et al., Universals and cultural variation in turn-taking in conversation, PNAS 106(26), 2009](https://pubmed.ncbi.nlm.nih.gov/19553212/)
