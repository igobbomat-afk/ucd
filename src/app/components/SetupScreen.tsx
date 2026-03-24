import { useState } from 'react';
import { ChevronRight, User } from 'lucide-react';
import { ROLES, GRADE_LABELS, type Role, type Grade } from '../data/competencies';
import logo from "./figma/assets/UCD-DE-Logo-Dark-Mode.png";

interface SetupScreenProps {
  onStart: (userName: string, role: Role) => void;
}

const GRADE_COLORS: Record<Grade, { bg: string; badge: string; border: string }> = {
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

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [userName, setUserName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const grades: Grade[] = ['C2', 'C3', 'C4'];
  const filteredRoles = selectedGrade ? ROLES.filter((r) => r.grade === selectedGrade) : [];
  const canStart = userName.trim().length > 0 && selectedRole !== null;

  function handleGradeSelect(grade: Grade) {
    setSelectedGrade(grade);
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
                  Select your grade
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                        {GRADE_LABELS[grade].split('·')[1].trim()}
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
                              {role.discipline} · {role.disciplineCompetencies.length} discipline skills
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
                  <div>
                    <div className="text-gray-900" style={{ fontSize: '14px' }}>
                      {userName.trim()}
                    </div>
                    <div className="text-gray-500" style={{ fontSize: '13px' }}>
                      {selectedRole.title} · {selectedRole.grade}
                    </div>
                  </div>
                </div>
              )}
              <button
                disabled={!canStart}
                onClick={() => selectedRole && onStart(userName.trim(), selectedRole)}
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