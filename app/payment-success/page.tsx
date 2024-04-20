
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"

import getCurrentUser from "../actions/getCurrentUser"
import PaymentClient from "./PaymentClient"


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PaymentClient />
        </ClientOnly>
    )
}

export default PropertiesPage
