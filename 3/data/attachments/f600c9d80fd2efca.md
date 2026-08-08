# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/uiMobile.spec.ts >> Mobile UI Tests >> [Giới thiệu] [Toàn bộ trang] Đánh giá trên Mobile
- Location: tests/ui/uiMobile.spec.ts:30:21

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-blink-features=AutomationControlled
<launched> pid=6566
[pid=6566][err] Cannot parse arguments: Unknown option --disable-blink-features=AutomationControlled
Call log:
  - <launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-blink-features=AutomationControlled
  - <launched> pid=6566
  - [pid=6566][err] Cannot parse arguments: Unknown option --disable-blink-features=AutomationControlled
  - [pid=6566] <gracefully close start>
  - [pid=6566] <kill>
  - [pid=6566] <will force kill>
  - [pid=6566] <process did exit: exitCode=1, signal=null>
  - [pid=6566] starting temporary directories cleanup
  - [pid=6566] finished temporary directories cleanup
  - [pid=6566] <gracefully close end>

```