---
marp: true
theme: default
paginate: true
header: 'Week 10 Splunk Lab Support'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }

---

# Security Information and Event Management (SIEM) with Splunk


---

# CLASS 1: SIEM Fundamentals & SPL Foundations

---

## Today's Agenda

1. The Security Monitoring Challenge
2. What is a SIEM?
3. Introduction to Splunk
4. SPL Fundamentals - The Pipeline Concept
5. Lab Overview & Resources


---

# Part 1: The Security Monitoring Challenge

---

## 🚨 The Modern Enterprise Network

**Typical Large Organization:**
- 10,000+ endpoints (laptops, servers, IoT devices)
- 50+ different applications and services
- Hundreds of network devices (routers, firewalls, switches)
- Cloud infrastructure (AWS, Azure, GCP)

**Each generates logs... constantly**

---

## 📊 The Data Problem

**Daily Log Volume (Medium Enterprise):**
- Firewalls: ~5 GB/day
- Web servers: ~10 GB/day
- Authentication systems: ~2 GB/day
- Endpoint security: ~20 GB/day
- Network devices: ~8 GB/day

**Total: ~45 GB/day = 16 TB/year**

**Question: How do you find a needle in this haystack?**

---

## 🔍 What Are We Looking For?

**Security Events to Detect:**
- Unauthorized access attempts
- Malware infections
- Data exfiltration
- Insider threats
- Lateral movement
- Command & control communications
- Denial of service attacks
- Policy violations

**These are RARE events in massive amounts of normal traffic**

---

## ⚠️ The Challenge

**Without proper tools:**
- Manual log review: Impossible at scale
- Distributed data: Logs stored in 100+ different systems
- Different formats: Each system logs differently
- Time-consuming: Hours to correlate events across systems
- Delayed detection: May not find attacks for weeks/months
- Alert fatigue: Too many false positives

**We need: Centralized, searchable, correlated log analysis**



---

# Part 2: What is a SIEM tool?

---

## SIEM Definition

**Security Information and Event Management**

A SIEM is a centralized platform that:
1. **Collects** logs from all sources
2. **Normalizes** data into common format
3. **Correlates** events across systems
4. **Analyzes** patterns and anomalies
5. **Alerts** on suspicious activity
6. **Stores** data for compliance and forensics

**Think of it as: Google for your security logs**

---

## SIEM Core Functions

### 1. Log Aggregation
- Collects from firewalls, servers, applications, endpoints
- Handles multiple formats (syslog, JSON, XML, custom)
- Real-time and batch ingestion

### 2. Normalization
- Converts different formats to common schema
- Extracts key fields (timestamp, source IP, user, action)
- Enriches with context (geolocation, threat intel)

---

## SIEM Core Functions (cont.)

### 3. Correlation
- Links related events across systems
- Example: Failed login (server) + VPN connection (firewall) + File access (file server)
- Creates timeline of attacker activity

### 4. Analysis
- Pattern recognition
- Statistical anomaly detection
- Behavioral baselines
- Machine learning (in modern SIEMs)

---

## SIEM Core Functions (cont.)

### 5. Alerting
- Rule-based: "If X happens, alert"
- Threshold-based: "If >100 failed logins in 5 min, alert"
- Anomaly-based: "This behavior differs from baseline"
- Reduces alert fatigue through intelligent filtering

### 6. Visualization
- Dashboards for real-time monitoring
- Reports for management and compliance
- Investigation tools for analysts

---

## SIEM Use Cases

### 1. Security Operations Center (SOC)
- Real-time threat monitoring
- Incident detection and response
- Threat hunting

### 2. Compliance
- PCI-DSS, HIPAA, SOX, GDPR
- Audit trail requirements
- Retention policies

### 3. Forensics
- Post-incident investigation
- Root cause analysis
- Timeline reconstruction

---

## Popular SIEM Solutions

