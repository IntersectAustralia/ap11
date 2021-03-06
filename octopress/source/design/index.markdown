---
layout: page
title: "Solution's design"
date: 2012-08-07 16:20
tags: [protgenexus, proteomics, genomics, transcriptome, DIISRTE, fundedByAustralianNationalDataService, andsApps, ap11, andsFeatures, andsFunctions, andsTechnology, andsArchitecture, andsTools]
comments: true
sharing: true
footer: true
---

# Workflow

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

Most of the steps are already in place. This project aims to fill in the gaps - shown in red above - by a set of command
line tools that will convert or generate the files based on output from previous steps. It constitutes a _nexus_ between
the DNA/mRNA path and its proteomic counterpart. 

These command line tools will interact with public repositories, files and folders in local or server machines, and will generate output typically
to local storage as well. The tools proposed are:

  * _samifier_ : converts output from Mascot into a SAM file to view in IGV. Command line tool. We may develop a little GUI if recommended by researchers.
  * _VPG_ : Virtual Protein Generator, given a DNA assembly or mRNA transcriptome, will generate a FAST A file suitable for Mascot as protein database. If time
    permits we may be able to explore more automated ways to slice a given assembly iterating partition & search for a given MS file.

Not shown, but implicit, is that at the end of experiments, usually when a paper is produce, researchers will use the advertiser web app to publish
collections to ANDS.

# Components' architecture

_Nexus_ is made of different independent components, most command line. We explain briefly expected sources of data upon these tools operate, i.e. their
architecture. We also provide a brief explanation of the publishing web app.

## samifier

The samifier - for lack of a better name - will convert the Mascot output to a SAM file, suitable for IGV or other genomic viewers.
It will run from the researcher's PC and interact with the local storage (hard drive or file server) to grab the mascot output
and generate in said place the output. It may interact with remote protein databases if required.

The diagram below depicts this

{% img /design/samifier.jpg 350 %}

As IGV is open sourced by LGPL, it has been discussed that the team may -once it gets more familiar with the concepts and IGV itself- implement into IGV a custom viewer that
wont require the _samifier_.

## vpg

The Virtual Protein Generator will run also in a local PC. As the above tool, it is expected main input and output will be to local storage, either
hard drive or file server. It is not expected that it will interact with remote protein databases, at this stage. It is expected that the output,
a FAST A file, will be uploaded into the Mascot search engine. The diagram below illustrates
this.

{% img /design/vpg.jpg 350 %}

## advertiser web app

This will be a Rails web application, hosted in suitable server (doesn't need top-end requirements), that will (a) allow researchers to
create experiments and collections, (b) publish them to RDA, (c) offer an OAI-PMH end point to ANDS. Although the database access will
be vendor-agnostic, it is expected that data will be hosted in a Postgres DB. The following picture shows the overall architecture of this
component.

{% img /design/web-architecture.jpg 350 %}

An initial draft of the site follows

{% img /design/web-site.jpg 750 %}


# Functionality

We detail further the overall functionality associated with each component as of today. Each _feature_ is presented in the style of a 
User Story, following Intersect's Agile practice for software development.

_samifier_:

  * As researcher using the samifier, I want to be able to convert a Mascot result into a SAM file using an external genome/proteins database
  * As researcher using the samifier, I want to be able to use a custom genome/proteins database as generated by the VPG
  * As researcher using the samifier, I want to be able to customise the external genome/proteins database used by the tool
  * As researcher using the samifier, I want to be able to concatenate several search results (mzIdentML files) into one for IGV to read 
  * As researcher using the samifier, I want to be able to configure different strategies to deal with not-found proteins in said genome DB
  * As researcher using the samifier, I want to the tool to use the Unimod results to further describe relevance of fragments
  * As researcher using the samifier, I want to be able to use more peptide results to further describe relevance of fragments
  * As researcher using the samifier, I want to be able to save directly into BAM format to save space
  * As researcher using the samifier, I want to be able to read in the mzIdentML standard to be able to use other proteomic search engines
  * As researcher using the samifier, I want to use a simple GUI to provide parameters and monitor progress
  * As researcher using the samifier, I want to incorporate a cufflinks output into IGV in the SAM or in other format understood by IGV (.gtf?)
  * As researcher using the samifier, I want to be able to quickly identify split peptides when working with isotig inputs (mRNA)

If time permits, the team may be able to approach the following...

  * As researcher using IGV, I want to be able to load and visualise mzIdentML results directly into IGV
  * As researcher using IGV, I want to be able to load and visualise MASCOT search results directly into IGV
  * As researcher using IGV, I want to be able to load and visualise cufflinks results directly into IGV
  * As researcher using IGV, I want to be able to load and visualise split peptides directly into IGV

_VPG_:

  * As researcher using VPG, I want to be able to use a DNA assembly file to generate a virtual protein file with certain lengths
  * As researcher using VPG, I want to be able to use a mRNA assembly file to generate a virtual protein file with certain lengths

To consider later,
  * As researcher using VPG, I want to be able to do iterative virtual protein / searching to improve accuracy

_Web app_

  * As researcher, I want to be able to request access to the system
  * As researcher, I want to be able to login into the system with username and password
  * As researcher, I want to be able to recover access if forgot my password
  * As researcher, I want to be able to create a new experiment _Nexus_ experiment
  * As researcher, I want to be able to add a local input collection to an experiment
  * As researcher, I want to be able to add a remote input collection to an experiment
  * As researcher, I want to be able to edit an input collection in an experiment
  * As researcher, I want to be able to delete an input collection from an experiment
  * As researcher, I want to be able to describe the output collection from an experiment
  * As researcher, I want to be able to review what's going to be published for my colelctions
  * As researcher, I want to be able to publish/advertise collections in a given experiment
  * As researcher, I want to be able to describe myself to ANDS via my own record in the system
  * As researcher, I want to be able to de-advertise an experiment
  * As researcher, I want to be able to delete an experiment from the system
  * As researcher, I want to be able to upload/store the outputs into the system so others can download it
  * As researcher, I want to be able to give editing access to others to my experiments
  * As researcher, I want to be able to revoke access to others to my experiments
  * As administrator, I want to be able to accept access requests
  * As administrator, I want to be able to revoke access requests
  * As administrator, I want to be able to block access requests for an email
  * As administrator, I want to be able cancel or block access to existing accounts
  * As administrator, I want to be able change role for an existing account
  * As administrator, I want to be able cancel or block access to existing accounts
  * As administrator, I want to be able to confirm a publication request
  * As administrator, I want to be able to reject a publication request
  * As administrator, I want to be able to grant access to a user to someone else's experiment
  * As general public, I want to be able to download a ZIP file containing experiment output 
  * As ANDS, I want to be able to harvest the repository using OAI-PMH protocol

_General requirements_

  * The command line tools and _Nexus_ software to be developed in a language familiar to researchers and/or
    popular, so they can modify the algorithms if needed later
  * _Nexus_ tools need to be able to accept big input files without blocking for memory
  * _Web app_ to be served in the cloud if possible

<hr/>

[prev page](/measuring-success/) [next page](/outcomes/)

