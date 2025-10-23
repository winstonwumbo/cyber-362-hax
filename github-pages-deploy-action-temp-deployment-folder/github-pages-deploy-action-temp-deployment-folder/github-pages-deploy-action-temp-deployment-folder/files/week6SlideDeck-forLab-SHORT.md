---
marp: true
theme: default
paginate: true
header: 'Week 6-7 Lab Support'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }
---

<!-- _class: lead -->
# Cybersecurity Log Analysis Fundamentals
## Core Skills for Multi-Source Analysis

**Cybersecurity Analytics**






---

## Data Structures: Choosing the Right Tool

**The Problem:** Cybersecurity logs require different ways to store and access data

**Python's Solution:** Multiple built-in structures, each optimized for specific tasks

| Structure | Best For | Key Feature |
|-----------|----------|-------------|
| **List** | Ordered sequences | Maintains order, allows duplicates |
| **Set** | Unique collections | Fast lookups, automatic deduplication |
| **Dictionary** | Key-value mapping | Direct access by key |
| **DataFrame** | Tabular analysis | Spreadsheet-like operations |

**The Key:** Match the structure to your question



---

## Data Structures for This Week's Lab

**You'll use 4 structures - here's exactly when and why:**

| Structure | Lab Tasks | Why This One? |
|-----------|-----------|---------------|
| **List of dictionaries** | Tasks 1.1, 1.2 (parsing) | Build data row-by-row as you parse |
| **DataFrame** | All analysis tasks | Once parsed, DataFrames let you filter, group, visualize |
| **Set** | Task 2.2 (IP comparison) | Fast way to find overlapping IPs |
| **Dictionary** | Task 3.1 (risk scoring) | Map each IP to its risk score |

**The pattern:** Parse with lists → Analyze with DataFrames → Compare with sets → Score with dictionaries





---
## LIST
What it is: An ordered collection that allows duplicates

```python
ips = ['192.168.1.1', '192.168.1.1', '10.0.0.5']  # duplicates allowed
print(ips[0])  # Access by position: '192.168.1.1'
```

## Characteristics:

Maintains order (first item stays first)
Allows duplicates
Access by index position: ips[0], ips[1]

Lab use: you'd use it temporarily while reading a file line by line



---
## SET
What it is: An unordered collection of unique items

```python
ips = {'192.168.1.1', '192.168.1.1', '10.0.0.5'}  # duplicates removed automatically
print(ips)  # {'192.168.1.1', '10.0.0.5'}
```

## Characteristics:
No duplicates (automatically removes them)
No order
Super fast lookups: if ip in ip_set
Set operations: intersection (&), union (|), difference (-)


---
## SET
What it is: An unordered collection of unique items

Lab use (Task 2.2): Finding overlapping IPs across different log sources

```python
firewall_ips = {'185.177.72.108', '172.30.58.132'}
error_ips = {'185.177.72.108'}
overlap = firewall_ips & error_ips  # {'185.177.72.108'}
```


---
## DICTIONARY

What it is: Key-value pairs for mapping

```python
ip_risk = {
    '192.168.1.1': 35,      # key: value
    '10.0.0.5': 12,
    '128.118.15.15': -10
}
print(ip_risk['192.168.1.1'])  # 35

```

## Characteristics:

Each key maps to one value
Keys must be unique (IP can only have one score)
Fast lookup by key
Access by key name: ip_risk['192.168.1.1']



---
## DICTIONARY

What it is: Key-value pairs for mapping

Lab use (Task 3.1): Storing risk scores where each IP has one score

```python
ip_risk = {}
ip_risk['185.177.72.108'] = 0
ip_risk['185.177.72.108'] += 5  # Add points for bad behavior

```




---
## LIST OF DICTIONARIES

What it is: A list where each item is a dictionary


```python
data = [
    {'client_ip': '192.168.1.1', 'blocked_file': '.env'},
    {'client_ip': '192.168.1.1', 'blocked_file': '.env.backup'},
    {'client_ip': '10.0.0.5', 'blocked_file': '/home/.env'}
]
```

