Years ago, I promised many that I'd finally write this blog. What you see now is that very blog. Though I'm certain the tech stack today is a far cry from what it used to be.
Reflections on computer engineering, the world, and my life.

# **CJK & Multi-Set Font Loading Optimization**
Character sets for East Asian languages CJK are notoriously large, often adding megabytes of overhead to the initial page load. To eliminate this bottleneck, I try to re-architected font delivery pipeline to implement dynamic sub-setting, on-demand fetching, and aggressive caching.

This optimization successfully reduced our initial request payload size for fonts by 95%. Instead of serving massive, monolithic .ttf or .woff2 files containing thousands of CJK ideographs, fonts are now split into hundreds of micro-font fragments based on unicode ranges
<img width="698" height="101" alt="125606" src="https://github.com/user-attachments/assets/362cc6a4-7520-4969-838e-90a116e3ce33" />
