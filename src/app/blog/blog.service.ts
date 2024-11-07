import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { UserService } from '../client/user/user.service';

@Injectable()
export class BlogService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {

  }
  async create(createBlogDto: CreateBlogDto) {

    const blog = await this.prismaService.post.create({
      data: {
        id: randomUUID(),
        title: createBlogDto.title,
        content: createBlogDto.content,
        userId: createBlogDto.userId,
      },
      select: { id: true, title: true, content: true, userId: true, createdAt: true },
    });

    return blog;
  }


  async findAll() {
    const blogs = await this.prismaService.post.findMany();

    const blogsWithUser = await Promise.all(
      blogs.map(async (blog) => {
        const user = await this.userService.getUserById(blog.userId);

        if (!user) {
          throw new NotFoundException(`User with ID ${blog.userId} not found`);
        }
        return {
          id: blog.id,
          title: blog.title,
          content: blog.content,
          published: blog.published,
          userId: blog.userId,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address,
          },
          createdAt: blog.createdAt.toISOString(),
          updatedAt: blog.updatedAt.toISOString(),
        };
      })
    );

    return blogsWithUser;
  }



  async findOne(id: string) {
    const blog = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    const user = await this.userService.getUserById(blog.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${blog.userId} not found`);
    }
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      published: blog.published,
      userId: blog.userId,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };
  }



  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const existingBlog = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const updatedBlog = await this.prismaService.post.update({
      where: { id },
      data: {
        title: updateBlogDto.title,
        content: updateBlogDto.content,
        published: updateBlogDto.published,
      },
    });

    return {
      id: updatedBlog.id,
      title: updatedBlog.title,
      content: updatedBlog.content,
      published: updatedBlog.published,
      userId: updatedBlog.userId,
      createdAt: updatedBlog.createdAt.toISOString(),
      updatedAt: updatedBlog.updatedAt.toISOString(),
    };
  }


  async remove(id: string) {
    const existingBlog = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    await this.prismaService.post.delete({
      where: { id },
    });

    return { message: `Blog with ID ${id} has been deleted` };
  }

}

