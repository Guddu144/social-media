import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/prisma";

class UserController{
  constructor(private prisma:PrismaClient) { }
  
  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id:true,
        email:true,
        password:true,
        role:true 
      }
    });
  } 

  async createAdmin(userData: { email: string; name: string; phone: string; password: string }) {
    try {
        const user = await this.prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
            phone: JSON.stringify(userData.phone),
            role: 'ADMIN',
            password: userData.password, 
          },
        });

        return { user };
    } catch (error) {
      console.error("Error creating Admin:", error);
      throw new Error("Failed to create Admin");
    }
  }

  
  
}

const userController = new UserController(prisma);

export default userController
