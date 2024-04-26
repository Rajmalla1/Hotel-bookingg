
import getOffers from "@/app/actions/getOffers"
import ClientOnly from "@/app/components/ClientOnly"
import { EmptyState } from "@/app/components/EmptyState"
import OffersClient from "./OffersClient"

const OfefrsPage = async () => {
    const offers = await getOffers();

    if (offers.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Offers listed"
                    subtitle="Looks like you haven't posted any offers yet"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <OffersClient
                offers={offers}
            />
        </ClientOnly>
    )
}

export default OfefrsPage
