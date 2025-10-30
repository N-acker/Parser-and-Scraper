

## Overview

This folder contains my two completed solutions for the LeapAP coding test:

- `parser.js`: Utility bill parser (Node.js)
- `scraper.js`: Web scraper that logs into LeapAP, searches for invoice #123444, downloads the PDF, and saves it locally

---

## 1. Parser

### Description

This script reads a text-based utility bill and extracts:

- Customer number  
- Account number  
- Bill period  
- Bill number  
- Bill date  
- Total new charges  

### How to Run

```bash
node parser.js test-q1.txt
```

## 2. Scraper

### Description

This script uses Puppeteer to:

- Launch a browser and log in to website 
- Navigate to **Invoices → All**  
- Enter `123` in the **Invoice #** field  
- Wait for invoice **#123444** to appear  
- Click the magnifying glass to open the invoice  
- Download the PDF from the invoice viewer and save it locally as `invoice-123444.pdf`  
- Output the path to the saved file  

### Setup

```bash
npm install puppeteer
```

### How to Run

```bash
node scraper.js
```
