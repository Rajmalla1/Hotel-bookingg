import ClientOnly from "@/app/components/ClientOnly";
import { Container } from "@/app/components/Container";
import CreateForm from "./CreateForm";
import getUsers from "@/app/actions/getUsers";

const CreateOffer = async () => {
    const users = await getUsers();

    return (
        <ClientOnly>
            <Container>
                <CreateForm users={users} />
            </Container>
        </ClientOnly>
    );
};

export default CreateOffer
