import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName, childAge, parentEmail, favoriteColor } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with that email or username',
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName: fullName || username,
      childAge,
      parentEmail,
      favoriteColor: favoriteColor || 'purple',
    });

    if (user) {
      const token = generateToken(user._id);

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          bio: user.bio,
          childAge: user.childAge,
          parentEmail: user.parentEmail,
          favoriteColor: user.favoriteColor,
          token,
        },
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First, try to find user by email (normal login)
    let user = await User.findOne({ email }).select('+password');
    let isParentLogin = false;

    // If no user found with this email, check if it's a parent email
    if (!user) {
      // Find a child account that has this email as parentEmail
      const childAccount = await User.findOne({ parentEmail: email }).select('+password');
      
      if (childAccount) {
        // Check if password matches the child's password
        const isMatch = await childAccount.matchPassword(password);
        
        if (isMatch) {
          // This is a parent trying to log in with their email and child's password
          isParentLogin = true;
          
          // Create a virtual parent user object
          user = {
            _id: childAccount._id + '_parent', // Unique ID for parent session
            email: email,
            fullName: 'Parent',
            isParent: true,
            childId: childAccount._id,
            parentEmail: email,
          };
          
          const token = generateToken(childAccount._id);

          // Set cookie
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });

          return res.json({
            success: true,
            isParentLogin: true,
            data: {
              _id: user._id,
              email: user.email,
              fullName: user.fullName,
              isParent: true,
              childId: childAccount._id,
              parentEmail: email,
              token,
            },
          });
        }
      }
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Normal user login
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      success: true,
      isParentLogin: false,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        childAge: user.childAge,
        parentEmail: user.parentEmail,
        favoriteColor: user.favoriteColor,
        isAdmin: user.isAdmin || false,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        childAge: user.childAge,
        parentEmail: user.parentEmail,
        favoriteColor: user.favoriteColor,
        isAdmin: user.isAdmin || false,
        followers: user.followers.length,
        following: user.following.length,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
