import React from 'react'
import Editor from './Editor';

function Home() {
  return (
    <div style={{ backgroundColor: '', minHeight: "100vh", padding: '20px' }}>
      
      <div
        // style={{
        //   marginTop: '16px',
        //   backgroundColor: '#ffffff',
        //   border: '1px solid #cccccc',
        //   padding: '20px',
        // }}
        >
        <Editor />
      </div>
    </div>
  )
}

export default Home