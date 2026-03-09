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
  'ts': <BiLogoTypescript className="text-blue-500" />,
  'tsx': <BiLogoTypescript className="text-blue-500" />,
  'typescript': <BiLogoTypescript className="text-blue-500" />,

  // JavaScript variants
  'js': <BiLogoJavascript className="text-yellow-400" />,
  'jsx': <BiLogoJavascript className="text-yellow-400" />,
  'javascript': <BiLogoJavascript className="text-yellow-400" />,
  'mjs': <BiLogoJavascript className="text-yellow-400" />,

  // HTML variants
  'html': <BiLogoHtml5 className="text-orange-600" />,
  'html-derivative': <BiLogoHtml5 className="text-orange-600" />,

  // CSS variants
  'css': <BiLogoCss3 className="text-blue-600" />,
  'scss': <BiLogoCss3 className="text-pink-600" />,
  'sass': <BiLogoCss3 className="text-pink-600" />,
  'less': <BiLogoCss3 className="text-blue-800" />,

  // C/C++ variants
  'c': <BiLogoCPlusPlus className="text-blue-700" />,
  'c++': <BiLogoCPlusPlus className="text-blue-700" />,
  'cpp': <BiLogoCPlusPlus className="text-blue-700" />,
  'cxx': <BiLogoCPlusPlus className="text-blue-700" />,

  // Python
  'py': <BiLogoPython className="text-blue-400" />,
  'python': <BiLogoPython className="text-blue-400" />,

  // Java
  'java': <BiLogoJava className="text-red-600" />,

  // PHP
  'php': <BiLogoPhp className="text-indigo-400" />,

  // Go
  'go': <BiLogoGoLang className="text-cyan-500" />,

  // React
  'react': <BiLogoReact className="text-cyan-400" />,

  // Vue.js
  'vue': <BiLogoVuejs className="text-emerald-500" />,
  'vue-html': <BiLogoVuejs className="text-emerald-500" />,

  // Angular
  'angular': <BiLogoAngular className="text-red-600" />,
  'angular-html': <BiLogoAngular className="text-red-600" />,
  'angular-ts': <BiLogoAngular className="text-red-600" />,

  // Node.js
  'nodejs': <BiLogoNodejs className="text-green-600" />,

  // Docker
  'docker': <BiLogoDocker className="text-blue-500" />,
  'dockerfile': <BiLogoDocker className="text-blue-500" />,

  // Kubernetes
  'kubernetes': <BiLogoKubernetes className="text-blue-600" />,

  // Git
  'git': <BiLogoGit className="text-orange-600" />,
  'git-commit': <BiLogoGit className="text-orange-600" />,
  'git-rebase': <BiLogoGit className="text-orange-600" />,

  // GraphQL
  'gql': <BiLogoGraphql className="text-pink-600" />,
  'graphql': <BiLogoGraphql className="text-pink-600" />,

  // Markdown
  'md': <BiLogoMarkdown className="text-blue-400" />,
  'markdown': <BiLogoMarkdown className="text-blue-400" />,
  'mdx': <BiLogoMarkdown className="text-blue-400" />,

  // PostgreSQL
  'postgresql': <BiLogoPostgresql className="text-blue-500" />,

  // MongoDB
  'mongodb': <BiLogoMongodb className="text-green-500" />,

  // JSON
  'json': <BiLogoJavascript className="text-yellow-400" />, // Using JS icon as fallback
  'json5': <BiLogoJavascript className="text-yellow-400" />,
  'jsonc': <BiLogoJavascript className="text-yellow-400" />,
  'jsonl': <BiLogoJavascript className="text-yellow-400" />,

  // YAML
  'yaml': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback
  'yml': <BiLogoPython className="text-blue-400" />,

  // XML
  'xml': <BiLogoHtml5 className="text-orange-600" />, // Using HTML icon as fallback

  // Shell/Bash
  'sh': <BiLogoTux className="text-slate-400" />, // Using Linux icon as fallback
  'shell': <BiLogoTux className="text-slate-400" />,
  'bash': <BiLogoTux className="text-slate-400" />,
  'shellscript': <BiLogoTux className="text-slate-400" />,
  'zsh': <BiLogoTux className="text-slate-400" />,

  // SQL
  'sql': <BiLogoPostgresql className="text-blue-500" />, // Using PostgreSQL icon as fallback

  // Ruby
  'rb': <BiLogoReddit className="text-red-600" />, // Using Reddit icon as Ruby-like color scheme
  'ruby': <BiLogoReddit className="text-red-600" />,

  // Rust
  'rs': <BiLogoReddit className="text-orange-700" />, // Using Reddit icon as orange/rust-like color
  'rust': <BiLogoReddit className="text-orange-700" />,

  // Swift
  'swift': <BiLogoApple className="text-slate-400" />, // Using Apple icon

  // Kotlin
  'kt': <BiLogoAndroid className="text-green-500" />, // Using Android icon
  'kts': <BiLogoAndroid className="text-green-500" />,
  'kotlin': <BiLogoAndroid className="text-green-500" />,

  // Dart
  'dart': <BiLogoFlutter className="text-cyan-400" />, // Using Flutter icon

  // Scala
  'scala': <BiLogoJava className="text-red-600" />, // Using Java icon as fallback

  // Haskell
  'hs': <BiLogoGithub className="text-slate-400" />, // Using GitHub icon as fallback
  'haskell': <BiLogoGithub className="text-slate-400" />,

  // Clojure
  'clj': <BiLogoJava className="text-red-600" />, // Using Java icon as fallback
  'clojure': <BiLogoJava className="text-red-600" />,

  // Elixir
  'elixir': <BiLogoHeroku className="text-purple-600" />, // Using Heroku icon as fallback

  // Erlang
  'erl': <BiLogoJavascript className="text-yellow-400" />, // Using JS icon as fallback
  'erlang': <BiLogoJavascript className="text-yellow-400" />,

  // R
  'r': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback

  // Julia
  'jl': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback
  'julia': <BiLogoPython className="text-blue-400" />,

  // Lua
  'lua': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback
  'luau': <BiLogoPython className="text-blue-400" />,

  // Perl
  'perl': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback
  'perl6': <BiLogoPython className="text-blue-400" />,

  // Other languages with reasonable fallbacks
  'c#': <BiLogoMicrosoft className="text-blue-600" />,
  'csharp': <BiLogoMicrosoft className="text-blue-600" />,
  'cs': <BiLogoMicrosoft className="text-blue-600" />,

  'fsharp': <BiLogoMicrosoft className="text-blue-600" />,
  'fs': <BiLogoMicrosoft className="text-blue-600" />,

  'vb': <BiLogoMicrosoft className="text-blue-600" />,

  'powershell': <BiLogoMicrosoft className="text-blue-600" />,
  'ps1': <BiLogoMicrosoft className="text-blue-600" />,

  'latex': <BiLogoPython className="text-blue-400" />, // Using Python icon as fallback
  'tex': <BiLogoPython className="text-blue-400" />,

  // Web technologies
  'http': <BiLogoHtml5 className="text-orange-600" />,
  'rest': <BiLogoHtml5 className="text-orange-600" />,

  // Configuration files
  'toml': <BiLogoPython className="text-blue-400" />,
  'ini': <BiLogoWindows className="text-blue-600" />,
  'properties': <BiLogoJava className="text-red-600" />,

  // Database
  'mysql': <BiLogoPostgresql className="text-blue-500" />,
  'sqlite': <BiLogoPostgresql className="text-blue-500" />,

  // Cloud
  'aws': <BiLogoAws className="text-orange-500" />,
  'azure': <BiLogoMicrosoft className="text-blue-600" />,
  'gcp': <BiLogoGoogleCloud className="text-blue-500" />,

  // Frameworks
  'django': <BiLogoDjango className="text-green-800" />,
  'flask': <BiLogoFlask className="text-slate-400" />,
  'spring-boot': <BiLogoSpringBoot className="text-green-600" />,
  'bootstrap': <BiLogoBootstrap className="text-purple-600" />,
  'tailwindcss': <BiLogoTailwindCss className="text-cyan-400" />,
  'redux': <BiLogoRedux className="text-purple-600" />,

  // Tools
  'makefile': <BiLogoTux className="text-slate-400" />,
  'cmake': <BiLogoCPlusPlus className="text-blue-700" />,

  // Other
  'diff': <BiLogoGit className="text-orange-600" />,
  'log': <BiLogoPython className="text-blue-400" />,
  'plaintext': <BiLogoMarkdown className="text-blue-400" />,

  // Additional languages not in original mapping but commonly used
  'unity': <BiLogoUnity className="text-slate-400" />,
  'wordpress': <BiLogoWordpress className="text-blue-400" />,
  'youtube': <BiLogoYoutube className="text-red-600" />,
  'firebase': <BiLogoFirebase className="text-orange-400" />,
  'adobe': <BiLogoAdobe className="text-red-600" />,
  '500px': <BiLogo500Px className="text-slate-400" />,
  '99designs': <BiLogo99Designs className="text-slate-400" />,
  'gitlab': <BiLogoGitlab className="text-orange-600" />,
} as const;
