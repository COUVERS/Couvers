import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export default function App() {
  const handleDownload = async () => {
    try {
      const fileRef = ref(storage, "certificates/test.pdf");
      const url = await getDownloadURL(fileRef);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Storage Test</h1>
      <button onClick={handleDownload}>Download test PDF</button>
    </div>
  );
}
