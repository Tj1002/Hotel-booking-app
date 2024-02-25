import Header from "../components/Header";
import FooterComp from "../components/Footer";
import SearchBar from "../components/SearchBar/SearchBar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto my-8  bg-[#b46617]">
        <SearchBar />
      </div>

      <main className="container mx-auto min-h-[60vh]">{children}</main>
      <FooterComp />
    </div>
  );
}

export default Layout;
