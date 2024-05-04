import { useEffect } from 'react'
import getCurrentUser from './actions/getCurrentUser'
import getListings, { IListingParams } from './actions/getListings'

import ClientOnly from './components/ClientOnly'
import { Container } from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/Listings/ListingCard'

import { createAdminIfNotExist } from '@/app/api/initAdmin';
import getActiveOffer from './actions/getActiveOffer'


export const dynamic = 'force-dynamic'
interface HomeProps {
	searchParams: IListingParams
}

// export default async function Home() {
const Home = async ({ searchParams }: HomeProps) => {

	const listings = await getListings(searchParams)
	const currentUser = await getCurrentUser();
	const activeOffer = await getActiveOffer();

	createAdminIfNotExist();


	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<div className='relative'>
				<Container>
					<div
						className="
					pt-24
					grid
					grid-cols-1
					sm:grid-cols-2
					md:grid-cols-3
					lg:grid-cols-4
					xl:grid-cols-5
					2xl:grid-cols-6
					gap-8
					min-h-[75vh]
					"
					>
						{listings.map((listing) => {
							return (
								<ListingCard
									currentUser={currentUser}
									key={listing.id}
									data={listing}
								/>
							)
						})}
					</div>
				</Container>
				{activeOffer && (
					<>
						<div style={{ zIndex: 9999 }} className='absolute px-2 py-3 text-white bottom-[40px] right-[20px] bg-green-400'>
							<span>{activeOffer.price} % Off on all rooms</span>
						</div>
					</>
				)}
			</div>
		</ClientOnly>
	)
}

export default Home
