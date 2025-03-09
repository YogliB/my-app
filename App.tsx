import { MeditationTimer } from 'components/MeditationTimer';
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent title="Meditation Timer" path="App.tsx">
        <MeditationTimer />
      </ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
