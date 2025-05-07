import axios from "axios";
import { Post } from "../post/[id]";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001";

export async function postInfo(id: string | string[]): Promise<Post> {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
}

export async function getPosts() {
    const response = await axios.get("/posts");
    return response.data;
}

export async function createPosts(post: Omit<Post, "id" | "createdAt">) {
    const response = await axios.post("/posts", {
        title: post.title,
        content: post.content,
        author: post.author,
    });
    return response.data;
}

export async function deletePosts(id: string) {
    await axios.delete(`/posts/${id}`);
}

export async function updatePosts(
    post: Omit<Post, "id" | "createdAt">,
    postId: string | string[],
) {
    const response = await axios.put(`/posts/${postId}`, {
        title: post.title,
        content: post.content,
        author: post.author,
    });
    return response.data;
}

export async function login(
    email: string,
    password: string,
    role: "student" | "teacher",
) {
    const response = await axios.post("/auth/login", {
        email: email,
        password: password,
        userType: role,
    });
    console.log(response);
    if (response.status === 200) {
        return {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            role: response.data.user.userType,
        };
    } else {
        throw new Error("Invalid credentials");
    }
}

export async function getTeachers() {
    const response = await axios.get("/teachers");
    console.log(response.data.teachers);
    return response.data.teachers;
}

export async function getTeacherById(id: string) {
    const response = await axios.get(`/teachers/${id}`);
    return response.data.teacher;
}

export async function deleteTeacher(id: string) {
    await axios.delete(`/teachers/${id}`);
}

export async function updateTeacher(
    id: string,
    name: string,
    email: string,
) {
    console.log(id, name, email);
    const response = await axios.put(`/teachers/${id}`, {
        name: name,
        email: email,
    });
    console.log(response.data);
    return response.data;
}

export async function getStudents() {
    const response = await axios.get("/students");
    console.log(response.data.students);
    return response.data.students;
}

export async function getStudentById(id: string) {
    const response = await axios.get(`/students/${id}`);
    return response.data.student;
}

export async function deleteStudent(id: string) {
    await axios.delete(`/students/${id}`);
}

export async function updateStudent(
    id: string,
    name: string,
    email: string,
) {
    const response = await axios.put(`/students/${id}`, {
        name: name,
        email: email,
    });
    return response.data;
}
