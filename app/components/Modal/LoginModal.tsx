"use client"
import Image from "next/image"

import React from "react"
import {signIn} from "next-auth/react"
import axios from "axios"
import {AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import {Modal} from "./Modal"
import Heading from "../Heading"
import Input from "../Input/Input"
import {Button} from "../Button"

const LoginModal = () => {
    const router = useRouter()

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                toast.success("Login Success")
                router.refresh()
                loginModal.onClose()
            }
            if (callback?.error) {
                console.log({callback})

                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back" subtitle="Login to Continue"/>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />
            {/* <Button
				outline
				label="Continue with Facebook"
				icon={BsFacebook}
				onClick={() => {}}
			/> */}

            <div
                className="
				text-neutral-500
					text-center
					mt-4
					font-light
			"
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <span className="">New to RajHotel?</span>
                    <span
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
						Create an account
					</span>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal
