import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Search() {
  return (
    <div className="flex gap-1 ml-3">
      <div className="relative w-96">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3"
        />
        <Input
          className="w-full h-8 pl-10 rounded-xl text-sm"
          placeholder="Search"
        />
      </div>

      <Button variant="outline" className="h-8 rounded-xl">
        <Image src="/note.png" width={10} height={10} alt="sort" />
        Sort
      </Button>
    </div>
  );
}
