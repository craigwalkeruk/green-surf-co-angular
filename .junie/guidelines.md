You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

Project context

- The project stores MD specification files in the /specs directory as the source of truth for functionality. Refer to these specs when implementing or reviewing features.

# When writing any code, follow these guidelines:

These instructions are for using Junie effectively

## Verification and Monitoring (Definition of Done – DoD)

- **Always verify after changes:**
  - TypeScript: `npx tsc --noEmit`
  - Project build: `mcp_JetBrainsIDE_build_project`
  - Storybook TypeScript: `npx tsc -p .storybook/tsconfig.json --noEmit`
  - check file problems using `mcp_JetBrainsIDE_find_file_problems`
  - npm processes: Use `mcp_JetBrainsIDE_execute_run_configuration` for npm scripts (e.g., `storybook`, `start`, `test`).
  - Runtime validation: Use `chromedevtools` to inspect the browser for both Storybook and the application. Check for console errors and verify UI changes.

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


TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the any type; use unknown when type is uncertain.

Angular Best Practices

- Always use standalone components over NgModules.
- Do not set standalone: true inside Angular decorators; it is the default in Angular v20+.
- Use signals for state management.
- Implement lazy loading for feature routes.
- Do not use the @HostBinding and @HostListener decorators. Put host bindings inside the host object of the @Component or @Directive decorator instead.
- Use NgOptimizedImage for all static images.
  - NgOptimizedImage does not work for inline base64 images.

Accessibility Requirements

- Must pass all AXE checks.
- Must follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

Components

- Keep components small and focused on a single responsibility.
- Use input() and output() functions instead of decorators.
- Use computed() for derived state.
- Set changeDetection: ChangeDetectionStrategy.OnPush in the @Component decorator.
- Prefer inline templates for small components.
- Prefer Reactive forms instead of Template-driven ones.
- Do not use ngClass; use class bindings instead.
- Do not use ngStyle; use style bindings instead.
- When using external templates/styles, use paths relative to the component TS file.

State Management

- Use signals for local component state.
- Use computed() for derived state.
- Keep state transformations pure and predictable.
- Do not use mutate on signals; use update or set instead.

Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (@if, @for, @switch) instead of *ngIf, *ngFor, *ngSwitch.
- Use the async pipe to handle observables.
- Do not assume globals like new Date() are available.

Services

- Design services around a single responsibility.
- Use the providedIn: 'root' option for singleton services.
- Use the inject() function instead of constructor injection.

# Supported JetBrains IDE MCP Tools

Below is the list of tools provided by the MCP server:

---

## execute_run_configuration

Runs a specific run configuration in the current project and waits up to the specified timeout for it to finish. Use this tool to execute a run configuration retrieved with the `get_run_configurations` tool.

**Returns:** The execution result, including exit code, output, and success status.

**Parameters:**

- `configurationName`: The name of the run configuration to execute.
- `timeout`: Timeout in milliseconds.
- `maxLinesCount`: Maximum number of lines to return.
- `truncateMode`: How to truncate the text: from the start, in the middle, at the end, or do not truncate at all.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_run_configurations

Returns a list of run configurations for the current project. A run configuration defines how to run an application, task, or test suite from sources.

The tool also provides additional information like command line, working directory, and environment variables if they are available.

Use this tool to query the list of available run configurations in the current project.

**Parameters:**

- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_file_problems

Analyzes the specified file for errors and warnings using IntelliJ inspections. Use this tool to identify coding issues, syntax errors, and other problems in a specific file.

**Returns:** A list of problems, including severity, description, and location information.

**Notes:**

- Only files within the project directory can be analyzed.
- Line and column numbers are 1-based.

**Parameters:**

- `filePath`: Path relative to the project root.
- `errorsOnly`: Whether to include only errors or both errors and warnings.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_project_dependencies

Returns a list of all dependencies defined in the project. Provides structured information about library names.

**Parameters:**

- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_project_modules

Returns a list of all modules in the project with their types. Provides structured information about each module, including its name and type.

