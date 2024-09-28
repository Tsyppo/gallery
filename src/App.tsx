import Layout from './components/Layout';
import ArtGallery from './components/ArtGallery';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ArtGallery />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
