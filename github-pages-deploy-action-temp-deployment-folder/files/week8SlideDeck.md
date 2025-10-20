---
marp: true
theme: default
paginate: true
header: 'Week 8 Network Fundamentals Review'
footer: 'Dr. Dave Fusco | CYBER 362'

style: |
  section {
    font-size: 22px;
  }
---


# Network Fundamentals Review
## Week 8 - Preparing for Wireshark Analysis

**Course**: Cybersecurity Analytics
**Topics**: OSI Model, IP Addressing, Subnetting, Services & Ports


---

# Why Network Fundamentals Matter

- **Wireshark shows raw network traffic** - you must understand what you're seeing
- **Packet analysis requires layer knowledge** - protocols operate at different OSI layers
- **IP addressing determines communication paths** - subnetting controls network segmentation
- **Port numbers reveal service types** - essential for identifying suspicious activity

---

# Course Context: This Week's Focus

**Previous Weeks:**
- Foundation tools (Python, conda, VS Code, Jupyter)
- AI programming assistance
- Data sources and formats

**This Week:**
- Network fundamentals review for Wireshark lab
- Understanding packet structure and flow
- Analyzing network traffic for security insights

---

# Class 1: OSI Model and Core Layers

---

# The OSI Model Overview

## **Seven Layers of Network Communication**

**Upper Layers (Application-focused):**
- Layer 7: Application - User interfaces (HTTP, DNS, SMTP)
- Layer 6: Presentation - Data format/encryption
- Layer 5: Session - Connection management

**Lower Layers (Data transmission):**
- Layer 4: Transport - End-to-end communication (TCP, UDP)
- Layer 3: Network - Routing and logical addressing (IP)
- Layer 2: Data Link - Physical addressing (MAC, Ethernet)
- Layer 1: Physical - Bits on the wire

---

# Why OSI Matters for Security Analysis

## **Wireshark Operates Across All Layers**

- **Layer 2**: See MAC addresses, switch behavior, ARP
- **Layer 3**: Track IP routing, identify networks
- **Layer 4**: Analyze TCP connections, UDP communications
- **Layer 7**: Examine application protocols (HTTP, DNS)

## **Security Events Occur at Every Layer**
- ARP spoofing (Layer 2)
- IP fragmentation attacks (Layer 3)  
- SYN flooding (Layer 4)
- SQL injection (Layer 7)

---

# Layer 2: Data Link Layer Deep Dive

## **Key Concepts**
- **Function**: Physical addressing and frame delivery on local network
- **Address Type**: MAC addresses (48-bit, 6 octets in hex)
- **Scope**: Communication within same network segment

## **MAC Address Structure**
```
AA:BB:CC:DD:EE:FF
└──┬──┘ └───┬───┘
   OUI    Device ID
(Vendor) (Unique)
```

**Example**: `00:0c:29:3a:2f:1b`
- First 3 octets (00:0c:29) = VMware manufacturer
- Last 3 octets (3a:2f:1b) = Specific device

---

# Layer 2: Protocols and Operations

## **Key Layer 2 Protocols**

**Ethernet**
- Dominant LAN technology
- Frame format: Preamble | Destination MAC | Source MAC | Type | Data | FCS

**ARP (Address Resolution Protocol)**
- Maps IP addresses to MAC addresses
- "Who has 192.168.1.100? Tell 192.168.1.50"
- Response: "192.168.1.100 is at AA:BB:CC:DD:EE:FF"
- **Security Risk**: ARP spoofing/poisoning attacks

---

# Layer 2: Protocols and Operations

## **Key Layer 2 Protocols**


**Switches**
- Operate at Layer 2
- Forward frames based on MAC address table
- Create separate collision domains


---

# Layer 2 in Wireshark

## **What You'll See**
- Source and destination MAC addresses
- Frame check sequence (FCS) for error detection
- VLAN tags (if present)
- Ethernet frame type indicators

## **Common Analysis Tasks**
- Identify device manufacturers via MAC OUI lookup
- Detect ARP spoofing attempts
- Track which devices communicate on local network
- Identify broadcast and multicast traffic

---

# Layer 3: Network Layer Deep Dive

