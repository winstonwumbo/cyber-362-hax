---
marp: true
theme: default
paginate: true
header: 'Foundational Tools'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }
---

# Cybersecurity Analytics Tools
## Week 2 - Foundation Tools

**Course**: Cybersecurity Analytics - CYBER 362

---

# The Data-Driven Security Landscape

- Modern cybersecurity generates massive amounts of data from logs, network traffic, and threat intelligence
- Security analysts need tools to process, analyze, and visualize this data to identify threats
- Manual analysis is impossible at enterprise scale - automation and programming are essential
- These tools form the backbone of modern Security Operations Centers (SOCs)

---

# Real-World Security Data Challenges

- Network logs can generate gigabytes of data per hour
- Threat detection requires pattern recognition across millions of events
- Security teams need reproducible analysis workflows for compliance and reporting
- False positive reduction requires statistical analysis and machine learning

---

# Python - The Security Analyst's Swiss Army Knife

- Most popular language in cybersecurity (used by 78% of security professionals)
- Extensive libraries for network analysis, malware analysis, and data processing
- Easy to learn syntax allows focus on security concepts rather than programming complexity
- Strong community support with security-specific packages and frameworks

---

# Conda - Environment Management Made Simple

- Eliminates "it works on my machine" problems common in security tool deployment
- Manages complex dependencies between security libraries (Scapy, NetworkX, pandas)
- Allows easy switching between different project environments
- Industry standard for data science and security research teams

---

# VS Code - Professional Development Environment

- Free, lightweight, yet powerful enough for enterprise security work
- Excellent debugging capabilities for security script development
- Built-in Git integration for version control of security playbooks
- Extensive marketplace of security-focused extensions

---

# Jupyter Notebooks - Interactive Security Analysis

- Perfect for exploratory data analysis of security incidents
- Combines code, visualizations, and documentation in one place
- Ideal for creating reproducible security reports and threat analysis
- Standard tool for security research and threat hunting

---

# High-Demand Security Roles Using These Tools

- **Security Data Analyst**: $75k-$120k (Python, Jupyter for log analysis)
- **Threat Hunter**: $85k-$140k (Python scripting, data visualization)
- **Security Engineer**: $90k-$150k (Python automation, environment management)
- **Cybersecurity Researcher**: $80k-$130k (Jupyter notebooks, reproducible research)

---

# Industry Adoption Statistics

- 89% of Fortune 500 companies use Python in their security operations
- Jupyter notebooks are standard in 67% of security research positions
- VS Code is the most popular IDE among security professionals (42% market share)
- Conda/Anaconda used by 71% of data-focused security teams

---

# Emerging Security Career Paths

- **AI/ML Security Specialist**: Growing 34% annually, heavily Python-focused
- **Cloud Security Analyst**: Requires scripting and automation skills
- **DevSecOps Engineer**: Combines development tools with security practices
- **Threat Intelligence Analyst**: Data analysis and visualization expertise essential

---

# Python in Cybersecurity Context

- Interpreted language perfect for rapid security script development
- Rich ecosystem: pandas for data analysis, Scapy for network analysis, requests for API interactions
- Cross-platform compatibility crucial for diverse security environments
- Readable syntax reduces errors in critical security automation

---

# Key Python Libraries for cybersecurity

- **pandas**: Log file analysis and security metrics processing
- **Scapy**: Network packet manipulation and analysis
- **requests**: API interactions with security tools and threat feeds
- **matplotlib/seaborn**: Security data visualization and reporting

---

# Why Environment Management Matters

- Security tools often have conflicting dependencies
- Different projects may require different versions of the same library
- Reproducible environments ensure consistent analysis results
- Team collaboration requires shared, documented environments

---

# Conda vs Other Package Managers

- Handles both Python and non-Python packages (crucial for security tools)
- Better at resolving complex dependency conflicts than pip
- Built-in virtual environment management
- Package caching improves installation speed for large security libraries

---

# VS Code Essential Features

- Integrated terminal for running security scripts and managing conda environments
- IntelliSense for Python reduces syntax errors in security automation
- Git integration for version control of security playbooks and incident response procedures
- Extensions marketplace includes security-specific tools and linters

---

# VS Code Extensions

- Python extension with debugging and IntelliSense
- Jupyter extension for notebook development
- GitLens for collaborative security project management
- Security-focused extensions for code scanning and vulnerability detection

---

# Interactive Analysis Workflow

- Exploratory data analysis of security incidents in real-time
- Combine code execution with narrative documentation of findings
- Easy sharing of threat analysis with stakeholders
- Visualization capabilities for security dashboards and reports

---

# Notebook Best Practices

- Document your threat hunting methodology for reproducibility
- Use markdown cells to explain your security analysis approach
- Version control notebooks to track changes in security procedures
- Export results for integration with security information systems

---
# Hands-on Work
---

# Setting Up Your First Security Analysis Environment

**Step-by-step demonstration:**

1. **Create a new conda environment**
```bash
conda create -n security_analysis python=3.11
conda activate security_analysis
```

2. **Install essential security packages**
```bash
conda install pandas matplotlib seaborn requests
pip install scapy
```

