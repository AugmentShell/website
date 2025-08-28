export const defaultMessage = [
  { text: "Hello World!", color: "#ffffff"}
]

export const mixedErrors= [
  { text: ">> CRITICAL_ERROR: Pod 'web-api-7c5b6d...' in namespace 'prod-us-east-1' is experiencing a CrashLoopBackOff.", color: "#BC4749" },
  { text: ">> Analyzing system state...", color: "#ffffff" },
  { text: ">> Establishing connection to Kubernetes context 'prod-us-east-1'... SUCCESS.", color: "#ffffff" },
  { text: ">> Found pod: 'web-api-7c5b6d...'. Current status: CrashLoopBackOff. This indicates the container is starting, crashing, and then restarting repeatedly. Kubernetes is applying an exponential back-off delay between restart attempts.", color: "#ffffff" },
  { text: ">> Initiating log retrieval from pod 'web-api-7c5b6d...'. This may take a moment.", color: "#ffffff" },
  { text: ">> Log stream established. Tailing logs...", color: "#ffffff" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: ">> End of log stream.", color: "#ffffff" },
  { text: ">> Parsing pod events for deployment issues...", color: "#ffffff" },

  { text: "LAST SEEN TYPE REASON OBJECT MESSAGE", color: "#ffffff" },

  { text: "1m Warning Unhealthy pod/web-api-7c5b6d... Liveness probe failed: Get \"http://10.1.1.2:8080/healthz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "2m Warning Unhealthy pod/web-api-7c5b6d... Readiness probe failed: Get \"http://10.1.1.2:8080/readyz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "5m Normal Pulling pod/web-api-7c5b6d... Pulling image \"web-api:latest\"", color: "#ffffff" },
  { text: "5m Normal Pulled pod/web-api-7c5b6d... Successfully pulled image \"web-api:latest\"", color: "#ffffff" },
  { text: "5m Normal Created pod/web-api-7c5b6d... Created container web-api", color: "#ffffff" },
  { text: "5m Normal Started pod/web-api-7c5b6d... Started container web-api", color: "#ffffff" },
];

export const fullError = [
  { text: ">> CRITICAL_ERROR: Pod 'web-api-7c5b6d...' in namespace 'prod-us-east-1' is experiencing a CrashLoopBackOff.", color: "#BC4749" },
  { text: ">> Analyzing system state...", color: "#BC4749" },
  { text: ">> Establishing connection to Kubernetes context 'prod-us-east-1'... SUCCESS.", color: "#BC4749" },
  { text: ">> Found pod: 'web-api-7c5b6d...'. Current status: CrashLoopBackOff. This indicates the container is starting, crashing, and then restarting repeatedly. Kubernetes is applying an exponential back-off delay between restart attempts.", color: "#BC4749" },
  { text: ">> Initiating log retrieval from pod 'web-api-7c5b6d...'. This may take a moment.", color: "#BC4749" },
  { text: ">> Log stream established. Tailing logs...", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: ">> End of log stream.", color: "#BC4749" },
  { text: ">> Parsing pod events for deployment issues...", color: "#BC4749" },

  { text: "LAST SEEN TYPE REASON OBJECT MESSAGE", color: "#BC4749" },

  { text: "1m Warning Unhealthy pod/web-api-7c5b6d... Liveness probe failed: Get \"http://10.1.1.2:8080/healthz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "2m Warning Unhealthy pod/web-api-7c5b6d... Readiness probe failed: Get \"http://10.1.1.2:8080/readyz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "5m Normal Pulling pod/web-api-7c5b6d... Pulling image \"web-api:latest\"", color: "#BC4749" },
  { text: "5m Normal Pulled pod/web-api-7c5b6d... Successfully pulled image \"web-api:latest\"", color: "#BC4749" },
  { text: "5m Normal Created pod/web-api-7c5b6d... Created container web-api", color: "#BC4749" },
  { text: "5m Normal Started pod/web-api-7c5b6d... Started container web-api", color: "#BC4749" },
];

