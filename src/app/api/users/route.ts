import { Users } from "lucide-react";
import { NextResponse } from "next/server";

interface User {
    name: string,
    email: string,
}

const users: User[] = [
    {
        name: "loai",
        email: "loai.osa2525@gmail.com"
    }
]

export function GET() {
    return NextResponse.json({
        message: "success",
        users
    })
}

export async function POST(req: Request) {
    const user: User = await req.json();
    let isEmailExist = false
    for (let i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
            isEmailExist = true
        }
    }
    if (!isEmailExist) {
        users.push(user)
        return NextResponse.json({
            message: "success",
            data: users
        }, {
            status: 201
        })
    } else {
        return NextResponse.json({
            message: `email ${user.email} already exist`
        }, {
            status: 406
        })
    }




}