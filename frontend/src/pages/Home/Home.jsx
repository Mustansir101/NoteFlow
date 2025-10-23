import React, { useEffect, useState } from "react";
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
import LoadingSpinner from "../../components/Loading Spinner/LoadingSpinner";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    msg: "",
    type: "add",
  });
  const [userInfo, setUserInfo] = useState({});
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkBackendStatus = async () => {
      while (!isBackendReady) {
        try {
          const response = await axiosInstance.get("/api/health");
          if (response.data && response.data.status === "OK") {
            setIsBackendReady(true);
            setIsLoading(false);
            break; // Exit the loop when backend is ready
          }
        } catch (error) {
          console.log("Backend not ready yet, retrying...", error.message);
        }

        // Wait 2 seconds before next attempt
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };

    checkBackendStatus();
  }, []);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
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
      console.log(error);
      if (error?.response?.status === 401) {
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

  if (isLoading && !isBackendReady) {
    return (
      <div className="min-h-screen bg-[#fdfeff] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 text-lg">Connecting to server...</p>
          <p className="mt-2 text-sm text-gray-500">
            This may take up to 15 seconds for initial startup
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfeff]">
      <Navbar
        userInfo={userInfo}
        onSearch={handleSearch}
        getAllNotes={getAllNotes}
        setIsSearch={setIsSearch}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isSearch ? "Search Results" : "My Notes"}
              </h1>
              <p className="mt-1 text-gray-600">
                {allNotes.length > 0
                  ? `${allNotes.length} ${
                      allNotes.length === 1 ? "note" : "notes"
                    } ${isSearch ? "found" : "total"}`
                  : isSearch
                  ? "No notes found for your search"
                  : "No notes yet - create your first note!"}
              </p>
            </div>
            {allNotes.length > 0 && !isSearch && (
              <div className="hidden sm:block">
                <button
                  onClick={() =>
                    setOpenAddEditModal({
                      isShown: true,
                      type: "add",
                      data: null,
                    })
                  }
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2B85FF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B85FF] transition-colors duration-200 shadow-sm"
                >
                  <MdAdd className="mr-2 text-lg" />
                  New Note
                </button>
              </div>
            )}
          </div>

          {/* Pinned Notes Indicator */}
          {allNotes.some((note) => note.isPinned) && (
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-[#2B85FF] rounded-full mr-2"></div>
              Pinned notes appear first
            </div>
          )}
        </div>

        {/* Notes Grid or Empty State */}
        {allNotes.length > 0 ? (
          <div className="space-y-6">
            {/* Pinned Notes Section */}
            {allNotes.some((note) => note.isPinned) && (
              <div>
                <div className="flex items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Pinned Notes
                  </h2>
                  <div className="ml-2 px-2 py-1 text-xs bg-blue-100 text-[#2B85FF] rounded-full">
                    {allNotes.filter((note) => note.isPinned).length}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allNotes
                    .filter((note) => note.isPinned)
                    .map((note) => (
                      <div
                        key={note._id}
                        className="transform hover:scale-105 transition-transform duration-200"
                      >
                        <NoteCard
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
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Regular Notes Section */}
            {allNotes.some((note) => !note.isPinned) && (
              <div>
                {allNotes.some((note) => note.isPinned) && (
                  <div className="flex items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Other Notes
                    </h2>
                    <div className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {allNotes.filter((note) => !note.isPinned).length}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allNotes
                    .filter((note) => !note.isPinned)
                    .map((note) => (
                      <div
                        key={note._id}
                        className="transform hover:scale-105 transition-transform duration-200"
                      >
                        <NoteCard
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
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <EmptyCard
              imgSrc={isSearch ? NoSearch : NoNotes}
              Msg={
                isSearch
                  ? "Oops! No notes found matching your search."
                  : "Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!"
              }
            />
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {/* <button
        className="group fixed right-6 bottom-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#2B85FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:scale-95 z-50"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
        title="Add new note"
      >
        <MdAdd className="text-[32px] text-white group-hover:scale-110 transition-transform duration-200" />
      </button> */}

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 },
        }}
        contentLabel=""
        className="absolute top-1/2 left-1/2 w-[90%] max-w-2xl max-h-[85vh] bg-white rounded-xl p-6 overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 shadow-2xl"
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
    </div>
  );
}

export default Home;
