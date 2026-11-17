import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public logo
const logoSrc = path.join(__dirname, 'images', 'vega-logo.svg');
const logoDest = path.join(distDir, 'vega-logo.svg');
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, logoDest);
}

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VegaDocs — Air-Gapped Enterprise Document Intelligence & RAG Platform | WTFear</title>
  <meta name="description" content="Institutional RAG & Document Intelligence Platform. Semantic vector search, citation verification, and private LLM inference by WTFear Agency.">
  <link rel="icon" type="image/svg+xml" href="./vega-logo.svg">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              space: '#060B14',
              card: '#0C1322',
              border: '#1A2742',
              cyan: '#00E5FF',
              blue: '#00B0FF',
              sapphire: '#1565C0',
              emerald: '#10B981',
              amber: '#F59E0B'
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #060B14;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #1A2742;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #24385E;
    }
  </style>
</head>
<body class="bg-[#060B14] text-slate-100 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black custom-scrollbar">

  <!-- TOP SOVEREIGN STATUS TICKER -->
  <div class="border-b border-cyan-950/80 bg-[#03060B]/80 backdrop-blur-md px-4 py-2 text-xs flex justify-between items-center text-slate-400">
    <div class="flex items-center gap-2">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
      </span>
      <span class="font-mono text-cyan-400 font-semibold tracking-wider text-[11px]">VEGA RAG CLUSTER: ONLINE</span>
      <span class="text-slate-800 hidden sm:inline">|</span>
      <span class="hidden sm:inline text-slate-400 font-mono text-[11px]">VECTORS INDEXED: 142,890 CHUNKS</span>
      <span class="text-slate-800 hidden md:inline">|</span>
      <span class="hidden md:inline text-emerald-400 font-mono text-[11px]">Zero Public AI Training • 100% Air-Gapped Isolation</span>
    </div>
    <div class="flex items-center gap-4">
      <div id="liveClock" class="font-mono text-slate-400 text-[11px] hidden sm:block"></div>
      <a href="https://github.com/wtfear/VegaDocs" target="_blank" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-cyan-950 text-cyan-300 hover:text-white text-[11px] transition-colors">
        <i data-lucide="github" class="w-3.5 h-3.5"></i>
        <span>wtfear/VegaDocs</span>
      </a>
    </div>
  </div>

  <!-- NAVIGATION HEADER -->
  <header class="border-b border-cyan-950/60 bg-[#0A101E]/90 sticky top-0 z-40 backdrop-blur-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-800 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-300/30 shrink-0">
          <i data-lucide="sparkles" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-extrabold tracking-tight text-white">
              VEGA<span class="text-cyan-400">DOCS</span>
            </span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              v1.19
            </span>
          </div>
          <p class="text-[11px] text-cyan-300/60 hidden sm:block font-medium">Enterprise Knowledge Base &amp; Multi-Model RAG</p>
        </div>
      </div>

      <!-- Workspace Selector -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 font-mono hidden md:inline">Workspace Vault:</span>
        <select id="workspaceSelector" onchange="changeWorkspace()" class="bg-[#060B14] border border-cyan-500/40 rounded-lg px-3 py-1.5 text-xs font-semibold text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer">
          <option value="apex">📑 Apex Capital Deal Room (142 Contracts)</option>
          <option value="health">🧬 Sovereign Health Clinical Protocols (62 Trials)</option>
          <option value="wtfear">🛡️ WTFear Agency Architecture (SOC-2 Vault)</option>
        </select>
      </div>

      <!-- Action Button -->
      <div class="flex items-center gap-3 shrink-0">
        <button onclick="openUploadModal()" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-950 flex items-center gap-1.5 transition-all">
          <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i>
          <span>Ingest New Document</span>
        </button>
      </div>
    </div>
  </header>

  <!-- HERO METRICS STRIP -->
  <section class="border-b border-cyan-950/80 bg-[#0A101E]/40 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- KPI 1 -->
        <div class="p-4 rounded-xl bg-[#0C1322]/80 border border-cyan-950 hover:border-cyan-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Indexed Documents</span>
            <span class="text-cyan-400 font-mono text-[11px]">LanceDB + pgvector</span>
          </div>
          <div id="statDocs" class="text-2xl font-extrabold text-white font-mono mt-2">1,240 Files</div>
          <div class="text-[11px] text-cyan-300/60 mt-1">PDFs, Word, Markdown &amp; Audio</div>
        </div>

        <!-- KPI 2 -->
        <div class="p-4 rounded-xl bg-[#0C1322]/80 border border-cyan-950 hover:border-cyan-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>RAG Query Latency</span>
            <span class="text-emerald-400 font-mono text-[11px]">p95: 38ms</span>
          </div>
          <div class="text-2xl font-extrabold text-emerald-400 font-mono mt-2">24.2ms</div>
          <div class="text-[11px] text-cyan-300/60 mt-1">HNSW Cosine Vector Search</div>
        </div>

        <!-- KPI 3 -->
        <div class="p-4 rounded-xl bg-[#0C1322]/80 border border-cyan-950 hover:border-cyan-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Citation Accuracy Score</span>
            <span class="text-emerald-400 font-mono text-[11px]">Pinpoint</span>
          </div>
          <div class="text-2xl font-extrabold text-cyan-400 font-mono mt-2">99.4%</div>
          <div class="text-[11px] text-cyan-300/60 mt-1">Cohere Rerank v3 Verified</div>
        </div>

        <!-- KPI 4 -->
        <div class="p-4 rounded-xl bg-[#0C1322]/80 border border-cyan-950 hover:border-cyan-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Air-Gapped Data Leakage</span>
            <span class="text-emerald-400 font-mono text-[11px] font-bold">ZERO LEAK</span>
          </div>
          <div class="text-2xl font-extrabold text-white font-mono mt-2">0.00%</div>
          <div class="text-[11px] text-cyan-300/60 mt-1">Zero Third-Party Model Training</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN INTERACTIVE RAG STUDIO -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- LEFT: Workspace Documents & Ingestion Queue -->
      <div class="lg:col-span-1 space-y-6">
        <div class="p-5 rounded-2xl bg-[#0C1322] border border-cyan-950 space-y-4">
          <div class="flex items-center justify-between border-b border-cyan-950 pb-3">
            <h3 class="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="folder-lock" class="w-4 h-4 text-cyan-400"></i>
              <span>Active Document Vault</span>
            </h3>
            <span id="activeDocCount" class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">142 PDFs</span>
          </div>

          <div id="documentList" class="space-y-2 text-xs font-mono">
            <!-- Dynamically populated via JavaScript -->
          </div>

          <button onclick="openUploadModal()" class="w-full py-2.5 rounded-xl border border-dashed border-cyan-800 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Upload PDF / DOCX to Vault</span>
          </button>
        </div>

        <!-- Embedding Cluster Specs -->
        <div class="p-5 rounded-2xl bg-[#0C1322] border border-cyan-950 space-y-3 font-mono text-xs">
          <div class="text-slate-300 font-bold uppercase text-[11px]">Vector Database Configuration:</div>
          <div class="text-slate-400">• Engine: <span class="text-cyan-400">LanceDB + pgvector (Hybrid)</span></div>
          <div class="text-slate-400">• Embedding Model: <span class="text-cyan-400">text-embedding-3-large (3072 dims)</span></div>
          <div class="text-slate-400">• Chunk Strategy: <span class="text-cyan-400">Recursive Character (512 token / 64 overlap)</span></div>
          <div class="text-slate-400">• Reranker: <span class="text-emerald-400">Cohere Rerank v3 (Semantic Cross-Encoder)</span></div>
        </div>
      </div>

      <!-- RIGHT: Interactive RAG Query & Citation Studio -->
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-2xl border border-cyan-950 bg-[#0C1322] overflow-hidden shadow-2xl flex flex-col h-[580px]">
          <!-- Studio Header -->
          <div class="p-4 border-b border-cyan-950 bg-[#090F1B] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40">
                <i data-lucide="message-square-code" class="w-4 h-4 text-cyan-400"></i>
              </div>
              <div>
                <h3 id="ragStudioTitle" class="text-sm font-bold text-white">Apex Capital Deal Room — Semantic Query Session</h3>
                <p class="text-[11px] text-cyan-300/60 font-mono">Model: Sovereign-Mistral-70B (Private Air-Gapped Inference)</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
              PINPOINT CITATIONS
            </span>
          </div>

          <!-- Chat Conversation Log -->
          <div id="chatMessagesContainer" class="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-sans custom-scrollbar">
            <!-- Messages inserted dynamically -->
          </div>

          <!-- Suggested Queries -->
          <div class="px-5 py-2.5 bg-[#090F1B]/60 border-t border-cyan-950/80 flex items-center gap-2 overflow-x-auto text-[11px] font-medium">
            <span class="text-slate-500 font-mono shrink-0">Try Query:</span>
            <button onclick="runQuery('What are the liquidity covenants in the Apex Series B agreement?')" class="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-950 text-cyan-300 hover:text-white shrink-0 transition-colors">
              "Liquidity covenants in Series B?"
            </button>
            <button onclick="runQuery('What is the FDA protocol deviation threshold for Cohort C?')" class="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-950 text-cyan-300 hover:text-white shrink-0 transition-colors">
              "FDA deviation threshold for Cohort C?"
            </button>
            <button onclick="runQuery('How does WTFear enforce PostgreSQL Row-Level Security?')" class="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-950 text-cyan-300 hover:text-white shrink-0 transition-colors">
              "WTFear Row-Level Security architecture?"
            </button>
          </div>

          <!-- Input Bar -->
          <div class="p-4 border-t border-cyan-950 bg-[#090F1B]">
            <form onsubmit="handleQuerySubmit(event)" class="flex gap-2">
              <input 
                type="text" 
                id="queryInput" 
                placeholder="Ask any question across indexed PDF contracts, clinical protocols, or technical manuals..." 
                class="flex-1 bg-[#060B14] border border-cyan-950 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-950 flex items-center gap-2 transition-all">
                <i data-lucide="send" class="w-3.5 h-3.5"></i>
                <span>Query RAG</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- THE WTFEAR ENTERPRISE ADVANTAGE -->
    <div class="rounded-2xl border border-cyan-950 bg-[#090F1B] p-8 space-y-6">
      <div class="text-center max-w-2xl mx-auto">
        <span class="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold">
          AGENCY COMMERCIAL ARCHITECTURE
        </span>
        <h3 class="text-2xl font-extrabold text-white mt-3">Why Enterprises Pay $35,000+ for VegaDocs</h3>
        <p class="text-xs text-slate-400 mt-1">
          Public cloud AI engines (ChatGPT Team, Copilot) upload your confidential contracts to multi-tenant servers. VegaDocs gives enterprises complete data isolation.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 rounded-2xl bg-[#0C1322] border border-cyan-950">
          <div class="h-10 w-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-4">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <h4 class="text-sm font-bold text-white mb-1">Air-Gapped Privacy Sovereignty</h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Runs on your private VPC or on-prem servers. Documents are never stored or analyzed by public foundation models.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#0C1322] border border-cyan-950">
          <div class="h-10 w-10 rounded-xl bg-blue-950 flex items-center justify-center text-blue-400 mb-4">
            <i data-lucide="bookmark-check" class="w-5 h-5"></i>
          </div>
          <h4 class="text-sm font-bold text-white mb-1">Pinpoint Page-Level Citations</h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Eliminates AI hallucinations by providing clickable document excerpts with exact page numbers, paragraph coordinates, and confidence metrics.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#0C1322] border border-cyan-950">
          <div class="h-10 w-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 mb-4">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <h4 class="text-sm font-bold text-white mb-1">Multi-Model Agility</h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Hot-swap between local Ollama/vLLM weights, Claude 3.5 Sonnet, GPT-4o, or Gemini 1.5 Pro without rewriting document vector embeddings.
          </p>
        </div>
      </div>
    </div>
  </main>

  <!-- UPLOAD MODAL -->
  <div id="uploadModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-[#0C1322] border border-cyan-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-cyan-950 pb-3">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          <i data-lucide="file-plus" class="w-4 h-4 text-cyan-400"></i>
          <span>Ingest Document to Vector Vault</span>
        </h3>
        <button onclick="closeModal('uploadModal')" class="text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="space-y-3 text-xs">
        <div>
          <label class="block text-slate-400 mb-1">Target Vault Workspace:</label>
          <select id="modalWorkspaceSelect" class="w-full bg-[#060B14] border border-cyan-950 rounded-lg p-2.5 text-white">
            <option>Apex Capital Deal Room</option>
            <option>Sovereign Health Clinical Protocols</option>
            <option>WTFear Agency Architecture</option>
          </select>
        </div>
        <div class="p-6 border-2 border-dashed border-cyan-900 rounded-xl text-center cursor-pointer hover:border-cyan-400 transition-colors">
          <i data-lucide="upload" class="w-8 h-8 text-cyan-400 mx-auto mb-2"></i>
          <span class="text-slate-300 font-semibold block">Drag and drop PDF, DOCX or CSV</span>
          <span class="text-[11px] text-slate-500">Auto-chunking &amp; text-embedding-3 generation</span>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-cyan-950">
        <button onclick="closeModal('uploadModal')" class="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300">Cancel</button>
        <button onclick="confirmIngestion()" class="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-semibold">Start Embedding</button>
      </div>
    </div>
  </div>

  <!-- TOAST CONTAINER -->
  <div id="toastContainer" class="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none"></div>

  <!-- FOOTER -->
  <footer class="border-t border-cyan-950/80 bg-[#03060B] py-8 text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="font-bold text-slate-300">VEGADOCS</span>
        <span>— Air-Gapped Enterprise Document Intelligence &amp; RAG Platform</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/wtfear/VegaDocs" target="_blank" class="hover:text-cyan-400 transition-colors">GitHub Repository</a>
        <a href="https://github.com/wtfear" target="_blank" class="hover:text-cyan-400 transition-colors">WTFear Organization</a>
        <span>MIT License</span>
      </div>
    </div>
  </footer>

  <!-- SCRIPT LOGIC -->
  <script>
    const WORKSPACE_DATA = {
      apex: {
        title: "Apex Capital Deal Room — Semantic Query Session",
        docs: [
          { name: "Apex_Series_B_TermSheet.pdf", size: "2.4 MB", chunks: "148 chunks", date: "Today" },
          { name: "Delaware_Registry_CapTable.pdf", size: "1.1 MB", chunks: "64 chunks", date: "Yesterday" },
          { name: "LP_Distribution_Waterfall_2026.docx", size: "840 KB", chunks: "42 chunks", date: "Nov 15" },
          { name: "DueDiligence_IP_Assignment.pdf", size: "3.2 MB", chunks: "210 chunks", date: "Nov 12" }
        ],
        chatHistory: [
          {
            role: "user",
            text: "What are the liquidity covenants in the Apex Series B agreement?"
          },
          {
            role: "assistant",
            text: "Under **Section 4.2 (Liquidity Covenants)** of the Series B Preferred Stock Purchase Agreement, the company is required to maintain a minimum unencumbered cash balance of **$2,500,000 USD** at the end of each calendar month. Any variance exceeding 10% requires immediate notice to the lead investor within 5 business days.",
            citation: "Apex_Series_B_TermSheet.pdf • Page 14, Paragraph 3 (Similarity: 98.4% • 28ms)"
          }
        ]
      },
      health: {
        title: "Sovereign Health Clinical Protocols — Semantic Query Session",
        docs: [
          { name: "FDA_Protocol_IND_14209_Amendment.pdf", size: "4.8 MB", chunks: "320 chunks", date: "Today" },
          { name: "IRB_Ethics_Approval_Cohort_C.pdf", size: "1.8 MB", chunks: "98 chunks", date: "Nov 14" },
          { name: "Patient_Eligibility_Criteria_Matrix.xlsx", size: "920 KB", chunks: "56 chunks", date: "Nov 10" }
        ],
        chatHistory: [
          {
            role: "user",
            text: "What is the FDA protocol deviation threshold for Cohort C?"
          },
          {
            role: "assistant",
            text: "According to **FDA IND-14209 Section 8.4**, any deviation exceeding **±3 calendar days** from the scheduled dosage administration must be logged as a major protocol deviation and reported to the Data Safety Monitoring Board (DSMB) within 48 hours.",
            citation: "FDA_Protocol_IND_14209_Amendment.pdf • Page 38, Section 8.4 (Similarity: 99.1% • 22ms)"
          }
        ]
      },
      wtfear: {
        title: "WTFear Agency Architecture — Semantic Query Session",
        docs: [
          { name: "WTFear_Sovereign_Architecture_Blueprint.pdf", size: "5.4 MB", chunks: "410 chunks", date: "Today" },
          { name: "SOC2_Type_II_Compliance_Report.pdf", size: "3.8 MB", chunks: "280 chunks", date: "Nov 16" },
          { name: "Multi_Tenant_RLS_Specification.md", size: "420 KB", chunks: "38 chunks", date: "Nov 14" }
        ],
        chatHistory: [
          {
            role: "user",
            text: "How does WTFear enforce PostgreSQL Row-Level Security?"
          },
          {
            role: "assistant",
            text: "WTFear implements PostgreSQL Row-Level Security via **isolated tenant session tokens** embedded into every transaction context (\`SET LOCAL app.current_tenant_id = ?\`). The kernel query engine enforces \`tenant_id = CURRENT_SETTING('app.current_tenant_id')::UUID\` across all tables, ensuring strict physical multi-tenant isolation with zero application-layer leakage risk.",
            citation: "Multi_Tenant_RLS_Specification.md • Section 2.1 (Similarity: 99.6% • 18ms)"
          }
        ]
      }
    };

    let activeKey = "apex";

    function renderDocs() {
      const data = WORKSPACE_DATA[activeKey];
      document.getElementById("activeDocCount").innerText = data.docs.length + " Files";
      document.getElementById("documentList").innerHTML = data.docs.map(doc => \`
        <div class="p-2.5 rounded-lg bg-[#060B14] border border-cyan-950 hover:border-cyan-500/50 transition-colors flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 truncate">
            <i data-lucide="file" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
            <span class="text-slate-200 truncate">\${doc.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 shrink-0">\${doc.size}</span>
        </div>
      \`).join('');
      lucide.createIcons();
    }

    function renderChat() {
      const data = WORKSPACE_DATA[activeKey];
      document.getElementById("ragStudioTitle").innerText = data.title;
      const container = document.getElementById("chatMessagesContainer");
      container.innerHTML = data.chatHistory.map(msg => {
        if (msg.role === "user") {
          return \`
            <div class="flex justify-end">
              <div class="max-w-xl rounded-2xl bg-cyan-950/70 border border-cyan-600/40 p-4 text-white shadow-lg">
                <div class="text-[10px] text-cyan-300 font-mono mb-1 font-bold">EXECUTIVE QUERY</div>
                <p class="leading-relaxed">\${msg.text}</p>
              </div>
            </div>
          \`;
        } else {
          return \`
            <div class="flex justify-start">
              <div class="max-w-xl rounded-2xl bg-[#060B14] border border-cyan-950 p-4 text-slate-200 shadow-xl space-y-3">
                <div class="flex items-center justify-between border-b border-cyan-950/80 pb-2">
                  <span class="text-[10px] font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                    <i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-400"></i>
                    SYNTHESIZED ANSWER (AIR-GAPPED RAG)
                  </span>
                  <span class="text-[10px] text-slate-500 font-mono">Cohere Rerank: 99.4%</span>
                </div>
                <p class="leading-relaxed">\${msg.text}</p>
                <div class="p-2.5 rounded-lg bg-[#03060B] border border-cyan-900/60 font-mono text-[10px] text-cyan-300 flex items-center gap-2">
                  <i data-lucide="bookmark" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
                  <span>\${msg.citation}</span>
                </div>
              </div>
            </div>
          \`;
        }
      }).join('');
      lucide.createIcons();
      container.scrollTop = container.scrollHeight;
    }

    function changeWorkspace() {
      activeKey = document.getElementById("workspaceSelector").value;
      renderDocs();
      renderChat();
    }

    function runQuery(query) {
      document.getElementById("queryInput").value = query;
      handleQuerySubmit(new Event('submit'));
    }

    function handleQuerySubmit(e) {
      if (e) e.preventDefault();
      const input = document.getElementById("queryInput");
      const text = input.value.trim();
      if (!text) return;

      WORKSPACE_DATA[activeKey].chatHistory.push({ role: "user", text: text });
      renderChat();
      input.value = "";

      showToast("⚡ Vector Embedding & Semantic Reranking Active...");

      setTimeout(() => {
        let answer = "Based on indexed documentation in the **" + activeKey.toUpperCase() + "** vault, the requirements are verified against the cryptographic contract hash. All parameters satisfy the enterprise compliance policy.";
        let citation = "Vault_Index_2026.pdf • Page 7, Section 3.1 (Similarity: 98.9% • 24ms)";

        if (text.toLowerCase().includes("liquidity")) {
          answer = "Under **Section 4.2 (Liquidity Covenants)** of the Series B Preferred Stock Purchase Agreement, the company must maintain a minimum cash reserve of **$2,500,000 USD** at all times.";
          citation = "Apex_Series_B_TermSheet.pdf • Page 14, Paragraph 3 (Similarity: 99.4% • 21ms)";
        } else if (text.toLowerCase().includes("fda") || text.toLowerCase().includes("cohort")) {
          answer = "According to **FDA Protocol IND-14209 Section 8.4**, any variance exceeding **±3 calendar days** must be reported to the DSMB as a major protocol deviation within 48 hours.";
          citation = "FDA_Protocol_IND_14209_Amendment.pdf • Page 38, Section 8.4 (Similarity: 99.1% • 22ms)";
        } else if (text.toLowerCase().includes("security") || text.toLowerCase().includes("rls")) {
          answer = "WTFear enforces PostgreSQL Row-Level Security via **session-level context isolation** (\`SET LOCAL app.current_tenant_id = ?\`). Zero cross-tenant data leakage.";
          citation = "Multi_Tenant_RLS_Specification.md • Section 2.1 (Similarity: 99.6% • 18ms)";
        }

        WORKSPACE_DATA[activeKey].chatHistory.push({
          role: "assistant",
          text: answer,
          citation: citation
        });
        renderChat();
      }, 900);
    }

    function openUploadModal() {
      document.getElementById("uploadModal").classList.remove("hidden");
    }

    function closeModal(id) {
      document.getElementById(id).classList.add("hidden");
    }

    function confirmIngestion() {
      closeModal('uploadModal');
      showToast("📥 Document Ingested & Embedded (LanceDB + text-embedding-3)");
    }

    function showToast(message) {
      const container = document.getElementById("toastContainer");
      const toast = document.createElement("div");
      toast.className = "pointer-events-auto px-4 py-2.5 rounded-xl bg-[#0C1322] border border-cyan-500/40 shadow-2xl text-xs text-white flex items-center gap-2 transform translate-y-2 transition-all";
      toast.innerHTML = \`<span>\${message}</span>\`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 4000);
    }

    function updateClock() {
      const clockEl = document.getElementById("liveClock");
      if (clockEl) {
        const now = new Date();
        clockEl.innerText = now.toUTCString().replace("GMT", "UTC");
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
      renderDocs();
      renderChat();
      updateClock();
      setInterval(updateClock, 1000);
    });
  </script>
</body>
</html>`;

// Write to dist/index.html and root index.html
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf-8');

console.log('✅ VegaDocs distribution successfully built into dist/index.html AND root index.html');
