import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user data when authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        await fetchUserData(authUser.uid); // Call function with `uid`
      } else {
        setUser(null);
        setUserDetails(null);
      }
      setLoading(false); // Stop loading after checking auth state
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Fetch user details from Firestore
  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "Users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log("User data:", docSnap.data());
      } else {
        console.log("No user document found in Firestore");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {userDetails.photo && (
              <img
                src={userDetails.photo}
                width={"40%"}
                style={{ borderRadius: "50%" }}
                alt="Profile"
              />
            )}
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>User not logged in. Please <a href="/login">login</a>.</p>
      )}
    </div>
  );
}

export default Profile;
