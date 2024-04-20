'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryBoxProps {
	label: string
	description?: string
	icon: IconType
	selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
	label,
	icon: Icon,
	selected,
}) => {
	const router = useRouter()
	const params = useSearchParams()

	const handleClick = useCallback(() => {
		let currentQuery = {}

		// if there are params, parse them into an object
		if (params) currentQuery = qs.parse(params.toString())

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		}
		// if clicked the selected category, remove it from the query
		if (params?.get('category') === label) delete updatedQuery.category

		// stringify the query object and update the url
		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		)
		// push the URL
		router.push(url)
	}, [label, params, router])

	return (
		<div
			onClick={handleClick}
			className={`
				category-box
				flex
				flex-col
				items-center
				justify-center
				gap-2
				border-b-2
				hover:text-neutral-800
				transition
				cursor-pointer
				${selected ? ' border-b-neutral-800' : ' border-transparent'}
				${selected ? ' text-neutral-800' : ' text-neutral-500'}
		`}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
			{/* <div className="font-medium text-sm">{selected ? label : ''}</div> */}
		</div>
	)
}

export default CategoryBox
