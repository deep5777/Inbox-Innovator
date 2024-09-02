// "use server";

// import Membership from "@/models/membership.model";
// import { connectDb } from "@/shared/libs/db";
// import { currentUser } from "@clerk/nextjs";

// export const getMemberShip = async () => {
//   try {
//     await connectDb().then(async (res) => {
//       const user = await currentUser();
//       if (user) {
//         const membership = await Membership.findOne({
//           userId: user?.id,
//         });
//         return membership;
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";

export const getMemberShip = async () => {
  try {
    // Establish connection to the database
    await connectDb();

    // Retrieve the current user
    const user = await currentUser();
    if (!user) {
      throw new Error("User is not authenticated");
    }

    // Find membership for the authenticated user
    const membership = await Membership.findOne({ userId: user.id }).exec();

    return membership;
  } catch (error) {
    console.error("Error fetching membership:", error);
    return null; // Or handle the error as needed
  }
};