3. **Open VS Code and select your environment**
```bash
code .
# Use Ctrl+Shift+P -> "Python: Select Interpreter"
# Choose your security_analysis environment
```

---

# Your First Security Script

**Create `log_analyzer.py`:**

```python
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

# Sample security log analysis
def analyze_failed_logins(log_file):
    """Analyze failed login attempts from security logs"""
    # Read log data
    df = pd.read_csv(log_file)
    
    # Filter failed login attempts
    failed_logins = df[df['event_type'] == 'failed_login']
    
    # Count attempts by hour
    failed_logins['hour'] = pd.to_datetime(failed_logins['timestamp']).dt.hour
    hourly_counts = failed_logins.groupby('hour').size()
    
    # Visualize the data
    plt.figure(figsize=(10, 6))
    hourly_counts.plot(kind='bar')
    plt.title('Failed Login Attempts by Hour')
    plt.xlabel('Hour of Day')
    plt.ylabel('Number of Failed Attempts')
    plt.show()
    
    return hourly_counts

# Run the analysis
if __name__ == "__main__":
    print("Security Log Analyzer v1.0")
    # results = analyze_failed_logins('security_logs.csv')
    print("Analysis complete!")
```

---

# Running Your Security Script

- Open integrated terminal in VS Code (Ctrl+`)
- Ensure your conda environment is activated
- Run: `python log_analyzer.py`
- Use VS Code debugger to step through security analysis logic

---

# Creating Your First Security Notebook

**Launch Jupyter in VS Code:**
1. Open VS Code with your security_analysis environment active
2. Install Jupyter extension if not already installed
3. Create new file: `threat_analysis.ipynb`
4. Select your conda environment as the kernel

---

# Interactive Threat Hunting Notebook

**Cell 1: Setup and Data Loading**
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configure plotting
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

print("Threat Hunting Analysis - Initialized")
```

---

# Sample Network Data Generation

**Cell 2: Load Sample Network Data**
```python
# Simulate network traffic data for analysis
np.random.seed(42)
dates = pd.date_range(start='2024-01-01', periods=1000, freq='H')

network_data = pd.DataFrame({
    'timestamp': dates,
    'src_ip': np.random.choice(['192.168.1.10', '192.168.1.20', '10.0.0.5'], 1000),
    'dst_port': np.random.choice([80, 443, 22, 3389, 445], 1000),
    'bytes_transferred': np.random.exponential(1000, 1000),
    'connection_duration': np.random.exponential(30, 1000)
})

print(f"Loaded {len(network_data)} network records")
network_data.head()
```

---

# Threat Detection Analysis

```python
# Identify potential suspicious activity
suspicious_thresholds = {
    'high_data_transfer': network_data['bytes_transferred'].quantile(0.95),
    'long_connections': network_data['connection_duration'].quantile(0.95)
}

# Flag suspicious connections
network_data['suspicious'] = (
    (network_data['bytes_transferred'] > suspicious_thresholds['high_data_transfer']) |
    (network_data['connection_duration'] > suspicious_thresholds['long_connections'])
)

suspicious_count = network_data['suspicious'].sum()
print(f"Identified {suspicious_count} potentially suspicious connections")

# Visualize findings
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))

# Plot 1: Data transfer distribution
network_data['bytes_transferred'].hist(bins=50, ax=ax1, alpha=0.7)
ax1.axvline(suspicious_thresholds['high_data_transfer'], color='red', linestyle='--', 
           label='Suspicious Threshold')
ax1.set_title('Data Transfer Distribution')
ax1.set_xlabel('Bytes Transferred')
ax1.legend()

# Plot 2: Suspicious activity timeline
daily_suspicious = network_data.groupby(network_data['timestamp'].dt.date)['suspicious'].sum()
daily_suspicious.plot(ax=ax2, marker='o')
ax2.set_title('Suspicious Activity Timeline')
ax2.set_xlabel('Date')
ax2.set_ylabel('Suspicious Connections')

plt.tight_layout()
plt.show()
```

---

# Running the Notebook

- Execute cells sequentially using Shift+Enter
- Use "Run All" for complete analysis workflow
- Save outputs and visualizations directly in the notebook
- Export to PDF/HTML for security incident reports

---

# Development Workflow Recommendations

- Always use version control (Git) for security scripts and notebooks
- Document your threat hunting methodologies in markdown cells
- Use conda environments to isolate different security projects
- Regular backup of analysis notebooks and critical security tools

---

# Security-Specific Considerations

- Never hardcode credentials in your analysis scripts
- Use environment variables for sensitive configuration
- Be cautious when analyzing live malware samples
- Follow responsible disclosure practices when finding vulnerabilities

---

# Your Analytics Toolkit

- **Python**: Your primary analysis and automation language
- **Conda**: Ensures consistent, reproducible security environments  
- **VS Code**: Professional development environment for security tools
- **Jupyter**: Interactive platform for threat hunting and incident analysis

---

# Preparing for Real-World cybersecurity Work

- Practice with sample datasets before handling sensitive security data
- Build a portfolio of security analysis notebooks
- Contribute to open-source security projects to gain experience
- Stay current with emerging threats and analysis techniques
