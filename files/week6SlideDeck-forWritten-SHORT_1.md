---
marp: true
theme: default
paginate: true
header: 'Week 6: AI and Agentic Systems'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }
---


# AI and Agentic Systems in Cybersecurity


---

# Today's Agenda

- Deep Dive: AI in Cybersecurity
- Attacker AI Capabilities and Use Cases
- Defender AI Arsenal
- Agentic AI: The Next Evolution
- Autonomous Attack and Defense Scenarios
- The AI Arms Race
- Ethical Frameworks and Future Outlook

---

# Overview

**Traditional Operations**:
- Playbooks: Strategic frameworks
- Runbooks: Tactical procedures
- SOAR: Orchestration and automation

**Evolution**:
Manual → Scripted → Automated → AI-Assisted → **Agentic**

**Today**: Deep dive into AI and autonomous systems


---

# Cybersecurity Operations Framework

# Introduction to Security Operations

**What Are Security Operations?**

Security operations encompass the processes, tools, and strategies organizations use to detect, respond to, and recover from cybersecurity threats. Effective security operations require both strategic planning and tactical execution to protect critical assets and maintain business continuity.

**Four Key Components We'll Cover:**
- SIEM for detection and monitoring
- Playbooks for strategic guidance
- Runbooks for tactical execution
- SOAR platforms for automation and orchestration

---

# Playbooks - Strategic Frameworks

**What Are Playbooks?**

Playbooks are high-level strategic frameworks that define the overall approach to handling specific security scenarios. They provide the "what" and "why" of security operations. **Don't store them ONLY on your SAN**

**Key Characteristics:**
- Provide strategic guidance for incident categories (ransomware, phishing, data breaches)
- Define roles, responsibilities, and decision-making authority
- Outline general workflows and escalation paths
- Flexible enough to adapt to varying circumstances
- Focus on objectives and desired outcomes

**Example:** A phishing playbook might define when to involve legal, PR, or executive leadership based on the severity and scope of the incident. **What's most important FIRST**

---

# Runbooks - Tactical Procedures

**What Are Runbooks?**

Runbooks are detailed, step-by-step tactical procedures that tell security teams exactly how to execute specific tasks. They provide the "how" of security operations.

**Key Characteristics:**
- Prescriptive instructions for specific technical actions
- Clear, sequential steps with minimal ambiguity
- Include commands, scripts, and tool-specific procedures
- Designed for speed and consistency during incidents
- Often used for repetitive or time-sensitive tasks

**Example:** A runbook for isolating a compromised endpoint might include exact commands to run, which tools to use, verification steps, and documentation requirements. **You better TEST this at least twice/year**

---

# SOAR - Security Orchestration, Automation, and Response

**What Is SOAR?**

SOAR platforms integrate security tools, automate repetitive tasks, and orchestrate complex workflows to enhance the speed and efficiency of security operations. (e.g. Paolo Alto Networks XSOAR, Splunk SOAR, IBM Resilient)

**Three Core Functions:**
- **Orchestration:** Connects disparate security tools and enables them to work together seamlessly
- **Automation:** Executes repetitive tasks without human intervention, reducing response times
- **Response:** Provides case management and workflow capabilities to guide incident response activities

**Benefits:** Faster response times, reduced analyst fatigue, consistent execution, and improved threat detection and remediation at scale.

---

# SIEM - The Foundation of Security Operations

**What Is SIEM?**

SIEM (Security Information and Event Management) is the centralized platform that collects, aggregates, and analyzes security data from across your entire IT environment. It serves as the eyes and ears of security operations.

**Core Functions:**
- **Log Collection:** Aggregates data from firewalls, endpoints, servers, applications, and cloud services
- **Correlation:** Identifies patterns and relationships across disparate events
- **Alerting:** Generates alerts when suspicious activity or known attack patterns are detected
- **Investigation:** Provides search and analysis capabilities for threat hunting and incident investigation

**How SIEM Fits Into the Framework:**
SIEM is the detection engine that triggers your playbooks and runbooks. When SIEM identifies a threat, it creates the alert that initiates your response process, and SOAR platforms often integrate directly with SIEM to automate that response. (e.g. Splunk, Elastic, MS Sentinel)

---

# Bringing It All Together

**The Integrated Approach**

Modern security operations leverage all four components working in harmony:

**The Relationship:**
- **SIEM** detects threats and generates alerts through log correlation and analysis
- **Playbooks** define the strategic approach and decision framework for responding to those alerts
- **Runbooks** provide the detailed procedures to execute tactics
- **SOAR** automates runbook execution and orchestrates playbook workflows, often pulling data directly from SIEM

