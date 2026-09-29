import { useState } from 'react';

function InputToConsole() {
  // state
  const [text, setText] = useState('');

  const handleClick = () => {
    console.log('input:', text);
  };

  return (
    <div className="input-console">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Try a note here"
      />
      <button onClick={handleClick}>Display in Console</button>
    </div>
  );
}

export default InputToConsole;
