"use client"
import ClientOnly from "@/app/components/ClientOnly";
import { Container } from "@/app/components/Container";
import CreateForm from "./CreateForm";

const CreateOffer = async () => {
    return (
        <ClientOnly>
            <CreateForm />
        </ClientOnly>
    );
};

export default CreateOffer
