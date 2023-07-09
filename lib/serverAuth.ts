// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";

// import prismadb from '@/lib/prismadb';

// const serverAuth = async (req: NextApiRequest) => {
//     const session = await getSession({req});
//     console.log(session);
//     if (!session?.user?.email) {
//         throw new Error('Not signed in');
//     }

//     const currentUser = await prismadb.user.findUnique({
//         where: {
//             email: session.user.email,
//         }
//     })
//     console.log(currentUser);
    

//     if (!currentUser) {
//         throw new Error('Not signed in');
//     }
//     // console.log(currentUser);
    
//     return {currentUser}
// }

// export default serverAuth;

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
  
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;