## **Key Concepts**
- **Function**: Logical addressing and routing between networks
- **Address Type**: IP addresses (IPv4: 32-bit, IPv6: 128-bit)
- **Scope**: End-to-end communication across networks

## **IPv4 Address Structure**
```
192.168.1.100
│   │   │  │
│   │   │  └─ Host portion
│   │   └──── Network portion
│   └──────── (determined by subnet mask)
└──────────── 
```

**Components**: Network ID + Host ID
**Subnet Mask**: Defines boundary between network and host

---

# Layer 3: IP Protocol Details

## **IP Header Key Fields**
- **Version**: IPv4 (4) or IPv6 (6)
- **Time to Live (TTL)**: Hop limit to prevent routing loops
- **Protocol**: Next layer protocol (6=TCP, 17=UDP, 1=ICMP)
- **Source IP**: Origin of packet
- **Destination IP**: Intended recipient
- **Checksum**: Header integrity verification

## **ICMP (Internet Control Message Protocol)**
- Network diagnostic tool
- **Ping**: Echo request/reply (Type 8/0)
- **Traceroute**: Uses TTL exceeded messages
- **Security**: Can reveal network topology

---

# Layer 3: Routing Fundamentals

## **How Packets Travel**
1. Source determines if destination is local or remote
2. If local: Use ARP to find MAC, send directly
3. If remote: Send to default gateway (router)
4. Routers examine destination IP and forward appropriately
5. Process repeats until packet reaches destination network


---

# Layer 3: Routing Fundamentals


## **Default Gateway**
- Router IP address on your local network
- Where all non-local traffic is sent
- Critical configuration for internet connectivity

## **Routing Tables**
- Network destination | Subnet mask | Gateway | Interface
- Determines next hop for each packet


---

# Layer 3 in Wireshark

## **What You'll See**
- Source and destination IP addresses
- IP header details (TTL, protocol, flags)
- Fragmentation information
- ICMP messages and types
- IP identification numbers for tracking


---

# Layer 3 in Wireshark


## **Common Analysis Tasks**
- Trace packet paths through networks
- Identify external vs. internal communication
- Detect IP spoofing attempts
- Analyze routing behavior
- Identify network scanning activities

---

# Layer 4: Transport Layer Deep Dive

## **Key Concepts**
- **Function**: End-to-end communication and reliability
- **Protocols**: TCP (connection-oriented) and UDP (connectionless)
- **Addressing**: Port numbers (16-bit, 0-65535)
- **Scope**: Process-to-process communication

## **Port Number Ranges**
- **Well-Known Ports**: 0-1023 (system/privileged services)
- **Registered Ports**: 1024-49151 (user/application services)
- **Dynamic/Private**: 49152-65535 (ephemeral, client-side)

---

# TCP: Transmission Control Protocol

## **Characteristics**
- **Connection-oriented**: Three-way handshake before data transfer
- **Reliable**: Acknowledgments, retransmission, ordering
- **Flow control**: Window mechanism prevents overwhelming receiver
- **Error checking**: Checksums verify data integrity



---

# TCP: Transmission Control Protocol



## **Three-Way Handshake**
```
Client → Server: SYN (Synchronize, Seq=X)
Server → Client: SYN-ACK (Seq=Y, Ack=X+1)
Client → Server: ACK (Ack=Y+1)
[Connection established]
```

## **Connection Termination**
```
Client → Server: FIN
Server → Client: ACK
Server → Client: FIN
Client → Server: ACK
```


---

# TCP Flags and States

## **TCP Flags (Control Bits)**
- **SYN**: Synchronize sequence numbers (connection initiation)
- **ACK**: Acknowledgment field significant
- **FIN**: Finished sending data (connection termination)
- **RST**: Reset connection (abnormal termination)
- **PSH**: Push data to application immediately
- **URG**: Urgent pointer field significant

## **Common TCP States**
- LISTEN, SYN_SENT, SYN_RECEIVED
- ESTABLISHED (active connection)
- FIN_WAIT, CLOSE_WAIT, TIME_WAIT
- CLOSED

---

# UDP: User Datagram Protocol

## **Characteristics**
- **Connectionless**: No handshake, send and forget
- **Unreliable**: No acknowledgments or retransmission
- **Fast**: Minimal overhead
- **Use Cases**: DNS, streaming media, VoIP, DHCP


