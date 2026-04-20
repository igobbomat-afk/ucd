import { useState } from 'react';
import { ChevronRight, User, TrendingUp, BadgeCheck } from 'lucide-react';
import { ROLES, GRADE_LABELS, type Role, type Grade } from '../data/competencies';
import logo from 'figma:asset/9606a0e21a211ee2a0fb83b6ddc5e74e18e893c0.png';

interface SetupScreenProps {
  onStart: (userName: string, role: Role, actualGrade: Grade) => void;
}

const GRADE_COLORS: Record<Grade, { bg: string; badge: string; border: string }> = {
  C1: {
    bg: 'bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-800',
    border: 'border-emerald-200 hover:border-emerald-400',
  },
  C2: {
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-800',
    border: 'border-blue-200 hover:border-blue-400',
  },
  C3: {
    bg: 'bg-violet-50',
    badge: 'bg-violet-100 text-violet-800',
    border: 'border-violet-200 hover:border-violet-400',
  },
  C4: {
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-800',
    border: 'border-amber-200 hover:border-amber-400',
  },
};

const NEXT_GRADE: Partial<Record<Grade, Grade>> = {
  C1: 'C2',
  C2: 'C3',
  C3: 'C4',
};

const GRADE_SUBTITLE: Record<Grade, string> = {
  C1: 'Associate Consultant',
  C2: 'Consultant',
  C3: 'Senior Consultant',
  C4: 'Managing Consultant',
};

