import "../App.css";
import FoodCardPreview from "../components/FoodCardPreview";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuNav from "../components/MenuNav";

export default function CategoryItems(props) {
  const { menu, items } = props;

  return (
    <>
      <Header />
      <div className="content-container">
        <MenuNav menu={menu} />
        <div className="content-grid">
          {items.map((item) => (
            <FoodCardPreview key={item.id} item={item} isCategory={false} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