## Characteristics:

Each dictionary represents one structured record (one log entry)
The list holds multiple records
Maintains order of log entries
Perfect intermediate format before DataFrame


---
## LIST OF DICTIONARIES

What it is: A list where each item is a dictionary

Lab use (Tasks 1.1, 1.2): Parsing logs where each line has multiple fields

```python
data = []
for line in file:
    data.append({
        'client_ip': extract_ip(line),
        'blocked_file': extract_file(line)
    })
# Then convert: df = pd.DataFrame(data)
```

Why not just a list? Because each log entry has multiple pieces of info (IP and filename). A dictionary groups them together.

Why not just a dictionary? Because you have multiple log entries with no natural key. What would you use as keys? Entry numbers 0, 1, 2? That's just a list with extra steps.





---
## DATAFRAME

What it is: A table with rows and columns (like Excel)

```python
df = pd.DataFrame([
    {'client_ip': '192.168.1.1', 'blocked_file': '.env'},
    {'client_ip': '10.0.0.5', 'blocked_file': '/home/.env'}
])

print(df)
#       client_ip    blocked_file
# 0  192.168.1.1            .env
# 1    10.0.0.5      /home/.env

```

## Characteristics:

Rows = individual records (log entries)
Columns = fields (client_ip, blocked_file, etc.)
Can filter, sort, group, aggregate
Built-in methods: .mean(), .value_counts(), .groupby()




---
## DATAFRAME

What it is: A table with rows and columns (like Excel)

Lab use (ALL analysis tasks): Once you've parsed, DataFrames make analysis easy

```python
# Count how many times each file was targeted
file_counts = error_df['blocked_file'].value_counts()

# Filter to only 404 errors
errors_404 = app_df[app_df['responseStatusCode'] == 404]

# Calculate statistics
mean_time = app_df['durationMs'].mean()
```




---
## When to use...
| Need to... | Use... | Example |
|------------|--------|---------|
| Parse multi-field log entries | List of dicts | `[{'ip': '...', 'file': '...'}, ...]` |
| Analyze, filter, visualize data | DataFrame | `df[df['status'] == 404]` |
| Find unique IPs across sources | Set | `set1 & set2` |
| Map each IP to a score | Dictionary | `{'192.168.1.1': 35}` |







---

## Decision Tree: Which Structure for Log Analysis?

Start Here: What do you need to do?
├─ Keep log entries in order?
│  └─ YES → List or DataFrame
│
├─ Find unique IPs/users quickly?
│  └─ YES → Set
│
├─ Count occurrences per IP?
│  └─ YES → Counter or defaultdict(int)
│
├─ Map IP to risk score?
│  └─ YES → Dictionary
│
└─ Analyze multiple columns together?
└─ YES → DataFrame





---

## Log Analysis Workflow
```python
# Step 1: Parse into LIST (flexible while building)
log_entries = []
with open('errorLog.txt', 'r') as file:
    for line in file:
        log_entries.append({'ip': ip, 'file': filename})

# Step 2: Convert to DATAFRAME (powerful for analysis)
error_df = pd.DataFrame(log_entries)

# Step 3: Extract unique IPs to SET (fast comparisons)
unique_ips = set(error_df['client_ip'])

# Step 4: Build risk scores in DICT (key-value mapping)
from collections import defaultdict
ip_risk = defaultdict(int)
for ip in error_df['client_ip']:
    ip_risk[ip] += 5

# Step 5: Back to DATAFRAME for final analysis
risk_df = pd.DataFrame(list(ip_risk.items()), 
                       columns=['ip', 'risk_score'])

```





---

## Task 1.1 & 1.2: Why List of Dictionaries?

Why list of dictionaries?

Each log line = one dictionary
List grows as you parse each line
Easy to convert to DataFrame when done


---

## Task 1.1 & 1.2: Why List of Dictionaries?

