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

import type { ReactNode } from 'react';

/**
 * Server-rendered language icon mapping for static generation.
 *
 * This module provides direct imports of all language icons to ensure
 * they can be rendered on the server and included in static HTML.
 * No lazy loading is used to guarantee server-side rendering compatibility.
 */

export const languageIconMap: Record<string, ReactNode> = {
  // TypeScript variants
  'ts': <BiLogoTypescript className="size-full text-blue-500" />,
  'tsx': <BiLogoTypescript className="size-full text-blue-500" />,
  'typescript': <BiLogoTypescript className="size-full text-blue-500" />,

  // JavaScript variants
  'js': <BiLogoJavascript className="size-full text-yellow-400" />,
  'jsx': <BiLogoJavascript className="size-full text-yellow-400" />,
  'javascript': <BiLogoJavascript className="size-full text-yellow-400" />,
  'mjs': <BiLogoJavascript className="size-full text-yellow-400" />,

  // HTML variants
  'html': <BiLogoHtml5 className="size-full text-orange-600" />,
  'html-derivative': <BiLogoHtml5 className="size-full text-orange-600" />,

  // CSS variants
  'css': <BiLogoCss3 className="size-full text-blue-600" />,
  'scss': <BiLogoCss3 className="size-full text-pink-600" />,
  'sass': <BiLogoCss3 className="size-full text-pink-600" />,
  'less': <BiLogoCss3 className="size-full text-blue-800" />,

  // C/C++ variants
  'c': <BiLogoCPlusPlus className="size-full text-blue-700" />,
  'c++': <BiLogoCPlusPlus className="size-full text-blue-700" />,
  'cpp': <BiLogoCPlusPlus className="size-full text-blue-700" />,
  'cxx': <BiLogoCPlusPlus className="size-full text-blue-700" />,

  // Python
  'py': <BiLogoPython className="size-full text-blue-400" />,
  'python': <BiLogoPython className="size-full text-blue-400" />,

  // Java
  'java': <BiLogoJava className="size-full text-red-600" />,

  // PHP
  'php': <BiLogoPhp className="size-full text-indigo-400" />,

  // Go
  'go': <BiLogoGoLang className="size-full text-cyan-500" />,

  // React
  'react': <BiLogoReact className="size-full text-cyan-400" />,

  // Vue.js
  'vue': <BiLogoVuejs className="size-full text-emerald-500" />,
  'vue-html': <BiLogoVuejs className="size-full text-emerald-500" />,

  // Angular
  'angular': <BiLogoAngular className="size-full text-red-600" />,
  'angular-html': <BiLogoAngular className="size-full text-red-600" />,
  'angular-ts': <BiLogoAngular className="size-full text-red-600" />,

  // Node.js
  'nodejs': <BiLogoNodejs className="size-full text-green-600" />,

  // Docker
  'docker': <BiLogoDocker className="size-full text-blue-500" />,
  'dockerfile': <BiLogoDocker className="size-full text-blue-500" />,

  // Kubernetes
  'kubernetes': <BiLogoKubernetes className="size-full text-blue-600" />,

  // Git
  'git': <BiLogoGit className="size-full text-orange-600" />,
  'git-commit': <BiLogoGit className="size-full text-orange-600" />,
  'git-rebase': <BiLogoGit className="size-full text-orange-600" />,

  // GraphQL
  'gql': <BiLogoGraphql className="size-full text-pink-600" />,
  'graphql': <BiLogoGraphql className="size-full text-pink-600" />,

  // Markdown
  'md': <BiLogoMarkdown className="size-full text-blue-400" />,
  'markdown': <BiLogoMarkdown className="size-full text-blue-400" />,
  'mdx': <BiLogoMarkdown className="size-full text-blue-400" />,

  // PostgreSQL
  'postgresql': <BiLogoPostgresql className="size-full text-blue-500" />,

  // MongoDB
  'mongodb': <BiLogoMongodb className="size-full text-green-500" />,

  // JSON
  'json': <BiLogoJavascript className="size-full text-yellow-400" />, // Using JS icon as fallback
  'json5': <BiLogoJavascript className="size-full text-yellow-400" />,
  'jsonc': <BiLogoJavascript className="size-full text-yellow-400" />,
  'jsonl': <BiLogoJavascript className="size-full text-yellow-400" />,

  // YAML
  'yaml': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback
  'yml': <BiLogoPython className="size-full text-blue-400" />,

  // XML
  'xml': <BiLogoHtml5 className="size-full text-orange-600" />, // Using HTML icon as fallback

  // Shell/Bash
  'sh': <BiLogoTux className="size-full text-slate-400" />, // Using Linux icon as fallback
  'shell': <BiLogoTux className="size-full text-slate-400" />,
  'bash': <BiLogoTux className="size-full text-slate-400" />,
  'shellscript': <BiLogoTux className="size-full text-slate-400" />,
  'zsh': <BiLogoTux className="size-full text-slate-400" />,

  // SQL
  'sql': <BiLogoPostgresql className="size-full text-blue-500" />, // Using PostgreSQL icon as fallback

  // Ruby
  'rb': <BiLogoReddit className="size-full text-red-600" />, // Using Reddit icon as Ruby-like color scheme
  'ruby': <BiLogoReddit className="size-full text-red-600" />,

  // Rust
  'rs': <BiLogoReddit className="size-full text-orange-700" />, // Using Reddit icon as orange/rust-like color
  'rust': <BiLogoReddit className="size-full text-orange-700" />,

  // Swift
  'swift': <BiLogoApple className="size-full text-slate-400" />, // Using Apple icon

  // Kotlin
  'kt': <BiLogoAndroid className="size-full text-green-500" />, // Using Android icon
  'kts': <BiLogoAndroid className="size-full text-green-500" />,
  'kotlin': <BiLogoAndroid className="size-full text-green-500" />,

  // Dart
  'dart': <BiLogoFlutter className="size-full text-cyan-400" />, // Using Flutter icon

  // Scala
  'scala': <BiLogoJava className="size-full text-red-600" />, // Using Java icon as fallback

  // Haskell
  'hs': <BiLogoGithub className="size-full text-slate-400" />, // Using GitHub icon as fallback
  'haskell': <BiLogoGithub className="size-full text-slate-400" />,

  // Clojure
  'clj': <BiLogoJava className="size-full text-red-600" />, // Using Java icon as fallback
  'clojure': <BiLogoJava className="size-full text-red-600" />,

  // Elixir
  'elixir': <BiLogoHeroku className="size-full text-purple-600" />, // Using Heroku icon as fallback

  // Erlang
  'erl': <BiLogoJavascript className="size-full text-yellow-400" />, // Using JS icon as fallback
  'erlang': <BiLogoJavascript className="size-full text-yellow-400" />,

  // R
  'r': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback

  // Julia
  'jl': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback
  'julia': <BiLogoPython className="size-full text-blue-400" />,

  // Lua
  'lua': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback
  'luau': <BiLogoPython className="size-full text-blue-400" />,

  // Perl
  'perl': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback
  'perl6': <BiLogoPython className="size-full text-blue-400" />,

  // Other languages with reasonable fallbacks
  'c#': <BiLogoMicrosoft className="size-full text-blue-600" />,
  'csharp': <BiLogoMicrosoft className="size-full text-blue-600" />,
  'cs': <BiLogoMicrosoft className="size-full text-blue-600" />,

  'fsharp': <BiLogoMicrosoft className="size-full text-blue-600" />,
  'fs': <BiLogoMicrosoft className="size-full text-blue-600" />,

  'vb': <BiLogoMicrosoft className="size-full text-blue-600" />,

  'powershell': <BiLogoMicrosoft className="size-full text-blue-600" />,
  'ps1': <BiLogoMicrosoft className="size-full text-blue-600" />,

  'latex': <BiLogoPython className="size-full text-blue-400" />, // Using Python icon as fallback
  'tex': <BiLogoPython className="size-full text-blue-400" />,

  // Web technologies
  'http': <BiLogoHtml5 className="size-full text-orange-600" />,
  'rest': <BiLogoHtml5 className="size-full text-orange-600" />,

  // Configuration files
  'toml': <BiLogoPython className="size-full text-blue-400" />,
  'ini': <BiLogoWindows className="size-full text-blue-600" />,
  'properties': <BiLogoJava className="size-full text-red-600" />,

  // Database
  'mysql': <BiLogoPostgresql className="size-full text-blue-500" />,
  'sqlite': <BiLogoPostgresql className="size-full text-blue-500" />,

  // Cloud
  'aws': <BiLogoAws className="size-full text-orange-500" />,
  'azure': <BiLogoMicrosoft className="size-full text-blue-600" />,
  'gcp': <BiLogoGoogleCloud className="size-full text-blue-500" />,

  // Frameworks
  'django': <BiLogoDjango className="size-full text-green-800" />,
  'flask': <BiLogoFlask className="size-full text-slate-400" />,
  'spring-boot': <BiLogoSpringBoot className="size-full text-green-600" />,
  'bootstrap': <BiLogoBootstrap className="size-full text-purple-600" />,
  'tailwindcss': <BiLogoTailwindCss className="size-full text-cyan-400" />,
  'redux': <BiLogoRedux className="size-full text-purple-600" />,

  // Tools
  'makefile': <BiLogoTux className="size-full text-slate-400" />,
  'cmake': <BiLogoCPlusPlus className="size-full text-blue-700" />,

  // Other
  'diff': <BiLogoGit className="size-full text-orange-600" />,
  'log': <BiLogoPython className="size-full text-blue-400" />,
  'plaintext': <BiLogoMarkdown className="size-full text-blue-400" />,

  // Additional languages not in original mapping but commonly used
  'unity': <BiLogoUnity className="size-full text-slate-400" />,
  'wordpress': <BiLogoWordpress className="size-full text-blue-400" />,
  'youtube': <BiLogoYoutube className="size-full text-red-600" />,
  'firebase': <BiLogoFirebase className="size-full text-orange-400" />,
  'adobe': <BiLogoAdobe className="size-full text-red-600" />,
  '500px': <BiLogo500Px className="size-full text-slate-400" />,
  '99designs': <BiLogo99Designs className="size-full text-slate-400" />,
  'gitlab': <BiLogoGitlab className="size-full text-orange-600" />,
} as const;
