// src/_Animations/messages.ts (or wherever you keep these)

export type MessageLine = { text: string; color: string };

export const defaultMessage: MessageLine[] = [
  { text: "Hello World!", color: "#FFFFFF" },
];

export const mixedErrors: MessageLine[] = [
  { text: ">> CRITICAL_ERROR: Pod 'web-api-7c5b6d...' in namespace 'prod-us-east-1' is experiencing a CrashLoopBackOff.", color: "#BC4749" },
  { text: ">> Analyzing system state...", color: "#FFFFFF" },
  { text: ">> Establishing connection to Kubernetes context 'prod-us-east-1'... SUCCESS.", color: "#FFFFFF" },
  { text: ">> Found pod: 'web-api-7c5b6d...'. Current status: CrashLoopBackOff. This indicates the container is starting, crashing, and then restarting repeatedly. Kubernetes is applying an exponential back-off delay between restart attempts.", color: "#FFFFFF" },
  { text: ">> Initiating log retrieval from pod 'web-api-7c5b6d...'. This may take a moment.", color: "#FFFFFF" },
  { text: ">> Log stream established. Tailing logs...", color: "#FFFFFF" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: ">> End of log stream.", color: "#FFFFFF" },
  { text: ">> Parsing pod events for deployment issues...", color: "#FFFFFF" },

  { text: "LAST SEEN TYPE REASON OBJECT MESSAGE", color: "#FFFFFF" },

  { text: "1m Warning Unhealthy pod/web-api-7c5b6d... Liveness probe failed: Get \"http://10.1.1.2:8080/healthz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "2m Warning Unhealthy pod/web-api-7c5b6d... Readiness probe failed: Get \"http://10.1.1.2:8080/readyz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#BC4749" },

  { text: "5m Normal Pulling pod/web-api-7c5b6d... Pulling image \"web-api:latest\"", color: "#FFFFFF" },
  { text: "5m Normal Pulled pod/web-api-7c5b6d... Successfully pulled image \"web-api:latest\"", color: "#FFFFFF" },
  { text: "5m Normal Created pod/web-api-7c5b6d... Created container web-api", color: "#FFFFFF" },
  { text: "5m Normal Started pod/web-api-7c5b6d... Started container web-api", color: "#FFFFFF" },
];

export const fullError: MessageLine[] = mixedErrors.map(({ text }) => ({
  text,
  color: "#BC4749",
}));

export const mixedSuccess: MessageLine[] = [
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
  { text: '**CTA:** The primary "Join the Waitlist" form.', color: "#A7C957" },
];

export const fullSuccess: MessageLine[] = [
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
  { text: '**CTA:** The primary "Join the Waitlist" form.', color: "#A7C957" },
];

export const warningMix: MessageLine[] = [
  { text: ">> CRITICAL_ERROR: Pod 'web-api-7c5b6d...' in namespace 'prod-us-east-1' is experiencing a CrashLoopBackOff.", color: "#BC4749" },
  { text: ">> Analyzing system state...", color: "#FFFFFF" },
  { text: ">> Establishing connection to Kubernetes context 'prod-us-east-1'... SUCCESS.", color: "#FFFFFF" },
  { text: ">> Found pod: 'web-api-7c5b6d...'. Current status: CrashLoopBackOff. This indicates the container is starting, crashing, and then restarting repeatedly. Kubernetes is applying an exponential back-off delay between restart attempts.", color: "#FFFFFF" },
  { text: ">> Initiating log retrieval from pod 'web-api-7c5b6d...'. This may take a moment.", color: "#FFFFFF" },
  { text: ">> Log stream established. Tailing logs...", color: "#FFFFFF" },

  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },
  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },
  { text: "Error: connect ECONNREFUSED 127.0.0.1:8080", color: "#BC4749" },
  { text: "at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)", color: "#BC4749" },

  { text: ">> End of log stream.", color: "#FFFFFF" },
  { text: ">> Parsing pod events for deployment issues...", color: "#FFFFFF" },
  { text: "LAST SEEN TYPE REASON OBJECT MESSAGE", color: "#FFFFFF" },

  { text: "1m Warning Unhealthy pod/web-api-7c5b6d... Liveness probe failed: Get \"http://10.1.1.2:8080/healthz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#E9C46A" },
  { text: "2m Warning Unhealthy pod/web-api-7c5b6d... Readiness probe failed: Get \"http://10.1.1.2:8080/readyz\": dial tcp 10.1.1.2:8080: connect: connection refused", color: "#E9C46A" },

  { text: '5m Normal Pulling pod/web-api-7c5b6d... Pulling image "web-api:latest"', color: "#FFFFFF" },
  { text: '5m Normal Pulled pod/web-api-7c5b6d... Successfully pulled image "web-api:latest"', color: "#FFFFFF" },
  { text: "5m Normal Created pod/web-api-7c5b6d... Created container web-api", color: "#FFFFFF" },
  { text: "5m Normal Started pod/web-api-7c5b6d... Started container web-api", color: "#FFFFFF" },
];

export const green: MessageLine[] = [
  { text: 'augmentshell "The web-api pod in prod is crash-looping. Find out why."', color: "#00DD00" },
  { text: "", color: "#FFFFFF" },
  { text: "🤖 Analyzing system state...", color: "#6A994E" },
  { text: "✓ Kubernetes context 'prod-us-east-1' found.", color: "#A7C957" },
  { text: "✓ Pod 'web-api-7c5b6d...' status: CrashLoopBackOff.", color: "#A7C957" },
  { text: "✓ Fetching logs from pod...", color: "#A7C957" },
  { text: "", color: "#FFFFFF" },
  { text: "🧠 Generated diagnostic plan:", color: "#6A994E" },
  { text: "01... Analyze pod logs for critical errors.", color: "#A7C957" },
  { text: "02... Describe pod events for deployment issues.", color: "#A7C957" },
  { text: "03... Check resource limits (CPU/Memory).", color: "#A7C957" },
  { text: "04... Propose a fix based on findings.", color: "#A7C957" },
  { text: "", color: "#FFFFFF" },
  { text: "...Execute this plan? [Y/n]", color: "#6A994E" },
];

export const red: MessageLine[] = [
  { text: "panic: runtime error: invalid memory address or nil pointer", color: "#FF5555" },
  { text: "[signal SIGSEGV: segmentation fault code=0x1 addr=0x0]", color: "#FF5555" },
  { text: "goroutine 1 [running]:", color: "#FFFFFF" },
  { text: "main.handleRequest(...) /app/server.go:155 +0x2e0", color: "#FFFFFF" },
  { text: "[ 543.123456] Out of memory: Killed process 12345 (api-server)", color: "#FFFF55" },
  { text: "npm ERR! code ELIFECYCLE", color: "#FF5555" },
  { text: "nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)", color: "#FFFF55" },
  { text: "Error: ImagePullBackOff", color: "#FF5555" },
  { text: "npm ERR! Exit status 1", color: "#FF5555" },
];