**Your parsing code will look like this:**
```python
# Start with empty LIST
data = []

# Read file line by line
with open('errorLog.txt', 'r') as file:
    for line in file:
        if 'client denied' in line:
            # Extract data with regex
            ip = extract_ip(line)
            filename = extract_file(line)
            
            # Add a DICTIONARY for this log entry
            data.append({
                'client_ip': ip,
                'blocked_file': filename
            })

# Convert to DATAFRAME for analysis
error_df = pd.DataFrame(data)

```





---

## Task 2.2: Why Sets for IP Comparison?

Why sets?

Automatically gives you unique IPs
Intersection (&) finds overlaps instantly
Much faster than nested loops through DataFrames

---

## Task 2.2: Why Sets for IP Comparison?

**Your lab asks: "Do any IPs appear in multiple log sources?"**
```python
# Extract unique IPs from each source
firewall_ips = set(firewall_df['src_ip'])
# Result: {'185.177.72.108', '172.30.58.132'}

error_ips = set(error_df['client_ip'])
# Result: {'185.177.72.108'}

auth_ips = set(auth_df['login_ip'])
# Result: {'128.118.15.15'}

# Find overlap with one line
overlap = firewall_ips & error_ips
# Result: {'185.177.72.108'}

print(f"IPs in both firewall AND error logs: {overlap}")

```






---

## Task 3.1: Why Dictionary for Risk Scoring?

Why dictionary?

Each IP maps to exactly one score
Easy to accumulate points: ip_risk[ip] += 5
Can convert to DataFrame when ready to visualize

---

## Task 3.1: Why Dictionary for Risk Scoring?

**Your lab asks: "Calculate risk score for each IP"**
```python
# Initialize empty DICTIONARY
ip_risk = {}

# Add 5 points for each error log entry
for ip in error_df['client_ip']:
    if ip not in ip_risk:
        ip_risk[ip] = 0
    ip_risk[ip] += 5

# Add 3 points for each firewall block
for ip in firewall_df['src_ip']:
    if ip not in ip_risk:
        ip_risk[ip] = 0
    ip_risk[ip] += 3

# Result: {'185.177.72.108': 35, '172.30.58.132': 12, ...}

# Convert to DataFrame for plotting
risk_df = pd.DataFrame(list(ip_risk.items()), 
                       columns=['ip', 'risk_score'])

```









---

<!-- _class: lead -->
# Essential Matplotlib Visualizations

---

## Basic Bar Chart

```python
import matplotlib.pyplot as plt

# Simple bar chart
categories = ['High Risk', 'Medium Risk', 'Low Risk']
counts = [2, 5, 10]

plt.bar(categories, counts)
plt.title('Risk Distribution')
plt.xlabel('Risk Level')
plt.ylabel('Count')
plt.show()
```

**For lab:** Count how many times each file was targeted

---

## Customizing Bar Colors

```python
# Different color for each bar
colors = ['darkred', 'orange', 'green']
plt.bar(categories, counts, color=colors)

# Conditional colors
colors = ['red' if score > 0 else 'green' 
          for score in risk_scores]
plt.bar(ip_addresses, risk_scores, color=colors)
```

**Lab requirement:** Red for high risk, green for low/negative

---

## Horizontal Bar Charts

```python
# For long labels (like IP addresses)
ips = ['185.177.72.108', '172.30.58.132', '128.118.15.15']
scores = [35, 12, -10]

plt.barh(ips, scores)  # barh = horizontal
plt.xlabel('Risk Score')
plt.ylabel('IP Address')
plt.title('IP Risk Scores')

# Add vertical line at x=0
plt.axvline(x=0, color='black', linestyle='-', linewidth=0.8)

plt.show()
```

**Use when:** Y-axis labels are long (IPs, filenames, URLs)

---

## Rotating X-Axis Labels

```python
# When labels overlap
file_paths = ['/var/www/.env', '/var/www/.env.backup', 
              '/home/user/.env', '/etc/.env']
counts = [3, 2, 1, 1]

plt.bar(file_paths, counts)
plt.xticks(rotation=45, ha='right')  # Rotate 45 degrees, right-aligned
plt.title('Files Targeted')
plt.tight_layout()  # Prevents label cutoff
plt.show()
```

