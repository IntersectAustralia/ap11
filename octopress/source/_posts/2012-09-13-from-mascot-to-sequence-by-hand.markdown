---
layout: post
title: "From Mascot to sequence by hand"
date: 2012-09-13 17:24
tags: [protgenexus, proteomics, genomics, transcriptome, DIISRTE, fundedByAustralianNationalDataService, andsApps, ap11, sprint demo]
comments: true
categories: 
---

Working with reverse strand proteins requires special attention, as the position arithmetic and logic needs
to be worked out with care. As developers, we need to have a documented procedure to be able to check
amino acid and nucleotide sequences and this post is an attempt in that direction.

<!-- more -->

First, given an _accession_ table and mascot results (in DAT) format, the following bash command
outputs proteins of interest in the mascot search

```bash
awk '$1 ~ /C$/ && $3 ~ /_YEAST$/{print $3}' accession.txt | while read ploc; do grep "$ploc" ETD_exclusion_with_inclusion_120517_Band14.txt ; done
```

We get lines as the followings:

```text
...
q94_p3=0,755.392593,0.000455,6,IDQPAGR,51,000000000,24.30,0000000000000001020,0,0;"YP264_YEAST":0:300:306:1
q187_p8=0,803.377319,-0.000271,2,ASDIENR,6,000000000,12.48,0000002000000001000,0,0;"YPR46_YEAST":0:79:85:1
q317_p2=1,864.437469,-0.003421,4,AMKSNEK,8,005000070,11.04,0000002000000000020,0,0;"YRB30_YEAST":0:182:188:2
q356_p6=0,880.429031,0.000417,4,GNDVYSAK,24,0000000030,13.38,0000000000000002010,0,0;"APN1_YEAST":0:48:55:1,"VPS10_TALSN":0:118:125:1
q1253_p1=2,1286.609390,0.000658,5,KTKDMSGGWK,33,040300600030,12.57,0000000001000002010,0,0;"ARB1_YEAST":0:223:232:3
q1253_p3=2,1286.609390,0.000658,5,KTKDMSGGWK,33,070000600030,11.03,0000000001000002010,0,0;"ARB1_YEAST":0:223:232:3
"ARB1_YEAST"=68334.57,"ABC transporter ATP-binding protein ARB1 OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) GN=ARB1 PE=1 SV=1"
q492_p1=2,943.473938,-0.002490,4,SSKVTKSK,8,0060000000,18.26,0000000002000000000,0,0;"ARN1_YEAST":0:180:187:1,"LPXD_RICM5":0:330:337:1
q492_p2=2,943.473938,-0.002490,4,SSKVTKSK,8,0600000000,18.26,0000000002000000000,0,0;"ARN1_YEAST":0:180:187:1,"LPXD_RICM5":0:330:337:1
q554_p4=0,967.473953,0.002495,5,TIVDTIAR,46,0000060000,21.85,0000001001000002010,0,0;"ARX1_YEAST":0:225:232:1
q19_p9=1,703.386429,-0.000781,4,NEVKSK,18,00000000,13.94,0000000000100002000,0,0;"ATG26_YEAST":0:144:149:1,"ILVD_SULDN":0:534:539:1,"LOC1_DEBHA":0:163:168:1
...
```

Let's pick a protein match there **ARB1_YEAST**. We search for that protein in [UniProtKB](http://www.uniprot.org/)
and we find it as shown in image below

[{% img /files/protein-search-1.png 550 %}](/files/protein-search-1.png)

We see there the locus name **YER036C**, which we would find in the _accession.txt_ if we looked for our protein of interest. In the
UniProtKB there is a **cross-refs** link which we click. It just points to one of the sections at the bottom of the page as shown here 

[{% img /files/protein-search-2.png 550 %}](/files/protein-search-2.png)

We follow the link to the EMBL sequence database, particularly the translation code shown. Follow that in new window as it is another
website, [EMBL-EBI](http://www.ebi.ac.uk/), particularly the page describing the sequence for that protein

[{% img /files/protein-search-3.png 550 %}](/files/protein-search-3.png)

as the preview above should confirm. There we just go to sequence (see red arrow), a link to the bottom, where we see
the sequence as displayed in here

[{% img /files/protein-search-4.png 550 %}](/files/protein-search-4.png)

So, just click the "Show full sequence" link (JavaScript) to reveal the full sequence if it is too long. Voila, the amino acid sequence!

Bear in mind that this whole exercise assumes a reference genome. You can see it just below the locus name in the first screenshot above. Hope
this instructions help to navigate the complex web of proteomic/genomic data.

