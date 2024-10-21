import { Appbar } from "./components/appbar";
import { Hero } from "./components/Hero";
import { HeroVideo } from "./components/HeroVideo";
export default function App() {
  
  return (
    <main className="pb-48">
        <Appbar />
        <Hero />
        <div className="pt-8">
          <HeroVideo />
        </div>
    </main>
  );
}
