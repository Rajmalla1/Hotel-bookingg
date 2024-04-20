'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
	GiGrass,
	GiRoad,
	GiWindmill
} from 'react-icons/gi'
import { MdOutlineVilla, MdRoofing } from 'react-icons/md'
import { TbBeach, TbMountain } from 'react-icons/tb'
import CategoryBox from '../CategoryBox'
import { Container } from '../Container'
import { BiBed, BiDiamond } from 'react-icons/bi'
import { IoBed } from 'react-icons/io5'



export const categories = [
	{
		label: 'Deluxe',
		icon: BiDiamond,
		description: 'This is a deluxe room. It has all the luxury amenities',
	},
	{
		label: 'Single Bed',
		icon: BiBed,
		description: 'This room has a single bed. Perfect for solo travelers',
	},
	{
		label: 'Double Bed',
		icon: IoBed,
		description: 'This room has a double bed. Perfect for couples',
	},
	{
		label: 'Road Facing',
		icon: GiRoad,
		description: 'This room is road facing, perfect for people who love the city life',
	},
	{
		label: 'Garden Facing',
		icon: GiGrass,
		description: 'This room is garden facing, perfect for people who love nature',
	},
	{
		label: 'Roof Top',
		icon: MdRoofing,
		description: 'This room is on the roof top, perfect for people who love the view',
	},

]

const Categories = () => {
	const params = useSearchParams()
	const category = params?.get('category')
	const pathname = usePathname()

	const isMainPage = pathname === '/'
	if (!isMainPage) return null

	return (
		<Container>
			<div
				className="
					pt-4
					flex
					flex-row
					items-center
					justify-between
					overflow-x-auto
					sm:gap-8
		"
			>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category === item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	)
}

export default Categories
