import ChatBot from './views/chatBot/chatBot';
import CodeComment from './views/codeComments/codeComment';
import CodeCommit from './views/codeCommit/codeCommit';
import CodeUnit from './views/codeUnitTest/codeUnit';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GPT Presentation</h1>
        <h1>Code comment example</h1>
        <CodeComment></CodeComment>
        <h1>Unit Test Cases</h1>
        <CodeUnit></CodeUnit>
        <h1>Commit Generator</h1>
        <CodeCommit></CodeCommit>
        <h1>Chatbot</h1>
        <ChatBot></ChatBot>
      </header>
      
    </div>
  );
}

export default App;
