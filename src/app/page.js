import Navbar from "@/components/navbar";
import Textbar from "@/components/textbar";
import Search from "@/components/search";
import Note from "@/components/note";
export default function Home() {
  return (
    <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
      <Navbar />
      <div className="flex flex-col">
        <Search />
        <div className="flex">
          <Note />
        </div>
        <Textbar />
      </div>
    </div>
  );
}
