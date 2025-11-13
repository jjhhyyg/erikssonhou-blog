---
title: Lecture 1: Oerview and Tokenization
date: 2025-11-10
description: 
---

## Why did we make this course?

Problem: researchers are becoming **disconnected** from the underlying technology.

![Problem description history](/images/20251110165809.png)

Moving up levels of abstractions boosts productivity, but:

- These abstractions are leaky (in contrast to programming languages or operating systems)
- There is still fundamental research to be done that require tearing up the stack

<span style="color: red">Thus, Full understanding of this technology is necessary for fundamental research.</span>

This course: **understanding via building**.

But there's one small problem: **The Industrialization of language models**.

![Large resource cost](/images/20251110170525.png)

![technology details' concealment OpenAI 2023](/images/20251110170548.png)

**The frontier models are out of reach for us.**

But building small language models (<1B parameters in this class) might not be representative language models:

Example 1: fraction of FLOPs spent in attention versus MLP changes with scale.

| | description | FLOPs / update | % FLOPS MHA | % FLOPS FFN | % FLOPS attn | % FLOPS logit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | OPT setups | | | | | |
| 9 | 760M | 4.3E+15 | 35% | 44% | 14.8% | 5.8% |
| 10 | 1.3B | 1.3E+16 | 32% | 51% | 12.7% | 5.0% |
| 11 | 2.7B | 2.5E+16 | 29% | 56% | 11.2% | 3.3% |
| 12 | 6.7B | 1.1E+17 | 24% | 65% | 8.1% | 2.4% |
| 13 | 13B | 4.1E+17 | 22% | 69% | 6.9% | 1.6% |
| 14 | 30B | 9.0E+17 | 20% | 74% | 5.3% | 1.0% |
| 15 | 66B | 9.5E+17 | 18% | 77% | 4.3% | 0.6% |
| 16 | 175B | 2.4E+18 | 17% | 80% | 3.3% | 0.3% |

As the scale increases, the MLP layers take the lead(175B models contains 80% FLOPs calculation in MLP layers).

**The result is**: if you spent a lot of time optimizing the model in small scale, it probably won't work in the large scale.

Example 2: Emergence of behavior with scale(Wei+ 2022)

![Emergence of behavior with scale](/images/20251110171558.png)

As training FLOPs increases, the performance of models looks like above. If you optimize the model in between $10^{18}$ to $10^{22}$, you might find nothing.

**What can we learn in this class that transfers to frontier models?**

There are three types of knowledge:

- **Mechanics**: how things work (what a Transformer is, how model parallelism leverages GPUs efficiently)
- **Mindset**: squeezing the most out of the hardware, taking scale seriously (scaling laws)
- **Intuitions**: which data and modeling decisions yield good accuracy (partially teached)

### Intuitions?

Some design decisions are simply not (yet) justifiable and just come from experimentation.

![Not justifiable example](/images/20251110173514.png)

### The bitter lesson

Wrong interpretation: scale is all that matters, algorithms don't matter.
Right interpretation: algorithms that scale is what matters.

$$
accuracy = efficiency \times resources
$$

In fact, efficiency is **way more important** at **larger scale**(can't afford to be wasteful).

Framing: what is the best model one can build **given a certain compute and data budget?**  
In other words, **maximize efficiency**!

## Current landscape

![Pre-neural](/images/20251110174508.png)

![Meural ingredients](/images/20251110174635.png)

![Early foundation models](/images/20251110174703.png)

![Embracing scaling, more closed](/images/20251110174748.png)

![Open models](/images/20251110174917.png)

![Levels of openness](/images/20251110175014.png)

![Today's frontier models](/images/20251110175105.png)

## Course logistic

All information online: <https://stanford-cs336.github.io/spring2025/>

## Course Components

![Design decisions](/images/20251113150413.png)