---

# UDP: User Datagram Protocol


## **UDP Header (8 bytes)**
```
Source Port | Destination Port
Length      | Checksum
[Data payload]
```

## **When to Use UDP vs TCP**
- **UDP**: Speed matters more than reliability (live video, gaming)
- **TCP**: Reliability critical (file transfer, web pages, email)


---

# Layer 4 in Wireshark

## **What You'll See - TCP**
- Three-way handshake sequences
- TCP flags (SYN, ACK, FIN, RST)
- Sequence and acknowledgment numbers
- Window sizes and flow control
- Retransmissions and duplicate ACKs

## **What You'll See - UDP**
- Source and destination ports
- Datagram length
- Simple request-response patterns (DNS queries)

---

# Layer 4 in Wireshark


## **Security Analysis**
- Port scanning detection (SYN scans)
- TCP session hijacking indicators
- DDoS attacks (SYN floods)
- Unusual port usage


---

# Class 2: IP Subnetting and Services

---

# IP Addressing Fundamentals

## **IPv4 Address Classes (Historical)**

| Class | First Octet | Default Mask | Network/Host Bits | Use Case |
|-------|-------------|--------------|-------------------|----------|
| A | 1-126 | 255.0.0.0 (/8) | 8/24 | Large networks |
| B | 128-191 | 255.255.0.0 (/16) | 16/16 | Medium networks |
| C | 192-223 | 255.255.255.0 (/24) | 24/8 | Small networks |
| D | 224-239 | N/A | N/A | Multicast |
| E | 240-255 | N/A | N/A | Reserved |

**Note**: 127.x.x.x is loopback (localhost)

---

# Special IP Addresses

## **Reserved/Private Address Ranges (RFC 1918)**
- **Class A**: 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
- **Class B**: 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
- **Class C**: 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)

## **Other Special Addresses**
- **0.0.0.0**: Default route or "this network"
- **127.0.0.1**: Loopback address (localhost)
- **169.254.x.x**: APIPA (Automatic Private IP Addressing)
- **255.255.255.255**: Broadcast

---

# Subnet Masks Explained

## **Purpose**
- Define network and host portions of IP address
- Determine which IPs are on same network
- Enable network segmentation and routing

## **Binary Representation**
```
IP Address:    192.168.1.100  = 11000000.10101000.00000001.01100100
Subnet Mask:   255.255.255.0  = 11111111.11111111.11111111.00000000
                                 └────Network────┘ └─Host─┘
Network ID:    192.168.1.0    = 11000000.10101000.00000001.00000000
```


---

# Subnet Masks Explained


## **CIDR Notation**
- 192.168.1.0/24 means subnet mask has 24 consecutive 1-bits
- /24 = 255.255.255.0
- /16 = 255.255.0.0
- /8 = 255.0.0.0


---

# Classless Subnetting (CIDR)

## **Why Classless?**
- More efficient IP address allocation
- Reduces routing table size
- Flexible network sizing


---

# Classless Subnetting (CIDR)


## **Common CIDR Subnet Masks**

| CIDR | Subnet Mask | Usable Hosts | Use Case |
|------|-------------|--------------|----------|
| /30 | 255.255.255.252 | 2 | Point-to-point links |
| /29 | 255.255.255.248 | 6 | Small office |
| /28 | 255.255.255.240 | 14 | Department |
| /27 | 255.255.255.224 | 30 | Small network |
| /26 | 255.255.255.192 | 62 | Medium network |
| /25 | 255.255.255.128 | 126 | Large department |
| /24 | 255.255.255.0 | 254 | Standard network |



---

# Subnet Calculations

## **Key Concepts**
- **Network Address**: First address in subnet (all host bits = 0)
- **Broadcast Address**: Last address in subnet (all host bits = 1)
- **Usable Hosts**: Total addresses - 2 (network and broadcast)
- **Number of Subnets**: 2^(borrowed bits)
- **Hosts per Subnet**: 2^(host bits) - 2

## **Example: 192.168.1.0/26**
- Subnet mask: 255.255.255.192
- Host bits: 32 - 26 = 6 bits
- Hosts per subnet: 2^6 - 2 = 62 usable hosts
- Number of /26 subnets in /24: 2^2 = 4 subnets



