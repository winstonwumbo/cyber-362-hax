---
marp: true
theme: default
paginate: true
header: 'Week 4: Understanding the Basics of Python'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }
---

# Part 1: Python Fundamentals & Environment Setup

---

## Overview
- Development Environment Setup
- Python Basics Review
- Working with Strings and Text Processing
- File I/O Operations
- Regular Expressions (Regex) Basics
- Hands-on Practice with Log Files

---

## Part 1: Development Environment Setup

### Tools We'll Use
- **Anaconda/Miniconda**: Package management
- **Jupyter Notebook**: Interactive coding environment  
- **VS Code**: Code editor and development
- **Python Libraries**: pandas, matplotlib, re

### Quick Environment Check
```bash
# Check if tools are installed
conda --version
python --version
jupyter --version
code --version
```

---

## Anaconda/Conda Basics

### Why Conda?
- Manages Python packages and dependencies
- Creates isolated environments
- Prevents version conflicts
- Easy installation of data science libraries

---

## Anaconda/Conda Basics

### Essential Conda Commands
```bash
# Create new environment
conda create -n cybersec python=3.9

# Activate environment
conda activate cybersec

# Install packages
conda install pandas matplotlib seaborn
conda install -c conda-forge jupyter

# List environments
conda env list

# Deactivate environment
conda deactivate
```

---

## Jupyter Notebook Essentials

### What is Jupyter?
- Interactive computing environment
- Mix code, text, and visualizations
- Perfect for data analysis and exploration

### Key Jupyter Operations
- **Cell Types**: Code vs Markdown
- **Running Cells**: Shift+Enter
- **Modes**: Edit (green) vs Command (blue)
- **Magic Commands**: `%matplotlib inline`


---

## Jupyter Notebook Essentials (continued)

### Jupyter Best Practices
- Use descriptive markdown headers
- Comment your code extensively
- Break analysis into logical sections
- Save frequently (Ctrl+S)

---

## VS Code for Python

### Why VS Code?
- Excellent Python support
- Integrated terminal
- Git integration
- Extensions for productivity

### Essential VS Code Features
- **Python Extension**: Syntax highlighting, debugging
- **File Explorer**: Navigate project files
- **Integrated Terminal**: Run commands without leaving editor
- **IntelliSense**: Code completion and suggestions

---

## Part 2: Python Fundamentals Review

### Variables and Data Types
```python
# Basic data types
name = "Alice"           # String
age = 25                 # Integer
height = 5.6             # Float
is_student = True        # Boolean

# Lists (ordered, mutable)
ports = [22, 80, 443, 3389]
ip_addresses = ["192.168.1.1", "10.0.0.1"]

# Dictionaries (key-value pairs)
server_info = {
    "hostname": "web-server-01",
    "ip": "192.168.1.100",
    "status": "active"
}
```

---

## Part 2: Python Fundamentals Review

### Working with Lists
```python
# Adding elements
ports.append(8080)
ports.extend([8443, 9000])

# Accessing elements
first_port = ports[0]      # First element
last_port = ports[-1]     # Last element

# List comprehensions (powerful!)
high_ports = [p for p in ports if p > 1000]
```

---

## String Manipulation for Log Analysis

### Why Strings Matter in Cybersecurity
- Log files are primarily text
- Need to extract specific information
- Parse timestamps, IPs, error messages

---

## String Manipulation for Log Analysis

### Essential String Operations
```python
log_line = "2025-08-24T00:46:02 UFW BLOCK SRC=192.168.1.100 DST=10.0.0.1"

# Basic operations
log_line.upper()           # Convert to uppercase
log_line.lower()           # Convert to lowercase
log_line.strip()           # Remove whitespace
log_line.split()           # Split into list

# Checking content
"UFW BLOCK" in log_line    # True
log_line.startswith("2025") # True
log_line.endswith("10.0.0.1") # True

# String formatting
ip = "192.168.1.1"
message = f"Blocking traffic from {ip}"
```

---

## File Operations

### Reading Files
```python
# Method 1: Basic file reading
with open('logfile.txt', 'r') as file:
    content = file.read()
    print(content)

# Method 2: Line by line (better for large files)
with open('logfile.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Method 3: Read all lines into list
with open('logfile.txt', 'r') as file:
    lines = file.readlines()
```

---

## File Operations

### File Path Handling
```python
import os

# Check if file exists
if os.path.exists('myfile.txt'):
    print("File found!")

# Get file size
file_size = os.path.getsize('myfile.txt')

# List files in directory
files = os.listdir('.')
```

---

## Regular Expressions (Regex) Basics

### What is Regex?
- Pattern matching for text
- Extract specific information from strings
- Essential for log file analysis

---

