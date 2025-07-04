import { useState } from 'react';
import NotifedPhotosView from './components/PhotoNotifier';
import PhotoFilesystemView from './components/LoadedPhotoTable';
import './App.css'; // Убедитесь, что CSS импортирован

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true); // Начальная тема - темная

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`} style={{ height: '100%' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="nav-link navbar-brand" onClick={() => setCurrentPageIndex(0)}>
            <img src="./logo.jpg" alt="logo" width="50" height="50"></img>
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className={`nav-link ${currentPageIndex === 0 ? 'active' : ''}`}
                  aria-current="page"
                  onClick={() => setCurrentPageIndex(0)}
                >
                  Обзор
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${currentPageIndex === 1 ? 'active' : ''}`}
                  aria-current="page"
                  onClick={() => setCurrentPageIndex(1)}
                >
                  Предупреждения
                </button>
              </li>
            </ul>
          </div>
          {/* Кнопка переключения темы */}
          <button className="btn btn-secondary ms-auto" onClick={toggleTheme}>
            {isDarkMode ? 'Светлая тема' : 'Темная тема'}
          </button>
        </div>
      </nav>
      <div className="main-view" style={{ height: '100%' }}>
        {currentPageIndex === 1 ? (
          <NotifedPhotosView isDarkMode={isDarkMode} />
        ) : (
          <PhotoFilesystemView isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
}

export default App;