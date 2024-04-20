import { BiGlobe, BiHotel } from 'react-icons/bi';
import { MdHandshake } from 'react-icons/md';

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        About Raj Hotel
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in">
                        <div className="flex items-center justify-center text-indigo-500 text-5xl mb-4">
                            <BiHotel />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Who Are We?</h3>
                        <p className="text-gray-600">
                            We are a passionate team of travel enthusiasts dedicated to providing you with the best hotel booking experience. Our platform offers a wide range of accommodations, from luxurious resorts to cozy bed and breakfasts, all at competitive prices.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in">
                        <div className="flex items-center justify-center text-indigo-500 text-5xl mb-4">
                            <BiGlobe />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">What&apos;s Our Goal?</h3>
                        <p className="text-gray-600">
                            Our goal is to simplify the hotel booking process and make it accessible to everyone. We strive to provide a user-friendly platform that allows you to find the perfect accommodation for your needs, whether you&apos;re traveling for business or pleasure.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in">
                        <div className="flex items-center justify-center text-indigo-500 text-5xl mb-4">
                            <MdHandshake />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Our Partners</h3>
                        <p className="text-gray-600">
                            We have partnered with thousands of hotels worldwide to offer you the best deals and widest selection of accommodations. Our strong partnerships with trusted hotel chains and independent properties ensure that you have access to a diverse range of options.
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Journey</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-4">
                                Our company was founded in 2015 by a group of passionate travelers who recognized the need for a more efficient and user-friendly hotel booking platform. Back then, the process of finding and booking accommodations was often a frustrating and time-consuming endeavor.
                            </p>
                            <p className="text-gray-600 mb-4">
                                We started with a simple idea: to create a platform that would simplify the hotel booking experience by providing a one-stop solution for travelers to explore, compare, and book their ideal accommodations. Our initial offering was modest, but our commitment to exceptional customer service and our relentless pursuit of innovation quickly set us apart from the competition.
                            </p>
                            <img
                                src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Placeholder Image"
                                className="rounded-lg shadow-lg mb-4"
                            />
                        </div>
                        <div>
                            <p className="text-gray-600 mb-4">
                                As our platform gained traction, we expanded our partnerships with hotels worldwide, ensuring that our customers had access to a diverse range of accommodations, from luxury resorts to budget-friendly options. We also continuously enhanced our platform with cutting-edge technologies and features, such as personalized recommendations, virtual tours, and secure online payments.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Today, we are proud to be one of the leading hotel booking platforms, serving millions of travelers globally. Our success is a testament to our unwavering commitment to providing exceptional service, competitive prices, and a seamless booking experience.
                            </p>
                            <p className="text-gray-600">
                                As we look towards the future, we remain dedicated to staying at the forefront of innovation, embracing new technologies and trends that enhance the travel experience for our customers. Our journey has been remarkable, and we are excited to continue exploring new horizons, always striving to exceed your expectations.
                            </p>
                            <img
                                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&h=650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Placeholder Image"
                                className="rounded-lg shadow-lg mt-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About