---

# Bringing It All Together

**The Integrated Approach**


**Real-World Example:**
SIEM detects unusual login attempts from multiple geographic locations and generates an alert. The SOAR platform receives this alert and automatically executes runbook procedures (disable account, collect login logs, check for lateral movement). If the threat is confirmed, it follows the playbook's escalation framework, notifying the appropriate teams and initiating the broader incident response process.

**Result:** Faster detection through SIEM, automated response via SOAR, consistent execution following runbooks, and strategic decision-making guided by playbooks.



---

# The AI Spectrum in Cybersecurity

**Automation**: Rules-based, if-then logic
↓
**Machine Learning**: Pattern recognition, supervised learning
↓
**Deep Learning**: Neural networks, complex patterns
↓
**Generative AI**: Content creation, code generation
↓
**Agentic AI**: Autonomous decision-making and action
↓
**AGI** (Future): General intelligence across all domains

---

# Three Critical Distinctions

**1. Automation**: 
Following predetermined rules (no intelligence)

**2. AI**: 
Learning patterns and making predictions (intelligent assistance)

**3. Agentic AI**: 
Autonomous goal-setting and action-taking (independent agent)

**Understanding these differences is crucial for your assignment**

---

# Machine Learning Types in Security

**Supervised Learning**:
- Trained on labeled data (malware/benign)
- Use: Malware classification, spam detection
- Example: "This file is 94% likely to be ransomware"

**Unsupervised Learning**:
- Finds patterns without labels
- Use: Anomaly detection, baseline learning
- Example: "This behavior is unusual for this user"

**Reinforcement Learning**:
- Learns through trial and reward
- Use: Adaptive defense, optimization
- Example: "Strategy A stopped attacks 20% faster"


---

# The Attacker's AI Toolkit

**What attackers are using TODAY**:

1. **LLMs for Social Engineering**: ChatGPT, WormGPT, FraudGPT
2. **ML for Evasion**: Polymorphic malware
3. **AI for Reconnaissance**: Automated target profiling
4. **Deepfakes**: Voice and video impersonation
5. **AI-Generated Code**: Malware development
6. **Automated Exploitation**: Finding and exploiting vulnerabilities

---

# Attacker Capability 1: AI-Enhanced Phishing

**Traditional Phishing**:
- Generic messages
- Obvious grammar errors
- Low success rate (1-3%)

**AI-Enhanced Phishing**:
- Personalized using scraped data
- Perfect grammar and writing style
- Context-aware timing
- Multilingual capabilities
- Voice/video deepfakes
- Success rate: 10-30%

---

# Real Example: AI Phishing Attack

**2023 Case Study**:
- CEO voice deepfake used in $35M fraud
- AI cloned voice from YouTube videos
- Called CFO demanding urgent wire transfer
- Perfect replication of speech patterns
- Attack completed in 18 minutes

**Defender challenge**: How do you verify identity when audio/video can be faked?

---

# Attacker Capability 2: Automated Reconnaissance

**Traditional Recon**: Manual research (hours-days)

**AI-Powered Recon** (minutes):
```
AI Agent Tasks:
1. Scrape LinkedIn for employee data
2. Identify key decision-makers
3. Map organizational structure
4. Find email patterns
5. Identify technologies used
6. Locate vulnerable systems
7. Profile employee behaviors
8. Generate custom attack plan

Output: Complete attack playbook for target
```

---

# Attacker Capability 3: Polymorphic Malware

**Challenge**: Signature-based detection

**AI Solution**:
- Malware rewrites itself after each infection
- ML generates infinite variations
- Each instance unique, same functionality
- Evades traditional antivirus

**Example: Emotet**:
- Used ML to modify code structure
- Adapted to evade specific security tools
- Infected millions of systems


---

# Attacker Capability 4: AI-Generated Malware

**WormGPT / FraudGPT**: Uncensored LLMs for cybercrime

**Capabilities**:
- Generate custom malware code
- Create phishing content
- Develop exploit scripts
- Write evasive shellcode
- No ethical restrictions

**Cost**: $200/month on dark web

**Impact**: Lowers barrier to entry for cybercrime


---

# Attacker AI Playbook: Automated APT; Advanced Persistent Threat:

**Phase 1 - Reconnaissance** (AI automated):
- Target identification and profiling
- Vulnerability scanning
- Social engineering preparation

**Phase 2 - Initial Access** (AI-assisted):
- Personalized spear phishing
- Exploit generation
- Credential harvesting

**Phase 3 - Persistence** (AI-driven):
- Polymorphic backdoors
- Adaptive C2 communication
- Evasion of detection systems

---

