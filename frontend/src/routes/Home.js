import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuGrid from "../components/MenuGrid";

export default function Home() {
  return (
    <>
      <Header />
      <div className="content-container">
        <MenuGrid />
      </div>
      <Footer />
    </>
  );
}
