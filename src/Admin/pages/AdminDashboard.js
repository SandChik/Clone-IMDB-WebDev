import React from "react";

const AdminDashboard = () => {
  const username = localStorage.getItem("username") || "Admin";

  return (
    <div style={styles.container}>
      {/* Shapes sebagai dekorasi */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>

      {/* Sapaan */}
      <h1 style={styles.welcomeText}>Welcome, {username}!</h1>
      <p style={styles.description}>
        Selamat datang di halaman Admin. Anda dapat mengelola konten di sini.
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    backgroundColor: "#000", // Latar belakang hitam
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#3498db", // Teks biru
    position: "relative",
  },
  welcomeText: {
    fontSize: "3rem",
    fontWeight: "bold",
    animation: "textGlow 2s infinite alternate",
  },
  description: {
    fontSize: "1.2rem",
    marginTop: "10px",
    animation: "fadeIn 3s ease-in-out",
  },
  circle1: {
    width: "200px",
    height: "200px",
    background: "linear-gradient(135deg, #3498db, #2ecc71)",
    position: "absolute",
    top: "10%",
    left: "15%",
    borderRadius: "50%",
    animation: "float 5s infinite ease-in-out",
    zIndex: -1,
    opacity: 0.7,
  },
  circle2: {
    width: "300px",
    height: "300px",
    background: "linear-gradient(135deg, #3498db, #8e44ad)",
    position: "absolute",
    bottom: "20%",
    right: "10%",
    borderRadius: "50%",
    animation: "float 6s infinite ease-in-out",
    zIndex: -1,
    opacity: 0.5,
  },
  circle3: {
    width: "150px",
    height: "150px",
    background: "linear-gradient(135deg, #1abc9c, #3498db)",
    position: "absolute",
    bottom: "30%",
    left: "40%",
    borderRadius: "50%",
    animation: "float 4s infinite ease-in-out",
    zIndex: -1,
    opacity: 0.8,
  },
  "@keyframes textGlow": {
    from: { textShadow: "0 0 10px #3498db, 0 0 20px #2980b9" },
    to: { textShadow: "0 0 20px #2ecc71, 0 0 30px #27ae60" },
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(-10px)" },
    "50%": { transform: "translateY(10px)" },
  },
};

export default AdminDashboard;
