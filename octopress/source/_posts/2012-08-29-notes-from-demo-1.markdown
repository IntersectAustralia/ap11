---
layout: post
title: "notes from demo 1"
date: 2012-08-29 13:40
tags: [protgenexus, proteomics, genomics, transcriptome, DIISRTE, fundedByAustralianNationalDataService, andsApps, ap11, sprint demo]
comments: true
categories: 
commits:
  since: 2012-08-15
  until: 2012-08-29
---

We had our first sprint demo on the 27/Aug, which didn't go without its hurdles. We showed the web app site, with initial
user registration, user management and experiments page.

<!-- more -->

This is a screenshot of the login page (click to see larger picture)

[{% img /files/web-app-002.png 350 %}](/files/web-app-002.png)

and the self-registration page

[{% img /files/web-app-003.png 350 %}](/files/web-app-003.png)

and the experiments page

[{% img /files/web-app-001.png 350 %}](/files/web-app-001.png)

Then we discussed the virtual protein generator. We realised it should be called Protein Generator, as it is meant to generate two kinds
of protein DB files: one for predicted proteins, using gene scanner software as [glimmer](http://cbcb.umd.edu/software/glimmer/);
and _virtual proteins_, just generated by splitting the genome in contiguous blocks of certain size. We are aiming to have a first go 
with this product this sprint.

The *samifier* was presented at the end. We had issues with the genome being split in several files, but at the end showed the 
prototype, which was written in Ruby. We are aiming to produce a Java version by the end of this week to test it with researchers
in other kinds of datasets.

Researchers were happy with the demostration despite little issues, and are looking forward to the evolution of these initial
prototypes.
