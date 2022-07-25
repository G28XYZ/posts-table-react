import { useEffect } from "react";
import { useAppDispatch } from "../../services/store";
import { fetchPosts } from "../../services/actions/table";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return <></>;
}

export default App;
