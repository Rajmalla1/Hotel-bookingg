"use client"

import { HeartButton } from "@/app/components/HeartButton"
import { SafeUser } from "@/app/types"
import React from "react"
import Slider from "react-slick"
import Heading from "../Heading"

interface ListingHeadProps {
    title: string
    imageSrc: string[]
    locationValue?: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: "ease-in-out",
    }

    return (
        <>
            <Heading title={title} subtitle="" />
            <div className="relative h-[60vh] rounded-xl">
                <Slider {...settings}>
                    {imageSrc.map((src, index) => (
                        <div key={index} className="w-full h-full">
                            <img src={src} alt={title} className="h-[500px] w-[100%] object-contain bg-gray-50" />
                            {/* <Image
                                alt={title}
                                src={"https://source.unsplash.com/random/600x400"}
                                fill
                                sizes="100%"
                                className="object-cover"
                            /> */}
                        </div>
                    ))}
                </Slider>
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}

export default ListingHead