export const mixedSuccess = [
  { text: '>augmentshell "The web-api pod in prod is crash-looping. Find out why."', color: "#FFEC47" },
  { text: "Analyzing system state...", color: "#FFFFFF" },
  { text: "✓ Kubernetes context 'prod-us-east-1' found.", color: "#A7C957" },
  { text: "✓ Pod 'web-api-7c5b6d...' status: CrashLoopBackOff.", color: "#A7C957" },
  { text: "✓ Fetching logs from pod...", color: "#A7C957" },
  { text: "", color: "#FFFFFF" },
  { text: "Generated diagnostic plan:", color: "#FFFFFF" },
  { text: "01... Analyze pod logs for critical errors.", color: "#FFFFFF" },
  { text: "02... Describe pod events for deployment issues.", color: "#FFFFFF" },
  { text: "03... Check resource limits (CPU/Memory).", color: "#FFFFFF" },
  { text: "04... Propose a fix based on findings.", color: "#FFFFFF" },
  { text: "", color: "#FFFFFF" },
  { text: "...Execute this plan? [Y/n]", color: "#FFFFFF" },
  { text: "**CTA:** The primary \"Join the Waitlist\" form.", color: "#A7C957" },
];

export const fullSuccess = [
  { text: 'augmentshell "The web-api pod in prod is crash-looping. Find out why."', color: "#A7C957" },
  { text: "Analyzing system state...", color: "#A7C957" },
  { text: "✓ Kubernetes context 'prod-us-east-1' found.", color: "#A7C957" },
  { text: "✓ Pod 'web-api-7c5b6d...' status: CrashLoopBackOff.", color: "#A7C957" },
  { text: "✓ Fetching logs from pod...", color: "#A7C957" },
  { text: "", color: "#A7C957" },
  { text: "Generated diagnostic plan:", color: "#A7C957" },
  { text: "01... Analyze pod logs for critical errors.", color: "#A7C957" },
  { text: "02... Describe pod events for deployment issues.", color: "#A7C957" },
  { text: "03... Check resource limits (CPU/Memory).", color: "#A7C957" },
  { text: "04... Propose a fix based on findings.", color: "#A7C957" },
  { text: "", color: "#A7C957" },
  { text: "...Execute this plan? [Y/n]", color: "#A7C957" },
  { text: "**CTA:** The primary \"Join the Waitlist\" form.", color: "#A7C957" },
];

export const warningMix = [
  { text: ">> CRITICAL_ERROR: Pod 'web-api-7c5b6d...' in namespace 'prod-us-east-1' is experiencing a CrashLoopBackOff.", color: "#BC4749" },
  { text: ">> Analyzing system state...", color: "#ffffff" },
  { text: ">> Establishing connection to Kubernetes context 'prod-us-east-1'... SUCCESS.", color: "#ffffff" },
  { text: ">> Found pod: 'web-api-7c5b6d...'. Current status: CrashLoopBackOff. This indicates the container is starting, crashing, and then restarting repeatedly. Kubernetes is applying an exponential back-off delay between restart attempts.", color: "#ffffff" },
  { text: ">> Initiating log retrieval from pod 'web-api-7c5b6d...'. This may take a moment.", color: "#ffffff" },
  { text: ">> Log stream established. Tailing logs...", color: "#ffffff" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: ">> End of log stream.", color: "#ffffff" },
  { text: ">> Parsing pod events for deployment issues...", color: "#ffffff" },

  { text: "LAST SEEN TYPE REASON OBJECT MESSAGE", color: "#ffffff" },

  { text: "1m Warning Unhealthy pod/web-api-7c5b6d... Liveness probe failed: Get \"http://10.1.1.2:8080/healthz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#E9C46A" },

  { text: "2m Warning Unhealthy pod/web-api-7c5b6d... Readiness probe failed: Get \"http://10.1.1.2:8080/readyz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#E9C46A" },

  { text: "5m Normal Pulling pod/web-api-7c5b6d... Pulling image \"web-api:latest\"", color: "#ffffff" },
  { text: "5m Normal Pulled pod/web-api-7c5b6d... Successfully pulled image \"web-api:latest\"", color: "#ffffff" },
  { text: "5m Normal Created pod/web-api-7c5b6d... Created container web-api", color: "#ffffff" },
  { text: "5m Normal Started pod/web-api-7c5b6d... Started container web-api", color: "#ffffff" },
];