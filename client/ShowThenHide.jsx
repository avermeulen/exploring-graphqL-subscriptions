import { useState } from 'react';

export function ShowThenHide(props) {
  const [message, setMessage] = useState(props.message);

  setTimeout(function () {
    setMessage("");
  }, 3000);

  return message;
}