### Commercial
- **Splunk** ⭐ (What we'll use)
- IBM QRadar; Microsoft Sentinel
- LogRhythm; ArcSight (Micro Focus)

### Open Source
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Wazuh
- OSSEC

**Splunk has ~20% market share and is widely used in enterprise**



---

# Part 3: Introduction to Splunk

---

## What is Splunk?

**Founded:** 2003  
**Purpose:** "Make machine data accessible, usable, and valuable"  
**Beyond Security:** IT operations, business analytics, IoT

**Key Strengths:**
- Powerful search language (SPL)
- Scales to petabytes
- Flexible data ingestion
- Rich visualization
- Large ecosystem of apps

---

## Splunk Architecture

```
┌─────────────────────────────────────────┐
│          Data Sources                    │
│  (Firewalls, Servers, Apps, Endpoints)  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         Forwarders (optional)            │
│     (Lightweight data collectors)        │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│           Splunk Indexers                │
│    (Parse, index, store data)           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│           Search Heads                   │
│    (User interface, searches, alerts)   │
└─────────────────────────────────────────┘
```

---

## Splunk Key Concepts

### Index
- Where data are stored (like a database)
- Think of it as a container for your data
- Example: `index=network_traffic`

### Source Type
- Defines data format - tells Splunk how to parse
- Example: `sourcetype=csv`, `sourcetype=syslog`

### Events
- Individual log entries - timestamped records
- What you search through
- Each row in your dataset is an event

---

## Splunk Key Concepts (cont.)

### Fields
- Extracted key-value pairs from events
- Example: `src_ip`, `dest_ip`, `protocolName`, `Tag`
- Can be searched, filtered, and analyzed
- Two types:
  - **Default fields:** `_time`, `source`, `sourcetype`, `index`
  - **Extracted fields:** Specific to your data

### The Search Pipeline
**Critical concept:** Every query is a pipeline
```
Search → Filter → Process → Present
```
Data flows left to right, each command processes the previous output

---

## Splunk Interface Tour

```
┌─────────────────────────────────────────────────────┐
│  [Apps▼] [Search] [Dashboards] [Settings]    [User] │ ← Top Nav
├─────────────────────────────────────────────────────┤
│  Search Bar: [ index=network_traffic  | [Search] ]  │
│  Time Picker: [ Last 24 hours ▼ ]     ← IMPORTANT!  │
├──────────┬──────────────────────────────────────────┤
│ Fields   │                                           │
│ Sidebar  │         Results/Visualizations            │
│          │                                           │
│ Selected │         Click fields to see values        │
│ ├source  │         Click values to filter            │
│ ├dest    │                                           │
│          │                                           │
│ All      │                                           │
│ ├user    │                                           │
│ ├action  │                                           │
└──────────┴───────────────────────────────────────────┘
```

**Pro tip:** Use field sidebar to explore data structure


---

# Part 4: SPL Fundamentals - The Pipeline Concept

---

## The Core Philosophy: The Pipeline

**Think Unix pipes, but for data analysis**

```spl
input | command1 | command2 | command3 | output
```

**Key insight:** Each command processes one thing and passes results forward

**This is how professional analysts think:**
- Build queries incrementally
- Test each step
- Chain commands together


---

## Your Dataset Fields (Know These)

**Network Traffic Dataset Fields:**
```
startDateTime          - Flow start time
stopDateTime           - Flow end time  
duration               - Connection length (seconds)
src_ip                 - Source IP address
dest_ip                - Destination IP address
sourcePort             - Source port (1-65535)
destinationPort        - Destination port (1-65535)
protocolName           - TCP, UDP, or ICMP
appName                - Application/service name
totalSourceBytes       - Bytes sent from source
totalDestinationBytes  - Bytes sent from destination
totalSourcePackets     - Packets sent from source
totalDestinationPackets - Packets sent from destination
Tag                    - "normal" or "attack" ← Your ground truth!
```

---

## SPL Level 1: Basic Search (The Foundation)

**Concept:** Tell Splunk WHERE to look

```spl
index=network_traffic sourcetype=csv
```

**What this does:**
- Searches the `network_traffic` index
- Only includes CSV format data
- Returns ALL events (no filtering yet)

**Critical habits to form:**
1. Always specify your index
2. Set time range to "All time" for lab data
3. Check result count (bottom of screen)


---

## SPL Level 1: Basic Data

**Concept:** What data are in your index

```spl
index=network_traffic
| stats count by sourcetype
```

**What this does:**
- Shows the data sources count for the `network_traffic` index
- **For us, it only includes CSV data**


---

## SPL Level 2: Field Filtering (Narrow Your Focus)

**Concept:** Add conditions to find specific events

```spl
index=network_traffic Tag=attack
```

**What changed:**
- Only shows events where `Tag` field equals "attack"
- "brute force attack", "attack OR defense", "user-input\\*"  (literal values; using escape chars)
- Much fewer results; More targeted

**Key syntax:**
- `field=value` (exact match)
- Space between terms means AND
- Field names are **case-sensitive**


---

## Boolean Logic in SPL

**Three operators you need:**

```spl
# AND (default, use space)
index=network_traffic Tag=attack protocolName=TCP

# OR (when you want either/or)
index=network_traffic (Tag=attack OR Tag=normal)

# NOT (exclude something)
index=network_traffic Tag=attack NOT protocolName=ICMP
```

**Common mistake:** Forgetting parentheses with OR
```spl
# Wrong - confusing precedence
index=network_traffic Tag=attack OR Tag=normal protocolName=TCP

# Right - clear intention
index=network_traffic (Tag=attack OR Tag=normal) protocolName=TCP
```

---

## Wildcards: When You Need Flexibility

**Use `*` for pattern matching:**

```spl
# Any source IP starting with 192.168
index=network_traffic src_ip=192.168.*

# Any destination port starting with 80 (80, 800, 8080, etc.)
index=network_traffic destinationPort=80*

# Any appName containing HTTP
index=network_traffic appName=*HTTP*
```

**Pro tip:** Wildcards are powerful but slower - use specific matches when possible

---

## Date/timestamp picker

**Query**

```spl
index=network_traffic sourcetype=csv date_mday=7 date_month=october date_year=2024 date_minute>=55 date_minute<=58
```

**Choose date from UI**
```spl
# Set time range to October 7, 2024 in the UI, then:
index=network_traffic sourcetype=csv date_minute>=55 date_minute<=58
```

---

## SPL Level 3: The Pipe - Your First Command

**The pipe (`|`) is where the magic begins**

```spl
index=network_traffic Tag=attack | stats count
```

**What happened:**
- Everything before `|` = search (filter data)
- Everything after `|` = processing (analyze data)
- `stats count` = count the events we found

**Result:** Single number showing attack count

**Mental model:** 
1. Search: "Get me these events"
2. Pipe: "Now do something with them"
3. Command: "Count them"

---

## SPL Level 4: Grouping with "by"

**Most powerful pattern in SPL:**

```spl
index=network_traffic Tag=attack
| stats count by src_ip
```

**What this does:**
- Counts attacks
- Groups by source IP
- Shows one row per source with its count

**Result:** Table showing which IPs launched most attacks

**Pattern:** `stats <aggregation> by <field>`
- Common aggregations: count, sum, avg, max, min
- Can group by multiple fields

---

## Live Demo: Building Query Incrementally

**Watch how I build this step-by-step:**

```spl
# Step 1: Get data
index=network_traffic

# Step 2: Filter to attacks
index=network_traffic Tag=attack

# Step 3: Count them
index=network_traffic Tag=attack | stats count

# Step 4: Count by source
index=network_traffic Tag=attack | stats count by src_ip

# Step 5: Sort by most attacks
index=network_traffic Tag=attack | stats count by src_ip | sort -count

# Step 6: Show top 10
index=network_traffic Tag=attack | stats count by src_ip | sort -count | head 10
```

**Build incrementally**

---

## SPL Level 5: Multiple Aggregations

**Calculate several statistics at once:**

```spl
index=network_traffic Tag=attack
| stats count, 
        avg(duration) as avg_duration,
        sum(totalSourceBytes) as total_bytes,
        dc(destinationPort) as unique_ports
  by src_ip
| sort -count
```

**Functions used:**
- `count` - number of events
- `avg()` - average value
- `sum()` - total of all values
- `dc()` - distinct count (unique values)
- `as` - rename the result

**Result:** Rich profile of each attacking source

---

## Common Aggregation Functions

**You'll use these constantly:**

```spl
count               # Count events
count(field)        # Count non-null values
dc(field)           # Distinct count (unique values)
sum(field)          # Sum all values
avg(field)          # Average value
max(field)          # Maximum value
min(field)          # Minimum value
values(field)       # List unique values
list(field)         # List all values (with duplicates)
```

**Example:**
```spl
| stats dc(src_ip) as unique_sources,
        sum(totalSourceBytes) as total_traffic
```

**Result:** This calculates two things across all events: the number of distinct/unique source IP addresses and the total bytes transferred from all sources combined.

---

## SPL Level 6: The Where Command (Post-Processing Filter)

**Filter AFTER aggregation:**

```spl
index=network_traffic Tag=attack
| stats count by src_ip
| where count > 50
```

**Why where instead of search filter?**
- `where` works on the results of stats; Can compare calculated fields; More flexible expressions

**Comparison operators:**
- `>` greater than
- `<` less than
- `>=` greater or equal
- `<=` less or equal
- `=` equals
- `!=` not equals

---

## SPL Level 7: Creating New Fields with eval

**Transform and calculate:**

```spl
index=network_traffic
| eval total_bytes = totalSourceBytes + totalDestinationBytes
| eval mb_transferred = round(total_bytes / 1024 / 1024, 2)
| table src_ip, dest_ip, mb_transferred, Tag
| head 20
```

**What eval does:**
- Creates new calculated fields; Performs math operations; String manipulation; Conditional logic
- **table** -  specifies which fields to display and in what order

**Common eval functions:**
- Math: `+`, `-`, `*`, `/`
- `round(number, decimals)` - round numbers
- `if(condition, true_value, false_value)` - conditional

---

## SPL Level 8: Display Commands; Control what you see:

```spl
# Show specific fields in a table
| table field1, field2, field3

# Sort results
| sort -count          # descending (highest first)
| sort +duration       # ascending (lowest first)

# Limit results
| head 10              # top 10
| tail 5               # bottom 5

# Rename fields for clarity
| rename src_ip as "Source IP", dest_ip as "Dest IP"
```

**Example: Note that stats will specify the output fields; table not needed** 
```spl
index=network_traffic Tag=attack
| stats count by src_ip, protocolName
| sort -count
| head 20
| rename src_ip as "Attacker IP", protocolName as "Protocol"
```

---

## Common Query Pattern #1: Count Events by Category

**Use case:** How many events of each type?

```spl
index=network_traffic
| stats count by Tag
```

**Result:** 
```
Tag      count
attack   15000
normal   35000
```

**Extend it:**
```spl
index=network_traffic
| stats count by Tag, protocolName
```

**Result:** Breakdown by tag AND protocol

---

## Common Query Pattern #2: Find Top Values

**Use case:** What are the most frequent sources?

```spl
index=network_traffic Tag=attack
| stats count by src_ip
| sort -count
| head 10
```

**The pattern:**
1. Count by the field you care about
2. Sort descending
3. Limit to top N

**Try it with different fields:**
- Top destination IPs
- Most common ports
- Frequent applications

---

## Common Query Pattern #3: Calculate Percentages

**Use case:** What percentage of traffic is attacks?

```spl
index=network_traffic
| stats count by Tag
| eventstats sum(count) as total
| eval percentage = round((count/total)*100, 2)
| table Tag, count, percentage
```

**New command: eventstats**
- Like stats, but keeps all events
- Adds the aggregation as a new field
- Useful for ratios and percentages

---

## Common Query Pattern #4: Filter by Threshold

**Use case:** Only show sources with >100 attacks

```spl
index=network_traffic Tag=attack
| stats count by src_ip
| where count > 100
| sort -count
```

**The pattern:**
1. Aggregate data (stats)
2. Filter results (where)
3. Present nicely (sort)

**Threshold-based detection in action**

---

## Common Query Pattern #5: Data Volume Analysis

**Use case:** Find who's transferring the most data

```spl
index=network_traffic
| eval total_bytes = totalSourceBytes + totalDestinationBytes
| stats sum(total_bytes) as volume_bytes by src_ip
| eval volume_mb = round(volume_bytes/1024/1024, 2)
| sort -volume_mb
| head 10
| rename src_ip as "IP Address", volume_mb as "Volume (MB)"
```

**Detects potential data exfiltration**

---

## The Top Command (Quick Alternative)

**Shortcut for finding most common values:**

```spl
# Instead of this:
index=network_traffic | stats count by src_ip | sort -count | head 10

# Use this:
index=network_traffic | top limit=10 src_ip
```

**Top command automatically:**
- Counts occurrences
- Sorts descending
- Limits results
- Shows percentages

**Great for quick exploration**



---

## Critical Syntax Reminders

**Things that will cause errors:**

❌ **Missing pipe before commands**
```spl
index=network_traffic stats count     # WRONG
index=network_traffic | stats count   # RIGHT
```

❌ **Case-sensitive field names**
```spl
index=network_traffic tag=attack      # WRONG (lowercase)
index=network_traffic Tag=attack      # RIGHT (uppercase T)
```

❌ **Unbalanced parentheses**
```spl
| eval result = (field1 + field2      # WRONG
| eval result = (field1 + field2)     # RIGHT
```

---

## Debugging Strategy: Build Incrementally

**NEVER write a complex query all at once**

**Do this instead:**
```spl
# Test 1: Does basic search work?
index=network_traffic

# Test 2: Add your filter
index=network_traffic Tag=attack

# Test 3: Add simple stats
index=network_traffic Tag=attack | stats count

# Test 4: Add grouping
index=network_traffic Tag=attack | stats count by src_ip

# Test 5: Add sorting
index=network_traffic Tag=attack | stats count by src_ip | sort -count
```

**Each step should work before moving to the next**

---

## Using head for Testing

**Test queries faster with small samples:**

```spl
# Full query (slow for testing)
index=network_traffic 
| stats count by src_ip, dest_ip, appName

# Test version (fast!)
index=network_traffic | head 100
| stats count by src_ip, dest_ip, appName
```

**Remove `| head 100` when query logic is correct**

**Pro tip:** Use head liberally while developing

---

## The Field Sidebar - Your Best Friend

**How to use it effectively:**

1. **Explore fields:** Click to see top values
2. **Quick filter:** Click a value to add to search
3. **Verify spelling:** See exact field names (case-sensitive!)
4. **Understand data:** See what values exist

**Before writing any query:**
1. Run basic search: `index=network_traffic`
2. Look at field sidebar
3. Click fields to understand data
4. Then build your query

---

# Part 5: Lab Overview & Resources

---

## Your Lab: Network Security Analytics

**Dataset:** Network traffic flows (50,000 records)
- Normal traffic (~70%)
- Attack traffic (~30%)
  - Port scanning
  - Data exfiltration
  - DoS attacks
  - Service exploitation

**Your Mission:** Use SPL and statistical methods to detect and analyze attacks

---

## Lab Structure Overview

**Part 1:** Setup & Data Prep (15 pts)
- Install Splunk Enterprise
- Load network traffic dataset
- Verify data ingestion
- Understand field structure

**Part 2:** Statistical Threat Detection (35 pts)
- Detect data exfiltration using baselines
- Find port scanning with time windows
- Identify service exploitation patterns

---

## Lab Structure Overview (cont.)

**Part 3:** Dashboard Creation (25 pts)
- Build security monitoring dashboard
- 5 key panels showing different insights
- Interactive visualizations; Professional presentation

**Part 4:** Threat Hunting Investigation (20 pts)
- Investigate suspected C2 activity
- Apply multi-factor scoring methodology
- Document hypothesis and findings

**Part 5:** Critical Reflection (5 pts)
- Analyze effectiveness of your methods
- Discuss limitations and improvements

**Total:** 100 points


---

## Critical First Steps

**Before you start coding:**

1. ✅ Install Splunk Enterprise
2. ✅ Load the network traffic data
3. ✅ Verify with simple search: `index=network_traffic`
4. ✅ Set time range to "All time"
5. ✅ Explore fields in sidebar
6. ✅ Read through lab instructions
7. ✅ Bookmark the Help Guide

**Test your setup before attempting queries!**

---

## Troubleshooting Preview - **Top 3 issues students face:**

### 1. No Results Showing
- **Fix:** Set time range to "All time"
- **Fix:** Check field name spelling (case-sensitive!)
- **Fix:** Verify index name is correct

### 2. Query Errors
- **Fix:** Add `|` before commands
- **Fix:** Check parentheses balance
- **Fix:** Verify field names exist

### 3. Slow Queries
- **Fix:** Add filters early (before the pipe)
- **Fix:** Use `| head 100` for testing
- **Fix:** Limit time range if possible



---

## Lab Learning Objectives

**By completing this lab, you will:**

✅ Master SPL pipeline thinking  
✅ Write complex queries confidently  
✅ Apply statistical methods to detect anomalies  
✅ Build professional security dashboards  
✅ Conduct hypothesis-driven threat hunting  
✅ Document security findings professionally  




---

## Assessment Criteria Breakdown

**Technical Execution (60%):**
- Queries work correctly; Results are accurate
- Dashboard functions properly
- Proper SPL syntax

**Analytical Depth (30%):**
- Thoughtful interpretation of results
- Understanding of detection methods
- Security insights; Critical thinking

**Professional Presentation (10%):**
- Clear documentation; Well-organized report
- Proper formatting; Complete deliverables





---

# Advanced SPL & Threat Detection Techniques

---

## Today's Agenda

1. Quick Review & Questions
2. Time-Based Analysis in SPL
3. Threat Detection Methodologies
4. Attack Pattern Analysis
5. Advanced SPL Techniques
6. Live Lab Walkthrough



---

# Part 1: Time-Based Analysis in SPL

---

## Why Time Matters in Security

**Security is fundamentally time-based:**
- When did the attack happen?
- What was the attack rate?
- Were there patterns over time?
- Was it during business hours or off-hours?

**Every event has `_time` field - your most important field!**

**Today you'll learn:**
- Extract time components
- Create time windows
- Detect temporal anomalies
- Build time-series visualizations

---

## The _time Field

**Automatically available in every event:**

```spl
index=network_traffic
| table _time, src_ip, dest_ip, Tag
| head 10
```

**_time is special:**
- Always present
- Already formatted
- Used by time picker
- Foundation for temporal analysis

**Understanding _time is critical for your lab!**

---

## Extracting Time Components

**Break down timestamps into usable parts:**

```spl
index=network_traffic
| eval hour = strftime(_time, "%H")
| eval day_of_week = strftime(_time, "%A")
| eval date = strftime(_time, "%Y-%m-%d")
| table _time, hour, day_of_week, src_ip, Tag
| head 20
```

**Common format codes:**
- `%H` = Hour (00-23)
- `%A` = Day name (Monday, Tuesday...)
- `%Y` = Year (2024)
- `%m` = Month (01-12)
- `%d` = Day of month (01-31)

---

## Use Case: Off-Hours Detection

**Find activity outside business hours:**

```spl
index=network_traffic Tag=attack
| eval hour = strftime(_time, "%H")
| eval off_hours = if(hour < 6 OR hour > 22, "Yes", "No")
| stats count by off_hours
```

**Result:** Shows how many attacks occurred off-hours

**Why it matters:** Attackers often work when defenders sleep!

**Lab application:** Part 4 (C2 detection) uses this!

---

## Time Windows with bin - **Problem: Need to group events into time intervals**

**Solution:** The `bin` command

```spl
index=network_traffic Tag=attack
| bin _time span=5m
| stats count by _time
```

**What this does:**
- Creates 5-minute buckets
- Groups all events in each bucket
- Counts events per bucket

**Use cases:**
- Rate-based detection (events per minute)
- Burst detection
- Attack timeline visualization

---

## Time Windows: Practical Example

**Detect port scanning with time windows:**

```spl
index=network_traffic
| bin _time span=5m
| stats dc(destinationPort) as unique_ports by _time, src_ip
| where unique_ports > 10
| sort -unique_ports
```

**Logic:**
1. Group events into 5-minute windows
2. Count unique ports per source in each window
3. Flag sources scanning >10 ports in 5 minutes

**This IS one of your lab detection methods!**

---

## The timechart Command

**Create time-series visualizations:**

```spl
index=network_traffic
| timechart span=1h count by Tag
```

**What it does:**
- Automatically bins by time
- Groups by specified field
- Perfect for line/area charts

**Result:** Line chart showing attacks vs. normal traffic over time

**Your dashboard needs this!**

---

## Timechart Options

**Control the granularity:**

```spl
# By hour
| timechart span=1h count by protocolName

# By 15 minutes
| timechart span=15m sum(totalSourceBytes)

# By day
| timechart span=1d dc(src_ip) as unique_sources

# Automatic (Splunk chooses)
| timechart count by Tag
```

**Choosing span:**
- More data points → smaller span
- Overview visualization → larger span
- Lab dashboard → experiment to find best view!




---

# 🎯 Deep Dive: Time-Based Behavioral Analysis

**Essential for Lab Part 4 (Threat Hunting)**

---

## Why Time Matters for Threat Detection

**Attackers often operate during:**
- Nights and weekends (fewer people watching)
- Holidays (minimal staff)
- Off-business-hours (less likely to be noticed)

**Legitimate activity:**
- Follows business hours (mostly)
- Predictable patterns

**Goal:** Flag activity that happens at unusual times

---

## Extracting Time Components - Complete Pattern

**The `strftime()` function formats time:**

```spl
| eval hour = strftime(_time, "%H")
```
- Extracts hour in 24-hour format (00-23)

```spl
| eval day_of_week = strftime(_time, "%w")
```
- Extracts day as number (0=Sunday, 1=Monday, ..., 6=Saturday)

**Common format codes:**
- `%H` - Hour (00-23)
- `%w` - Day of week (0-6)
- `%A` - Day name ("Monday", "Tuesday", etc.)
- `%Y` - Year, `%m` - Month, `%d` - Day

---

## Creating an Off-Hours Detection Flag

**Complete pattern from the lab:**

```spl
| eval hour = strftime(_time, "%H"),
       day_of_week = strftime(_time, "%w"),
       off_hours = if((hour < 6 OR hour > 22) OR 
                      (day_of_week=0 OR day_of_week=6), 1, 0)
```

**Breaking it down:**
- `hour < 6 OR hour > 22` → Before 6am or after 10pm
- `day_of_week=0 OR day_of_week=6` → Sunday or Saturday
- `if(..., 1, 0)` → Creates binary flag (1=off-hours, 0=business-hours)

**Result:** Every event now has `off_hours` field (1 or 0)

---

## Using the Off-Hours Flag

**Count off-hours activity per source:**
```spl
| eval hour = strftime(_time, "%H"),
       day_of_week = strftime(_time, "%w"),
       off_hours = if((hour < 6 OR hour > 22) OR 
                      (day_of_week=0 OR day_of_week=6), 1, 0)
| stats sum(off_hours) as off_hours_count,
        count as total_connections
        by src_ip
| eval pct_off_hours = round((off_hours_count/total_connections)*100, 2)
| where off_hours_count > 5
| sort -pct_off_hours
```

**Shows:** Which sources have significant off-hours activity

---

## Time Window Analysis - Detecting Rapid Activity

**Detecting rapid activity in short time windows:**

```spl
| bin _time span=5m
| stats dc(destinationPort) as ports_in_5min,
        values(destinationPort) as ports
        by _time, src_ip
| where ports_in_5min > 4
```

**What this does:**
- `bin _time span=5m` → Groups events into 5-minute buckets
- Counts unique ports contacted in each 5-minute window
- Finds sources hitting 4+ ports in 5 minutes (port scan indicator)

**Why it matters:** Port scans happen fast; need tight time windows to detect

---

## Lab Application: Time Analysis

**You'll use time analysis for:**

1. **Port scanning detection**
   - 5-minute time windows
   - Rapid port scanning behavior

2. **C2 beaconing**
   - Off-hours connections
   - Regular timing patterns
   - Scoring based on when activity occurs

**Key concept:** Time context often reveals malicious intent




---

# Part 2: Threat Detection Methodologies

---

## Three Approaches to Detection

### 1. **Signature-Based Detection**
**Match known bad patterns**

**Examples:**
- Known malware hashes
- IP addresses on blocklists
- Specific attack signatures

**Pros:** Fast, low false positives  
**Cons:** Only finds known threats

---

## Three Approaches (cont.)

### 2. **Anomaly-Based Detection** ⭐
**Find statistical outliers**

**Examples:**
- Unusual data transfer volumes
- Off-hours activity
- Abnormal connection patterns
- Rate anomalies

**Pros:** Detects unknown/novel attacks  
**Cons:** Higher false positives

**Your lab focuses heavily on this approach!**

---

## Three Approaches (cont.)

### 3. **Behavioral Analysis**
**Understand attacker TTPs (Tactics, Techniques, Procedures)**

**Examples:**
- Reconnaissance → Exploitation → Lateral Movement
- Living off the land techniques
- Multi-stage attack campaigns

**Pros:** Context-aware, sophisticated  
**Cons:** Complex, requires expertise

**Your Part 4 (threat hunting) uses this!**

---

## Statistical Anomaly Detection Deep Dive

**Core principle:** Establish normal baseline → Find outliers

**Common techniques:**

### 1. Threshold-Based
```spl
| where count > 100
```
Simple but rigid

### 2. Standard Deviation
```spl
| where value > (avg + 2*stdev)
```
Adapts to data distribution



---

## Statistical Anomaly Detection Deep Dive

**Core principle:** Establish normal baseline → Find outliers

**Common techniques:**


### 3. Percentile-Based
```spl
| where value > p95
```
Robust to extreme values


---

## Implementing Baseline Detection in SPL

**Pattern: Calculate baseline, then find outliers**

```spl
index=network_traffic
| eventstats avg(totalSourceBytes) as baseline_avg,
             stdev(totalSourceBytes) as baseline_stdev
| eval threshold = baseline_avg + (2 * baseline_stdev)
| eval is_outlier = if(totalSourceBytes > threshold, 1, 0)
| where is_outlier=1
| stats count, sum(totalSourceBytes) by src_ip, Tag
```

**This is EXACTLY what you'll do in lab Part 2!**

---

## Why eventstats Instead of stats?

**Key difference:**

```spl
# stats - aggregates and groups (loses events)
| stats avg(bytes) by src_ip
# Result: One row per source with average

# eventstats - adds aggregate to EVERY event (keeps events)
| eventstats avg(bytes) as baseline
# Result: All events kept, plus new baseline field
```

**Use eventstats when you need to:**
- Compare individual events to aggregate
- Calculate thresholds
- Keep all event detail

**Your lab exfiltration detection needs this!**


---

# Part 3: Attack Pattern Analysis

---

## Attack Type 1: Port Scanning

**What is it?**
- Attacker probes multiple ports to find services
- Reconnaissance phase - happens BEFORE exploitation
- Quick successive connection attempts

**Characteristics:**
- Many connection attempts from one source
- Multiple different destination ports
- Short duration connections
- Often sequential port numbers (1, 2, 3... or 80, 443, 8080...)

---

## Port Scanning: Detection in SPL

**Method: Count unique ports per source in time window**

```spl
index=network_traffic
| bin _time span=5m
| stats dc(destinationPort) as unique_ports by _time, src_ip
| where unique_ports > 10
| sort -unique_ports
```

**Why this works:**
- Normal traffic: Single source contacts few ports
- Port scan: Single source contacts MANY ports in short time

**Lab threshold:** >15 unique ports in 5 minutes

**What would you expect from legitimate traffic? 1-3 ports typically**

---

## Port Scanning: Analysis Questions

**After running detection, ask:**

1. How many unique IPs were port scanning?
2. What was the maximum ports scanned by one source?
3. Were the scans labeled as attacks in Tag field?
4. What time periods saw most scanning activity?

**SPL to answer these:**
```spl
index=network_traffic
| bin _time span=5m
| stats dc(destinationPort) as unique_ports by _time, src_ip, Tag
| where unique_ports > 15
| stats count as scan_events,
        max(unique_ports) as max_ports
        by src_ip, Tag
| sort -max_ports
```

---

## Attack Type 2: Data Exfiltration

**What is it?**
- Unauthorized transfer of sensitive data outside network
- One of the most damaging attack outcomes
- Often happens AFTER initial compromise

**Characteristics:**
- Large outbound data transfers
- Unusual destinations (external IPs)
- Potentially off-hours activity
- Higher volume than baseline

**Detection approach: Statistical outlier analysis**

---

## Data Exfiltration: Detection Method

**Two-step process:**

**Step 1: Calculate normal baseline**
```spl
index=network_traffic
| stats avg(totalSourceBytes) as avg_bytes,
        stdev(totalSourceBytes) as stdev_bytes
```

**Step 2: Find outliers (>2 standard deviations)**
```spl
index=network_traffic
| eventstats avg(totalSourceBytes) as baseline_avg,
             stdev(totalSourceBytes) as baseline_stdev
| eval threshold = baseline_avg + (2 * baseline_stdev)
| where totalSourceBytes > threshold
| stats sum(totalSourceBytes) as total_volume by src_ip, Tag
| eval volume_mb = round(total_volume/1024/1024, 2)
| sort -volume_mb
```


---

# 🎯 Critical Concept: `eventstats` vs `stats`

**This is ESSENTIAL for the lab - pay close attention!**

---

## The Problem with `stats`

**What `stats` does:**
- Aggregates data (calculates count, sum, average, etc.)
- **Reduces** events to summary rows
- Loses individual event details

**Example:**
```spl
index=network_traffic sourcetype=csv
| stats avg(totalSourceBytes) as avg_bytes
```

**Result:** ONE row with the average
- You can't compare individual events to this average
- You've lost all your original data

**This won't work for anomaly detection!**

---

## The Solution: `eventstats`

**What `eventstats` does:**
- Calculates statistics like `stats`
- **Keeps** all original events
- **Adds** calculated statistics as new fields to every event

**Same example with `eventstats`:**
```spl
index=network_traffic sourcetype=csv
| eventstats avg(totalSourceBytes) as avg_bytes
```

**Result:** Every event now has an `avg_bytes` field
- You still have all your original data
- Every row can now compare itself to the average

**This is the key to detecting outliers!**

---

## When to Use Each Command

### Use `stats` when:
- You want summary reports
- You're grouping data (`by` clause)
- You want to reduce data volume
- Example: "Show me total traffic by source IP"

### Use `eventstats` when:
- You need to compare individual events to population statistics
- You're detecting anomalies
- You need to keep original event details
- Example: "Show me events that exceed the average"

---

## Real Lab Example: Data Exfiltration Detection

**The Goal:** Find transfers larger than "normal"

**Step 1: Calculate baseline with `eventstats`**
```spl
index=network_traffic sourcetype=csv
| eventstats avg(totalSourceBytes) as baseline_avg,
            stdev(totalSourceBytes) as baseline_stdev
```

Now every event has `baseline_avg` and `baseline_stdev` fields

**Step 2: Compare each event to the baseline**
```spl
| eval threshold = baseline_avg + (2 * baseline_stdev)
| where totalSourceBytes > threshold
```

**This only works because `eventstats` kept all the events!**

---

## Side-by-Side Comparison

```spl
# Using stats (WRONG for this purpose)
index=network_traffic sourcetype=csv
| stats avg(totalSourceBytes) as baseline_avg
# Result: 1 row, can't compare to individual events ❌

# Using eventstats (CORRECT)
index=network_traffic sourcetype=csv
| eventstats avg(totalSourceBytes) as baseline_avg
| where totalSourceBytes > baseline_avg
# Result: All events that exceed average ✅
```

**Key insight:** `eventstats` lets you "look at the whole forest while examining individual trees"

---

## 💡 Quick Check: Which Command?

**Scenario 1:** "Show me the top 10 source IPs by total bytes transferred"
- Answer: **`stats`** (you want a summary table)

**Scenario 2:** "Show me all connections where the transfer size is more than 2 standard deviations above average"
- Answer: **`eventstats`** (you need to compare each event to the average)

**Remember:** If you need to keep all events and add population statistics to them, use `eventstats`!


---

## Why Standard Deviation?

**Statistical reasoning:**

**In normal distribution:**
- 68% of data within 1σ of mean
- 95% of data within 2σ of mean
- 99.7% of data within 3σ of mean

**So if value > mean + 2σ:**
- It's in the top 2.5% of values
- Highly unusual
- Potentially malicious

**Lab uses 2σ threshold - balance between sensitivity and false positives**

---

## Attack Type 3: Denial of Service (DoS)

**What is it?**
- Overwhelm system resources
- Make services unavailable to legitimate users
- Volume-based attack

**Characteristics:**
- Extremely high packet/connection rates
- Many connections from same source
- Short duration connections (often incomplete)
- Single target under siege

---

## DoS Detection: Multiple Indicators

**Combine behavioral indicators:**

```spl
index=network_traffic
| bin _time span=5m
| stats count as connections,
        sum(totalSourcePackets) as total_packets,
        avg(duration) as avg_duration
        by _time, src_ip, dest_ip
| where connections > 100 AND avg_duration < 1
| eval packets_per_second = total_packets / (connections * avg_duration)
| where packets_per_second > 1000
| sort -connections
```

**Multi-factor detection is more accurate than single threshold!**

---

## Attack Type 4: Service Exploitation

**What is it?**
- Target specific vulnerable network services
- Attempt unauthorized access
- Often brute force or exploit-based

**High-Risk Ports:**
- 21 (FTP), 22 (SSH), 23 (Telnet)
- 445 (SMB), 3389 (RDP)
- Legacy/unencrypted protocols

**Detection: Monitor access patterns to these services**

---

## Service Exploitation Detection

**Method: Analyze traffic to vulnerable ports**

```spl
index=network_traffic
| where destinationPort IN (21, 22, 23, 445, 3389, 5900)
| stats count as attempts,
        dc(src_ip) as unique_sources,
        values(Tag) as tags
        by destinationPort, appName
| sort -attempts
```

**Analysis questions:**
- Which vulnerable services saw most attempts?
- How many unique attackers per service?
- What's the attack/normal ratio?


---

# 🎯 Understanding the `values()` Function

**Collecting Unique Values in Lists**

---

## What `values()` Does

**Purpose:** Shows all unique values of a field, grouped by another field

**Syntax:**
```spl
| stats values(field_to_collect) as list_name by grouping_field
```

**Result:** A comma-separated list of unique values

**Think of it as:** "Show me a list of all the different things this entity did"

---

## Practical Example: Port Scanning Detection

```spl
index=network_traffic sourcetype=csv
| stats dc(destinationPort) as unique_ports,
        values(destinationPort) as ports_contacted
        by src_ip
```

**Result:**
```
src_ip          | unique_ports | ports_contacted
192.168.1.50    | 15           | 21,22,23,80,443,445,3389,8080,...
10.0.0.100      | 3            | 80,443,8080
```

**Insight:** First IP contacted 15 different ports (suspicious!)

**Why this matters:** You can see WHAT the scanner was looking for

---

## More Examples from the Lab

**Example: Data Exfiltration - Where is data going?**
```spl
index=network_traffic sourcetype=csv
| where totalSourceBytes > 1000000
| stats count as transfer_count,
        sum(totalSourceBytes) as total_bytes,
        values(dest_ip) as destinations
        by src_ip
```

**Shows:** Which source IPs are sending large amounts of data, and to which destinations

**Pro tip:** Combine `dc()` to count unique items and `values()` to see what they are!

---

## `values()` vs `list()`

**Two similar functions:**

### `values(field)` 
- Shows **unique** values only
- No duplicates
- Example: `values(destinationPort)` → "80,443,22"

### `list(field)`
- Shows **all** values including duplicates
- Preserves order
- Example: `list(destinationPort)` → "80,80,443,80,22,443"

**For the lab: Use `values()` to see what unique things happened**



---

# 🎯 Advanced Filtering: Multiple Conditions

**Essential Techniques for Complex Detection**

---

## The `IN` Operator

**Checking if a field matches any value in a list:**

```spl
| where destinationPort IN (21,22,23,135,139,445,3389,5900)
```

**Much cleaner than:**
```spl
| where destinationPort=21 OR destinationPort=22 OR 
        destinationPort=23 OR destinationPort=135 OR ...
```

**Lab usage:** Filtering to high-risk service ports

**Makes your queries readable and maintainable!**

---

## Combining Conditions with AND/OR

**Using AND (both must be true):**
```spl
| where connections > 10 AND connections < 100
```
- Both conditions must be true
- Example: Regular but not excessive connections (beaconing pattern)

**Using OR (either can be true):**
```spl
| where totalSourceBytes > 1000000 OR totalDestinationBytes > 1000000
```
- Either condition can be true
- Example: Large transfers in either direction

---

## Range Checking Patterns

**Between two values:**
```spl
| where connections > 10 AND connections < 100
```

**Outside a range:**
```spl
| where totalSourceBytes < 1000 OR totalSourceBytes > 1000000
```
- Either very small or very large (skipping normal traffic)

**Threshold with additional conditions:**
```spl
| where totalSourceBytes > threshold AND destinationPort IN (21,22,23)
```
- Large transfers to risky services

---

## Complex Conditions with Parentheses

**Combining multiple logic operators:**
```spl
| where (hour < 6 OR hour > 22) OR (day_of_week=0 OR day_of_week=6)
```
- Parentheses control evaluation order
- Makes logic clear and explicit

**Without parentheses, logic can be ambiguous!**

---

## Comparing Fields to Each Other

**Field-to-field comparisons:**
```spl
| where totalSourceBytes > (totalDestinationBytes * 10)
```
- Asymmetric transfers (more sent than received - exfiltration pattern)

**Using calculated thresholds:**
```spl
| eventstats avg(totalSourceBytes) as baseline_avg,
            stdev(totalSourceBytes) as baseline_stdev
| eval threshold = baseline_avg + (2 * baseline_stdev)
| where totalSourceBytes > threshold
```

---

## Lab Examples Using These Techniques

**Data exfiltration (Part 2.1):**
```spl
| where totalSourceBytes > threshold
```

**Port scanning (Part 2.2):**
```spl
| where unique_ports > 10
| where ports_in_5min > 4
```

**Service exploitation (Part 2.3):**
```spl
| where destinationPort IN (21,22,23,135,139,445,3389,5900,8080)
```

**C2 detection (Part 4):**
```spl
| where c2_score >= 6
| where connections > 10 AND connections < 100
```




---

# Part 4: Advanced SPL Techniques

---

## Technique 1: Multi-Step eval

**Build complex calculations incrementally:**

```spl
index=network_traffic
| eval total_bytes = totalSourceBytes + totalDestinationBytes
| eval bytes_mb = total_bytes / 1024 / 1024
| eval bytes_mb_rounded = round(bytes_mb, 2)
| eval size_category = case(
    bytes_mb_rounded > 100, "Very Large",
    bytes_mb_rounded > 10, "Large",
    bytes_mb_rounded > 1, "Medium",
    1=1, "Small")
| table src_ip, dest_ip, bytes_mb_rounded, size_category, Tag
```

**Each eval builds on previous - easier to debug!**

---

## Technique 2: The case Statement

**Multi-condition logic:**

```spl
| eval risk_level = case(
    destinationPort=23, "Critical",
    destinationPort=21, "Critical",
    destinationPort IN (445, 3389), "High",
    destinationPort < 1024, "Medium",
    1=1, "Low")
```

**Pattern:**
```spl
case(
    condition1, value1,
    condition2, value2,
    condition3, value3,
    1=1, default_value)
```

**Note:** `1=1` is always true - the default case

---

## Technique 3: Scoring Systems

**Combine multiple indicators into single score:**

```spl
index=network_traffic
| eval hour = strftime(_time, "%H")
| eval score = 0
| eval score = score + if(hour < 6 OR hour > 22, 3, 0)
| eval score = score + if(totalSourceBytes > 1000000, 3, 0)
| eval score = score + if(duration < 10, 2, 0)
| eval score = score + if(destinationPort IN (21,23,445), 2, 0)
| where score >= 6
| table _time, src_ip, dest_ip, score, Tag
| sort -score
```

**This is your Part 4 (C2 detection) approach!**

---

## Why Scoring Systems?

**Advantages:**
- Reduces false positives (multiple weak signals → strong signal)
- Tunable (adjust point values)
- Explainable (can see why it scored high)
- Mimics analyst thinking

**Example interpretation:**
- Score 3-4: Low suspicion
- Score 5-6: Medium suspicion
- Score 7+: High suspicion, investigate!

**Your lab:** Tune scoring to find C2 without excessive false positives

---

# 🎯 Deep Dive: Building Threat Detection Scores

**The Pattern Used in Lab Part 4**

---

## The Scoring Pattern

**Concept:** Assign points for suspicious behaviors, then filter by total score

**Real-world use:** This is how many security tools detect threats
- Each indicator adds to a "risk score"
- High scores trigger alerts
- Allows tuning (raise/lower thresholds)

**You'll use this extensively in Part 4 (Threat Hunting)**

---

## Basic Scoring Structure

**Step 1: Initialize the score**
```spl
| eval threat_score = 0
```

**Step 2: Add points for each suspicious behavior**
```spl
| eval threat_score = threat_score + if(condition1, points1, 0)
| eval threat_score = threat_score + if(condition2, points2, 0)
| eval threat_score = threat_score + if(condition3, points3, 0)
```

**Step 3: Filter by threshold**
```spl
| where threat_score >= 6
```

**Each `eval` incrementally builds the score!**

---

## Real Lab Example: C2 Detection

**Detecting Command & Control beaconing:**

```spl
index=network_traffic sourcetype=csv
| eval c2_score = 0
| eval c2_score = c2_score + if(off_hours_count > 5, 3, 0)
| eval c2_score = c2_score + if(connections > 10 AND connections < 100, 3, 0)
| eval c2_score = c2_score + if(avg_KB < 50, 2, 0)
| eval c2_score = c2_score + if(port_diversity > 1 AND port_diversity < 5, 2, 0)
| where c2_score >= 6
```

**Scoring logic:**
- Off-hours activity: 3 points (very suspicious)
- Regular connections (beaconing): 3 points
- Small transfers (commands): 2 points
- Limited ports (targeted): 2 points
- **Maximum possible: 10 points**
- **Threshold: 6+ points**

---

## Why This Scoring Approach Works

**Flexible detection:**
- Not every indicator needs to be present
- Multiple weak indicators = strong signal
- Can tune sensitivity by adjusting points or threshold

**Example scenarios:**

| Scenario | Off-hours | Connections | Small data | Port diversity | Total | Alert? |
|----------|-----------|-------------|------------|----------------|-------|--------|
| Legit backup | ✅ 3 | ❌ 0 | ❌ 0 | ❌ 0 | 3 | No |
| C2 beacon | ✅ 3 | ✅ 3 | ✅ 2 | ✅ 2 | 10 | Yes |
| Port scan | ❌ 0 | ✅ 3 | ✅ 2 | ❌ 0 | 5 | No |
| Night C2 | ✅ 3 | ✅ 3 | ❌ 0 | ✅ 2 | 8 | Yes |

**Reduces false positives while catching real threats!**

---

## Building Your Own Scoring System

**Process:**
1. Identify suspicious behaviors
2. Weight them by severity (more suspicious = more points)
3. Set a threshold that balances false positives vs missed threats
4. Test and tune

**Lab tip:** The queries are provided, but you'll need to explain:
- Why each indicator gets its point value
- Why the threshold is set where it is
- What modifications would improve the system

**This analytical thinking is what earns full credit!**



---

## Technique 4: Transaction Command

**Group related events:**

```spl
index=network_traffic
| transaction src_ip, dest_ip maxspan=1h
| where eventcount > 100
| table src_ip, dest_ip, eventcount, duration
```

**Use case:** Find long-lived connections (potential C2 beaconing)

**Parameters:**
- `maxspan`: Max time between events in transaction
- `maxpause`: Max time gap allowed within transaction

---

## Technique 5: Streamstats (Running Aggregates)

**Calculate cumulative/running statistics:**

```spl
index=network_traffic
| sort _time
| streamstats sum(totalSourceBytes) as cumulative_bytes by src_ip
| eval mb_so_far = round(cumulative_bytes/1024/1024, 2)
| table _time, src_ip, totalSourceBytes, mb_so_far, Tag
```

**Shows progressive data transfer - useful for exfiltration analysis!**

---

## Combining Techniques: Real Detection Query

**Example: Find sophisticated data exfiltration**

```spl
index=network_traffic
| eval hour = strftime(_time, "%H")
| eval off_hours = if(hour < 6 OR hour > 22, 1, 0)
| eventstats avg(totalSourceBytes) as baseline,
             stdev(totalSourceBytes) as stdev
| eval z_score = (totalSourceBytes - baseline) / stdev
| eval score = 0
| eval score = score + if(z_score > 2, 3, 0)
| eval score = score + if(off_hours=1, 2, 0)
| eval score = score + if(duration > 300, 1, 0)
| where score >= 4
| stats sum(totalSourceBytes) as total,
        count as connections,
        avg(score) as avg_score
        by src_ip, Tag
| eval total_mb = round(total/1024/1024, 2)
| sort -total_mb
```


---

# Part 5: Live Lab Walkthrough

---

## Lab Part 2: Detection Walkthrough

**Let's walk through ONE detection together**

**Scenario:** Detect data exfiltration

**My thought process:**
1. What defines exfiltration? → Large data transfer out
2. How do I quantify "large"? → Compare to baseline
3. What's the baseline? → Calculate avg + stdev
4. How do I find outliers? → Filter for values > threshold
5. How do I verify? → Check Tag field

**Let's code this in Splunk right now!**

---

## Live Coding: Step-by-Step

**Open Splunk and follow along:**

```spl
# Step 1: Explore the data
index=network_traffic
| table _time, src_ip, dest_ip, totalSourceBytes, Tag
| head 50
```

**What do we see?**
- Range of byte values
- Mix of attack/normal traffic
- Need to find statistical baseline

---

## Live Coding (cont.)

```spl
# Step 2: Calculate statistics
index=network_traffic
| stats avg(totalSourceBytes) as avg_bytes,
        stdev(totalSourceBytes) as stdev_bytes,
        max(totalSourceBytes) as max_bytes
```

**Interpret results:**
- avg_bytes ≈ ? (note the value)
- stdev_bytes ≈ ? (note the value)
- Threshold = avg + 2*stdev

**Calculate threshold: ____________**

---

## Live Coding (cont.)

```spl
# Step 3: Find outliers using threshold
index=network_traffic
| eventstats avg(totalSourceBytes) as baseline,
             stdev(totalSourceBytes) as stdev
| eval threshold = baseline + (2 * stdev)
| where totalSourceBytes > threshold
| stats count as exfil_events,
        sum(totalSourceBytes) as total_bytes,
        values(Tag) as tag_values
        by src_ip
| eval total_mb = round(total_bytes/1024/1024, 2)
| sort -total_mb
```

---

## Live Coding: Analysis

**Look at results and discuss:**

1. How many sources exceeded threshold?
2. What percentage were labeled as attacks?
3. Any false positives (normal traffic flagged)?
4. What was the largest transfer amount?

**This analytical thinking is what grades well!**

**Your lab report must explain your reasoning like this**

---

## Dashboard Panel Example

**Let's create one dashboard panel together:**

1. Click "Dashboards" → "Create New Dashboard"
2. Name it "Security Monitoring"
3. Click "Add Panel" → "New from Search"
4. Enter this query:

```spl
index=network_traffic
| timechart span=1h count by Tag
```

5. Choose "Area Chart" visualization
6. Format: Stack mode = stacked
7. Save panel as "Attack vs Normal Timeline"

**You'll create 5 panels like this!**

---

## Common Mistakes to Avoid

**From years of grading this lab:**

❌ **Time range not set to "All time"**
- Students get no results, panic

❌ **Field name typos** (case-sensitive!)
- `tag` vs `Tag`, `Src_ip` vs `src_ip`

❌ **Missing pipes before commands**
- `index=x stats count` vs `index=x | stats count`

❌ **Overly complex queries all at once**
- Build incrementally, test each step!

❌ **No screenshots taken during work**
- Take screenshots AS YOU WORK, not after!

---

## Success Strategy Recap

**Follow this process for EVERY query:**

1. ✅ Start with basic search
2. ✅ Add ONE filter/command at a time
3. ✅ Test after each addition
4. ✅ Check result count makes sense
5. ✅ Verify against Tag field when possible
6. ✅ Screenshot when working
7. ✅ Document your reasoning

**Professional analysts work this way - not cowboy coding!**


---

## Career Relevance

**These skills directly apply to:**

**SOC Analyst ($60-80K):**
- Write detection rules; Investigate alerts
- Monitor dashboards; Hunt threats

**Security Engineer ($90-120K):**
- Design SIEM architecture
- Optimize queries; Build automation
- Integrate data sources

**Threat Hunter ($80-110K):**
- Hypothesis-driven investigation
- Pattern recognition; Behavioral analysis
- Proactive defense

---

## Certifications Path

**After this lab:**

1. **Splunk Core Certified User** ← You're ready for this!
   - Free training available
   - Tests basic SPL skills
   - Resume-worthy cert

2. **Splunk Core Certified Power User**
   - Advanced SPL
   - $100-200 exam fee

3. **Splunk Enterprise Security Certified Admin**
   - Security-focused
   - Premium certification

**This lab = Foundation for certification path**








---

# Bonus Slides (For Reference)

---

## SPL Quick Reference

```spl
# SEARCH & FILTER
index=network_traffic sourcetype=csv Tag=attack
| where field > value

# AGGREGATION
| stats count, sum(field), avg(field), dc(field) by groupfield

# TIME
| timechart span=1h count by field
| bin _time span=5m
| eval hour = strftime(_time, "%H")

# CALCULATIONS
| eval new_field = field1 + field2
| eval category = case(condition1, value1, condition2, value2, 1=1, default)

# DISPLAY
| table field1, field2, field3
| sort -field
| head 10
| rename old_name as "New Name"
```

---

## Common Time Format Codes

```spl
%Y  - Year (2024)
%m  - Month (01-12)
%d  - Day of month (01-31)
%H  - Hour (00-23)
%M  - Minute (00-59)
%S  - Second (00-59)
%A  - Day name (Monday, Tuesday...)
%w  - Day number (0-6, 0=Sunday)

# Examples:
| eval hour = strftime(_time, "%H")
| eval date = strftime(_time, "%Y-%m-%d")
| eval day = strftime(_time, "%A")
```

---

## Statistical Functions

```spl
# Aggregations in stats
count              - Count events
count(field)       - Count non-null values
dc(field)          - Distinct count (unique)
sum(field)         - Sum all values
avg(field)         - Average value
min(field)         - Minimum value
max(field)         - Maximum value
stdev(field)       - Standard deviation
perc95(field)      - 95th percentile
values(field)      - List unique values
list(field)        - List all values
```

---

## Troubleshooting Checklist

**No results?**
- [ ] Time range set to "All time"?
- [ ] Index name spelled correctly?
- [ ] Field names case-sensitive correct?
- [ ] Using correct sourcetype?

**Query error?**
- [ ] Pipe `|` before each command?
- [ ] Parentheses balanced?
- [ ] Quotes matched?
- [ ] Comma in right places?


---

## Troubleshooting Checklist


**Wrong results?**
- [ ] Logic correct?
- [ ] Compared with Tag field?
- [ ] Used head to examine raw data?
- [ ] Checked field sidebar for actual values?

---

## Dataset Field Reference

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| src_ip | IP | Source IP address | 192.168.1.100 |
| dest_ip | IP | Destination IP address | 10.0.0.50 |
| sourcePort | Number | Source port | 51234 |
| destinationPort | Number | Destination port | 443 |
| protocolName | String | Protocol | TCP, UDP, ICMP |
| appName | String | Application | HTTP, SSH, DNS |
| duration | Number | Flow duration (seconds) | 127.5 |
| totalSourceBytes | Number | Bytes from source | 5000 |
| totalDestinationBytes | Number | Bytes from destination | 15000 |
| Tag | String | Label | "normal" or "attack" |

---

## Common Port Numbers

| Port | Service | Security Note |
|------|---------|---------------|
| 21 | FTP | Unencrypted, exploit target |
| 22 | SSH | Brute force target |
| 23 | Telnet | Insecure, legacy |
| 80 | HTTP | Web traffic |
| 443 | HTTPS | Encrypted web |
| 445 | SMB | File sharing, ransomware vector |
| 3389 | RDP | Remote desktop, credential attacks |
| 53 | DNS | Name resolution, tunneling risk |
| 25 | SMTP | Email, spam/phishing vector |

---

## Lab Grading Rubric

| Part | Points | What's Graded |
|------|--------|---------------|
| Part 1: Setup | 15 | Data loaded, verified, documented |
| Part 2: Detection | 35 | Queries work, analysis sound, insights clear |
| Part 3: Dashboard | 25 | Functional, professional, informative |
| Part 4: Threat Hunting | 20 | Methodology applied, findings documented |
| Part 5: Reflection | 5 | Critical thinking, lessons learned |
| Quality | 5 | Professionalism, completeness, formatting |
| **Total** | **100** | |
