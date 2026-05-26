const posts = [
  {
    id: 1,
    slug: 'from-html-to-react',
    title: 'From HTML to React — My Lab Journey',
    date: '2025-05-01',
    category: 'Web Dev',
    readTime: '4 min',
    excerpt:
      'Five labs, five major upgrades — here is what I learned converting a plain HTML portfolio into a fully componentised React app.',
    content: `
When I started Lab 1, the goal was simple: build a 5-page portfolio using only HTML and basic CSS. No frameworks, no animations — just semantic structure and colour. It was humbling how much thought goes into something that looks so minimal.

**Lab 2** introduced Bootstrap. Suddenly I had a responsive navbar, cards, modals, and carousels without writing a single line of custom layout CSS. The constraint that made me think hardest: Bootstrap's grid forces you to think in columns, which is actually a great mental model for any layout system.

**Lab 3** was about making everything move. CSS animations, media queries, and transitions. I learned that animation is not decoration — it is communication. A card that lifts on hover tells you "this is interactive." A progress bar that animates on scroll tells you "something just happened."

**Lab 4** brought JavaScript. I replaced all the DOM manipulation from vanilla JS into a single \`main.js\` file. Dark mode with \`localStorage\`. A typewriter effect. Form validation with real-time feedback. Toast notifications. This was the lab where the site started feeling like a real product.

**Lab 5** was the full React conversion. Every piece of UI became a component. Every interaction became state. No more \`getElementById\`. Props replaced attributes. Context replaced prop drilling. And framer-motion replaced CSS keyframes.

The biggest lesson across all five labs: constraints make better engineers. Starting with "only HTML and CSS" meant I truly understood layout before Bootstrap handed it to me. Starting with "only vanilla JS" meant I truly understood the DOM before React abstracted it away.
    `,
  },
  {
    id: 2,
    slug: 'building-lstm-behaviour-detector',
    title: 'Building a Real-Time Behaviour Detector with LSTM',
    date: '2025-04-18',
    category: 'Machine Learning',
    readTime: '5 min',
    excerpt:
      'How I used MediaPipe BlazePose and a Keras LSTM to classify live human actions from a webcam feed — and what actually made it hard.',
    content: `
The idea sounded straightforward: point a webcam at a person, detect what they are doing, and classify the action in real time. The reality was considerably more interesting.

**The pipeline** has three stages. First, MediaPipe BlazePose extracts 33 keypoints per frame — each keypoint is an (x, y, z, visibility) tuple, giving 132 features per frame. Second, a sliding window buffers the last N frames into a sequence tensor. Third, a Keras LSTM classifies the sequence into one of five action classes.

**What made it hard** was not the model — it was the data. Recording clean, consistent training data for five action classes with one person and one webcam took more time than any other part of the project. Lighting changes, slight angle differences, and clothing all affected BlazePose's confidence scores enough to shift the feature distribution.

**The sliding window** was the most important design decision. A single frame tells you almost nothing about behaviour — is the person standing still or about to fall? A window of 30 frames at 30fps gives you one second of context, which is enough for most actions.

**Results** reached above 85% validation accuracy on the held-out test set, which was the target. The model struggled most with the boundary between "standing" and "walking slowly" — which makes sense, as they are temporally similar at low speeds.

The project is open source at [github.com/saimumadi00-sketch/human-pose-detection](https://github.com/saimumadi00-sketch/human-pose-detection).
    `,
  },
  {
    id: 3,
    slug: 'why-dark-mode-is-harder-than-it-looks',
    title: 'Why Dark Mode Is Harder Than It Looks',
    date: '2025-03-30',
    category: 'Web Dev',
    readTime: '3 min',
    excerpt:
      'Dark mode is not just inverting colours. Here is everything I broke and fixed while implementing it with Bootstrap 5 and React context.',
    content: `
When I first implemented dark mode, I thought it would take thirty minutes. Toggle a class on the body, done. It took considerably longer, and here is what I actually learned.

**Bootstrap 5.3 has a native dark mode.** Setting \`data-bs-theme="dark"\` on \`<html>\` flips the entire Bootstrap colour system — backgrounds, text, borders, form inputs, tables. This is the right way to do it. Do not fight Bootstrap's system by overriding colours manually.

**The problem is the SVG text.** Bootstrap's colour system does not know about SVG fill colours. Any SVG that uses hardcoded colours — like a progress ring percentage label — becomes invisible in dark mode. The fix is \`fill: var(--bs-body-color)\` which reads from Bootstrap's CSS variable and adapts automatically.

**localStorage persistence** is obvious in hindsight but easy to get wrong. If you read the preference on mount after the HTML has already rendered, you get a flash of the wrong theme. The solution: read \`localStorage\` synchronously before the first render, either in a script tag in \`index.html\` or in the initial state of your context:

\`\`\`js
const [darkMode, setDarkMode] = useState(
  () => localStorage.getItem('theme') === 'dark'
)
\`\`\`

**Framer-motion** ignores \`data-bs-theme\` because its inline styles bypass the cascade. Any framer-motion animated element with hardcoded colour values will not respond to dark mode. The fix: use CSS variables in your framer-motion style objects instead of raw hex values.

Dark mode done right feels invisible — the user switches it once and never thinks about it again. Dark mode done wrong is a constant reminder that the developer did not test it.
    `,
  },
  {
    id: 4,
    slug: 'multisync-parallel-compression-in-c',
    title: 'Writing a Parallel File Compressor in C',
    date: '2025-03-10',
    category: 'Systems',
    readTime: '4 min',
    excerpt:
      'MultiSync uses pthreads, RLE compression, and CRC32 verification. Here is what I learned writing low-level concurrent C for the first time.',
    content: `
Coming from Python and JavaScript, writing concurrent C felt like a different discipline entirely. No garbage collector, no async/await, no automatic memory management. Just pointers, mutexes, and a lot of respect for the stack.

**MultiSync** compresses multiple files in parallel using a pthread worker pool. Each worker picks a file from a shared queue, compresses it using run-length encoding, writes the output, and computes a CRC32 checksum. A progress bar updates in real time using \`\\r\` carriage returns on stdout.

**RLE is simple but instructive.** Run-length encoding is not going to beat zlib, but implementing it from scratch forces you to think about byte-level data manipulation in a way that high-level compression libraries hide from you. A sequence of identical bytes becomes a count + byte pair. The edge cases — transitions between runs, single-byte runs, maximum run length — are all interesting.

**The hardest part was the mutex.** The shared job queue needs to be thread-safe. My first implementation had a race condition that appeared only under heavy load — classic. The fix was straightforward once I identified it: lock the mutex before checking the queue length, not after.

**CRC32 verification** catches corruption during compression or file I/O. Recomputing the CRC32 of the output and comparing it against the stored checksum gives you confidence that what was written is what you intended to write.

The project reinforced something important: constraints at the systems level — no garbage collector, no safety net — produce a different quality of attention to detail than higher-level languages allow.
    `,
  },
]

export default posts
