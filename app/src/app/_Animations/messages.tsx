// This version keeps your exact variable names and structure, but updates the content
// to reflect the new "Overwhelming Error" vs. "Mentorship Solution" narrative.

export const defaultMessage = [{ text: 'Hello World!', color: '#ffffff' }];

// === NEW "OVERWHELMING" RED TERMINAL CONTENT ===
// Populates the 'mixedErrors' variable with the full, chaotic SRE session.
export const mixedErrors = [
  { text: '> kubectl get pods,svc -n prod -o wide', color: '#ffffff' },
  {
    text: 'NAME                      READY   STATUS             RESTARTS   AGE   IP          NODE',
    color: '#A0AEC0',
  },
  {
    text: 'pod/web-api-7c5b6d...     0/1     CrashLoopBackOff   12         15m   10.1.1.2    gke-prod-node-1',
    color: '#BC4749',
  },
  {
    text: 'pod/redis-leader-0        1/1     Running            0          127d  10.1.1.3    gke-prod-node-1',
    color: '#ffffff',
  },
  {
    text: 'pod/prod-database-0       1/1     Running            0          210d  10.1.2.5    gke-prod-node-2',
    color: '#ffffff',
  },
  { text: ' ', color: '#ffffff' },
  {
    text: 'NAME                      TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)',
    color: '#A0AEC0',
  },
  {
    text: 'service/prod-database-svc ClusterIP   10.2.3.5     <none>        5432/TCP',
    color: '#ffffff',
  },
  { text: ' ', color: '#ffffff' },
  {
    text: '> kubectl describe pod web-api-7c5b6d... -n prod',
    color: '#FFFFFF',
  },
  { text: 'Events:', color: '#A0AEC0' },
  {
    text: '  Type     Reason     Age   From               Message',
    color: '#A0AEC0',
  },
  {
    text: '  ----     ------     ---   ----               -------',
    color: '#A0AEC0',
  },
  {
    text: '  Normal   Scheduled  15m   default-scheduler  Successfully assigned prod/web-api-7c5b6d... to gke-prod-node-1',
    color: '#ffffff',
  },
  {
    text: '  Warning  Unhealthy  13m   kubelet            Liveness probe failed: Get "http://10.1.1.2:8080/healthz": dial tcp: connection refused',
    color: '#E9C46A',
  },
  { text: ' ', color: '#ffffff' },
  {
    text: '> kubectl logs -f web-api-7c5b6d... -n prod --previous',
    color: '#FFFFFF',
  },
  { text: 'Server listening on port 8080', color: '#ffffff' },
  { text: 'Connecting to database...', color: '#ffffff' },
  { text: 'Error: connect ECONNREFUSED 10.2.3.4:5432', color: '#BC4749' },
  {
    text: '    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)',
    color: '#BC4749',
  },
];

// This is the all-red version for the 'fullError' variable.
export const fullError = [
  { text: '> kubectl get pods,svc -n prod -o wide', color: '#BC4749' },
  {
    text: 'NAME                      READY   STATUS             RESTARTS   AGE   IP          NODE',
    color: '#BC4749',
  },
  {
    text: 'pod/web-api-7c5b6d...     0/1     CrashLoopBackOff   12         15m   10.1.1.2    gke-prod-node-1',
    color: '#BC4749',
  },
  {
    text: 'pod/redis-leader-0        1/1     Running            0          127d  10.1.1.3    gke-prod-node-1',
    color: '#BC4749',
  },
  {
    text: 'pod/prod-database-0       1/1     Running            0          210d  10.1.2.5    gke-prod-node-2',
    color: '#BC4749',
  },
  { text: ' ', color: '#BC4749' },
  {
    text: 'NAME                      TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)',
    color: '#BC4749',
  },
  {
    text: 'service/prod-database-svc ClusterIP   10.2.3.5     <none>        5432/TCP',
    color: '#BC4749',
  },
  { text: ' ', color: '#BC4749' },
  {
    text: '> kubectl describe pod web-api-7c5b6d... -n prod',
    color: '#BC4749',
  },
  { text: 'Events:', color: '#BC4749' },
  {
    text: '  Type     Reason     Age   From               Message',
    color: '#BC4749',
  },
  {
    text: '  ----     ------     ---   ----               -------',
    color: '#BC4749',
  },
  {
    text: '  Normal   Scheduled  15m   default-scheduler  Successfully assigned prod/web-api-7c5b6d... to gke-prod-node-1',
    color: '#BC4749',
  },
  {
    text: '  Warning  Unhealthy  13m   kubelet            Liveness probe failed: Get "http://10.1.1.2:8080/healthz": dial tcp: connection refused',
    color: '#BC4749',
  },
  { text: ' ', color: '#BC4749' },
  {
    text: '> kubectl logs -f web-api-7c5b6d... -n prod --previous',
    color: '#BC4749',
  },
  { text: 'Server listening on port 8080', color: '#BC4749' },
  { text: 'Connecting to database...', color: '#BC4749' },
  { text: 'Error: connect ECONNREFUSED 10.2.3.4:5432', color: '#BC4749' },
  {
    text: '    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)',
    color: '#BC4749',
  },
];