**Parameters:**

- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## create_new_file

Creates a new file at the specified path within the project directory. Optionally, writes the provided text into the file.

**Notes:**

- Any required parent directories are created automatically.

**Parameters:**

- `pathInProject`: Path where the file should be created relative to the project root.
- `text` (optional): Content to write into the new file.
- `overwrite`: Whether to overwrite an existing file. If set to false, an exception is thrown in case of a conflict.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## find_files_by_glob

Searches for all files in the project whose relative paths match the specified glob pattern. The search is performed recursively in all subdirectories of the project directory or a specified subdirectory. Use this tool to find files by a glob pattern (for example, `**/*.txt`).

**Parameters:**

- `globPattern`: Glob pattern to search for. The pattern must be relative to the project root. Example: `src/**/*.java`.
- `subDirectoryRelativePath` (optional): Subdirectory relative to the project to search in.
- `addExcluded`: Whether to add excluded/ignored files to the search results. Files can be excluded by the user or by ignore rules.
- `fileCountLimit`: Maximum number of files to return.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## find_files_by_name_keyword

Searches for all files in the project whose names contain the specified keyword (case-sensitive). Use this tool to locate files when you know part of the file name.

**Notes:**

- Matches only names, not paths, as the search works via indexes.
- Searches only files within the project directory, excluding libraries and external dependencies.
- Prefer this tool over other find tools because it is much faster, but note that it searches only names, not paths, and does not support glob patterns.

**Parameters:**

- `nameKeyword`: Substring to search for in the file names.
- `fileCountLimit`: Maximum number of files to return.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_all_open_file_paths

Returns the paths of all files opened for editing in the active editor or any other open editors, relative to the project root. Use this tool to explore currently open editors.

**Parameters:**

- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## list_directory_tree

Provides a tree representation of the specified directory in the pseudo-graphic format, similar to the `tree` utility. Use this tool to explore the contents of a directory or the entire project. Prefer this tool over command-line utilities like `ls` or `dir` for directory listing.

**Parameters:**

- `directoryPath`: Path relative to the project root.
- `maxDepth`: Maximum recursion depth.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## open_file_in_editor

Opens the specified file in the JetBrains IDE editor. Requires a `filePath` parameter containing the path to the file to open. The file path can be absolute or relative to the project root.

**Parameters:**

- `filePath`: Path relative to the project root.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## reformat_file

Reformats the specified file in the JetBrains IDE. Use this tool to apply code formatting to a file identified by its path.

**Parameters:**

- `path`: Path relative to the project root.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_file_text_by_path

Retrieves the text content of a file using its path relative to the project root. Use this tool to read file contents when you have the file's project-relative path.

**Notes:**

- For binary files, the tool returns an error.
- If the file is too large, the text will be truncated according to the `truncateMode` parameter, with a content truncated marker.

**Parameters:**

- `pathInProject`: Path where the file should be created relative to the project root.
- `truncateMode`: How to truncate the text: from the start, in the middle, at the end, or do not truncate at all.
- `maxLinesCount`: Maximum number of lines to return.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## replace_text_in_file

Replaces text in a file with flexible options for find-and-replace operations. Use this tool to make targeted changes without replacing the entire file content. This is the most efficient tool for file modifications when you know the exact text to replace.

**Returns one of the following responses:**

- `ok` – replacement was successful.
- `project dir not found` – the project directory cannot be determined.
- `file not found` – the specified file does not exist.
- `could not get document` – the file content cannot be accessed.
- `no occurrences found` – the text to replace was not found in the file.

**Notes:**

- The file is automatically saved after modification.

**Parameters:**

- `pathInProject`: Path to target file relative to the project root.
- `oldText`: Text to be replaced.
- `newText`: Replacement text.
- `replaceAll`: Whether to replace all occurrences.
- `caseSensitive`: Whether the search is case-sensitive.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## search_in_files_by_regex