## Regular Expressions (Regex) Basics

### Common Regex Patterns
```python
import re

text = "IP: 192.168.1.100 PORT: 3389"

# Find IP addresses
ip_pattern = r'\d+\.\d+\.\d+\.\d+'
ip_match = re.search(ip_pattern, text)
if ip_match:
    ip_address = ip_match.group()  # "192.168.1.100"

# Find port numbers
port_pattern = r'PORT: (\d+)'
port_match = re.search(port_pattern, text)
if port_match:
    port_number = port_match.group(1)  # "3389"

# Find all matches
all_numbers = re.findall(r'\d+', text)  # ['192', '168', '1', '100', '3389']
```
---


## Regular Expressions (Regex) Basics

### Regex for Log Analysis
```python
log_line = "2025-08-24T00:46:02.964288-04:00 stage-hax kernel: [UFW BLOCK] SRC=172.30.58.132"

# Extract timestamp
timestamp_pattern = r'^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})'
timestamp = re.search(timestamp_pattern, log_line).group(1)

# Extract source IP
src_pattern = r'SRC=(\d+\.\d+\.\d+\.\d+)'
src_ip = re.search(src_pattern, log_line).group(1)
```

---

# Part 2: Data Analysis with Pandas & Visualization

---

## Overview
- Introduction to Pandas
- Data Loading and Cleaning
- Data Analysis and Filtering
- Basic Visualizations with Matplotlib
- Putting It All Together: Mini Log Analysis
- Lab Preparation

---

## Part 1: Introduction to Pandas

### What is Pandas?
- Python library for data manipulation
- Think "Excel for Python"
- Perfect for analyzing structured data
- Built on top of NumPy

### Key Pandas Concepts
- **DataFrame**: Table with rows and columns
- **Series**: Single column of data
- **Index**: Row labels
- **Columns**: Column names

---

## Creating DataFrames

### From Dictionaries
```python
import pandas as pd

# Create DataFrame from dictionary
security_data = {
    'ip_address': ['192.168.1.1', '10.0.0.1', '172.16.0.1'],
    'port': [22, 80, 443],
    'protocol': ['SSH', 'HTTP', 'HTTPS'],
    'blocked': [True, False, False]
}

df = pd.DataFrame(security_data)
print(df)
```

---

## Creating DataFrames

### From Lists of Dictionaries
```python
# Each dictionary becomes a row
log_entries = [
    {'timestamp': '2025-08-24 10:00:01', 'ip': '192.168.1.1', 'action': 'BLOCK'},
    {'timestamp': '2025-08-24 10:00:02', 'ip': '10.0.0.1', 'action': 'ALLOW'},
    {'timestamp': '2025-08-24 10:00:03', 'ip': '192.168.1.1', 'action': 'BLOCK'}
]

logs_df = pd.DataFrame(log_entries)
```

---

## Loading Data from Files

### CSV Files
```python
# Read CSV file
df = pd.read_csv('security_logs.csv')

# Common parameters
df = pd.read_csv('logs.csv', 
                 sep=',',           # Delimiter
                 header=0,          # First row as column names
                 parse_dates=['timestamp'],  # Parse date columns
                 na_values=['NULL', 'N/A'])  # Missing value indicators
```

---

## Loading Data from Files

### Text Files (Custom Parsing)
```python
# Read text file and parse manually
data = []
with open('firewall.log', 'r') as file:
    for line in file:
        if 'BLOCK' in line:
            # Parse line and create dictionary
            parsed = parse_firewall_line(line)
            data.append(parsed)

df = pd.DataFrame(data)
```

---

## Essential DataFrame Operations

### Exploring Data
```python
# Basic info about DataFrame
df.head()          # First 5 rows
df.tail()          # Last 5 rows
df.info()          # Data types and non-null counts
df.describe()      # Statistical summary
df.shape           # (rows, columns)
df.columns         # Column names
```

---

## Essential DataFrame Operations

### Selecting Data
```python
# Select single column (returns Series)
ips = df['ip_address']

# Select multiple columns (returns DataFrame)
subset = df[['ip_address', 'port']]

# Select rows by condition
blocked_traffic = df[df['blocked'] == True]
ssh_traffic = df[df['port'] == 22]

# Multiple conditions
ssh_blocked = df[(df['port'] == 22) & (df['blocked'] == True)]
```


---

## Data Filtering and Analysis

### Common Filtering Operations
```python
# Filter by string content
suspicious_ips = df[df['ip_address'].str.contains('192.168')]

# Filter by numeric ranges
high_ports = df[df['port'] > 1000]

# Filter by list membership
web_ports = df[df['port'].isin([80, 443, 8080])]

# Remove missing values
clean_df = df.dropna()
```

