---
layout: page
title: "Solution's design"
date: 2012-08-07 16:20
tags: protgenexus, proteomics, genomics, transcriptome, DIISRTE, fundedByAustralianNationalDataService, andsApps, ap11, andsFeatures, andsFunctions, andsTechnology, andsArchitecture, andsTools
comments: true
sharing: true
footer: true
---

The overall genomic and proteomic workflow for the project goes as follows:

<ol>
  <li>DNA, mRNA and/or proteins are extracted from a specimen</li>
  <li>The DNA/mRNA path goes through a sequencer</li>
  <ul>
    <li>the output of that is assembled (TopHat) into a SAM or BAM file</li>
    <li>Optionally, genescanner software can be used or <i>virtual proteins</i> are created</li>
    <li>The DNA/mRNA path finishes with a FASTA database that can be used by Mascot protein search, either from external source or from the previous step</li>
  </ul>
  <li>The proteomic path goes:</li>
  <ul>
    <li>Optionally isolating proteins from the transciptome into <i>ponds</i></li>
    <li>each then passed through a mass spectrometer</li>
    <li>the output of this then used in the Mascot server</li>
    <li>generating a search result</li>
  </ul>
  <li>Finally, The search result needs to be displayed in IGV</li>
</ol>

{% img /design/workflow.jpg 350 %}

Most of the step are already in place. This project aims to fill in the gaps, shown in red above, by a set of command
line tools that will convert or generate the files based on output from previous steps. It constitutes a _nexus_ between
the DNA/mRNA path and its proteomic counterpart. 


<hr/>

[prev page](/measuring-success/) [next page](/outcomes/)

