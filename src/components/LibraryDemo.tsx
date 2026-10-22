"use client";

import { useState, useRef, useId } from "react";
import { Folder, FolderOpen, FileText, Search, ChevronRight, RotateCcw } from "lucide-react";
import {
  DOCS,
  Doc,
  searchDocs,
  breadcrumb,
  progressPercent,
} from "@/lib/library";
import { parseMarkdown, parseInline } from "@/lib/markdown";
import { Kbd } from "@/components/ui/Kbd";
import { cn } from "@/lib/cn";

export function LibraryDemo() {
  const [activeDocId, setActiveDocId] = useState<string>("d2");
  const [searchQuery, setSearchQuery] = useState<string>("dokumen");
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"rendered" | "source">("rendered");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    Operasional: true,
    SDM: true,
  });
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    "0": true,
    "1": true,
  });
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const activeDoc = DOCS.find((d) => d.id === activeDocId) || DOCS[1];
  const searchResults = searchDocs(searchQuery, DOCS);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setActiveResultIndex(0);
    const results = searchDocs(query, DOCS);
    if (query.trim() === "") {
      setLiveAnnouncement("");
    } else if (results.length === 0) {
      setLiveAnnouncement(`Tidak ada hasil untuk ${query}`);
    } else {
      setLiveAnnouncement(`${results.length} hasil untuk ${query}`);
    }
  };

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const handleSelectDoc = (id: string) => {
    setActiveDocId(id);
    const doc = DOCS.find((d) => d.id === id);
    if (doc) {
      const root = doc.path.split("/")[0];
      setOpenFolders((prev) => ({ ...prev, [root]: true }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Focus search with '/'
    if (e.key === "/" && document.activeElement !== searchInputRef.current) {
      e.preventDefault();
      searchInputRef.current?.focus();
      return;
    }

    // Esc clears search
    if (e.key === "Escape") {
      handleSearchChange("");
      searchInputRef.current?.blur();
      return;
    }

    // Listbox navigation with up/down arrows
    if (searchResults.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveResultIndex((prev) => (prev + 1) % searchResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveResultIndex((prev) =>
          prev === 0 ? searchResults.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && searchResults[activeResultIndex]) {
        e.preventDefault();
        handleSelectDoc(searchResults[activeResultIndex].id);
      }
    }
  };

  const handleToggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReset = () => {
    setActiveDocId("d2");
    setSearchQuery("dokumen");
    setActiveResultIndex(0);
    setViewMode("rendered");
    setOpenFolders({ Operasional: true, SDM: true });
    setCompletedSteps({ "0": true, "1": true });
    setLiveAnnouncement("Demo direset");
  };

  // Group docs by root folder
  const folders = ["Hukum", "Operasional", "SDM", "Teknik"];
  const docsByFolder = folders.reduce<Record<string, Doc[]>>((acc, f) => {
    acc[f] = DOCS.filter((d) => d.path.startsWith(f + "/"));
    return acc;
  }, {});

  const crumbs = breadcrumb(activeDoc.path);
  const parsedBlocks = parseMarkdown(activeDoc.markdown);

  // E-learning steps calculation
  const totalSteps = activeDoc.steps ? activeDoc.steps.length : 0;
  const doneStepsCount = activeDoc.steps
    ? activeDoc.steps.filter((_, idx) => completedSteps[idx]).length
    : 0;
  const progress = progressPercent(doneStepsCount, totalSteps);

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Demo interaktif modul Library"
      className="mt-8 border border-line bg-surface text-ink outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
    >
      {/* Title bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="ml-2 font-mono text-ink">prostaff.example / library</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Tinggi tetap: 480px</span>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-ink hover:text-ink-secondary"
            title="Reset demo ke kondisi awal"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* 3-Panel Grid */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0 h-auto lg:h-[480px]">
        {/* Panel 1: Folder Tree (3/12) */}
        <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-line bg-surface-subtle px-3 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">
            <span>Folder</span>
            <span>{folders.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 font-mono text-[12px]">
            {folders.map((folder) => {
              const isOpen = openFolders[folder] ?? false;
              const docs = docsByFolder[folder] || [];
              return (
                <div key={folder} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggleFolder(folder)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-1.5 px-2 py-1 text-left text-ink hover:bg-surface-hover transition-colors font-medium"
                  >
                    {isOpen ? (
                      <FolderOpen className="h-3.5 w-3.5 text-ink-muted shrink-0" />
                    ) : (
                      <Folder className="h-3.5 w-3.5 text-ink-muted shrink-0" />
                    )}
                    <span className="truncate">{folder}</span>
                    <span className="ml-auto text-[10.5px] text-ink-muted font-normal">
                      {docs.length}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ml-4 border-l border-line pl-2 mt-0.5 space-y-0.5">
                      {docs.map((d) => {
                        const isDocActive = d.id === activeDocId;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => handleSelectDoc(d.id)}
                            className={cn(
                              "flex w-full items-center gap-1.5 px-2 py-1 text-left text-[11.5px] transition-colors",
                              isDocActive
                                ? "bg-ink text-surface font-medium"
                                : "text-ink-secondary hover:bg-surface-hover hover:text-ink"
                            )}
                          >
                            <FileText className="h-3 w-3 shrink-0" />
                            <span className="truncate">{d.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel 2: Search & Results (4/12) */}
        <div className="lg:col-span-4 flex flex-col h-full overflow-hidden">
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-line bg-surface-subtle px-3 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">
            <span>Cari</span>
            <Kbd>/</Kbd>
          </div>

          {/* Search Box */}
          <div className="border-b border-line p-2.5">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-ink-muted pointer-events-none" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari judul, jalur, isi..."
                aria-label="Cari dokumen"
                aria-controls={listboxId}
                className="w-full border border-line bg-surface py-1.5 pl-8 pr-2.5 font-mono text-[12px] text-ink outline-none focus:border-ink transition-colors"
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-ink-muted">
              <span>
                {searchQuery.trim() === ""
                  ? "Semua dokumen"
                  : searchResults.length === 0
                  ? "0 hasil"
                  : `${searchResults.length} hasil`}
              </span>
              <span>↑ ↓ enter</span>
            </div>
          </div>

          {/* Results List */}
          <div
            id={listboxId}
            role="listbox"
            aria-label="Daftar hasil pencarian"
            className="flex-1 overflow-y-auto divide-y divide-line font-mono text-[12px]"
          >
            {searchQuery.trim() !== "" && searchResults.length === 0 ? (
              <div className="p-4 text-center text-ink-muted text-[12px]">
                Tidak ada hasil untuk &quot;{searchQuery}&quot;
              </div>
            ) : (
              (searchQuery.trim() === ""
                ? DOCS.map((d) => ({ id: d.id, score: 0 }))
                : searchResults
              ).map((res, idx) => {
                const doc = DOCS.find((d) => d.id === res.id);
                if (!doc) return null;
                const isSelected = idx === activeResultIndex;
                const isCurrent = doc.id === activeDocId;

                return (
                  <div
                    key={doc.id}
                    id={`result-item-${doc.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveResultIndex(idx);
                      handleSelectDoc(doc.id);
                    }}
                    className={cn(
                      "cursor-pointer p-2.5 transition-colors",
                      isSelected
                        ? "bg-surface-hover"
                        : "hover:bg-surface-subtle",
                      isCurrent && "border-l-2 border-l-ink"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink text-[12.5px] truncate">
                        {doc.title}
                      </span>
                      {res.score > 0 && (
                        <span className="border border-line bg-surface px-1 py-0.2 text-[10px] text-ink-muted shrink-0">
                          skor {res.score}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-ink-muted">
                      {doc.path}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Panel 3: Document Content View (5/12) */}
        <div className="lg:col-span-5 flex flex-col h-full overflow-hidden">
          {/* Header with Mode Toggle */}
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-line bg-surface-subtle px-3 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">
            <span className="truncate">Dokumen</span>
            <div className="flex items-center border border-line bg-surface">
              <button
                type="button"
                onClick={() => setViewMode("rendered")}
                aria-pressed={viewMode === "rendered"}
                className={cn(
                  "px-2 py-0.5 text-[10.5px] transition-colors",
                  viewMode === "rendered"
                    ? "bg-ink text-surface font-semibold"
                    : "text-ink-secondary hover:text-ink"
                )}
              >
                Tampilan
              </button>
              <button
                type="button"
                onClick={() => setViewMode("source")}
                aria-pressed={viewMode === "source"}
                className={cn(
                  "px-2 py-0.5 text-[10.5px] transition-colors border-l border-line",
                  viewMode === "source"
                    ? "bg-ink text-surface font-semibold"
                    : "text-ink-secondary hover:text-ink"
                )}
              >
                Sumber
              </button>
            </div>
          </div>

          {/* Doc Viewport */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-5">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[11px] text-ink-muted">
              {crumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  {idx > 0 && <ChevronRight className="h-3 w-3" />}
                  <span>{crumb}</span>
                </span>
              ))}
              {activeDoc.kind === "kursus" && (
                <span className="ml-auto border border-ink px-1.5 py-0.2 text-[10px] font-semibold text-ink">
                  KURSUS
                </span>
              )}
            </div>

            {/* Doc Body */}
            {viewMode === "source" ? (
              <pre className="mt-3 overflow-x-auto border border-line bg-surface-subtle p-3 font-mono text-[11.5px] text-ink leading-relaxed">
                {activeDoc.markdown}
              </pre>
            ) : (
              <div className="mt-3">
                {parsedBlocks.map((block, idx) => {
                  if (block.t === "h1") {
                    return (
                      <h2
                        key={idx}
                        className="font-sans text-[20px] font-bold tracking-tight text-ink mb-2"
                      >
                        {block.x}
                      </h2>
                    );
                  }
                  if (block.t === "h2") {
                    return (
                      <h3
                        key={idx}
                        className="font-sans text-[14px] font-semibold text-ink mt-4 mb-1"
                      >
                        {block.x}
                      </h3>
                    );
                  }
                  if (block.t === "li") {
                    return (
                      <li
                        key={idx}
                        className="ml-4 list-disc font-sans text-[13px] text-ink-secondary"
                      >
                        {block.x}
                      </li>
                    );
                  }
                  // Paragraph with inline bold parsing
                  const inlines = parseInline(block.x);
                  return (
                    <p
                      key={idx}
                      className="font-sans text-[13px] leading-relaxed text-ink-secondary my-1.5"
                    >
                      {inlines.map((item, i) =>
                        typeof item === "string" ? (
                          item
                        ) : (
                          <strong key={i} className="font-semibold text-ink">
                            {item.b}
                          </strong>
                        )
                      )}
                    </p>
                  );
                })}

                {/* E-Learning interactive steps for Kursus */}
                {activeDoc.kind === "kursus" && activeDoc.steps && (
                  <div className="mt-5 border-t border-line pt-3">
                    <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted mb-2">
                      <span>Langkah Kursus</span>
                      <span>
                        Kemajuan: {doneStepsCount}/{totalSteps} ({progress}%)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {activeDoc.steps.map((step, idx) => {
                        const isDone = completedSteps[idx] ?? false;
                        return (
                          <label
                            key={idx}
                            className="flex items-center gap-2 font-mono text-[12px] text-ink cursor-pointer hover:bg-surface-hover p-1 rounded-control"
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => handleToggleStep(idx)}
                              className="h-3.5 w-3.5 border-line-mid rounded-control accent-ink"
                            />
                            <span className={isDone ? "line-through text-ink-muted" : ""}>
                              {step}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