---

# Subnetting Example

## **Is 10.25.30.100 on the same subnet as 10.25.30.180?**

**Given**: Both use /27 subnet mask (255.255.255.224)

**Method 1 - Binary:**
```
10.25.30.100 = 00001010.00011001.00011110.01100100
Subnet mask  = 11111111.11111111.11111111.11100000
Network ID   = 00001010.00011001.00011110.01100000 = 10.25.30.96

10.25.30.180 = 00001010.00011001.00011110.10110100
Subnet mask  = 11111111.11111111.11111111.11100000
Network ID   = 00001010.00011001.00011110.10100000 = 10.25.30.160
```

**Answer**: NO - Different network IDs (10.25.30.96 vs 10.25.30.160)


---

# Default Gateway Deep Dive

## **What is a Default Gateway?**
- Router interface IP address on your local network
- Where your computer sends packets destined for other networks
- Must be on same subnet as your device

## **How It Works**
```
Your Device:      192.168.1.100/24
Default Gateway:  192.168.1.1/24
Remote Server:    8.8.8.8

1. Device checks: Is 8.8.8.8 on my subnet? NO (different network ID)
2. Device sends packet to default gateway (192.168.1.1)
3. Gateway routes packet toward 8.8.8.8
4. Multiple routers forward until it reaches destination
5. Response follows reverse path back
```

---

# Broadcast Addresses

## **Broadcast: 255.255.255.255**
- Stays on local network segment
- Not forwarded by routers
- Used by DHCP clients, ARP requests
- Example: "I need an IP address!" (DHCP Discover)


---

# Broadcast Addresses

## **Directed Broadcast**
- Last address in a subnet
- All host bits set to 1
- Examples:
  - 192.168.1.255 (broadcast for 192.168.1.0/24)
  - 10.25.30.127 (broadcast for 10.25.30.96/27)
  - 172.16.255.255 (broadcast for 172.16.0.0/16)

## **Security Implications**
- Smurf attacks use directed broadcast
- Many routers disable directed broadcast forwarding



---

# Subnetting in Wireshark Lab

## **Network: 192.168.2.0/24**
- Subnet mask: 255.255.255.0
- Network address: 192.168.2.0
- Broadcast address: 192.168.2.255
- Usable range: 192.168.2.1 - 192.168.2.254
- Gateway: 192.168.2.1
- Client: 192.168.2.147


---

# Subnetting in Wireshark Lab


## **Analysis Questions to Consider**
- Which IPs are on the same local network?
- Which traffic goes through the gateway?
- Are there any broadcasts visible?
- Can you identify the subnet from the traffic?

---

# Well-Known Ports and Services

## **Critical TCP Ports (Connection-Oriented)**

| Port | Service | Description | Security Notes |
|------|---------|-------------|----------------|
| 20/21 | FTP | File Transfer | Cleartext, credentials visible |
| 22 | SSH | Secure Shell | Encrypted remote access |
| 23 | Telnet | Remote Terminal | Cleartext, avoid using |
| 25 | SMTP | Email Sending | Spam, phishing vector |
| 80 | HTTP | Web Traffic | Cleartext, see URLs/data |
| 443 | HTTPS | Secure Web | Encrypted, see server names |
| 445 | SMB | Windows File Sharing | Common attack target |
| 3389 | RDP | Remote Desktop | Brute force attacks common |

---

# More Important TCP Ports

## **Database and Application Ports**

| Port | Service | Description | Security Notes |
|------|---------|-------------|----------------|
| 110 | POP3 | Email Retrieval | Cleartext credentials |
| 143 | IMAP | Email Access | Cleartext credentials |
| 389 | LDAP | Directory Services | Active Directory queries |
| 636 | LDAPS | Secure LDAP | Encrypted AD queries |
| 1433 | MS SQL | Database | SQL injection target |
| 3306 | MySQL | Database | Common attack target |
| 5432 | PostgreSQL | Database | Requires authentication |
| 8080 | HTTP-Alt | Alternate Web | Often development/proxy |

---

# Critical UDP Ports (Connectionless)

## **Network Services**

