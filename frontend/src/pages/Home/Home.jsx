import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import NoNotes from "../../assets/NoNotes.png";
import NoSearch from "../../assets/NoSearch.png";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = React.useState({
    isShown: false,
    msg: "",
    type: "add",
  });
  const [userInfo, setUserInfo] = React.useState({});
  const [allNotes, setAllNotes] = React.useState([]);
  const [isSearch, setIsSearch] = React.useState(false);
  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // handle edit
  const handleEdit = async (noteData) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteData });
  };

  // handle delete
  const handleDelete = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && response.data.message) {
        showToast("Note deleted successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const showToast = (msg, type) => {
    setShowToastMsg({ isShown: true, msg, type });
  };

  // search for notes
  const handleSearch = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle pin note
  const handlePinNote = async (note) => {
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${note._id}`,
        { isPinned: !note.isPinned }
      );
      if (response.data && response.data.note) {
        getAllNotes();
        if (note.isPinned) {
          showToast("Note unpinned successfully", "add");
        } else {
          showToast("Note pinned successfully", "add");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // on page load
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearch={handleSearch}
        getAllNotes={getAllNotes}
        setIsSearch={setIsSearch}
      />
      {allNotes.length > 0 ? (
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note._id)}
                onPinNote={() => handlePinNote(note)}
                handleClick={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "view",
                    data: note,
                  })
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyCard
          imgSrc={isSearch ? NoSearch : NoNotes}
          Msg={
            isSearch
              ? "Oops! No notes found matching your search."
              : "Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!"
          }
        />
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)" } }}
        contentLabel=""
        className="absolute top-1/2 left-1/2 w-[40%] max-h-3/4 bg-white rounded-md p-5 overflow-y-auto -translate-x-1/2 -translate-y-1/2 shadow-lg"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToast={showToast}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        msg={showToastMsg.msg}
        type={showToastMsg.type}
        onClose={() =>
          setShowToastMsg({ isShown: false, msg: "", type: "add" })
        }
      />
    </>
  );
}

export default Home;