**Lab uses this for:** File path chart in Task 2.1

---

## Histogram with Reference Lines

```python
# Response time distribution
response_times = app_df['durationMs']

plt.hist(response_times, bins=40, edgecolor='black', alpha=0.7)

# Add vertical lines for statistics
mean_val = response_times.mean()
median_val = response_times.median()
p95_val = response_times.quantile(0.95)

plt.axvline(mean_val, color='red', linestyle='--', 
            linewidth=2, label=f'Mean: {mean_val:.1f}')
plt.axvline(median_val, color='green', linestyle='--', 
            linewidth=2, label=f'Median: {median_val:.1f}')
plt.axvline(p95_val, color='orange', linestyle='--', 
            linewidth=2, label=f'95th: {p95_val:.1f}')

plt.xlabel('Duration (ms)')
plt.ylabel('Frequency')
plt.title('Response Time Distribution')
plt.legend()
plt.show()
```

---

## Line Chart for Time Series

```python
# Activity by hour
hourly_counts = app_df.groupby(
    app_df['TimeUTC'].dt.hour
).size()

plt.plot(hourly_counts.index, hourly_counts.values, 
         marker='o', linewidth=2)
plt.xlabel('Hour (24-hour format)')
plt.ylabel('Number of Requests')
plt.title('Application Activity by Hour')
plt.xticks(range(0, 24))  # Show all hours
plt.grid(True, alpha=0.3)
plt.show()
```

**Lab uses this for:** Temporal analysis in Task 3.3


---

## Adding Value Labels to Bars

```python
# Bar chart with numbers on top
status_codes = [200, 302, 404, 500]
counts = [1450, 80, 30, 10]

bars = plt.bar(status_codes, counts, color=['green', 'blue', 'orange', 'red'])

# Add count on top of each bar
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height,
             f'{int(height)}',
             ha='center', va='bottom')

plt.xlabel('Status Code')
plt.ylabel('Count')
plt.title('HTTP Response Codes')
plt.show()
```

**Lab uses this for:** Status code chart in Task 3.2

---

## Chart Checklist

**Every chart must have:**
- [ ] Title (what am I looking at?)
- [ ] X-axis label with units
- [ ] Y-axis label with units
- [ ] Readable labels (rotate if needed)
- [ ] Appropriate colors (red=bad, green=good)
- [ ] Legend (if multiple series)
- [ ] `plt.tight_layout()` before show (prevents cutoff)

```python
plt.title('Your Title Here')
plt.xlabel('X-axis Label (units)')
plt.ylabel('Y-axis Label (units)')
plt.tight_layout()
plt.show()
```








---

## Quick Reference: Key Functions

```python
# File I/O
with open('file.txt', 'r') as f:
    for line in f:

# Regex
import re
match = re.search(r'pattern', line)
if match:
    result = match.group(1)

# Sets
unique_ips = set(df['ip'])
overlap = set1.intersection(set2)
overlap = set1 & set2

# Dictionaries
risk = {}
risk[ip] = risk.get(ip, 0) + 5

# DateTime
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['hour'] = df['timestamp'].dt.hour

# Plotting
plt.bar(x, y)
plt.barh(y, x)
plt.axvline(x, ...)  # Vertical line
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.legend()
plt.show()
```






---

<!-- _class: lead -->
# Practical Statistics for Cybersecurity

---

## Statistics You Actually Need

**For this lab:**
- Mean (average)
- Median (middle value)
- Percentiles (95th = threshold for "slow")
- Min/Max

**NOT needed (yet):**
- Standard deviation
- Hypothesis testing
- Complex statistical tests



---

## Mean vs Median: Why Both Matter in Cyberecurity

**The Core Problem:** Cybersecurity data is full of outliers (attacks, anomalies, errors)

**Mean and Median tell different stories:**

