import './App.css';
import { useState } from 'react';
import NotifedPhotosView from './components/PhotoNotifier';
import PhotoFilesystemView from './components/LoadedPhotoTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="nav-link navbar-brand" onClick={()=>{setCurrentPageIndex(0)}}>
            <img src="./logo.jpg" alt="logo" width="50" height="50"></img>
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className={"nav-link " + (currentPageIndex === 0 ? 'active' : '')} aria-current="page" onClick={()=>{setCurrentPageIndex(0)}}>Обзор</button>
              </li>
              <li className="nav-item">
                <button className={"nav-link "  + (currentPageIndex === 1 ? 'active' : '')} aria-current='page' onClick={()=>{setCurrentPageIndex(1)}}>Предупреждения</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='main-view'>
        {currentPageIndex === 1 ? <NotifedPhotosView></NotifedPhotosView> : <PhotoFilesystemView></PhotoFilesystemView>}
      </div>
    </div>
  );
}

export default App;
