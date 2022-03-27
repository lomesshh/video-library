import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    name: "Test User",
    email: "test@gmail.com",
    password: "test123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Lomesh",
    lastName: "Badhe",
    name: "Lomesh Badhe",
    email: "badhelomesh82@gmail.com",
    password: "111111",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
