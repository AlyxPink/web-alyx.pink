# CRUSH Configuration for Fuwari Blog

## Build/Lint/Test Commands
- `bun install` - Install dependencies (uses bun.lock)
- `bun run dev` - Start local dev server at localhost:4321
- `bun run build` - Build production site to ./dist/
- `bun run preview` - Preview build locally before deploying
- `bun run type-check` - Type check TypeScript files
- `bun run lint` - Format and lint code with Biome
- `bun run new-post <filename>` - Create new blog post

## Code Style Guidelines
### Imports
- Use absolute imports when possible
- Group imports: standard libraries, third-party, local imports
- Astro components use .astro extension
- Svelte components use .svelte extension

### Formatting
- Use Biome for consistent formatting
- Tailwind CSS for styling
- Stylus for .styl files
- Follow existing indentation patterns

### Types
- TypeScript is used throughout
- Define types in src/types/
- Use interfaces for component props

### Naming Conventions
- Component files: PascalCase (.astro/.svelte)
- Utility files: kebab-case (.ts)
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Error Handling
- Check for undefined values before use
- Use Astro's built-in error boundaries
- Validate frontmatter in posts

## Special Notes
- Posts are in src/content/posts/
- Config file: src/config.ts
- Uses pnpm scripts but bun packageManager