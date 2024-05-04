"use client"
import { Container } from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CreateForm = () => {
    const [offerPrice, setOfferPrice] = useState('');
    const [offerStartDate, setOfferStartDate] = useState("");
    const [offerEndDate, setOfferEndDate] = useState("");
    const router = useRouter()


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            price: offerPrice,
            startDate: new Date(offerStartDate).toISOString(),
            endDate: new Date(offerEndDate).toISOString()
        }
        await axios.post('/api/offers', data)
            .then((res) => {
                // console.warn("🚀 ~ file: CreateForm.tsx:25 ~ .then ~ res:", res);
                toast.success("Offer Created");
                router.push("/admin/offers")
            })
            .catch((error) => {
                console.log(error);
                toast.error("An active offer exists aleady!!");
            });
    };

    return (
        <Container>
            <section className='mt-2 px-2'>
                <Heading title='Create New Offer ' />
                <div className="mt-4 h-[50vh]">
                    <div className="relative overflow-x-auto py-2 px-1">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 max-w-md bg-white rounded-lg shadow-md">
                            <div>
                                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                                    Offer Percentage:
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={offerPrice}
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="title"
                                    name="title"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={offerStartDate}
                                    onChange={(e) => setOfferStartDate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                                    End Date:
                                </label>
                                <input
                                    type="date"
                                    id="description"
                                    name="description"
                                    value={offerEndDate}
                                    onChange={(e) => setOfferEndDate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    className="col-span-1 bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold border-2 border-blue-500 py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                    onClick={() => router.push("/admin/offers")}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                >
                                    Create Offer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default CreateForm