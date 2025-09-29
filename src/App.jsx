import { debounce, throttle } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  // useCallback으로 메모제이션
  const handleChange = useCallback((event) => {
    setQuery(event.target.value);
    console.log("검색 쿼리:", event.target.value);
  }, []);

  //debounce
  const debouncedOnChange = useMemo(() => {
    return debounce(handleChange, 500);
  }, [handleChange]);

  //throttle
  const throttledOnChange = useMemo(() => {
    return throttle(handleChange, 1000);
  }, [handleChange]);

  //클린업 ( debounce와 throttle 함수 클린업 )
  useEffect(() => {
    return () => {
      throttledOnChange.cancel();
      debouncedOnChange.cancel();
    };
  }, [throttledOnChange, debouncedOnChange]);

  return (
    <div className="container">
      <h1>배포가 잘 되었을까요?</h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={debouncedOnChange}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={throttledOnChange}
        />
      </div>
      <p>{searchString}</p>
    </div>
  );
}

export default App;
