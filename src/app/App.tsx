import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { type Role } from './data/competencies';

type AppState =
  | { step: 'setup' }
  | { step: 'assessment'; userName: string; role: Role };

export default function App() {
  const [state, setState] = useState<AppState>({ step: 'setup' });

  function handleStart(userName: string, role: Role) {
    setState({ step: 'assessment', userName, role });
  }

  function handleBack() {
    setState({ step: 'setup' });
  }

  if (state.step === 'assessment') {
    return (
      <AssessmentDashboard
        userName={state.userName}
        role={state.role}
        onBack={handleBack}
      />
    );
  }

  return <SetupScreen onStart={handleStart} />;
}
