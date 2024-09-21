import { useParams } from "react-router-dom";
import CategorySection from "../../components/CategorySection";
import NavBar from "../../components/NavBar";

export default function Index() {
  const { cat } = useParams(); // Destructure the 'category' param from useParams
  return (
    <div>
      <NavBar />
      <CategorySection cat={cat} /> {/* Pass the 'category' to the CategorySection component */}
    </div>
  );
}
