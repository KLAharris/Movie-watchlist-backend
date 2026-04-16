import {prisma} from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

//Generate JWT token (optional, can be implemented later)
    const token = generateToken(user.id, res);

        res.status(201).json({message: "User registered successfully",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user email exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        //verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = generateToken(user.id, res);

        res.status(200).json({message: "User logged in successfully",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(0),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
        message: "User logged out successfully"
    });
};
export { register, login, logout };