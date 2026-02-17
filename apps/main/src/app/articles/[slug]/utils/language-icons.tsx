import {
  BiLogo99Designs,
  BiLogo500Px,
  BiLogoAdobe,
  BiLogoAndroid,
  BiLogoAngular,
  BiLogoApple,
  BiLogoAws,
  BiLogoBootstrap,
  BiLogoCPlusPlus,
  BiLogoCss3,
  BiLogoDjango,
  BiLogoDocker,
  BiLogoFirebase,
  BiLogoFlask,
  BiLogoFlutter,
  BiLogoGit,
  BiLogoGithub,
  BiLogoGitlab,
  BiLogoGoLang,
  BiLogoGoogleCloud,
  BiLogoGraphql,
  BiLogoHeroku,
  BiLogoHtml5,
  BiLogoJava,
  BiLogoJavascript,
  BiLogoKubernetes,
  BiLogoMarkdown,
  BiLogoMicrosoft,
  BiLogoMongodb,
  BiLogoNodejs,
  BiLogoPhp,
  BiLogoPostgresql,
  BiLogoPython,
  BiLogoReact,
  BiLogoReddit,
  BiLogoRedux,
  BiLogoSpringBoot,
  BiLogoTailwindCss,
  BiLogoTux,
  BiLogoTypescript,
  BiLogoUnity,
  BiLogoVuejs,
  BiLogoWindows,
  BiLogoWordpress,
  BiLogoYoutube,
} from 'react-icons/bi';

import type { ComponentType, SVGProps } from 'react';

/**
 * Server-rendered language icon mapping for static generation.
 *
 * This module provides direct imports of all language icons to ensure
 * they can be rendered on the server and included in static HTML.
 * No lazy loading is used to guarantee server-side rendering compatibility.
 */