| Port | Service | Description | Security Notes |
|------|---------|-------------|----------------|
| 53 | DNS | Domain Name Resolution | Cache poisoning, tunneling |
| 67/68 | DHCP | IP Address Assignment | Rogue DHCP server attacks |
| 69 | TFTP | Trivial File Transfer | No authentication |
| 123 | NTP | Time Synchronization | Amplification attacks |
| 161/162 | SNMP | Network Management | Community strings exposure |
| 514 | Syslog | Logging | Cleartext log transmission |
| 1812/1813 | RADIUS | Authentication | Wireless auth protocols |

---

# Ports in Wireshark Analysis

## **Source vs. Destination Ports**
- **Server uses well-known port** (e.g., 80 for HTTP)
- **Client uses ephemeral port** (e.g., 54321)
- **Example Connection**:
  ```
  Client 192.168.2.147:54321 → Server 23.211.124.108:80 (HTTP)
  Server 23.211.124.108:80 → Client 192.168.2.147:54321 (response)
  ```

## **Identifying Services**
- Port 53 traffic = DNS queries/responses
- Port 80 traffic = Unencrypted web browsing
- Port 443 traffic = Encrypted HTTPS connections
- Port 445 traffic = Windows file sharing (SMB)

---

# DNS: Critical Network Service

## **How DNS Works (Port 53 UDP/TCP)**
```
1. User types: www.example.com
2. Computer checks local DNS cache
3. If not cached, sends query to DNS server (usually UDP port 53)
4. DNS server responds with IP address
5. Computer connects to IP address
```


---

# DNS: Critical Network Service


## **DNS in Wireshark**
- Query: "What's the IP for www.google.com?" (Type A record)
- Response: "www.google.com is 142.250.185.46"
- Look for transaction ID matching query to response
- Queries are usually UDP unless response is large (>512 bytes)

## **Security Concerns**
- DNS cache poisoning
- DNS tunneling for data exfiltration
- DGA (Domain Generation Algorithm) malware



---

# HTTP: Unencrypted Web Traffic

## **HTTP Protocol (Port 80 TCP)**
- **GET**: Request a resource
- **POST**: Submit data to server
- **Headers**: Metadata about request/response
- **User-Agent**: Browser and OS information
- **Host**: Website being accessed


---

# HTTP: Unencrypted Web Traffic


## **What Wireshark Shows**
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.1; Win64; x64)
```

## **Security Implications**
- All data visible in cleartext
- Credentials, cookies, session tokens exposed
- Full URLs and parameters visible
- Valuable for malware analysis


---

# HTTPS: Encrypted Web Traffic

## **HTTPS Protocol (Port 443 TCP)**
- HTTP over TLS/SSL
- Encrypts application data
- Certificate-based authentication
- Current standard: TLS 1.2 and 1.3



---

# HTTPS: Encrypted Web Traffic

## **What Wireshark Shows**
- **TLS Handshake**: Certificate exchange
- **Server Name Indication (SNI)**: Destination website (unencrypted!)
- **Encrypted Application Data**: Cannot see actual content
- **Certificate Details**: Issuer, validity period, domains

## **Analysis Limitations**
- Cannot decrypt HTTPS without private keys
- Can see which sites visited (SNI) but not specific pages
- Can analyze certificate validity and trust chains

---

# SMB: Windows File Sharing

## **SMB Protocol (Port 445 TCP)**
- Server Message Block
- Windows file and printer sharing
- Also used for inter-process communication
- Modern version: SMB2/SMB3



---

# SMB: Windows File Sharing


## **In Corporate Networks**
- Domain controller communication
- File server access
- Printer sharing
- Active Directory operations

## **Security Concerns**
- EternalBlue exploit (WannaCry ransomware)
- Pass-the-hash attacks
- SMB relay attacks
- Often disabled on perimeter firewalls


---

# Kerberos: Windows Authentication

## **Kerberos Protocol (Port 88 TCP/UDP)**
- Active Directory authentication
- Ticket-based authentication system
- More secure than NTLM



---

# Kerberos: Windows Authentication


## **What You'll See in Wireshark**
- AS-REQ/AS-REP: Initial authentication
- TGS-REQ/TGS-REP: Service ticket requests
- CNameString: User account names
- Hostnames identified by $ suffix

## **Lab Application**
- Filter: `kerberos.CNameString`
- User accounts don't end with $
- Computer accounts end with $
- Helps identify who is accessing what


---

# Protocol Analysis Strategy

## **Wireshark Workflow**
1. **Start Broad**: View all traffic, note protocols present
2. **Apply Filters**: Focus on specific protocols or hosts
3. **Follow Streams**: Reconstruct conversations (TCP/UDP)
4. **Check Statistics**: Protocol hierarchy, endpoints, conversations
5. **Investigate Anomalies**: Unusual ports, failed connections, errors

## **Common Filters for Lab**
```
tcp                          # All TCP traffic
udp                          # All UDP traffic
http                         # HTTP traffic only
dns                          # DNS queries and responses
ip.addr == 192.168.2.147    # Specific IP traffic
tcp.port == 80               # Specific port
tcp.flags.syn == 1           # TCP SYN packets (connection attempts)
```

---

# Security Analysis Mindset

## **What to Look For**
- **Unusual ports**: Services on non-standard ports
- **Failed connections**: RST packets, connection refused
- **High volume**: Port scanning, DDoS attempts
- **Geographic anomalies**: Unexpected source countries
- **Time-based patterns**: After-hours activity
- **Protocol violations**: Malformed packets



---

# Security Analysis Mindset


## **Questions to Ask**
- Should this host be communicating with external IPs?
- Is this port normal for this service?
- Why so many connection attempts?
- Is this encrypted when it should be?
- Does the timing make sense?


---

# Putting It All Together

## **Network Traffic Flow**
```
Application (Layer 7): User requests www.example.com
  ↓ Uses service port (80/443)
