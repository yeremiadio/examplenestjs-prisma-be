import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    const createData = await this.prisma.tasks.create({
      data: createTaskDto,
    });
    return {
      statusCode: 200,
      data: createData,
    };
  }

  async findAll() {
    const dataTasks = await this.prisma.tasks.findMany({});
    return {
      statusCode: 200,
      data: dataTasks,
    };
  }

  async findOne(id: number) {
    const dataTask = await this.prisma.tasks.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: dataTask,
    };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updateTask = await this.prisma.tasks.update({
      data: updateTaskDto,
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: updateTask,
    };
  }

  async remove(id: number) {
    const deleteTask = await this.prisma.tasks.delete({
      where: {
        id,
      },
    });
    return {
      statusCode: 200,
      data: deleteTask,
      message: `Success delete ${id}`,
    };
  }
}