| Metric | What It Shows | When It Misleads |
|--------|---------------|------------------|
| **Mean** | Mathematical average | Heavily affected by outliers |
| **Median** | Middle value (50th percentile) | Ignores the outliers completely |
| **Gap between them** | Presence of anomalies | - |

**Security insight:** When mean >> median, you have outliers worth investigating

---

## Real Example: Application Response Times
```python
# Your application response times (milliseconds)
response_times = [45, 48, 50, 52, 49, 51, 47, 48, 50, 2500]
#                                                      ^^^^
#                                               Suspicious outlier!

mean = np.mean(response_times)      # 294 ms
median = np.median(response_times)  # 49 ms
```
Two very different stories:
📊 Mean (294ms): "Application is slow, everything takes 294ms on average"

Misleading! Only 1 out of 10 requests is actually slow

📊 Median (49ms): "Typical user experience is fast at 49ms"

Accurate! Shows what most users actually experience

The gap (294 - 49 = 245ms) tells you: You have outliers that need investigation




---

## Why Median is Your Friend in Cyberecurity

Median is resistant to outliers:


```python
# Scenario 1: Normal operation
times_normal = [45, 48, 50, 52, 49]
mean = 48.8 ms
median = 49 ms
# Mean ≈ Median → Healthy, consistent performance

# Scenario 2: Under DDoS attack (resource exhaustion)
times_attack = [45, 48, 50, 52, 49, 5000, 4800, 6200]
mean = 1530 ms    # Looks terrible!
median = 51 ms    # Shows most users still OK
# Mean >> Median → Attack affecting some requests, not all

```

Why this matters:

Median tells you if MOST users are affected or just some
Helps prioritize response: "Is everyone down or just edge cases?"
Prevents panic over isolated incidents


---
## Percentiles: Defining "Normal" vs "Abnormal"

The 95th percentile is your threshold for "slow":


```python

p95 = app_df['durationMs'].quantile(0.95)  # e.g., 180ms

# By definition:
# - 95% of requests are FASTER than 180ms
# - 5% of requests are SLOWER than 180ms

# Find the slow ones
slow_requests = app_df[app_df['durationMs'] > p95]
print(f"Slow requests to investigate: {len(slow_requests)}")

```

Cybersecurity use cases:

SLA monitoring: "99% of requests must complete under 200ms"
Anomaly detection: Anything above 95th percentile is unusual
Attack detection: Spike in requests above 95th percentile = possible attack

Why 95th and not max? Max is ONE data point (could be a fluke). 95th percentile shows a consistent pattern.




---
## Reporting Statistics in Your BLUF

❌ BAD (only mean):

"Application response time averaged 294ms"

✓ GOOD (mean + median + percentile):

"Application showed healthy performance with median response time of 49ms. Mean of 294ms indicates presence of outlier requests. 95% of requests completed under 180ms. Recommend investigating the 45 requests (2.9%) exceeding 95th percentile for potential attack indicators."

The rule: Always report BOTH mean and median for cybersecurity metrics. The comparison tells the real story.





--- 
## Quick Reference: When to Use Which

# Use MEDIAN when:
- Describing typical user experience
- Data has outliers (cybersecurity logs always do)
- Want to know "what most people see"

# Use MEAN when:
- Need mathematical average for calculations
- Data is normally distributed (rare in cybersecurity)
- Comparing against industry benchmarks



--- 
## Quick Reference: When to Use Which


# Use BOTH when:
- Writing cybersecurity reports (always!)
- The gap between them reveals anomalies
- Need complete picture of performance

# Use PERCENTILES when:
- Setting SLA thresholds
- Defining "abnormal" behavior
- Identifying outliers for investigation




---
## Common Patterns and What They Mean

| Pattern | Mean vs Median | Cybersecurity Interpretation |
|---------|----------------|-------------------------|
| **Normal bell curve** | Mean ≈ Median | Healthy system, consistent performance |
| **Right skew** | Mean >> Median | Outliers present - investigate slow requests |
| **Tight clustering** | Low std dev, Mean ≈ Median | Very consistent - could indicate rate limiting working |
| **Bimodal (two peaks)** | Depends | Two user populations or attack vs normal traffic |