# Attacker AI Playbook: Ransomware 2.0

**AI-Enhanced Ransomware Operations**:

```
AI Agent Tasks:
1. Identify high-value targets (financial analysis)
2. Determine ransom amount (ability to pay)
3. Find and encrypt critical data (ML identifies valuable files)
4. Avoid detection (adapt to security tools)
5. Time attack optimally (when defenses are weakest)
6. Negotiate ransom (chatbot with natural language)
7. Optimize payment conversion (crypto mixing)

Human Involvement: Minimal (approval only)
```

---

# Case Study: LockBit 3.0

**Real AI-Enhanced Ransomware**:
- ML-based file prioritization (encrypts valuable data first)
- Automated vulnerability exploitation
- AI-driven negotiation chatbot
- Adaptive evasion techniques
- Operational 2022-2024, billions in damages

**Lesson**: Attackers already using AI at scale



---
# Agentic AI vs Other AI Forms
## Cybersecurity Perspectives on AI Evolution

---

## The AI Spectrum: From Narrow to Agentic

### Narrow AI (Traditional AI)
Performs specific, predefined tasks. Examples: spam filters, recommendation systems, facial recognition. Limited to trained domain.

### Generative AI (GenAI)
Creates new content based on patterns learned from training data. Examples: ChatGPT, DALL-E, GitHub Copilot. Responds to prompts but doesn't act independently.

### Agentic AI
Autonomous systems that set goals, plan actions, use tools, and execute multi-step workflows with minimal human intervention. Can adapt strategies based on feedback.

---

## Key Characteristics of Agentic AI

### Core Capabilities

**🎯 Goal-Oriented Behavior**
Sets and pursues objectives with minimal human guidance

**🛠️ Tool Use & Integration**
Interacts with APIs, databases, browsers, and external systems

**🔄 Iterative Planning**
Breaks complex tasks into steps, evaluates results, adjusts approach

**🧠 Memory & Context**
Maintains state across interactions and learns from outcomes

---

## Comparison Matrix

| Characteristic | Narrow AI | Generative AI | Agentic AI |
|----------------|-----------|---------------|------------|
| **Autonomy** | Low | Medium | **High** |
| **Task Scope** | Single task | Content generation | **Multi-step workflows** |
| **Decision Making** | Rule-based | Prompt-driven | **Self-directed** |
| **Tool Usage** | None | Limited | **Extensive** |
| **Adaptability** | Static | Context-aware | **Dynamic planning** |
| **Human Oversight** | Minimal | Per interaction | **Supervisory** |

---

## Cybersecurity Implications

### Threats

- **Autonomous attacks:** Self-propagating malware that adapts to defenses
- **Social engineering:** Sophisticated, personalized phishing at scale
- **Privilege escalation:** Agents exploring systems for vulnerabilities
- **Data exfiltration:** Intelligent data discovery and extraction
- **Prompt injection:** Manipulation of agent goals and behaviors


---

## Cybersecurity Implications

### Defense Applications

- **Threat hunting:** Autonomous detection of anomalies and IOCs
- **Incident response:** Automated triage and containment
- **Vulnerability management:** Continuous scanning and patching
- **Security operations:** 24/7 monitoring with adaptive responses
- **Red teaming:** Realistic attack simulation and testing

### ⚠️ Key Challenge
Balancing autonomy with control and accountability





---

# What Makes AI "Agentic"?

**Regular AI**: 
Tool that assists humans with specific tasks

**Agentic AI**: 
Autonomous system that:
1. **Sets own goals** within defined objectives
2. **Makes independent decisions** without human approval
3. **Takes actions** that affect systems
4. **Adapts strategies** based on results
5. **Coordinates** with other agents
6. **Learns continuously** from experience
7. **Operates persistently** over time

---

<img src="./images/agenticai1.png" alt="Basic storyboard" width="75%">



---

<img src="./images/genaivs.jpg" alt="Basic storyboard" width="75%">


---

<img src="./images/platforms.png" alt="Basic storyboard" width="65%">


---

<img src="./images/market.png" alt="Basic storyboard" width="75%">

---

# Defender AI Capabilities: Detection

**AI-Powered Threat Detection**:

**Network Traffic Analysis**:
- ML learns normal traffic patterns
- Detects anomalies in real-time
- Spots data exfiltration (unauthorized transfer of data)

**Endpoint Behavior**:
- ML baselines normal process behavior
- Detects fileless malware
- Identifies lateral movement
- Catches zero-day exploits

---

# Defender AI: Next-Generation SIEM

**Traditional SIEM**: 
Rule-based correlation, high false positives

