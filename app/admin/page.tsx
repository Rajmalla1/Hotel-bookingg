"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/admin/users")
    })

    return (
        <div className="">
            Apple
        </div>
    )
}

export default Admin;