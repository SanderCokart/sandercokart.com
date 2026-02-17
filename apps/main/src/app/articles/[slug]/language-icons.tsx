import dynamic from 'next/dynamic';

import type { ComponentType } from 'react';
import type { SVGProps } from 'react';

/**
 * Language icon mapping system for code syntax highlighting.
 *
 * This module provides a comprehensive mapping of programming language identifiers
 * to their corresponding visual icons from the react-icons/bi library. Icons are
 * dynamically imported to reduce bundle size and improve performance.
 *
 * Supports multiple language variants (file extensions, full names) mapped to
 * appropriate brand/technology icons for visual language identification in code blocks.
 */

// Dynamic import all Bi icons for lazy loading and bundle optimization
const BiLogo500Px = dynamic(() => import('react-icons/bi').then(m => m.BiLogo500Px));
const BiLogo99Designs = dynamic(() => import('react-icons/bi').then(m => m.BiLogo99Designs));
const BiLogoAdobe = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAdobe));
const BiLogoAirbnb = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAirbnb));
const BiLogoAlgolia = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAlgolia));
const BiLogoAmazon = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAmazon));
const BiLogoAndroid = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAndroid));
const BiLogoAngular = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAngular));
const BiLogoApple = dynamic(() => import('react-icons/bi').then(m => m.BiLogoApple));
const BiLogoAudible = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAudible));
const BiLogoAws = dynamic(() => import('react-icons/bi').then(m => m.BiLogoAws));
const BiLogoBaidu = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBaidu));
const BiLogoBehance = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBehance));
const BiLogoBing = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBing));
const BiLogoBitcoin = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBitcoin));
const BiLogoBlender = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBlender));
const BiLogoBlogger = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBlogger));
const BiLogoBootstrap = dynamic(() => import('react-icons/bi').then(m => m.BiLogoBootstrap));
const BiLogoCPlusPlus = dynamic(() => import('react-icons/bi').then(m => m.BiLogoCPlusPlus));
const BiLogoChrome = dynamic(() => import('react-icons/bi').then(m => m.BiLogoChrome));
const BiLogoCodepen = dynamic(() => import('react-icons/bi').then(m => m.BiLogoCodepen));
const BiLogoCreativeCommons = dynamic(() => import('react-icons/bi').then(m => m.BiLogoCreativeCommons));
const BiLogoCss3 = dynamic(() => import('react-icons/bi').then(m => m.BiLogoCss3));
const BiLogoDailymotion = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDailymotion));
const BiLogoDeezer = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDeezer));
const BiLogoDevTo = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDevTo));
const BiLogoDeviantart = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDeviantart));
const BiLogoDigg = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDigg));
const BiLogoDigitalocean = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDigitalocean));
const BiLogoDiscordAlt = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDiscordAlt));
const BiLogoDiscord = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDiscord));
const BiLogoDiscourse = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDiscourse));
const BiLogoDjango = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDjango));
const BiLogoDocker = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDocker));
const BiLogoDribbble = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDribbble));
const BiLogoDropbox = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDropbox));
const BiLogoDrupal = dynamic(() => import('react-icons/bi').then(m => m.BiLogoDrupal));
const BiLogoEbay = dynamic(() => import('react-icons/bi').then(m => m.BiLogoEbay));
const BiLogoEdge = dynamic(() => import('react-icons/bi').then(m => m.BiLogoEdge));
const BiLogoEtsy = dynamic(() => import('react-icons/bi').then(m => m.BiLogoEtsy));
const BiLogoFacebookCircle = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFacebookCircle));
const BiLogoFacebookSquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFacebookSquare));
const BiLogoFacebook = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFacebook));
const BiLogoFigma = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFigma));
const BiLogoFirebase = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFirebase));
const BiLogoFirefox = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFirefox));
const BiLogoFlask = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFlask));
const BiLogoFlickrSquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFlickrSquare));
const BiLogoFlickr = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFlickr));
const BiLogoFlutter = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFlutter));
const BiLogoFoursquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoFoursquare));
const BiLogoGit = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGit));
const BiLogoGithub = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGithub));
const BiLogoGitlab = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGitlab));
const BiLogoGmail = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGmail));
const BiLogoGoLang = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGoLang));
const BiLogoGoogleCloud = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGoogleCloud));
const BiLogoGooglePlusCircle = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGooglePlusCircle));
const BiLogoGooglePlus = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGooglePlus));
const BiLogoGoogle = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGoogle));
const BiLogoGraphql = dynamic(() => import('react-icons/bi').then(m => m.BiLogoGraphql));
const BiLogoHeroku = dynamic(() => import('react-icons/bi').then(m => m.BiLogoHeroku));
const BiLogoHtml5 = dynamic(() => import('react-icons/bi').then(m => m.BiLogoHtml5));
const BiLogoImdb = dynamic(() => import('react-icons/bi').then(m => m.BiLogoImdb));
const BiLogoInstagramAlt = dynamic(() => import('react-icons/bi').then(m => m.BiLogoInstagramAlt));
const BiLogoInstagram = dynamic(() => import('react-icons/bi').then(m => m.BiLogoInstagram));
const BiLogoInternetExplorer = dynamic(() => import('react-icons/bi').then(m => m.BiLogoInternetExplorer));
const BiLogoInvision = dynamic(() => import('react-icons/bi').then(m => m.BiLogoInvision));
const BiLogoJava = dynamic(() => import('react-icons/bi').then(m => m.BiLogoJava));
const BiLogoJavascript = dynamic(() => import('react-icons/bi').then(m => m.BiLogoJavascript));
const BiLogoJoomla = dynamic(() => import('react-icons/bi').then(m => m.BiLogoJoomla));
const BiLogoJquery = dynamic(() => import('react-icons/bi').then(m => m.BiLogoJquery));
const BiLogoJsfiddle = dynamic(() => import('react-icons/bi').then(m => m.BiLogoJsfiddle));
const BiLogoKickstarter = dynamic(() => import('react-icons/bi').then(m => m.BiLogoKickstarter));
const BiLogoKubernetes = dynamic(() => import('react-icons/bi').then(m => m.BiLogoKubernetes));
const BiLogoLess = dynamic(() => import('react-icons/bi').then(m => m.BiLogoLess));
const BiLogoLinkedinSquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoLinkedinSquare));
const BiLogoLinkedin = dynamic(() => import('react-icons/bi').then(m => m.BiLogoLinkedin));
const BiLogoMagento = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMagento));
const BiLogoMailchimp = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMailchimp));
const BiLogoMarkdown = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMarkdown));
const BiLogoMastercard = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMastercard));
const BiLogoMastodon = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMastodon));
const BiLogoMediumOld = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMediumOld));
const BiLogoMediumSquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMediumSquare));
const BiLogoMedium = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMedium));
const BiLogoMessenger = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMessenger));
const BiLogoMeta = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMeta));
const BiLogoMicrosoftTeams = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMicrosoftTeams));
const BiLogoMicrosoft = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMicrosoft));
const BiLogoMongodb = dynamic(() => import('react-icons/bi').then(m => m.BiLogoMongodb));
const BiLogoNetlify = dynamic(() => import('react-icons/bi').then(m => m.BiLogoNetlify));
const BiLogoNodejs = dynamic(() => import('react-icons/bi').then(m => m.BiLogoNodejs));
const BiLogoOkRu = dynamic(() => import('react-icons/bi').then(m => m.BiLogoOkRu));
const BiLogoOpera = dynamic(() => import('react-icons/bi').then(m => m.BiLogoOpera));
const BiLogoPatreon = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPatreon));
const BiLogoPaypal = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPaypal));
const BiLogoPeriscope = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPeriscope));
const BiLogoPhp = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPhp));
const BiLogoPinterestAlt = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPinterestAlt));
const BiLogoPinterest = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPinterest));
const BiLogoPlayStore = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPlayStore));
const BiLogoPocket = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPocket));
const BiLogoPostgresql = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPostgresql));
const BiLogoProductHunt = dynamic(() => import('react-icons/bi').then(m => m.BiLogoProductHunt));
const BiLogoPython = dynamic(() => import('react-icons/bi').then(m => m.BiLogoPython));
const BiLogoQuora = dynamic(() => import('react-icons/bi').then(m => m.BiLogoQuora));
const BiLogoReact = dynamic(() => import('react-icons/bi').then(m => m.BiLogoReact));
const BiLogoRedbubble = dynamic(() => import('react-icons/bi').then(m => m.BiLogoRedbubble));
const BiLogoReddit = dynamic(() => import('react-icons/bi').then(m => m.BiLogoReddit));
const BiLogoRedux = dynamic(() => import('react-icons/bi').then(m => m.BiLogoRedux));
const BiLogoSass = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSass));
const BiLogoShopify = dynamic(() => import('react-icons/bi').then(m => m.BiLogoShopify));
const BiLogoSketch = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSketch));
const BiLogoSkype = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSkype));
const BiLogoSlackOld = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSlackOld));
const BiLogoSlack = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSlack));
const BiLogoSnapchat = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSnapchat));
const BiLogoSoundcloud = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSoundcloud));
const BiLogoSpotify = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSpotify));
const BiLogoSpringBoot = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSpringBoot));
const BiLogoSquarespace = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSquarespace));
const BiLogoStackOverflow = dynamic(() => import('react-icons/bi').then(m => m.BiLogoStackOverflow));
const BiLogoSteam = dynamic(() => import('react-icons/bi').then(m => m.BiLogoSteam));
const BiLogoStripe = dynamic(() => import('react-icons/bi').then(m => m.BiLogoStripe));
const BiLogoTailwindCss = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTailwindCss));
const BiLogoTelegram = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTelegram));
const BiLogoTiktok = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTiktok));
const BiLogoTrello = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTrello));
const BiLogoTripAdvisor = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTripAdvisor));
const BiLogoTumblr = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTumblr));
const BiLogoTux = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTux));
const BiLogoTwitch = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTwitch));
const BiLogoTwitter = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTwitter));
const BiLogoTypescript = dynamic(() => import('react-icons/bi').then(m => m.BiLogoTypescript));
const BiLogoUnity = dynamic(() => import('react-icons/bi').then(m => m.BiLogoUnity));
const BiLogoUnsplash = dynamic(() => import('react-icons/bi').then(m => m.BiLogoUnsplash));
const BiLogoUpwork = dynamic(() => import('react-icons/bi').then(m => m.BiLogoUpwork));
const BiLogoVenmo = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVenmo));
const BiLogoVimeo = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVimeo));
const BiLogoVisa = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVisa));
const BiLogoVisualStudio = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVisualStudio));
const BiLogoVk = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVk));
const BiLogoVuejs = dynamic(() => import('react-icons/bi').then(m => m.BiLogoVuejs));
const BiLogoWhatsappSquare = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWhatsappSquare));
const BiLogoWhatsapp = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWhatsapp));
const BiLogoWikipedia = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWikipedia));
const BiLogoWindows = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWindows));
const BiLogoWix = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWix));
const BiLogoWordpress = dynamic(() => import('react-icons/bi').then(m => m.BiLogoWordpress));
const BiLogoXing = dynamic(() => import('react-icons/bi').then(m => m.BiLogoXing));
const BiLogoYahoo = dynamic(() => import('react-icons/bi').then(m => m.BiLogoYahoo));
const BiLogoYelp = dynamic(() => import('react-icons/bi').then(m => m.BiLogoYelp));
const BiLogoYoutube = dynamic(() => import('react-icons/bi').then(m => m.BiLogoYoutube));
const BiLogoZoom = dynamic(() => import('react-icons/bi').then(m => m.BiLogoZoom));

/**
 * Mapping of programming language identifiers to their corresponding icon components.
 *
 * This record maps various language identifiers (file extensions, language names,
 * and aliases) to React icon components from react-icons/bi. The mapping includes:
 * - Primary language identifiers (e.g., 'js', 'python', 'java')
 * - File extensions (e.g., 'ts', 'tsx', 'py')
 * - Full language names (e.g., 'typescript', 'javascript')
 * - Framework and tool variants (e.g., 'react', 'vue', 'docker')
 *
 * Icons are chosen based on official brand colors and visual recognition.
 * Fallback icons are used for languages without specific brand representation.
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
};
