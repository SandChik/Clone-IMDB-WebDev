const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fungsi untuk login user
const loginUser = async (req, res) => {
  const body = req.body || {}; // Jika req.body undefined, gunakan objek kosong
  const { email, password } = body;

  // Validasi input
  if (!email || !password) {
    console.warn("Login attempt with missing email or password");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      console.warn(`Login failed: User not found for email ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Cek apakah password valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn(`Login failed: Invalid password for email ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.info(`Login successful for user ID ${user.id}`);
    // Kembalikan respons
    res.status(200).json({
      token: token,
      role: user.role,
      userId: user.id,
    });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fungsi register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru di database
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "USER", // Atur peran default sebagai USER atau sesuai kebutuhan
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};
// Export fungsi
module.exports = { loginUser, registerUser };
