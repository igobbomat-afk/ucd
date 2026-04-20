import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { type Role, type Grade } from './data/competencies';

type AppState =
  | { step: 'setup' }
  | { step: 'assessment'; userName: string; role: Role; actualGrade: Grade };

export default function App() {
  const [state, setState] = useState<AppState>({ step: 'setup' });

  function handleStart(userName: string, role: Role, actualGrade: Grade) {
    setState({ step: 'assessment', userName, role, actualGrade });
  }

  function handleBack() {
    setState({ step: 'setup' });
  }

  if (state.step === 'assessment') {
    return (
      <AssessmentDashboard
        userName={state.userName}
        role={state.role}
        actualGrade={state.actualGrade}
        onBack={handleBack}
      />
    );
  }

  return <SetupScreen onStart={handleStart} />;
}