// === NEW "MENTORSHIP" GREEN TERMINAL CONTENT ===
// Populates the 'mixedSuccess' variable.
export const mixedSuccess = [
  {
    text: '> augmentshell "The web-api pod in prod is crash-looping. Find out why."',
    color: '#FFEC47',
  },
  { text: ' ', color: '#FFFFFF' },
  {
    text: '🤖 Perceiving system and correlating logs, events, and service endpoints...',
    color: '#FFFFFF',
  },
  { text: "✓ Kubernetes context 'prod-us-east-1' analyzed.", color: '#A7C957' },
  {
    text: "✓ Pod 'web-api-7c5b6d...' status confirmed: CrashLoopBackOff.",
    color: '#A7C957',
  },
  { text: ' ', color: '#FFFFFF' },
  { text: '🎯 **Root Cause Identified:**', color: '#63B3ED' },
  {
    text: 'The pod is crashing because its logs show a connection error (`ECONNREFUSED`) to a database IP `10.2.3.4`. However, the Kubernetes service endpoint for the database is at `10.2.3.5`. This mismatch indicates the application is using a stale or hardcoded database URL.',
    color: '#FFFFFF',
  },
  { text: ' ', color: '#FFFFFF' },
  { text: '🧠 **Generated Remediation Plan:**', color: '#63B3ED' },
  {
    text: '   01... **Fetch the correct database endpoint from the `prod-database-svc`.**',
    color: '#FFFFFF',
  },
  {
    text: '         *Why: This ensures we use the stable service discovery name, not a fragile IP address.*',
    color: '#A0AEC0',
  },
  {
    text: "   02... **Update the 'prod-secrets' Kubernetes Secret with the correct `DATABASE_URL`.",
    color: '#FFFFFF',
  },
  {
    text: '         *Why: Secrets are the secure, standard way to provide configuration to applications.*',
    color: '#A0AEC0',
  },
  {
    text: "   03... **Trigger a rolling restart of the 'web-api' deployment.",
    color: '#FFFFFF',
  },
  {
    text: '         *Why: This will gracefully create new pods that will automatically pick up the corrected secret.*',
    color: '#A0AEC0',
  },
  { text: ' ', color: '#FFFFFF' },
  { text: '...Execute this remediation plan? [Y/n]', color: '#FFFFFF' },
];

// Populates the 'fullSuccess' variable with an all-green version.
export const fullSuccess = [
  {
    text: '> augmentshell "The web-api pod in prod is crash-looping. Find out why."',
    color: '#A7C957',
  },
  { text: ' ', color: '#A7C957' },
  {
    text: '🤖 Perceiving system and correlating logs, events, and service endpoints...',
    color: '#A7C957',
  },
  { text: "✓ Kubernetes context 'prod-us-east-1' analyzed.", color: '#A7C957' },
  {
    text: "✓ Pod 'web-api-7c5b6d...' status confirmed: CrashLoopBackOff.",
    color: '#A7C957',
  },
  { text: ' ', color: '#A7C957' },
  { text: '🎯 **Root Cause Identified:**', color: '#A7C957' },
  {
    text: 'The pod is crashing because its logs show a connection error (`ECONNREFUSED`) to a database IP `10.2.3.4`. However, the Kubernetes service endpoint for the database is at `10.2.3.5`. This mismatch indicates the application is using a stale or hardcoded database URL.',
    color: '#A7C957',
  },
  { text: ' ', color: '#A7C957' },
  { text: '🧠 **Generated Remediation Plan:**', color: '#A7C957' },
  {
    text: '   01... **Fetch the correct database endpoint from the `prod-database-svc`.**',
    color: '#A7C957',
  },
  {
    text: '         *Why: This ensures we use the stable service discovery name, not a fragile IP address.*',
    color: '#A7C957',
  },
  {
    text: "   02... **Update the 'prod-secrets' Kubernetes Secret with the correct `DATABASE_URL`.",
    color: '#A7C957',
  },
  {
    text: '         *Why: Secrets are the secure, standard way to provide configuration to applications.*',
    color: '#A7C957',
  },
  {
    text: "   03... **Trigger a rolling restart of the 'web-api' deployment.",
    color: '#A7C957',
  },
  {
    text: '         *Why: This will gracefully create new pods that will automatically pick up the corrected secret.*',
    color: '#A7C957',
  },
  { text: ' ', color: '#A7C957' },
  { text: '...Execute this remediation plan? [Y/n]', color: '#A7C957' },
];

// This keeps your original warningMix structure but uses the new, more relevant SRE error text for consistency.
export const warningMix = [
  { text: '> kubectl get pods,svc -n prod -o wide', color: '#ffffff' },
  {
    text: 'NAME                      READY   STATUS             RESTARTS   AGE   IP          NODE',
    color: '#A0AEC0',
  },
  {
    text: 'pod/web-api-7c5b6d...     0/1     CrashLoopBackOff   12         15m   10.1.1.2    gke-prod-node-1',
    color: '#BC4749',
  },
  { text: ' ', color: '#ffffff' },
  { text: 'Events:', color: '#A0AEC0' },
  {
    text: '  Type     Reason     Age   From               Message',
    color: '#A0AEC0',
  },
  {
    text: '  Warning  Unhealthy  13m   kubelet            Liveness probe failed: Get "http://10.1.1.2:8080/healthz": dial tcp: connection refused',
    color: '#E9C46A',
  },
  {
    text: '  Warning  Unhealthy  13m   kubelet            Readiness probe failed: Get "http://10.1.1.2:8080/readyz": dial tcp: connection refused',
    color: '#E9C46A',
  },
];