**AI-Enhanced SIEM**:
```
Capabilities:
- Unsupervised learning for anomaly detection
- Natural language queries: "Show me suspicious logins"
- Automatic incident correlation
- Predictive analytics
- ML-powered threat hunting
- Auto-generated investigation workflows

Example: Splunk MLTK, Elastic ML, Chronicle
```


---

<img src="./images/nextgen.jpg" alt="Basic storyboard" width="75%">


---

# Defender AI: Extended Detection and Response (XDR)

**XDR with AI**:
- Correlates data across network, endpoint, cloud, email
- ML identifies multi-stage attacks
- Automatic incident investigation
- AI-recommended response actions
- Continuous learning from outcomes

**Example Attack Chain Detection**:
```
1. Phishing email delivered
2. User clicked link  
3. PowerShell executed
4. C2 connection established (command and control connection - infected --> attack server)
5. Credential theft
6. Lateral movement

XDR AI: Connects all 6 events, 2 minutes after step 6
Traditional: Each event separate, detected days later
```


---

<img src="./images/xdr.jpg" alt="Basic storyboard" width="75%">

---

# Defender AI: User and Entity Behavior Analytics (UEBA)

**How UEBA Works**:

```
ML builds profile for each entity:
- Users: Login times, locations, data accessed
- Servers: Normal traffic, processes, connections  
- Applications: Typical usage patterns

Detects anomalies:
Alert: "Finance-Server-01 is contacting unknown IP"
Risk Score: 94/100
ML Reasoning:
  - First time connection to this country
  - High volume data transfer
  - Outside business hours
  - User account recently showed anomalies
Auto-Action: Trigger investigation playbook
```

---

<img src="./images/ueb.jpg" alt="Basic storyboard" width="75%">


---

# Defender AI: Deception Technology

**AI-Powered Honeypots**:

```
Traditional Honeypot: Static decoy system

AI Honeypot:
- Dynamically generates realistic decoy environments
- Adapts to attacker behavior
- Learns attacker techniques
- Wastes attacker time and resources
- Generates threat intelligence
- Triggers deceptive responses

Example: Attacker thinks they've found production database,
         actually interacting with ML-generated fake
```



---

<img src="./images/honeypot.png" alt="Basic storyboard" width="75%">




---

# Defender AI: Security Automation (SOAR++)

**Traditional SOAR**: 
Fixed playbooks, human approval

**AI-Enhanced SOAR**:
- Dynamic playbook generation for novel threats
- ML-powered triage and prioritization
- Natural language interaction
- Contextual decision-making
- Adaptive workflows based on outcomes
- Autonomous low-risk actions
- Explainable AI for decisions




---

# The AI Arms Race: Current State

**Attacker Advantages**:
- No ethical constraints; Can operate illegally
- Fail fast, learn quickly
- Distributed infrastructure
- Lower consequences for mistakes

**Defender Advantages**:
- More resources (large organizations)
- Legal cooperation and sharing
- Access to training data
- Can deploy at scale
- Regulatory support

**Current Status**: Relatively balanced, but evolving rapidly

---

# The AI Arms Race: Future Scenarios

**Scenario 1: Defender Dominance**
- AI defense too fast for human attackers
- Agentic defense systems neutralize threats instantly
- Attackers resort to social engineering only

**Scenario 2: Attacker Dominance**
- AI attacks overwhelm defenses
- Autonomous malware spreads uncontrollably
- Critical infrastructure at risk


---

# The AI Arms Race: Future Scenarios

**Scenario 3: Equilibrium**
- AI vs AI continuous arms race
- Neither side gains permanent advantage
- Constant innovation required

---

# The Speed Problem

**Human Decision Making**: 
Minutes to hours

**AI Decision Making**: 
Milliseconds

**Implication**: 
AI-driven attacks will happen faster than humans can respond

**Solution**: 
Agentic AI defense is not optional, it's necessary

**Risk**: 
AI vs AI conflicts happen too fast for human oversight

---

# The Scale Problem

**Human Analyst Capacity**:
- Monitor ~1000 endpoints
- Investigate ~10 incidents/day
- Work 8-hour shifts

**Agentic AI Capacity**:
- Monitor unlimited endpoints
- Investigate thousands simultaneously
- Never stops

**Attacker Implication**: 
One agentic attack agent could target thousands of organizations simultaneously

---

# The Explainability Problem

**Traditional AI**: 
"System flagged this as malicious"

**Agentic AI**:
"System blocked traffic, disabled accounts, isolated systems because..."

**Challenge**:
- Why did it make that decision?
- Was it the right decision?
- How do we audit it?
- Who is liable if it's wrong?

**Requirement**: Explainable AI (XAI) for security