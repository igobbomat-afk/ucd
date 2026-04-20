import { useState, useRef, useCallback } from 'react';
import {
  Download,
  FileSpreadsheet,
  ChevronLeft,
  CheckCircle2,
  FileText,
  MessageSquare,
  User,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import logo from '@/assets/9606a0e21a211ee2a0fb83b6ddc5e74e18e893c0.png';
import gradientBar from '@/assets/8ea69a91d33ff336ca85ce7c076d9bd46d3972d3.png';
import {
  CORE_COMPETENCIES,
  PROFICIENCY_OPTIONS,
  GRADE_LABELS,
  type Role,
  type Grade,
  type Competency,
  type CompetencyGroup,
  type ProficiencyLevel,
} from '../data/competencies';

interface AssessmentEntry {
  rating: ProficiencyLevel;
  notes: string;
}

interface AssessmentDashboardProps {
  userName: string;
  role: Role;
  actualGrade: Grade;
  onBack: () => void;
}

function getProficiencyOption(value: ProficiencyLevel) {
  return PROFICIENCY_OPTIONS.find((p) => p.value === value) ?? null;
}

const GRADE_BADGE: Record<string, { bg: string; text: string }> = {
  C1: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  C2: { bg: 'bg-blue-100', text: 'text-blue-800' },
  C3: { bg: 'bg-violet-100', text: 'text-violet-800' },
  C4: { bg: 'bg-amber-100', text: 'text-amber-800' },
};

export function AssessmentDashboard({
  userName,
  role,
  actualGrade,
  onBack,
}: AssessmentDashboardProps) {
  const coreCompetencies = role.isUR ? [] : CORE_COMPETENCIES[role.grade];
  const urGroups = role.isUR ? (role.competencyGroups ?? []) : [];
  const isAspiring = actualGrade !== role.grade;

  const [assessments, setAssessments] = useState<Record<string, AssessmentEntry>>({});
  const [activeSection, setActiveSection] = useState<'core' | 'discipline'>('core');
  const [activeURGroup, setActiveURGroup] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(userName);
  const [nameInput, setNameInput] = useState(userName);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const coreSectionRef = useRef<HTMLDivElement>(null);
  const disciplineSectionRef = useRef<HTMLDivElement>(null);
  const urGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getAssessment = useCallback(
    (id: string): AssessmentEntry => assessments[id] ?? { rating: 0 as ProficiencyLevel, notes: '' },
    [assessments]
  );

  const setRating = (id: string, rating: ProficiencyLevel) => {
    setAssessments((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { rating: 0, notes: '' }), rating },
    }));
  };

  const setNotes = (id: string, notes: string) => {
    setAssessments((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { rating: 0, notes: '' }), notes },
    }));
  };

  const allCompetencies = role.isUR
    ? urGroups.flatMap((g) => g.components)
    : [...coreCompetencies, ...role.disciplineCompetencies];
  const assessedCount = allCompetencies.filter(
    (c) => (assessments[c.id]?.rating ?? 0) > 0
  ).length;
  const totalCount = allCompetencies.length;
  const progress = totalCount > 0 ? Math.round((assessedCount / totalCount) * 100) : 0;

  const scrollTo = (section: 'core' | 'discipline') => {
    setActiveSection(section);
    setSidebarOpen(false);
    const ref = section === 'core' ? coreSectionRef : disciplineSectionRef;
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToGroup = (idx: number) => {
    setActiveURGroup(idx);
    setSidebarOpen(false);
    urGroupRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Export PDF ────────────────────────────────────────────────────────────
  const exportPDF = async () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Header bar — #121A38
    doc.setFillColor(18, 26, 56);
    doc.rect(0, 0, 297, 32, 'F');

    // Logo — measure natural dimensions first to preserve aspect ratio
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 42;   // mm — maximum logo width
        const maxH = 16;   // mm — maximum logo height
        const aspect = img.naturalWidth / img.naturalHeight;
        let drawW = maxW;
        let drawH = drawW / aspect;
        if (drawH > maxH) {
          drawH = maxH;
          drawW = drawH * aspect;
        }
        // Vertically centre inside the 32mm header
        const logoY = (32 - drawH) / 2;
        doc.addImage(logo, 'PNG', 12, logoY, drawW, drawH);
        resolve();
      };
      img.onerror = () => resolve(); // skip logo gracefully if it fails
      img.src = logo;
    });

    // Title & meta — positioned after the logo block (logo left-edge 12, max right ~54)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('UCD Skills Self-Assessment', 62, 14);
    doc.setFontSize(9);
    doc.setTextColor(180, 200, 230);
    doc.text(`${sanitizeForPDF(displayName)}  |  ${sanitizeForPDF(role.title)}  |  ${role.grade}`, 62, 22);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 240, 22);
    doc.setTextColor(0, 0, 0);

    const buildRows = (comps: Competency[]) =>
      comps.map((c) => {
        const entry = getAssessment(c.id);
        const profLabel = entry.rating > 0
          ? (getProficiencyOption(entry.rating)?.label ?? '')
          : 'Not assessed';
        return [sanitizeForPDF(c.name), profLabel, sanitizeForPDF(entry.notes || '-')];
      });

    if (role.isUR && urGroups.length > 0) {
      // UR: one table per competency group
      let startY = 38;
      for (let i = 0; i < urGroups.length; i++) {
        const group = urGroups[i];
        if (i > 0) {
          const lastY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable?.finalY ?? startY;
          startY = lastY + 8;
          // Add new page if close to bottom
          if (startY > 185) {
            doc.addPage();
            startY = 15;
          }
        }
        doc.setFontSize(10);
        doc.setTextColor(18, 26, 56);
        doc.text(sanitizeForPDF(`${i + 1}. ${group.name}`), 14, startY - (i === 0 ? 3 : 0));
        doc.setTextColor(0, 0, 0);
        autoTable(doc, {
          startY: i === 0 ? 38 : startY + 4,
          head: [['Component', 'Proficiency Level', 'Notes']],
          body: buildRows(group.components),
          headStyles: { fillColor: [18, 26, 56], textColor: 255, fontSize: 9 },
          bodyStyles: { fontSize: 8, cellPadding: 3 },
          columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 45 }, 2: { cellWidth: 155 } },
          alternateRowStyles: { fillColor: [245, 247, 250] },
          margin: { left: 14, right: 14 },
        });
      }
    } else {
      // Design: Core UCD + Discipline tables
      autoTable(doc, {
        startY: 38,
        head: [['Core UCD Competency', 'Proficiency Level', 'Notes']],
        body: buildRows(coreCompetencies),
        headStyles: { fillColor: [18, 26, 56], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 45 }, 2: { cellWidth: 155 } },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      const afterCore = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable?.finalY ?? 100;

      doc.setFontSize(11);
      doc.setTextColor(18, 26, 56);
      doc.text('Discipline-Specific Competencies', 14, afterCore + 10);
      doc.setTextColor(0, 0, 0);

      autoTable(doc, {
        startY: afterCore + 15,
        head: [['Discipline Competency', 'Proficiency Level', 'Notes']],
        body: buildRows(role.disciplineCompetencies),
        headStyles: { fillColor: [0, 88, 171], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 45 }, 2: { cellWidth: 155 } },
        alternateRowStyles: { fillColor: [245, 248, 255] },
        margin: { left: 14, right: 14 },
      });
    }

    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable?.finalY ?? 200;
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(`${assessedCount} of ${totalCount} competencies assessed (${progress}%)`, 14, finalY + 8);

    doc.save(`UCD_Assessment_${displayName.replace(/\s+/g, '_')}_${role.grade}.pdf`);
  };

  // ── Export Excel ──────────────────────────────────────────────────────────
  const exportExcel = () => {
    const rows: (string | number)[][] = [
      ['UCD Skills Self-Assessment'],
      [],
      ['Name', displayName],
      ['Role', role.title],
      ['Grade', role.grade],
      ['Discipline', role.discipline],
      ['Date', new Date().toLocaleDateString('en-GB')],
      ['Progress', `${assessedCount}/${totalCount} (${progress}%)`],
      [],
    ];

    if (role.isUR && urGroups.length > 0) {
      urGroups.forEach((group, idx) => {
        rows.push([`${idx + 1}. ${group.name}`.toUpperCase()]);
        rows.push([group.summary]);
        rows.push(['Component', 'Description', 'Proficiency Level', 'Notes']);
        group.components.forEach((c) => {
          const entry = getAssessment(c.id);
          const profLabel = entry.rating > 0 ? (getProficiencyOption(entry.rating)?.label ?? '') : 'Not assessed';
          rows.push([c.name, c.description, profLabel, entry.notes || '']);
        });
        rows.push([]);
      });
    } else {
      rows.push(['CORE UCD COMPETENCIES']);
      rows.push(['Competency', 'Description', 'Proficiency Level', 'Notes']);
      coreCompetencies.forEach((c) => {
        const entry = getAssessment(c.id);
        const profLabel = entry.rating > 0 ? (getProficiencyOption(entry.rating)?.label ?? '') : 'Not assessed';
        rows.push([c.name, c.description, profLabel, entry.notes || '']);
      });
      rows.push([]);
      rows.push(['DISCIPLINE-SPECIFIC COMPETENCIES']);
      rows.push(['Competency', 'Description', 'Proficiency Level', 'Notes']);
      role.disciplineCompetencies.forEach((c) => {
        const entry = getAssessment(c.id);
        const profLabel = entry.rating > 0 ? (getProficiencyOption(entry.rating)?.label ?? '') : 'Not assessed';
        rows.push([c.name, c.description, profLabel, entry.notes || '']);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 40 }, { wch: 65 }, { wch: 20 }, { wch: 50 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assessment');
    XLSX.writeFile(wb, `UCD_Assessment_${displayName.replace(/\s+/g, '_')}_${role.grade}.xlsx`);
  };

  const gradeBadge = GRADE_BADGE[role.grade] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
  const coreAssessed = role.isUR ? 0 : coreCompetencies.filter((c) => (assessments[c.id]?.rating ?? 0) > 0).length;
  const discAssessed = role.isUR ? 0 : role.disciplineCompetencies.filter((c) => (assessments[c.id]?.rating ?? 0) > 0).length;

  // Accent colours for UR competency groups
  const UR_GROUP_COLORS = ['#0058AB', '#0891b2', '#6d28d9', '#059669', '#d97706', '#9333ea', '#dc2626'];
  const UR_GROUP_LIGHTS = ['bg-blue-50', 'bg-cyan-50', 'bg-violet-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50', 'bg-red-50'];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="text-white px-3 sm:px-6 py-3 flex items-center gap-2 sm:gap-4 shrink-0 shadow-lg z-10" style={{ backgroundColor: '#121A38' }}>
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onBack}
          className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white transition"
          style={{ fontSize: '13px' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="hidden sm:block w-px h-5 bg-white/20" />

        {/* Logo */}
        <img src={logo} alt="DE UCD Community" className="h-7 w-auto opacity-90 hidden sm:block" />

        <div className="hidden sm:block w-px h-5 bg-white/20" />

        {/* Editable name */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { setDisplayName(nameInput || displayName); setEditingName(false); }
                  if (e.key === 'Escape') setEditingName(false);
                }}
                className="bg-white/10 border border-white/30 rounded px-2 py-1 text-white outline-none"
                style={{ fontSize: '14px', width: '140px' }}
              />
              <button
                onClick={() => { setDisplayName(nameInput || displayName); setEditingName(false); }}
                className="w-6 h-6 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setNameInput(displayName); setEditingName(true); }}
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0" style={{ fontSize: '12px' }}>
                {displayName[0]?.toUpperCase()}
              </div>
              <span className="text-white hidden sm:inline" style={{ fontSize: '14px' }}>{displayName}</span>
              <Pencil className="w-3 h-3 text-white/40 group-hover:text-white/70 transition hidden sm:block" />
            </button>
          )}
          <div className={`ml-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${gradeBadge.bg} ${gradeBadge.text}`}>
            {role.grade}
          </div>
          <span className="text-white/60 truncate hidden sm:inline" style={{ fontSize: '13px' }}>{role.title}</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-white/80 hidden sm:block" style={{ fontSize: '12px' }}>{assessedCount}/{totalCount} assessed</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="relative h-1.5 w-16 sm:w-24 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <div
                  className="absolute inset-y-0 left-0 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundImage: `url(${gradientBar})`,
                    backgroundSize: `${progress > 0 ? Math.ceil(10000 / progress) : 100}% 100%`,
                    backgroundPosition: 'left center',
                  }}
                />
              </div>
              <span className="text-white/50" style={{ fontSize: '10px' }}>{progress}%</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-px h-5 bg-white/20" />

        {/* Exports */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportPDF}
            disabled={assessedCount < totalCount}
            title={assessedCount < totalCount ? `Complete all ${totalCount} competencies to export` : 'Export PDF'}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition text-white"
            style={
              assessedCount < totalCount
                ? { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px', opacity: 0.45, cursor: 'not-allowed' }
                : { backgroundColor: 'rgba(29,184,242,0.15)', border: '1px solid rgba(29,184,242,0.4)', fontSize: '13px' }
            }
          >
            <FileText className="w-3.5 h-3.5" style={{ color: assessedCount < totalCount ? 'rgba(255,255,255,0.4)' : '#1DB8F2' }} />
            <span style={{ color: assessedCount < totalCount ? 'rgba(255,255,255,0.4)' : '#1DB8F2' }} className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={exportExcel}
            disabled={assessedCount < totalCount}
            title={assessedCount < totalCount ? `Complete all ${totalCount} competencies to export` : 'Export Excel'}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition text-white"
            style={
              assessedCount < totalCount
                ? { backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '13px', opacity: 0.45, cursor: 'not-allowed' }
                : { backgroundColor: '#1DB8F2', fontSize: '13px' }
            }
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── Mobile sidebar backdrop ─────────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside
          className={`
            fixed sm:relative inset-y-0 left-0 z-30
            w-72 sm:w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          `}
          style={{ top: 0, bottom: 0 }}
        >
          {/* Mobile drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="text-gray-400 uppercase tracking-wider" style={{ fontSize: '10px' }}>Sections</p>
            <button
              onClick={() => setSidebarOpen(false)}
              className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-3">
            {role.isUR ? (
              /* ── UR: 7 Competency Group navigation ── */
              urGroups.map((group, idx) => {
                const groupComponents = group.components;
                const groupAssessed = groupComponents.filter((c) => (assessments[c.id]?.rating ?? 0) > 0).length;
                const groupTotal = groupComponents.length;
                const isActive = activeURGroup === idx;
                const accentColor = UR_GROUP_COLORS[idx % UR_GROUP_COLORS.length];
                return (
                  <div key={group.id}>
                    <button
                      onClick={() => scrollToGroup(idx)}
                      className={`w-full text-left px-5 py-3 border-l-2 transition-all ${isActive ? '' : 'border-transparent hover:bg-gray-50'}`}
                      style={isActive ? { borderLeftColor: accentColor, backgroundColor: `${accentColor}10` } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="leading-snug"
                          style={{ fontSize: '12px', color: isActive ? accentColor : '#374151' }}
                        >
                          {idx + 1}. {group.name}
                        </span>
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0" style={{ fontSize: '10px' }}>
                          {groupAssessed}/{groupTotal}
                        </span>
                      </div>
                      <div className="relative mt-1.5 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                        <div
                          className="absolute inset-y-0 left-0 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.round((groupAssessed / groupTotal) * 100)}%`,
                            backgroundImage: `url(${gradientBar})`,
                            backgroundSize: `${groupAssessed > 0 ? Math.ceil(groupTotal / groupAssessed * 100) : 100}% 100%`,
                            backgroundPosition: 'left center',
                          }}
                        />
                      </div>
                    </button>
                    {/* Show component dots when this group is active */}
                    {isActive && (
                      <div className="pl-7 pr-4 pb-1">
                        {groupComponents.map((c) => {
                          const entry = getAssessment(c.id);
                          const prof = entry.rating > 0 ? getProficiencyOption(entry.rating) : null;
                          return (
                            <div key={c.id} className="flex items-center gap-2 py-1">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${prof ? prof.dotClass : 'bg-gray-200'}`} />
                              <span className="text-gray-500 truncate" style={{ fontSize: '11px' }}>{c.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* ── Design: Core UCD + Discipline navigation ── */
              <>
                {/* Core UCD nav */}
                <button
                  onClick={() => scrollTo('core')}
                  className={`w-full text-left px-5 py-3 border-l-2 transition-all ${activeSection === 'core' ? 'bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}
                  style={activeSection === 'core' ? { borderLeftColor: '#0058AB' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className={activeSection === 'core' ? 'text-[#0058AB]' : 'text-gray-700'} style={{ fontSize: '13px' }}>
                      Core UCD · {role.grade}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500" style={{ fontSize: '10px' }}>
                      {coreAssessed}/{coreCompetencies.length}
                    </span>
                  </div>
                  <div className="relative mt-1.5 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                    <div
                      className="absolute inset-y-0 left-0 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((coreAssessed / coreCompetencies.length) * 100)}%`,
                        backgroundImage: `url(${gradientBar})`,
                        backgroundSize: `${coreAssessed > 0 ? Math.ceil(coreCompetencies.length / coreAssessed * 100) : 100}% 100%`,
                        backgroundPosition: 'left center',
                      }}
                    />
                  </div>
                </button>

                {/* Core skills list */}
                <div className="pl-7 pr-4 pb-2">
                  {coreCompetencies.map((c) => {
                    const entry = getAssessment(c.id);
                    const prof = entry.rating > 0 ? getProficiencyOption(entry.rating) : null;
                    return (
                      <div key={c.id} className="flex items-center gap-2 py-1.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${prof ? prof.dotClass : 'bg-gray-200'}`} />
                        <span className="text-gray-500 truncate" style={{ fontSize: '12px' }}>{c.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Discipline nav */}
                <button
                  onClick={() => scrollTo('discipline')}
                  className={`w-full text-left px-5 py-3 border-l-2 transition-all mt-1 ${activeSection === 'discipline' ? 'bg-violet-50 border-violet-500' : 'border-transparent hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${activeSection === 'discipline' ? 'text-violet-700' : 'text-gray-700'}`} style={{ fontSize: '13px' }}>
                      Discipline Specific
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500" style={{ fontSize: '10px' }}>
                      {discAssessed}/{role.disciplineCompetencies.length}
                    </span>
                  </div>
                  <div className="relative mt-1.5 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                    <div
                      className="absolute inset-y-0 left-0 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((discAssessed / role.disciplineCompetencies.length) * 100)}%`,
                        backgroundImage: `url(${gradientBar})`,
                        backgroundSize: `${discAssessed > 0 ? Math.ceil(role.disciplineCompetencies.length / discAssessed * 100) : 100}% 100%`,
                        backgroundPosition: 'left center',
                      }}
                    />
                  </div>
                </button>

                <div className="pl-7 pr-4 pb-2">
                  {role.disciplineCompetencies.map((c) => {
                    const entry = getAssessment(c.id);
                    const prof = entry.rating > 0 ? getProficiencyOption(entry.rating) : null;
                    return (
                      <div key={c.id} className="flex items-center gap-2 py-1.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${prof ? prof.dotClass : 'bg-gray-200'}`} />
                        <span className="text-gray-500 truncate" style={{ fontSize: '12px' }}>{c.name}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </nav>

          {/* Bottom summary */}
          <div className="border-t border-gray-100 px-5 py-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-500" style={{ fontSize: '12px' }}>Overall</span>
              <span className="text-gray-700" style={{ fontSize: '12px' }}>{assessedCount}/{totalCount}</span>
            </div>
            <div className="relative h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
              <div
                className="absolute inset-y-0 left-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundImage: `url(${gradientBar})`,
                  backgroundSize: `${progress > 0 ? Math.ceil(10000 / progress) : 100}% 100%`,
                  backgroundPosition: 'left center',
                }}
              />
            </div>
            {assessedCount === totalCount && (
              <div className="mt-3 flex items-center gap-1.5" style={{ fontSize: '12px', color: '#0058AB' }}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Assessment complete
              </div>
            )}
          </div>
        </aside>

        {/* ── Main scroll area ────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">

          {/* Role banner */}
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1d365a] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-gray-900" style={{ fontSize: '17px', fontWeight: 500 }}>{role.title}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${gradeBadge.bg} ${gradeBadge.text}`}>{role.grade}</span>
                  {isAspiring && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-700">
                      <TrendingUp className="w-3 h-3" />
                      Aspiring from {GRADE_LABELS[actualGrade].split('·')[0].trim()}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: '13px' }}>{role.description}</p>
                {isAspiring && (
                  <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#FFF8E7', border: '1px solid #FDE68A' }}>
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-amber-700" style={{ fontSize: '11px' }}>
                      You're assessing yourself against <strong>{GRADE_LABELS[role.grade]}</strong> competencies as part of your promotion preparation from <strong>{GRADE_LABELS[actualGrade]}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proficiency scale legend */}
          <div className="px-8 pb-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: '10px' }}>Proficiency Scale</span>
              </div>
              <div className="grid grid-cols-5 divide-x divide-gray-100">
                {PROFICIENCY_OPTIONS.map((opt) => (
                  <div key={opt.value} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${opt.dotClass}`} />
                      <span className="text-gray-800" style={{ fontSize: '13px', fontWeight: 500 }}>{opt.label}</span>
                    </div>
                    <p className="text-gray-400 leading-snug" style={{ fontSize: '11px' }}>{opt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Core UCD scoring table ───────────────────────────────────── */}
          {role.isUR ? (
            /* ── UR: 7 competency group tables ── */
            urGroups.map((group, idx) => (
              <div
                key={group.id}
                className={`px-4 sm:px-8 ${idx < urGroups.length - 1 ? 'pb-6' : 'pb-10'}`}
                ref={(el) => { urGroupRefs.current[idx] = el; }}
              >
                <ScoringTable
                  title={`${idx + 1}. ${group.name}`}
                  subtitle={group.summary}
                  competencies={group.components}
                  accentColor={UR_GROUP_COLORS[idx % UR_GROUP_COLORS.length]}
                  accentLight={UR_GROUP_LIGHTS[idx % UR_GROUP_LIGHTS.length]}
                  getAssessment={getAssessment}
                  setRating={setRating}
                  setNotes={setNotes}
                />
              </div>
            ))
          ) : (
            /* ── Design: Core UCD + Discipline tables ── */
            <>
              <div className="px-4 sm:px-8 pb-6" ref={coreSectionRef}>
                <ScoringTable
                  title={`Core UCD Competencies · ${role.grade}`}
                  subtitle="Shared across all UCD roles at this grade"
                  competencies={coreCompetencies}
                  accentColor="#1d365a"
                  accentLight="bg-blue-50"
                  getAssessment={getAssessment}
                  setRating={setRating}
                  setNotes={setNotes}
                />
              </div>
              <div className="px-4 sm:px-8 pb-10" ref={disciplineSectionRef}>
                <ScoringTable
                  title="Discipline-Specific Competencies"
                  subtitle={`Unique skills for ${role.title}`}
                  competencies={role.disciplineCompetencies}
                  accentColor="#6d28d9"
                  accentLight="bg-violet-50"
                  getAssessment={getAssessment}
                  setRating={setRating}
                  setNotes={setNotes}
                />
              </div>
            </>
          )}

          {/* Completion banner */}
          {assessedCount === totalCount && (
            <div className="mx-8 mb-10 p-5 rounded-xl flex items-center gap-4" style={{ backgroundColor: '#EBF5FF', border: '1px solid #93C5FD' }}>
              <CheckCircle2 className="w-8 h-8 shrink-0" style={{ color: '#0058AB' }} />
              <div>
                <div className="text-gray-800" style={{ fontSize: '15px', fontWeight: 500 }}>Assessment complete!</div>
                <div className="text-gray-600" style={{ fontSize: '13px' }}>
                  All {totalCount} competencies assessed. Download your results below.
                </div>
              </div>
              <div className="ml-auto flex gap-2 shrink-0">
                <button
                  onClick={exportPDF}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg hover:opacity-80 transition"
                  style={{ border: '1px solid #0058AB', color: '#0058AB', fontSize: '13px' }}
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button
                  onClick={exportExcel}
                  className="flex items-center gap-1.5 px-3 py-2 text-white rounded-lg hover:opacity-90 transition"
                  style={{ backgroundColor: '#0058AB', fontSize: '13px' }}
                >
                  <Download className="w-3.5 h-3.5" /> Excel
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── ScoringTable ──────────────────────────────────────────────────────────────

// Proficiency colour map for the mobile select indicator
const PROFICIENCY_COLORS: Record<number, string> = {
  1: '#1DB8F2',
  2: '#00D5D0',
  3: '#FEB100',
  4: '#FF816E',
  5: '#71609E',
};

interface ScoringTableProps {
  title: string;
  subtitle: string;
  competencies: Competency[];
  accentColor: string;
  accentLight: string;
  getAssessment: (id: string) => { rating: ProficiencyLevel; notes: string };
  setRating: (id: string, rating: ProficiencyLevel) => void;
  setNotes: (id: string, notes: string) => void;
}

function ScoringTable({
  title,
  subtitle,
  competencies,
  accentColor,
  accentLight,
  getAssessment,
  setRating,
  setNotes,
}: ScoringTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ borderLeft: `4px solid ${accentColor}` }}>
        <div>
          <h3 className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>{title}</h3>
          <p className="text-gray-400" style={{ fontSize: '12px' }}>{subtitle}</p>
        </div>
      </div>

      {/* Column headers — desktop only */}
      <div className="hidden sm:grid border-b border-gray-100" style={{ gridTemplateColumns: '2fr repeat(5, 1fr) auto' }}>
        <div className="px-5 py-3 bg-gray-50 border-r border-gray-100">
          <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: '10px' }}>Competency</span>
        </div>
        {PROFICIENCY_OPTIONS.map((opt) => (
          <div key={opt.value} className={`px-3 py-3 text-center border-r border-gray-100 ${opt.headerClass}`}>
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <div className={`w-2 h-2 rounded-full ${opt.dotClass}`} />
              <span style={{ fontSize: '11px', fontWeight: 500 }}>{opt.label}</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-3 bg-gray-50 text-center">
          <span className="text-gray-400 uppercase tracking-wider" style={{ fontSize: '10px' }}>Notes</span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {competencies.map((c, idx) => (
          <ScoringRow
            key={c.id}
            index={idx + 1}
            competency={c}
            entry={getAssessment(c.id)}
            onRatingChange={(rating) => setRating(c.id, rating)}
            onNotesChange={(notes) => setNotes(c.id, notes)}
            accentLight={accentLight}
          />
        ))}
      </div>
    </div>
  );
}

// ── ScoringRow ────────────────────────────────────────────────────────────────

interface ScoringRowProps {
  index: number;
  competency: Competency;
  entry: { rating: ProficiencyLevel; notes: string };
  onRatingChange: (rating: ProficiencyLevel) => void;
  onNotesChange: (notes: string) => void;
  accentLight: string;
}

function ScoringRow({ index, competency, entry, onRatingChange, onNotesChange, accentLight }: ScoringRowProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isAssessed = entry.rating > 0;
  const selectedProf = isAssessed ? getProficiencyOption(entry.rating) : null;
  const selectedColor = isAssessed ? PROFICIENCY_COLORS[entry.rating] : null;

  return (
    <div className={`${isAssessed ? accentLight + '/30' : ''} transition-colors`}>

      {/* ── Mobile layout: dropdown select ──────────────────────────────── */}
      <div className="sm:hidden px-4 py-3">
        <div className="flex items-start gap-3">
          {/* Badge */}
          <span
            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${isAssessed ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
            style={isAssessed ? { backgroundColor: '#0058AB', fontSize: '11px' } : { fontSize: '11px' }}
          >
            {isAssessed ? <Check className="w-3 h-3" /> : index}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-gray-900" style={{ fontSize: '13px', fontWeight: 500 }}>{competency.name}</div>
            {expanded ? (
              <p className="text-gray-400 mt-1 leading-relaxed" style={{ fontSize: '12px' }}>{competency.description}</p>
            ) : (
              <p className="text-gray-400 mt-0.5 line-clamp-2" style={{ fontSize: '12px' }}>{competency.description}</p>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-0.5 text-gray-400 hover:text-gray-600 mt-0.5 transition"
              style={{ fontSize: '11px' }}
            >
              {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Show more</>}
            </button>

            {/* Dropdown */}
            <div className="relative mt-2">
              <select
                value={entry.rating}
                onChange={(e) => onRatingChange(Number(e.target.value) as ProficiencyLevel)}
                className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border bg-white focus:outline-none transition"
                style={{
                  fontSize: '13px',
                  borderColor: selectedColor ?? '#e5e7eb',
                  borderWidth: selectedColor ? '2px' : '1px',
                  color: selectedColor ?? '#6b7280',
                  boxShadow: selectedColor ? `0 0 0 2px ${selectedColor}22` : undefined,
                }}
              >
                <option value={0}>Not assessed</option>
                {PROFICIENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              {/* Colour dot */}
              {selectedColor && (
                <div
                  className="pointer-events-none absolute inset-y-0 right-7 flex items-center"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedColor }} />
                </div>
              )}
            </div>
          </div>

          {/* Notes toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`shrink-0 relative p-2 rounded-lg transition mt-0.5 ${
              showNotes ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
            title="Add notes"
          >
            <MessageSquare className="w-4 h-4" />
            {entry.notes && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1d365a]" />
            )}
          </button>
        </div>

        {/* Notes panel – mobile */}
        {showNotes && (
          <div className="mt-2 ml-9 px-3 py-3 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: '11px' }}>
              Notes / Evidence
            </label>
            <textarea
              rows={3}
              value={entry.notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Add context, examples, or evidence…"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#1d365a]/20 focus:border-[#1d365a]/50 transition"
              style={{ fontSize: '12px' }}
            />
          </div>
        )}
      </div>

      {/* ── Desktop layout: grid with radio cells ───────────────────────── */}
      <div className="hidden sm:block">
        <div className="grid items-center" style={{ gridTemplateColumns: '2fr repeat(5, 1fr) auto' }}>

          {/* Competency name + description */}
          <div className="px-5 py-4 border-r border-gray-100 flex items-start gap-3">
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${isAssessed ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
              style={isAssessed ? { backgroundColor: '#0058AB', fontSize: '11px' } : { fontSize: '11px' }}
            >
              {isAssessed ? <Check className="w-3 h-3" /> : index}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-gray-900" style={{ fontSize: '13px', fontWeight: 500 }}>{competency.name}</div>
              {expanded ? (
                <p className="text-gray-400 mt-1 leading-relaxed" style={{ fontSize: '12px' }}>{competency.description}</p>
              ) : (
                <p className="text-gray-400 mt-0.5 line-clamp-1" style={{ fontSize: '12px' }}>{competency.description}</p>
              )}
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-0.5 text-gray-400 hover:text-gray-600 mt-1 transition"
                style={{ fontSize: '11px' }}
              >
                {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Show more</>}
              </button>
            </div>
          </div>

          {/* Proficiency cells */}
          {PROFICIENCY_OPTIONS.map((opt) => {
            const isActive = entry.rating === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => onRatingChange(isActive ? (0 as ProficiencyLevel) : opt.value)}
                className={`border-r border-gray-100 flex items-center justify-center cursor-pointer py-4 transition-all ${
                  isActive ? opt.cellActiveClass : `${opt.cellHoverClass} hover:opacity-80`
                }`}
                title={opt.description}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive
                    ? `${opt.dotClass} border-transparent`
                    : 'border-gray-300 bg-white'
                }`}>
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            );
          })}

          {/* Notes toggle */}
          <div className="flex items-center justify-center py-4 px-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`relative p-2 rounded-lg transition ${
                showNotes ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title="Add notes"
            >
              <MessageSquare className="w-4 h-4" />
              {entry.notes && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1d365a]" />
              )}
            </button>
          </div>
        </div>

        {/* Notes expandable panel — desktop */}
        {showNotes && (
          <div className="px-5 pb-4 pt-1 border-t border-gray-100 bg-gray-50">
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: '11px' }}>
              Notes / Evidence for <strong>{competency.name}</strong>
            </label>
            <div className="flex items-start gap-3">
              <textarea
                rows={3}
                value={entry.notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Add context, examples, or evidence to support your self-assessment…"
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#1d365a]/20 focus:border-[#1d365a]/50 transition"
                style={{ fontSize: '12px' }}
              />
              {selectedProf && (
                <div className={`shrink-0 px-3 py-1.5 rounded-full border ${selectedProf.headerClass} mt-1`} style={{ fontSize: '11px' }}>
                  {selectedProf.label}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// Helper: sanitise text for jsPDF (strips non-Latin-1 chars that cause spacing)
function sanitizeForPDF(text: string): string {
  return text
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x00-\xFF]/g, '');
}