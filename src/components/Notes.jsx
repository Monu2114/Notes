import NoteCard from "./note";
export default function Notes({ notes }) {
  return (
    <>
      {notes &&
        notes.map((note, index) => (
          <NoteCard
            key={note.id || index} // Ensure a unique key
            title={note.title}
            content={note.content}
            timestamp={note.createdAt}
            duration={note.duration}
          />
        ))}
    </>
  );
}
