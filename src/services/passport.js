import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/UserModel';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import LocalStrategy from 'passport-local';
