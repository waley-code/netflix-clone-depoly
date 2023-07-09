import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { getSession } from "next-auth/react";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
      if (req.method === 'POST') {
        console.log('befor usercres');
        console.log(req.body);
        
        const { currentUser } = await serverAuth(req, res);
  
        const { movieId } = req.body;
  
        const existingMovie = await prismadb.movie.findUnique({
          where: {
            id: movieId,
          },
        });
  
        if (!existingMovie) {
          throw new Error('Invalid ID');
        }
  
        const user = await prismadb.user.update({
          where: {
            email: currentUser?.email || '',
          },
          data: {
            favoriteIds: {
              push: movieId,
            },
          },
        });
  
        res.status(200).json(user); // Send the response to the client
        return; // End the request here
      }
  
      if (req.method === 'DELETE') {
        const { currentUser } = await serverAuth(req, res);
  
        const { movieId } = req.body;
  
        const existingMovie = await prismadb.movie.findUnique({
          where: {
            id: movieId,
          },
        });
  
        if (!existingMovie) {
          throw new Error('Invalid ID');
        }
  
        const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId);
  
        const updatedUser = await prismadb.user.update({
          where: {
            email: currentUser?.email || '',
          },
          data: {
            favoriteIds: updatedFavoriteIds,
          },
        });
  
        res.status(200).json(updatedUser); // Send the response to the client
        return; // End the request here
      }
  
      res.status(405).end(); // Send a 405 Method Not Allowed response
    } catch (error) {
      console.log(error);
      res.status(500).end(); // Send a 500 Internal Server Error response
    }
  }
  