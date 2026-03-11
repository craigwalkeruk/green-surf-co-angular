# Junie Development Tips for JetBrains IDE

These tips are for using Junie effectively in JetBrains IDE projects, especially for Angular/Storybook development.

## Verification and Monitoring (Definition of Done - DoD)

- **Always verify after changes:**
  - TypeScript: `npx tsc --noEmit`
  - Project build: `mcp_JetBrainsIDE_build_project`
  - Storybook TypeScript: `npx tsc -p .storybook/tsconfig.json --noEmit`
  - Storybook build: `npm run build-storybook` or IDE run config
  - Runtime: Check browser console for errors (e.g., DOMTokenList issues)

- **Persistent Watchers & Logs:**
  - Check for existing runs before launching new ones via tool windows.
  - Use `mcp_JetBrainsIDE_get_run_configurations` to list available run configurations.
  - Launch persistent processes (e.g., `npm run storybook`) with `mcp_JetBrainsIDE_execute_run_configuration` for live monitoring in tool windows. Use short timeouts (5s), poll output every 2s if possible, or watch for completion events.
  - Monitor IDE tool windows, run tabs, and logs directly instead of one-off `bash` executions.

## General Workflow

- **Error Prevention:** Fix compilation, build, and runtime errors before submitting. Check each time.
- **Reference Specs:** Always refer to `/specs` MD files as source of truth.
- **Update this file:** Add new tips here as they emerge for future sessions and other developers.

## Tools Priority

- Prefer IDE MCP tools (e.g., `mcp_JetBrainsIDE_*`) over raw `bash` for project-aware operations.
- Use `search_replace` or `mcp_JetBrainsIDE_replace_text_in_file` for edits when possible.

**Last Updated: 2026-03-10**
