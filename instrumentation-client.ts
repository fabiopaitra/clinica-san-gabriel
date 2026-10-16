import posthog from "posthog-js";

const POSTHOG_PROJECT_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION ?? "us";

if (POSTHOG_PROJECT_TOKEN) {
  posthog.init(POSTHOG_PROJECT_TOKEN, {
    api_host: "/ingest",
    ui_host: `https://${POSTHOG_REGION}.posthog.com`,
    defaults: "2026-08-30",
    session_recording: { maskAllInputs: true },
    enable_recording_console_log: true,
    capture_performance: { web_vitals: true, network_timing: true },
    capture_heatmaps: true,
    capture_dead_clicks: true,
    capture_exceptions: true,
    disable_web_experiments: false,
    logs: { captureConsoleLogs: true },
  });
}
