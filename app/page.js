import Hero from "./Components/Hero/Hero";
import Searchbar from "./Components/Searchbar/Searchbar";
export const metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero children={<Searchbar />} />
    </main>
  );
}