export const languageIconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  // TypeScript variants
  'ts': BiLogoTypescript,
  'tsx': BiLogoTypescript,
  'typescript': BiLogoTypescript,

  // JavaScript variants
  'js': BiLogoJavascript,
  'jsx': BiLogoJavascript,
  'javascript': BiLogoJavascript,
  'mjs': BiLogoJavascript,

  // HTML variants
  'html': BiLogoHtml5,
  'html-derivative': BiLogoHtml5,

  // CSS variants
  'css': BiLogoCss3,
  'scss': BiLogoCss3,
  'sass': BiLogoCss3,
  'less': BiLogoCss3,

  // C/C++ variants
  'c': BiLogoCPlusPlus,
  'c++': BiLogoCPlusPlus,
  'cpp': BiLogoCPlusPlus,
  'cxx': BiLogoCPlusPlus,

  // Python
  'py': BiLogoPython,
  'python': BiLogoPython,

  // Java
  'java': BiLogoJava,

  // PHP
  'php': BiLogoPhp,

  // Go
  'go': BiLogoGoLang,

  // React
  'react': BiLogoReact,

  // Vue.js
  'vue': BiLogoVuejs,
  'vue-html': BiLogoVuejs,

  // Angular
  'angular': BiLogoAngular,
  'angular-html': BiLogoAngular,
  'angular-ts': BiLogoAngular,

  // Node.js
  'nodejs': BiLogoNodejs,

  // Docker
  'docker': BiLogoDocker,
  'dockerfile': BiLogoDocker,

  // Kubernetes
  'kubernetes': BiLogoKubernetes,

  // Git
  'git': BiLogoGit,
  'git-commit': BiLogoGit,
  'git-rebase': BiLogoGit,

  // GraphQL
  'gql': BiLogoGraphql,
  'graphql': BiLogoGraphql,

  // Markdown
  'md': BiLogoMarkdown,
  'markdown': BiLogoMarkdown,
  'mdx': BiLogoMarkdown,

  // PostgreSQL
  'postgresql': BiLogoPostgresql,

  // MongoDB
  'mongodb': BiLogoMongodb,

  // JSON
  'json': BiLogoJavascript, // Using JS icon as fallback
  'json5': BiLogoJavascript,
  'jsonc': BiLogoJavascript,
  'jsonl': BiLogoJavascript,

  // YAML
  'yaml': BiLogoPython, // Using Python icon as fallback
  'yml': BiLogoPython,

  // XML
  'xml': BiLogoHtml5, // Using HTML icon as fallback

  // Shell/Bash
  'sh': BiLogoTux, // Using Linux icon as fallback
  'shell': BiLogoTux,
  'bash': BiLogoTux,
  'shellscript': BiLogoTux,
  'zsh': BiLogoTux,

  // SQL
  'sql': BiLogoPostgresql, // Using PostgreSQL icon as fallback

  // Ruby
  'rb': BiLogoReddit, // Using Reddit icon as Ruby-like color scheme
  'ruby': BiLogoReddit,

  // Rust
  'rs': BiLogoReddit, // Using Reddit icon as orange/rust-like color
  'rust': BiLogoReddit,

  // Swift
  'swift': BiLogoApple, // Using Apple icon

  // Kotlin
  'kt': BiLogoAndroid, // Using Android icon
  'kts': BiLogoAndroid,
  'kotlin': BiLogoAndroid,

  // Dart
  'dart': BiLogoFlutter, // Using Flutter icon

  // Scala
  'scala': BiLogoJava, // Using Java icon as fallback

  // Haskell
  'hs': BiLogoGithub, // Using GitHub icon as fallback
  'haskell': BiLogoGithub,

  // Clojure
  'clj': BiLogoJava, // Using Java icon as fallback
  'clojure': BiLogoJava,

  // Elixir
  'elixir': BiLogoHeroku, // Using Heroku icon as fallback

  // Erlang
  'erl': BiLogoJavascript, // Using JS icon as fallback
  'erlang': BiLogoJavascript,

  // R
  'r': BiLogoPython, // Using Python icon as fallback

  // Julia
  'jl': BiLogoPython, // Using Python icon as fallback
  'julia': BiLogoPython,

  // Lua
  'lua': BiLogoPython, // Using Python icon as fallback
  'luau': BiLogoPython,

  // Perl
  'perl': BiLogoPython, // Using Python icon as fallback
  'perl6': BiLogoPython,

  // Other languages with reasonable fallbacks
  'c#': BiLogoMicrosoft,
  'csharp': BiLogoMicrosoft,
  'cs': BiLogoMicrosoft,

  'fsharp': BiLogoMicrosoft,
  'fs': BiLogoMicrosoft,

  'vb': BiLogoMicrosoft,

  'powershell': BiLogoMicrosoft,
  'ps1': BiLogoMicrosoft,

  'latex': BiLogoPython, // Using Python icon as fallback
  'tex': BiLogoPython,

  // Web technologies
  'http': BiLogoHtml5,
  'rest': BiLogoHtml5,

  // Configuration files
  'toml': BiLogoPython,
  'ini': BiLogoWindows,
  'properties': BiLogoJava,

  // Database
  'mysql': BiLogoPostgresql,
  'sqlite': BiLogoPostgresql,

  // Cloud
  'aws': BiLogoAws,
  'azure': BiLogoMicrosoft,
  'gcp': BiLogoGoogleCloud,

  // Frameworks
  'django': BiLogoDjango,
  'flask': BiLogoFlask,
  'spring-boot': BiLogoSpringBoot,
  'bootstrap': BiLogoBootstrap,
  'tailwindcss': BiLogoTailwindCss,
  'redux': BiLogoRedux,

  // Tools
  'makefile': BiLogoTux,
  'cmake': BiLogoCPlusPlus,

  // Other
  'diff': BiLogoGit,
  'log': BiLogoPython,
  'plaintext': BiLogoMarkdown,

  // Additional languages not in original mapping but commonly used
  'unity': BiLogoUnity,
  'wordpress': BiLogoWordpress,
  'youtube': BiLogoYoutube,
  'firebase': BiLogoFirebase,
  'adobe': BiLogoAdobe,
  '500px': BiLogo500Px,
  '99designs': BiLogo99Designs,
  'gitlab': BiLogoGitlab,
} as const;