type AssessmentMode = 'current' | 'aspiring';

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [userName, setUserName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>('current');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const grades: Grade[] = ['C1', 'C2', 'C3', 'C4'];

  // The grade whose roles/competencies are shown
  const effectiveGrade: Grade | null =
    selectedGrade && assessmentMode === 'aspiring' && NEXT_GRADE[selectedGrade]
      ? NEXT_GRADE[selectedGrade]!
      : selectedGrade;

  const canAspire = selectedGrade !== null && selectedGrade in NEXT_GRADE;
  const filteredRoles = effectiveGrade ? ROLES.filter((r) => r.grade === effectiveGrade) : [];
  const canStart = userName.trim().length > 0 && selectedRole !== null;

  function handleGradeSelect(grade: Grade) {
    setSelectedGrade(grade);
    setAssessmentMode('current');
    setSelectedRole(null);
  }

  function handleModeSelect(mode: AssessmentMode) {
    setAssessmentMode(mode);
    setSelectedRole(null);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#121A38' }}>
      {/* Top bar */}
      <header className="px-4 sm:px-8 py-4 sm:py-5 flex items-center gap-4">
        <img src={logo} alt="DE UCD Community" className="h-9 w-auto" />
        <div className="w-px h-6 bg-white/20" />
        <span className="text-white/70 tracking-wide" style={{ fontSize: '13px' }}>
          Skills Self-Assessment
        </span>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1
              className="text-white mb-3"
              style={{ fontSize: '36px', fontWeight: 400, lineHeight: 1.2 }}
            >
              UCD Skills Self-Assessment
            </h1>
            <p className="text-white/60" style={{ fontSize: '16px' }}>
              Reflect on your competencies and identify growth opportunities
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Step 1 – Name */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full text-white flex items-center justify-center"
                  style={{ backgroundColor: '#0058AB', fontSize: '12px' }}
                >
                  1
                </div>
                <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                  Your details
                </span>
              </div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: '14px' }}>
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none transition"
                  style={{ fontSize: '15px' }}
                />
              </div>
            </div>

            {/* Step 2 – Grade */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full text-white flex items-center justify-center"
                  style={{ backgroundColor: '#0058AB', fontSize: '12px' }}
                >
                  2
                </div>
                <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                  Your current grade
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {grades.map((grade) => {
                  const colors = GRADE_COLORS[grade];
                  const isSelected = selectedGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => handleGradeSelect(grade)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? `${colors.bg} ${colors.border} shadow-sm`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`inline-block px-2 py-0.5 rounded-full mb-2 ${colors.badge}`}
                        style={{ fontSize: '11px' }}
                      >
                        {grade}
                      </div>
                      <div className="text-gray-800" style={{ fontSize: '13px' }}>
                        {GRADE_SUBTITLE[grade]}
                      </div>
                      {isSelected && (
                        <div
                          className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#0058AB' }}
                        >
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Assessment mode toggle — only shown once a grade is selected */}
              {selectedGrade && (
                <div className="mt-4">
                  <p className="text-gray-500 mb-2.5" style={{ fontSize: '12px' }}>
                    Which skills would you like to assess yourself against?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Current grade option */}
                    <button
                      onClick={() => handleModeSelect('current')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                        assessmentMode === 'current'
                          ? 'bg-[#0058AB]/5 border-[#0058AB]/40 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          assessmentMode === 'current' ? 'bg-[#0058AB]' : 'bg-gray-100'
                        }`}
                      >
                        <BadgeCheck className={`w-4 h-4 ${assessmentMode === 'current' ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <div
                          className={assessmentMode === 'current' ? 'text-[#0058AB]' : 'text-gray-800'}
                          style={{ fontSize: '13px', fontWeight: 500 }}
                        >
                          My current grade
                        </div>
                        <div className="text-gray-400 mt-0.5" style={{ fontSize: '11px' }}>
                          Assess against {GRADE_LABELS[selectedGrade]} skills
                        </div>
                      </div>
                    </button>

                    {/* Aspiring option — greyed out if no next grade */}
                    <button
                      onClick={() => canAspire && handleModeSelect('aspiring')}
                      disabled={!canAspire}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                        !canAspire
                          ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                          : assessmentMode === 'aspiring'
                          ? 'bg-amber-50 border-amber-300 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          assessmentMode === 'aspiring' ? 'bg-amber-400' : 'bg-gray-100'
                        }`}
                      >
                        <TrendingUp className={`w-4 h-4 ${assessmentMode === 'aspiring' ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <div
                          className={
                            assessmentMode === 'aspiring'
                              ? 'text-amber-700'
                              : 'text-gray-800'
                          }
                          style={{ fontSize: '13px', fontWeight: 500 }}
                        >
                          Aspiring to next grade
                        </div>
                        <div className="text-gray-400 mt-0.5" style={{ fontSize: '11px' }}>
                          {canAspire
                            ? `Assess against ${GRADE_LABELS[NEXT_GRADE[selectedGrade]!]} skills`
                            : 'No higher grade available'}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Aspiring context note */}
                  {assessmentMode === 'aspiring' && effectiveGrade && (
                    <div
                      className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg"
                      style={{ backgroundColor: '#FFF8E7', border: '1px solid #FDE68A' }}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-amber-700" style={{ fontSize: '11px' }}>
                        You'll be assessed against <strong>{GRADE_LABELS[effectiveGrade]}</strong> competencies — useful if you're working towards promotion in the near future.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 – Role */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedGrade ? 'text-white' : 'bg-gray-200 text-gray-400'}`}
                  style={selectedGrade ? { backgroundColor: '#0058AB', fontSize: '12px' } : { fontSize: '12px' }}
                >
                  3
                </div>
                <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                  Select your specialisation
                </span>
              </div>
              {!selectedGrade ? (
                <p className="text-gray-400 italic" style={{ fontSize: '14px' }}>
                  Please select a grade first
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filteredRoles.map((role) => {
                    const colors = GRADE_COLORS[role.grade];
                    const isSelected = selectedRole?.id === role.id;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? `${colors.bg} ${colors.border}`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-gray-900" style={{ fontSize: '15px' }}>
                              {role.title}
                            </div>
                            <div className="text-gray-500 mt-0.5" style={{ fontSize: '12px' }}>
                              {role.discipline} · {role.isUR
                                ? `${role.competencyGroups?.length ?? 0} competency groups`
                                : `${role.disciplineCompetencies.length} discipline skills`}
                            </div>
                          </div>
                          {isSelected && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: '#0058AB' }}
                            >
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                                <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Summary + CTA */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 bg-gray-50">
              {selectedRole && userName.trim() && (
                <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200 flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#0058AB', fontSize: '12px' }}
                  >
                    {userName.trim()[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900" style={{ fontSize: '14px' }}>
                      {userName.trim()}
                    </div>
                    <div className="text-gray-500" style={{ fontSize: '13px' }}>
                      {selectedRole.title}
                    </div>
                    {assessmentMode === 'aspiring' && selectedGrade && effectiveGrade ? (
                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] ${GRADE_COLORS[selectedGrade].badge}`}
                        >
                          {selectedGrade}
                        </span>
                        <TrendingUp className="w-3 h-3 text-amber-400" />
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] ${GRADE_COLORS[effectiveGrade].badge}`}
                        >
                          {effectiveGrade}
                        </span>
                        <span className="text-amber-600" style={{ fontSize: '11px' }}>aspiring</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 mt-0.5" style={{ fontSize: '12px' }}>
                        {selectedRole.grade} · Current grade
                      </div>
                    )}
                  </div>
                </div>
              )}
              <button
                disabled={!canStart}
                onClick={() => selectedRole && selectedGrade && onStart(userName.trim(), selectedRole, selectedGrade)}
                className="w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all text-white shadow-md"
                style={
                  canStart
                    ? { backgroundColor: '#0058AB', fontSize: '15px' }
                    : { backgroundColor: '#d1d5db', color: '#9ca3af', cursor: 'not-allowed', fontSize: '15px' }
                }
              >
                Start Assessment
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}