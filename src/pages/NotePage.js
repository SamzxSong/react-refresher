import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import notes from "../assets/data";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ history }) => {
  let { id: noteId } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  // let getNote = async () => {
  //   if (noteId === "new") return;
  //   let response = await fetch(`http://localhost:8000/notes/${noteId}`);
  //   let data = await response.json();
  //   setNote(data);
  // };

  // let updateNote = async () => {
  //   await fetch(`http://localhost:8000/notes/${noteId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...note, updated: new Date() }),
  //   });
  // };

  // let createNote = async () => {
  //   await fetch(`http://localhost:8000/notes/`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...note, updated: new Date() }),
  //   });
  // };

  // let deleteNote = async () => {
  //   await fetch(`http://localhost:8000/notes/${noteId}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(note),
  //   });
  //   navigate("/");
  // };

  let getNote = () => {
    if (noteId === "new") {
      setNote({ body: "" });
    } else {
      const foundNote = notes.find((note) => note.id === Number(noteId));
      setNote(foundNote || { body: "" });
    }
  };

  let updateNote = () => {
    const noteIndex = notes.findIndex((n) => n.id === Number(noteId));
    if (noteIndex > -1) {
      notes[noteIndex] = { ...note, id: Number(noteId), updated: new Date() };
    }
  };

  let createNote = () => {
    const newNote = { ...note, id: notes.length + 1, updated: new Date() };
    notes.push(newNote);
  };

  // Delete the note from the local data
  let deleteNote = () => {
    const noteIndex = notes.findIndex((n) => n.id === Number(noteId));
    if (noteIndex > -1) {
      notes.splice(noteIndex, 1);
    }
    navigate("/");
  };

  let handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    } else if (noteId !== "new") {
      updateNote();
    }
    navigate("/");
  };

  // let note = notes.find((note) => note.id === Number(noteId));

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