---

## Calculating Basic Statistics

```python
# Response time statistics
response_times = app_df['durationMs']

mean_time = response_times.mean()
median_time = response_times.median()
min_time = response_times.min()
max_time = response_times.max()

# Percentiles
p95 = response_times.quantile(0.95)  # 95th percentile
p99 = response_times.quantile(0.99)  # 99th percentile

print(f"Mean: {mean_time:.2f} ms")
print(f"Median: {median_time:.2f} ms")
print(f"95th percentile: {p95:.2f} ms")
```

---

## Mean vs Median: Why Both Matter

```python
# Example: Response times
times = [45, 48, 50, 52, 49, 51, 47, 2500]  # One outlier!

mean = np.mean(times)      # 355 ms (skewed by outlier)
median = np.median(times)  # 49.5 ms (not affected)

print(f"Mean: {mean:.1f} ms")     # 355.1 ms - misleading!
print(f"Median: {median:.1f} ms") # 49.5 ms - typical value
```

**Cybersecurity insight:** When mean >> median, you have outliers
(possible attacks or performance issues)

---

## Finding Anomalies with Percentiles

```python
# Define "slow" as anything above 95th percentile
p95_threshold = app_df['durationMs'].quantile(0.95)

# Find slow requests
slow_requests = app_df[app_df['durationMs'] > p95_threshold]

print(f"95th percentile: {p95_threshold:.1f} ms")
print(f"Slow requests: {len(slow_requests)}")
print(f"Percentage slow: {len(slow_requests)/len(app_df)*100:.1f}%")

# By definition, should be ~5% of requests
# If much more, something's wrong!
```

**Lab uses this:** Task 2.3 requires percentile-based anomaly detection

---

## Value Counts: Your Best Friend

```python
# How many of each status code?
status_counts = app_df['responseStatusCode'].value_counts()
print(status_counts)

# Sort by index (status code number) instead
status_counts_sorted = app_df['responseStatusCode'].value_counts().sort_index()

# How many of each file was targeted?
file_counts = error_df['blocked_file'].value_counts()
print(file_counts)

# Most common to least common
print(file_counts.head())
```

**When to use:** Counting occurrences of categorical data

---

## GroupBy for Time Analysis

```python
# Count requests by hour
hourly_counts = app_df.groupby(
    app_df['TimeUTC'].dt.hour
).size()

print(hourly_counts)
# Output:
# 0     45
# 1     32
# 2     28
# ...

# Can also group by multiple things
daily_source_counts = timeline_df.groupby([
    timeline_df['timestamp'].dt.date,
    'source'
]).size()
```




---

<!-- _class: lead -->
# Part 10: Lab Task Breakdown

---

## Task 1.1: Error Log Parsing (12 pts)

**What you're doing:**
- Open errorLog.txt
- Find lines with "client denied by server configuration"
- Extract client IP and blocked filename
- Create DataFrame

**Key regex patterns:**
```python
r'\[client ([\d\.]+):'      # IP address
r'configuration: (.+)      # Filename
```

**Expected result:** ~7 rows with columns ['client_ip', 'blocked_file']

---

## Task 1.2: Auth Log Parsing (12 pts)

**What you're doing:**
- Open authLog.txt
- Find lines with "Accepted publickey for"
- Extract username and source IP
- Add 'event' column with 'successful_login'

**Key regex patterns:**
```python
r'for (\w+) from'           # Username
r'from ([\d\.]+) port'      # IP address
```

**Expected result:** ~3 rows with columns ['user', 'login_ip', 'event']

---

## Task 1.3: CSV Loading (6 pts)

**What you're doing:**
- Load logs_result.csv
- Convert TimeUTC to datetime
- Explore the data

```python
app_df = pd.read_csv('logs_result.csv')
app_df['TimeUTC'] = pd.to_datetime(app_df['TimeUTC'])

print(app_df.info())
print(app_df.describe())
print(app_df.head())
```

