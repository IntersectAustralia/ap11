---
layout: post
title: "Notes from demo 2"
date: 2012-09-13 17:24
tags: [protgenexus, proteomics, genomics, transcriptome, DIISRTE, fundedByAustralianNationalDataService, andsApps, ap11, sprint demo]
comments: true
categories: 
commits: 
  since: 2012-08-31
  until: 2012-09-13
---

Demo number two was about seeing the samifier and the _predicted_ proteins implemented in Java. We had a chat too about how
the web app was going.

<!-- more -->

We installed the java command line tools and here you can see their output when no parameters are given:

The *samifier*

```text
$ java -jar samifier.jar 
usage: samifier -c <chromosomeDir> -g <genomeFile> -m <mappingFile> -o
       <outputFile> -r <searchResultsFile>
 -c <chromosomeDir>       Directory containing the chromosome files in
                          FASTA format for the given genome
 -g <genomeFile>          Genome file in gff format
 -m <mappingFile>         File mapping protein identifier to ordered locus
                          name
 -o <outputFile>          Filename to write the SAM format file to
 -r <searchResultsFile>   Mascot search results file in txt format
```

and the *protein generator*

```text
$ java -jar protein_generator.jar 
usage: protein_generator -d <Database Name> -f <Genome File> [-g <Glimmer
       File>] [-i <Split Interval>] -o <Output File> [-t <Translation
       Table File>]
 -d <Database Name>            Database name
 -f <Genome File>              Genome file in FASTA format
 -g <Glimmer File>             Glimmer txt file. Can't be used with the -i
                               option.
 -i <Split Interval>           Size of the intervals into which the genome
                               will be split. Can't be used with the -g
                               option.
 -o <Output File>              Filename to write the FASTA format file to
 -t <Translation Table File>   File containing a mapping of codons to
                               amino acids, in the format used by NCBI.
```

although the option *-i* is still pending, it is meant to be for _virtual proteins_ for next sprint.

The *samifier* code is in [here](https://github.com/IntersectAustralia/ap11_samifier) and the
*protein generator* [here](https://github.com/IntersectAustralia/ap11_protein_generator).

We also demoed in the web application the new look & feel, based on the [SBI](http://www.systemsbiology.org.au/)
website. It's still work in progress as we need to define how the menus are going to change for this 
application. That will be a discussion for our next planning meeting. We also showed how to enter an _input
collection_ in the system, although there were also questions pending in terms of the metadata model.

For this sprint we want to focus in working with the samifier (reverse strand proteins, the mzIdentML
format,) and the protein generator.