Transport (Layer 4): TCP connection to server
  ↓ Breaks data into segments
Network (Layer 3): IP routing to destination
  ↓ Determines if local or remote
Data Link (Layer 2): Ethernet framing with MAC addresses
  ↓ Physical transmission
Physical (Layer 1): Bits on the wire
```

## **Reverse Process for Received Data**
Physical → Data Link → Network → Transport → Application

---

# Lab Preparation Checklist

## **Concepts You Should Understand**
✓ OSI Layer 2: MAC addresses, ARP, switches
✓ OSI Layer 3: IP addressing, routing, ICMP
✓ OSI Layer 4: TCP vs UDP, ports, connections
✓ Subnetting: Network/host portions, broadcast
✓ Default gateway: When and why it's used
✓ Common ports: HTTP(80), HTTPS(443), DNS(53), SMB(445)
✓ Protocol identification: Matching traffic to services



---

# Lab Preparation Checklist


## **Wireshark Skills**
✓ Opening and navigating PCAP files
✓ Applying display filters
✓ Following TCP/UDP streams
✓ Viewing packet details at each layer
✓ Exporting data for further analysis

---

# Key Takeaways

## **Remember These Fundamentals**
1. **Layers matter**: Each OSI layer provides specific information
2. **Addresses are hierarchical**: MAC (local) → IP (network) → Port (service)
3. **Subnetting controls communication**: Determines local vs. remote
4. **Ports identify services**: Well-known ports reveal application protocols
5. **Context is everything**: Understand normal before identifying abnormal

## **For Security Analysis**
- Network knowledge enables threat detection
- Protocol understanding reveals attack patterns
- Traffic analysis uncovers malicious behavior
- Wireshark makes the invisible visible

---

# Questions & Discussion

**Key Questions to Consider:**
- How does understanding OSI layers improve threat detection?
- What subnet would you use for a network with 50 hosts?
- Why might an attacker use unusual port numbers?
- How can you identify encrypted vs. unencrypted traffic?


---

# Resources and Further Reading

## **Networking References**
- RFC 1918: Private Internet Address Allocation
- RFC 791: Internet Protocol (IP)
- RFC 793: Transmission Control Protocol (TCP)
- TCP/IP Illustrated by Richard Stevens

## **Wireshark Resources**
- Wireshark User Guide: https://www.wireshark.org/docs/
- Wireshark Display Filters: https://wiki.wireshark.org/DisplayFilters
- Sample Captures: https://wiki.wireshark.org/SampleCaptures