Searches for a regex pattern within all files in the project using IntelliJ's search engine. Prefer this tool over reading files with command-line tools because it is much faster.

**Notes:**

- Occurrences in the results are highlighted by surrounding them with `||` characters. For example: `some text ||substring|| text`.

**Parameters:**

- `regexPattern`: Regex pattern to search for.
- `directoryToSearch`: Directory to search in, relative to project root. If not specified, searches the entire project.
- `fileMask`: File mask to search for. If not specified, searches for all files. Example: `*.java`.
- `caseSensitive`: Whether the search is case-sensitive.
- `maxUsageCount`: Maximum number of entries to return.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## search_in_files_by_text

Searches for a text substring within all files in the project using IntelliJ's search engine. Prefer this tool over reading files with command-line tools because it is much faster.

**Notes:**

- Occurrences in the results are highlighted by surrounding them with `||` characters. For example: `some text ||substring|| text`.

**Parameters:**

- `searchText`: Text substring to search for.
- `directoryToSearch`: Directory to search in, relative to project root. If not specified, searches the entire project.
- `fileMask`: File mask to search for. If not specified, searches for all files. Example: `*.java`.
- `caseSensitive`: Whether the search is case-sensitive.
- `maxUsageCount`: Maximum number of entries to return.
- `timeout`: Timeout in milliseconds.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_symbol_info

Retrieves information about the symbol at the specified position in the specified file. Provides the same information as IntelliJ IDEA's Quick Documentation feature. The information may include the symbol's name, signature, type, documentation, and other details, depending on the programming language.

**Notes:**

- If the position references a symbol, the tool will return a code snippet with the symbol's declaration, if available. Use this tool to understand a symbol's declaration, semantics, and location.

**Parameters:**

- `filePath`: Path relative to the project root.
- `line`: 1-based line number.
- `column`: 1-based column number.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## rename_refactoring

Renames a symbol (variable, function, class, etc.) in the specified file. Use this tool to perform rename refactoring operations.

**Notes:**

- Unlike a simple text search-and-replace, the `rename_refactoring` tool is a context-aware utility that understands the code's structure. It intelligently updates all references to the specified symbol throughout the project, ensuring code integrity and preventing broken references. It is always the preferred method for renaming programmatic symbols.
- The tool returns a success message if the rename operation was successful, or an error message if the file or symbol cannot be found, or if the rename operation fails.

**Parameters:**

- `pathInProject`: Path relative to the project root.
- `symbolName`: The exact, case-sensitive name of the existing symbol to be renamed (for example, `getUserData`).
- `newName`: The exact, case-sensitive name for the symbol (for example, `fetchUserData`).
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## execute_terminal_command

Executes a specified shell command in the IDE's integrated terminal. Use this tool to run terminal commands within the IDE environment.

**Important features and limitations:**

- Checks if a process is running before collecting output.
- Limits output to 2000 lines (truncates any excess).
- Times out after the specified timeout, with a notification.
- Requires user confirmation unless Brave Mode is enabled in the settings.

**Returns possible responses:**

- Terminal output (truncated if over 2000 lines).
- Output with an interruption notice if the command times out.
- Error messages for various failure cases.

**Parameters:**

- `command`: Shell command to execute.
- `executeInShell`: Whether to execute the command in the user's default shell (bash, zsh, etc.). Useful if the command is a shell script or if it is important to preserve the real environment of the user's terminal. If set to false, the command will be started as a process.
- `reuseExistingTerminalWindow`: Whether to reuse an existing terminal window to avoid creating multiple terminals.
- `timeout`: Timeout in milliseconds.
- `maxLinesCount`: Maximum number of lines to return.
- `truncateMode`: How to truncate the text: from the start, in the middle, at the end, or do not truncate at all.
- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.

---

## get_repositories

Retrieves the list of VCS roots in the project. Use this tool to identify all repositories in a multi-repository project.

**Parameters:**

- `projectPath`: The project path. Always provide this value if known to reduce ambiguous calls. If only the current working directory is known, you can use it as the project path.
