import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/prisma";

class EmployeerController{


  constructor(private prisma:PrismaClient) { }
  
  async createEmployeerAndUser(employeerData: { address: string }, userData: { email: string; name: string; phone: string; password: string }) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            role: 'EMPLOYEER',
            password: userData.password, 
          },
        });

        const employeer = await prisma.employeer.create({
          data: {
            userId:user.id,
            ...employeerData
          }
        });
        return { employeer, user };
      });
    } catch (error) {
      console.error("Error creating employee and user:", error);
      throw new Error("Failed to create employee and user");
    }
  }

  async getEmployeerById(id: number) {
    return await this.prisma.employeer.findUnique({
      where: { userId:id },
      include: {
        user: true 
      }
    });
  }

  async updateEmployeer(id:number,employeerData: { address: string }, userData: { email: string; name: string; phone: string}) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const updatedEmployeer = await prisma.employeer.update({
          where: { userId:id },
          data: employeerData,
        });

        const updatedUser = await prisma.user.update({
          where: { id },
          data: {
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
          },
        });

        return { updatedEmployeer, updatedUser };
      });
    } catch (error) {
      console.error("Error creating employeer and user:", error);
      throw new Error("Failed to update employeer and user");
    }
  }


  async deleteEmployeer(id: number) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
         
          await prisma.employeer.delete({
            where: { userId:id },
          });
          return await prisma.user.delete({
            where: { id  }, 
          });
        });
    } catch (error) {
      console.error(`Error deleting employeer with id ${id}:`, error);
      throw new Error("Failed to delete employeer");
    }
  }
  
}

const employeerController = new EmployeerController(prisma);

export default employeerController
