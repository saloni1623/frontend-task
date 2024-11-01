"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  // Real-time listener to fetch items
  useEffect(() => {
    const itemsCollection = collection(db, "items");
    const unsubscribe = onSnapshot(itemsCollection, (snapshot) => {
      const itemsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      try {
        await addDoc(collection(db, "items"), {
          title,
          description,
          created_at: serverTimestamp(),
          created_by: user?.uid,
        });
        setTitle("");
        setDescription("");
        alert("Item created successfully!");
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  // Handle item deletion
  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "items", itemId));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      {/* Left Section - Item Creation Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mr-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Item
          </button>
        </form>
      </div>

      {/* Right Section - List of Items */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md ml-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Items List</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded-md bg-gray-50 relative">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Created by: {item.created_by || "Anonymous"} <br />
                Date: {item.created_at ? new Date(item.created_at.seconds * 1000).toLocaleDateString() : "Loading..."}
              </p>

              {/* Show Delete Button if the current user created the item */}
              {item.created_by === user?.uid && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