**Expected result:** 1570 rows, 28 columns

---

## Task 2.1: Attack Target Analysis (10 pts)

**What you're doing:**
- Count how many times each file was targeted
- Create bar chart
- Identify pattern in filenames

```python
file_counts = error_df['blocked_file'].value_counts()

plt.bar(range(len(file_counts)), file_counts.values)
plt.xticks(range(len(file_counts)), file_counts.index,
           rotation=45, ha='right')
# ... labels and show
```

**Expected insight:** All files are .env variants (credentials)

---

## Task 2.2: IP Correlation (12 pts)

**What you're doing:**
- Extract unique IPs from each log source
- Use set operations to compare
- Analyze cybersecurity implications

```python
firewall_ips = set(firewall_df['src_ip'])
error_ips = set(error_df['client_ip'])
auth_ips = set(auth_df['login_ip'])

overlap_fw_err = firewall_ips & error_ips
overlap_err_auth = error_ips & auth_ips
```

**Expected insight:** Different IPs = good isolation

---

## Task 2.3: Response Time Stats (8 pts)

**What you're doing:**
- Calculate mean, median, 95th percentile
- Find slow requests (> p95)
- Create histogram with reference lines

```python
mean_val = app_df['durationMs'].mean()
median_val = app_df['durationMs'].median()
p95_val = app_df['durationMs'].quantile(0.95)

plt.hist(app_df['durationMs'], bins=40)
plt.axvline(mean_val, color='red', linestyle='--', label='Mean')
plt.axvline(median_val, color='green', linestyle='--', label='Median')
plt.axvline(p95_val, color='orange', linestyle='--', label='95th')
plt.legend()
```

---

## Task 3.1: Risk Scoring (10 pts)

**What you're doing:**
- Build dictionary of IP risk scores
- +5 per error log entry, +3 per firewall block, -10 per login
- Create horizontal bar chart with colors

```python
ip_risk = {}

# Add points from each source
for ip in error_df['client_ip']:
    ip_risk[ip] = ip_risk.get(ip, 0) + 5

# Convert to DataFrame, sort, plot with colors
colors = ['red' if score > 0 else 'green' 
          for score in risk_df['risk_score']]
plt.barh(risk_df['ip'], risk_df['risk_score'], color=colors)
```

---

## Task 3.2: Status Code Analysis (8 pts)

**What you're doing:**
- Count each HTTP status code
- Create bar chart with conditional colors
- Interpret results

```python
status_counts = app_df['responseStatusCode'].value_counts().sort_index()

# Color: green for 2xx/3xx, red for 4xx/5xx
colors = ['green' if code < 400 else 'red' 
          for code in status_counts.index]

plt.bar(status_counts.index, status_counts.values, color=colors)
```

**Expected insight:** Mostly 200 (success), some 302 (redirect)

---

## Task 3.3: Temporal Analysis (7 pts)

**What you're doing:**
- Extract hour from timestamps
- Group by hour and count
- Create line chart

```python
app_df['hour'] = app_df['TimeUTC'].dt.hour
hourly_counts = app_df.groupby('hour').size()

plt.plot(hourly_counts.index, hourly_counts.values, 
         marker='o', linewidth=2)
plt.xticks(range(0, 24))
plt.grid(True, alpha=0.3)
```

**Expected insight:** Activity pattern indicates human vs automated


---

## Quick Reference Card

```python
# FILE I/O
with open('file.txt', 'r') as f:
    for line in f:

# REGEX
import re
match = re.search(r'pattern (capture)', line)
if match:
    result = match.group(1)

# SETS
ips1 = set(df['ip'])
overlap = ips1 & ips2

# DATETIME
df['time'] = pd.to_datetime(df['time'])
df['hour'] = df['time'].dt.hour

# STATISTICS
df['col'].mean()
df['col'].median()
df['col'].quantile(0.95)
df['col'].value_counts()

# PLOTTING
plt.bar(x, y) / plt.barh(y, x)
plt.axvline(x, color='red', linestyle='--')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()
```
