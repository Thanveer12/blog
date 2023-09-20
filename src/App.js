
import { useState } from 'react';
import './App.css';
import Main from './components/Main';
import Table from './components/Datatable/table';
import Tabview from './components/tabview/tabview';
import explorer from "./components/Datatable/tableData"
import Blog from './components/Blog/Blog';

import EditorOptions from './components/EditorToolBar/EditorToolBar';


function App() {

  const [tableData, setTableData] = useState(explorer)
  const [showShow, setShowBlog] = useState(false)
  const [currentData, setCurrentData] = useState()

  return (

    <div className="App" >
    <Main/>
      {/* <EditorOptions /> */}
      {/* {showShow ? 
      <Blog blogData={currentData} /> :
        <>
          <span>Table View</span>
          <Table tableData={tableData} />

          <span>Tab Grid View</span>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
            <Tabview
              tableData={tableData}
              setCurrentData={setCurrentData}
              setShowBlog={setShowBlog} />
          </div>
        </>} */}


    </div>
  );
}

export default App;