---

## Data Filtering and Analysis

### Grouping and Aggregation
```python
# Count occurrences
ip_counts = df['ip_address'].value_counts()

# Group by column and aggregate
port_stats = df.groupby('port').agg({
    'ip_address': 'count',     # Count of IPs per port
    'blocked': 'sum'           # Number of blocked attempts per port
})

# Multiple grouping
ip_port_groups = df.groupby(['ip_address', 'port']).size()
```

---

## Working with Timestamps

### Converting to DateTime
```python
# Convert string to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Extract date components
df['hour'] = df['timestamp'].dt.hour
df['day'] = df['timestamp'].dt.day
df['weekday'] = df['timestamp'].dt.day_name()
```

### Time-based Analysis
```python
# Filter by time range
today_logs = df[df['timestamp'].dt.date == pd.Timestamp.today().date()]

# Resample by time intervals
hourly_counts = df.set_index('timestamp').resample('1H').size()
```

---

## Part 2: Data Visualization

### Why Visualize Security Data?
- Spot patterns quickly
- Identify anomalies
- Communicate findings effectively
- Support decision-making

### Matplotlib Basics
```python
import matplotlib.pyplot as plt

# Basic line plot
plt.figure(figsize=(10, 6))
plt.plot([1, 2, 3, 4], [10, 20, 15, 25])
plt.title('Sample Plot')
plt.xlabel('X Label')
plt.ylabel('Y Label')
plt.show()
```

---

## Security-Relevant Visualizations

### Bar Charts for Categorical Data
```python
# Plot top attacking IPs
top_ips = df['ip_address'].value_counts().head(10)

plt.figure(figsize=(12, 6))
top_ips.plot(kind='bar')
plt.title('Top 10 Attacking IP Addresses')
plt.xlabel('IP Address')
plt.ylabel('Number of Attempts')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

---

## Security-Relevant Visualizations

### Time Series for Trends
```python
# Plot attacks over time
hourly_attacks = df.groupby(df['timestamp'].dt.hour).size()

plt.figure(figsize=(10, 6))
hourly_attacks.plot(kind='line', marker='o')
plt.title('Attack Attempts by Hour of Day')
plt.xlabel('Hour (24-hour format)')
plt.ylabel('Number of Attacks')
plt.grid(True)
plt.show()
```

---

## Security-Relevant Visualizations

### Pie Charts for Proportions
```python
# Show distribution of protocols
protocol_dist = df['protocol'].value_counts()

plt.figure(figsize=(8, 8))
plt.pie(protocol_dist.values, labels=protocol_dist.index, autopct='%1.1f%%')
plt.title('Distribution of Attack Protocols')
plt.show()
```

---

## Part 3: Putting It All Together

### What You'll Need for the Main Lab
1. **File Reading**: Parse UFW, Apache, and SSH logs
2. **Regex Skills**: Extract IPs, ports, timestamps, file paths
3. **Pandas Operations**: DataFrame creation, filtering, grouping
4. **Data Correlation**: Match IPs across different log sources
5. **Visualization**: Create security dashboards
6. **Analysis**: Identify attack patterns and trends


---

## Part 3: Putting It All Together

### Key Functions You'll Use
```python
# Essential imports
import pandas as pd
import matplotlib.pyplot as plt
import re
from datetime import datetime

# File reading pattern
with open('logfile.txt', 'r') as file:
    for line in file:
        # Parse each line
        pass

# DataFrame creation pattern
data = []
# Parse logs and append to data
df = pd.DataFrame(data)

# Basic analysis pattern
counts = df['column'].value_counts()
filtered = df[df['column'] == 'value']
grouped = df.groupby('column').size()
```

---

## Common Pitfalls and Tips

### Debugging Tips
- **Print frequently**: Use `print()` to check intermediate results
- **Check data types**: Use `df.dtypes` to verify column types
- **Handle missing data**: Use `df.dropna()` or `df.fillna()`
- **Small datasets first**: Test with small files before large ones

### Performance Tips
- **Read files line by line** for large files
- **Use vectorized operations** instead of loops
- **Filter early** to reduce dataset size

---

## Common Pitfalls and Tips

### Best Practices
- **Comment your code** extensively
- **Use descriptive variable names**
- **Break complex tasks** into smaller functions
- **Save your work** frequently in Jupyter

---

## Resources for Continued Learning

### Documentation
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Documentation](https://matplotlib.org/stable/contents.html)
- [Python Regex Guide](https://docs.python.org/3/library/re.html)

### Practice Platforms
- [Kaggle Learn](https://www.kaggle.com/learn)
- [DataCamp](https://www.datacamp.com)
- [Python.org Tutorial](https://docs.python.org/3/tutorial/)
